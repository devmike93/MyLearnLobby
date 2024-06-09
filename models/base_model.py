#!/usr/bin/python3
"""This is the base model for all other classes in this project
"""
from datetime import datetime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, DateTime
import uuid

Base = declarative_base()

time_format = "%Y-%m-%dT%H:%M:%S.%f"


class BaseModel:
    """This is the base model for all other classes in this project

    Attr:
        id: str - unique id for each instance
        created_at: datetime - time of instance creation
        updated_at: datetime - time of instance update


    Methods:
        __init__(self, *args, **kwargs) - initializes the BaseModel class
        __str__(self) - string representation of the BaseModel class
        to_dict(self) - returns a dictionary containing all keys/values of
        __dict__ of the instance
    """

    id = Column(String(60), primary_key=True)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow())
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow())

    def __init__(self, *args, **kwargs) -> None:
        """
        Initializes the BaseModel class
        Sets the id, created_at and updated_at attributes
        Sets other attributes if kwargs is not empty
        """
        if kwargs:
            for key, value in kwargs.items():
                setattr(self, key, value)
            if kwargs.get("id", None) is None:
                self.id = str(uuid.uuid4())
            if kwargs.get("created_at", None) is None:
                self.created_at = datetime.utcnow()
            if kwargs.get("updated_at", None) is None:
                self.updated_at = datetime.utcnow()
        else:
            self.id = str(uuid.uuid4())
            self.created_at = datetime.utcnow()
            self.updated_at = self.created_at

    def __str__(self) -> str:
        """String representation of the BaseModel class"""
        return "[{:s}] ({:s}) {}".format(
            self.__class__.__name__, self.id, self.__dict__
        )

    def save(self) -> None:
        """Updates the updated_at attribute with the current datetime"""
        from models import storage
        self.updated_at = datetime.utcnow()
        storage.new(self)
        storage.save()

    def delete(self) -> None:
        """Deletes the instance from storage"""
        from models import storage
        storage.delete(self)

    def to_dict(self) -> dict:
        """ Returns a dictionary containing all keys/values of
        __dict__ of the instance
        datatime objects are converted to string in ISO format
        """
        new_dict = self.__dict__.copy()
        new_dict["created_at"] = new_dict["created_at"].strftime(time_format)
        new_dict["updated_at"] = new_dict["updated_at"].strftime(time_format)
        if "_sa_instance_state" in new_dict:
            del new_dict["_sa_instance_state"]
        # Convert datetime objects to string in ISO format for start_date for course
        if "start_date" in new_dict:
            new_dict["start_date"] = new_dict["start_date"].strftime(time_format)
        if "excepted_end_date" in new_dict:
            new_dict["excepted_end_date"] = new_dict["excepted_end_date"].strftime(time_format)
        return new_dict
