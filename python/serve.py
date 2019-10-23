
import socket

tcp_server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

tcp_server_socket.bind(("", 22222))

tcp_server_socket.listen(128)
while True:
    client_socket, client_ip = tcp_server_socket.accept()
    print("client:", client_ip, "connect")
    try:
        with open( "C:/Users/chic/Desktop/break_pad", "wb") as file:
            while True:
                file_data = client_socket.recv(1024)
                if file_data:
                    file.write(file_data)
                else:
                    exit(0)
    except Exception as e:
        print("error:", e)

    client_socket.close()