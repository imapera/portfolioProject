

		var credits = [];

		var showText = 1;

		var canvas;
		var ctx;
		var parent;
		var animationTimer;
	
		var timeToLife = 10;
		var timeToExplode = 25;
	
		var numberOfFireworks = 30;
		var numberOfParticles = 40;
	
		var fireworks = [];
	
		function random(min,max){
			return (Math.random() * (max - min) + min);
		}	
		
		function randomRounded(min,max){
			return Math.round(random(min,max));
		}
		
	
		function particle (originX,originY,radius){
			this.radius = radius;
			this.originX = originX;
			this.originY = originY;	
			this.currentX = originX;
			this.currentY = originY;			
			
			var r;			
			r = random(0,2);
			if (r > 1) this.destinationX = this.originX - random(0,this.radius);
			else this.destinationX = this.originX + random(0,this.radius);			
			r = random(0,2);
			if (r > 1) this.destinationY = this.originY + random(0,this.radius);
			else this.destinationY = this.originY - random(0,this.radius);
			
			this.speedX = (this.destinationX - this.originX)/timeToExplode;
			this.speedY = (this.destinationY - this.originY)/timeToExplode;
			
			this.brigth = Math.round(random(0,40));
			
			this.paint = function(){
				ctx.moveTo(this.currentX-this.speedX*2,this.currentY-this.speedY*2);
				ctx.lineTo(this.currentX,this.currentY);
				ctx.stroke();		
				this.currentX -= this.speedX;
				this.currentY -= this.speedY;
			}			
		}
	
		function firework(){
			this.originX = random(canvas.width*0.1,canvas.width*0.9);
			this.originY = canvas.height;
			this.destinationX = random(this.originX - (this.originX * 0.15),this.originX + (this.originX * 0.15));
			this.destinationY = random(canvas.height * 0.2, canvas.height * 0.45);
			this.currentX = this.originX;
			this.currentY = this.originY;
			this.timeToLife = timeToLife * random(0.5,2);
			this.timeToExplode = timeToExplode * random(0.5,2);;
			this.speedX = (this.originX - this.destinationX) / this.timeToLife;
			this.speedY = (this.originY - this.destinationY) / this.timeToLife;
						
						
			this.color = Math.round(random(0,360));
			
			this.radius = random(canvas.width * 0.2, canvas.width * 0.3);
			this.particles = [];
			this.nPartices = Math.round(random(20,40));
			
			for (j=0;j<numberOfParticles;j++){				
				var element = new particle(this.destinationX,this.destinationY,this.radius);
				this.particles.push(element);
			}
						
			this.paint = function(){
				ctx.beginPath();
				ctx.strokeStyle = "hsla("+this.color+", 100%, 60%, 1)";
				ctx.moveTo(this.currentX - this.speedX, this.currentY - this.speedY);
				ctx.lineTo(this.currentX,this.currentY);
				ctx.stroke();					
				this.currentX -= this.speedX;
				this.currentY -= this.speedY;	
				this.timeToLife--;							
			}						
			
			this.paintParticles = function(){
				ctx.lineWidth = "2";
				for (k=0;k<this.particles.length;k++){	
					ctx.beginPath();	
					ctx.strokeStyle = "hsla("+this.color+", 100%, "+(this.particles[k].brigth + 50)+"%, 1)";
					this.particles[k].paint();	
				}
				this.timeToExplode--;
			}							
		}
		
	var fps = 30;
	var now;
	var then = Date.now();
	var interval = 1000/fps;
	var delta;
	

	var text = "";
	var textOpacity = 0;
	var textopacitySpeed = 0.1;
	var textReadTime = 10;
	var textReadTimeFixed = 75;
	var textState = "ended";
	var textIndex = -1;	
	var textContents = [];
	var creditsSections;

	var play = 0;
	var started = 0;
	
	var playColor = 0;
	var playColorInc = 1;
	
	function pauseAnimation(){
		play=0;
   		document.getElementById("creditsAudio").pause();   
	}
		
	function playAnimation(){
		play=1;
   		document.getElementById("creditsAudio").play();  
   		songPause();		
	}

	function controlAnimation(){
		if (play==1) pauseAnimation();
		else playAnimation();
	}

	function animation(){		
		
 	 	requestAnimationFrame(animation);
  	
	    now = Date.now();
    	delta = now - then;
     
	    if (delta > interval && play) {
    
    		started = 1;
    
    	    then = now - (delta % interval);
        
			canvas.width = parent.offsetWidth;
			canvas.height = parent.offsetHeight;
	
			ctx.fillStyle = "#000000";
			ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
			ctx.stroke();
					
			for (i=0;i<fireworks.length;i++){
			
				if (fireworks[i]){			
					if (fireworks[i].timeToLife > 0){
						fireworks[i].paint();		
					} else {
						if (fireworks[i].timeToExplode > 0){
							fireworks[i].paintParticles();
						} else {
							delete fireworks[i];
						}
					}
				} else {			
					if (randomRounded(0,100) > 98){
						fireworks[i] = new firework();						
					}								
				}
													
			}	
						
			switch (textState){
				case "showing":
					if (textOpacity < 1){
						textOpacity += textopacitySpeed;
					} else {
						textState = "static";
					}
					break;
				case "static":
						textReadTime--;
						if (textReadTime < 0) textState = "hidding";
					break;						
				case "hidding":
					if (textOpacity > 0){
						textOpacity -= textopacitySpeed;
					} else {
						textState = "ended";
					}					
					break;	
				case "ended":
					textReadTime = textReadTimeFixed; 
					textIndex = (textIndex+1) % creditsSections;
					text = credits[textIndex];
					textState = "showing";
					break;		
			}
												
			var nElements = credits[language+text].length;
			
			for (i=0; i < nElements; i++){
				ctx.font = "20px Century Gothic";
				ctx.fillStyle = "rgba(255,255,255,"+textOpacity+")";
				ctx.textAlign = "center";
				ctx.fillText(credits[language+text][i], (canvas.width/2), (canvas.height - 100) * ((i+1)/(nElements+1)) + 100); 
			}		
			
			ctx.fillStyle = "rgba(255,255,255,"+textOpacity+")";
			ctx.textAlign = "center";
			
			if (textIndex==0){
				ctx.font = "150px Century Gothic";		
				ctx.fillText(text, canvas.width/2, canvas.height/2); 		
			}else{		
				ctx.font = "50px Century Gothic";			
				ctx.fillText(text, canvas.width/2, canvas.height * 0.2); 	
			}
		} else if (delta > interval && play == 0) {
			
			if (started == 0){
			
				ctx.fillStyle = "#000000";
				ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
				ctx.stroke();
				
			
			} else {
			
			
			
			}
			
			
			playColor += 2 * playColorInc;
			if (playColor >= 255) playColorInc = -1;
			else if (playColor <= 0) playColorInc = 1;
				
			ctx.strokeStyle = "hsla("+playColor+",100%,50%,1)";
			ctx.beginPath(); //nueva ruta
			ctx.lineWidth = "10";
			ctx.arc(canvas.width/2,canvas.height/2,canvas.height*0.2,0,2*Math.PI); //otro arco
						
			ctx.moveTo(canvas.width*0.41,canvas.height*0.4);
			ctx.lineTo(canvas.width*0.6,canvas.height*0.5);
			ctx.lineTo(canvas.width*0.41,canvas.height*0.6);
			ctx.lineTo(canvas.width*0.41,canvas.height*0.4);
			ctx.lineTo(canvas.width*0.6,canvas.height*0.5);
			ctx.stroke();		
			
		}	
	}
		
	function initCanvas(){		
	
		canvas = document.getElementById("fireworksCanvas");
		ctx = canvas.getContext("2d");			
		
		canvas.addEventListener("click",controlAnimation);	
		
   		//document.getElementById("creditsAudio").play();    
   							
		parent = canvas.parentNode;
		canvas.width = parent.offsetWidth;
		canvas.height = parent.offsetHeight;
						
		for (i=0;i<numberOfFireworks;i++){
			var element = new firework();
			fireworks.push(element);	
			delete fireworks[i];		
		}
			
		animation();			
			
	}
	
	creditsSections = 14;
	
	credits[0] = "Credits";
	credits[1] = "Tools";
	credits[2] = "References";
	credits[3] = "Thanks";
	credits[4] = "Versions - 0.1";
	credits[5] = "Versions - 0.2";
	credits[6] = "Versions - 0.3";
	credits[7] = "Versions - 0.4";
	credits[8] = "Versions - 0.5";
	credits[9] = "Versions - 0.6";
	credits[10] = "Versions - 0.7";
	credits[11] = "Versions - 0.8";
	credits[12] = "Versions - 0.9";
	
	credits["englishCredits"] = [];
	credits["englishTools"] = ["HTML, CSS & Javascript","Php","MySql","TextWrangler","Tested in Safari, Chrome and Firefox"];
	credits["englishReferences"] = ["W3Schools",
									"Stack Overflow",
									"Credits music by longzijun"];
	credits["englishThanks"] = ["My dad and mom","My friends","My family","You are the best!","Thank you very much for your visit too!"];
	credits["englishVersions - 0.1"] = ["- Nav bars styles",
										"- Background color change",
										"- Language control and css class 'content' control",
										"- Section Life&Curriculum and styles"];
	credits["englishVersions - 0.2"] = ["- Design section and styles (important designElement)",
										"- Social media control",
										"- Facebook frame",
										"- Media control for showing and hidding media"];
	credits["englishVersions - 0.3"] = ["- Miscellany section (photos and timelapse) and styles",
										"- Ajustments in header and footer nav bars",
										"- LocalStorage for saving bg color and language"];	
	credits["englishVersions - 0.4"] = ["- Media control for songs",
										"- Completed Miscellany section with music section",
										"- Programming section - videogame and polifoto"];
	credits["englishVersions - 0.5"] = ["- Loading animation",
										"- Curriculum update",
										"- Programming section: interactive elements control",
										"- Programming section: BusPCI and emails database",
										"- Unblock game",
										"- Email form contact"];
	credits["englishVersions - 0.6"] = ["- Email form contact complete across servers",
										"- Readjust classes for Firefox compatibility",
										"- Game messages translation"];
	credits["englishVersions - 0.7"] = ["- Visits control",
										"- Fireworks animation for credits",
										"- Credits music"];
	credits["englishVersions - 0.8"] = ["- Credits text control",
										"- Write and organize credits tex"];
	credits["englishVersions - 0.9"] = ["- Bugfixes on credits",
										"- Cookies advise control",
										"- Cookies advise language control",
										"- Play/pause control on credits"];	
	
	credits["spanishCredits"] = [];
	credits["spanishTools"] = ["HTML, CSS & Javascript","Php","MySql","TextWrangler","Tested in Safari, Chrome and Firefox"];
	credits["spanishReferences"] = ["W3Schools",
									"Stack Overflow",
									"Credits music by longzijun"];
	credits["spanishThanks"] = ["A mi madre y a mi padre","A mis amigos","A mi familia","¡Son los mejores!","¡Muchas gracias también a ti por tu visita!"];
	credits["spanishVersions - 0.1"] = ["- Estilos para barras de navegación",
										"- Cambio de color de fondo",
										"- Control de idioma y cargador de la clase 'content'",
										"- Sección de Vida&Curriculum y sus estilos"];
	credits["spanishVersions - 0.2"] = ["- Sección de diseño (designElement importante)",
										"- Control de enlace a redes sociales",
										"- Pantalla de Facebook",
										"- Control de multimedia para mostrarlos/ocultarlos"];
	credits["spanishVersions - 0.3"] = ["- Sección miscelánea (fotos y timelapse) y sus estilos",
										"- Ajustes de las barras de cabecera y pie",
										"- LocalStorage para guardar idioma y color de fondo"];	
	credits["spanishVersions - 0.4"] = ["- Control de multimedia para canciones",
										"- Completada la sección miscelánea con canciones",
										"- Sección de programación - videojuego y polifoto"];
	credits["spanishVersions - 0.5"] = ["- Animación de cargando",
										"- Actualización de curriculum",
										"- Sección de programación: elementos interactivos",
										"- Sección de programación: BusPCI y base de emails",
										"- Juego de desbloqueo",
										"- Formulario de contacto email"];
	credits["spanishVersions - 0.6"] = ["- Completo formulario de contacto entre servidores",
										"- Reajuste de clases para compatibilidad con Firefox",
										"- Traducción del juego de desbloqueo"];
	credits["spanishVersions - 0.7"] = ["- Control de visitias",
										"- Animación de voladores para los créditos",
										"- Música de los créditos"];
	credits["spanishVersions - 0.8"] = ["- Control de los textos de los créditos",
										"- Escribir y organizar los textos de crétidos"];	
	credits["spanishVersions - 0.9"] = ["- Corrección de errores de créditos",
										"- Control del aviso de cookies",
										"- Control del idioma del aviso de cookies",
										"- Control de reproducir/pausar crédidos"];	
	
	
/*	
	</script>

</head>
<body onload='initCanvas()' style='color:#000000'>

	<div style='width:80%;height:100%;z-index:1;color:#ffffff;'>
		<canvas id='fireworksCanvas'></canvas>
	</div>
	<div id='aux'>
		AUX
	</div>
</body>*/