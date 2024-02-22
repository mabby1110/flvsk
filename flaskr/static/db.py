device_dict = {
    'router': {
        "R10": {
            'info':{
            'device_type': 'cisco_ios',
            "ip": "192.168.10.2",
            'host': 'Admin',
            'username': 'ti',
            "password": "trenta",
            'secret': "trenta"
            },
            'conn': None
        }
    },
    'switch': {
        "S8": {
            'info':{
            'device_type': 'cisco_ios',
            "ip": "192.168.10.12",
            'host': 'Admin',
            'username': 'ti',
            "password": "trenta",
            'secret': "trenta"
            },
            'conn': None
        }
    }
}

branch_list = [
    "Guadajalara",
    "Monterrey",
    "CDMX"
]



    # def limpiar_texto(texto):
    #     # Eliminar los caracteres '#' y '\r\n' del texto
    #     texto_limpio = re.sub(r'#|\r\n', '@', texto)
    #     texto_limpio = re.sub(r'\s@|@\s+|@', '$', texto_limpio)
    #     texto_limpio = re.sub(r'\$+', '$', texto_limpio)

    #     # Dividir el texto en oraciones
    #     comandos = re.split(r'\$', texto_limpio)
    #     comandos.remove('')
    #     return comandos