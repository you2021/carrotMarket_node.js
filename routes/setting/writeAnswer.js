const express = require('express');
const router = express.Router();

router.post('/', async (req, res, next) => {
    try{
        const content = req.body.content;
        const no = req.body.no;

        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const date = now.getDate();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const sec = now.getSeconds();

        const dateTime = `${year}-${month}-${date} ${hours}:${minutes}:${sec}`
        await write_answer(no, content, dateTime)
        res.status(200).send({status:"success",code:"0000"})
    }catch(e){
        console.log(e)
        res.status(200).send({status:"failed", code:"2222"})
    }
})

let write_answer = (no,content, dateTime) => {
    return new Promise((resolve, reject)=>{
        connection.query('INSERT INTO answer(no, content, dateTime) VALUES(?,?,?)',
        [no, content, dateTime],
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