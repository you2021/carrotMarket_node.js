const express = require('express');
const router = express.Router();

router.post('/', async (req, res, next) => {

    if(req.cookies.key == null)return res.status(401).send({status:"failed", code:"401"})
    const cookieJson = auth.decode_cookie(req.cookies.key)
    if(cookieJson == null) return res.status(401).send({status:"failed", code:"401"})
    const id = JSON.parse(cookieJson.key).id
    
    if(userId == null) return res.status(200).send({status:"failed", code:"1111"})
    const comment = req.body.comment;
    const postId = req.body.postId

    try {
        await write_comment( postId ,userId, comment)
        res.status(200).send({status:"success",code:"0000"})
    }catch(e){
        res.status(200).send({status:"failed", code:"2222"})
    }
})

let write_comment = (postId, userId, comment) => {
    return new Promise((resolve, reject)=>{
        connection.query('INSERT INTO comment(post_id, user_id, comment) VALUES(?,?,?)',
        [postId, userId, comment],
        function(err, result, fields){
            if(err){ 
                 `err : ${console.log(err)} `;
                 reject(err)
                 return
            }
            resolve()
        });
    })
}

  module.exports = router;