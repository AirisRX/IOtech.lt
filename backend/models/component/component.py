from database import db


class Component(db.Model):
    __tablename__ = "component"

    id = db.Column(db.Integer, primary_key=True)
    csid = db.Column(db.Integer, db.ForeignKey('component_shared_info.id'), primary_key=True)
    description = db.Column(db.String(100), nullable=True)

