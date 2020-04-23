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





setTimeout(function () { // avoid java.lang.ClassNotFoundException

	Java.perform(function () {
		var dexclassLoader = Java.use("java.lang.ClassLoader");
		var hookClass = undefined;
		var ClassUse = Java.use("java.lang.Class");

		dexclassLoader.loadClass.overload('java.lang.String').implementation = function (name) {
			//定义一个String变量，指定我们需要的类
			//直接调用第二个重载方法，跟原本的逻辑相同。
			console.log(name)
			var result = this.loadClass(name, false);
			var hook = Java.use(name);
			if(hook == null){
				return result;
			}
			var methods = hook.class.getDeclaredMethods();
			console.log("method count:",  methods.length)
			var method_over = null
			for (var i = 0; i < methods.length; i++) {
				var method = methods[i]
				var method_buf = method.toString().split("(")[[1]].split(")")[0]
				console.log("method name:", method.toString())
				var method_args = method_args_parse(method_buf)
				var mName = method.toString().split("(")[[0]].split(".").slice(-1)
				// console.log("method length:",  method_args.length)

				hookmethod1(name, mName, method_args)
			}
			return result;
		}

	});

}, 0);

function method_args_parse(method_buf) {
	var method_args = []
	var method_args_tmp = []
	if (method_buf != "") {
		// console.log("method_arg name == null")
		var method_args_tmp = method_buf.split(",")
	}

	for (var i = 0; i < method_args_tmp.length; i++) {
		// console.log(method_args_tmp[i])
		var tmp = method_args_tmp[i]
		if (tmp.match("\\[")) {
			// console.log(tmp)
			var key = tmp.split("\[")[0]
			// console.log("key = ", key)
			switch (key) {
				case "int":
					method_args.push("\[I")
					break;
				case "byte":
					method_args.push("\[B")
					break;
				case "char":
					method_args.push("\[C")
					break;
				case "double":
					method_args.push("\[D")
					break;
				case "float":
					method_args.push("\[F")
					break;
				case "long":
					method_args.push("\[J")
					break;
				case "short	":
					method_args.push("\[S")
					break;
				case "int":
					method_args.push("\[I")
					break;
				default:
					{
						method_args.push("\[L" + key + ";")
					}
					break;
			}
		} else {
			method_args.push(tmp)
		}
	}
	// for (var i = 0; i < method_args.length; i++) {
	// 		console.log(method_args[i])
	// }



	return method_args
}

function hookmethod1(cName, mName, args) {
	try {
		var clz = Java.use(cName)
		if (clz == null) {
			throw " Java.use()==null"
		}
		var method = null
		// 对付overload(array)bug

		switch (args.length) {
			case 0: { method = clz[mName].overload() } break
			case 1: { method = clz[mName].overload(args[0]) } break
			case 2: {
				method = clz[mName].overload(args[0], args[1
				])
			} break
			case 3: {
				method = clz[mName].overload(args[0], args[1],
					args[2])
			} break
			case 4: {
				method = clz[mName].overload(args[0], args[1],
					args[2], args[3])
			} break
			case 5: {
				method = clz[mName].overload(args[0], args[1],
					args[2], args[3], args[4])
			} break
			case 6: {
				method = clz[mName].overload(args[0], args[1],
					args[2], args[3], args[4], args[5])
			} break
			case 7: {
				method = clz[mName].overload(args[0], args[1],
					args[2], args[3], args[4], args[5], args[6])
			} break
			case 8: {
				method = clz[mName].overload(args[0], args[1],
					args[2], args[3], args[4], args[5], args[6], args[7])
			}
				break
			default:
				return 
		}
		method.implementation = function () {
			var ret = method.apply(this, arguments)
			return ret
		}
	}
	catch (err) {
		log("err")
		// send("error:rpc.exports.hook(); info:   " + err.toString())
	}
}
