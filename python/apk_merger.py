import getAppName
import os
import zipfile

if __name__ == "__main__":
    currentpath = os.getcwd()
    dir_list = os.listdir(currentpath)
    apk_list=[]
    for apkfile in dir_list:
        if apkfile.split(".")[-1] == "apk":
            # print(apkfile)
            apk_list.append(apkfile)
    
    getAppName.execCmd()    