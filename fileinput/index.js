// 1.引包
const express  = require('express')
const formidable = require('formidable')//用于读取文件的包
const path = require('path')// 核心模块，处理路径 

const app = express()

// express自动帮我们处理静态文件
app.use(express.static('public'))

// 2.指定规则
app.post('/saveimg', (req, res) =>{
  // a.初始化一个对象,专门接收文件
  const form = new formidable.IncomingForm()

  // path.join是自动拼接路径的方法，传两个参数会自动拼接
  // uploadDir指定文件上传服务器保存的路径
  const dir = path.join(__dirname, 'public/uploads')
  // console.log(dir)
  form.uploadDir = dir//  __dirname + 'public/uploads'
  form.keepExtensions = true // 保存文件时会保留后缀

  // 接收文件
  form.parse(req, function(err, fileds, files){
    // 接收完文件，才会执行这这function
    // fileds 这个是我们上传的非文件的普通表单!
    // files表示我们上传的文件(包含了我们上传的文件的信息)
    // console.log(fileds)
    // console.log('------------------')
    // console.log(files)
    
    // file.test // 这个test是前端input表单的name属性的值
    // file.test.path  c:/cxxx  是本地上传文件的路径
    // path.basename 通过它可以获取到路径中的文件名
    // const filename = path.basename(files.test.path)
    // console.log(filename)
    // res.send('<img src="/uploads/'+filename+'" alt="" />')//可以预览
    res.send('ok')
  })
}) 


// 3.监听
app.listen(3000,'127.0.0.1',function(){
  console.log('http://127.0.0.1:3000')
})