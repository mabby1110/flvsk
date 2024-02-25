from netmiko import ConnectHandler
import flaskr.static.db as db
import copy

username = 'ti'
password = 'trenta'
secret = 'trenta'

class network_manager:

    def __init__(self):
        self.devices = db.device_dict
    
    def make_conn(self, device):
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
    
    def filtrar(self, diccionario_recibido):
        temp_dict = copy.deepcopy(self.devices)

        # Crear una copia de las claves del diccionario para evitar errores durante la iteración
        claves_a_eliminar = [clave for clave in temp_dict.keys() if clave not in diccionario_recibido['branch']]

        # Eliminar las claves que no están en la lista
        for clave in claves_a_eliminar:
            del temp_dict[clave]

        return temp_dict