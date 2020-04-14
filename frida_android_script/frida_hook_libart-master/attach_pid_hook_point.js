// # frida -U -f com.playgendary.racemasters -l unity.js --no-pause

function get_func_by_offset(module_name, offset) {
    var module = Process.getModuleByName(module_name)
    console.log('**********************', module.base)
    var addr = module.base.add(offset);
    return new NativePointer(addr.toString());
}

Java.perform(function () {

    //通过指针地址直接hook
    var func = get_func_by_offset("libil2cpp.so", 0x010C9E30)
    Interceptor.attach(func, {
        onEnter: function (args) {
            console.log("call from:\n" + Thread.backtrace(this.context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join("\n") + "\n")
        },
        onLeave: function (retval) {

        }
    });

    //     //直接new一个新函数进行替换
    //     Interceptor.replace(add_method, new NativeCallback(function (a, b) {
    //         console.log("NativeFunction:");
    //    }, 'void', []));

});
