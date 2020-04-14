///<reference path='./frida-gum.d.ts' />, ~~
//sony xc 9.0  dlopen 地址
//dlopen 函数的hook在7.1的nexus 6p手机上失败了


var so_lib_name = "libil2cpp.so"

function get_func_by_offset(module_name, offset) {
    var module = Process.getModuleByName(module_name)
    console.log('**********************')
    var addr = module.base.add(offset);
    return new NativePointer(addr.toString());
    
}
// xc 9.0  linker64



function get_linker_offset(){
    if(Java.androidVersion == "9"){

        return 0x14268
    }else{
        // 6p 7.1  linker64
        // return 0xA24C
        // linker
        return 0x2BE8
    }

}
function libil2cpp_hook(so_lib_name){
    var func = get_func_by_offset(so_lib_name, 0x6E8F5C)
    Interceptor.attach(func, {
        onEnter: function (args) {
            console.log("call from:\n" + Thread.backtrace(this.context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join("\n") + "\n")
        },
        onLeave: function (retval) {
            console.log("return", retval)
        }
    });


}

function main() {

    if (Java.available) {
        console.log("", Java.androidVersion);
        var linker_offset = get_linker_offset()
        var func = get_func_by_offset("linker", linker_offset)
        var so_name
        Interceptor.attach(func, {
            onEnter: function (args) {
                so_name = Memory.readCString(args[0])
            },
            onLeave: function (retval) {

                if (so_name.match(so_lib_name)) {
                    libil2cpp_hook()
                }
            }
        });
    }
}



setImmediate(function () {
    Java.perform(main)
},0);