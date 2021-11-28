from database import db
from models import Product
from flask import request
from flask_restful import Resource

def row2dict(row):
    d = {}
    for column in row.__table__.columns:
        d[column.name] = str(getattr(row, column.name))

    return d

class Products(Resource):
    def get(self):
        products = db.session.query(Product).all()
        return [row2dict(x) for x in products]