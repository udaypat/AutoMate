# controllers.py

from flask import Blueprint, jsonify, request

# from models import Task, db

app = Blueprint("controllers", __name__)


@app.route("/")
def index():
    return "Welcome to the Automate App"
