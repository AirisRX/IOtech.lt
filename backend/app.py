from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_restful import Api

from api.auth import Register, Login

from api.product import CategoryAPI, ProductsAPI, ProductInfoAPI

from database import db
from settings import database_uri

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = database_uri
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

db.init_app(app)


@app.route('/img/<path:path>')
def serve_static(path):
    return send_from_directory('img', path)


with app.app_context():
    db.create_all()

api = Api(app)

api.add_resource(Register, '/auth/register')
api.add_resource(Login, '/auth/login')
api.add_resource(CategoryAPI, '/product/category')
api.add_resource(ProductsAPI, '/product/products')
api.add_resource(ProductInfoAPI, '/product/productinfo')
