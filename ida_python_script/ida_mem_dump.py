import idaapi


def fn_f9():
    idaapi.continue_process()
    GetDebuggerEvent(WFNE_SUSP | WFNE_CONT, -1) 
    

i=1
while(1):
    fn_f9()
    while(1):
        file_name = "d:\\"+ str(i)
        if os.path.exists(file_name):
            i=i+1
        else:
            break
    r1 = GetRegValue("R1")
    r2 = GetRegValue("R2")
    data = idaapi.dbg_read_memory(r1, r2)
    fp = open(file_name, 'wb')
    fp.write(data)
    fp.close()
    
    