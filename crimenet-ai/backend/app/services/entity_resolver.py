import hashlib
from ..models.graph_schema import Node, Relationship, GraphSchema

class EntityResolver:
    def _canon_id(self, kind: str, key: str) -> str:
        h = hashlib.sha256(f"{kind}:{key}".encode()).hexdigest()[:16]
        return f"{kind}_{h}"

    def normalize_record(self, rec: dict, source: str | None):
        nodes: list[Node] = []
        rels: list[Relationship] = []
        t = rec.get("type") or rec.get("event_type") or "event"
        src = source or rec.get("source") or "unknown"
        ts = rec.get("timestamp") or rec.get("time")
        if "phone" in rec:
            pid = self._canon_id("Device", rec["phone"])
            nodes.append(Node("Device", pid, {"phone": rec["phone"], "source": src}))
        if "name" in rec:
            nid = self._canon_id("Person", rec["name"].strip().lower())
            nodes.append(Node("Person", nid, {"name": rec["name"], "source": src}))
        if "account" in rec:
            aid = self._canon_id("Account", rec["account"])  
            nodes.append(Node("Account", aid, {"account": rec["account"], "source": src}))
        if "company_reg" in rec:
            cid = self._canon_id("Company", rec["company_reg"])  
            nodes.append(Node("Company", cid, {"company_reg": rec["company_reg"], "source": src}))
        if len(nodes) >= 2:
            a = nodes[0]
            b = nodes[1]
            rels.append(Relationship(a.id, b.id, t, {"timestamp": ts, "source": src}))
        return nodes, rels
