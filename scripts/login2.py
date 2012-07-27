import cgi
from mod_python import Session

def index(req):
	session = Session.Session(req)
	id = cgi.escape(req.form.getfirst('login', '')) 
	s = """<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
		<html xmlns="http://www.w3.org/1999/xhtml">
		<head>
		<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
		<title>Gradebook</title>
		<link rel="stylesheet" type="text/css" href="../html/css/style.css" />
		</head>

		<body>
	
	
		<div class="div_login">
		<img src="../html/pictures/logo.png" /><br /><br />
		"""
	if('invalid' in session):	
		s = s+"<div class='div_error'><p>Login Failed! Incorrect Username or Password!</p></div><br />"
	s=s+"""	
		<form name="loginform" method="post" action="form/login"> 
			<p> 
				<label>Username<br /> 
				<input type="text" size="25" name="username" style="height: 25px;"/></label> 
			</p> 
			<p> 
				<label>Password<br /> 
				<input type="password" name="pwd" id="user_pass" class="input" value="" size="25" style="height: 25px;" /></label> 
			</p> 
			<p> 
				<input type="submit" value="Log In" class="submit_button"/> 
			</p> 
		</form> 
		</div>
		</body>
		</html>"""
	return s
	
