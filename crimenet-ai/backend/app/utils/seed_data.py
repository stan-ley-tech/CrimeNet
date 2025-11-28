import json
from pathlib import Path
from ..services.ingestion_service import IngestionService
import traceback

def seed_from_file(path: str):
    svc = IngestionService()
    p = Path(path)
    if p.suffix == ".json":
        records = json.loads(p.read_text())
        count = svc._process_records(records, source=p.stem)
        return count
    raise ValueError("only json supported in seed_data")

if __name__ == "__main__":
    try:
        data_dir = Path(__file__).resolve().parents[3] / "data" / "wepesi_demo.json"
        c = seed_from_file(str(data_dir))
        print({"seeded": c})
    except Exception as e:
        print({"error": str(e)})
        traceback.print_exc()
