from database import db


class ComponentAttribute(db.Model):
    __tablename__ = "component_attribute"

    avid = db.Column(db.Integer, db.ForeignKey('attribute_value.id'), primary_key=True)
    cmid = db.Column(db.Integer, db.ForeignKey('component.id'), primary_key=True)
