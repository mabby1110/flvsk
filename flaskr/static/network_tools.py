from netmiko import ConnectHandler
import flaskr.static.db as db
import copy, re

username = 'ti'
password = 'trenta'
secret = 'trenta'

class network_manager:

    def __init__(self):
        self.devices = db.device_dict
    
    def conectar(self, device):
        # try:
        #     conn =  ConnectHandler(**device['info'])
        #     conn.enable()
        #     host = conn.find_prompt()
            
        #     device['conn'] = conn
        
        # except Exception as e:
        #     # print("Error trying to connect:", str(e))
        #     device['conn'] = 'False'
        device['conn'] = 'True'
        
        return device
    
    def ejecutar(self, res):
        print(res)
        for ip, comandos in res.items():
            for branch in self.devices:
                for device in self.devices[branch]:
                    if ip in self.devices[branch][device]:
                        print(self.devices[branch][device][ip])
                        for c in comandos:
                            print(c)
                            # conn = self.devices[branch][device][ip]['conn']
                            # conn.enable()
                            # conn.configure()
                            # output = conn.send_command(c)
                            # print(f"Output of '{cmd}':\n{output}")
        return 0

    def filtrar(self, diccionario_recibido):
        temp_dict = copy.deepcopy(self.devices)

        # Crear una copia de las claves del diccionario para evitar errores durante la iteración
        claves_a_eliminar = [clave for clave in temp_dict.keys() if clave not in diccionario_recibido['branch']]

        # Eliminar las claves que no están en la lista
        for clave in claves_a_eliminar:
            del temp_dict[clave]

        return temp_dict

    def limpiar_texto(self, texto):
        # Eliminar los caracteres '#' y '\r\n' del texto
        texto_limpio = re.sub(r'#|\r\n', '@', texto)
        texto_limpio = re.sub(r'\s@|@\s+|@', '$', texto_limpio)
        texto_limpio = re.sub(r'\$+', '$', texto_limpio)

        # Dividir el texto en oraciones
        comandos = re.split(r'\$', texto_limpio)
        comandos.remove('')
        return comandos