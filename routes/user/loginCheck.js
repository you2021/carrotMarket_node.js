const express = require('express');
const router = express.Router();
const auth = require('../auth')

router.post('/', async(req, res)=>{

    const key = req.body.key
    if(key == null) return res.status(200).send({status:"failed", code:"1111"})
    const cookieJson = auth.decode_cookie(key)  //??
    if(cookieJson == null) return res.status(200).send({status:"failed", code:"1111"})

    try { 
        const id = JSON.parse(cookieJson.key).id
        const name = JSON.parse(cookieJson.key).name
        if(id == null) res.status(200).send({status:"failed",code:"2222"})

        let cookieJosn = JSON.stringify({"id" : id , "name": name});
        res.cookie('key',auth.sign_cookie(cookieJosn) , {
            maxAge: 60 * 60 * 1000 * 4,  // 4시간
            httpOnly:true
         });

        res.status(200).send({status:"success",code:"0000"})

        // const check = await aa.loginCheck(id);
        // if(check.length == 1 )res.status(200).send({status:"success",code:"0000"})

    }catch(e){
        console.log(e.message)
        res.status(200).send({status:"failed", code:"3333"})
    }
})



module.exports = router;