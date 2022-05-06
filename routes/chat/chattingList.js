const router = require('express').Router()
const aa = require('./chat_class')

router.post('/', async(req, res)=> {

    const roomKey = req.body.roomKey
    const room = `chat_p_${roomKey}`
    console.log(room)

    try{
        let data = await aa.getchat_user(room)
        res.status(200).send(data)
    } catch(e){
        res.status(200).send({status:"failed", code:"2222"})
    }

})


module.exports = router;