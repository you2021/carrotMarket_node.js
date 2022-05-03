const admin = require('firebase-admin')
let serAccount = require('../../fcmproject-c5d53-firebase-adminsdk-481yq-e48548a457.json')
const express = require('express')
const router = express.Router()

admin.initializeApp({
    credential: admin.credential.cert(serAccount),
  })

  router.post('/', async (req, res) => {

    try{
        const id = req.body.id
        const fcm = await get_fcm(id)

        let message = {
            data: {
              title: 'carrotMarket',
              body: '새로운 메세지가 왔습니다.',
            },
            token: fcm,
          }

          admin
          .messaging()
          .send(message)
          .then(function (response) {
            console.log('Successfully sent message: : ', response)
          })
          .catch(function (err) {
            console.log('Error Sending message!!! : ', err)
          })

          res.status(200).send({status:"success",code:"0000"})
        
    }catch(e){
        console.log(e)
        res.status(200).send({status:"fail",code:"1111"})
    }
})

let get_fcm = (id) => {
    return new Promise((resolve, reject)=>{
        connection.query(`select fcmNo from fcmInfo where id = "${id}"`,
        function(err, result, fields){
            if(err){ 
                 `err : ${console.log(err)} `;
                 reject(err)
                 console.log(err)
                 return
            }
        
            resolve(result)
        });
    })
}

module.exports = router;

