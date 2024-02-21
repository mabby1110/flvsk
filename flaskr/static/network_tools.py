from netmiko import ConnectHandler
import flaskr.static.db as db

username = 'ti'
password = 'trenta'
secret = 'trenta'

class network_manager:
    conn = None
    
    def init():
        try:
            conn =  ConnectHandler(**device)
        except Exception as e:
            print("Error trying to connect:", str(e))

    def get_devices():
        return db.device_dict
        
    def get_branches():
        return db.branch_list

    

# def ping(ip, name):
#     try:

#         net_conn.enable()
#         net_conn.config_mode()
#         print(net_conn.find_prompt())
#         print(net_conn.send_config_from_file("comandos.txt"))

#         net_conn.disconnect()
    
#     except Exception as e:
#         print("Error trying to connect:", str(e))

# for dispositivo in dispositivos:
#     print(f"Trying to connect to {dispositivo['ip']}...")
#     ping(dispositivo["ip"], dispositivo["name"])