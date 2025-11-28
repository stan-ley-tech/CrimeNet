from ..db.neo4j_client import Neo4jClient
from ..utils.config import settings

class GraphService:
    def __init__(self):
        self.neo = Neo4jClient(settings.NEO4J_URI, settings.NEO4J_USER, settings.NEO4J_PASSWORD)

    def get_graph(self, domain: str | None = None, min_score: float | None = None):
        with self.neo.driver.session() as s:
            q = "MATCH (n)-[r]->(m) RETURN n,r,m LIMIT 500"
            res = s.run(q)
            nodes = {}
            edges = []
            for record in res:
                n = record[0]
                m = record[2]
                r = record[1]
                nodes[n.id] = {"id": n.id, "label": list(n.labels)[0], "props": dict(n)}
                nodes[m.id] = {"id": m.id, "label": list(m.labels)[0], "props": dict(m)}
                edges.append({"source": n.id, "target": m.id, "type": r.type, "props": dict(r)})
            return {"nodes": list(nodes.values()), "edges": edges}

    def get_node_details(self, node_id: str):
        with self.neo.driver.session() as s:
            q = "MATCH (n) WHERE id(n)=$nid OPTIONAL MATCH (n)-[r]-(m) RETURN n, collect({r: r, m: m}) as rels"
            # Neo4j id(n) is internal numeric; accept string id property too
            try:
                nid = int(node_id)
                res = s.run(q, nid=nid).single()
                if res:
                    n = res[0]
                    rels = res[1]
                    return {"node": {"id": n.id, "label": list(n.labels)[0], "props": dict(n)}, "relations": [
                        {"type": x["r"].type, "other": {"id": x["m"].id, "label": list(x["m"].labels)[0], "props": dict(x["m"])}} for x in rels if x["r"] is not None
                    ]}
            except ValueError:
                res = s.run("MATCH (n {id:$id}) RETURN n", id=node_id).single()
                if res:
                    n = res[0]
                    return {"node": {"id": n.get("id", node_id), "label": list(n.labels)[0], "props": dict(n)}, "relations": []}
            return {"node": None, "relations": []}
