const express = require('express');
const router = express.Router();
const auth = require('../auth')

router.post('/', async (req, res, next) => {

    const ui_id = req.body.ui_id
    const ui_pw = req.body.ui_pw
    const ui_name = req.body.ui_name
    const city = req.body.city

    try {
        const result = await idCheck(ui_id)
        if(result.length == 1) return res.status(200).send({status:"failed", code:"2222"})
        await write_join(ui_id, auth.encrypt_string(ui_pw), ui_name, city)
        let cookieJosn = JSON.stringify({"id" : ui_id , "name": ui_name});
        res.cookie('key',auth.sign_cookie(cookieJosn) , {
            maxAge: 60 * 60 * 1000 * 4,  // 4시간
            httpOnly:true
         });
        res.status(200).send({status:"success",code:"0000"})
    }catch(e){
        console.log(e.message)
        res.status(200).send({status:"failed", code:"3333"})
    }
})

let write_join = (ui_id, ui_pw, ui_name, city) => {
    return new Promise((resolve, reject)=>{
        connection.query('INSERT INTO user_info(ui_id, ui_pw, ui_name, city) VALUES(?,?,?,?)',
        [ui_id, ui_pw, ui_name, city],
        function(err, result){
            if(err){ 
                 `err : ${console.log(err)} `;
                 reject(err)
                 return
            }
            resolve()
        });
    })
}

let idCheck = (id) => {
    return new Promise((resolve, reject)=>{
        connection.query(`select ui_id from user_info where ui_id = '${id}' `,
        function(err, result){
            if(err){ 
                 `err : ${console.log(err)} `;
                 reject(err)
                 return
            }
            resolve(result);
        });
    })
  }



module.exports = router;