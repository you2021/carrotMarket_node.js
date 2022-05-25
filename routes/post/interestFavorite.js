const router = require('express').Router();
const auth = require('../auth')
const aa = require('../../db/post/interestFavorite')


router.get('/', async (req, res) => {

  if(req.cookies.key == null) return res.status(200).send({status:"failed", code:"1111"})
  const cookieJson = auth.decode_cookie(req.cookies.key)
  if(cookieJson == null) return res.status(200).send({status:"failed", code:"1111"})
  const id = JSON.parse(cookieJson.key).id

    try{
        let data = await aa.get_favorite()
        res.status(200).send(data)
    }catch(e){
        console.log(e)
        res.status(200).send({status:"failed", code:"2222"})
    }
})

module.exports = router;