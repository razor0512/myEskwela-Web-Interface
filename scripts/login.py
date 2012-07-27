import cgi
from mod_python import Session

def index(req):
	session = Session.Session(req)
	s = """<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
		<html xmlns="http://www.w3.org/1999/xhtml">
		<head>
		<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
		<title>Gradebook</title>
		<link rel="stylesheet" type="text/css" href="../html/css/style.css" />
		</head>

		<body>
	
	
		<div class="div_login">
		<img src="../html/pictures/logo_index.png" id="logo"/><br>
		"""
	if('invalid' in session):	
		s = s+"<div class='div_error'><p>"+session['invalid']+"</p></div><br />"
		session.delete()
	s=s+"""	
		<form name="loginform" id="login_form" method="post" action="form/login"> 

			<label for="txtName">Username</label>
			<input type="text" name="username"/>

			<label for="txtEmail">Password</label>
			<input type="password" name="pwd" id="user_pass"/>

			<input type="submit" value="Log In" class="submit_button"/> 	

		</form> 
		</div>
		</body>
		</html>"""
	return s
	
