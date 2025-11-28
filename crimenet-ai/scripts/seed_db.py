import argparse
import sys
from pathlib import Path
import json
import traceback

# Ensure backend root is on sys.path when running from repo root
THIS_DIR = Path(__file__).resolve().parent
BACKEND_ROOT = THIS_DIR.parent / "backend"
if str(BACKEND_ROOT) not in sys.path:
    sys.path.insert(0, str(BACKEND_ROOT))

from app.services.ingestion_service import IngestionService

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--file", required=True)
    args = parser.parse_args()

    svc = IngestionService()
    path = Path(args.file)
    if path.suffix == ".json":
        records = json.loads(path.read_text())
        c = svc._process_records(records, source=path.stem)
        print({"seeded": c})
    else:
        c = svc.ingest_from_data_dir()
        print({"seeded": c})

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print({"error": str(e)})
        traceback.print_exc()
        sys.exit(1)
