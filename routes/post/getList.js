const router = require('express').Router();
const auth = require('../auth')
const aa = require('../../db/post/getList')

router.get('/', async (req, res)=>{
    
    if(req.cookies.key == null)return res.status(401).send({status:"failed", code:"401"})
    const cookieJson = auth.decode_cookie(req.cookies.key)
    if(cookieJson == null) return res.status(401).send({status:"failed", code:"401"})
    const id = JSON.parse(cookieJson.key).id
    console.log(id)

    try{
        let cityT = await aa.get_city(id)
        let city = cityT[0].city
        let data = await aa.getList(city)
        res.status(200).send(data)
    } catch(e){
        res.status(200).send({status:"failed", code:"2222"})
    }
  })
  
  router.post('/detail', async(req, res) =>{
      const num = req.body.num;
      try{
        
          let data = await aa.getDetail(num)
          res.status(200).send(data[0])
      }catch(e){
          res.status(200).send({status:"failed", code:"2222"})
      }
      
  })
  //mysql2를 이용하되, connection pool 써라
  //pool.query(`SELECT * FROM post where city = ? order by created_dt DESC`, [city])

  module.exports = router;