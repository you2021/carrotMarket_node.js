const express = require('express');
const router = express.Router();
const auth = require('../auth')

router.get('/', async (req, res) => {

  if(req.cookies.key == null) return res.status(200).send({status:"failed", code:"1111"})
  const cookieJson = auth.decode_cookie(req.cookies.key)
  if(cookieJson == null) return res.status(200).send({status:"failed", code:"1111"})
  const id = JSON.parse(cookieJson.key).id

    try{
        let postNm = await postId(id)
        console.log(postNm)
        let data = await get_post(postNm)
        res.status(200).send(data)
    }catch(e){
        console.log(e)
        res.status(200).send({status:"failed", code:"2222"})
    }
})

  let postId = (id) => {
    return new Promise((resolve, reject)=>{
        connection.query(`select postId from favorite where userId="${id}"` ,
        function(err, result, fields){
            if(err){ 
                 `err : ${console.log(err)} `;
                 reject(err)
                 return
            }
            resolve(result)
        });
    })
}

let get_post = (postNm) => {
    return new Promise((resolve, reject)=>{
        connection.query(`select * from post where user_id="${postNm}" order by created_dt DESC` ,
        function(err, result, fields){
            if(err){ 
                 `err : ${console.log(err)} `;
                 reject(err)
                 return
            }
            resolve(result)
        });
    })
}



module.exports = router;