function checkSession(){
	  $.post('../scripts/form/checkSessionJs',function(data){
       if(data.length>0){
          if(data == "False"){
		location.href="../scripts/login"
	 }
       }
    });
}
function getClasses(){

    checkSession()
    getProfInfo()
	
    $.post('../scripts/queries/getClasses',function(data){
       if(data.length>0){
          classes = data.split("@")
          for(i=0; i<classes.length-1; i++){
	     details = classes[i].split("$")
	     
             var tbody = document.getElementById
	("classList").getElementsByTagName('TBODY')[0];
	var row = document.createElement('TR')
	
	var td1 = document.createElement('TD')
	td1.innerHTML = details[0];
		
	var td2 = document.createElement('TD')
	td2.innerHTML = details[1];
	
	var td3 = document.createElement('TD')
	td3.innerHTML = details[2];
		
	var td4 = document.createElement('TD')
	td4.innerHTML = details[3];
		
	var td5 = document.createElement('TD')
	td5.innerHTML = details[4];

	var td6 = document.createElement('TD')
	td6.innerHTML = details[5];

	var td7 = document.createElement('TD')
	td7.innerHTML = details[6];

	var td8 = document.createElement('TD')
	td8.innerHTML = details[7];	

	var td9 = document.createElement('TD')
	td9.innerHTML = '<center><input type="button" value="View" id="view_button" onclick="location.href=\'../scripts/form/section?sec='+details[1]+'&sy='+details[8]+'&subj='+details[0]+'&code='+details[9]+'\'"></center>'
	
		
		row.appendChild(td1);
		row.appendChild(td2);
		row.appendChild(td3);
		row.appendChild(td4);
		row.appendChild(td5);
		row.appendChild(td6);
		row.appendChild(td7);
		row.appendChild(td8);
		row.appendChild(td9);
		tbody.appendChild(row);             
	  }
       }
    });
}
function getProfInfo(profId){

     $.post('../scripts/queries/getTeacherInfo',function(data){
       if(data.length>0){
          info = data.split("$")
          var table = document.getElementById('teacherInfo') 
          table.rows[1].cells[1].innerHTML = info[0]
          table.rows[2].cells[1].innerHTML = info[1]
          table.rows[3].cells[1].innerHTML = info[2]
          table.rows[4].cells[1].innerHTML = info[3]
          table.rows[0].cells[0].innerHTML = '<image src="pictures/'+info[4]+'" class="r51" id="frmpic">'
       }
    });
    
}


function getStudents(){ 
	checkSession()
	getSubjectName();
	getCategories();
	getScale();
	getGrp_Perf();
	getPerf();
	updScale();
	getHeader();
	getCategoryItem();
	getCategoryItem2();
	getAttend();
	updateGradeItem();
	updatePerformance();
	getScore();
	$.post('../scripts/queries/getSectionStudents',function(data){
       if(data.length>0){
          stud = data.split("@")

	for(i=0; i<stud.length-1; i++){
	     details = stud[i].split("$")
	     
        var tbody = document.getElementById
	("students").getElementsByTagName('TBODY')[0];
	var row = document.createElement('TR')
	
	var td1 = document.createElement('TD')
	td1.innerHTML = details[1];
		
	var td2 = document.createElement('TD')
	td2.innerHTML = details[0];
	
	var td3 = document.createElement('TD')
	td3.innerHTML = "";
		
		row.appendChild(td1);
		row.appendChild(td2);
		row.appendChild(td3);
		
		tbody.appendChild(row);             
	  }
       }
    });
}

function getSubjectName(){
	 $.post('../scripts/queries/getSubjName',function(data){
       if(data.length>0){
          head = data.split("@")
         for(i=0; i<head.length-1; i++){
		details = head[i].split('$')
		document.getElementById("subjcode").innerHTML = details[0];
		/*document.getElementById("subname").innerHTML = details[1];
		document.getElementById("type").innerHTML = details[2];
		document.getElementById("sec_code").innerHTML = details[3];
		document.getElementById("subj_time").innerHTML = details[4];*/

	}
       }
    });	
}

/*function getHeader(){
	 $.post('../scripts/queries/getHeaderReport',function(data){
       if(data.length>0){
          head = data.split("@")
         for(i=0; i<head.length-1; i++){
		details = head[i].split("$")
		 var tbody = document.getElementById
		("students").getElementsByTagName('THEAD')[0];
		var td1 = document.createElement('TR')
		td1.innerHTML = details[1];
		
			row.appendChild(td1);
	
			tbody.appendChild(row);
			
	}
       }
    });
	
}*/

