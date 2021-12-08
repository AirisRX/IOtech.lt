from database import db


class Category(db.Model):
    __tablename__ = "category"

    id = db.Column(db.Integer, primary_key=True)
    parent_id = db.Column(db.Integer, db.ForeignKey(id))
    depth = db.Column(db.Integer, nullable=False, default=1)
    name = db.Column(db.String(20), nullable=False)
    description = db.Column(db.String(100), nullable=True)

    def __repr__(self):
        return f'<Category {self.name}>'

    def __init__(self, name, description):
        self.name = name
        self.description = description
