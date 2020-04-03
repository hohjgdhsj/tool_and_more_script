import os


def execCmd(cmd):  
    r = os.popen(cmd)  
    text = r.read()  
    r.close()  
    return text 
def getAppPackageName():
    re = execCmd("adb shell dumpsys window | findstr mFocusedWindow")
    print(re)
    activity = re.split(" ")[-1].split("/")[0]
    print(activity)
    return activity

if __name__ == "__main__":
    getAppPackageName()


