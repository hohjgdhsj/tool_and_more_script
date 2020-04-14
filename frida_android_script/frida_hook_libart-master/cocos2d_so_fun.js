
 // frida -U -f com.mpexternal.sssn -l so_fun.js --no-pause


 var game = Module.load("/data/app/com.mpexternal.sssn-1/lib/arm/liblygame.so").base
Module.load("/data/app/com.mpexternal.sssn-1/lib/arm/libcocos2djs.so")

Interceptor.attach(Module.findExportByName("libcocos2djs.so", "_ZN7cocos2d5Image17initWithImageDataEPKhi"), {
    onEnter: function(args) {
        // console.log("_ZN7cocos2d5Image17initWithImageDataEPKhi")
        var luaName = Number(args[2]);
        // console.log("lua name:" + luaName);
        // console.log("lua name:" + Number(args[1]));
        
        // console.log(hexdump((new NativePointer(Number(args[1]),{
        //     offset: 0,
        //     length: 200,
        //     header: true,
        //     ansi: true
        // }))))
    }

});

Interceptor.attach(Module.findExportByName("libcocos2djs.so", "_ZN7cocos2d5Image17initWithImageFileERKNSt6__ndk112basic_stringIcNS1_11char_traitsIcEENS1_9allocatorIcEEEE"), {
    onEnter: function(args) {
        // console.log("_ZN7cocos2d5Image17initWithImageFileERKNSt6__ndk112basic_stringIcNS1_11char_traitsIcEENS1_9allocatorIcEEEE")
        // console.log(hexdump((new NativePointer(Number(args[1]),{
        //     offset: 0,
        //     length: 50,
        //     header: true,
        //     ansi: true
        // }))))
    }
});

Interceptor.attach(Module.findExportByName("libc.so" , "fopen"), {
    onEnter: function(args) {
        var file_name = String(Memory.readCString(args[0]))
        if(file_name.indexOf("leyun")>-1){
            console.log("open called! args[0]:",file_name);
            console.log("rzx"+Thread.backtrace(this.context,Backtracer.ACCURATE).
                map(DebugSymbol.fromAddress).join("\n")+"\n")
        }
    },
    onLeave:function(retval){
    
    }
});

Interceptor.attach(Module.findExportByName("libc.so" , "ptrace"), {
    onEnter: function(args) {
        var pid = String(Memory.readCString(args[0]))
       
        console.log("0xDA028:", Memory.readByteArray(args[0],256));

    },
    onLeave:function(retval){
    
    }
});
Interceptor.attach(Module.findExportByName("libc.so" , "getpid"), {
    onEnter: function() {
        console.log("getpid");
        console.log("rzx"+Thread.backtrace(this.context,Backtracer.ACCURATE).
        map(DebugSymbol.fromAddress).join("\n")+"\n")
    },
    onLeave:function(retval){
    
    }
});
var fun_add = Number(game) + Number(0xDA028)
const ptr1 = new NativePointer(fun_add);

// var add_method = new NativeFunction(ptr1, 'int',["int","int"]);
// Interceptor.attach(ptr1, {
//     onEnter:function (args) {
//         //h不论是什么参数都返回123
//          console.log("0xDA028:");
//      },
//      onLeave:function(args){

//      }
// });