def index():
	s="""<html>
	  <head>
		 <link rel="stylesheet" type="../html/text/css" href="http://localhost/html/jquery/css/south-street/jquery-ui-1.8.9.custom.css" />
		  <script type="text/javascript" src="http://localhost/html/jquery/js/jquery-1.4.4.min.js"> </script>
		  <script type="text/javascript" src="http://localhost/html/jquery/js/jquery-ui-1.8.9.custom.min.js"></script>
		  <script type="text/javascript" src="http://localhost/html/apMessage.js"></script>
		 <script type="text/javascript">
			  //----------
			  
			  function isThere(id_,time_) 
			  {
				 try {
					  val = document.getElementById(id_).value
					  document.getElementById(id_ + "tym").value = time_
					  res = true
					}
				catch(err)
					{
					   res = false;
					}
				return res;
			  }
			  
			   jQuery.extend({
					getValues: function(url)
					   { //+++
				 var result = null;
				 $.ajax({
				url:url,
							type: 'get', 
							dataType:'text',
							async:false,
							success: function(data){
								 result = data;
							  
							   }
				//error: function () {}
						  });//ajax
				  return result;
					   } //+++
				}); //extend          
			  //usage:
			  //var results = $.getValues("url string");
			  //----------
			  $(document).ready(function() {
				  $("input#sections").autocomplete({
				   source: ["CENG1","CENG2"] 
				 }); //autocomplete
				
				 $("button").button(); //button
			   
				 $("#tabs").tabs(); //tabs
				 $("#radio").buttonset(); //radio
			   
				 $("button").click(
					   function ()
							 {
								if (document.getElementById("sections").value.length > 0)
								   {
										  document.getElementById("frmpic").src = "pics/anonymous.jpg";
										  document.getElementById("dfname").value = ""
										  document.getElementById("dftimein").value = ""
										  $("#attendance-form").dialog("open");
								   }
					else
								   $("#warning").dialog("open");
							 }
				  );
		
			 $("#attendance-form").dialog({
						autoOpen:false,
					height: 350,
						width:350,
						modal: true,
						buttons: {
							 "Close": function () {$(this).dialog("close");}
						} //buttons
			}); //attendance form
			  
				 $("#warning").dialog({
						  autoOpen: false,
						  show: "highlight",
						  hide: "explode",
						  buttons: {
							  "Ok": function () {$(this).dialog("close");}
							}
						});            


				 $("#dfidnumber").keypress(
					 function (event) 
					 { 
						var idnumber=$('input[name="dfidnumber"]').attr('value'); //get value from input text
						var sections=$('input[name="sections"]').attr('value'); //get value from input text
						var islec=$('input[id="radio1"]').attr('checked');
						var l = "";
						if (islec)
							l = "-LEC";
						else                   
							l = "-LAB";
					   
						if (event.which == '13')
						 {
							var results = $.getValues("http://10.10.34.80/sites/studentid?idnumber=" + idnumber + "&section=" + sections + l);
							var items = results.split("<>");
							   
						   
						   /*document.getElementById("dfname").value = sections
							document.getElementById("dftimein").value = results
							document.getElementById("frmpic").src = "pics/" + idnumber + ".jpg"
							*/
							// document.getElementById("dfname").value = results;
								  
						   
								   var xid = items[0];
								   if (xid.search("Err")  == -1) { 
								   var xname = items[1];
										var xlogtime = items[2];
										var xacount = items[3];
										var xpic  = items[4];
									
									
										document.getElementById("dfname").value = xname;
									document.getElementById("dftimein").value = xlogtime;
									document.getElementById("frmpic").src = "pics/" + xpic + ".jpg"
										document.getElementById("dfattcount").value = xacount;
									   if (!isThere(xid,xlogtime))
											 {
												$("#students_attendance tbody").append("<tr>" +
												 "<td id=\"" + xid + "\">" + xid + "</td>" + 
												 "<td>" + xname + "</td>" + 
												 "<td id =\"" + xid + "tym\">" + xlogtime + "</td>" +		
												 "</tr>");
											 }                                 

									 }
							
									   
								  else
										{ 
										  
											apMessageBox.error({
													title: "An error occured!",
													message: xid
												});
											
											/*
											apMessageBox.information({
													title: "Something Good",
													message: "Information to show here!"
												});
											 */
										document.getElementById("dfname").value = ""; 
										  document.getElementById("dftimein").value = "";
									  document.getElementById("frmpic").src = "pics/anonymous.jpg"
										  document.getElementById("dfattcount").value = "";}
								  document.getElementById("dfidnumber").value = "";
						   //$('input[name="dfname"]').focus();
						}  
					 }
				   ); //keypress              
			  }); //document on ready
			 /* adding a data to the table
			   var country=$('select[name="country"]').attr('value'); //get value from combo box
		   var txt=$('input[name="city"]').attr('value'); //get value from input text
		
			   $( "#students_attendance tbody" ).append( "<tr>" +
								"<td>" + name.val() + "</td>" + 
								"<td>" + email.val() + "</td>" + 
								"<td>" + password.val() + "</td>" +
							"</tr>" ); 

			 */
		 </script>  
		<script>
		$(function() {
			$( "input:submit", ".button" ).button();
		});
		</script>
		


		<link href="../html/style.css" media="all" rel="stylesheet" type="text/css" />

		<noscript> 
			<meta http-equiv="refresh" content="0;URL=http://google.com" />
		</noscript>

		<title> Gradebook</title>

		<style>
		.toggler { width: 500px; height: 300px; }
		#button { padding: .5em 1em; text-decoration: none; }
		#effect { width: 240px; height: 135px; padding: 0.4em; position: relative; }
		#effect h3 { margin: 0; padding: 0.4em; text-align: center; }
		</style>
		<script>
		$(function() {
			// run the currently selected effect
			function runEffect() {
				// get effect type from 
				var selectedEffect = $( "#effectTypes" ).val();
				
				// most effect types need no options passed by default
				var options = {};
				// some effects have required parameters
				if ( selectedEffect === "scale" ) {
					options = { percent: 0 };
				} else if ( selectedEffect === "size" ) {
					options = { to: { width: 200, height: 60 } };
				}
				
				// run the effect
				$( "#effect" ).toggle( selectedEffect, options, 500 );
			};
			
			// set effect from select menu value
			$( "#button" ).click(function() {
				runEffect();
				return false;
			});
		});
		</script>
		
		
		<script type="text/javascript" >
			function deleterow(id){
			if (confirm('Are you sure want to delete?')) {
			$.post('delete.php', {id: +id, ajax: 'true' },
			function(){
			$("#row_"+id).fadeOut("slow");
			$(".message").fadeIn("slow");
			$(".message").delay(2000).fadeOut(1000);
			});
			}
			}
		</script>
		
		</head>
		<body>
		
		<div id="tabs"> 
			<ul>
				<li><a href="#0"><span>Scale</span></a></li>
				<li><a href="#1"><span>Categories</span></a></li>
				<li><a href="#2"><span>Grades</span></a></li>
				<li><a href="#3"><span>Report</span></a></li>
				<li><a href="#4"><span>Attendance</span></a></li>
			</ul>
			<div id="0">
				<div id="dvscale" class="ui-widget">
				 <table class="ui-widget ui-widget-content">
				 
						
					 <!-- table header -->
					 <thead>
						  <tr class="ui-widget-header">
							<th scope="col"> Low % </th>
							<th scope="col"> High %</th>
							<th scope="col"> Grade </th>
						 </tr>
					  </thead>
					<tbody>
						<tr>
							<td> 100.00</td>
							<td>98.00</td>
							<td> 1.00</td>
						</tr>
						<tr>
							<td> 97.99</td>
							<td>92.00</td>
							<td> 1.25</td>
						</tr>
						<tr>
							<td> 91.00</td>
							<td>86.00</td>
							<td>1.50</td>
						</tr>
						<tr>
							<td>85.99</td>
							<td>80.00</td>
							<td> 1.75</td>
						</tr>
						<tr>
							<td>79.99</td>
							<td>74.00</td>
							<td> 2.00</td>
						</tr>
						<tr>
							<td>73.99</td>
							<td>68.00</td>
							<td> 2.25</td>
						</tr>
						<tr>
							<td>67.99</td>
							<td>62.00</td>
							<td> 2.50</td>
						</tr>
						<tr>
							<td>61.99</td>
							<td>56.00</td>
							<td> 2.75</td>
						</tr>
						<tr>
							<td>55.99</td>
							<td>50.00</td>
							<td> 3.00</td>
						</tr>
						<tr>
							<td>49.99</td>
							<td>40.00</td>
							<td> INC </td>
						</tr>
						<tr>
							<td> 39.99</td>
							<td>0.00</td>
							<td> 5.00</td>
						</tr>
						
						
					</tbody>
					
				  </table> <!-- datatable -->
				  <div class="button">
						<input type="submit" value="Save"/>
						<input type="submit" value="Cancel"/>
					</div><!-- end button -->
					
				  </div> <!-- ui widget -->
				  
			</div>
			<div id="1">
				<div id="dvscale" class="ui-widget">
				 <table class="ui-widget ui-widget-content">
				 
					 <!-- table header -->
					 <thead>
						  <tr class="ui-widget-header">
							<th scope="col"> Name</th>
							<th scope="col"> Weight</th>
							<th scope="col"> &nbsp</th>
						 </tr>
					  </thead>
					<tbody>
						<tr id="row_1">
								<td> Attendance</td>
								<td> 50%</td>
								<td>
								<a href="#" onclick="deleterow(1)"><img src="delete_icon.png"></a>&nbsp &nbsp<img src="edit_icon.png">
								</td>
						</tr>
						<tr id="row_2">
							<td> Quiz</td>
							<td>10%</td>
							<td>
								<a href="#" onclick="deleterow(2)"><img src="delete_icon.png"></a>&nbsp &nbsp<img src="edit_icon.png">
							</td>
						</tr id="row_3">
						<tr>
							<td> Major Exams</td>
							<td>40%</td>
							<td>
								<a href="#" onclick="deleterow(3)"><img src="delete_icon.png"></a>&nbsp &nbsp<img src="edit_icon.png">
							</td>
						</tr>
					</tbody>
					
				  </table> <!-- datatable -->
					
				  </div> <!-- ui widget -->
				  
		
				
				
				<a href="#" id="button" class="ui-state-default ui-corner-all">Add New Category</a>

				<div class="demo">

				<div class="toggler">
					<div id="effect" name="effects"class="ui-widget-content ui-corner-all">
						<h3 class="ui-widget-header ui-corner-all">New Category</h3>
						<br />
						Category Name: <br />
						<input type="text" /> <br /><br />
						Weight: <br />
						<input type="text"/> <br /><br />
						<div class="button">
							<input type="submit" value="Save"/>
							<input type="submit" value="Cancel"/>
						</div><!-- end button -->
					</div>
				</div>
				</div>

			</div>
			<div id="2">
				Gradebook Here..
			</div>
			<div id="3">
				Report Here..
			</div>
			<div id="4">
				<table>
				   <tr>
						 <td id="desc">
							 Section:
						 </td>
						 <td>	
							  <input id="sections" class="textbox" name="sections">                 
						 </td>
						 <td>
							  <div id="radio">
					  <input type="radio" id="radio1" name="radio" checked="checked" /><label for="radio1">Lecture</label>
					  <input type="radio" id="radio2" name="radio"/><label for="radio2">Laboratory</label>  
							</div>
						 </td>
						 <td>
							 <button> Attendance Form </button>
						 </td>
					 </tr>
					
					 
				 </table>
				 <div id="dvattendance" class="ui-widget">
				 <table id="students_attendance" class="ui-widget ui-widget-content">
					 <caption> Class Attendance </caption>
					 <!-- table header -->
					 <thead>
						  <tr class="ui-widget-header">
						<th scope="col"> Id No </th>
							<th scope="col"> Name </th>
							<th scope="col"> Time In </th>
						 </tr>
					  </thead>
					  <tbody>
						
				   </tbody>
				  </table> <!-- datatable -->
				  </div> <!-- ui widget -->
			 </div> <!-- id = 0 -->
			
			<div id="attendance-form" title="Attendance"> 
				<table style="text-align: left; width: 100%;" cellpadding="2" cellspacing="2">
				  <tr>
					<td>
					   <form>
							 <fieldset>
							 <label for="dfidnumber">ID Number:</label>
							 <input type="text" name="dfidnumber" id="dfidnumber" class="textbox ui-widget-content ui-corner-all" />
							 <label for="dfname"> Name: </label>
							 <input type="text" name="dfname" id="dfname" class="textbox ui-widget-content ui-corner-all" />
							 <label for="dftimein"> Time: </label>
							 <input type="text" name="dftimein" id="dftimein" class="textbox ui-widget-content ui-corner-all" />
								 <label for="dfattcount"> Attendance Count: </label>
							 <input type="text" name="dfattcount" id="dfattcount" class="textbox ui-widget-content ui-corner-all" />
						 </fieldset>
					   </form>
					  </td>
					  <td>
						 <image src="pics/anonymous.jpg" class="r50" id="frmpic">
					  </td>
				   </tr>
			 </table> <!-- attendance entry dialog -->
			</div>
			
		  </div>  <!-- end tabs -->
	</body>
		</html>"""
	return s
