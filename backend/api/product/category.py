from flask import request
from flask_restful import Resource
from models.category import Category


class CategoryAPI(Resource):
    def get(self):
        data = request.get_json()