function getHeader() {   
$.post('../scripts/queries/getHeaderReport',function(data){
      if(data.length>0){
         head = data.split("@")
        for(i=0; i<head.length-1; i++){ 
               details = head[i].split("$")
                var tblHeadObj = document.getElementById('students').tHead; //table head
                for (var h=0; h< tblHeadObj.rows.length; h++) {
                 var newTH = document.createElement('th');
                 tblHeadObj.rows[h].appendChild(newTH); //append ne th to table
                 newTH.innerHTML = details[1]; //append th content to th
                }
               }
       }
       });
       }


function getCategories(){
	 $.post('../scripts/queries/getCategories',function(data){
       if(data.length>0){
          cat = data.split("@")
         for(i=0; i<cat.length-1; i++){
		details = cat[i].split("$")
		var tbody = document.getElementById
		("users").getElementsByTagName('TBODY')[0];
		var row = document.createElement('TR')
	
		var td1 = document.createElement('TD')
		td1.innerHTML = details[1];
		
		var td2 = document.createElement('TD')
		td2.innerHTML = details[2];
	
		var td3 = document.createElement('TD')
		td3.innerHTML = details[3];

		var td4 = document.createElement('TD')
		td4.innerHTML = '<img class="delete" src="pictures/delete_icon.png" onclick="remCategory(this)"> <img src="pictures/edit_icon.png" onclick="openUpdateCatDialog(\''+details[1]+'\',\''+details[2]+'\',\''+details[3]+'\', this)">';
		
			row.appendChild(td1);
			row.appendChild(td2);
			row.appendChild(td3);
			row.appendChild(td4)
			tbody.appendChild(row);
			
	}
       }
    });
	
}

function addCategory(catName_, weight_, aggr_){
	$.post('../scripts/queries/addCategory',{catName:catName_, weight:weight_, aggr:aggr_},function(data){
       if(data=="True"){
	
          var tbody = document.getElementById
		("users").getElementsByTagName('TBODY')[0];
		var row = document.createElement('TR')
	
		var td1 = document.createElement('TD')
		td1.innerHTML = catName_;
		
		var td2 = document.createElement('TD')
		td2.innerHTML = weight_;
	
		var td3 = document.createElement('TD')
		td3.innerHTML = aggr_;

		var td4 = document.createElement('TD')
		td4.innerHTML = '<img class="delete" src="pictures/delete_icon.png" onclick="remCategory(this)"> <img src="pictures/edit_icon.png" onclick="openUpdateCatDialog(\''+catName_+'\',\''+weight_+'\',\''+aggr_+'\', this)">';

		var tblHeadObj = document.getElementById('students').tHead; //table head
                	for (var h=0; h< tblHeadObj.rows.length; h++) {
                         var newTH = document.createElement('th');
                         tblHeadObj.rows[h].appendChild(newTH); //append ne th to table
                         newTH.innerHTML = catName_; //append th content to th
               }
		
			row.appendChild(td1);
			row.appendChild(td2);
			row.appendChild(td3);
			row.appendChild(td4);
			tbody.appendChild(row)
			
			document.getElementById("name").value = ""	
			document.getElementById("weight").value = ""
			document.getElementById("aggregation").value = ""
			alert("Successfully Added!!!")
       }else{
		alert("Failed to Add Category")
	}
    });
}

function remCategory(obj){
	val = $(obj).parent().parent().children('td').eq(0).html();
	var confirmation = confirm("Are you sure you want to delete this category?\n\n"+val)
	if(confirmation){
	$.post('../scripts/queries/remCategory',{catName:val},function(data){
       if(data.length>0){
          if(data!="True"){
		alert("Error!!!")
	}else{
		alert(val+" Successfuly Removed.");
		$(obj).parent().parent().remove();
	}
       }
    });
	}
}

function openUpdateCatDialog(name_, weight, aggr, obj){
	$( "#dialog-form2" ).dialog( "open" );
	document.getElementById("origname").value = name_
	document.getElementById("name1").value = name_
	document.getElementById("weight1").value = weight
	document.getElementById("aggregation1").value = aggr
	

}

