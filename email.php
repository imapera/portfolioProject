<?php 
	
	//echo "MIERDA ".$_POST["formEmail"]."-".$_POST["formName"]."-".$_POST["formMessage"]."-";
	
	$myfile = fopen("others/messages/MessageFrom - ".$_POST["formEmail"]." - ".$_POST["formName"].".txt", "w");
	fwrite($myfile, $_POST["formEmail"]."\n");
	fwrite($myfile, $_POST["formName"]."\n");
	fwrite($myfile, $_POST["formMessage"]."\n");
		
	$date = date("d-m-y g-i-s");
	fwrite($myfile,$date);
	//header('Location: http://www.imapera.com');
	
	echo '<META HTTP-EQUIV="Refresh" Content="0; URL=http://imapera.com">';
	
?>
