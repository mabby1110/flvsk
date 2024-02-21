device_dict = {
    'router': [
        {
            'device_type': 'cisco_ios',
            "ip": "192.168.10.1"
        },
        { 
            'device_type': 'cisco_ios',
            "ip": "192.168.10.2"
        }
    ],
    'switch': [
        {
            'device_type': 'cisco_ios',
            "ip": "192.168.10.6"
        }
    ]
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