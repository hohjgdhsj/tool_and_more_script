Java.perform(function () {
    var MainActivity = Java.use('java.lang.System');
	var tolua = true
    MainActivity.load.overload('java.lang.String').implementation = function (libname) {
		tolua=libname.search("libtolua.so")
        send("Hook Start...");
        send("libname:"+libname);
        this.load(libname)
	return
    }
});

