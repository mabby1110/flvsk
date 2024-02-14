from flask import Flask, jsonify, render_template
import os


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)

    # Función para generar lista de números primos
    def obtener_dispositivos():
        dispositivos = [
            {"hostname": "servidor1", "ip": "192.168.1.100"},
            {"hostname": "servidor2", "ip": "192.168.1.101"},
            {"hostname": "servidor3", "ip": "192.168.1.102"}
        ]
        return dispositivos

    @app.route("/", methos="GET")
    def index(json):
        dispositivos = obtener_dispositivos()
        return render_template("index.html", dispositivos)
    
    @app.route('/api/showConfig')
    def descripcion():
        return render_template('descripcion.html')

    return app