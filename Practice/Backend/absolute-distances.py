from geopy.distance import geodesic

# Define the coordinates of the two users
user1_coords = (
    19.01840125104431,
    72.8372607837342,
)  # Replace with the actual coordinates of User 1

user2_coords = (
    19.02008699478435,
    72.8439170312298,
)  # Replace with the actual coordinates of User 2

# Calculate the distance between the two users
distance = geodesic(user1_coords, user2_coords).meters

# print(distance)

# Check if the distance is less than or equal to 500 meters
if distance <= 500:
    print("Users are within 500 meters of each other.")
else:
    print("Users are more than 500 meters apart.")


from geopy.distance import geodesic

# List of user locations with their latitude and longitude coordinates
user_locations = [
    {"name": "User1", "coords": (19.01840125104431, 72.8372607837342)},
    {"name": "User2", "coords": (19.02008699478435, 72.8439170312298)},
    {"name": "User3", "coords": (19.0181, 72.8434)},
    {"name": "User4", "coords": (19.0303, 72.8384)},
    {"name": "User5", "coords": (19.01871777160118, 72.83636056319227)},
    # Add more users with their coordinates
]

# Create an empty list to store pairs of users within 500 meters
close_users = []

# Compare all pairs of users
for i, user1 in enumerate(user_locations):
    for j, user2 in enumerate(user_locations):
        if i < j:  # Ensure we don't compare a user with themselves or repeat pairs
            distance = geodesic(user1["coords"], user2["coords"]).meters
            if distance <= 500:
                close_users.append((user1["name"], user2["name"], distance))

# Sort the close_users list by distance in ascending order
close_users.sort(key=lambda x: x[2])

# Print the sorted list of close users
for user1, user2, distance in close_users:
    print(f"{user1} and {user2} are {distance:.5f} meters apart.")
