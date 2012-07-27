 //----------

 
	  
  function isThere(id_,time_) {
     try {
	   val = document.getElementById(id_).value
		 document.getElementById(id_ + "tym").value = time_
		 res = true
     }catch(err) {
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
                           
		      		 if (!isThere(xid,xlogtime)) {

   					$("#students_attendance tbody").append("<tr>" + "<td id=\"" + xid + "\">" + xid + "</td>" + "<td>" + xname + "</td>" + "<td id =\"" + xid + "tym\">" + xlogtime + "</td>" +"</tr>");
                       		}                                 

			}else { 
								  
				apMessageBox.error({
					title: "An error occured!", message: xid
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
		 
		 
		 
/* ----------------------  SUBMIT FUNCTION ----------------------------- */	

$(function() {
	$( "input:submit", ".button" ).button();
});



/* ------------------------------ RUN EFFECT --------------------------- */

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
		alert("submitted!")
		runEffect();
		return false;
	});
});



/* -----------------------  DELETE ROW ---------------------------------- */

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
	
	
/* ------------------------- FOR DIALOG-FORM -------------------------------- */

$(function() {
		$( "#dialog:ui-dialog" ).dialog( "destroy" );
		
		var name = $( "#name" ),
			weight = $( "#weight" ),
			aggregation = $( "#aggregation" ),
			allFields = $( [] ).add( name ).add( weight ).add( aggregation ),
			tips = $( ".validateTips" );

		function updateTips( t ) {
			tips
				.text( t )
				.addClass( "ui-state-highlight" );
			setTimeout(function() {
				tips.removeClass( "ui-state-highlight", 1500 );
			}, 500 );
		}

		function checkLength( o, n, min, max ) {
			if ( o.val().length > max || o.val().length < min ) {
				o.addClass( "ui-state-error" );
				updateTips( "Length of " + n + " must be between " +
					min + " and " + max + "." );
				return false;
			} else {
				return true;
			}
		}

		function checkRegexp( o, regexp, n ) {
			if ( !( regexp.test( o.val() ) ) ) {
				o.addClass( "ui-state-error" );
				updateTips( n );
				return false;
			} else {
				return true;
			}
		}
		
		$( "#dialog-form" ).dialog({
			autoOpen: false,
			height: 350,
			width: 350,
			modal: true,
			buttons: {
				"Add Category": function() {
					var bValid = true;
					allFields.removeClass( "ui-state-error" );

					bValid = bValid && checkLength( name, "name", 3, 16 );
					bValid = bValid && checkLength( weight, "weight", 1, 3 );
					bValid = bValid && checkLength( aggregation, "aggregation", 4, 40 );

					bValid = bValid && checkRegexp( name, /^[A-Z]([0-9a-zA-Z])+$/i, "Name may consist of a-z,A-Z, 0-9, underscores" );
					bValid = bValid && checkRegexp( weight, /^[0-9]([0-9a-z_])+$/i, "Range: 0-100" );
					bValid = bValid && checkRegexp( aggregation, /^/i, "Aggregation of Grades" );
					

					if ( bValid ) {
						//dri ma-submit ang add category form
						addCategory(name.val(), weight.val(), aggregation.val())
						$( "#users tbody" ).append( "<tr>" +
							"<td>" + name.val() + "</td>" + 
							"<td>" + weight.val() + "</td>" + 
							"<td>" + aggregation.val() + "</td>" + "<td>" + "<img src='pictures/delete_icon.png'> <img src='pictures/edit_icon.png'> " + "</td>" +
										"</tr>" ); 
						$( this ).dialog( "close" );
					}
				},
				Cancel: function() {
					$( this ).dialog( "close" );
				}
			},
			close: function() {
				allFields.val( "" ).removeClass( "ui-state-error" );
			}
		});
		

		
});

		$( "#add-cat" )
			.button()
			.click(function() {
				$( "#dialog-form" ).dialog( "open" );
			});
	});


/* -------------------------- DATE PICKER -------------------------------- */

$(function() {

		$( "#datepicker" ).datepicker();

	});


/* ------------------------- FOR DIALOG-FORM1 ---------------------------- */

$(function() {
		$( "#dialog:ui-dialog" ).dialog( "destroy" );
			var grdcat = $( "#grdcat" ),
			desc = $( "#desc" ),
			maxscore = $( "#maxscore" ),
			date = $( "#date" ),
			period = $("#period" ),
			allFields = $( [] ).add( grdcat ).add( desc ).add( maxscore ).add( date ).add( period ),
			tips = $( ".validateTips" );

		function updateTips( t ) {
			tips
				.text( t )
				.addClass( "ui-state-highlight" );
			setTimeout(function() {
				tips.removeClass( "ui-state-highlight", 1500 );
			}, 500 );
		}

		function checkLength( o, n, min, max ) {
			if ( o.val().length > max || o.val().length < min ) {
				o.addClass( "ui-state-error" );
				updateTips( "Length of " + n + " must be between " +
					min + " and " + max + "." );
				return false;
			} else {
				return true;
			}
		}

		function checkRegexp( o, regexp, n ) {
			if ( !( regexp.test( o.val() ) ) ) {
				o.addClass( "ui-state-error" );
				updateTips( n );
				return false;
			} else {
				return true;
			}
		}		

		$( "#dialog-form1" ).dialog({
			autoOpen: false,
			height: 400,
			width: 350,
			modal: true,
			buttons: {
				"Add Grade Item": function() {
					var bValid = true;
					allFields.removeClass( "ui-state-error" );
					bValid = bValid && checkLength( grdcat, "grdcat", 3, 16 );
					bValid = bValid && checkLength( desc, "desc", 2, 50 );
					bValid = bValid && checkLength( maxscore, "maxscore", 1, 5 );
					bValid = bValid && checkLength( date, "date", 1, 20 );
					bValid = bValid && checkLength( period, "period", 3, 20 );
					bValid = bValid && checkRegexp( grdcat, /^[A-Z]([0-9a-zA-Z])+$/i, "Name may consist of a-z,A-Z, 0-9, underscores" );
					bValid = bValid && checkRegexp( desc, /^[0-9]([0-9a-z_])+$/i, "Range: 0-100" );
					bValid = bValid && checkRegexp( maxscore, /^/i, "Max Score" );
					bValid = bValid && checkRegexp( date, /^[0-9]([0-9a-z_])+$/i, "Date" );
					bValid = bValid && checkRegexp( period, /^/i, "Period" );

					if ( bValid ) {
						$( "#users tbody" ).append( "<tr>" +
							"<td>" + grdcat.val() + "</td>" + 
							"<td>" + desc.val() + "</td>" + 
							"<td>" + maxscore.val() + "</td>" + 
							"<td>" + date.val() + "</td>" + 
							"<td>" + period.val() + "</td>" +			"</tr>" ); 

						$( this ).dialog( "close" );
					}
				},

				Cancel: function() {
					$( this ).dialog( "close" );
				}
			},

			close: function() {
				allFields.val( "" ).removeClass( "ui-state-error" );
			}
		});

		$( "#add-grditem" )
			.button()
			.click(function() {
				$( "#dialog-form1" ).dialog( "open" );
			});
	});

	$(document).ready(function(){
        $('#users td img.delete').click(function(){
		alert("Are you sure you want to delete this category?\n"+$(this).parent().parent().children('td').eq(0).html())
		
                
        });
