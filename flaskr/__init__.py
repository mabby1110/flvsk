from flask import Flask, jsonify, render_template, request, redirect, url_for
import os, re
from flaskr.static.network_tools import network_manager

manager = network_manager()

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    
    # rutas
    @app.route("/", methods=['GET', 'POST', 'PUT'])
    def index():
        # obtener datos almacenados
        devices = manager.devices

        # comprobar conexion
        for branch in devices:
            for device in devices[branch]:
                for host in devices[branch][device]:
                    manager.make_conn(devices[branch][device][host])

        if request.method == 'POST':
            
            if request.form['action'] == 'filtrar': # filtrar
                # datos personalizados
                res = request.form.to_dict(flat=False)
                datos_filtrados = manager.filtrar(res)
                return render_template("index.html",
                                    devices = datos_filtrados,
                                    respuesta='')
                                    
            elif request.form['action'] == 'reiniciar': # borrar filtros
                return redirect(url_for('index'))

            elif request.form['action'] == 'ejecutar': # ejecutar comando
                res = request.form.to_dict(flat=False)
                return render_template("index.html",
                                    devices = devices,
                                    respuesta=res)
        else:
            return render_template("index.html",
                                   devices = devices,
                                   respuesta='')

    return app