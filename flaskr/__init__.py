from flask import Flask, jsonify, render_template, request, redirect, url_for
from flaskr.static.network_tools import network_manager
import sqlalchemy

manager = network_manager()

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    
    # rutas
    @app.route("/api/devices", methods=['GET', 'POST'])
    def get_devices():
        devices = manager.devices
        return jsonify(devices)

    @app.route("/api/ping", methods=['GET', 'POST'])
    def ping():
        host = request.json
        return jsonify(manager.ping(host['info']['ip']))

    @app.route("/api/conectar", methods=['GET', 'POST'])
    def conectar():
        host = request.json
        return jsonify(manager.conectar(host))

    @app.route("/home")
    def home():
            # LOGIN
            # ASIGNAR ADMIN HOST
            print(manager.adminHost)
            return render_template("index.html")

    @app.route("/login")
    def login():

         return render_template("login.html")
    
    @app.route("/", methods=['GET', 'POST'])
    def index():
            return redirect(url_for('login'))
    return app