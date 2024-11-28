from flask import Flask
from flask_cors import CORS
from backend.config import DbConfig
from flask_migrate import Migrate
from flask_restful import Resource, Api
from flask_cors import CORS
from backend.database import db
from backend.models.webstoremodels import User, WomensProducts, KidsProducts, Categories, Orders, Shipments
from backend.modules.user import UserList, UserSignup, UserSignin
from backend.modules.sessions import SessionCheckResource
from backend.modules.womensclothes import WomensclothesList, Womensclothes
from authlib.integrations.flask_client import OAuth


def create_app():
    app = Flask(__name__)

    app.config.from_mapping(
        SECRET_KEY = "Miy_Secret_Key"
    )
    app.config.from_object(DbConfig)
    CORS(app, supports_credentials=True)  # Enable CORS for all routes
    #CORS(app, origins=['http://localhost:3000'])
    init_api(app)

    #db.init_app(app)
    #migrate = Migrate(app, db)
    return app

def init_api(app: Flask):
    db.init_app(app)
    
    migrate = Migrate(app, db)
    from backend.models.webstoremodels import User, WomensProducts, KidsProducts, Categories, Orders, Shipments

    #app.register_blueprint(hello.blueprint)
    #app.register_blueprint(goodbye.blueprint)
    #app.register_blueprint(user.blueprint)
    #app.register_blueprint(as.blueprint)
    #app.register_blueprint(user.blueprint)

    
    api=Api(app) 
    api.add_resource(UserList, '/users')
    api.add_resource(UserSignup, '/signup')
    api.add_resource(UserSignin, '/signin')
    api.add_resource(WomensclothesList, '/womensclothes')
    api.add_resource(Womensclothes,  '/womensclothes/<string:product_id>', methods=['DELETE', 'PUT'])
    api.add_resource(SessionCheckResource, '/session-check')
    
    #api.add_resource(CarList, '/cars')

    #api.add_resource(AsiaUserList, '/asiausers')
    #api.add_resource(EuropeCarList, '/europecars')
    
    oauth = OAuth(app)
    oauth.register(
    name= 'idp',
    client_id='',
    client_secret='',
    access_token_url='',
    authorize_url='',
    client_kwargs={'scope': ''},
    server_metadata_url= ''
    )

    @app.route('/login')
    def login():
        #return 'this is login'
        return oauth.idp.authorize_redirect(redirect_uri='http://localhost:5000/callback')

    @app.route('/callback')
    def callback():
        token = oauth.idp.authorize_access_token()
        print(token)
        user_info = token['userinfo']
        #user_info = oauth.idp.parse_id_token(token)
        session['user'] = user_info

        return redirect('http://localhost:4200/dashboard')

    @app.route('/logout')
    def logout():
        session.pop('user', None)
        return redirect('http://localhost:4200')

    @app.route('/api/user')
    def get_user():
        return jsonify(session.get('user', {}))
