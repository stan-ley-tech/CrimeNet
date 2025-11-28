from fastapi import APIRouter
from pydantic import BaseModel
from ..services.simulation_engine import SimulationEngine

router = APIRouter()

class SimRequest(BaseModel):
    node_id: str
    action_type: str

@router.post("/simulate")
async def simulate(req: SimRequest):
    engine = SimulationEngine()
    return engine.simulate(req.node_id, req.action_type)
