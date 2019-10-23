# -*- coding: UTF-8 -*-
import frida, sys
 
jsCode = """
Java.perform(function(){
    var nativePointer = Module.findExportByName("libnative-lib.so", "Java_com_example_fridaapplication_MainActivity_stringFromJNI");
    send("native: " + nativePointer);
    Interceptor.attach(nativePointer, {
        onEnter: function(args){
            send(args[0]);
            send(args[1]);
            send(args[2].toInt32());
        },
        onLeave: function(retval){
            send(retval.toInt32());
        }
    });
    Interceptor.attach(Module.findExportByName("libc.so" , "open"), {
    onEnter: function(args) {

        send("open called! args[0]:",Memory.readByteArray(args[0],256));
    },
    onLeave:function(retval){
    
    }
});
    
    
});
""";
 
def message(message, data):
    if message["type"] == 'send':
        print(u"[*] {0}".format(message['payload']))
    else:
        print(message)
 
process = frida.get_usb_device().attach("com.example.fridaapplication")
script= process.create_script(jsCode)
script.on("message", message)
script.load()
sys.stdin.read()