import idautils
import idc
import idaapi
import time

def fn_f9():
    idaapi.continue_process()
    GetDebuggerEvent(WFNE_SUSP | WFNE_CONT, -1) 

PatchDword(LocByName("rtld_db_dlactivity"), 0x46c0)
AddBpt(LocByName("time"))
fn_f9()
DelBpt(LocByName("time"))
lr = GetRegValue("LR")
AddBpt(lr)
fn_f9()
time = GetRegValue("R0")
DelBpt(lr)


AddBpt(LocByName("strtol"))
fn_f9()
DelBpt(LocByName("strtol"))
lr = GetRegValue("LR")
AddBpt(lr)
fn_f9()
DelBpt(lr)
r0 = GetRegValue("R0")
print("get trace id: %x" % (r0))
SetRegValue(0, "R0")
AddBpt(LocByName("time"))
fn_f9()
DelBpt(LocByName("time"))
SetRegValue(time, "R0")