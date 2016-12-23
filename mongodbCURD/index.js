
//最基本的连接数据库插入数据方法

// const express = require('express')
// 得到连接数据库的对象
const MongoClient = require('mongodb').MongoClient

// 1.打电话,打开链接
MongoClient.connect('mongodb://127.0.0.1:27017/newdb', function(err, db){
  // db就指定我们的newdb数据库
  // 2.得到集合对象
  // user是我们的集合名
  const myuser = db.collection('user')
  //插入数据
  myuser.insert({name:'小明',age:18},function(err, result){
    console.log(result)
  })
})