// new mongodb.ObjectId(req.body._id)
const db = require('../utils/db.js')
db.config('url', 'mongodb://127.0.0.1:27017/fifteen')
const mongodb = require('mongodb')
const tmp = new mongodb.ObjectId('5858e4587378042bb05fa79a')
// 5858e47e8551ea11781cccf2
db.find('stars',{_id:tmp}, (err, data) => {
    const t = new mongodb.ObjectId(data[0]._id)
    // console.log(t)
    console.dir(t)
    console.log(data)
    // console.log(data)
    if(data.length<=0) return
    db.find('stars', {_id:data[0]._id},(err, data) => {
        console.log('========')
        console.log(data)
    })
})