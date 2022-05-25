const router = require('express').Router()
const aa = require('../../db/comment/comment')


router.post('/', async(req, res) =>{
    const postId = req.body.postId;
    try{
        let data = await aa.getCommentList(postId)
        console.log(data)
        res.status(200).send(data)
    }catch(e){
        res.status(200).send({status:"failed", code:"2222"})
    }
    
})

  module.exports = router;