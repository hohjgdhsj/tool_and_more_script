var hook_registNatives = function() {
    var env = Java.vm.getEnv();
    var handlePointer = Memory.readPointer(env.handle);
    console.log("handle: " + handlePointer);
    var nativePointer = Memory.readPointer(handlePointer.add(215 * Process.pointerSize));
    console.log("register: " + nativePointer);
    /**
     typedef struct {
        const char* name;
        const char* signature;
        void* fnPtr;
     } JNINativeMethod;
     jint RegisterNatives(JNIEnv* env, jclass clazz, const JNINativeMethod* methods, jint nMethods)
     */
    Interceptor.attach(nativePointer, {
        onEnter: function(args) {
            var methods = args[2];
            var methodcount = args[3];
            var name = env.getClassName(args[1]);
            console.log("=== class: " + name + " ====");
 
            console.log("==== methods: " + methods + " nMethods: " + methodcount + " ====");
            for (var i = 0; i < methodcount; i ++ ) {
                var idx = i * 12;
                console.log("name: " + Memory.readCString(Memory.readPointer(methods.add(idx)))
                    + " signature: " + Memory.readCString(Memory.readPointer(methods.add(idx + 4)))
                    + " fnPtr: " + Memory.readPointer(methods.add(idx + 8))
                );
            }
 
        }
    });
}