Java.perform(function () {
    var System1 = Java.use('java.lang.System');
    System1.load.overload('java.lang.String').implementation = function (libname) {
        send("load:"+libname);
        this.load(libname)
    }
    System1.loadLibrary.overload('java.lang.String').implementation = function (libname) {
        
        send("loadLibrary:"+libname);
        this.loadLibrary(libname)
    }
});




