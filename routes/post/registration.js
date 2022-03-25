const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

try {
    fs.readdirSync('images');
  } catch (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('images');
  }

  let upload = multer({
    storage: multer.diskStorage({
      destination(req, file, cb) {
        console.log("dest",file)
        cb(null, 'images' );
      },
      filename(req, file, cb) {
        console.log("fn", file)
        const ext = path.extname(file.originalname);
        cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
      },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
  });

router.post('/', async (req, res) => {

    const cookieJson = JSON.parse(req.cookies.key)
    let id = cookieJson.id

    if(req.cookies.key == null) return res.status(200).send({status:"success",code:"0000"})
    if(id == null) return res.status(200).send({status:"failed", code:"1111"})
    try{
        const comment = req.body.comment;
        const price = req.body.price;
        const category = req.body.category;
        const tittle = req.body.tittle;
        const image = req.body.image_name

        let dateTime = (require('../../utility/util')).getTime()
        await write_post(id, comment, dateTime, category, price, tittle, image)
        res.status(200).send({status:"success",code:"0000"})
    }catch(e){
        console.log(e)
        res.status(200).send({status:"failed", code:"2222"})
    }
})

let write_post = (id, comment, dateTime, category, price, tittle, image) => {
    return new Promise((resolve, reject)=>{
        connection.query('INSERT INTO post(user_id, comment, created_dt, category, price, tittle, image) VALUES(?,?,?,?,?,?,?)',
        [id,comment,dateTime, category, price, tittle, image],
        function(err, rows, fields){
            if(err){ 
                 `err : ${console.log(err)} `;
                 reject(err)
                 return
            }
            `rows.name : ${console.log(rows.name)}`;
            // connection.end();
            resolve()
        });
    })
}


router.post('/thumbnail_upload', upload.single('image'), async (req, res, next) => {
  const cookieJson = JSON.parse(req.cookies.key)
  let id = cookieJson.id
  if(req.cookies.key == null) return res.status(200).send({status:"success",code:"0000"})
  if(id == null) return res.status(200).send({status:"failed", code:"1111"})
  try{
      let filename = req.file.filename 
      res.status(200).send({status:"success",code:"0000", filename})
  }catch(e){
      console.log(e)
      res.status(200).send({status:"failed", code:"2222"})
  }
})

module.exports = router;