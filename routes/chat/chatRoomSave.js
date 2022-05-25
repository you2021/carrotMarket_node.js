const router = require('express').Router();
const auth = require('../auth')
const aa = require('../../db/chat/chat')

router.post("/",async(req, res)=> {

    if(req.cookies.key == null)return res.status(401).send()
    const cookieJson = auth.decode_cookie(req.cookies.key)

    const my_id = JSON.parse(cookieJson.key).id
    const your_id = req.body.your_id
    const roomKey = req.body.roomKey

    if(my_id == null) return res.status(200).send({status:"failed", code:"2222"}) 
    try{
        await aa.chat_room(roomKey, my_id, your_id)
        res.status(200).send({status:"success", code:"0000"})
    }catch(e){
        res.status(200).send({status:"failed", code:"1111"}) 
    }
} )


module.exports = router;