from flask import Flask, make_response, request
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from flask_cors import CORS

from settings import database_uri
from database import db
from api import Email, Login, Register, Products

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = database_uri 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

db.init_app(app)

with app.app_context():
    db.create_all()

api = Api(app)

api.add_resource(Register, '/auth/register')
api.add_resource(Login, '/auth/login')
api.add_resource(Email, '/auth/email')
api.add_resource(Products, '/product')