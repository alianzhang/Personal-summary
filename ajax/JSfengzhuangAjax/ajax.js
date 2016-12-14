 // 定义ajax方法
    function ajax(obj){
        // 设置默认值
        var settings={
            type: 'get',
            dataType:'text',
            async: true,
            url:'#',
            data:{},//ajax默认收到传来的参数是对象的形式
            success:function(data){
                console.log(data);
            }

        }
        // 遍历用户传来的参数，覆盖settings中的默认值
        for(var key in obj){
            settings[key]=obj[key];

        }
         // 1.创建XMLHttpRequest对象
            var xhr=null;
            // 创建请求对象有兼容性问题，这里做兼容性处理
            if(window.XMLHttpRequest){
                xhr=new XMLHttpRequest();
            }else{
                xhr=new ActiveXObject('Microsoft.XMLHTTP')
            }

            //把用户传来的对象形式的参数通过遍历转化为字符串形式，并拼接参数
            //eg:{username:admin,password:123}
            //转换为username=admin&password=123
            var param='';
            for(var attr in settings.data){
                param+=attr+'='+settings.data[attr]+'&';
            }
            if (param) {
                param=param.substring(0,param.length-1)
            }
            
            // 2.准备发送，设置发送参数

            // 判断用户请求的类型，决定传参的方式
            if(settings.type=='get'){
                settings.url+='?'+encodeURI(param);
            }
            // open有三个参数1.请求方式2.请求地址3.是否同步，默认为false即为异步
            xhr.open(settings.type,settings.url,settings.async);

            // 3.执行发送动作
            
            // 判断请求类型，从而决定send的参数
            var pdata=null;
            if (settings.type=='post') {
                pdata=param;
                 xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
            }
            xhr.send(pdata);
            // 4.指定回调函数
            xhr.onreadystatechange=function(){
                // 服务器响应状态码，为4表示响应完成（只是相应的动作完成了，但获取的数据不一定成功或者正确）
                if(xhr.readyState==4){
                    // http状态码，为200表示请求数据成功
                    if(xhr.status==200){
                        var data=xhr.responseText;
                        // 如果返回的数据类型是json字符串要转换成对象使用
                        if (settings.dataType=='json') {
                            data=JSON.parse(data);
                        }
                        settings.success(data);
                    }
                }
            }

    }