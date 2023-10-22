# main.py

from flask import Flask
from flask_cors import CORS
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///automate.db"


db = SQLAlchemy(app)


ma = Marshmallow(app)

CORS(app)


from controllers import *

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
