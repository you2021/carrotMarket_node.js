const express = require('express');
const router = express.Router();

router.post('/', async (req, res)=>{
    
    const type = req.body.type

    try{
        let data = await getList(type)
        res.status(200).send(data)
    } catch(e){
        res.status(200).send({status:"failed", code:"2222"})
    }
  })

  let getList = (type) => {
      return new Promise((resolve, reject) => {
          connection.query(`select * from town where type="${type}"`, 
          function(err, result){
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