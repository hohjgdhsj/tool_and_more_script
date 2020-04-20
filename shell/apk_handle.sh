#!/bin/bash

# echo $*
# echo $0
current_work=`pwd`
arg1=$1
arg2=$2
file="${current_work}"/"${arg1}"
file1=$2
# echo $1
# echo $2
myArray=()
lib_name=""
base_name=""

i=0
for item in $*; do
    tmp=$item
    if [ -d $tmp ];then
        tmp="${current_work}"/"${item}"
    fi
    echo "dir = $tmp"
    if [ ! "${tmp##*.}"x = "apk"x ]; then
        echo "apk file error"
    fi
    out_dir=${tmp%.*}
    apktool d -s -r $item -o $out_dir
    if [ ! -d "$out_dir/lib" ]; then
        echo "lib file not found"
        base_name=$out_dir
    else
        echo "lib file found"
        myArray[i]=$out_dir
        i=$(expr $i + 1)
    fi
done

for lib in ${myArray[*]}; do
    echo "$lib"
    cp "-r" "$lib/lib" "$base_name"
    rm -rf $lib
done
echo $base_name
java "-jar" "/home/chic/rzx_tool/androidtool/AXMLEditor.jar" "-attr" "-r" "application" "package" "isSplitRequired"  "$base_name/AndroidManifest.xml"  "$base_name/AndroidManifest_out.xml"
rm -f "$base_name/AndroidManifest.xml"
mv "$base_name/AndroidManifest_out.xml"  "$base_name/AndroidManifest.xml"
apktool b  $base_name -o $base_name"_moli.apk"
rm -rf $base_name


# echo ${myArray[*]}
# echo $file_name
