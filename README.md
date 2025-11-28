# CrimeNet AI MVP

Local run:

- docker-compose up -d neo4j postgres
- pip install -r crimenet-ai/backend/app/requirements.txt
- uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 (cwd: crimenet-ai/backend)
- python crimenet-ai/scripts/seed_db.py --file crimenet-ai/data/wepesi_demo.json
