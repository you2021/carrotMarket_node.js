const router = require('express').Router();
const auth = require('../auth')
const aa = require('./join_class')

router.post('/', async (req, res, next) => {

    const ui_id = req.body.ui_id
    const ui_pw = req.body.ui_pw
    const ui_name = req.body.ui_name
    const city = req.body.city

    console.log(ui_id, ui_pw, ui_name, city);

    try {
        const result = await aa.idCheck(ui_id)
        if(result.length == 1) return res.status(200).send({status:"failed", code:"2222"})
        await aa.write_join(ui_id, auth.encrypt_string(ui_pw), ui_name, city)
        res.status(200).send({status:"success",code:"0000"})
    }catch(e){
        console.log(e.message)
        res.status(200).send({status:"failed", code:"3333"})
    }
})

module.exports = router;