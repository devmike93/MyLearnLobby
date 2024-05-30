#!/usr/bin/python3
"""This is the main app file for the project"""
from flask import Flask, request, render_template
import uuid
from flask_cors import CORS


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/", methods=["GET"], strict_slashes=False)
def landing_page():
    """Render a sign up hrml form"""
    return render_template("landingPage.html", cache_id=uuid.uuid4())


@app.route("/SignUpForm", methods=["GET"], strict_slashes=False)
def sign_up():
    """ Render a sign up html form"""
    return render_template("signUp.html", cache_id=uuid.uuid4())

@app.route("/LogInForm", methods=["GET"], strict_slashes=False)
def log_in():
    """ Render a log in html form"""
    return render_template("log_in.html", cache_id=uuid.uuid4())

if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000")