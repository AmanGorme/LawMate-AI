# ⚖️ LawMate AI

**An AI-Powered Legal Assistant using RAG and LLM**

LawMate AI is a dual-portal intelligent legal assistant that helps both **lawyers** and **citizens** understand Indian law. It runs 100% offline on your device, ensuring complete privacy for sensitive legal documents.

---

## ✨ Features

### 👨‍⚖️ For Lawyers
- 🤖 AI-powered legal chat (IPC, BNS questions)
- 📊 IPC ↔ BNS section comparison (35+ sections)
- 📝 Legal draft generator (8 templates)
- 📄 Document analysis with RAG
- 📁 Case file management
- 👤 Professional profile management

### 👤 For Citizens
- 💬 Friendly AI chat for legal rights
- 📖 Know Your Rights (8 categories)
- 📄 Understand any legal document
- 📞 Help & Support (helplines, FAQs)
- 👤 Simple profile management

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React (Vite), Tailwind CSS, Axios |
| **Backend** | Python, FastAPI, Uvicorn |
| **Database** | MongoDB (Motor async driver) |
| **AI Engine** | Ollama + Llama 3.2 3B |
| **RAG** | LangChain, FAISS, PyMuPDF |
| **Auth** | JWT (JSON Web Tokens) |
| **Password** | Bcrypt hashing |

---

## 🏗️ Architecture
```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   React     │─────▶│   FastAPI   │─────▶│  Ollama     │
│  Frontend   │      │   Backend   │      │  Llama 3.2  │
└─────────────┘      └─────────────┘      └─────────────┘
                            │
                            ▼
                     ┌─────────────┐
                     │   MongoDB   │
                     └─────────────┘
```

---

## 🚀 Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+
- MongoDB (local or Atlas)
- Ollama ([download here](https://ollama.com))

### 1. Clone the Repository
```bash
git clone https://github.com/AmanGorme/LawMate-AI.git
cd LawMate-AI
```

### 2. Setup Ollama
```bash
ollama pull llama3.2:3b
ollama pull nomic-embed-text
```

### 3. Backend Setup
```bash
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file:
```
MONGODB_URI=mongodb://localhost:27017
DB_NAME=lawmate
JWT_SECRET=your_secret_key
```

Run backend:
```bash
python -m uvicorn app.main:app --reload --port 8000
```

### 4. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## 🎯 How It Works

1. **User Signs Up** → Chooses Lawyer or Citizen portal
2. **JWT Authentication** → Secure login, role-based access
3. **AI Chat** → Messages sent to backend, processed by local Llama 3.2
4. **RAG Pipeline** → Uploaded PDFs split into chunks, embedded with FAISS
5. **Smart Responses** → AI retrieves context and generates answers
6. **100% Offline** → No data leaves your device

---

## 👨‍💻 Author

**Aman Gorme**
- GitHub: [@AmanGorme](https://github.com/AmanGorme)
- Email: amangorme14@gmail.com

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgements

- **Meta** for Llama 3.2
- **Ollama** for local AI inference
- **LangChain** for RAG framework
- **FastAPI** for the backend framework
- **React** & **Tailwind** for the modern UI