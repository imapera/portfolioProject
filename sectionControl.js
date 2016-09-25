    	
function changeSection(newSection){ 

	songPause();

	if (unblockGame == 1){ 
		
		changeOk = 0;

		if (newSection=="designSection" && checkObjetive(0) == 1){
			changeOk = 1;
		} else if (newSection=="programmingSection" && checkObjetive(1) == 1){
			changeOk = 1;
		} else if (newSection=="miscellanySection" && checkObjetive(2) == 1){
			changeOk = 1;
		} else {
			changeOk = 1;
		}
	
		changeOk=1;
							
	} else {	

		changeOk = 1;
	
	}    	
	
	changeOk = 1;
	
	if (changeOk == 1){
		//document.getElementById(section).style.display="none";
		//document.getElementById(newSection).style.display="block";
		//section=newSection;    				
		switch (newSection){
			case "homeSection":
				loadHomeSection();
				break;
			case "lifeCurriculumSection":
				loadLiveCurriculumSection();
				break;
			case "designSection":
				loadDesignSection();
				break;
			case "programmingSection":
				loadProgrammingSection();
				break;
			case "miscellanySection":
				loadMiscellanySection();
				break;				
		}
		
		changeLanguage(localStorage.language);
		
	} else {    					
		showUnblockGame();
	}



	if (newSection=="lifeCurriculumSection") setObjetive(0,1);
		
}

function loadHomeSection(){

	var content = "";
	var container = document.getElementById("contentSection");
	container.innerHTML = "";

	content += "<div class='welcome content' id='welcomeMessage'></div><img style='width:70%;' src='welcome.png'><br><br><div class='mainMessage content' id='mainMessage'></div></div>";

	container.innerHTML = content;

}

var designSectionElementsEditing = [];
designSectionElementsEditing[0]="designImages/cartelPaula.jpg";
designSectionElementsEditing[1]="designImages/iconSet.png";
designSectionElementsEditing[2]="designImages/teresa.png";
designSectionElementsEditing[3]="designImages/scientiaCriminumBanner.jpg";
designSectionElementsEditing[4]="designImages/limonYMielLogo.png";
designSectionElementsEditing[5]="designImages/limonYMielLetras.png";
designSectionElementsEditing[6]="designImages/esquinaFumador.jpg";
designSectionElementsEditing[7]="designImages/vidWRC.png";
designSectionElementsEditing[8]="designImages/polifoto.png";

var designSectionElementsModelling = [];
designSectionElementsModelling[0]="designImages/room.png";
designSectionElementsModelling[1]="designImages/apartament.png";
designSectionElementsModelling[2]="designImages/apartamentSmash.png";
designSectionElementsModelling[3]="designImages/imac.png";
designSectionElementsModelling[4]="designImages/seatIbiza.png";
designSectionElementsModelling[5]="designImages/seatIbizaMk3.png";
designSectionElementsModelling[6]="designImages/estela.png";

var designSectionElementsAnimation = [];
designSectionElementsAnimation[0]="designImages/marioPeachAnimation.gif";
designSectionElementsAnimation[1]="designImages/estelaAnimation.gif";

function loadDesignSection(){

	var content = "";
	var container = document.getElementById("contentSection");
	container.innerHTML = "";
	
	content += "<h1 class='content' id='designTab'></h1><div class='designMessage content' id='designWelcome'></div><hr><h3 class='content' id='graphicTitle'></h3>";
	for (i=0;i<designSectionElementsEditing.length;i++){
		content+="<div class='designElement'>\
			 			<table><tr><td>\
			 				<img src='"+designSectionElementsEditing[i]+"' onclick='showMedia('"+designSectionElementsEditing[0]+"')'>\
			 			</td></tr></table>\
					</div>";	
	}	
	
	content += "<hr><h3 class='content' id='3dTitle'></h3>";
	for (i=0;i<designSectionElementsModelling.length;i++){
		content+="<div class='designElement'>\
			 			<table><tr><td>\
			 				<img src='"+designSectionElementsModelling[i]+"' onclick='showMedia('"+designSectionElementsModelling[0]+"')'>\
			 			</td></tr></table>\
					</div>";	
	}
		
	content += "<hr><h3 class='content' id='3dAnimationTitle'></h3>";
	for (i=0;i<designSectionElementsAnimation.length;i++){
		content+="<div class='designElement'>\
			 			<table><tr><td>\
			 				<img src='"+designSectionElementsAnimation[i]+"' onclick='showMedia('"+designSectionElementsAnimation[0]+"')'>\
			 			</td></tr></table>\
					</div>";	
	}
		
	container.innerHTML = content;

}

