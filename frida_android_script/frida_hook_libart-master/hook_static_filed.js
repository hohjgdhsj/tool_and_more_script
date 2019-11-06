setTimeout(function() { // avoid java.lang.ClassNotFoundException

	Java.perform(function() {
		console.log("start");
        //java层hook
		var clazz = Java.use("java.lang.Class");
        var hookgoal = Java.use("com.example.frida_hook_demo.MainActivity")
		var reflectField = Java.cast(hookgoal.class, clazz).getDeclaredField("log");
        reflectField.setAccessible(true);
        reflectField.setBoolean('boolean',false);
	});   
}, 0);
