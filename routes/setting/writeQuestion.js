const express = require('express');
const router = express.Router();

router.post('/', async (req, res, next) => {
    try{
        const cookieJson = JSON.parse(req.cookies.key)
        console.log(req.cookies.key)
        const id = cookieJson.id

        const tittle = req.body.tittle;
        const content = req.body.content;

        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const date = now.getDate();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const sec = now.getSeconds();

        const dateTime = `${year}-${month}-${date} ${hours}:${minutes}:${sec}`
        await write_question(id, tittle, content, dateTime)
        res.status(200).send({status:"success",code:"0000"})
    }catch(e){
        console.log(e)
        res.status(200).send({status:"failed", code:"2222"})
    }
})

let write_question = (user_id, tittle, content, dateTime) => {
    return new Promise((resolve, reject)=>{
        connection.query('INSERT INTO question(user_id, tittle, content, dateTime) VALUES(?,?,?,?)',
        [user_id,tittle, content, dateTime],
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

module.exports = router;