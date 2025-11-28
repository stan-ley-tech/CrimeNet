from ..db.postgres_client import PostgresClient
from ..utils.config import settings

class AIEngine:
    def __init__(self):
        self.pg = PostgresClient(settings.PG_DSN)

    def get_alerts(self):
        self.pg.ensure_schema()
        rows = self.pg.fetch("SELECT id, node_id, risk_score, summary FROM alerts ORDER BY risk_score DESC LIMIT 50")
        alerts = [
            {"id": r[0], "node_id": r[1], "risk_score": float(r[2]), "summary": r[3]} for r in rows
        ]
        return {"alerts": alerts}

    def compute_risk(self, features: dict) -> float:
        vals = []
        for v in features.values():
            try:
                vals.append(float(v))
            except Exception:
                continue
        if not vals:
            return 0.0
        mean_val = sum(vals) / len(vals)
        # Simple squashing to 0..100
        score = (mean_val / (1.0 + abs(mean_val))) * 100.0
        if score < 0:
            score = 0.0
        if score > 100:
            score = 100.0
        return float(score)
