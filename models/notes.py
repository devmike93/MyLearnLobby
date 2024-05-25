#!/usr/bin/python3
"""This is the note model for the project"""


from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey, Text

class Note(BaseModel, Base):
    """This is the note model for the project
    
    Attrs:
        

    Methods:
    """

    __tablename__ = "notes"
    title = Column(String(256), nullable=False, default="Untitled")
    content = Column(Text, nullable=False, default="No content yet!")
    # user_id = Column(String(60), ForeignKey("users.id"), nullable=False)
    course_id = Column(String(60), ForeignKey("courses.id"), nullable=False)

    def __init__(self, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)