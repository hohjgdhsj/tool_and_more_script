#!/usr/bin/python3
# -*- coding: UTF-8 -*-
import getAppName



if __name__ == "__main__":
    apkname = getAppName.getAppPackageName();
    cmd = "adb shell pm path " + apkname;
    apkpath = getAppName.execCmd(cmd).split("package:");
    for path in apkpath:
        if path == "":
            continue
        else:
            print(path)
            cmd1 = "adb pull " + path
            getAppName.execCmd(cmd1);

    # cmd1 = "adb pull " + apkpath
    # getAppName.execCmd(cmd1);