function updateCategory(name_, name1, weight_, aggr_){
	$.post('../scripts/queries/updateCategory',{name1_:name_, name2_:name1, weight:weight_, aggr:aggr_},function(data){
       if(data.length>0){
          if(data=="False"){
		alert("Error!!!")
	}else{

		
		var $tdThatContainsValue2 = $("#users tr td").filter(function(){
		    return $(this).html();
		});
		$tdThatContainsValue2.parent().children("td").eq(0).html(name1);
		$tdThatContainsValue2.parent().children("td").eq(1).html(weight_);
		$tdThatContainsValue2.parent().children("td").eq(2).html(aggr_);
		$tdThatContainsValue2.parent().children("td").eq(3).html('<img class="delete" src="pictures/delete_icon.png" onclick="remCategory(this)"> <img src="pictures/edit_icon.png" onclick="openUpdateCatDialog(\''+name1+'\',\''+weight_+'\',\''+aggr_+'\', this)">');
		
			}
       }
    });
	document.getElementById("origname").value = ""
	document.getElementById("name1").value = ""
	document.getElementById("weight1").value = ""
	document.getElementById("aggregation1").value = ""
	alert("Successfully Updated!")
}

function getScale(){
	 $.post('../scripts/queries/getScale',function(data){
       if(data.length>0){
          scale = data.split("@")
         for(i=0; i<scale.length-1; i++){
		details = scale[i].split("$")
		var tbody = document.getElementById
		("grdscale").getElementsByTagName('TBODY')[0];
		var row = document.createElement('TR')
	
		var td1 = document.createElement('TD')
		td1.innerHTML = '<p id="high'+details[0]+'" onclick=\'editScale("high'+details[0]+'", '+details[0]+', "high")\'>'+ details[1]+'</p>';
		
		var td2 = document.createElement('TD')
		td2.innerHTML = '<p id="low'+details[0]+'" onclick=\'editScale("low'+details[0]+'", '+details[0]+', "low")\'>'+ details[2]+'</p>';
	
		var td3 = document.createElement('TD')
		td3.innerHTML = details[3];

			row.appendChild(td1);
			row.appendChild(td2);
			row.appendChild(td3);
			tbody.appendChild(row);
		
	}
       }
    });
}


function openAddGradesDialog(grp_perf_id){


	$( "#dialog-form3" ).dialog( "open" );
	getPerf(grp_perf_id)
}

function addGrpPerformance( description_, maxscore_, period_, date_, catId_a){
	$.post('../scripts/queries/addGrpPerformance',{ description:description_, maxscore:maxscore_, period:period_, date:date_},function(data){
		
       if(data=="True"){

          var tbody = document.getElementById
		("grpperf").getElementsByTagName('TBODY')[0];
		var row = document.createElement('TR')

		
		var td1 = document.createElement('TD')
		td1.innerHTML = "Quizzes";
		
		var td2 = document.createElement('TD')
		td2.innerHTML = description_;
	
		var td3 = document.createElement('TD')
		td3.innerHTML = maxscore_;

		var td4 = document.createElement('TD')
		td4.innerHTML = period_;

		var td5 = document.createElement('TD')
		td5.innerHTML = date_;

		var td6 = document.createElement('TD')
		td6.innerHTML = '<img class="delete" src="pictures/delete_icon.png" onclick="remGrpPerf(this)"> <img src="pictures/edit_icon.png" onclick="openUpdateGradeItemDialog(\''+details[1]+'\',\''+details[2]+'\',\''+details[3]+'\',\''+details[4]+'\',\''+details[5]+'\', this)"> <img src="pictures/view.png" onclick="openAddGradesDialog(\''+details[0]+'\')">';
		
			row.appendChild(td1);
			row.appendChild(td2);
			row.appendChild(td3);
			row.appendChild(td4);
			row.appendChild(td5);
			row.appendChild(td6);
			tbody.appendChild(row);
			
			//document.getElementById("grdcat").value = ""	
			document.getElementById("description").value = ""
			document.getElementById("maxscore").value = ""
			document.getElementById("period").value = ""
			document.getElementById("date").value = ""
			alert("Successfully Added!!!")
       }else{
		alert("Failed to Add Grade Item")
	}
	
    });
}

function getCategoryItem(){
       $.post('../scripts/queries/getCat',function(data){
     if(data.length>0){
       document.getElementById('grdcat1').innerHTML = data
     }
  });      
}

function getCategoryItem2(){
       $.post('../scripts/queries/getCat2',function(data){
     if(data.length>0){

       document.getElementById('grdcat2').innerHTML = data
     }
  });      
}

