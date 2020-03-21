# -*- coding: UTF-8 -*-
import frida, sys
import io
jsCode = """
Java.perform(function(){
    Interceptor.attach(Module.findExportByName("libtolua.so" , "luaL_loadbuffer"), {
    onEnter: function(args) {
        var luaContent = Memory.readCString(args[2]);
        var luaName = Memory.readCString(args[4]);
        console.log("lua name:" + luaName);
        console.log("lua content:" + luaContent);
        
    },
    onLeave:function(retval){
    
    }
});
});
""";


def message(message, data):
    file_object=open("d:\\log.txt",'ab+')
    file_object.write(message['payload'].encode())
    file_object.write(data.split(b'\x00')[0])
    file_object.write('\n'.encode())
    file_object.close()
    
    
process = frida.get_usb_device().attach("com.jijiehaoqipai.jjhqp")
script= process.create_script(jsCode)
script.on("message", message)
script.load()
sys.stdin.read()

        # send("open called! args[0]:",Memory.readByteArray(args[0],256));
