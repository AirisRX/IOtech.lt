from database import db


class SubComponent(db.Model):
    __tablename__ = "subcomponent"

    cmid1 = db.Column(db.Integer, db.ForeignKey('component.id'), primary_key=True)
    cmid2 = db.Column(db.Integer, db.ForeignKey('component.id'), primary_key=True)
