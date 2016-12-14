<?php 
    $arr = array();

    $arr['a'] = array(1,2,23,3,435,34);
    $arr['b'] = array(1,2,23,3,435,34);
    $arr['c'] = array(1,2,23,3,435,34);
    $arr['d'] = array(1,2,23,3,435,34,234,2342,3);
    
    echo json_encode($arr);

    $flag = $_GET['flag'];
    echo $flag;
 ?>