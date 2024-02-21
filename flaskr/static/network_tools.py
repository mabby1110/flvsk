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
            conn =  ConnectHandler(**device)
            conn.enable()
            host = conn.find_prompt()
            print(host)

            return host
        
        except Exception as e:
            print("Error trying to connect:", str(e))
            return "error"

    def get_devices():
        return db.device_dict
        
    def get_branches():
        return db.branch_list

# conn.config_mode()
# print(conn.find_prompt())
# print(conn.send_config_from_file("comandos.txt"))
    
# for dispositivo in dispositivos:
#     print(f"Trying to connect to {dispositivo['ip']}...")
#     ping(dispositivo["ip"], dispositivo["name"])