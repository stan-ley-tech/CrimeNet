import random

class SimulationEngine:
    def simulate(self, node_id: str, action_type: str):
        impact = round(random.uniform(20, 80), 2)
        return {"node_id": node_id, "action": action_type, "impact_score": impact}
