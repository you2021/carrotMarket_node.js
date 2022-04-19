const router = require('express').Router();
const auth = require('../auth')

router.get('/', async(req, res)=> {

    if(req.cookies.key == null)return res.status(401).send()
    const cookieJson = auth.decode_cookie(req.cookies.key)
    const id = cookieJson.id
    console.log(id)

    try{
        let data = await getList(id)
        console.log(data)
        res.status(200).send(data)
    } catch(e){
        res.status(200).send({status:"failed", code:"2222"})
    }

})

let getList = (id) => {
    return new Promise((resolve, reject) => {
        connection.query(`select * from chat_room where my_id = "${id}" or your_id ="${id}"`,
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