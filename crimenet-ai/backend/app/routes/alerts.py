from fastapi import APIRouter
from ..services.ai_engine import AIEngine

router = APIRouter()

engine = AIEngine()

@router.get("/alerts")
async def get_alerts():
    return engine.get_alerts()
