const express = require('express');
const router = express.Router();

router.post('/', async(req, res) =>{
    // const userId = req.body.userId;
    // const id = req.cookies.key;
    const comment = req.body.comment;
    const category = req.body.category;
    const price = req.body.price;
    const tittle = req.body.tittle;
    const postId = req.body.postId;

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const sec = now.getSeconds();

    const dateTime = `${year}-${month}-${date} ${hours}:${minutes}:${sec}`

    try{
        await Update(comment, dateTime, category, price, tittle, postId)
        res.status(200).send({status:"success",code:"0000"})
       
    }catch(e){
        res.status(200).send({status:"failed", code:"2222"})
    }
    
})

let Update = (comment, dateTime, category, price, tittle, postId) => {
    return new Promise((resolve, reject) => {
        connection.query(`update post set comment= "${comment}", created_dt="${dateTime}", category="${category}", price="${price}",tittle="${tittle}" where id = ${postId}`, function(err, result){

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