
///<reference path='./frida-gum.d.ts' />, ~~

function get_func_by_offset(module_name,offset){
    var module=Process.getModuleByName(module_name)
    console.log('**********************',module)
    var addr=module.base.add(offset);
    return new NativePointer(addr.toString());
}

setImmediate(function () {
    console.log(Process.findModuleByName("linker64").base)
    // 通过导出表得到函数地址进行hook
    var func = get_func_by_offset("linker64",0x14268)
    Interceptor.attach(func, {
        onEnter: function (args) { 
            send("open called! args[0]:" + Memory.readCString(args[0]));
        },
        onLeave: function (retval) {

        }
    });

    // Java.perform(function () {
    //     var System1 = Java.use('java.lang.System');
    //     System1.load.overload('java.lang.String').implementation = function (libname) {
    //         send("load:" + libname);
    //         this.load(libname)
    //     }
    //     System1.loadLibrary.overload('java.lang.String').implementation = function (libname) {

    //         send("loadLibrary:" + libname);
    //         this.loadLibrary(libname)
    //     }
    // });

});
//com.example.fridanativeapplication

