// const db = require('../utils/db.js')
const mongoClient = require('mongodb').MongoClient
// db.config('url', 'mongodb://127.0.0.1:27017/fifteen')


// db.insert('stars',data, (err, result) => {
//     console.log(result)
// })
mongodb://127.0.0.1:27017/fifteen
mongoClient.connect('mongodb://127.0.0.1:27017/fifteen',function(err,db){
    const stars = db.collection('stars')
    stars.count({realName:"舒畅"},function(err, result){
        
        console.log(result)
        db.close()
    })

})