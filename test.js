
// const table = require('./libs/Schema.js');
const {deCrypt, Suffix, md5, enCrypt} = require('./libs/cryptos.js');
console.log('加', deCrypt(enCrypt("123","1s"), "1s"));

