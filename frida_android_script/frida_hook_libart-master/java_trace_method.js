// * # frida -U -f com.malvo.frisbee -l unity.js --no-pause


Java.perform(function () {
    var System1 = Java.use('com.facebook.unity.FB');
    System1.LogAppEvent.overload("java.lang.String").implementation = function (str) {
        send("load:showInterstital");
        var Thread = Java.use('java.lang.Thread');
        Thread.dumpStack()
        this.LogAppEvent(str);
    }
});



