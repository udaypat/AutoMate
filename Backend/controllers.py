import bcrypt
from flask import jsonify, request
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    get_jwt_identity,
    jwt_required,
)
from main import app, ma
from models import User, db

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
        return jsonify({"msg": "Invalid Email"}), 401
    elif bcrypt.checkpw(password, curr_user.password):
        # Creating JWT token
        access_token = create_access_token(identity=curr_user.id)
        return jsonify(access_token=access_token)
    else:
        return jsonify({"msg": "Bad password"}), 401


# Create User
@app.post("/register")
def register():
    userdata = request.get_json()
    usr = User.query.filter_by(username=userdata["username"]).first()
    em = User.query.filter_by(email=userdata["email"]).first()

    if usr or em:
        return jsonify("User already Exists")
    password = userdata["password"].encode()

    # Hashing Password
    hashed_pass = bcrypt.hashpw(password, salt)

    # commiting Data
    db.session.add(
        User(
            username=userdata["username"],
            age=userdata["age"],
            gender=userdata["gender"],
            pgender=userdata["pgender"],
            pagegrp=userdata["pagegrp"],
            email=userdata["email"],
            password=hashed_pass,
        )
    )
    db.session.commit()
    return jsonify("Success")


# # Edit Profile
# @app.put("/edit_profile/<int:id>")
# # @jwt_required()
# def edit_profile(id):
#     current_userid = get_jwt_identity()
#     user = User.query.filter_by(current_userid).first()
#     data = request.get_json()
#     user.gender = data["gender"]
#     user.username = data["username"]
#     user.age = data["age"]
#     user.pagegrp = data["pagegrp"]
#     user.pgender = data["pgender"]

#     db.session.commit()
#     return jsonify(data)


@app.route("/")
def index():
    return "I love you sm"
