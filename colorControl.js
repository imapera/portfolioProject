    	
   	var colorControlLeft = 0;
   	var colorControl;
   	var timer;
   	var colorButton;
   	var opacity;
   	
   	function moveColorControl(){
   		if (colorControlLeft < 20){
   			colorControlLeft += 10;
   			colorControl.style.left = colorControlLeft + "px";
   			opacity -= 0.1;
   			colorButton.style.opacity = opacity;
   		} else {
   			clearInterval(timer);
   		}
   	}  	
   	
   	
   	function showColors(){
   		colorControlLeft = -100;
   		opacity = 1;
   		colorControl = document.getElementById("colorControl");
   		colorButton = document.getElementById("colorButton");
   		   		
   		timer = setInterval(moveColorControl,16);
   	}	
   	
   	
   	function moveColorControlOutside(){
   		if (colorControlLeft > -100){
   			colorControlLeft -= 10;
   			colorControl.style.left = colorControlLeft + "px";
   			opacity += 0.1;
   			colorButton.style.opacity = opacity;
   		} else {
   			clearInterval(timer);
   		}
   	} 
   	
   	
    function hideColors(){
   		colorControlLeft = 20;
   		opacity = 0;
   		colorControl = document.getElementById("colorControl");
   		colorButton = document.getElementById("colorButton");
   		   		
   		timer = setInterval(moveColorControlOutside,16);
   	}
   	
   	function changeBGColor(color,hide){
   		document.body.style.backgroundColor = color;
   		localStorage.setItem("backgroundColor",color);
   		if (hide) hideColors();
   		
   		colorChanges++;
   		if (colorChanges >= 3) setObjetive(2,1);
   		
   	}   