from database import db
from sqlalchemy import ForeignKey
from .subkategorija import Subkategorijos
from sqlalchemy.orm import relationship

class Kategorijos(db.Model):
    __tablename__ = "kategorijos"

    id = db.Column(db.Integer, primary_key=True)
    sid = db.Column(db.Integer, ForeignKey('subkategorijos.id'), nullable=False)
    pavadinimas = db.Column(db.String(20), unique=True)

    subkategorija = relationship(Subkategorijos, foreign_keys=sid)

    def __repr__(self):
        return f'<Kategorija {self.pavadinimas} iš {self.subkategorija.pavadinimas}>'
    def __init__(self, pavadinimas, sid):
        self.pavadinimas = pavadinimas
        self.sid = sid