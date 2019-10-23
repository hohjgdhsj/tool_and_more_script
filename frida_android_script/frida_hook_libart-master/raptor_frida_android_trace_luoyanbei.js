
var logContentArray = new Array();
var logContentArray = new Array();
 
var singlePrefix = "|----"

function uniqBy(array, key)
{
        var seen = {};
        return array.filter(function(item) {
                var k = key(item);
                return seen.hasOwnProperty(k) ? false : (seen[k] = true);
        });
}

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

function traceMethod(targetClassMethod)
{
	var delim = targetClassMethod.lastIndexOf(".");
	if (delim === -1) return;

	// slice() 方法可提取字符串的某个部分，并以新的字符串返回被提取的部分
	var targetClass = targetClassMethod.slice(0, delim)
	var targetMethod = targetClassMethod.slice(delim + 1, targetClassMethod.length)

	var hook = Java.use(targetClass);
	var overloadCount = hook[targetMethod].overloads.length;

	console.log("Tracing " + targetClassMethod + " [" + overloadCount + " overload(s)]");

	for (var i = 0; i < overloadCount; i++) {

		// hook方法
		hook[targetMethod].overloads[i].implementation = function() {

			var logContent_1 = "entered--"+targetClassMethod;

			var prefixStr = gainLogPrefix(logContentArray);

			logContentArray.push(prefixStr + logContent_1);

			console.warn(prefixStr + logContent_1);

			// print backtrace, 打印调用堆栈
			// Java.perform(function() {
			// 	var bt = Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new());
			// 	console.log(prefixStr +"Backtrace:" + bt);
			// });   

			// print args
			// if (arguments.length) console.log();

			// 打印参数
			for (var j = 0; j < arguments.length; j++) 
			{
				var tmpLogStr = prefixStr + "arg[" + j + "]: " + arguments[j];
				console.log(tmpLogStr);
				logContentArray.push(tmpLogStr);
			}

			// print retval
			var retval = this[targetMethod].apply(this, arguments); // rare crash (Frida bug?)
			// 打印返回值
			// console.log("\n"+ targetClassMethod +"--retval: " + retval);

			var tmpReturnStr = prefixStr + "retval: " + retval;
			logContentArray.push(tmpReturnStr);
			console.log(tmpReturnStr);

			//结束标志
			var logContent_ex = "exiting--" + targetClassMethod;
			logContentArray.push(prefixStr + logContent_ex);
			console.warn(prefixStr + logContent_ex);


			return retval;
		}
	}
}


function trace(pattern){
	Java.enumerateLoadedClasses({
			onMatch: function(aClass) {
				// console.log("is--java--1--"+aClass.toString())
				// console.log("class name:"+pattern)
				if (aClass.match(pattern)) {

					console.log("is--java--2--"+aClass.toString())

					// found = true;
					//match() 方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。
					// 该方法类似 indexOf() 和 lastIndexOf()，但是它返回指定的值，而不是字符串的位置。
					// var className = aClass.match(/[L](.*);/)[1].replace(/\//g, ".");

					// console.log('('+aClass.toString()+')-----'+className.toString());

					traceClass(aClass);
				}
			},
			onComplete: function() {}
		});
}
// 获取打印前缀
function gainLogPrefix(theArray)
{
    var lastIndex = theArray.length - 1;
 
    if (lastIndex<0)
    {
        return singlePrefix;
    }
     
    for (var i = lastIndex; i >= 0; i--) 
    {
        var tmpLogContent = theArray[i];
        var cIndex = tmpLogContent.indexOf("entered--");
 
        if ( cIndex == -1)
        {
            var cIndex2 = tmpLogContent.indexOf("exiting--");
            if ( cIndex2 == -1)
            {
                continue;
            }
            else
            {
                //与上个方法平级
                var resultStr = tmpLogContent.slice(0,cIndex2);
                return resultStr;
            }
        }
        else
        {
            //在上个方法的内部
            var resultStr = singlePrefix + tmpLogContent.slice(0,cIndex);//replace(/entered--/, "");
            // console.log("("+tmpLogContent+")前缀是：("+resultStr+")");
            return resultStr;
             
        }
    }
    return "";
}

setTimeout(function() { // avoid java.lang.ClassNotFoundException

	Java.perform(function() {

		trace("com.test.flyer.MainActivity");    //类函数调用追踪 小心启动时时机，防止类找不到的时候启动
		// traceMethod("com.test.flyer.MainActivity.gainAge");

		// trace("com.target.utils.CryptoUtils.decrypt");
		// trace("com.target.utils.CryptoUtils");
		// trace("CryptoUtils");
		// trace(/crypto/i);
		// trace("exports:*!open*");

	});   
}, 0);