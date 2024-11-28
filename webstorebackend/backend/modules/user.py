# encoding: utf-8

from flask import Blueprint, request, jsonify
from flask import g, current_app
from backend.database import db
from backend.models.webstoremodels import User
import flask_restful as restful
from werkzeug.security import generate_password_hash, check_password_hash
import json
import datetime
import random
from backend.modules.sessions import SessionCheckResource 
#import generate_token


#blueprint = Blueprint('db1', __name__, url_prefix='/db1')
blueprint = Blueprint('db1',__name__)

class UserList(restful.Resource):
    def get(self):
        token = request.headers.get('Authorization')  # Expecting token in headers
        if token and token.startswith('Bearer '):
            token = token.split(' ')[1]
            user_id = SessionCheckResource.verify_token(token)
            if user_id:
                user = User.query.get(user_id)
                return jsonify({"message": f"Hello, {user.user_name}"})
        return jsonify({"error": "Unauthorized"}), 401

""" 
    #get_parser = reqparse.RequestParser()
    #get_parser.add_argument('include_archived', type=str, default=None, location='args')
    #get_parser.add_argument('since_ts', type=int, default=0, location='args')

    #@auth.login_required
    #@requires_admin
    #@marshal_with(alert_fields)
    def get(self):
        #args = self.get_parser.parse_args()
        #return 'hello'
        q = User.query.all()
        #print(q[0].username)
        #u = jsonify(q)
        #users = q.all()
        import jsonpickle
        j = jsonpickle.encode(q)
        #q.dump(q)
        #u = json.dumps(q, default=vars)
        return j
"""
class UserSignup(restful.Resource):
    def post(self):
        data = request.json
        
        try:
            hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')
            new_user = User(
                #user_id=random.randint(0, 100),
                user_name=data['user_name'],
                password_hash=hashed_password,
                join_date=data['join_date'],
                membership=data.get('membership', 'regular'),
                contact_number=data.get('contact_number'),
                email_id=data['email_id'],
                user_type=data.get('user_type', 'customer')
            )
            
            db.session.add(new_user)
            db.session.commit()
            return jsonify({"message": "User created successfully!"})
        except Exception as e:
            return jsonify({"error": str(e)})

class UserSignin(restful.Resource):
    def post(self):
        data = request.json
        email_id = data.get('email_id')
        password = data.get('password')
        if not email_id or not password:
            return jsonify({"error": "Email and password are required"}), 400

        user = User.query.filter_by(email_id=email_id).first()
        
        if user and check_password_hash(user.password_hash, password):
            token = SessionCheckResource.generate_token(user.user_id)
            return jsonify({
                "message": "Signin successful",
                "user": {
                    "user_name": user.user_name,
                    "membership": user.membership,
                    "user_type": user.user_type,
                    "email_id": user.email_id,
                    "token": token
                }
            })
        else:
            return jsonify({"error": "Invalid credentials"})
'''
@blueprint.route("/db1", methods=["GET"])
def say_bye():
    return "Goodbye!"
'''