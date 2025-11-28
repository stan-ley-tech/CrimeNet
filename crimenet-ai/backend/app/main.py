from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import ingest, graph, alerts, simulate, auth

app = FastAPI(title="CrimeNet AI MVP", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(ingest.router, prefix="/api", tags=["ingest"])
app.include_router(graph.router, prefix="/api", tags=["graph"])
app.include_router(alerts.router, prefix="/api", tags=["alerts"])
app.include_router(simulate.router, prefix="/api", tags=["simulate"])

@app.get("/")
async def root():
    return {"status": "ok", "service": "crimenet-backend"}
