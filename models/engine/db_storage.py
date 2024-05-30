#!/usr/bin/python3
"""This is the model that interacts with the database"""

from models.base_model import Base
from sqlalchemy.orm import sessionmaker, scoped_session
from models.users import User
from models.courses import Course
from models.tasks import Task
from models.resources import Resource
from models.notes import Note
from sqlalchemy import create_engine
from os import getenv


classes = {"User": User, "Course": Course, "Task": Task, "Resource": Resource, "Note": Note}


class DBStorage:
    """
    This is the class for the database storage

    Attrs:
        __engine: SQLAlchemy engine
        __session: SQLAlchemy session

    Methods:
        __init__(self) - initializes the DBStorage object
        new(self, obj) - adds the object to the current database session
        save(self) - commits all changes of the current database session
        delete(self, obj=None) -
            deletes from the current database session obj if not None
        all(self, cls=None) -
            queries on the current database session all objects of class cls
        or all objects if cls is None
        get(self, cls, id) - get an object based on class and id
        count(self, cls=None) - counts all objects in storage
        reload(self) -
            creates all tables in the database and the current database session
        close(self) - closes the current session
    """
    __engine = None
    __session = None

    def __init__(self):
        """Instantiate a DBStorage object"""
        PROJECT_MYSQL_USER = getenv('PROJECT_MYSQL_USER')
        PROJECT_MYSQL_PWD = getenv('PROJECT_MYSQL_PWD')
        PROJECT_MYSQL_HOST = getenv('PROJECT_MYSQL_HOST')
        PROJECT_MYSQL_DB = getenv('PROJECT_MYSQL_DB')
        DROP_DB = getenv('DROP_DB')

        self.__engine = create_engine('mysql+mysqldb://{}:{}@{}/{}'.format(
                                       PROJECT_MYSQL_USER,
                                       PROJECT_MYSQL_PWD,
                                       PROJECT_MYSQL_HOST,
                                       PROJECT_MYSQL_DB), pool_pre_ping=True)
        if DROP_DB == "True":
            Base.metadata.drop_all(self.__engine)
    @property
    def session(self):
        """Return the current session"""
        return self.__session

    def new(self, obj):
        """Add the object to the current database session"""
        self.__session.add(obj)

    def save(self):
        """Commit all changes of the current database session"""
        self.__session.commit()

    def delete(self, obj=None):
        """Delete from the current database session obj if not None"""
        if obj:
            self.__session.delete(obj)

    def all(self, cls=None):
        """Query on the current database session all objects of class cls
        or all objects if cls is None
        """
        objs_dict = {}
        for _class in classes:
            if cls is None or cls is classes[_class] or cls is _class:
                list_objs = self.__session.query(classes[_class]).all()
                for obj in list_objs:
                    key = obj.__class__.__name__ + "." + obj.id
                    objs_dict[key] = obj
        return objs_dict

    def get(self, cls, id):
        """Get an object based on class and id"""

        if cls is None or cls not in classes.values():
            return None

        objs_dict = self.all(cls)
        for obj in objs_dict.values():
            if obj.id == id:
                return obj
        return None

    def count(self, cls=None):
        """Count all objects in storage"""
        return len(self.all(cls))

    def reload(self):
        """Create all tables in the database and the current database session"""
        Base.metadata.create_all(self.__engine)
        # print(Base.metadata.tables)
        session_factory = sessionmaker(bind=self.__engine, expire_on_commit=False)
        Session = scoped_session(session_factory)
        self.__session = Session

    def close(self):
        """Close the current session"""
        self.__session.remove()
