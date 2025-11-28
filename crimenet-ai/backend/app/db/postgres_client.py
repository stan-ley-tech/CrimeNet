 import psycopg

class PostgresClient:
    def __init__(self, dsn: str):
        self.dsn = dsn

    def ensure_schema(self):
        with psycopg.connect(self.dsn) as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    CREATE TABLE IF NOT EXISTS alerts (
                        id SERIAL PRIMARY KEY,
                        node_id TEXT NOT NULL,
                        risk_score REAL NOT NULL,
                        summary TEXT
                    );
                    """
                )
                conn.commit()

    def fetch(self, query: str, params: tuple | None = None):
        with psycopg.connect(self.dsn) as conn:
            with conn.cursor() as cur:
                cur.execute(query, params or tuple())
                return cur.fetchall()

    def execute(self, query: str, params: tuple | None = None):
        with psycopg.connect(self.dsn) as conn:
            with conn.cursor() as cur:
                cur.execute(query, params or tuple())
                conn.commit()
