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
 * # frida -U -f com.playgendary.racemasters -l unity.js --no-pause
 */


Java.perform(function () {
	//这个c_getSum方法有两个int参数、返回结果为两个参数相加
	//这里用NativeFunction函数自己定义了一个c_getSum函数
	console.log("libil2cpp:", pointer);

	var pointer = Module.load("/data/app/com.playgendary.racemasters-1/lib/arm64/libil2cpp.so").base
	//var pointer = Process.findModuleByName("libil2cpp.so").base;
	console.log("libil2cpp:", pointer);
	var fun_add = Number(pointer) + Number(0x10EA4CC)
	const ptr1 = new NativePointer(fun_add);
	console.log("fun_add:", fun_add);
	var add_method = new NativeFunction(ptr1, 'void', []);
	Interceptor.attach(add_method, {
		onEnter: function (args) {
			console.log("FirebaseRemoteConfigInitializer");
		},
		onLeave: function (retval) {

		}

	});

	Interceptor.attach(Module.findExportByName("libc.so", "ptrace"), {
		onEnter: function (args) {
			console.log("libc__ptrace");
		},
		onLeave: function (retval) {

		}
	})

	Interceptor.attach(Module.findExportByName("libc.so", "time"), {
		onEnter: function (args) {
			console.log("libc__time");
		},
		onLeave: function (retval) {

		}
	})
	Interceptor.attach(Module.findExportByName("libc.so", "mprotect"), {
		onEnter: function (args) {
			console.log("libc__mprotect");
		},
		onLeave: function (retval) {

		}
	})

	Interceptor.attach(Module.findExportByName("libc.so", "kill"), {
		onEnter: function (args) {
			console.log("libc__kill");
		},
		onLeave: function (retval) {

		}
	})
	
	Interceptor.attach(Module.findExportByName("libc.so", "raise"), {
		onEnter: function (args) {
			console.log("libc__raise");
		},
		onLeave: function (retval) {

		}
	})

	Interceptor.attach(Module.findExportByName("libc.so", "pthread_create"), {
		onEnter: function (args) {
			console.log("libc__pthread_create");
		},
		onLeave: function (retval) {

		}
	})

	Interceptor.attach(Module.findExportByName("libc.so", "getpid"), {
		onEnter: function (args) {
			console.log("libc__getpid");
		},
		onLeave: function (retval) {

		}
	})

	Interceptor.attach(Module.findExportByName("libc.so", "clock"), {
		onEnter: function (args) {
			console.log("libc__clock");
		},
		onLeave: function (retval) {

		}
	})

	Interceptor.attach(Module.findExportByName("libc.so", "gettimeofday"), {
		onEnter: function (args) {
			console.log("libc__gettimeofday");
		},
		onLeave: function (retval) {

		}
	})

	Interceptor.attach(Module.findExportByName("libc.so", "inotify_init"), {
		onEnter: function (args) {
			console.log("libc__inotify_init");
		},
		onLeave: function (retval) {

		}
	})

	Interceptor.attach(Module.findExportByName("libc.so", "clock_gettime"), {
		onEnter: function (args) {
			console.log("libc__clock_gettime");
		},
		onLeave: function (retval) {

		}
	})

	Interceptor.attach(Module.findExportByName("libc.so", "getrusage"), {
		onEnter: function (args) {
			console.log("libc__getrusage");
		},
		onLeave: function (retval) {

		}
	})
});


