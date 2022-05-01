const express = require('express');
const router = express.Router();
const auth = require('../auth')

router.get('/', async (req, res, next) => {

    if(req.cookies.key == null)return res.status(401).send({status:"failed", code:"401"})
    const cookieJson = auth.decode_cookie(req.cookies.key)
    if(cookieJson == null) return res.status(401).send({status:"failed", code:"401"})
    const id = JSON.parse(cookieJson.key).id

    try{
        if(id == null) return res.status(200).send({status:"failed", code:"1111"})

       const data =  await my_post(id)
        res.status(200).send(data)
    }catch(e){
        console.log(e)
        res.status(200).send({status:"failed", code:"2222"})
    }
})

let my_post = (id) => {
    return new Promise((resolve, reject)=>{
        connection.query(`select * from post where user_id="${id}"` ,
        function(err, result, fields){
            if(err){ 
                 `err : ${console.log(err)} `;
                 reject(err)
                 return
            }
            resolve(result)
        });
    })
}

module.exports = router;