from database import db


class ComponentAttribute(db.Model):
    __tablename__ = "component_attribute"

    aid = db.Column(db.Integer, db.ForeignKey('attribute.id'), primary_key=True)
    cmid = db.Column(db.Integer, db.ForeignKey('component.id'), primary_key=True)

    value = db.Column(db.String(20), nullable=False)
