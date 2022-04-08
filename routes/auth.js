const crypto = require('crypto')
const jwt = require('jsonwebtoken');
const secretKey = "Sn029e1@#)!W$*213"

module.exports = class{
    static encrypt_string = string =>{
        let hash_string = crypto.createHash('sha512').update(string).digest('base64');
        return hash_string
    }

    static sign_cookie = (obj) => {
        const result = jwt.sign(obj, secretKey, {expiresIn : "5hour"})
        return result;
    }

    static decode_cookie = (token) =>{
        try {
            console.log(token)
            let decoded = jwt.verify(token, secretKey);
            return decoded
        } catch(e){
            console.log(e)
            return null
        }
    }
}