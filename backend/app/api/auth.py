from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from app.models.user import UserCreate, UserResponse, TokenResponse
from app.database.mongodb import MongoDB
from app.utils.auth_utils import get_password_hash, verify_password, create_access_token
from datetime import datetime

router = APIRouter(prefix="/auth", tags=["Authentication"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

@router.post("/signup")
async def signup(user_data: UserCreate):
    """Register a new user"""
    try:
        # Check if user already exists
        existing = await MongoDB.find_user({"email": user_data.email})
        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        
        # Create new user
        user_dict = user_data.dict()
        hashed_password = get_password_hash(user_dict.pop("password"))
        user_dict["password"] = hashed_password
        user_dict["created_at"] = datetime.utcnow()
        user_dict["is_active"] = True
        user_dict["is_admin"] = False
        
        # ⭐ role is automatically included because it's in UserCreate model
        # Default to "citizen" if not provided
        if "role" not in user_dict or not user_dict["role"]:
            user_dict["role"] = "citizen"
        
        result = await MongoDB.insert_user(user_dict)
        
        # Create token for immediate login after signup
        access_token = create_access_token(data={"sub": user_data.email})
        
        # Return token + user info (so frontend can redirect immediately)
        return {
            "message": "✅ User created successfully",
            "user_id": result["inserted_id"],
            "access_token": access_token,
            "token_type": "bearer",
            "user": {
                "email": user_data.email,
                "username": user_data.username,
                "full_name": user_data.full_name,
                "role": user_dict["role"],
                "is_admin": False,
                "created_at": user_dict["created_at"]
            }
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error in signup: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.post("/login", response_model=TokenResponse)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    """Login user and return JWT token"""
    try:
        user = await MongoDB.find_user({"email": form_data.username})
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        if not verify_password(form_data.password, user["password"]):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        access_token = create_access_token(data={"sub": user["email"]})
        
        return TokenResponse(
            access_token=access_token,
            user=UserResponse(
                email=user["email"],
                username=user["username"],
                full_name=user.get("full_name", ""),
                role=user.get("role", "citizen"),  # ⭐ Include role
                is_admin=user.get("is_admin", False),
                created_at=user["created_at"]
            )
        )
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error in login: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )