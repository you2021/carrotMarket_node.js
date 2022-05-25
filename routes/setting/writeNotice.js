const router = require('express').Router();
const aa = require('../../db/setting/notice')


router.post('/', async (req, res, next) => {

    try{
        const tittle = req.body.tittle;
        const content = req.body.content;

        await aa.write_notice(tittle, content)
        res.status(200).send({status:"success",code:"0000"})
    }catch(e){
        console.log(e)
        res.status(200).send({status:"failed", code:"2222"})
    }
})



module.exports = router;