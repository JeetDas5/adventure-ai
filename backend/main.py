from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from core.config import settings
from routers import story, job
from db.database import create_tables

create_tables()

app = FastAPI(
    title="Choose your Adventure Game",
    description="A simple choose your adventure game built with FastAPI and React.",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_origin_regex=r"https://.*\.vercel\.app$",
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)


@app.get("/")
def root():
    return {"message": "Welcome to Adventure"}


app.include_router(story.router, prefix=settings.API_PREFIX, tags=["stories"])
app.include_router(job.router, prefix=settings.API_PREFIX, tags=["jobs"])

if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
