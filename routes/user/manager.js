const router = require('express').Router();
const aa = require('../../db/user/manager')
const auth = require('../auth')


router.get('/', async (req, res)=>{

    if(req.cookies.key == null)return res.status(401).send({status:"failed", code:"401"})
    const cookieJson = auth.decode_cookie(req.cookies.key)
    if(cookieJson == null) return res.status(401).send({status:"failed", code:"401"})
    const ui_id = JSON.parse(cookieJson.key).id
    
    try{
        const manager = await aa.knowManager(ui_id)  
        res.status(200).send(manager)
    } catch(e){
        res.status(200).send({status:"failed", code:"2222"})
    }
  })

module.exports = router;