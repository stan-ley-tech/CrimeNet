from fastapi import APIRouter, Query
from ..services.graph_service import GraphService

router = APIRouter()

graph_service = GraphService()

@router.get("/graph")
async def get_graph(domain: str | None = Query(None), min_score: float | None = Query(None)):
    return graph_service.get_graph(domain=domain, min_score=min_score)

@router.get("/node/{node_id}")
async def get_node(node_id: str):
    return graph_service.get_node_details(node_id)
