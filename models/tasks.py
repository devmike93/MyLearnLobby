#!/usr/bin/python3
"""This is the task model for the project"""

from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Boolean, ForeignKey
from sqlalchemy.orm import validates

class Task(BaseModel, Base):
    """ This is the task model for the project

    Attrs:

    Methods:
    """
    __tablename__ = "tasks"
    title = Column(String(256), nullable=False)
    description = Column(String(1024), nullable=True)
    done = Column(Boolean, nullable=False, default=False)
    course_id = Column(String(60), ForeignKey("courses.id"), nullable=False)

    def __init__(self, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)


    @validates("description")
    def validate_description(self, key, description):
        assert len(description) <= 1024, "Description must be 1024 characters or less"
        return description
