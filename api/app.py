#!/usr/bin/python3
""" Flask API Application"""
from os import environ
from models import storage
from api.v1.views import app_views
from flask import Flask, make_response, jsonify
# from flask_session import Session
# from flask import session
# import redis
from flask_cors import CORS

app = Flask(__name__)
app.secret_key = environ.get("FLASK_SECRET_KEY")

# # Configure Redis for storing the session data on the server-side
# app.config["SESSION_TYPE"] = "redis"
# app.config["SESSION_PERMANENT"] = False
# app.config["SESSION_USE_SIGNER"] = True
# app.config["SESSION_REDIS"] = redis.from_url("redis://127.0.0.1:6379")

# # Create and initialize the Flask-Session object AFTER `app` has been configured
# Session(app)

app.config["JSONIFY_PRETTYPRINT_REGULAR"] = True
app.register_blueprint(app_views)
CORS(app, resources={r"/api/v1/*": {"origins": "*"}})

@app.teardown_appcontext
def close_db(error):
    """Close Storage"""
    storage.close()


@app.errorhandler(404)
def not_found(error):
    """404 Error
    ---
    responses:
      404:
        description: a resource was not found
    """
    return make_response(jsonify({"error": "Not found"}), 404)

if __name__ == "__main__":
    """ Main Function """
    host = environ.get("HBNB_API_HOST")
    port = environ.get("HBNB_API_PORT")
    if not host:
        host = "0.0.0.0"
    if not port:
        port = "5001"
    app.run(host=host, port=port, threaded=True)