Java.perform(function () {
	
	
	
	var LuaLoader = Java.use('com.mopub.unity.MoPubUnityPlugin$UnityEvent');
    LuaLoader.Emit.overload('java.lang.String').implementation = function (bundle) {
        send("Hook Start...onCreate");
        return this.Emit(bundle)
    }
	
	
});


		// var Thread = Java.use('java.lang.Thread');
		// Thread.dumpStack()