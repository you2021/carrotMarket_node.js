const crypto = require('crypto')


module.exports = class{
    static encrypt_string = string =>{
        let hash_string = crypto.createHash('sha512').update(string).digest('base64');
        return hash_string
    }
}