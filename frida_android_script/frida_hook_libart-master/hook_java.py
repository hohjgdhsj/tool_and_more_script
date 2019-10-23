# -*- coding: UTF-8 -*-
import frida, sys
jsCode = """
Java.perform(function () {
    var MainActivity = Java.use('java.lang.System');
    MainActivity.load.overload('java.lang.String').implementation = function (libname) {
        send("Hook Start...");
        send("libname:"+libname);
        return this.load(libname)
    }
});
""";
def message(message, data):
    if message["type"] == 'send':
        print(u"[*] {0}".format(message['payload']))
    else:
        print(message)
process = frida.get_usb_device().attach("com.example.loadsoapp")
script= process.create_script(jsCode)
script.on("message", message)
script.load()
sys.stdin.read()