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
 * # frida -U -f io.voodoo.crowdcity -l unity.js --no-pause
 */
 
 
Java.perform(function () {
       //这个c_getSum方法有两个int参数、返回结果为两个参数相加
       //这里用NativeFunction函数自己定义了一个c_getSum函数
	   	var pointer = Module.load("/data/app/com.offbitstudio.water.shooty.gunner.challenge.free.fire-JlV_ZxbjPbuKccqwJs4_bg==/lib/arm/libil2cpp.so").base
		//var pointer = Process.findModuleByName("libil2cpp.so").base;
		console.log("libil2cpp:",pointer);
		var fun_add = Number(pointer) + Number(0x9FA4CC)
		const ptr1 = new NativePointer(fun_add);
		console.log("fun_add:",fun_add);

		var add_method = new NativeFunction(ptr1, 'void',[]);
		Interceptor.replace(add_method, new NativeCallback(function (a, b) {
           //h不论是什么参数都返回123
			console.log("NativeFunction:");
       }, 'void', []));
});