#!/bin/bash
file=$1

if [ "${file##*.}"x = "apk"x ]; then
    out_apk=${file%.*}"_sign.apk"
    echo $out_apk
    /home/chic/Android/Sdk/build-tools/29.0.3/apksigner sign --ks ~/Android/rzx.jks --ks-key-alias key0 -ks-pass pass:rzx865800446 -key-pass pass:rzx865800446 -out $out_apk $1
    exit
fi
echo " $1  is not apk "
