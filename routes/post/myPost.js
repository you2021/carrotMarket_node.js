const router = require('express').Router();
const auth = require('../auth')
const aa = require('./mp_class')

router.get('/', async (req, res, next) => {

    if(req.cookies.key == null)return res.status(401).send({status:"failed", code:"401"})
    const cookieJson = auth.decode_cookie(req.cookies.key)
    if(cookieJson == null) return res.status(401).send({status:"failed", code:"401"})
    const id = JSON.parse(cookieJson.key).id

    try{
        if(id == null) return res.status(200).send({status:"failed", code:"1111"})

       const data =  await aa.my_post(id)
        res.status(200).send(data)
    }catch(e){
        console.log(e)
        res.status(200).send({status:"failed", code:"2222"})
    }
})

router.post('/detail', async(req, res) =>{
    const num = req.body.num;
    try{
      
        let data = await aa.getDetail(num)
        console.log(data)
        res.status(200).send(data[0])
    }catch(e){
        res.status(200).send({status:"failed", code:"2222"})
    }
    
})

module.exports = router;