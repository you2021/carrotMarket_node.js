const router = require('express').Router();
const aa = require('../../db/post/delete')

router.post('/', async(req, res) =>{
    const postId = req.body.postId;
    try{
        await aa.getDelete(postId)
        res.status(200).send({status:"success",code:"0000"})
    }catch(e){
        res.status(200).send({status:"failed", code:"2222"})
    }
    
})



  module.exports = router;