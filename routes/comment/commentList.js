const express = require('express');
const router = express.Router();

router.post('/', async(req, res) =>{
    const postId = req.body.postId;
    try{
        let data = await getCommentList(postId)
        console.log(data)
        res.status(200).send(data)
    }catch(e){
        res.status(200).send({status:"failed", code:"2222"})
    }
    
})

let getCommentList = (postId) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM comment where post_id = '${postId}'`, function(err, result){

            if(err){
                `err : ${console.log(err)}`
                reject(err)
                return
            }
        
            resolve(result);

        })
    })
}

  module.exports = router;