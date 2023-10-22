from flask import Blueprint, jsonify, request

import bcrypt

from flask import jsonify, request

from main import app, ma, cache
from models import User, db


app = Blueprint("controllers", __name__)


from flask_jwt_extended import (
    create_access_token,
    get_jwt_identity,
    jwt_required,
    JWTManager,
)

jwt = JWTManager(app)


salt = bcrypt.gensalt()


# Auto generate Schema using models
class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User


@app.post("/login")
def login():
    # Getting user Creds
    userdata = request.get_json()
    email = userdata["email"]
    password = userdata["password"].encode()

    # Getting Creds from db
    curr_user = User.query.filter_by(email=email).first()

    # checking creds
    if curr_user is None:
        return jsonify({"msg": "Invalid Email"})
    elif bcrypt.checkpw(password, curr_user.password):
        # Creating JWT token
        cache.clear()
        access_token = create_access_token(identity=curr_user.id)
        return jsonify(access_token=access_token)
    else:
        return jsonify({"msg": "Bad password"})


# Create User
@app.post("/register")
def register():

    # Getting data
    userdata = request.get_json()
    usr = User.query.filter_by(username=userdata["username"]).first()
    em = User.query.filter_by(email=userdata["email"]).first()
    pn = User.query.filter_by(phone=userdata["phone"]).first()


    if usr or em or pn:
        return jsonify("User already Exists")
    password = userdata["password"].encode()

    # Hashing Password
    hashed_pass = bcrypt.hashpw(password, salt)

    # commiting Data
    db.session.add(
        User(
            username=userdata["username"], email=userdata["email"], phone=userdata["phone"], password=hashed_pass
        ),
    )
    db.session.commit()
    return jsonify("Success")



@app.route("/")
def index():
    return "Welcome to the Automate App"
