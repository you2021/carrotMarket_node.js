const express = require('express');
const router = express.Router();
const auth = require('../auth')

router.post('/', async (req, res)=>{

    const cookieJson = JSON.parse(req.cookies.key)
    const ui_id = cookieJson.id;
    const ui_pw = req.body.ui_pw;
    const ui_name = req.body.ui_name;

    try{
        await getUpdateUserInfo(ui_id, auth.encrypt_string(ui_pw), ui_name)  
        res.status(200).send({status:"seccess", code:"2222"})
    } catch(e){
        res.status(200).send({status:"failed", code:"2222"})
    }
  })

let getUpdateUserInfo = (ui_id, ui_pw, ui_name) => {
    return new Promise((resolve, reject) => {
        connection.query(`update user_info set ui_pw="${ui_pw}", ui_name="${ui_name}" where ui_id= "${ui_id}" `, 
        function(err, result){

            if(err){
                `err : ${console.log(err)}`
                reject(err)
                return
            }

            resolve();

        })
    })
}

module.exports = router;