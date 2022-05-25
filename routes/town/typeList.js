const router = require('express').Router()
const aa = require('../../db/town/typeList')


router.post('/', async (req, res)=>{
    
    const type = req.body.type

    try{
        let data = await aa.getList(type)
        res.status(200).send(data)
    } catch(e){
        res.status(200).send({status:"failed", code:"2222"})
    }
  })

  
  module.exports = router;