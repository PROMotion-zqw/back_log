const crypto = require('crypto');
// 加密
function Encrypt(data, key) {
	const cipher = crypto.createCipher('aes192', key);
	var crypted = cipher.update(data, 'utf8', 'hex');
	crypted += cipher.final('hex');
	return crypted;
}
// 解密
function Decrypt(encrypted, key) {
	const decipher = crypto.createDecipher('aes192', key);
	var decrypted = decipher.update(encrypted, 'hex', 'utf8');
	decrypted += decipher.final('utf8');
	return decrypted;
}

function mds(name) {
	let md5 = crypto.createHash('md5');
	md5.update(name, 'utf8');
	return md5.digest('hex');
}
module.exports = {
	enCrypt: Encrypt,
	deCrypt: Decrypt,
	Suffix: "CRYPT_SESSION.19990719.COOKIE.aws",
	md5: mds
}

// console.log('明文 ' + data)  //明文xtang
// console.log('加密后 ' + encrypted) //加密后6903756dc076823f5222227fb824180d
// console.log('解密后 ' + decrypted)  //解密后xtang
