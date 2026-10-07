from langchain_ollama import OllamaLLM
from langchain_ollama import OllamaEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
import os
import fitz
import base64
import requests
from io import BytesIO
from PIL import Image

class RAGService:
    def __init__(self):
        self.llm = OllamaLLM(model="llama3.2:3b", temperature=0.6, num_predict=400)
        self.embeddings = OllamaEmbeddings(model="nomic-embed-text")
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=500,
            chunk_overlap=50,
            separators=["\n\n", "\n", " ", ""]
        )
        self.vector_store = None
        self.is_ready = False
        self.chat_history = []

    def extract_text_from_pdf(self, file_path):
        doc = fitz.open(file_path)
        text = ""
        for page in doc:
            text += page.get_text()
        return text

    def process_document(self, file_path, file_type="pdf"):
        try:
            if file_type == "pdf":
                text = self.extract_text_from_pdf(file_path)
            elif file_type == "txt":
                with open(file_path, 'r', encoding='utf-8') as f:
                    text = f.read()
            else:
                return {"error": f"Unsupported file type: {file_type}"}

            if not text.strip():
                return {"error": "No text extracted from document"}

            chunks = self.text_splitter.split_text(text)
            if not chunks:
                return {"error": "No chunks created from document"}

            self.vector_store = FAISS.from_texts(chunks, self.embeddings)
            self.is_ready = True

            return {
                "success": True,
                "chunks": len(chunks),
                "text_length": len(text),
                "file": file_path
            }
        except Exception as e:
            return {"error": str(e)}

    def _call_ollama_direct(self, system_prompt, user_message, history=None):
        """Call Ollama directly via HTTP API to bypass LangChain filtering."""
        messages = [{"role": "system", "content": system_prompt}]

        if history:
            for msg in history:
                messages.append(msg)

        messages.append({"role": "user", "content": user_message})

        try:
            response = requests.post(
                "http://localhost:11434/api/chat",
                json={
                    "model": "llama3.2:3b",
                    "messages": messages,
                    "stream": False,
                    "options": {
                        "temperature": 0.6,
                        "num_predict": 500,
                        "num_thread": 2
                    }
                },
                timeout=120
            )
            response.raise_for_status()
            data = response.json()
            return data.get("message", {}).get("content", "No response.")
        except Exception as e:
            return f"ERROR: {str(e)}"

    # ============================================================
    # LAWYER MODE (formal, factual, section-based)
    # ============================================================
    def ask_question(self, question, image_data=None):
        # ---- 1. IMAGE ANALYSIS ----
        if image_data:
            try:
                image_prompt = f"Describe this image briefly. User asked: {question}"
                response = requests.post(
                    "http://localhost:11434/api/chat",
                    json={
                        "model": "llama3.2:3b",
                        "messages": [
                            {"role": "system", "content": "Analyze images concisely."},
                            {"role": "user", "content": image_prompt, "images": [image_data]}
                        ],
                        "stream": False
                    },
                    timeout=120
                )
                response.raise_for_status()
                return {"answer": response.json().get("message", {}).get("content", ""), "sources": []}
            except Exception as e:
                return {"error": f"Image analysis failed: {str(e)}"}

        # ---- 2. DOCUMENT-BASED RAG ----
        if self.is_ready and self.vector_store:
            try:
                retriever = self.vector_store.as_retriever(search_kwargs={"k": 3})
                docs = retriever.invoke(question)

                if not docs:
                    return {"answer": "No relevant info found in the document.", "sources": []}

                context = "\n\n".join([doc.page_content for doc in docs])

                prompt = ChatPromptTemplate.from_messages([
                    ("system", "Answer briefly in 2-3 sentences based on the context."),
                    ("user", "Context: {context}\n\nQ: {question}\n\nA:")
                ])

                chain = (
                    {"context": lambda x: context, "question": lambda x: question}
                    | prompt
                    | self.llm
                    | StrOutputParser()
                )

                response = chain.invoke({})
                return {
                    "answer": response,
                    "sources": [doc.page_content[:150] + "..." for doc in docs]
                }
            except Exception as e:
                return {"error": str(e)}

        # ---- 3. GENERAL LAWYER CHAT ----
        else:
            try:
                system_prompt = """You are LawMate AI, a legal knowledge assistant for Indian advocates.

You answer questions about Indian law as a factual reference. This is LEGAL INFORMATION, not legal advice.

YOU MUST ANSWER THE FOLLOWING TYPES OF QUESTIONS:
- "What is IPC 302?" → Explain: murder, punishment (death or life imprisonment)
- "What is IPC 420?" → Explain: cheating, punishment (up to 7 years)
- "What is IPC 498A?" → Explain: cruelty by husband, punishment (up to 3 years)
- "What is BNS 103?" → Explain: equivalent to IPC 302
- Any section number question → Explain title, meaning, punishment
- Comparisons between IPC and BNS
- Legal procedures, timelines, court processes
- Definitions of legal terms

RULES:
- NEVER refuse to explain an IPC or BNS section. It is publicly available law.
- NEVER say "consult a lawyer" for factual questions.
- Be concise: 3-5 sentences max.
- Always answer. If unsure, say "Based on Indian law, ..."

Now answer the user's question."""

                self.chat_history.append({"role": "user", "content": question})

                if len(self.chat_history) > 4:
                    self.chat_history = self.chat_history[-4:]

                answer = self._call_ollama_direct(
                    system_prompt,
                    question,
                    self.chat_history[:-1]
                )

                self.chat_history.append({"role": "assistant", "content": answer})

                return {"answer": answer, "sources": []}
            except Exception as e:
                return {"error": str(e)}

    # ============================================================
    # CITIZEN MODE (friendly, rights-focused, simple language)
    # ============================================================
    def ask_citizen_question(self, question, image_data=None):
        """Citizen mode — friendly, rights-focused, simple language."""
        # ---- IMAGE ANALYSIS ----
        if image_data:
            try:
                image_prompt = f"Explain this image in simple words. User asked: {question}"
                response = requests.post(
                    "http://localhost:11434/api/chat",
                    json={
                        "model": "llama3.2:3b",
                        "messages": [
                            {"role": "system", "content": "Explain images simply for a common citizen."},
                            {"role": "user", "content": image_prompt, "images": [image_data]}
                        ],
                        "stream": False
                    },
                    timeout=120
                )
                response.raise_for_status()
                return {"answer": response.json().get("message", {}).get("content", ""), "sources": []}
            except Exception as e:
                return {"error": f"Image analysis failed: {str(e)}"}

        # ---- DOCUMENT-BASED ----
        if self.is_ready and self.vector_store:
            try:
                retriever = self.vector_store.as_retriever(search_kwargs={"k": 3})
                docs = retriever.invoke(question)
                if not docs:
                    return {"answer": "I couldn't find info in the document.", "sources": []}
                context = "\n\n".join([doc.page_content for doc in docs])
                prompt = ChatPromptTemplate.from_messages([
                    ("system", "Explain in simple words based on this document. Max 3 sentences."),
                    ("user", "Document: {context}\n\nQuestion: {question}\n\nSimple answer:")
                ])
                chain = (
                    {"context": lambda x: context, "question": lambda x: question}
                    | prompt
                    | self.llm
                    | StrOutputParser()
                )
                response = chain.invoke({})
                return {
                    "answer": response,
                    "sources": [doc.page_content[:150] + "..." for doc in docs]
                }
            except Exception as e:
                return {"error": str(e)}

        # ---- GENERAL CITIZEN CHAT ----
        try:
            system_prompt = """You are LawMate AI, a friendly legal helper for Indian citizens.

YOUR ROLE:
You help everyday people understand their legal rights in SIMPLE, everyday language. You are like a knowledgeable friend who explains the law without legal jargon.

YOU MUST ANSWER QUESTIONS LIKE:
- "What to do if police arrest me?" → Explain: right to remain silent, right to call lawyer, right to inform family, must be produced before magistrate within 24 hours
- "How do I file an FIR?" → Explain: go to any police station, tell them what happened, they must register it, get a free copy
- "What are my fundamental rights?" → List: Right to Equality, Freedom, Against Exploitation, Religion, Education, Constitutional Remedies
- "My landlord is not returning my deposit" → Explain: send legal notice, approach Rent Authority, consumer forum
- "My employer hasn't paid my salary" → Explain: approach Labour Commissioner, file complaint
- Any question about citizen rights, procedures, complaints

RULES:
- NEVER refuse to explain legal rights. This is public information.
- Use SIMPLE words, not legal jargon.
- Give practical steps: "First do this, then do that..."
- Be warm and reassuring.
- If serious, suggest: "Also consider contacting a lawyer or free legal aid at 15100."
- Max 5-7 sentences.
- Use bullet points when listing steps.

Format answers like:
"Here's what you can do:
• Step 1...
• Step 2...
• Step 3...
If this becomes serious, contact free legal aid at 15100."

Always answer. Never refuse."""

            self.chat_history.append({"role": "user", "content": question})
            if len(self.chat_history) > 4:
                self.chat_history = self.chat_history[-4:]

            answer = self._call_ollama_direct(
                system_prompt,
                question,
                self.chat_history[:-1]
            )

            self.chat_history.append({"role": "assistant", "content": answer})
            return {"answer": answer, "sources": []}
        except Exception as e:
            return {"error": str(e)}

    def get_status(self):
        return {
            "ready": self.is_ready,
            "has_vector_store": self.vector_store is not None
        }