#!/usr/bin/python3
"""This is the user model for the project"""

from models.base_model import BaseModel, Base
import binascii
import hashlib
from sqlalchemy import Column, String
import os


class User(BaseModel, Base):
    """This is the user model for the project
    Attrs:
        first_name: str - first name of the user
        last_name: str - last name of the user
        email: str - email of the user
        password: str - password of the user

    Methods:
        __init__(self, *args, **kwargs) - initializes the User class
        hash_password(self, password: str) -
            hash the password using hashlib; sha256 algorithm and salting
    """
    __tablename__ = "users"
    first_name = Column(String(128), nullable=False)
    last_name = Column(String(128), nullable=False)
    email = Column(String(128), nullable=False)
    password = Column(String(128), nullable=False)

    def __init__(self, *args, **kwargs) -> None:
        """
        Initializes the User class
        Sets the email, password, first_name and last_name attributes
        Sets other attributes if kwargs is not empty
        """
        super().__init__(*args, **kwargs)
        if self.password:
            self.password = self.hash_password(self.password)

    def hash_password(self, password: str) -> str:
        """Hash the password using hashlib; sha256 algorithm and salting
        """
        # Create a slat from a random bytes String hashed with sha256
        salt = hashlib.sha256(os.urandom(60)).hexdigest()
        # Hash the password with the salt
        hashed_password = hashlib.pbkdf2_hmac('sha256',
                                              password.encode('utf-8'),
                                              salt.encode('ascii'),
                                              100000)
        # Convert the hashed password to hexadecimal representations
        # and then to String
        hashed_password_hexString = binascii.hexlify(hashed_password).decode('ascii')
        return salt + hashed_password_hexString
