	var unblockedSections = "00000";
	var unblockGame = 1; 	
	var colorChanges = 0;
	var endWatched = 0;
	
	function deleteProgress(){
   		localStorage.setItem("unblockedSections", "00000"); 
   		unblockGame = 1; 
		updateUnblockGame();
	}

	function unblockAll(){
		unblockGame = 0;
		setObjetive(0,0);
		setObjetive(1,0);
		setObjetive(2,0);
		setObjetive(3,0);
		setObjetive(4,0);
		updateUnblockGame();
	}

	function hideUnblockGame(){
		document.getElementById("gameContainerBlack").style.display='none';		
		document.getElementById("gameCompletedContainer").style.display='none';	
		document.getElementById("gameContent").style.display='none';	
		if (allUnblocked()){
			pauseAnimation();   
		}
	}

	function showUnblockGame(){
		if (allUnblocked()){
			document.getElementById("gameContainerBlack").style.display='block';
			document.getElementById("gameCompletedContainer").style.display='inline-block';	
			if (endWatched == 0){
				initCanvas(); 
			}
   			endWatched = 1;
		} else {
			updateUnblockGame();
			document.getElementById("gameContainerBlack").style.display='block';
			document.getElementById("gameContent").style.display='inline-block';
		}	
	}
	
	function allUnblocked(){   		
		for (i=0;i<unblockedSections.length;i++){
			if (unblockedSections.charAt(i)=='0'){
				return false;	
			}
		} 
		return true; 		
	}
	
    	
   	function updateUnblockGame(){
   	
   		if (!localStorage.unblockedSections) {
   			localStorage.setItem("unblockedSections", "00000");     			
   		} else {
    		unblockedSections = localStorage.unblockedSections;
   		}     		
   		
   		var str = "";
   		
		for (i=0;i<unblockedSections.length;i++){
			if (unblockedSections.charAt(i)=='0'){
				document.getElementById("conditionImage"+i).innerHTML = "<span style='color:#000000;font-size:50px'>&#9733</span>";		
				str += "<span style='color:#000000'>&#9733</span>";		
			}else{
				document.getElementById("conditionImage"+i).innerHTML = "<span style='color:#ffff00;font-size:50px'>&#9733</span>";	
				str += "<span style='color:#ffff00'>&#9733</span>";		
			}
		}    		
						
		document.getElementById("gameSummary").innerHTML = str;	
		
		if (allUnblocked()) showUnblockGame();
		
   	}
   	
   	function setObjetive(number,value){
   		var str = localStorage.unblockedSections;
   		var newStr = "";
   		for (i=0;i<str.length;i++){
   			if (i==number){
   				newStr += value;
   			}else{
   				newStr += str.charAt(i);   			
   			}   			   		
   		}
   		localStorage.setItem("unblockedSections", newStr); 
   		if (!endWatched) updateUnblockGame();
   	}
   	
   	function checkObjetive(number){
   		return localStorage.unblockedSections.charAt(number);
   	}
   	
   	function initCredits(){  	
   		/*document.getElementById("creditsAudio").play(); 
   		initCanvas(); 	 	*/  
   	}
   	