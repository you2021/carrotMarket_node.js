const express = require('express');
const router = express.Router();
const auth = require('../auth')
 
router.post('/',  async (req, res) => {
    let id = req.body.id
    let pw = req.body.pw

    //검증
    const check = await login_query(id, auth.encrypt_string(pw));
    if(check.length == 0) return res.status(200).send({status:"failed", code:"1111"})
    let name = check[0].ui_name
    let cookieJosn = JSON.stringify({"id" : id , "name": name});
    res.cookie('key',auth.sign_cookie(cookieJosn) , {
      maxAge: 60 * 60 * 1000 * 4,  // 4시간
      httpOnly:true
    });

    res.status(200).send({status:"success", code:"0000", cookie : auth.sign_cookie(cookieJosn)})
})

let login_query = (id, pass) => {
  return new Promise((resolve, reject)=>{
      connection.query(`select ui_name from user_info where ui_id = '${id}' and ui_pw='${pass}'  `,
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