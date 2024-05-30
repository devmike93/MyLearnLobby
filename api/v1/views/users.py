#!/usr/bin/python3
""""RestFull API routes for the users model"""

from api.v1.views import app_views
from flask import jsonify, request, abort
from models import storage
from models.users import User

@app_views.route('/signup', methods=['POST'], strict_slashes=False)
def signup():
    """Sign up a new user"""
    # get the daata from the request form
    if not request.get_json():
        abort(400, description="Not a JSON")
    data = request.get_json()
    user_first_name = data.get('first_name')
    user_last_name = data.get('last_name')
    user_email = data.get('email')
    user_password = data.get('password')
    user_v_password = data.get("password_v")

    if not all([user_first_name, user_last_name, user_email, user_password]):
        return jsonify({"error": "Missing data"}), 400
    # if user_password != user_v_password:
    #     return jsonify({"error": "Passwords do not match...."}), 400
    # more check to verify the email syntax and if it exits in any mail server

    # check if user already have an account
    existing_user_email = storage.session.query(User).filter_by(email=user_email).first()
    if existing_user_email:
        return jsonify({"error": "User already exists"}), 400
    # print(user_first_name)
    # print(user_last_name)
    # print(user_email)
    print(type(user_password))
    # print(user_password)
    # print(type(user_verify_password))
    print(user_v_password)
    new_user = User(first_name=user_first_name, last_name=user_last_name, email=user_email, password=user_password)
    new_user.save()
    # add the new user to the session
    from api.app import session
    session["user_id"] = new_user.id
    return jsonify({"message": "User created successfully", "user_id": new_user.id}), 201

@app_views.route('/login', methods=['POST'], strict_slashes=False)
def login():
    """Log in a user"""
    if not request.get_json():
        abort(400, description="Not a JSON")
    data = request.get_json()
    user_email = data.get('email')
    user_password = data.get('password')

    if not all([user_email, user_password]):
        return jsonify({"error": "Missing data"}), 400

    # check if user exists
    existing_user = storage.session.query(User).filter_by(email=user_email).first()
    if not existing_user:
        return jsonify({"error": "User does not exist"}), 400

    # check if password is correct
    if existing_user.verify_password(user_password) is False:
        return jsonify({"error": "Invalid password"}), 400

    from api.app import session
    session["user_id"] = existing_user.id
    return jsonify({"message": "User logged in successfully", "user_id": existing_user.id}), 200