var programmingSectionElements = [];
programmingSectionElements[0]="<div class='content' id='drivingGame'></div><br><iframe style='width:90%;height:70%;' src='https://www.youtube.com/embed/KI3QiumlWtE' frameborder='0' allowfullscreen></iframe>";
programmingSectionElements[1]="<div class='content' id='splatoonSC'></div><br><img src='programmingThings/splatoonSC.png'  onclick='showFrame('http://www.splatoonsc.com')'>";
programmingSectionElements[2]="<div class='content' id='polifotoWeb'></div><br><img src='programmingThings/polifotoWeb.png'  onclick='showMedia('programmingThings/polifotoWeb.png')'>";
programmingSectionElements[3]="<div class='content' id='busPCI'></div><br><img src='programmingThings/BusPCI.png'  onclick='showFrame('programmingThings/BusPCI/simulator.html')'>";
programmingSectionElements[4]="<div class='content' id='emailsDB'></div><br><img src='programmingThings/emailsdb.png'  onclick='showFrame('programmingThings/EmailsDB/index.html')'>";

function loadProgrammingSection(){

	var content = "";
	var container = document.getElementById("contentSection");
	container.innerHTML = "";


	content += "<div class='designMessage content' id='programmingWelcome'></div><hr>";
	for (i=0;i<programmingSectionElements.length;i++){
		content+="<div class='designElement programmingElement'><table><tr><td>"+programmingSectionElements[i]+"</td></tr></table></div>";	
	}


	container.innerHTML = content;

}

photographyElements = [];
photographyRoute="photographyImages/";
photographyElements[0]="amagroColors.jpg";
photographyElements[1]="amagroSunset.jpg";
photographyElements[2]="calima.jpg";
photographyElements[3]="fula.jpg";
photographyElements[4]="laPunta.jpg";
photographyElements[5]="lucy.jpg";
photographyElements[6]="maspalomas.jpg";
photographyElements[7]="rotonda.jpg";
photographyElements[8]="torreon.jpg";
photographyElements[9]="torun.jpg";
photographyElements[10]="vistula.jpg";
photographyElements[11]="warsaw.jpg";


function loadMiscellanySection(){	
	var content = "";
	var container = document.getElementById("contentSection");
	container.innerHTML = "";

	content += "<div class='content' id='miscellanyTitle'></div><hr><div class='content' id='photographyText'></div>";
	for (i=0;i<photographyElements.length;i++){
		content+="<div class='designElement photographyElement'><table><tr><td><img src='"+photographyRoute+photographyElements[i]+"'></td></tr></table></div>";	
	}
	
	content += "<hr><div class='content' id='timelapseTitle'></div><div class='content' id='timelapseText'></div><iframe width='560' height='315' src='https://www.youtube.com/embed/0AD05cTWnl8' frameborder='0' allowfullscreen></iframe><br><br><hr>";

	content += "<div class='content' id='musicTitle'></div><div class='content' id='musicText'></div><br><table class='songsTable' align=center><tr><td><img class='songImage' id='song1' src='song1.png' onclick='loadSong(1)'></td><td rowspan=3 style='padding:0% 10% 0% 10%;'><audio controls id='songContainer' onclick='loadSong(2)'></audio></td></tr><tr><td><img class='songImage' id='song2'  src='song2.png' onclick='loadSong(2)'></td></tr><tr><td><img class='songImage' id='song3'  src='song3.png' onclick='loadSong(3)'></td></tr></table><div class='content' id='musicExplanation'></div>";


	container.innerHTML = content;

}

curriculumExperience = [];
curriculumExperience[0] = "perfaler";
curriculumExperience[1] = "ulpgc";
curriculumExperience[2] = "eipc";
curriculumExperience[3] = "siani";
curriculumExperienceTabs = [];
curriculumExperienceTabs[0] = [{tab:"PHP",style:"PHP"}, {tab:"MySQL",style:"MySQL"}, {tab:"HTML",style:"HTML"}, {tab:"CSS",style:"CSS"}];
curriculumExperienceTabs[1] = [{tab:"C++",style:"Cpp"}, {tab:"OpenGL",style:"OpenGL"}];
curriculumExperienceTabs[2] = [{tab:"PHP",style:"PHP"}, {tab:"Wordpress",style:"Wordpress"}, {tab:"Adobe Photoshop",style:"Photoshop"}, {tab:"Adobe Acrobat Pro",style:"Acrobat"}, {tab:"HTML",style:"HTML"}, {tab:"MySQL",style:"MySQL"}, {tab:"Blender",style:"Blender"}];
curriculumExperienceTabs[3] = [{tab:"ODL",style:"ODL"}, {tab:"SQL",style:"SQL"}, {tab:"Javascript",style:"Javascript"}, {tab:"Mantis",style:"Mantis"}, {tab:"Jira",style:"Jira"}];

