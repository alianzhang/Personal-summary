// 我们封装一下，对mongodb的操作,使其简化
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
//要连接的数据库地址
let url = 'mongodb://127.0.0.1:27017/newdb'
// 当我们调用这个文件的时候有可能连接的数据库地址不一样
// 所以通过exports向外界暴露了一个修改地址的方法
exports.configUrl = function(newurl) {
    url = newurl
}

// 1.封装插入的方法
/** 
 * @param  collectionName 集合名
 * @param  data           我们要插入的数据｛｝
 * @param  callback       回调
 */
// 通过exports向外界暴露了一个插入数据的方法
exports.insert = function(collectionName, data, callback) {
    // a.建立链接
    MongoClient.connect(url, function(err, db) {
        // b.得到集合对象
        const obj = db.collection(collectionName)
        // c.操作
        obj.insert(data, function(err, result) {
            // 当操作成功之后再执行回调函数!
            // d.关闭连接
            db.close()
            callback(err, result)
        })
    })
}

/**
 * 2.删除数据
 * @param    collectionName 集合名
 * @param   data          删除的条件
 * @param  {Function} callback       回调
 */
// 通过exports向外界暴露了一个删除数据的方法
exports.delete = function(collectionName, data, callback) {
    // a.建立链接
    MongoClient.connect(url, function(err, db) {
        // b.得到集合对象
        const obj = db.collection(collectionName)

        // c.操作
        obj.deleteMany(data, function(err, result) {
            // d 关半连接
            db.close()
            callback(err, result)
        })
    })
}

/**
 *3.更新数据，更新所以满足条件的数据
 * @param  {[type]}   collectionName 集合名
 * @param  {[type]}   data           指定修改条件
 * @param  {[type]}   content        更新的数据内容
 * @param  {Function} callback       回调
 */
// 通过exports向外界暴露了一个更新数据的方法
exports.update = function(collectionName, data, content, callback) {
    //a 建立链接
    MongoClient.connect(url, function(err, db) {
        // b.得到集合对象
        const obj = db.collection(collectionName)
            // c.操作
        obj.updateMany(data, { $set: content }, function(err, result) {
            // d.关闭连接
            db.close()
            callback(err, result)
        })
    })
}

// 查找数据
// content 指定查找条件
exports.find = function(collectionName, content, callback) {
    MongoClient.connect(url, function(err, db) {
        const obj = db.collection(collectionName)
        const result = obj.find(content)

        result.toArray(function(err, data) {
            db.close()
            callback(err, data)
        })
    })
}

/**
 *3.分页查找数据 // 第几页，每页多少条
 * @param  {[type]}   collectionName  集合名
 * @param  {[type]}   start       查的时候跳过几条数据
 * @param  {[type]}   count           
 * @param  {[type]}   content         指定查询条件
 * @param  {Function} callback        回调
 */
exports.findPage = function(collectionName,start,count, content, callback) {
  // 如果参数不对的话，给一个默认值
  (start<0) ? 0 : start;
  (count<0)? 0 : count;
    // a.
    MongoClient.connect(url, function(err, db) {
        //b 
        const obj = db.collection(collectionName)
            // c操作
        let result = obj.find(content)

        result.skip(start) // 查的时候略过前几条，从第几条开始，并返回它自己，所以可以使用链式编程
        .limit(count) // 限制只查询几条数据

        .toArray(function(err, data) {
                // d
                db.close()
                callback(err, data)
            })
    })
}

// 以下是测试代码


// 测试分页查询数据
// exports.findPage('user',1,1, {}, function(err, data) {console.log(data)})

// 测试修改数据
// exports.update('user',{age:18},{age:19},function(err, result){
//   console.log(result) // modifiedCount  matchedCount
// })

// 测试插入数据
// exports.insert('tmp',{age:18,name:'小明明'},function(err, result){
//   console.log(result)
// })
// exports.insert('tmp',{age:19,name:'小明明'},function(err, result){
//   console.log(123)
//   console.log(result)
// })
