<?php
	$arr=array("username"=>"zhangsan","age"=>"12");
	$cbName=$_GET['cb'];
	$str=json_encode($arr);
	echo $cbName.'('.$str.')';//
?>  