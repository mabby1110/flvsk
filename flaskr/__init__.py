from flask import Flask, jsonify, render_template, request
import os


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)

    # funciones
    def obtener_dispositivos():
        dispositivos = [
            [
                {"hostname": "router 1", "ip": "192.168.1.100"},
                {"hostname": "router 2", "ip": "192.168.1.101"},
                {"hostname": "router 3", "ip": "192.168.1.102"}
            ],
            [
                {"hostname": "switch 4", "ip": "192.168.1.100"},
                {"hostname": "switch 5", "ip": "192.168.1.101"},
                {"hostname": "switch 6", "ip": "192.168.1.102"}
            ]
        ]
        return dispositivos
    
    def obtener_sucursales():
        sucursales = [
            "Guadajalara",
            "Monterrey",
            "CDMX"
        ]
        return sucursales
    
    # rutas
    @app.route("/", methods=['GET', 'POST'])
    def index():
        if request.method == 'POST':
            # datos personalizados
            dispositivos = obtener_dispositivos()
            sucursales = obtener_sucursales()
            temp = request.form
            print(temp)

            return render_template("index.html", dispositivos=dispositivos, sucursales=sucursales)
        else:
            # datos iniciales
            dispositivos = obtener_dispositivos()
            sucursales = obtener_sucursales()

            print("get")

            return render_template("index.html", dispositivos=dispositivos, sucursales=sucursales)

    return app