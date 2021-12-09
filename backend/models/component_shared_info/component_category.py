from database import db


class ComponentCategory(db.Model):
    __tablename__ = "component_category"

    csid = db.Column(db.Integer, db.ForeignKey('component_shared_info.id'), primary_key=True)
    ctid = db.Column(db.Integer, db.ForeignKey('category.id'), primary_key=True)
