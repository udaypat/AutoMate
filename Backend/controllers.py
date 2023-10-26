import os

import bcrypt
from dotenv import find_dotenv, load_dotenv
from flask import jsonify, request
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    get_jwt_identity,
    jwt_required,
)
from googlemaps import Client
from main import app, ma
from models import User, db

load_dotenv(dotenv_path=find_dotenv())

jwt = JWTManager(app)


salt = bcrypt.gensalt()

# Access the environment variables
secret_key = os.getenv("VITE_GOOGLE_MAPS_API_KEY")

gmaps = Client(key=secret_key)


# Auto generate Schema using models
class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User


matched_users = {}

# searching_users = {
#     1: {
#         "currentloc": {"lat": 20.01840125104431, "lng": 72.8372607837342},
#         "dest": "asc",
#     },
#     9: {
#         "currentloc": {"lat": 20.01840125104431, "lng": 72.8372607837342},
#         "dest": "asc",
#     },
# }

searching_users = {}


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
        return jsonify("User already Exists"), 412
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


@app.post("/destination")
def destination():
    autocomplete_data = request.get_json()
    # coordinates = autocomplete_data["geometry"]["location"]
    name = autocomplete_data["name"]
    return name


@app.post("/route")
def generate_route():
    locations = request.get_json()
    waypoint = locations["waypoint"]
    destination = locations["destination"]
    # maps_link = f"https://www.google.com/maps/dir/My+Location/{waypoint['lat']},{waypoint['lng']}/{destination['lat']},{destination['lng']} "
    maps_link = f"https://www.google.com/maps/dir/My+Location/{waypoint['lat']},{waypoint['lng']}/{destination}"

    return maps_link


# Adds users to a searching queue
@app.post("/search")
@jwt_required()
def search():
    current_userid = get_jwt_identity()
    data = request.get_json()

    global searching_users

    user_obj = {"currentloc": data["loc"], "dest": data["dest"]}
    searching_users.update({current_userid: user_obj})

    return searching_users


# Compares curr user with all other users in the search queue and matchs with nearest one
@app.get("/match")
@jwt_required()
def match():
    global searching_users
    # print(searching_users)
    # print(len(searching_users))

    if len(searching_users) < 2:
        return jsonify("No other user currently searching"), 400

    current_userid = get_jwt_identity()
    # origins = request.get_json()
    origin = searching_users[current_userid]["currentloc"]
    # origins = [
    #     {"lat": 20.01840125104432, "lng": 72.8372607837342}
    # ]  current user location from frontend
    destinations = []  # global list

    for user_id, user_data in searching_users.items():
        if user_id == current_userid:
            continue
        currentloc = user_data.get("currentloc", {})
        if currentloc:
            destination = user_data.get("dest", "")
            result = gmaps.distance_matrix(
                origins=origin,
                destinations=[currentloc],
                units="metric",
                mode="walking",
            )
            if result and "rows" in result and result["rows"]:
                elements = result["rows"][0]["elements"]
                if elements and elements[0]["status"] == "OK":
                    distance_text = elements[0]["distance"].get("value")
                else:
                    distance_text = "N/A"
            else:
                distance_text = "N/A"
            print(distance_text)
            if (
                distance_text < 50000
                and destination == searching_users[current_userid]["dest"]
            ):
                response_data = {
                    "user_id": user_id,
                    "destination": destination,
                    "distance": distance_text,
                    "loc": currentloc,
                }
                destinations.append(response_data)

            # response_data = {
            #     "user_id": user_id,
            #     "destination": destination,
            #     "distance": distance_text,
            #     "loc": currentloc,
            # }
            # destinations.append(response_data)

    print(len(destinations), destinations)
    if len(destinations) == 0:
        return jsonify("No user near you!"), 400

    destinations = sorted(destinations, key=lambda x: x["distance"])

    global matched_users

    user1 = {
        "user_id": current_userid,
        "accepted": False,
        "loc": origin,
        "matched_id": destinations[0]["user_id"],
    }

    user2 = {
        "user_id": destinations[0]["user_id"],
        "accepted": False,
        "loc": destinations[0]["loc"],
        "matched_id": current_userid,
    }
    if user1["user_id"] not in matched_users:
        matched_users[user1["user_id"]] = user1

    if user2["user_id"] not in matched_users:
        matched_users[user2["user_id"]] = user2

    # item_tuple = (
    #     {
    #         "origin_user_id": current_userid,
    #         "origin_accepted": False,
    #         "origin_loc": origins[0],
    #     },
    #     {
    #         "dest_user_id": destinations[0]["user_id"],
    #         "dest_accepted": False,
    #         "dest_loc": destinations[0]["loc"],
    #     },
    # )
    # # Check if the swapped tuple exists in matched_users
    # swapped_tuple = (item_tuple[1], item_tuple[0])

    # swapped_user_tuple = (
    #     {
    #         "origin_user_id": item_tuple[1]["dest_user_id"],
    #         "origin_accepted": item_tuple[1]["dest_accepted"],
    #         "origin_loc": item_tuple[1]["dest_loc"],
    #     },
    #     {
    #         "dest_user_id": item_tuple[0]["origin_user_id"],
    #         "dest_accepted": item_tuple[0]["origin_accepted"],
    #         "dest_loc": item_tuple[0]["origin_loc"],
    #     },
    # )
    # swapped_user_tuple_tuple = (swapped_user_tuple[1], swapped_user_tuple[0])

    # if (
    #     item_tuple not in matched_users
    #     and swapped_tuple not in matched_users
    #     and swapped_user_tuple not in matched_users
    #     and swapped_user_tuple_tuple not in matched_users
    # ):
    #     matched_users.append(item_tuple)

    # print("matched users from distances: ", matched_users)
    return matched_users

    # return jsonify({"origin_user_id": current_userid, "distance_matrix": destinations})


