const express = require('express');
const router = express.Router();
const auth = require('../auth')


router.get('/', async (req, res)=>{
    
    if(req.cookies.key == null)return res.status(401).send({status:"failed", code:"401"})
    const cookieJson = auth.decode_cookie(req.cookies.key)
    if(cookieJson == null) return res.status(401).send({status:"failed", code:"401"})
    const id = JSON.parse(cookieJson.key).id
    console.log(id)

    try{
        let cityT = await get_city(id)
        let city = cityT[0].city
        let data = await getList(city)
        console.log(data)
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
  
  let getList = (city) => {
      return new Promise((resolve, reject) => {
          connection.query(`SELECT * FROM post where city = "${city}" order by created_dt DESC`, 
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

  let get_city = (id) => {
    return new Promise((resolve, reject) => {
        connection.query(`select city from user_info where ui_id="${id}"`, 
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