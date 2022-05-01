const express = require('express');
const router = express.Router();
const auth = require('../auth')

router.post('/', async (req, res)=>{

    if(req.cookies.key == null)return res.status(401).send({status:"failed", code:"401"})
    const cookieJson = auth.decode_cookie(req.cookies.key)
    if(cookieJson == null) return res.status(401).send({status:"failed", code:"401"})
    const ui_id = JSON.parse(cookieJson.key).id
    const ui_pw = req.body.ui_pw;
    const ui_name = req.body.ui_name;

    try{
        await getUpdateUserInfo(ui_id, auth.encrypt_string(ui_pw), ui_name)  
        res.status(200).send({status:"seccess", code:"2222"})
    } catch(e){
        res.status(200).send({status:"failed", code:"2222"})
    }
  })

  router.post('/updateCity', async (req, res)=>{

    if(req.cookies.key == null)return res.status(401).send({status:"failed", code:"401"})
    const cookieJson = auth.decode_cookie(req.cookies.key)
    if(cookieJson == null) return res.status(401).send({status:"failed", code:"401"})
    const ui_id = JSON.parse(cookieJson.key).id
    const city = req.body.city;

    try{
        await getUpdateUserInfoCity(ui_id, city)  
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

let getUpdateUserInfoCity = (ui_id, city) => {
    return new Promise((resolve, reject) => {
        connection.query(`update user_info set city="${city}" where ui_id= "${ui_id}" `, 
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