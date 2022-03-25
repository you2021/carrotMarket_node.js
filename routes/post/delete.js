const express = require('express');
const router = express.Router();


router.post('/', async(req, res) =>{
    const postId = req.body.postId;
    try{
        await getDelete(postId)
        res.status(200).send({status:"success",code:"0000"})
    }catch(e){
        res.status(200).send({status:"failed", code:"2222"})
    }
    
})

let getDelete = (postId) => {
    return new Promise((resolve, reject) => {
        connection.query(`delete from post where id = ${postId}`, async function(err, result){

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