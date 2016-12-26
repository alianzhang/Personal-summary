'use strict'
const MongoClient = require('mongodb').MongoClient
let config = {
    url:'mongodb://localhost:27017/itcast'
}
// console.log(require('mongodb').ObjectId)
exports.config =function(key, value){
   config[key] = value
}
//插入数据
//@p1 集合名称
//@p2 插入对象
exports.insert = function(collectionName,obj,callback) {
    MongoClient.connect(config.url, function(err, db) {
        let collecton = db.collection(collectionName)
        collecton.insert(obj, function(err, result) {
            db.close()
            callback(err,result)
        })
        
    })
}


//更新数据
exports.update = function(collectionName,oldObj,newObj,callback) {
    MongoClient.connect(config.url, function(err, db) {
        let collecton = db.collection(collectionName)
        collecton.updateMany(oldObj,{$set:newObj},function(err, result) {
            db.close()
            callback(err,result)
            
        })  
    })
}
//查找数据
exports.find = function(collectionName,obj,callback) {
    MongoClient.connect(config.url, function(err, db) {
        let collecton = db.collection(collectionName)
        collecton.find(obj).toArray(function(err, result) {
            db.close()
            callback(err,result) 
        })  
    })
}

// 分页查找数据
// @param  skip 跳过多少条
// @param  limit 查询多少条
exports.findPage = function(collectionName,obj,skip,limit,callback){
    MongoClient.connect(config.url, function(err, db) {
        let collecton = db.collection(collectionName)
        collecton.find(obj)
        .skip(skip)
        .limit(limit)
        .toArray(function(err, result) {
            db.close()
            callback(err,result) 
        })  
    })
}

//删除数据
exports.delete = function(collectionName,obj,callback) {
    MongoClient.connect(config.url, function(err, db) {
        let collecton = db.collection(collectionName)
        collecton.deleteMany(obj, function(err, result) {
            db.close()
            callback(err,result) 
        })  
    })
}

// 查找数据总条数
// @obj 是查询条件
exports.count = function(collectionName,obj,callback){
    MongoClient.connect(config.url, function(err, db){
        let collection = db.collection(collectionName)
        collection.count(obj, function(err, count){
            db.close()
            // count是number
            callback(err, count)
        })
    })
}

// exports.insert('users',{a:'def'},function(err,data){
//         if(err) throw err
//     console.log(data)
// })

// exports.update('users',{a:'def'},{a:'aaa'},function(err,data){
//     if(err) throw err
//     console.log(data)
// })
// exports.find('users',{a:'aaa'},function(err,data){
//     console.log(data)
// })
// exports.delete('users',{a:'aaa'},function(err,data){
//     console.log(data)
    
// })
