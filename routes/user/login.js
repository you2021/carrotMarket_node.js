const express = require('express');
const router = express.Router();
const auth = require('../auth')
const aa = require('./login_class')
// const pool = require('../../db')
 
router.post('/',   (req, res) => {
    let id = req.body.id
    let pw = req.body.pw

    try{
      pool.getConnection(async (err, con) =>{
      //검증
      const check = await aa.login_query(id, auth.encrypt_string(pw));
      if(check.length == 0) return res.status(200).send({status:"failed", code:"1111"})
      let name = check[0].ui_name
    
      let cookieJosn = JSON.stringify({"id" : id , "name": name});
      res.cookie('key',auth.sign_cookie(cookieJosn) , {
        maxAge: 60 * 60 * 1000 * 4,  // 4시간
        httpOnly:true
      });

      res.status(200).send({status:"success", code:"0000", cookie : auth.sign_cookie(cookieJosn)})
      
      connection.release()

      })
    }catch{
        res.status(200).send({status:"failed", code:"2222"})
    }

    
})

module.exports = router;