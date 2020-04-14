//sony xc 9.0  dlopen 地址
//dlopen 函数的hook在7.1的nexus 6p手机上失败了

function get_func_by_offset(module_name,offset){
    var module=Process.getModuleByName(module_name)
    console.log('**********************',module)
    var addr=module.base.add(offset);
    return new NativePointer(addr.toString());
}
// xc 9.0  linker64
// setImmediate(function () {
//     console.log(Process.findModuleByName("linker64").base)
//     // 通过导出表得到函数地址进行hook
//     var func = get_func_by_offset("linker64",0x14268)
//     Interceptor.attach(func, {
//         onEnter: function (args) { 
//             send("open called! args[0]:" + Memory.readCString(args[0]));
//         },
//         onLeave: function (retval) {

//         }
//     });
// });


// 6p 7.1  linker64
setImmediate(function () {
    console.log(Process.findModuleByName("linker64").base)
    // 通过导出表得到函数地址进行hook
    var func = get_func_by_offset("linker64",0xA24C)
    var so_name
    Interceptor.attach(func, {
        onEnter: function (args) { 
            so_name = Memory.readCString(args[0])
        },
        onLeave: function (retval) {
            if(so_name.match("libnative-lib.so")){
                send("open called! args[0]:" + so_name);
                var func = get_func_by_offset("libnative-lib.so", 0xF02C)
                Interceptor.attach(func, {
                    onEnter: function (args) {
                        // send("open called! args[0]:" + Memory.readCString(args[0]));
                        console.log("add call ")
                    },
                    onLeave: function (retval) {
            
                    }
                });
            }
        }
    });
});