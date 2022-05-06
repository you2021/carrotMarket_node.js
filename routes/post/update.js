const router = require('express').Router();
const aa = require('./updare_class')


router.post('/', async(req, res) =>{
    
    const comment = req.body.comment;
    const category = req.body.category;
    const price = req.body.price;
    const tittle = req.body.tittle;
    const postId = req.body.postId;

    let dateTime = require('../../utility/util').getTime()

    try{
        await aa.Update(comment, dateTime, category, price, tittle, postId)
        res.status(200).send({status:"success",code:"0000"})
       
    }catch(e){
        res.status(200).send({status:"failed", code:"2222"})
    }
    
})


  module.exports = router;