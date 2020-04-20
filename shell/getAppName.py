#!/usr/bin/python3
# -*- coding: UTF-8 -*-
import os


def execCmd(cmd):  
    r = os.popen(cmd)  
    text = r.read()  
    r.close()  
    return text 
def getAppPackageName():
    re = execCmd("adb shell dumpsys window | grep mFocusedWindow")
    print(re)
    activity = re.split(" ")[-1].split("/")[0]
    print(activity)
    return activity

if __name__ == "__main__":
    getAppPackageName()


