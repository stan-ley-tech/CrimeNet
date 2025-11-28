from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class LoginRequest(BaseModel):
    role: str

@router.post("/login")
async def login(req: LoginRequest):
    token = f"mock-token-{req.role}"
    return {"token": token, "role": req.role}
