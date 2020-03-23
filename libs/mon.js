
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
module.exports = function () {
    mongoose.connect('mongodb://localhost:27017/itcast', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        server: {
            socketOptions: {
                autoReconnect: true,
                connectTimeoutMS: 30000,
                socketTimeoutMS: 30000,
            },
        }
    }).then(res => {
        console.log('数据库连接成功');
    }).catch(err => {
        console.log('数据库连接失败');
    })
    const Schema = mongoose.Schema;
    return { Schemas: Schema, mongoose }
}