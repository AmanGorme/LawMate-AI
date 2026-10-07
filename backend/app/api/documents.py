from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
import os
import shutil
from app.services.rag_service import RAGService
from app.utils.auth_utils import decode_token

router = APIRouter(prefix="/documents", tags=["Documents"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")
rag_service = RAGService()

# Allowed file types
ALLOWED_TYPES = {
    "pdf": "pdf",
    "txt": "txt",
    "docx": "docx",
}

@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...),
    token: str = Depends(oauth2_scheme)
):
    """Upload and process a document"""
    try:
        # Validate token
        payload = decode_token(token)
        if not payload:
            raise HTTPException(401, "Invalid token")
        
        # Check file type
        file_ext = file.filename.split('.')[-1].lower()
        if file_ext not in ALLOWED_TYPES:
            raise HTTPException(400, f"Unsupported file type: {file_ext}")
        
        # Save file
        upload_dir = "uploads"
        os.makedirs(upload_dir, exist_ok=True)
        file_path = os.path.join(upload_dir, file.filename)
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Process document
        result = rag_service.process_document(file_path, file_ext)
        
        if "error" in result:
            raise HTTPException(400, result["error"])
        
        return {
            "message": "Document processed successfully",
            "filename": file.filename,
            "chunks": result["chunks"],
            "text_length": result["text_length"],
            "ready": True
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(500, f"Upload failed: {str(e)}")

@router.post("/ask")
async def ask_question(
    request: dict,
    token: str = Depends(oauth2_scheme)
):
    """Ask a question about uploaded documents"""
    try:
        # Validate token
        payload = decode_token(token)
        if not payload:
            raise HTTPException(401, "Invalid token")
        
        question = request.get("question")
        if not question:
            raise HTTPException(400, "Question is required")
        
        result = rag_service.ask_question(question)
        
        if "error" in result:
            raise HTTPException(400, result["error"])
        
        return {
            "question": question,
            "answer": result["answer"],
            "sources": result.get("sources", [])
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(500, f"Question failed: {str(e)}")

@router.get("/status")
async def get_status(token: str = Depends(oauth2_scheme)):
    """Check if RAG is ready"""
    try:
        payload = decode_token(token)
        if not payload:
            raise HTTPException(401, "Invalid token")
        
        return rag_service.get_status()
        
    except Exception as e:
        raise HTTPException(500, f"Status check failed: {str(e)}")