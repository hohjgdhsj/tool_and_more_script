///<reference path='./frida-gum.d.ts' />, ~~
/*
 * raptor_frida_android_*.js - Frida snippets for Android
 * Copyright (c) 2017 Marco Ivaldi <raptor@0xdeadbeef.info>
 *
 * Frida.re JS script snippets for Android instrumentation.
 * See https://www.frida.re/ and https://codeshare.frida.re/
 * for further information on this powerful tool.
 *
 * "We want to help others achieve interop through reverse
 * engineering" -- @oleavr
 *
 * Many thanks to Maurizio Agazzini <inode@wayreth.eu.org>
 * and Federico Dotta <federico.dotta@mediaservice.net>.
 *
 * Example usage:
 * # frida -U -f com.xxx.yyy -l raptor_frida_android.js --no-pause
 */

// find loaded classes that match a pattern (sync)

// usage examples


// find and trace all methods declared in a Java Class
function traceClass(targetClass)
{
	var hook = Java.use(targetClass);
	var methods = hook.class.getDeclaredMethods();
	hook.$dispose;

	var parsedMethods = [];
	methods.forEach(function(method) {
		parsedMethods.push(method.toString().replace(targetClass + ".", "TOKEN").match(/\sTOKEN(.*)\(/)[1]);
	});

	var targets = uniqBy(parsedMethods, JSON.stringify);
	targets.forEach(function(targetMethod) {
		traceMethod(targetClass + "." + targetMethod);
	});
}

// trace a specific Java Method
function traceMethod(targetClassMethod)
{
	var delim = targetClassMethod.lastIndexOf(".");
	if (delim === -1) return;

	var targetClass = targetClassMethod.slice(0, delim)
	var targetMethod = targetClassMethod.slice(delim + 1, targetClassMethod.length)

	var hook = Java.use(targetClass);
	var overloadCount = hook[targetMethod].overloads.length;

	// console.log("Tracing " + targetClassMethod + " [" + overloadCount + " overload(s)]");

	for (var i = 0; i < overloadCount; i++) {

		hook[targetMethod].overloads[i].implementation = function() {
			console.warn("\n*** entered " + targetClassMethod);

			// print backtrace
			// Java.perform(function() {
			//	var bt = Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new());
			//	console.log("\nBacktrace:\n" + bt);
			// });   

			// print args
			// if (arguments.length) console.log();
			// for (var j = 0; j < arguments.length; j++) {
			// 	console.log("arg[" + j + "]: " + arguments[j]);
			// }

			// print retval
			var retval = this[targetMethod].apply(this, arguments); // rare crash (Frida bug?)
			// console.log("\nretval: " + retval);
			// console.warn("\n*** exiting " + targetClassMethod);
			return retval;
		}
	}
}
// remove duplicates from array
function uniqBy(array, key)
{
        var seen = {};
        return array.filter(function(item) {
                var k = key(item);
                return seen.hasOwnProperty(k) ? false : (seen[k] = true);
        });
}

function class_filter(class_name) {
	var class_list = new Array(
		"android.widget",
		"android.view",
		"androidx.appcompat.widget",
		"androidx.constraintlayout",
		"java.io",
		"java.util",
		"java.text",
		"android.security.keystore",
		"java.security",
		"android.content",
		"java.lang",
		"android.util.Log",
		"com.android.org.conscrypt.OpenSSLRSAKeyFactory",
		"android.os",
		"sun.security",
		"android.content.res",
		"android.util",
		"com.android.org.conscrypt"
	)
	for(var i=0;i<class_list.length;i++){
		if(class_name.match(class_list[i])){
			// console.log(class_name)
			// console.log("true")
			return true
		}
	}
    return false
}

function method_filter(method_name) {
    
}

setTimeout(function () { // avoid java.lang.ClassNotFoundException

	Java.perform(function () {
		var dexclassLoader = Java.use("java.lang.ClassLoader");
		var hookClass = undefined;
		var ClassUse = Java.use("java.lang.Class");
		dexclassLoader.loadClass.overload('java.lang.String').implementation = function (name) {
			//定义一个String变量，指定我们需要的类
			//直接调用第二个重载方法，跟原本的逻辑相同。
			var result = this.loadClass(name, false);
			if(!class_filter(name)){
				traceClass(name)
			}
			return result;
		}

	});

}, 0);
