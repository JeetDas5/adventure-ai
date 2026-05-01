from typing import Optional
from datetime import datetime

from sqlalchemy import Integer, String, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import Mapped, mapped_column

from db.database import Base


class StoryJob(Base):
    __tablename__ = "story_jobs"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    job_id: Mapped[str] = mapped_column(String, index=True, unique=True)
    session_id: Mapped[str] = mapped_column(String, index=True)
    theme: Mapped[str] = mapped_column(String)
    status: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    story_id: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    error: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    completed_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
