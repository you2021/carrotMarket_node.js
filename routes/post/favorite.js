const express = require('express');
const router = express.Router();
const auth = require('../auth')

router.post('/', async (req, res) => {

  if(req.cookies.key == null) return res.status(200).send({status:"failed", code:"1111"})
  const cookieJson = auth.decode_cookie(req.cookies.key)
  if(cookieJson == null) return res.status(200).send({status:"failed", code:"1111"})
  const id = JSON.parse(cookieJson.key).id

    try{
        const check = req.body.check
        const postId = req.body.postId
        
        await write(postId, check, id)
    
        res.status(200).send({status:"success",code:"0000"})
    }catch(e){
        console.log(e)
        res.status(200).send({status:"failed", code:"2222"})
    }
})

router.post('/check', async (req, res) => {

    if(req.cookies.key == null) return res.status(200).send({status:"failed", code:"1111"})
    const cookieJson = auth.decode_cookie(req.cookies.key)
    if(cookieJson == null) return res.status(200).send({status:"failed", code:"3333"})
    const id = JSON.parse(cookieJson.key).id
  
    const postId = req.body.postId
    console.log("check")
    console.log(postId)
      try{
          const data = await favorite_check(id, postId)
          const check = data[0].check_in
          if(check == 'true')res.status(200).send({status:"success",code:"0000"})
          else res.status(200).send({status:"failed",code:"3333"})
      }catch(e){
          console.log(e)
          res.status(200).send({status:"failed", code:"2222"})
      }
  })

  router.post('/delete', async (req, res) => {

    if(req.cookies.key == null) return res.status(200).send({status:"failed", code:"1111"})
    const cookieJson = auth.decode_cookie(req.cookies.key)
    if(cookieJson == null) return res.status(200).send({status:"failed", code:"3333"})
  
    const postId = req.body.postId
      try{
          await favorite_delete(postId)
          res.status(200).send({status:"success",code:"0000"})
      }catch(e){
          console.log(e)
          res.status(200).send({status:"failed", code:"2222"})
      }
  })

let write = (postId, check, userId) => {
    return new Promise((resolve, reject)=>{
        connection.query(`INSERT INTO favorite(postId, check_in, userId) VALUES("${postId}","${check}","${userId}")`,
        function(err, rows, fields){
            if(err){ 
                 `err : ${console.log(err)} `;
                 reject(err)
                 console.log(err)
                 return
            }
          
            resolve()
        });
    })
}

let favorite_check = (id, postId) => {
    return new Promise((resolve, reject)=>{
        console.log(id, postId)
        connection.query(`select check_in from favorite where userId="${id}" and postId="${postId}"`,
        function(err, result){
            if(err){ 
                 `err : ${console.log(err)} `;
                 reject(err)
                 console.log(err)
                 return
            }
            console.log(result)
          
            resolve(result)
        });
    })
}

let favorite_delete = (postId) => {
    return new Promise((resolve, reject)=>{
        connection.query(`DELETE FROM favorite where postId="${postId}" `,
        function(err, rows, fields){
            if(err){ 
                 `err : ${console.log(err)} `;
                 reject(err)
                 console.log(err)
                 return
            }
          
            resolve()
        });
    })
}



module.exports = router;