#!/usr/bin/python3
"""This is the model that interacts with the database"""

from models.base_model import Base
from sqlalchemy import create_engine
from os import getenv


class DBStorage:
    """
    This is the class for the database storage

    Attrs:

    Methods:
    """
    __engine = None
    __session = None

    def __init__(self):
        """Instantiate a DBStorage object"""
        PROJECT_MYSQL_USER = getenv('PROJECT_MYSQL_USER')
        PROJECT_MYSQL_PWD = getenv('PROJECT_MYSQL_PWD')
        PROJECT_MYSQL_HOST = getenv('PROJECT_MYSQL_HOST')
        PROJECT_MYSQL_DB = getenv('PROJECT_MYSQL_DB')
        DROP_DB= getenv('DROP_DB')

        self.__engine = create_engine('mysql+mysqldb://{}:{}@{}/{}'.format(
                                       PROJECT_MYSQL_USER,
                                       PROJECT_MYSQL_PWD,
                                       PROJECT_MYSQL_HOST,
                                       PROJECT_MYSQL_DB), pool_pre_ping=True)
        if DROP_DB == "True":
            Base.metadata.drop_all(self.__engine)


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

    # def all(self, cls=None):
        
