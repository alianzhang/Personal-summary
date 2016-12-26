// 入口文件
const express = require('express')

const bodyParser = require('body-parser')
//根据指定路由访问
const home = require('./controllers/home.js')
const app = express()


// 我们可以直接访问public下的静态文件!
app.use(express.static('public'))


app.use(bodyParser.urlencoded({extends:false}))
// 加上home里的规则
app.use(home)


//
app.listen(3000,'127.0.0.1')// http://127.0.0.1:3000/index.html