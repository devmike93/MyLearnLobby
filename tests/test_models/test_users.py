#!/usr/bin/python3
"""This model is for testing the User class"""

import binascii
from datetime import datetime
import hashlib
import unittest
from models.base_model import BaseModel
from models import storage
from models.users import User
from sqlalchemy.inspection import inspect



class TestUSERClass(unittest.TestCase):
    """This class is for testing the User class"""

    def test_user_inheritance(self):
        """Test if User is a subclass of BaseModel"""
        self.assertTrue(issubclass(User, BaseModel))

    def test_user_obj_type(self):
        """Test the creation of a User object and its type"""
        user1 = User()
        self.assertIsInstance(user1, User)
        self.assertIsInstance(user1, BaseModel)

    def test_table_name(self):
        self.assertEqual(User.__tablename__, "users")

    def test_columns(self):
        mapper = inspect(User)
        expected_columns = [
            "first_name",
            "last_name",
            "email",
            "password",
            "id",
            "created_at",
            "updated_at",
        ]
        existing_columns = [column.key for column in mapper.attrs]
        # print(expected_columns)
        # print(existing_columns)
        self.assertEqual(existing_columns, expected_columns)

    def test_user_instantiation_and_attrs_type_with_no_kwargs(self):
        """Test the instantiation of a User object without kwargs"""
        user1 = User()
        self.assertTrue(hasattr(user1, "id"))
        self.assertTrue(hasattr(user1, "created_at"))
        self.assertTrue(hasattr(user1, "updated_at"))

        self.assertEqual(type(user1.id), str)
        self.assertTrue(type(user1.created_at), datetime)
        self.assertTrue(type(user1.updated_at), datetime)

    def test_user_instantiation_and_attrs_type_with_kwargs(self):
        """Test the instantiation of a User object with kwargs"""
        user1 = User(first_name="John", last_name="Doe", email="john@Doe.com",
                     password="password")
        self.assertTrue(hasattr(user1, "id"))
        self.assertTrue(hasattr(user1, "created_at"))
        self.assertTrue(hasattr(user1, "updated_at"))
        self.assertTrue(hasattr(user1, "first_name"))
        self.assertTrue(hasattr(user1, "last_name"))
        self.assertTrue(hasattr(user1, "email"))
        self.assertTrue(hasattr(user1, "password"))

        self.assertEqual(type(user1.id), str)
        self.assertTrue(type(user1.created_at), datetime)
        self.assertEqual(type(user1.updated_at), datetime)
        self.assertEqual(type(user1.first_name), str)
        self.assertEqual(type(user1.last_name), str)
        self.assertEqual(type(user1.email), str)
        self.assertEqual(type(user1.password), str)

    def test_user_hash_password(self):
        """Test the hash_password method"""
        password = "password"
        user1 = User(
            first_name="John",
            last_name="Doe",
            email="john@Doe.com",
            password=password,
        )
        salt = user1.password[:64]
        excepted_hashed_password = user1.password[64:]
        ccurrent_hashed_password = hashlib.pbkdf2_hmac(
            "sha256", password.encode("utf-8"), salt.encode("ascii"), 100000
        )
        ccurrent_hashed_password_hexString = binascii.hexlify(
            ccurrent_hashed_password
        ).decode("ascii")

        # print(excepted_hashed_password)
        # print(ccurrent_hashed_password_hexString)
        self.assertNotEqual(password, user1.password)
        self.assertEqual(excepted_hashed_password, ccurrent_hashed_password_hexString)

    def test_user_str(self):
        """Test the __str__ method of User"""
        user1 = User()
        self.assertEqual(str(user1), "[User] ({}) {}".format(user1.id, user1.__dict__))

    def test_user_to_dict(self):
        """Test the to_dict method of User"""
        user1 = User()
        user1_dict = user1.to_dict()
        self.assertNotEqual(user1.__dict__, user1_dict)
        # self.assertTrue("__class__" in user1_dict)
        self.assertTrue(type(user1_dict["created_at"]), str)
        self.assertTrue(type(user1_dict["updated_at"]), str)
        self.assertTrue("id" in user1_dict)
        self.assertTrue("created_at" in user1_dict)
        self.assertTrue("updated_at" in user1_dict)
        self.assertFalse("password" in user1_dict)
        self.assertFalse("first_name" in user1_dict)
        self.assertFalse("last_name" in user1_dict)
        self.assertFalse("email" in user1_dict)

        user2 = User(
            first_name="John",
            last_name="Doe",
            email="john@Doe.com",
            password="password",
        )
        user2_dict = user2.to_dict()
        self.assertNotEqual(user2.__dict__, user2_dict)
        # self.assertTrue("__class__" in user2_dict)
        self.assertTrue(type(user2_dict["created_at"]), str)
        self.assertTrue(type(user2_dict["updated_at"]), str)
        self.assertTrue("id" in user2_dict)
        self.assertTrue("created_at" in user2_dict)
        self.assertTrue("updated_at" in user2_dict)
        self.assertTrue("password" in user2_dict)
        self.assertTrue("first_name" in user2_dict)
        self.assertTrue("last_name" in user2_dict)
        self.assertTrue("email" in user2_dict)

    def test_user_saved_to_database_using_reload_all_save_new(self):
        """Test the User object is saved to the database"""
        user1 = User(
            first_name="Nile",
            last_name="Doe",
            email="john@Doe.com",
            password="password",
        )
        storage.reload()
        user1.save()
        self.assertIn("User." + user1.id, storage.all().keys())

    def test_user_delete(self):
        """Test the delete method of User"""
        user1 = User(
            first_name="John",
            last_name="Doe",
            email="john@Doe.com",
            password="password",
        )
        storage.reload()
        user1.save()
        self.assertIn("User." + user1.id, storage.all().keys())
        user1.delete()
        storage.save()
        self.assertNotIn("User." + user1.id, storage.all().keys())

    def test_user_get_method(self):
        """Test the get method of User"""
        user1 = User(
            first_name="Moe",
            last_name="Doe",
            email="john@Doe.com",
            password="password",
        )
        storage.reload()
        user1.save()
        user_id = user1.id
        self.assertEqual(user1, storage.get(User, user_id))
        self.assertIsNone(storage.get(User, "123"))
        self.assertIsNone(storage.get("ser", user_id))
