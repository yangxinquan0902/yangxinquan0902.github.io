function drag(id){
	var obj = document.getElementById(id);
	var disX = 0;
	var disY = 0;
	obj.onmousedown = function(ev){
		disX = ev.clientX - obj.offsetLeft;
		disY = ev.clientY - obj.offsetTop;
		document.onmousemove = function(ev){
			obj.style.left = ev.clientX - disX + "px";
			obj.style.top = ev.clientY - disY + "px";
		}
		document.onmouseup = function(){
			document.onmousemove = document.onmouseup = null;
		}
		return false;
	}
}
