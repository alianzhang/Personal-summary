/**
 * @Author: Administrator
 * @Date:   2016-12-14 16:51:36
 * @Last Modified by:   Administrator
 * @Last Modified time: 2016-12-14 17:13:14
 */
<?php
	$arr=array("username"=>"zhangsan","age"=>"12");
	$cbName=$_GET['callback'];
	$str=json_encode($arr);
	echo $cbName.'('.$str.')';//这里返回的是函数调用callback({username: "zhangsan", age: "12"})
	// echo 'var abc=12';
?>  