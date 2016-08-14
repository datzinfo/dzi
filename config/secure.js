/**
 * Constants
 */
var ALGORITHM = 'sha256';
var DIGEST = 'base64';

/**
 * Module dependencies
 */
var crypto = require('crypto');


/**
 * Module exports
 */
module.exports.hash = hashPassword;
module.exports.verify = verify;

function hashPassword(password, callback) {	
	var shasum = crypto.createHash(ALGORITHM);
	shasum.update(password);
	return shasum.digest(DIGEST);
}

function verify(password, hash) {
    return (hashPassword(password) === hash);
}