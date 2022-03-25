const express = require('express');
const router = express.Router();

router.post('/', async (req, res)=>{
    const no = req.body.no;
    
    try{
        let data = await answer(no)
        console.log(data)
        res.status(200).send(data)
    } catch(e){
        res.status(200).send({status:"failed", code:"2222"})
    }
  })
  
  let answer = (no) => {
      return new Promise((resolve, reject) => {
          connection.query(`SELECT * FROM answer where no = '${no}'`,
           function(err, result){
  
              if(err){
                  `err : ${console.log(err)}`
                  reject(err)
                  return
              }
              console.log(result)
              resolve(result);
  
          })
      })
  }

  module.exports = router;