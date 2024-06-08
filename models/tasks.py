#!/usr/bin/python3
"""This is the task model for the project"""

from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Boolean, ForeignKey, Integer
from sqlalchemy.orm import validates

class Task(BaseModel, Base):
    """ This is the task model for the project

    Attrs:
        title: str - title of the task
        description: str - description of the task
        done: bool - status of the task
        course_id: str - id of the course that the task belongs to
    Methods:
        __init__(self, *args, **kwargs) - initializes the Task Object
        validate_description(self, key, description) - validates the description
    """
    __tablename__ = "tasks"
    title = Column(String(256), nullable=False)
    description = Column(String(1024), nullable=True)
    done = Column(Boolean, nullable=False, default=False)
    # counter = Column(Integer, nullable=False, default=0)
    course_id = Column(String(60), ForeignKey("courses.id"), nullable=False)

    def __init__(self, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)


    @validates("description")
    def validate_description(self, key, description):
        assert len(description) <= 1024, "Description must be 1024 characters or less"
        return description
