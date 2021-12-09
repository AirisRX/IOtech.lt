from database import db


class ComponentImage(db.Model):
    __tablename__ = "component_image"

    csid = db.Column(db.Integer, db.ForeignKey('component_shared_info.id'), primary_key=True)
    url = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(100), nullable=True)