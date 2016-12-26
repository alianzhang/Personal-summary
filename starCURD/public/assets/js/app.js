$(function(){
    var totalPage = 10
    var pageSize = 3

    // 专门获取数据列表的方法
    // @pageSize 每页数据量
    // @pageIndex 第几页
    function getstarList(pageIndex, pageSize){
        // 3,   1
        // start : 0,1,2
        // 3,   2
        // start:  3,4,5
        // 3,   3
        // start:  6,7,8

        var start = pageSize * (pageIndex - 1)

        $.ajax({
            url: '/starlist',
            type: 'get',
            data: { start: start, count: pageSize },
            success: function(result) {
                if (result.status === 'ok') {
                   totalPage =  Math.ceil(result.total / pageSize)
                    // result.starlist []
                    // 拼接字符串
                    var str = ''
                    for (var i = 0; i < result.starList.length; i++) {
                        var item = result.starList[i]
                        str += '<tr><td>' + item._id + '</td>' +
                            '<td>' + item.realName + '</td>' +
                            '<td>' + item.stageName + '</td>' +
                            '<td>' + item.birth + '</td>' +
                            '<td>' + item.works + '</td>' +
                            '<td><button _id="' + item._id + '" class="del btn btn-danger">删除</button></td>'+
                            '<td><button _id="' + item._id + '" class="edit btn btn-primary">修改</button></td></tr>'
                    }
                    // 把字符串添加到页面tbody中
                    $('tbody').html(str)

                }
            }

        })



    }

    // 1.发请求，获取明星的数据列表
    getstarList(1, pageSize)


    // 初始化分页按钮，需要安装插件
    $('.pagination').twbsPagination({
          totalPages: totalPage, // 总页数
          visiblePages: 5, // 显示多少个页码
          // 当前点击页码事件!
          onPageClick: function (event, page) {
            getstarList(page, pageSize)
            // console.log(page)
            // // $('#page-content').text('Page ' + page);
          }
        })


    // 2.要删除数据
    // 注册删除按钮点击事件,(事件委托!)
    $(document).on('click', '.del', function(e) {
        // 询问一下， 是否真的删除
        if (!confirm('您是否真的删除?')) {
            return
        }
        // 获取_id
        var _id = $(this).attr('_id')
            // 发请求，去删除数据
        $.ajax({
            url: '/delete',
            type: 'post',
            data: { _id: _id },
            success: function(result) {
                // console.log(result)
                if (result.status === 'ok') {
                    alert('删除成功!')
                        // 刷新!
                        location.reload()
                }
            }
        })

    })


    // 获取相关的dom对象
    var $_id = $('#_id')
    var $realName = $('#realName')
    var $stageName = $('#stageName')
    var $birth = $('#birth')
    var $works = $('#works')
    var $summary = $('#summary')
    var $poster = $('#poster')
    // 修改数据
    $(document).on('click','.edit',function(e){
        // 模态框调用
        $('#mymodel').modal({show:true})
        var _id = $(this).attr('_id')
        $.ajax({
            url: '/stardetails',
            data:{
                _id:_id
            },
            type:'get',
            success:function(result){
                if(result.status === 'ok'){
                    $_id.val(result.star._id)
                    $realName.val(result.star.realName)
                    $stageName.val(result.star.stageName)
                    $birth.val(result.star.birth)
                    $works.val(result.star.works)
                    $summary.val(result.star.summary)
                    $poster.attr('src',result.star.poster)

                }


                // console.log(result.star)

            }
        })
    })

    // 保存数据
    $('#save').on('click', function(e){
        $.ajax({
            url:'/savestar',
            type:'post',
            data:{
                _id: $_id.val(), // 数据的唯一标识
                realName: $realName.val(),
                stageName: $stageName.val(),
                birth: $birth.val(),
                works: $works.val(),
                poster: $poster.attr('src'),
                summary: $summary.val()
        },
        success:function(result){
            console.log(result)
        }
        })
    })

    
    // 注册上传图片按钮点击事件
    $('#upload').on('click',function(e){
        // FormData是H5中的新对象，可以用纯js上传文件，
        // 模拟了表单提交，实现文件的异步上传，因为form表单的提交默认是同步的
        var fordata = new FormData()
        // 获取上传图片的input对象
        var oFileInput =  $('#fileinput')[0]
        console.log(oFileInput)
        // 这个files属性就是选择的文件，是一个数组
        // oFileInput.files  []
        fordata.append('username', oFileInput.files[0])
        $.ajax({
            url:'/saveimg',
            type:'post',
            data:fordata,  // jq默认会把我们上传的数据转换成这种形式：a=b&c=d
            processData:false,   // @1告诉jquery不要处理我们data的数据
            contentType:false, //@2告诉jquery不要设置Content-type请求头 
            success:function(result){
                console.log(result)
            }
        })
    })
})

// 1 + 1 = 2
// 1+2= 3

// 三角内角合180度

// 不相应
// 函数 - 
// function(){}