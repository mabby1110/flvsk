from netmiko import ConnectHandler
import flaskr.static.db as db

username = 'ti'
password = 'trenta'
secret = 'trenta'

class network_manager:
    conn = None
    admin_dev = {
            'device_type': 'cisco_ios',
            "ip": "192.168.10.2",
            'host': 'Admin',
            'username': 'ti',
            "password": "trenta",
            'secret': "trenta"
        }
    
    def make_conn(device=admin_dev):
        try:
            conn =  ConnectHandler(**device['info'])
            conn.enable()
            host = conn.find_prompt()
            
            device['conn'] = conn
        
        except Exception as e:
            # print("Error trying to connect:", str(e))
            device['conn'] = 'False'
        
        return device

    def send_command(res):

        return res
        
    def get_devices():
        return db.device_dict
        
    def get_branches():
        return db.branch_list