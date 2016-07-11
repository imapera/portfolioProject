
var designSectionElementsEdition = [];
designSectionElements[0]="";
designSectionElements[1]="";
designSectionElements[2]="";
designSectionElements[3]="";
designSectionElements[4]="";
designSectionElements[5]="";
designSectionElements[6]="";
designSectionElements[7]="";
designSectionElements[8]="";

var designSectionElementsModelling = [];
designSectionElementsModelling[0]="";
designSectionElementsModelling[1]="";
designSectionElementsModelling[2]="";
designSectionElementsModelling[3]="";
designSectionElementsModelling[4]="";
designSectionElementsModelling[5]="";
designSectionElementsModelling[6]="";

var designSectionElementsAnimation = [];
designSectionElementsAnimation[0]="";
designSectionElementsAnimation[1]="";

function showMedia(media){
		
	var div = document.createElement("div");
	div.id="mediaBlack";
	div.style.zIndex=2;
	div.style.position="fixed";
	div.style.top="0px";
	div.style.left="0px";
	div.style.width="100%";
	div.style.height="100%";
	div.style.backgroundColor="rgba(0, 0, 0, 0.8)";
	div.style.textAlign="center";
	div.innerHTML="<center><table style='text-align:center;height:100%;'><tr><td>\
				   		<img  src='"+media+"'>\
					</td></tr></table></center>";
	document.body.appendChild(div);	
	
	div.addEventListener("click",function(){document.getElementById("mediaBlack").remove()});
		
}	




function showFrame(src){
		
	var div = document.createElement("div");
	div.id="mediaBlack";
	div.style.zIndex=2;
	div.style.position="fixed";
	div.style.top="0px";
	div.style.left="0px";
	div.style.width="100%";
	div.style.height="100%";
	div.style.backgroundColor="rgba(0, 0, 0, 0.8)";
	div.style.textAlign="center";
	div.innerHTML="<center><table style='text-align:center;height:100%;width:100%'><tr><td>\
				   		<iframe style='width:90%;height:90%;' src='"+src+"'></iframe>\
					</td></tr></table></center>";
	document.body.appendChild(div);	
	
	div.addEventListener("click",function(){document.getElementById("mediaBlack").remove()});
	
}

function loadSong(song){
	
	var songSrc = "";
	
	switch (song){
		case 1:
			songSrc = "Fase 1.mp3";
			break;
		case 2:
			songSrc = "Fase 2.mp3";
			break;	
	}
	
	document.getElementById("songContainer").src = "others/" + songSrc;
	document.getElementById("songContainer").autoplay = "true";
	
	setObjetive(3,1);
	
}

function songPause(){
	document.getElementById("songContainer").pause();
}

var circles = [];
var circlesRoted = [];
var circlesTimer;

function animatingCircles(){
	circles[0].style.WebkitTransform = "rotate("+circlesRoted[0]+"deg)";
	circles[0].style.transform = "rotate("+circlesRoted[0]+"deg)";
	circles[0].style.msTransform = "rotate("+circlesRoted[0]+"deg)";
	circlesRoted[0] += 3;
	circles[1].style.WebkitTransform = "rotate("+circlesRoted[1]+"deg)";
	circles[1].style.transform = "rotate("+circlesRoted[1]+"deg)";
	circles[1].style.msTransform = "rotate("+circlesRoted[1]+"deg)";
	circlesRoted[1] -= 2;
	circles[2].style.WebkitTransform = "rotate("+circlesRoted[2]+"deg)";
	circles[2].style.transform = "rotate("+circlesRoted[2]+"deg)";
	circles[2].style.msTransform = "rotate("+circlesRoted[2]+"deg)";
	circlesRoted[2] += 1;
	circles[3].style.WebkitTransform = "rotate("+circlesRoted[3]+"deg)";
	circles[3].style.transform = "rotate("+circlesRoted[3]+"deg)";
	circles[3].style.msTransform = "rotate("+circlesRoted[3]+"deg)";
	circlesRoted[3] -= 1;
}

function stopLoadingAnimation(){
	clearInterval(circlesTimer);
	document.getElementById("loadingCirclesImages").remove();
	document.getElementById("chargingBlack").remove();
	localStorage.setItem("cookiesAccepted",1);
}

function showCharging(){
	var div = document.createElement("div");
	div.id="chargingBlack";
	div.style.zIndex=6;
	div.style.position="fixed";
	div.style.top="0px";
	div.style.left="0px";
	div.style.width="100%";
	div.style.height="100%";
	div.style.backgroundColor="rgba(0, 0, 0, 0.85)";
	div.style.textAlign="center";	
	document.body.appendChild(div);	
	
	div = document.createElement("div");
	div.id = "loadingCirclesImages";
	div.style.zIndex=7;
	div.style.position="fixed";
	div.style.width="100%";
	div.style.height="100%";
	div.style.textAlign="center";
	div.style.color="#ffffff";
	div.innerHTML= "";
	
	if (localStorage.cookiesAccepted != 1){
	
		div.innerHTML=" <img class='flagIconCookies' src='spanishflag2.jpg' onclick='changeLanguage(\"spanish\")'>\
						<img class='flagIconCookies' src='englishflag2.jpg' onclick='changeLanguage(\"english\")'><br><br>\
						<div class='content' id='cookiesAdvise'></div><br><br>\
					    <div onclick='stopLoadingAnimation()' class='content' id='cookiesAccept' style='display:inline-block;width:10%;padding=5%;background-color:#ffffff;color:#000000'></div>\
						";
	}
	
	div.innerHTML+="<table style='width:100%;height:100%;'>\
					<tr><td style='text-align:center;'>\
					<img class='loadingCircle' id='loadingCircle1' src='loadingCircle1.png'>\
				   	<img class='loadingCircle' id='loadingCircle2' src='loadingCircle2.png'>\
				   	<img class='loadingCircle' id='loadingCircle3' src='loadingCircle3.png'>\
				   	<img class='loadingCircle' id='loadingCircle4' src='loadingCircle4.png'>\
					</td></tr>\
					</table></center>";
	document.body.appendChild(div);	
	
	circles[0] = document.getElementById("loadingCircle1");
	circles[1] = document.getElementById("loadingCircle2");
	circles[2] = document.getElementById("loadingCircle3");
	circles[3] = document.getElementById("loadingCircle4");
	circlesRoted[0] = 0;
	circlesRoted[1] = 0;
	circlesRoted[2] = 0;
	circlesRoted[3] = 0;
	
	circlesTimer = setInterval(animatingCircles,16);
	
}














