const router = require('express').Router();
const auth = require('../auth')
const aa = require('../../db/chat/chat')

router.get('/', async(req, res)=> {

    
    if(req.cookies.key == null)return res.status(401).send({status:"failed", code:"401"})
    const cookieJson = auth.decode_cookie(req.cookies.key)
    if(cookieJson == null) return res.status(401).send({status:"failed", code:"401"})
    const id = JSON.parse(cookieJson.key).id
    
    try{
        let data = await aa.getchat_room(id)
            console.log(data)
            res.status(200).send(data)
        
    } catch(e){
        res.status(200).send({status:"failed", code:"2222"})
    }

})


module.exports = router;