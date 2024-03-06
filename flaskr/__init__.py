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

        return json.dumps(devices)

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

        # if request.method == 'POST':
        # # filtrar    
        #     if request.form['action'] == 'filtrar':
        #         print("filtrar")
        #         res = request.form.to_dict(flat=False)
        #         datos_filtrados = manager.filtrar(res)
        #         return render_template("index.html",
        #                             devices = datos_filtrados,
        #                             respuesta='')
        # # borrar filtros                
        #     elif request.form['action'] == 'reiniciar':
        #         print("reiniciar")
        #         return redirect(url_for('index'))
        # # ejecutar comando
        #     elif request.form['action'] == 'ejecutar':
        #         print("ejecutar")
        #         res = request.form.to_dict(flat=False)

        #         del res['branch']
        #         del res['action']
        #         for k, v in res.items():
        #             res[k] = manager.limpiar_texto(v[0])

        #         manager.ejecutar(res)
        #         return render_template("index.html",
        #                             devices = devices,
        #                             respuesta='ok')
        # # hacer ping
        #     elif request.form['action'] == 'ping':
        #         print("ping")

        #         output = manager.ping()
        #         print(type(output))
        #         return render_template("index.html",
        #                             devices = devices,
        #                             respuesta=output)
        # else:
        #     for branch in devices:
        #         for device in devices[branch]:
        #             for host in devices[branch][device]:
        #                 manager.conectar(devices[branch][device][host])
            return render_template("index.html",
                                   devices = '',
                                   respuesta='')

    return app