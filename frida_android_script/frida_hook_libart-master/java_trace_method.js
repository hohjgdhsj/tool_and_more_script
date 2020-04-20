// * # frida -U -f com.malvo.frisbee -l unity.js --no-pause


Java.perform(function () {
    var System1 = Java.use('com/ironsource/unity/androidbridge/AndroidBridge$6');
    System1.callback.implementation = function () {
        var AndroidBridge = Java.use('com.ironsource.unity.androidbridge.AndroidBridge');

        send("load:showAdInternal");
        var Thread = Java.use('java.lang.Thread');
        Thread.dumpStack()
        AndroidBridge.sendUnityEvent("onRewardedVideoAdRewardedDemandOnly","true")
        return
    }
    // var System1 = Java.use('com.ironsource.unity.androidbridge.AndroidBridge');
    // System1.showInterstitial.implementation = function (bVar,i) {
    //     send("load:showInterstitial");
    //     var Thread = Java.use('java.lang.Thread');
    //     Thread.dumpStack()
    //     this.showInterstitial(bVar,i);
    // }
});



