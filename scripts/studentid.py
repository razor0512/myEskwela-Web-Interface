from dosql import *
import os.path
import cgi
import time

_err_msg =""
def _getsubject(section):
    a = doSql()
    f = a.execqry("select getsubject('" + section + "',getcurrsem())", False)
    del a
    return f[0][0]

def _atcount(id, section):
    
    a = doSql()
    subj = _getsubject(section)
    i = a.execqry("select my_attendance('" + id + "','" + subj + "', " + "'" + "%" + section[len(section)-2:] + "')", False)
    j = a.execqry("select max_attendance('" + subj + "', " + "'" + section + "','" + id + "', getcurrsem())", False)
    del a
    return "Attended " + str(i[0][0]) + " of " + str(j[0][0])
     
def _add2attendance(id, section):
    try:
        a = doSql()
        f = a.execqry("select insupattendance('" + id + "', '" + section + "', getcurrsem(), now()::timestamp without time zone, true)", True)
        del a
        return f[0][0]
    except:
        return str(sys.exc_info()[1])

def getData(req,heheh):
	return "English1"


def _getname(id):
    a = doSql()
    f = a.execqry("select getname('" + id + "')", False)
    del a
    return f[0][0]

def _error_out(err):
    xml = "Err" + err
    xml = xml + "<>" 
    xml = xml + "<>"
    xml = xml + "<>"
    xml = xml + "<>anonymous"
    return xml

#def index(req):
#    id = cgi.escape(req.form.getfirst('idnumber', '')) 
#    section = cgi.escape(req.form.getfirst('section', ''))
#    return id + " " + section + " " + str(_add2attendance(id,section))


def index(req):
    try:
        id = cgi.escape(req.form.getfirst('idnumber', '')) 
        section = cgi.escape(req.form.getfirst('section', ''))
        
        #id = "2007-0504--"
        #section = "CENG1-LEC"
        res = _add2attendance(id, section)
        if res == 'OK':
            fname = id 
            stuname= _getname(id)
            logtime = time.strftime("%m/%d/%Y %H:%M:%S", time.localtime())
            acount = _atcount(id, section)
            if not os.path.exists("/var/www/html/pics/" + fname + ".jpg"):
                fname = "anonymous"
   
            xml  =  id
            xml = xml + "<>" + stuname 
            xml = xml + "<>" + logtime
            xml = xml + "<>" + acount
            xml = xml + "<>" + fname
        else: 
            xml = _error_out(res)
        return xml
    except:
        xml = _error_out(str(sys.exc_info()[1]))
        return xml


#print index("")
