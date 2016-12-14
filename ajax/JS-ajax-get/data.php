<?php 
    $arr = array();

    $arr['a'] = array(1,2,23,3,435,34);
    $arr['b'] = array(1,2,23,3,435,34);
    $arr['c'] = array(1,2,23,3,435,34);
    $arr['d'] = array(1,2,23,3,435,34,234,2342,3);
    
    // 前台访问后台数据成功后输出的数据
    echo json_encode($arr);

    // 后台接受前台传来的数据
    $flag=$_GET['flag'];
    // 输出数据
    echo $flag;
 ?>