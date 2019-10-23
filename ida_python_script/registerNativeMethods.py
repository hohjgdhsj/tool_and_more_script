import idautils
import idc
import idaapi
import time

def get_string(addr):
  out = ""
  while True:
    if Byte(addr) != 0:
      out += chr(Byte(addr))
    else:
      break
    addr += 1
  return out

r2 = GetRegValue("R2")
    #nMethods
r3 = GetRegValue("R3")
for index in range(r3):
    name = get_string(Dword(r2))
    address = Dword(r2 + 8)
    #AddBpt(address - 1)
    print("native function %s address is %x" % (name, address))
    r2 = r2 + 12