from flask import Flask, jsonify, render_template, request, redirect, url_for
import os, re, json
from flaskr.static.network_tools import network_manager

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
    def make_ping():
        s = request.json[0]
        dt = request.json[1]
        ip = request.json[2]

        # print(ip)
        # r = manager.ping(ip)
        device = manager.devices[s][dt][ip]
        device = manager.conectar(device)
        print('con', manager.devices[s][dt][ip])
        return jsonify(device['conn'])

    @app.route("/", methods=['GET', 'POST'])
    def index():
            # LOGIN
            # ASIGNAR ADMIN HOST
            print(manager.adminHost)
            return render_template("index.html",
                                   devices = '',
                                   respuesta='')
    return app