function getGrp_Perf(){
	
	 $.post('../scripts/queries/getGrpPerf',function(data){
       if(data.length>0){
          gp = data.split("@")
         for(i=0; i<gp.length-1; i++){
		details = gp[i].split("$")
		var tbody = document.getElementById
		("grpperf").getElementsByTagName('TBODY')[0];
		var row = document.createElement('TR')
		
		var td1 = document.createElement('TD')
		td1.innerHTML = details[1];
		
		var td2 = document.createElement('TD')
		td2.innerHTML = details[2];
	
		var td3 = document.createElement('TD')
		td3.innerHTML = details[3];

		var td4 = document.createElement('TD')
		td4.innerHTML = details[4];

		var td5 = document.createElement('TD')
		td5.innerHTML = details[5];

		var td6 = document.createElement('TD')
		td6.innerHTML = '<img class="delete" src="pictures/delete_icon.png" onclick="remGrpPerf(this)"> <img src="pictures/edit_icon.png" onclick="openUpdateGradeItemDialog(\''+details[1]+'\',\''+details[2]+'\',\''+details[3]+'\',\''+details[4]+'\',\''+details[5]+'\', this)"> <img src="pictures/view.png" onclick="openAddGradesDialog(\''+details[0]+'\')">';

		
			row.appendChild(td1);
			row.appendChild(td2);
			row.appendChild(td3);
			row.appendChild(td4);
			row.appendChild(td5);
			row.appendChild(td6);
			tbody.appendChild(row);
			
	}
       }
    });
	
}

function remGrpPerf(obj){
	val = $(obj).parent().parent().children('td').eq(1).html();
	var confirmation = confirm("Are you sure you want to delete this grade item?\n\n"+val)
	if(confirmation){
	$.post('../scripts/queries/remGrpPerf',{description:val},function(data){
       if(data.length>0){
          if(data!="True"){
		alert("Error!!!")
	}else{
		alert(val+" Successfuly Removed.");
		$(obj).parent().parent().remove();
	}
       }
    });
	}
}



function getPerf(perf_id){
	
	 $.post('../scripts/queries/getPerformance',{grp_perf_id: perf_id},function(data){
       if(data.length>0){
          perf = data.split("@")
         for(i=0; i<perf.length-1; i++){
		details = perf[i].split("$")
		var tbody = document.getElementById
		("studList").getElementsByTagName('TBODY')[0];
		var row = document.createElement('TR')
	
		var td1 = document.createElement('TD')
		td1.innerHTML = details[2];
		
		var td2 = document.createElement('TD')
		td2.innerHTML = details[1];
	
		var td3 = document.createElement('TD')
		td3.innerHTML = details[3];

		var td4 = document.createElement('TD')
		td4.innerHTML = details[4];

		var td5 = document.createElement('TD')
		td5.innerHTML = '<center> <img src="pictures/edit_icon.png" onclick="openUpdatePerfDialog(\''+details[1]+'\',\''+details[3]+'\', this)"> </center>';
		
			row.appendChild(td1);
			row.appendChild(td2);
			row.appendChild(td3);
			row.appendChild(td4);
			row.appendChild(td5);
			tbody.appendChild(row);
			
	}
       }
    });
	
}
function updScale(){
	 $.post('../scripts/queries/updateScale',function(data){
      		//edit scale here!
    });
}

function getAttend(){
	 $.post('../scripts/queries/getAttend',function(data){
       if(data.length>0){
          attend = data.split("@")
         for(i=0; i<attend.length-1; i++){
		details = attend[i].split("$")
		var tbody = document.getElementById
		("attendance").getElementsByTagName('TBODY')[0];
		var row = document.createElement('TR')
	
		var td1 = document.createElement('TD')
		td1.innerHTML = details[2];
		
		var td2 = document.createElement('TD')
		td2.innerHTML = details[1];
	
		var td3 = document.createElement('TD')
		td3.innerHTML = details[3];

			row.appendChild(td1);
			row.appendChild(td2);
			row.appendChild(td3);
			tbody.appendChild(row);
		
	}
       }
    });
}

function openUpdateGradeItemDialog(grdcat, grade_, maxscore, period, date,  obj){
	$( "#dialog-form5" ).dialog( "open" );
	document.getElementById("grdcat2").value = grdcat	
	document.getElementById("origgrade").value = grade_
	document.getElementById("grade1").value = grade_
	document.getElementById("maxscore1").value = maxscore
	document.getElementById("period1").value = period
	document.getElementById("date1").value = date

}

