
const async = require('async');
let ModelTable = require('../dbModel');
let Ms = require('./mon')();
let initMod = function (connect) {
    let catSchema = new connect.Schemas(connect.dataType, { collection: connect.collection });
    return connect.mongoose.model(connect.collection, catSchema);
}
module.exports = function () {
    let collectionTable = {};
    // {Schemas  mongoose  dataType  collection} attribute
    ModelTable.dbs.filter((v, i) => {
        v.mongoose = Ms.mongoose;
        v.Schemas = Ms.Schemas;
        collectionTable[v.collection] = initMod(v)
    })
    return collectionTable
}