# def find_matching_tuple(id_to_match, data):
#     for tuple_pair in data:
#         origin_dict, dest_dict = tuple_pair
#         if (
#             origin_dict["origin_user_id"] == id_to_match
#             or dest_dict["dest_user_id"] == id_to_match
#         ):
#             return tuple_pair
#     return None  # Return None if no matching tuple is found


# Checks if a user has accepted
@app.get("/accepted")
@jwt_required()
def origin_accepted():
    current_userid = get_jwt_identity()
    global matched_users

    try:
        matched_users[current_userid]["accepted"] = True

        return matched_users
    except:  # noqa
        return "no user is matched with current user.", 401

    # Iterate through the list and update the "accepted" value to True if the ID matches
    # for pair in matched_users:
    #     if pair[0]["origin_user_id"] == target_id:
    #         pair[0]["origin_accepted"] = True
    #     if pair[1]["dest_user_id"] == target_id:
    #         pair[1]["dest_accepted"] = True
    # return matched_users


@app.get("/reject")
@jwt_required()
def reject():
    global matched_users
    global searching_users

    current_userid = get_jwt_identity()
    try:
        del searching_users[current_userid]
        del matched_users[current_userid]
        other_user_id = matched_users[current_userid]["matched_id"]
        del matched_users[other_user_id]
    except:
        return "Something went wrong. fix it"

    return jsonify("Rejected")


# Checks if both user accepted
@app.get("/consent")
@jwt_required()
def consent():
    current_userid = get_jwt_identity()

    try:
        other_user_id = matched_users[current_userid]["matched_id"]

        if (
            matched_users[current_userid]["accepted"]
            and matched_users[other_user_id]["accepted"]
        ):
            return "both accepted"
        else:
            return "both did not accepted", 401
    except:  # noqa
        return "no user is matched with current user.", 401


@app.get("/id")
@jwt_required()
def id():
    current_userid = get_jwt_identity()
    return str(current_userid)


# @app.get("/match")
# @jwt_required()
# def match():
#     current_userid = get_jwt_identity()
#     id_to_check = 9
#     match = {}
#     print("matched users from match: ", matched_users)
#     for user in matched_users:
#         print(1)
#         print(not user["origin_accepted"])
#         print(not user["dest_accepted"])
#         while (not user["origin_accepted"] != 0) or (not user["dest_accepted"] != 0):
#             print(2)
#             if (
#                 id_to_check == user["origin_user_id"]
#                 or id_to_check == user["dest_user_id"]
#             ):
#                 print(3)
#                 if user["origin_accepted"] == 2 and user["dest_accepted"] == 2:
#                     print(4)
#                     # return user
#                     return "hell yasss"
#                 else:
#                     print(5)
#                     print("rejected")
#                     # return jsonify("waiting for user"), 201
#     # return "rejected"
#     return match


# @app.get("/origin_accepted")
# def origin_accepted():
#     matched_users[0]["origin_accepted"] = 2
#     print("yay1")
#     return "yay1"


# @app.get("/dest_accepted")
# def dest_accepted():
#     matched_users[0]["dest_accepted"] = 2
#     print("yay2")
#     return "yay2"


# @app.get("/origin_rejected")
# def origin_rejected():
#     matched_users[0]["origin_accepted"] = 1
#     print("nay1")
#     return "nay1"


# @app.get("/dest_rejected")
# def dest_rejected():
#     matched_users[0]["dest_accepted"] = 1
#     print("nay2")
#     return "nay2"


# @app.get("/distances")
# # @jwt_required()
# def distance():
#     global searching_users
#     destinations = []

#     for i in searching_users:
#         destinations.append(searching_users[i]["currentloc"])

#     origins = [{"lat": 19.020086994784351, "lng": 72.8439170312298}]
#     result = gmaps.distance_matrix(
#         origins=origins, destinations=destinations, units="metric", mode="walking"
#     )

#     [{"dest": destination, "origin": origin, "distance": distance}]

# close_users = []
# if result["rows"][0]["elements"][0]["status"] == "OK":
#     for in
#     distance = result["rows"][0]["elements"][0]["distance"]["value"]
#     # Distance is in meters, check if it's less than or equal to 500 meters
#     if distance <= 500:
#         close_users.append((f"User {i+1}", f"User {i}", distance))

# close_users.sort(key=lambda x: x[2])
# print(close_users)

# return result

# Create an empty list to store pairs of users within 500 meters
# close_users = []

# # Compare all pairs of users
# for i in range(len(user_addresses)):
#     for j in range(i + 1, len(user_addresses)):
#         user1_address = user_addresses[i]
#         user2_address = user_addresses[j]

#         # Calculate the distance and duration between two users using the Distance Matrix API
#         result = gmaps.distance_matrix(
#             user1_address, user2_address, units="metric", mode="walking"
#         )

#         if result["rows"][0]["elements"][0]["status"] == "OK":
#             distance = result["rows"][0]["elements"][0]["distance"]["value"]
#             # Distance is in meters, check if it's less than or equal to 500 meters
#             if distance <= 500:
#                 close_users.append((f"User {i+1}", f"User {j+1}", distance))

# # Sort the close_users list by distance in ascending order
# close_users.sort(key=lambda x: x[2])

# # Print the sorted list of close users
# for user1, user2, distance in close_users:
#     print(f"{user1} and {user2} are {distance} meters apart.")


@app.route("/")
def index():
    return "I love you sm"
