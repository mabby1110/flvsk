from flask import Flask, jsonify, render_template, request
import os, re
from flaskr.static.network_tools import network_manager as manager

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)

    def limpiar_texto(texto):
        # Eliminar los caracteres '#' y '\r\n' del texto
        texto_limpio = re.sub(r'#|\r\n', '@', texto)
        texto_limpio = re.sub(r'\s@|@\s+|@', '$', texto_limpio)
        texto_limpio = re.sub(r'\$+', '$', texto_limpio)

        # Dividir el texto en oraciones
        comandos = re.split(r'\$', texto_limpio)
        comandos.remove('')
        return comandos
    
    # rutas
    @app.route("/", methods=['GET', 'POST'])
    def index():
        dispositivos = manager.get_devices()
        sucursales = manager.get_branches()

        for d in dispositivos["router"]:
            print(d)

        if request.method == 'POST':
            # datos personalizados
            respuesta = request.form.to_dict(flat=False)

            # if(respuesta['consola'][0] != ''):
            #     respuesta['consola'] = limpiar_texto(respuesta['consola'][0])

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