function updateGradeItem(grdcat_, grade_, grade1, maxscore_, period_, date_){
	$.post('../scripts/queries/updateGradeItem',{grdcat:grdcat_, grade1_:grade_, grade2_:grade1, maxscore:maxscore_, period:period_, date:date_,},function(data){
       if(data.length>0){
          if(data=="False"){
		alert("Error!!!")
	}else{

		
		var $tdThatContainsValue2 = $("#users tr td").filter(function(){
		    return $(this).html();
		});
		$tdThatContainsValue2.parent().children("td").eq(0).html(grdcat_);		
		$tdThatContainsValue2.parent().children("td").eq(1).html(grade1);
		$tdThatContainsValue2.parent().children("td").eq(2).html(maxscore_);
		$tdThatContainsValue2.parent().children("td").eq(4).html(period_);
		$tdThatContainsValue2.parent().children("td").eq(3).html(date_);
		$tdThatContainsValue2.parent().children("td").eq(5).html('<img class="delete" src="pictures/delete_icon.png" onclick="remCategory(this)"> <img src="pictures/edit_icon.png" onclick="openUpdateGradeItemDialog(\''+grdcat_+'\',\''+grade1+'\',\''+maxscore_+'\',\''+period_+'\',\''+date_+'\', this)"> <img src="pictures/view.png" onclick="openAddGradesDialog(\''+details[0]+'\')">');
		
			}
       }
    });
	document.getElementById("grdcat2").value = ""
	document.getElementById("origgrade").value = ""
	document.getElementById("grade1").value = ""
	document.getElementById("maxscore1").value = ""
	document.getElementById("period1").value = ""
	document.getElementById("date1").value = ""
	//alert("Successfully Updated!")
}

function openUpdatePerfDialog(perfID, score_, mult, grpPerfID, regID,  obj){
	$( "#dialog-form6" ).dialog( "open" );
	document.getElementById("perfID1").value = perfID	
	document.getElementById("origscore").value = score_
	document.getElementById("score1").value = score_
	document.getElementById("mult1").value = mult
	document.getElementById("grpPerfID1").value = grpPerfID
	document.getElementById("regID1").value = regID
}

function updatePerformance(PerfID_, score_, score1, mult_, regID_, grpPerfID_){
	$.post('../scripts/queries/updatePerformance',{PerfID:PerfID_, score1_:score_, score2_:score1, mult:mult_, regID:regID_, grpPerfID:grpPerfID_,},function(data){
       if(data.length>0){
          if(data=="False"){
		alert("Error!!!")
	}else{

		
		var $tdThatContainsValue2 = $("#users tr td").filter(function(){
		    return $(this).html();
		});		

		$tdThatContainsValue2.parent().children("td").eq(0).html(perfID_);			
		$tdThatContainsValue2.parent().children("td").eq(1).html(mult_);
		$tdThatContainsValue2.parent().children("td").eq(2).html(score1_);
		$tdThatContainsValue2.parent().children("td").eq(3).html(grpPerfID_);
		$tdThatContainsValue2.parent().children("td").eq(4).html(regID_);
		$tdThatContainsValue2.parent().children("td").eq(5).html('<img src="pictures/edit_icon.png" onclick="openUpdatePerfDialog(\''+details[3]+'\',\''+details[4]+'\', this)">');
		
			}
       }
    });

	document.getElementById("perfID1").value = ""
	document.getElementById("origscore").value = ""
	document.getElementById("score1").value = ""
	document.getElementById("mult1").value = ""
	document.getElementById("grpPerfID1").value = ""
	document.getElementById("regID1").value = ""	
	//alert("Successfully Updated!")
}


function getScore(){
	
	 $.post('../scripts/queries/getScore',function(data){
       if(data.length>0){
          score = data.split("@")
         for(i=0; i<score.length-1; i++){
		details = score[i].split("$")
		var tbody = document.getElementById
		("score").getElementsByTagName('TBODY')[0];
		var row = document.createElement('TR')
		
		var td1 = document.createElement('TD')
		td1.innerHTML = details[1];
		
		var td2 = document.createElement('TD')
		td2.innerHTML = '<input type="text">';
	
			row.appendChild(td1);
			row.appendChild(td2);
			tbody.appendChild(row);
			
	}
       }
    });
	
}
//add score!

