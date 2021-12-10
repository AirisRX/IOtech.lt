from database import db


class Component(db.Model):
    __tablename__ = "component"

    id = db.Column(db.Integer, primary_key=True)
    csid = db.Column(db.Integer, db.ForeignKey('component_shared_info.id'), nullable=False)
    description = db.Column(db.String(100), nullable=True)
    thumbnail_id = db.Column(db.Integer, db.ForeignKey('component_images.id'), nullable=True)

    __table_args__ = (db.UniqueConstraint(id, csid, name='_id_csid_uc'),)
