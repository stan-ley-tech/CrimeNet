from pydantic import BaseSettings

class Settings(BaseSettings):
    NEO4J_URI: str = "bolt://localhost:7687"
    NEO4J_USER: str = "neo4j"
    NEO4J_PASSWORD: str = "password"
    # For local host runs (outside Docker), port matches docker-compose host port mapping
    PG_DSN: str = "dbname=crimenet user=postgres password=postgres host=localhost port=55432"

settings = Settings()
