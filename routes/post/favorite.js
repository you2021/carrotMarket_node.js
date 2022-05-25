const router = require('express').Router();
const auth = require('../auth')
const aa = require('../../db/post/favorite')


router.post('/', async (req, res) => {

  if(req.cookies.key == null) return res.status(200).send({status:"failed", code:"1111"})
  const cookieJson = auth.decode_cookie(req.cookies.key)
  if(cookieJson == null) return res.status(200).send({status:"failed", code:"1111"})
  const id = JSON.parse(cookieJson.key).id

    try{
        const check = req.body.check
        const postId = req.body.postId
        
        await aa.write_favorite(postId, check, id)
    
        res.status(200).send({status:"success",code:"0000"})
    }catch(e){
        console.log(e)
        res.status(200).send({status:"failed", code:"2222"})
    }
})

router.post('/check', async (req, res) => {

    if(req.cookies.key == null) return res.status(200).send({status:"failed", code:"1111"})
    const cookieJson = auth.decode_cookie(req.cookies.key)
    if(cookieJson == null) return res.status(200).send({status:"failed", code:"3333"})
    const id = JSON.parse(cookieJson.key).id
  
    const postId = req.body.postId
    
      try{
          const data = await aa.favorite_check(id, postId)
          const check = data[0].check_in
          if(check == 'true')res.status(200).send({status:"success",code:"0000"})
          else res.status(200).send({status:"failed",code:"3333"})
      }catch(e){
          console.log(e)
          res.status(200).send({status:"failed", code:"2222"})
      }
  })

  router.post('/delete', async (req, res) => {

    if(req.cookies.key == null) return res.status(200).send({status:"failed", code:"1111"})
    const cookieJson = auth.decode_cookie(req.cookies.key)
    if(cookieJson == null) return res.status(200).send({status:"failed", code:"3333"})
  
    const postId = req.body.postId
      try{
          await aa.favorite_delete(postId)
          res.status(200).send({status:"success",code:"0000"})
      }catch(e){
          console.log(e)
          res.status(200).send({status:"failed", code:"2222"})
      }
  })

module.exports = router;