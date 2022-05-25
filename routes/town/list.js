const router = require('express').Router();
const aa = require('../../db/town/list')


router.get('/', async (req, res)=>{
    
    console.log("come on : ")

    try{
        let data = await aa.getList()
        res.status(200).send(data)
    } catch(e){
        res.status(200).send({status:"failed", code:"2222"})
    }
  })
  
  

  module.exports = router;