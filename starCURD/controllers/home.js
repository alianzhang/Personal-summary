const express = require('express')
const mongodb = require('mongodb')
const db = require('../utils/db.js')
const config = require('../config.js')
const formidable = require('formidable')
const path = require('path')
db.config('url',config.mongodbUrl )
const router = module.exports = express.Router()

/**
 * /GET
 * /userlist
 * 分页查询出明星信息
 * 
 * @param  count 分页大小
 * @param  start 从第几条数据开始
 */     

router.get('/starlist', (req, res) => {
    let skip = 0,limit = 3
    skip = parseInt(req.query.start) || skip
    limit = parseInt(req.query.count) || limit
    const result = db.findPage(
        'stars', {}, skip, limit, (err, data) => {
            db.count('stars', {}, (err, count) => {
               res.send({
                    status:'ok',
                    total:count,
                    starList:data
                })
            })
    })
})



/**
 * /GET
 * /stardetails
 * 根据_id查出具体明星的信息
 * @param _id 唯一标识
 */
router.get('/stardetails', (req, res) => {
    if(!req.query._id){
        res.send({status:'err',msg:'需要传入一个_id'})
        return
    }
    console.log(req.query._id)
    // 验证_id是否合法
    if(req.query._id.length !==12 && req.query._id.length!== 24){
        res.send({status:"err",msg:"_id长度不对!"})
        return
    }
    db.find('stars', {_id:new mongodb.ObjectId(req.query._id)}, (err, data) => {
        let temp = {}
        if(data.length <= 0){
            res.send({status:'err',msg:'没有查找到数据!'})
            return
        }
        temp = data[0]
        res.send({
            status:'ok',
            star: temp
        })
    })
}) 

/**
 * 
 */

/**
 * /POST
 * /delete
 * 删除明星数据
 */
router.post('/delete', (req, res) => {
    // req.body._id
    // console.log(req.body._id)
    if(!req.body._id){
        res.send({status:'err',msg:'需要传入一个_id'})
        return
    }
    // 内部_id是个对象！
    // 注意这个_id长度需要为12或者24
    if(req.body._id.length !==12 && req.body._id.length!== 24){
        res.send({status:"err",msg:"_id长度不对!"})
        return
    }
    const obj = new mongodb.ObjectId(req.body._id)
    db.delete('stars', {_id:obj}, (err, result) => {
        // console.log(result)
        console.log(result.deletedCount)
        res.send({status:'ok',msg:'删除成功!'})
    })
})


/**
 * /POST
 * /saveimg
 * 保存图片
 */
router.post('/saveimg', (req, res) => {
    // parse a file upload
    const form = new formidable.IncomingForm()
      form.uploadDir = config.uploadDir // 配置上传文件的路径
      form.keepExtensions = true // 保持扩展名
      form.maxFieldsSize = 20 * 1024 * 1024 // 配置上传文件的大小
      form.parse(req, (err, fields, files) => {
        if (err) {
          throw err
        }
        // if(!files.fileimg){
        //     res.send({status:'err','msg':'没有文件'})
        //     return
        // }
        const filename = path.basename(files.name.path)
        // 回调函数中的 fields 就是表单中的普通字段
        // files 就是文件信息
        res.send({status:'ok',msg:'上传成功!',filename:path.join('/uploads',filename)})
  })
})


/**
 * /POST
 * /savestar
 * 保存star信息
 */
router.post('/savestar', (req, res) => {
    // 较验
    if(!req.body._id){
        res.send({status:'err',msg:'需要传入一个_id'})
        return
    }
    // 内部_id是个对象！
    // 注意这个_id长度需要为12或者24
    if(req.body._id.length !==12 && req.body._id.length!== 24){
        res.send({status:"err",msg:"_id长度不对!"})
        return
    }
    const objId = new mongodb.ObjectId(req.body._id)
    console.log(req.body)
    db.update('stars', {_id: objId},{
        realName : req.body.realName,
        stageName : req.body.stageName,
        birth   : req.body.birth,
        works : req.body.works,
        poster: req.body.poster,
        summary : req.body.summary
    }, (err, result) => {
        if(result.updatedCount <=0){
            res.send({status:'err', msg:'更新失败!'})
            return
        }
        res.send({status:'ok', msg:'修改成功!'})
    })
})

/**
 * /POST
 * /addstar
 * 添加新数据
 */

router.post('/addstar', (req, res) => {
   db.insert('stars', {
        realName : req.body.realName,
        stageName : req.body.stageName,
        birth   : req.body.birth,
        works : req.body.works,
        poster: req.body.poster,
        summary : req.body.summary
   } , (err, result) => {
       if(result.insertedCount <= 0){
        res.send({status:'err'})
        return
       }
       res.send({status:'ok', msg:'插入成功!'})
   })
})