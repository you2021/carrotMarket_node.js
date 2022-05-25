const router = require('express').Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const auth = require('../auth')
const aa = require('../../db/post/registration')
const bb = require('../../db/post/getList')


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
        cb(null, Date.now() + path.basename(file.originalname, ext) +  ext);
      },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
  });

router.post('/', async (req, res) => {

  if(req.cookies.key == null) return res.status(200).send({status:"failed", code:"1111"})
  const cookieJson = auth.decode_cookie(req.cookies.key)
  if(cookieJson == null) return res.status(200).send({status:"failed", code:"1111"})
  const id = JSON.parse(cookieJson.key).id

    if(req.cookies.key == null) return res.status(200).send({status:"success",code:"0000"})
    if(id == null) return res.status(200).send({status:"failed", code:"1111"})
    try{
        const comment = req.body.comment;
        const price = req.body.price;
        const category = req.body.category;
        const tittle = req.body.tittle;
        const image = req.body.image

        let cityT = await bb.get_city(id)
        let city = cityT[0].city

        await aa.write_post(id, tittle, image, comment, category, price, city)
        res.status(200).send({status:"success",code:"0000"})
    }catch(e){
        console.log(e)
        res.status(200).send({status:"failed", code:"2222"})
    }
})

router.post('/thumbnail_upload', upload.array('image'), async (req, res, next) => {

  if(req.cookies.key == null) return res.status(200).send({status:"failed", code:"1111"})
  const cookieJson = auth.decode_cookie(req.cookies.key)
  if(cookieJson == null) return res.status(200).send({status:"failed", code:"1111"})
  const id = JSON.parse(cookieJson.key).id
  if(id == null) return res.status(200).send({status:"failed", code:"1111"})

  try{
     var filename = new Array()
      let length = req.files.length 
      for (var i = 0; i < length; i++) {
        filename.push(req.files[i].filename)
      }
      
      console.log(filename)
      res.status(200).send(filename)
  }catch(e){
      console.log(e)
      res.status(200).send({status:"failed", code:"2222"})
  }
})

module.exports = router;