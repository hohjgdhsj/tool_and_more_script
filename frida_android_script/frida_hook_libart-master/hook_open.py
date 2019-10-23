import frida
import sys
import io

device = frida.get_usb_device()

session = device.attach("catch_.me_.if_.you_.can_")

scr = """
setImmediate(function() {
Interceptor.attach(Module.findExportByName("libc.so" , "ptrace"), {
    onEnter: function(args) {

        send("open called! args[0]:",Memory.readByteArray(args[0],256));
    },
    onLeave:function(retval){
    
    }
});

});
"""

def on_message(message ,data):
    file_object=open("d:\\log.txt",'ab+')
    file_object.write(message['payload'].encode())
    file_object.write(data.split(b'\x00')[0])
    file_object.write('\n'.encode())
    file_object.close()


script = session.create_script(scr)
script.on("message" , on_message)
script.load()
sys.stdin.read()