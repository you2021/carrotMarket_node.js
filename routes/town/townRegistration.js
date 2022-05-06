const router = require('express').Router();
const auth = require('../auth')
const aa = require('./tr_class')


router.post('/', async (req, res) => {

    if(req.cookies.key == null)return res.status(401).send({status:"failed", code:"401"})
    const cookieJson = auth.decode_cookie(req.cookies.key)
    if(cookieJson == null) return res.status(401).send({status:"failed", code:"401"})
    const id = JSON.parse(cookieJson.key).id
    
    try{
        const type = req.body.type;
        const contents = req.body.contents;
    
        await aa.write(type, contents)
        res.status(200).send({status:"success",code:"0000"})
    }catch(e){
        console.log(e)
        res.status(200).send({status:"failed", code:"2222"})
    }
})




module.exports = router;