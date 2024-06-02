#!/usr/bin/python3
"""This is the main app file for the project"""
from flask import Flask, request, render_template, redirect, url_for, jsonify, abort
from flask_session import Session
from models import storage
from models.users import User
from os import environ
from flask import session
# import redis
import uuid
import requests
from flask_cors import CORS

app = Flask(__name__)
app.secret_key = environ.get("FLASK_SECRET_KEY")

CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# Configure Redis for storing the session data on the server-side
# app.config["SESSION_TYPE"] = "redis"
# app.config["SESSION_PERMANENT"] = False
# app.config["SESSION_USE_SIGNER"] = True
# app.config["SESSION_REDIS"] = redis.from_url("redis://127.0.0.1:6379")

# Create and initialize the Flask-Session object AFTER `app` has been configured
# Session(app)


# @app.route("/manage_sessions/<user_id>", methods=["GET"], strict_slashes=False)
# def manage_sessions(user_id):
#     """Manage the user sessions"""
#     # Set the user_id in the session
#     session["user_id"] = user_id
#     return jsonify({"result" : "User ID set in the session"})

@app.route("/", methods=["GET"], strict_slashes=False)
def landing_page():
    """Render a sign up hrml form"""
    # # Check if the user is logged in
    # if "user_id" in session:
    #     # Redirect the user to their dashboard
    #     return redirect(url_for("dashboard"))
    #  else:
    #     # Show the normal landing page
    #     return render_template('index.html')
    return render_template("landingPage.html", cache_id=uuid.uuid4())


@app.route("/SignUpForm", methods=["GET", "POST"], strict_slashes=False)
def sign_up():
    """ Render a sign up html form"""
    if request.method == "GET":
        return render_template("signUp.html", cache_id=uuid.uuid4())
    if not request.get_json():
        abort(400, description="Not a JSON")
    url = "http://localhost:5001/api/v1/signup"
    data = request.get_json()
    # Specify the appropriate header for the POST request
    # headers = {'Content-type': 'application/json'}
    response = requests.post(url, json=data)
    response_dict = response.json()  # get the response as a dictionary
    user_id = response_dict.get("user_id", None)
    # if user_id:
    #     user_obj = storage.get(User, user_id)   # Get the user object
    #     user_obj.loged_in = True
    #     storage.save()  # Save the user object after login in
    return jsonify(response_dict), response.status_code



@app.route("/LogInForm", methods=["GET", "POST"], strict_slashes=False)
def log_in():
    """ Render a log in html form"""
    if request.method == "GET":
        return render_template("log_in.html", cache_id=uuid.uuid4())
    if not request.get_json():
        abort(400, description="Not a JSON")

    # make a POST request to the login API endpoint
    url = "http://localhost:5001/api/v1/login"
    data = request.get_json()
    # Specify the appropriate header for the POST request
    # headers = {'Content-type': 'application/json'}
    response = requests.post(url, json=data)
    response_dict = response.json()  # get the response as a dictionary
    # user_id = response_dict.get("user_id", None)
    # if user_id:
    #     user_obj = storage.get(User, user_id)
    #     if user_obj.loged_in is True:
    #         return jsonify({"message": "User already logged in.....", "user_id": user_id})
    #     else:
    #         user_obj.loged_in = True
    #         storage.save()
    #         return jsonify({"message": "User logged in successfully", "user_id": user_id})
    # else:
    return jsonify(response_dict), response.status_code


@app.route("/Profile/<user_id>", methods=["GET"], strict_slashes=False)
def profile(user_id):
    """ Render a profile html form"""
    # Check if the user is logged in
    user_obj = storage.get(User, user_id)
    if user_obj and user_obj.loged_in is True:
        return render_template("profile.html", user_id=user_id, cache_id=uuid.uuid4())
    else:
        return redirect(url_for("landing_page"))

if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000", threaded=True)
