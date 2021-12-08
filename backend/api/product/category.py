from collections import defaultdict

from flask_restful import Resource
from models.category import Category
from database import db
from sqlalchemy.sql import functions as func
from pprint import pprint

class CategoryAPI(Resource):
    def get(self):

        sub_q1 = db.session.query(Category.id, Category.name, Category.description).filter_by(parent_id=None).cte(recursive=True, name='s')

        name_column = (sub_q1.c.name + db.literal("|") + Category.name)

        sub_q2 = db.session.query(Category.id, name_column, Category.description).join(
            sub_q1, Category.parent_id == sub_q1.c.id)

        sub_q = sub_q1.union_all(
            sub_q2
        )

        categories = db.session.query(sub_q.c.name.label('name'), sub_q.c.description.label('description')).all()

        formatted_c = {}

        for c in categories:
            ref = formatted_c

            names = c.name.split('|')
            for n in names[:-1]:
                ref = ref[n]["kategorijos"]

            ref[names[-1]] = {"kategorijos": {}}
            if c.description:
                ref[names[-1]]["aprasas"] = c.description

        return formatted_c
