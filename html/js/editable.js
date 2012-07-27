

function editScale(div, id, scale){
	$("#"+div).editInPlace({
		callback: function(original_element, text, original){
			if(!isNaN(text) && (text>0 && text < 101)){
				if(scale == "high"){
					updateMaxScale(original, text)				
				}else if(scale == "low"){
					updateMinScale(original, text)
				}
				return(text);
			}
		}
	})
}

function updateMaxScale(original, updated){
	 $.post('../scripts/queries/updateScale',{maxscale1_:original, maxscale2_: updated},function(data){
      		return true;
    });
}

function updateMinScale(original, updated){
	 $.post('../scripts/queries/updateScale',{minscale1_:original, minscale2_: updated},function(data){
      		return true;
    });
}
