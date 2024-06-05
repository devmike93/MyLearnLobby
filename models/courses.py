#!/usr/bin/python3
"""This is the course model for the project"""

from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, DateTime, ForeignKey, Integer
from sqlalchemy.orm import validates, relationship

class Course(BaseModel, Base):
    """
    This is the course model for the project

    Attrs:
        title: str - title of the course
        description: str - description of the course
        goals: str - the users' goals out of this course
        start_date: datetime - start date of the course
        excepted_end_date: datetime - excepted end date of the course
        user_id: str - id of the user who created the course

    Methods:
        __init__(self, *args, **kwargs) - initializes the Course class
        validate_description(self, key, description) - validates the description
        validate_title(self, key, title) - validates the title
    """
    __tablename__ = "courses"
    title = Column(String(256), nullable=False)
    description = Column(String(1024), nullable=True)
    goals = Column(String(1024), nullable=False)
    start_date = Column(DateTime, nullable=True)
    excepted_end_date = Column(DateTime, nullable=True)
    link = Column(String(1024), nullable=False)
    type = Column(String(256), nullable=False)
    progress = Column(Integer, nullable=False, default=0)
    counter = Column(Integer, nullable=False, default=100)
    user_id = Column(String(60), ForeignKey("users.id"), nullable=False)
    tasks = relationship("Task", backref="course",
                         cascade="all, delete, delete-orphan")
    resourse = relationship("Resource", backref="course",
                            cascade="all, delete, delete-orphan")
    notes = relationship("Note", backref="course")


    @validates("description")
    def validate_description(self, key, description):
        assert len(description) <= 1024, "Description must be 1024 characters or less"
        return description
    
    @validates("title")
    def validate_title(self, key, title):
        assert len(title) <= 256, "Title must be 256 characters or less"
        return title
    
    def __init__(self, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)
