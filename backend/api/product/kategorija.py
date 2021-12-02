from database import db
from models import Kategorijos
from flask import request
from flask_restful import Resource
from collections import defaultdict

class Kategorija(Resource):
    def get(self):
        data = request.get_json()

        kategorijos = db.session.query(Kategorijos).all()

        rez = defaultdict(list)

        for kategorija in kategorijos:
            rez[kategorija.subkategorija.pavadinimas].append(kategorija.pavadinimas)

        return rez
