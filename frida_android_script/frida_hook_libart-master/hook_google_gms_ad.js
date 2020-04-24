

Java.perform(function () {
	console.log("badfewa")
	var LuaLoader = Java.use('com.ironsource.unity.androidbridge.AndroidBridge');
    LuaLoader.showRewardedVideo.overload().implementation = function () {
        send("Hook Start...onCreate");
        return this.showRewardedVideo()
    }
	
	
});


		// var Thread = Java.use('java.lang.Thread');
		// Thread.dumpStack()