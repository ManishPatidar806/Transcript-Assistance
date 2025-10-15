from fastapi import FastAPI
from app.core.config import settings
from app.api.v1.routers import route_transcript
from fastapi.middleware.cors import CORSMiddleware

def create_app()->FastAPI:
    app = FastAPI(title=settings.APP_NAME)
    app.include_router(router=route_transcript.router,prefix="/api/v1/transcript",tags=["transcript"])
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_methods=["*"],
        allow_headers=["*"]
        )

    return app

app = create_app()
