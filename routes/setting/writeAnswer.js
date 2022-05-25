const router = require('express').Router();
const aa = require('../../db/setting/answer')


router.post('/', async (req, res, next) => {
    try{
        const content = req.body.content;
        const no = req.body.no;

        await aa.write_answer(no, content)
        res.status(200).send({status:"success",code:"0000"})
    }catch(e){
        console.log(e)
        res.status(200).send({status:"failed", code:"2222"})
    }
})


module.exports = router;