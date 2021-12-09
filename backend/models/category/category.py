from database import db


class Category(db.Model):
    __tablename__ = "category"

    id = db.Column(db.Integer, primary_key=True)
    parent_id = db.Column(db.Integer, db.ForeignKey(id), nullable=True)
    name = db.Column(db.String(20), nullable=False)
    description = db.Column(db.String(100), nullable=True)

    def __repr__(self):
        return f'<Category {self.name}>'

    def __init__(self, name, description, parent_id=None):
        self.name = name
        self.description = description
        self.parent_id = parent_id
