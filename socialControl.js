
	var contentSocial = [];
	
	contentSocial["facebook"] = "<a href='https://www.facebook.com/imapera' title='' style='font-family: &quot;lucida grande&quot;,tahoma,verdana,arial,sans-serif; font-size: 11px; font-variant: normal; font-style: normal; font-weight: normal; color: #3B5998; text-decoration: none;' target='_TOP'></a><span style='font-family: &#039;lucida grande&#039;,tahoma,verdana,arial,sans-serif;font-size: 11px;line-height: 16px;font-variant: normal;font-style: normal;font-weight: normal;color: #555555;text-decoration: none;'>&nbsp;|&nbsp;</span><a href='https://www.facebook.com/badges/' title='' style='font-family: &quot;lucida grande&quot;,tahoma,verdana,arial,sans-serif; font-size: 11px; font-variant: normal; font-style: normal; font-weight: normal; color: #3B5998; text-decoration: none;' target='_TOP'></a><br /><a href='https://www.facebook.com/imapera' title='Imano&#x142; P&#xe9;re&#x17c; Na &#x17b;&#x105;danie' target='_TOP'><img class='img' src='https://badge.facebook.com/badge/1369817222.3216.1780258602.png' style='border: 0px;' alt='' /></a>";
	contentSocial["twitter"] = "";
	contentSocial["instagram"] = "inta";
	contentSocial["youtube"] = "tube";
	contentSocial["googleplus"] = "plusplus";
	contentSocial["email"] = "<div id='emailContactForm' class='programmingElement' onsubmit='return checkForm()'><table><tr><td>\
							  		<form id='emailForm' action='http://imapera.esy.es/email.php' method='post'>\
							  			<h2>Send your message and tell me what you think! / ¡Enviame un mensaje y dime que piensas!</h2><br><br><hr><br>\
							  			Your email / Tu email:<br> <input id='formEmail' name='formEmail' type='text'><br><br>\
							  			Your name / Tu nombre:<br> <input id='formName' name='formName' type='text'><br><br>\
							  			Your message / Tu mensaje:<br><textarea id='formMessage' name='formMessage' style='width:90%;' rows=4></textarea><br><br>\
							  			<input type='submit' value='Send/Enviar'>\
							  			<br><hr><br>\
							  			<span id='formResult'></span>\
							  		</form>\
							  </td></tr></table></div>";
		
	function deleteSocialContent(){
		document.getElementById("socialBlack").remove()
	}	
					
	function loadSocial(social){
	
		if (social == "facebook") setObjetive(1,1);	
	
		var div = document.createElement("div");
		div.id="socialBlack";
		div.style.zIndex=2;
		div.style.position="fixed";
		div.style.top="0px";
		div.style.left="0px";
		div.style.width="100%";
		div.style.height="100%";
		div.style.backgroundColor="rgba(0, 0, 0, 0.8)";
		div.style.textAlign="center";				
		
		div.innerHTML="<center><table style='text-align:center;height:100%;'><tr><td>"
					   		+ contentSocial[social] +
						"<br><br><br><img class='closeImage' src='close.png' onclick='deleteSocialContent()'></td></tr></table></center>";
												
		document.body.appendChild(div);	
	}
	
	function checkForm(){
		var email = document.getElementById("formEmail").value;
		var name = document.getElementById("formName").value;
		var message = document.getElementById("formMessage").value;
		var error = 0;
		
		document.getElementById("formResult").innerHTML = "";	
		
		if (email == ""){
			document.getElementById("formResult").innerHTML += "Email vacio<br>";	
			error = 1;
		} else {		
			if (email.indexOf("@") == -1 || email.indexOf(".") == -1) {
				document.getElementById("formResult").innerHTML += "Email invalido<br>";	
				error = 1;
			}		
		}		
		
		if (name == ""){
			document.getElementById("formResult").innerHTML += "Nombre vacio<br>";	
			error = 1;
		}
		
		if (message == ""){
			document.getElementById("formResult").innerHTML += "Mensaje vacio<br>";		
			error = 1;
		}
		
		if (error == 0){
			setObjetive(4,1);
			document.getElementById("emailForm").submit();
			document.getElementById("emailContactForm").innerHTML = "<span style='font-size:30px'> <br>Thanks you! Your message has been sent. <br><hr><br> ¡Gracias! Tu mensaje ha sido enviado.</span>";	
		} else {
			return false;
		}
		
		return true;
	}