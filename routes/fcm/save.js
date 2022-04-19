const express = require('express');
const router = express.Router();
const auth = require('../auth')

router.post('/', async (req, res) => {

    console.log(req.cookies.key)
    if(req.cookies.key == null)return res.status(401).send({status:"failed", code:"401"})
    const cookieJson = auth.decode_cookie(req.cookies.key)
    if(cookieJson == null) return res.status(401).send({status:"failed", code:"401"})
    const id = cookieJson.id

    if(req.cookies.key == null) return res.status(200).send({status:"success",code:"0000"})
    if(id == null) return res.status(200).send({status:"failed", code:"1111"})
    try{
        const fcmNo = req.body.fcmNo;

        await write_fcm(id, fcmNo)
        res.status(200).send({status:"success",code:"0000"})
    }catch(e){
        console.log(e)
        res.status(200).send({status:"failed", code:"2222"})
    }
})

let write_fcm = (id, fcm) => {
    return new Promise((resolve, reject)=>{
        connection.query(`INSERT INTO fcmInfo(id, fcmNo) 
                    VALUES("${id}","${fcm}")`,
        function(err, rows, fields){
            if(err){ 
                 `err : ${console.log(err)} `;
                 reject(err)
                 console.log(err)
                 return
            }
        
            resolve()
        });
    })
}

module.exports = router;