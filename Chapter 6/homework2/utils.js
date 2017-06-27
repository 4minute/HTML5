utils = {};

utils.captureMouse=function(element){
	var mouse = {x:0,y:0};

	element.addEventListener('mousemove',function(event){
		var x,y;
		if(event.pageX||event.pageY){
			x = event.pageX;
			y = event.pageY;
		}else{
			x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			y = event.clientY + document.body.scrollTop + document.documentElemetn.scrollTop;
		}

		x -= element.offsetLeft;
		y -= element.offsetTop;

		mouse.x = x;
		mouse.y = y;
	},false);
	return mouse;
};

utils.parseColor = function(color,toNumber){
	if(toNumber === true){
		if(typeof color === 'number'){
			return (color|0);
		}
		if(typeof color === 'string' && color[0] === '#'){
			color = color.slice(1);
		}
		return window.parseInt(color,16);
	}else{
		if(typeof color === 'number'){
			color = '#' + ('00000'+(color|0).toString(16)).substr(-6);
		}
		return color;
	}
};