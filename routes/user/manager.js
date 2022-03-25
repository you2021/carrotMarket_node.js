const express = require('express');
const router = express.Router();

router.get('/', async (req, res)=>{

    const cookieJson = JSON.parse(req.cookies.key)
    const ui_id = cookieJson.id;
    
    try{
        const manager = await knowManager(ui_id)  
        res.status(200).send(manager)
    } catch(e){
        res.status(200).send({status:"failed", code:"2222"})
    }
  })

let knowManager = (ui_id) => {
    return new Promise((resolve, reject) => {
        connection.query(`select manager from user_info where ui_id = "${ui_id}"`, 
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