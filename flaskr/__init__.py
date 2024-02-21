from flask import Flask, jsonify, render_template, request
import os, re
from flaskr.static.network_tools import network_manager as manager

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    
    # rutas
    @app.route("/", methods=['GET', 'POST'])
    def index():
        dispositivos = manager.get_devices()
        sucursales = manager.get_branches()

        if request.method == 'POST':
            # datos personalizados
            respuesta = request.form.to_dict(flat=False)

            return render_template("index.html", 
                                   dispositivos=dispositivos,
                                   sucursales=sucursales,
                                   respuesta=respuesta)
        else:
            # datos iniciales
            respuesta = ''

            print("get")

            return render_template("index.html",
                                   dispositivos=dispositivos,
                                   sucursales=sucursales,
                                   respuesta=respuesta)

    return app