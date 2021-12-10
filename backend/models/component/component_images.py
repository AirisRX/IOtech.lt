from database import db


class ComponentImages(db.Model):
    __tablename__ = "component_images"

    id = db.Column(db.Integer, primary_key=True)
    cmid = db.Column(db.Integer, db.ForeignKey('component.id'), nullable=False)
    url = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(100), nullable=True)
