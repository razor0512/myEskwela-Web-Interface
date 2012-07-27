def index():
	s="""<html>
	<head>
	<title>Gradebook</title>
	<link rel="stylesheet" type="text/css" href="style.css" />
	<link rel="stylesheet" type="text/css" href="jquery/css/south-street/jquery-ui-1.8.9.custom.css" />
	<script type="text/javascript" src="jquery/js/jquery-1.4.4.min.js"> </script>
	</head>

	<body>
	<div class="div_accountinfo">
Account Information</div>
<div class="div_teacherinfo">
<table class="table_teacherinfo" id="teacherInfo">
	<tr>
	    <td rowspan="5" class="picturecell"><image src="pics/anonymous.jpg" class="r51" id="frmpic"></td>
	</tr>
	<tr>
	    <td id="td_teacherlabel">Name:</td>
		<td class="td_teacherinfo">&nbsp;</td>

	</tr>
	<tr>
	    <td id="td_teacherlabel">Faculty ID Number:</td>
		<td class="td_teacherinfo">&nbsp;</td>
	</tr>
	<tr>
	    <td id="td_teacherlabel">Department:</td>
		<td class="td_teacherinfo">&nbsp;</td>
	</tr>
	<tr>
	    <td id="td_teacherlabel">College:</td>
		<td class="td_teacherinfo">&nbsp;</td>
	</tr>
	</table>
	</div>

	</br>
	</br>

	<table class="table_classlists" align="center">
		<tr>
		    <th id="td_code">Code</th>
		    <th id="td_section">Section</th>
		    <th id="td_desc">Description</th>
		    <th id="td_day">Day</th>
		    <th id="td_time">Time</th>
		    <th id="td_room">Room</th>
		    <th id="td_type">Type</th>
		    <th id="td_units">Units</th>
		    <th id="td_action">Action</th>
		</tr>
		"""
	for j in range(1,3):
		s= s+"""<tr>
		    <td id=>&nbsp;</td>
		    <td>&nbsp;</td>
		    <td>&nbsp;</td>
		    <td>&nbsp;</td>
		    <td align="center"><input type="button" value="View" id="view_button"></td>
		</tr>
	        """
	
	s=s+"""</table>
	</div>
	</body>
	</html>"""
	return s
