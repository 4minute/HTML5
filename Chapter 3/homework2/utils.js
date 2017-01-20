var utils={}
utils.captureMouse = function (element){
	var mouse = {x:0,y:0};
	
	element.addEventListener('mousemove',function(event){
		var x,y;
		console.log("x = "+x+",y = "+y);
		console.log("event.pageX = "+event.pageX+",event.pageY = "+event.pageY);
		if (event.pageX || event.pageY)
		{
			x = event.pageX;
			y = event.pageY;
		}else{
			x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}
		x -= element.offsetLeft;
		y -= element.offsetTop;

		mouse.x = x;
		mouse.y = y;
	},false);

		return mouse;
};