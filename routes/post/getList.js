const express = require('express');
const router = express.Router();

router.get('/', async (req, res)=>{
    console.log("come on : ")
    try{
        let data = await getList()
        res.status(200).send(data)
    } catch(e){
        res.status(200).send({status:"failed", code:"2222"})
    }
  })
  
  router.post('/detail', async(req, res) =>{
      const num = req.body.num;
      try{
          let data = await getList()
          res.status(200).send(data[num])
      }catch(e){
          res.status(200).send({status:"failed", code:"2222"})
      }
      
  })
  
  let getList = () => {
      return new Promise((resolve, reject) => {
          connection.query('SELECT * FROM post order by created_dt DESC', 
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