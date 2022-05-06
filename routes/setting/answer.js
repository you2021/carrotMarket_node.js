const router = require('express').Router();
const aa = require('./answer_class')


router.post('/', async (req, res)=>{
    const no = req.body.no;
    
    try{
        let data = await aa.answer(no)
        console.log(data)
        res.status(200).send(data)
    } catch(e){
        res.status(200).send({status:"failed", code:"2222"})
    }
  })
  


  module.exports = router;