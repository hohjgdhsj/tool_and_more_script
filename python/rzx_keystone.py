#!/usr/bin/python3
from keystone import *
ks = Ks(KS_ARCH_ARM, KS_MODE_ARM)
code=b"sub r1, r2, r5"
encoding, count =ks.asm(code)
print("%s = [ " ,code)
for i in encoding:
    print("%02x " ,i)
print("]")