from neo4j import GraphDatabase

class Neo4jClient:
    def __init__(self, uri: str, user: str, password: str):
        self.driver = GraphDatabase.driver(uri, auth=(user, password))

    def session(self):
        return self.driver.session()

    def merge_node(self, session, node):
        q = "MERGE (n:%s {id:$id}) SET n += $props RETURN n" % node.label
        session.run(q, id=node.id, props=node.props)

    def merge_relationship(self, session, rel):
        q = (
            "MATCH (a {id:$src}), (b {id:$dst}) "
            "MERGE (a)-[r:%s]->(b) SET r += $props RETURN r" % rel.type
        )
        session.run(q, src=rel.src, dst=rel.dst, props=rel.props)
