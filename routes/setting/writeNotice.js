const express = require('express');
const router = express.Router();

router.post('/', async (req, res, next) => {

    try{
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
        await write_notice(tittle, content, dateTime)
        res.status(200).send({status:"success",code:"0000"})
    }catch(e){
        console.log(e)
        res.status(200).send({status:"failed", code:"2222"})
    }
})

let write_notice = (tittle, content, dateTime) => {
    return new Promise((resolve, reject)=>{
        connection.query('INSERT INTO notice(tittle, content, dateTime) VALUES(?,?,?)',
        [tittle, content, dateTime],
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