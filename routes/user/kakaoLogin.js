const router = require('express').Router();
const aa = require('./join_class')
const auth = require('../auth')

router.post('/', async (req, res, next) => {

    const ui_id = req.body.ui_id
    const ui_pw = req.body.ui_pw
    const ui_name = req.body.ui_name
    const city = req.body.city

    try {

        let cookieJosn = JSON.stringify({"id" : ui_id , "name": ui_name});
        res.cookie('key',auth.sign_cookie(cookieJosn) , {
            maxAge: 60 * 60 * 1000 * 4,  // 4시간
            httpOnly:true
         });

        await aa.write_join(ui_id, auth.encrypt_string(ui_pw), ui_name, city)
        res.status(200).send({status:"success",code:"0000"})
    }catch(e){
        console.log(e.message)
        res.status(200).send({status:"failed", code:"3333"})
    }
})

router.post('/check', async (req, res, next) => {

    const ui_id = req.body.ui_id

    try {
        const result = await aa.idCheck(ui_id)
        if(result.length == 0) return res.status(200).send({status:"failed", code:"2222"})  // id가 없음 

        let cookieJosn = JSON.stringify({"id" : ui_id , "name": ui_name});
        res.cookie('key',auth.sign_cookie(cookieJosn) , {
            maxAge: 60 * 60 * 1000 * 4,  // 4시간
            httpOnly:true
         });

        res.status(200).send({status:"success",code:"0000"})  // id가 있음.
    }catch(e){
        console.log(e.message)
        res.status(200).send({status:"failed", code:"3333"})
    }
})

module.exports = router;