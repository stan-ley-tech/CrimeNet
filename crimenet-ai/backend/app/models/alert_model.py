from pydantic import BaseModel

class Alert(BaseModel):
    id: int | None = None
    node_id: str
    risk_score: float
    summary: str
