from flask import Flask
from flask_cors import CORS
from flask_restful import Api

from api.auth import Email, Register, Login

from api.product import CategoryAPI

from database import db
from settings import database_uri

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
api.add_resource(CategoryAPI, '/product/category')
