const express = require('express');
const router = express.Router();
const auth = require('../auth')
 
router.post('/',  async (req, res) => {
    let id = req.body.id
    let pw = req.body.pw

    //검증
    const check = await login_query(id, auth.encrypt_string(pw));
    if(check.length == 0) return res.status(200).send({status:"failed", code:"1111"})
    const checkId = req.cookies.key
    let cookieKey = auth.sign_cookie({"id" : ui_id , "name": ui_name});
    res.cookie('key',cookieKey , {
        maxAge: 1000 * 60 * 60 * 4,   // 4
        httpOnly:true
      });
    // let name = check[0].ui_name
    // let cookieJosn = auth.sign_cookie({"id" : id , "name": name});
   
    res.status(200).send({status:"success", code:"0000", id:checkId})
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
          console.log(`result :  ${result}`)
          resolve(result);
      });
  })
}

module.exports = router;