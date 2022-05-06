const router = require('express').Router()
const auth = require('../auth')
const aa = require('./change_class')


router.post('/', async (req, res)=>{

    if(req.cookies.key == null)return res.status(401).send({status:"failed", code:"401"})
    const cookieJson = auth.decode_cookie(req.cookies.key)
    if(cookieJson == null) return res.status(401).send({status:"failed", code:"401"})
    
    const ui_id = JSON.parse(cookieJson.key).id
    const ui_pw = req.body.ui_pw;
    const ui_name = req.body.ui_name;

    try{
        await aa.getUpdateUserInfo(ui_id, auth.encrypt_string(ui_pw), ui_name)  
        res.status(200).send({status:"seccess", code:"2222"})
    } catch(e){
        res.status(200).send({status:"failed", code:"2222"})
    }
  })

  router.post('/updateCity', async (req, res)=>{

    if(req.cookies.key == null)return res.status(401).send({status:"failed", code:"401"})
    const cookieJson = auth.decode_cookie(req.cookies.key)
    if(cookieJson == null) return res.status(401).send({status:"failed", code:"401"})
    const ui_id = JSON.parse(cookieJson.key).id
    const city = req.body.city;

    try{
        await aa.getUpdateUserInfoCity(ui_id, city)  
        res.status(200).send({status:"seccess", code:"2222"})
    } catch(e){
        res.status(200).send({status:"failed", code:"2222"})
    }
  })




module.exports = router;