// 这个测试文件，不需要自己写连接数据库的代码，
// 直接调用我们封装好的db.js就可以了
const db = require('./db.js')

// 调用方法修改数据库连接地址
db.configUrl('mongodb://127.0.0.1:27017/olddb')

db.insert('user',{name:'小化',age:18},function(err, result){
  console.log(result)// insertedCount  // deletedCount
})

db.delete('user',{age:18},function(err, result){
  console.log(result)
})
