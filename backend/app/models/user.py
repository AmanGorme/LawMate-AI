from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserCreate(BaseModel):
    email: EmailStr
    username: str
    full_name: Optional[str] = None
    password: str
    role: str = "citizen"  # ← NEW: "lawyer" or "citizen" (defaults to citizen)

class UserLogin(BaseModel):
    email: EmailStr
    password: str
    role: Optional[str] = None  # ← NEW: Optional role verification on login

class UserResponse(BaseModel):
    email: str
    username: str
    full_name: Optional[str] = None
    role: str = "citizen"  # ← NEW: Include role in response
    is_admin: bool = False
    created_at: datetime

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse