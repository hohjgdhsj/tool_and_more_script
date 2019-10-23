# -*- coding: UTF-8 -*-
import frida, sys
jsCode = """
Java.perform(function () {
    var MainActivity = Java.use('com.example.fridaapplication.MainActivity');
    MainActivity.text.overload('java.lang.String').implementation = function (libname) {
        send("Hook Start...");
        send("libname:"+libname);
        return this.text(libname)
    }
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
