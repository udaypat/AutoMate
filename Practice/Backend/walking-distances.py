import os

from dotenv import find_dotenv, load_dotenv
from googlemaps import Client

# Load environment variables from the .env file
load_dotenv(dotenv_path=find_dotenv())

# /AutoMate/Practice/.env

# Access the environment variables
secret_key = os.getenv("VITE_GOOGLE_MAPS_API_KEY")

gmaps = Client(key=secret_key)


u1 = {"lat": 19.01840125104431, "lng": 72.8372607837342}
u2 = {"lat": 19.020086994784351, "lng": 72.8439170312298}  # dadar station
u3 = {"lat": 19.0181, "lng": 72.8434}
u4 = {"lat": 19.0303, "lng": 72.8384}
u5 = {"lat": 19.01871777160118, "lng": 72.83636056319227}
u6 = {"lat": 20.01840125104431, "lng": 72.8372607837342}
u7 = {"lat": 20.01840125104431, "lng": 72.8372607837342}

# List of user locations with their addresses
user_addresses = [u1, u2, u3, u4, u5, u6, u7]

# Create an empty list to store pairs of users within 500 meters
close_users = []

# Compare all pairs of users
for i in range(len(user_addresses)):
    for j in range(i + 1, len(user_addresses)):
        user1_address = user_addresses[i]
        user2_address = user_addresses[j]

        # Calculate the distance and duration between two users using the Distance Matrix API
        result = gmaps.distance_matrix(
            user1_address, user2_address, units="metric", mode="walking"
        )

        if result["rows"][0]["elements"][0]["status"] == "OK":
            distance = result["rows"][0]["elements"][0]["distance"]["value"]
            # Distance is in meters, check if it's less than or equal to 500 meters
            if distance <= 500:
                close_users.append((f"User {i+1}", f"User {j+1}", distance))

# Sort the close_users list by distance in ascending order
close_users.sort(key=lambda x: x[2])

# Print the sorted list of close users
for user1, user2, distance in close_users:
    print(f"{user1} and {user2} are {distance} meters apart.")
