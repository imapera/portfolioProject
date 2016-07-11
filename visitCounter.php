<head></head>
<body style='font-family: Monaco'>
<?php

	function getRealIP() {
    	if (!empty($_SERVER['HTTP_CLIENT_IP']))
       		return $_SERVER['HTTP_CLIENT_IP'];
    	   
   	 	if (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))
  	    	return $_SERVER['HTTP_X_FORWARDED_FOR'];
   
	    return $_SERVER['REMOTE_ADDR'];	
	}

	$myfile = fopen("others/visitCounter.txt", "r");
	$number = fread($myfile,32);
	fclose($myfile);
	
	$myfile = fopen("others/visitCounter.txt","w");
	$number++;
	fwrite($myfile, $number);
	fclose($myfile);
		
	$link = mysqli_connect("mysql.hostinger.es","u869824211_ima","basecontrol","u869824211_cntrl");
	
	if ($link) echo "connected<br>";
	else echo "not connected<br>";
	
	$comeFrom = $_GET['rurl'];
	
	$ip = getRealIP();

	$browser = $_SERVER['HTTP_USER_AGENT'];

	echo "your ip is '".$ip."' and your browser ".$browser."<br>";
	
	/*$insert_row = $link->query("INSERT INTO visits (ip,visits,lastTime) VALUES(3,4,5)");

	if($insert_row){
   		print 'Success! ID of last inserted record is : ' .$link->insert_id .'<br />'; 
	}else{
    	echo 'Error : ('. $link->errno .') '. $link->error;
	}*/
	
	$result = $link->query("SELECT * FROM visits WHERE ip = '".$ip."'");
	
	if ($result){		
		if (mysqli_num_rows($result) == 0){
			echo "This is your first visit<br>";
			$link->query("INSERT INTO visits (ip,visits,lastTime,browser,incomingURL) VALUES('".$ip."',1,".time().",'".$browser."','".$comeFrom."')");
		}else{
			$obj = $result->fetch_object();
			$times = $obj->visits + 1;
			$time = time();
			echo "You have visited this ".$times." times last time at ".date("d-m-y g-i-s",$obj->lastTime)."<br>";
			$link->query("UPDATE visits SET visits = ".$times.", lastTime = ".$time.", browser = '".$browser."', incomingURL = '".$comeFrom."' WHERE ip = '".$ip."'");
		}
	
	} else {
	
	}
		
	
	$totalVisits = 0;
	$totalDifferentVisits = 0;
	
	$result = $link->query("SELECT * FROM visits");
	
	while ($obj = $result->fetch_object()){
		$totalVisits += $obj->visits;
		$totalDifferentVisits++;
	}
	
	echo "<style> td{padding:1%;text-align:center}
				  table{width:100%;}</style>";
	
	echo "Total visits ".$totalVisits." with ".$totalDifferentVisits." unique visitors.<br>";

	echo "<br><hr><br>Visits summary:<br><table>";
	$result = $link->query("SELECT * FROM visits ORDER BY lastTime ASC");
	
	$i=0;
	
	while ($obj = $result->fetch_object()){
		if ($i%2) echo "<tr style='background-color:#aaffff'>";
		else echo "<tr style='background-color:#aaaaff'>";
		echo "	<td style='width:3%'>".$obj->visits."</td>
				<td style='width:7%'>".$obj->ip."</td>
				<td style='width:5%'>".date("d-m-y G:i:s",$obj->lastTime)."</td>
				<td style='width:25%'>".$obj->browser."</td>
				<td style='width:25%'>".$obj->incomingURL."</td></tr>";
	}
	echo "</table>";

?>
</body>