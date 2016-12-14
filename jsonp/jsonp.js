// JQ可以用跨域的方式获取数据，接下来分析的是JQ内部的jsonp实现
function ajax(param) {
    // 设置默认参数，这里不需要写请求的类型，因为它只支持get方式
    var settings = {
            jsonp: 'callback',
            url: '#',
            dataType: 'jsonp',
            data: {}, //传递的业务数据
            success: function(data) {
                console.log(data);
            }
        }
        // 完成覆盖默认值操作
    for (var key in param) {
        settings[key] = param[key];
    }

    // 对象添加属性的方式：
    // var obj={};
    // eg：1.obj.info=123;
    //     2.obj['info']=123;
    //     3.var v='info';
    //       obj[v]=123;
    // 以上三种方式都是等效的,这里就是用第三种方式

    var obj = {};

    var cbName = 'jQuery111104405603228731285_1480845391021';
    if (settings.jsonpCallback) {
        cbName = settings.jsonpCallback;
    }
    // 这里做的是：给window对象添加了一个属性，这个属性的值是一个方法，属性的名字就是cbName的变量值，即回调函数的名字
    // 这个方法就是回调函数，这个回调函数谁来调用？就是服务器相应的代码，是一个函数调用
    window[cbName] = function(data) {
        //data就是服务器响应的函数调用中的参数
        settings.success(data);
    }


    var script = document.createElement('script');
    //处理业务参数
    //把用户传来的对象形式的参数通过遍历转化为字符串形式，并拼接参数
    //eg:{username:admin,password:123}
    //转换为username=admin&password=123
    var param = '';
    for (var attr in settings.data) {
        param += attr + '=' + settings.data[attr] + '&';
    }
    if (param) {
        param = param.substring(0, param.length - 1)
    }

    var url = settings.url + '?' + settings.jsonp + '=' + cbName;
    if (param) {
        url += '&' + param;
    }
    script.src = url;
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(script);

}
