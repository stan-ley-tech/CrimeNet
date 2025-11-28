from fastapi import APIRouter, UploadFile, File, HTTPException
from ..services.ingestion_service import IngestionService
from ..utils.logger import logger

router = APIRouter()

@router.post("/ingest")
async def ingest(file: UploadFile | None = File(None), source: str | None = None):
    try:
        svc = IngestionService()
        if file:
            content = await file.read()
            count = svc.ingest_buffer(content, filename=file.filename, source=source)
        else:
            count = svc.ingest_from_data_dir(source=source)
        return {"ingested_records": count}
    except Exception as e:
        logger.exception("ingest failed")
        raise HTTPException(status_code=400, detail=str(e))
