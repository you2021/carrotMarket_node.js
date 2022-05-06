const router = require('express').Router();
const aa = require('./question_calss')


router.get('/', async (req, res)=>{
    try{
        let data = await aa.get_question()
        res.status(200).send(data)
    } catch(e){
        res.status(200).send({status:"failed", code:"2222"})
    }
  })

  router.post('/detail', async(req, res) =>{
    const num = req.body.num;
    try{
        let data = await get_question()
        res.status(200).send(data[num])
    }catch(e){
        res.status(200).send({status:"failed", code:"2222"})
    }
    
})
  

  module.exports = router;