technicalKnowledge = [];
technicalKnowledge[0] = {name:"programming", tabs:[{tab:"C",style:"C"},{tab:"C++",style:"Cpp"},{tab:"Objetive C",style:"ObjetiveC"},{tab:"Java",style:"Java"}]};
technicalKnowledge[1] = {name:"webProgramming", tabs:[{tab:"HTML",style:"HTML"},{tab:"CSS",style:"CSS"},{tab:"MySQL",style:"MySQL"},{tab:"Javascript",style:"Javascript"},{tab:"CodeIgniter",style:"CodeIgniter"}]};
technicalKnowledge[2] = {name:"graphicProgramming", tabs:[{tab:"OpenGL",style:"OpenGL"},{tab:"Processing",style:"Processing"}]};
technicalKnowledge[3] = {name:"office", tabs:[{tab:"Suite Microsoft Office",style:"Microsoft"},{tab:"Suite iWork",style:"iWork"},{tab:"Adobe Acrobat Pro",style:"Acrobat"}]};
technicalKnowledge[4] = {name:"multimedia", tabs:[{tab:"Adobe photoshop",style:"Photoshop"}, {tab:"Blender",style:"Blender"}, {tab:"Cinema 4D",style:"Cinema4D"},{tab:"Suite iLife",style:"iLife"}]};
technicalKnowledge[5] = {name:"osAndDevelopment", tabs:[{tab:"Windows XP/7/10",style:"Windows"}, {tab:"Mac OS X",style:"MacOsX"},{tab:"Ubuntu",style:"Ubuntu"}, {tab:"Virtual Box",style:"VirtualBox"}, {tab:"Boot Camp",style:"BootCamp"}, {tab:"Parallels Desktops",style:"Parallels"}, {tab:"Xcode",style:"Xcode"}]};

function loadLiveCurriculumSection(){
	var content = "";
	var container = document.getElementById("contentSection");
	container.innerHTML = "";

	content += "<div class='leftBigBar alignLeft'><h2>Imanol Pérez Ramos</h2><h3 class='content' id='professionalExperience'></h3>";
	
	content += "<table class='width100'>";
	for (i=curriculumExperience.length-1;i>=0;i--){
		content += "<tr><td class='width20 content' id='" + curriculumExperience[i] + "Title'></td><td class='width10 content' id='" + curriculumExperience[i] + "Company'>b</td><td class='width40 content' id='" + curriculumExperience[i] + "Task'>c</td>";	
		content += "<td class='width15'>";		
		for (j=0;j<curriculumExperienceTabs[i].length;j++){
				content += "<div class='toolCell cell"+curriculumExperienceTabs[i][j]["style"]+"'>" + curriculumExperienceTabs[i][j]["tab"] + "</div> ";
		}	
		
		content += "</td><td class='width15 content' id='" + curriculumExperience[i] + "Date'>e</td></tr>";	

		if (i!=0) content += "<tr><td colspan=5><hr class='width90'></td></tr>";
	
	}
	content += "</table>";
	
	content += "<hr class='hrSpaced'><h3 class='content' id='officialStudies'></h3><div class='content' id='officialStudiesContent'></div>";
	
	content += "<hr class='hrSpaced'><h3 class='content' id='additionalStudies'></h3><div class='content' id='additionalStudiesContent'></div>";
	
	content += "<hr class='hrSpaced'><h3 class='content' id='technicalKnowledge'></h3><table class='width100'>";	
	
	for (i=0;i<technicalKnowledge.length;i++){	
		content += "<tr><td class='content width15' id='" + technicalKnowledge[i]["name"] + "'></td><td class='width40'>";				
		for (j=0;j<technicalKnowledge[i]["tabs"].length;j++){
			content += "<div class='toolCell cell" + technicalKnowledge[i]["tabs"][j]["style"] + "' >" + technicalKnowledge[i]["tabs"][j]["tab"] + "</div> ";
		}		
		content += "</td></tr>";
	}	
	content += "</table>";
	
	content += "<hr class='hrSpaced'><h3 class='content' id='languagesAndOthers'></h3><div class='content' id='languagesAndOthersContent'></div>";
	
	content += "</div>";

	content += "<div class='rightSmallBar'> <div class='rightBarElement' id='myDescription'> <img class='profileImage' src='imanol.png'> <br> <p class='justifiedText content' id='myDescription'> </p>\
				</div><div class='rightBarElement content' id='homeUniversity'></div><br>\
				<div class='rightBarElement content' id='warsawUniversity'></div><br>\
				<div class='rightBarElement content' id='3Dmodelling'></div><br>\
				<div class='rightBarElement content' id='photoshop'></div><br>\
				<div class='rightBarElement content' id='webProgrammingPack></div>\
			</div>";

	container.innerHTML = content;	
}









