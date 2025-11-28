class ExplainEngine:
    def summarize(self, alert: dict) -> str:
        node = alert.get("node_id")
        score = alert.get("risk_score")
        return f"Node {node} exhibits anomalous behavior. Risk {score}."
