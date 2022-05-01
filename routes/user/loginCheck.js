const express = require('express');
const router = express.Router();
const auth = require('../auth')

router.post('/', async(req, res)=>{

    const key = req.body.key
    if(key == null) return res.status(200).send({status:"failed", code:"1111"})
    const cookieJson = auth.decode_cookie(key)
    if(cookieJson == null) return res.status(200).send({status:"failed", code:"1111"})

    try { 
        const id = JSON.parse(cookieJson.key).id
        if(id == null) res.status(200).send({status:"failed",code:"2222"})

        res.status(200).send({status:"success",code:"0000"})
    }catch(e){
        console.log(e.message)
        res.status(200).send({status:"failed", code:"3333"})
    }
})

let loginCheck = (id) => {
    return new Promise((resolve, reject)=>{
        connection.query(`select ui_id from user_info where ui_id = '${id}' `,
        function(err, result){
            if(err){ 
                 `err : ${console.log(err)} `;
                 reject(err)
                 return
            }
            resolve(result);
        });
    })
  }

module.exports = router;