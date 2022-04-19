const express = require('express');
const router = express.Router();
const auth = require('../auth')

router.post('/', async(req, res)=>{
    console.log('cookies :')
    console.log(req.cookies.key)
    if(req.cookies.key == null) return res.status(200).send({status:"failed", code:"2222"})

    const check_id = req.body.id
    if(check_id == "") return res.status(200).send({status:"failed", code:"1111"})

    const user_id = auth.decode_cookie(check_id).id

    try { 
        const check = await loginCheck(user_id)
        const id = check[0].ui_id
        res.status(200).send({status:"success",code:"0000", id:id})
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