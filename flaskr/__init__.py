from flask import Flask, jsonify, render_template, request, redirect, url_for
import os, re, json
from flaskr.static.network_tools import network_manager

manager = network_manager()

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    
    # rutas
    @app.route("/api/get_devices", methods=['GET', 'POST'])
    def get_devices():
        # obtener datos almacenados
        devices = manager.devices

        return jsonify(devices)

    @app.route("/api/ping", methods=['GET', 'POST'])
    def make_ping():
        ip = request.json
        manager.ping(ip)
        return json.dumps(0)
    
    @app.route("/api/conn", methods=['GET', 'POST'])
    def connect_devices():
        # obtener datos almacenados
        devices = manager.devices
        for branch in devices:
            for device in devices[branch]:
                for host in devices[branch][device]:
                    manager.conectar(devices[branch][device][host])
        
        return json.dumps(devices)

    @app.route("/", methods=['GET', 'POST'])
    def index():
            print(manager.adminHost)
            return render_template("index.html",
                                   devices = '',
                                   respuesta='')

    return app