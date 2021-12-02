from database import db
from models import Kategorijos
from flask import request
from flask_restful import Resource

class Kategorija(Resource):
    def get(self):
        data = request.get_json()

        kategorija = db.session.query(Kategorijos.pavadinimas)

        # if data and 'kategorija' in data:
            # kategorija = kategorija.filter_by()

        if not data and 'sid' not in data:
            kategorija = kategorija.all()

        print(kategorija)
