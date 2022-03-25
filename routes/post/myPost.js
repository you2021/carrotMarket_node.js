const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
    const cookieJson = JSON.parse(req.cookies.key)
    const id = cookieJson.id;
   
    try{
        if(id == null) return res.status(200).send({status:"failed", code:"1111"})

       const data =  await my_post(id)
        res.status(200).send(data)
    }catch(e){
        console.log(e)
        res.status(200).send({status:"failed", code:"2222"})
    }
})

let my_post = (id) => {
    return new Promise((resolve, reject)=>{
        connection.query(`select * from post where user_id="${id}"` ,
        function(err, result, fields){
            if(err){ 
                 `err : ${console.log(err)} `;
                 reject(err)
                 return
            }
            console.log(result)
            resolve(result)
        });
    })
}

module.exports = router;