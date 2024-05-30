#!/usr/bin/python3
"""This is the resource model for the project"""

from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Integer, ForeignKey

class Resource(BaseModel, Base):
    """This is the resources model for the project
    
    Attrs:
        title: str - title of the resource
        link: str - link to the resource
        type: str - type of the resource (video, article, book, video_list, online_course)
        progress: int - progress of the resource
        course_id: str - id of the course that the resource belongs to

    Methods:
        __init__(self, *args, **kwargs) - initializes the Resource Object
    """

    __tablename__ = "resources"
    title = Column(String(256), nullable=False)
    link = Column(String(1024), nullable=False)
    type = Column(String(256), nullable=False)
    progress = Column(Integer, nullable=False, default=0)
    course_id = Column(String(60), ForeignKey("courses.id"), nullable=False)

    def __init__(self, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)