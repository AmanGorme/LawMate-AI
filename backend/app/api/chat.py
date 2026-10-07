from fastapi import APIRouter, UploadFile, File, Form
from app.services.rag_service import RAGService
import base64

router = APIRouter()
rag_service = RAGService()

@router.post("/chat")
async def chat(
    message: str = Form(...), 
    file: UploadFile = File(None)
):
    """Lawyer chat endpoint — formal legal info."""
    image_data = None
    
    if file and file.content_type.startswith("image/"):
        contents = await file.read()
        image_data = base64.b64encode(contents).decode("utf-8")
    
    result = rag_service.ask_question(message, image_data)
    return {"response": result["answer"]}


@router.post("/chat/citizen")
async def chat_citizen(
    message: str = Form(...), 
    file: UploadFile = File(None)
):
    """Citizen chat endpoint — friendly, rights-focused."""
    image_data = None
    
    if file and file.content_type.startswith("image/"):
        contents = await file.read()
        image_data = base64.b64encode(contents).decode("utf-8")
    
    result = rag_service.ask_citizen_question(message, image_data)
    return {"response": result["answer"]}