setImmediate(function () {
    Java.perform(function () {
        console.log("start");
        //java层hook
        var hookgoal = Java.use("com.example.goal.HookGoal");
        var clazz = Java.use("java.lang.Class");
        var obj = Java.use("java.lang.Object");
        var Exception = Java.use("java.lang.Exception");
        var str = Java.use("java.lang.String");
        //hook 构造方法
        hookgoal.$init.overload("int").implementation = function (number) {
            send("HookGoal构造函数的参数number:" + number);
            send("HookGoal构造函数的参数修改为666");
            return this.$init(666);
        };
 
        //hook 静态变量TAG
        var reflectField = Java.cast(hookgoal.class, clazz).getDeclaredField("TAG");
        reflectField.setAccessible(true);
        reflectField.set("java.lang.String", "frida hooking");
        send("修改HookGoal的静态变量TAG为：frida hooking");
 
 
        //实例化对象way1
        var newhg = hookgoal.$new(0);
        send("new HookGoal instance newhg: " + newhg);
        // 实例化对象way2
        var newhg1 = hookgoal.$new.overload("int").call(hookgoal, 0);
        send("new HookGoal instance newhg1: " + newhg1);
 
        //hook匿名内部类，修改参数
        var nminner = Java.use("com.example.goal.HookGoal$1");
        nminner.eat.overload("java.lang.String").implementation = function (s) {
            var arg = arguments[0];
            send("eat参数获取 way1:" + arg);
            send("eat参数获取 way2:" + s);
            //修改参数
            return this.eat("is hooking");
        };
        var diy = Java.use("com.example.goal.DiyClass");
        hookgoal.func2.implementation = function (s) {
            //func2为静态方法
            var arg = arguments[0];
            send("func2()参数获取:" + s);
            //调用成员方法func0()在静态方法内只能通过创建的实例访问
            newhg.func0();
            send("func2()内调用func0()  通过创建实例newhg调用");
            newhg1.func0();
            send("func2()内调用func0()  通过创建实例newhg1调用");
 
            //修改实例的hookGoalNumber值，前面hook构造函数时已经将值改为666
            //修改字段值 通过反射得到字段，
            //var num1 = Java.cast(newhg1.getClass(), clazz).getDeclaredField("hookGoalNumber");
            var num1 = Java.cast(hookgoal.class, clazz).getDeclaredField("hookGoalNumber");
            num1.setAccessible(true);
            send("实例newhg1的hookGoalNumber:" + num1.get(newhg1));
            num1.setInt(newhg1, 777);
            send("修改实例newhg1的hookGoalNumber:" + num1.get(newhg1));
 
            send("实例newhg的hookGoalNumber:" + num1.get(newhg));
 
            // 反射调用方法
            var func = hookgoal.class.getDeclaredMethod("func0", null);
            send("func0:" + func);
            //var funcs = hookgoal.class.getDeclaredMethods();
            //for(var i=0;i<funcs.length;i++)
            //    send(""+i+" "+funcs[i]);
 
            //invoke(instance,args)调用成员方法
            func.invoke(newhg1, null);
            send("func2()内调用func0()  way2 通过反射调用");
 
            //调用DiyClass内的getData()
            var d = diy.$new(666);
            var x = d.getData();
            send("func2()内调用DiyClass下的getData() 通过创建实例d调用 返回：" + x);
            //修改func2的参数
            return this.func2("is hooking");
        };
 
        //修改func3参数
        hookgoal.func3.implementation = function (array) {
            //在成员方法func3内调用func0()
            this.func0();
            send("func3()内调用func0()  way2 成员方法中直接调用其他成员方法");
            //修改数组参数
            send("func3参数：" + array);
            var a = Java.array("com.example.goal.DiyClass", [diy.$new(111), diy.$new(222), diy.$new(333)]);
            send("func3参数修改：" + a);
            return this.func3(a);
        };
 
        var inner = Java.use("com.example.goal.HookGoal$InnerClass");
        //hook内部类
        inner.$init.overload("com.example.goal.HookGoal", "java.lang.String").implementation = function (clas, arg) {
            send("innerClass构造函数的参数:" + arg);
            return this.$init(clas, "frida is hooking");
        };
        //hook 内部类方法
        inner.innerFunc.implementation = function (s) {
            send("frida hook 前innerFunc()的参数：" + arguments[0]);
            var num = inner.class.getDeclaredField("innerNumber");
            num.setAccessible(true);
 
            //内部类成员方法中修改成员属性，way1 通过this.xxx.value 访问、修改
            send("通过this.innerNumber.value获取值:" + this.innerNumber.value);
            this.innerNumber.value = 1;
            send("通过this.innerNumber.value设置值后:" + this.innerNumber.value);
            //way2 先通过反射得到字段，
            send("反射方式 innerNumber修改前:" + num.get(this));
            num.setInt(this, 2);
            send("反射方式 innerNumber修改后:" + num.get(this));
            return this.innerFunc("frida is hooking");
        };
