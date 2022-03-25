const express = require('express');
const router = express.Router();

router.get('/', async (req, res)=>{
    try{
        let data = await get_question()
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
  
  let get_question = () => {
      return new Promise((resolve, reject) => {
          connection.query('SELECT * FROM question', function(err, result){
  
              if(err){
                  `err : ${console.log(err)}`
                  reject(err)
                  return
              }
              resolve(result);
  
          })
      })
  }

  module.exports = router;