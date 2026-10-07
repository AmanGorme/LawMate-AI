from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
from app.api import auth
from app.api import documents
from app.api import chat  # <--- ADDED THIS IMPORT
from app.database.mongodb import MongoDB

load_dotenv()

# Create FastAPI app
app = FastAPI(
    title="LawMate AI",
    description="⚖️ Intelligent Legal Assistant API",
    version="1.0.0"
)

# CORS middleware - Allows frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite default
        "http://localhost:5174",  # Vite default (Your current port)
        "http://localhost:3000",   # React default
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create required directories
os.makedirs("uploads", exist_ok=True)
os.makedirs("embeddings", exist_ok=True)

# Startup event - Connect to database
@app.on_event("startup")
async def startup_db_client():
    await MongoDB.connect()

# Shutdown event - Close database connection
@app.on_event("shutdown")
async def shutdown_db_client():
    await MongoDB.close()

# Include routers
app.include_router(auth.router)
app.include_router(documents.router)
app.include_router(chat.router)  # <--- ADDED THIS ROUTER

# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "⚖️ LawMate AI API is running!",
        "version": "1.0.0",
        "status": "active",
        "endpoints": {
            "docs": "/docs",
            "auth": "/auth",
            "documents": "/documents"
        }
    }

# Health check
@app.get("/health")
async def health_check():
    return {"status": "healthy", "database": "connected"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )