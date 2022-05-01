const router = require('express').Router();

router.post('/', async(req, res)=> {

    const roomKey = req.body.roomKey
    const room = `chat_p_${roomKey}`
    console.log(room)

    try{
        let data = await getList(room)
        res.status(200).send(data)
    } catch(e){
        res.status(200).send({status:"failed", code:"2222"})
    }

})

let getList = (room) => {
    return new Promise((resolve, reject) => {
        connection.query(`select * from chat_user where room = "${room}" order by dateTime asc`,
                function(err, result){

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