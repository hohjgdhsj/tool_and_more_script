Interceptor.attach(Module.findExportByName("libtolua.so", "tolua_loadbuffer"), {
    onEnter: function(args) {
        var luaContent = Memory.readCString(args[2]);
        var luaName = Memory.readCString(args[4]);
        console.log("lua name:" + luaName);
        console.log("lua content:" + luaContent);
		
    },
    onLeave: function(retval) {
    }
});