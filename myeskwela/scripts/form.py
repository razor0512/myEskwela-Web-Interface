from dosql import *
from mod_python import Session

def login(req, username, pwd):
	a = doSql()
    	f = a.execqry("select login('"+username+"', '"+pwd+"')", False)[0][0]
	s = f.split(',')
	session = Session.Session(req)
	if(f != 'invalid'):
		
		session['id'] = s[0]
		session['name'] = s[1]+" "+s[2]+" "+s[3]
		
		if(s[4] == 'faculty'):
			session['college'] = s[5]
			session['dept'] = s[6]
			session.save()
			return "<html><body onload='location.href=\"../../html/ind.html\"'></body></html>"
		else:
			session.save()
			return "wala pay student nga page"

	else:
		session['invalid'] = "Incorrect Username or Password!"
		session.save()
		return "<html><body onload='location.href=\"../login\"'></body></html>"

def section(req, sec, sy, subj, code):
	session = Session.Session(req)
	if(checkSession(req, session)):
		session['class'] = sec
		session['sy'] = sy
		session['subj'] = subj
		session['sCode'] = code
		
		session.save()
		return "<html><body onload='location.href=\"../../html/grades.html\"'></body></html>"
	else:
		return "<html><body onload='location.href=\"../login\"'></body></html>"


def checkSession(req, session):
	
	if('id' in session):
		return True
	else:
		session['invalid'] = "You Have to Log In to Continue"
		session.save()
		return False

def checkSessionJs(req):
	session = Session.Session(req)
	if('id' in session):
		return True
	else:
		session['invalid'] = "You Have to Log In to Continue"
		session.save()
		return False

def logout(req):
	session = Session.Session(req)
	session['invalid'] = "You Have Been Logged Out."
	session.save()
	return "<html><body onload='location.href=\"../login\"'></body></html>"
