// # frida -U -f com.playgendary.racemasters -l unity.js --no-pause

function get_func_by_offset(module_name, offset) {
    var module = Process.getModuleByName(module_name)
    console.log('**********************', module.base)
    var addr = module.base.add(offset);
    return new NativePointer(addr.toString());
}

Java.perform(function () {

    // 通过指针地址直接hook
    var func = get_func_by_offset("libil2cpp.so", 0x71bf44)
    Interceptor.attach(func, {
        onEnter: function (args) {
            console.log("call from:\n" + Thread.backtrace(this.context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join("\n") + "\n")
        },
        onLeave: function (retval) {

        }
    });

    // var func = get_func_by_offset("libil2cpp.so", 0x7a2a30)
    // Interceptor.attach(func, {
    //     onEnter: function (args) {
    //         console.log("call generEntry:\n" + Thread.backtrace(this.context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join("\n") + "\n")
    //     },
    //     onLeave: function (retval) {
    //         console.log("return", retval)

    //     }
    // });


    var func_sidney = get_func_by_offset("libil2cpp.so", 0x79e42c)   
    Interceptor.replace(func_sidney, new NativeCallback(function () {
        console.log("call from:\n" + Thread.backtrace(this.context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join("\n") + "\n")
        return 0
    }, 'void', []));

    // var func_sidney = get_func_by_offset("libil2cpp.so", 0x71bf44)   
    // Interceptor.replace(func_sidney, new NativeCallback(function () {
    //     console.log("call from:\n" + Thread.backtrace(this.context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join("\n") + "\n")
    //     return 0
    // }, 'void', []));











    // var func_vip = get_func_by_offset("libil2cpp.so", 0x719ea8)     //传奇背包
    // Interceptor.replace(func_vip, new NativeCallback(function () {
    //     console.log("vip :\n" + Thread.backtrace(this.context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join("\n") + "\n")
    //     return
    // }, 'void', []));


    // var func1 = get_func_by_offset("libil2cpp.so", 0x79e42c)     //特别优惠
    // Interceptor.replace(func1, new NativeCallback(function () {
    //     console.log("call fun1:\n" + Thread.backtrace(this.context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join("\n") + "\n")
    //     return
    // }, 'void', []));

    // //直接new一个新函数进行替换
    // var func_store = get_func_by_offset("libil2cpp.so", 0x73f6f4)             //商店　
    // Interceptor.replace(func_store, new NativeCallback(function () {
    //     // console.log("call from:\n" + Thread.backtrace(this.context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join("\n") + "\n")
    //     return
    // }, 'void', []));

});
