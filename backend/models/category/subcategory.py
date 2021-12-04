from database import db


class Subcategory(db.Model):
    __tablename__ = "subcategory"

    ctid = db.Column(db.Integer, db.ForeignKey('category.id'), primary_key=True)
    sctid = db.Column(db.Integer, db.ForeignKey('category.id'), primary_key=True)

    category = db.relationship('Category', foreign_keys=ctid)
    subcategory = db.relationship('Category', foreign_keys=sctid)

    def __repr__(self):
        return f'<{self.cat1.name} subcategory is {self.cat2.name}>'

    def __init__(self, ctid1, ctid2):
        self.ctid1 = ctid1
        self.ctid2 = ctid2
