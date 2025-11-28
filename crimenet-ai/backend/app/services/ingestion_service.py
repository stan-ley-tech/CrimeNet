import io
import csv
import json
from ..services.entity_resolver import EntityResolver
from ..db.neo4j_client import Neo4jClient
from ..utils.config import settings
from ..utils.logger import logger
from ..models.graph_schema import GraphSchema

class IngestionService:
    def __init__(self):
        self.resolver = EntityResolver()
        self.neo = Neo4jClient(settings.NEO4J_URI, settings.NEO4J_USER, settings.NEO4J_PASSWORD)

    def ingest_buffer(self, data: bytes, filename: str, source: str | None):
        records = self._read_any(data, filename)
        return self._process_records(records, source)

    def ingest_from_data_dir(self, source: str | None):
        paths = GraphSchema.sample_paths(source)
        total = 0
        for p in paths:
            try:
                if p.endswith('.csv'):
                    with open(p, 'r', newline='', encoding='utf-8') as f:
                        reader = csv.DictReader(f)
                        total += self._process_records(list(reader), source)
                elif p.endswith('.json'):
                    with open(p, 'r', encoding='utf-8') as f:
                        data = json.load(f)
                        if isinstance(data, list):
                            total += self._process_records(data, source)
                        else:
                            total += self._process_records([data], source)
                else:
                    logger.warning(f"unsupported file: {p}")
            except Exception as e:
                logger.warning(f"skip {p}: {e}")
        return total

    def _read_any(self, data: bytes, filename: str):
        buf = io.BytesIO(data)
        if filename.endswith('.csv'):
            text = buf.read().decode('utf-8')
            reader = csv.DictReader(io.StringIO(text))
            return list(reader)
        if filename.endswith('.json') or filename.endswith('.ndjson'):
            text = buf.read().decode('utf-8')
            if filename.endswith('.ndjson'):
                return [json.loads(line) for line in text.splitlines() if line.strip()]
            obj = json.loads(text)
            return obj if isinstance(obj, list) else [obj]
        raise ValueError("unsupported file type")

    def _process_records(self, records: list[dict], source: str | None):
        tx = self.neo.session()
        count = 0
        try:
            for rec in records:
                nodes, rels = self.resolver.normalize_record(rec, source)
                for n in nodes:
                    self.neo.merge_node(tx, n)
                for r in rels:
                    self.neo.merge_relationship(tx, r)
                count += 1
        finally:
            tx.close()
        return count
