<?php 
    // 假数据，真实的场景这些数据来自数据库
    $arr = array();
    $arr[0] = array("name"=>"三国演义","author"=>"罗贯中","category"=>"文学","desc"=>"一个杀伐纷争的年代");
    $arr[1] = array("name"=>"西游记","author"=>"吴承恩","category"=>"文学","desc"=>"佛教与道教的斗争");
    $arr[2] = array("name"=>"水浒传","author"=>"施耐庵","category"=>"文学","desc"=>"草寇就是草寇");
    $arr[3] = array("name"=>"红楼梦","author"=>"曹雪芹","category"=>"文学","desc"=>"一个封建王朝的缩影");

    $str = json_encode($arr);
    echo $str;
 ?>