#!/usr/bin/python
import capstone

bin= open('libil2cpp.so','rb').read()
start=0xd92b50
end=0xd92c28
cs = capstone.Cs(capstone.CS_ARCH_ARM, capstone.CS_MODE_ARM)
cs.detail = True
for i in cs.disasm(bin[start:end],start):
    print("0x%x:\t%s\t%s\n" %(i.address, i.mnemonic, i.op_str))   
    print("0x%x:\t%s\t%s\n" %(i.address, i.regs_read, i.regs_write))
    for a in i.regs_read:
        print("regs_read:"+i.reg_name(a))
    for a in i.regs_write:
        print("regs_write:"+i.reg_name(a))