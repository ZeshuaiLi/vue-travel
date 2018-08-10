import "./zepto.min"
export default {
	showTip:function (txt) {
		if($("#topTip").length<=0){
			var tip_box = $("<p id='topTip'></p>");
			tip_box.appendTo("body");
			setTimeout(function(){
				$("#topTip").html(txt).addClass("show");
				setTimeout(function(){
					$("#topTip").html(txt).removeClass("show");
					setTimeout(function(){
						tip_box.remove();
					},500);
				},1500);
			},30);
		}
	}
}