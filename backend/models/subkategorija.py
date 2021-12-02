from database import db

class Subkategorijos(db.Model):
    __tablename__ = "subkategorijos"

    id = db.Column(db.Integer, primary_key=True)
    pavadinimas = db.Column(db.String(20), unique=True)

    def __repr__(self):
        return f'<Product {self.brand} {self.model}>'
    def __init__(self, pavadinimas):
        self.pavadinimas = pavadinimas
        