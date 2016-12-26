const path = require('path')
module.exports = {
    uploadDir: path.join(__dirname, 'public/uploads'),
    mongodbUrl:'mongodb://127.0.0.1:27017/fifteen'
}
