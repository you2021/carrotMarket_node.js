const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');

const dotenv = require('dotenv').config() 

require('./db/index')

const app = express();

const server = require('http').createServer(app)
server.listen(80, ()=>{
  console.log("listen 80 http")
})
const io = require('socket.io')
const socket_io = io(server);
const socket = require('./socket')(socket_io)
const auth = require('./routes/auth')

app.get('/image/:name', (req, res)=>{
  console.log("image request")
  var img = fs.readFileSync('./images/'+req.params.name);
  res.writeHead(200, {'Content-Type': 'image/jpg' });
  res.end(img, 'binary');
});
app.use(express.urlencoded({extended: false}))
app.use(express.json({limit:"50mb"}))
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use((req,res,next)=>{
  if(req.originalUrl.startsWith("/login") || req.originalUrl.startsWith("/join")){
    return next()
  }

  if(req.cookies.key == null)return res.status(401).send({status:"failed", code:"401"})
  const cookieJson = auth.decode_cookie(req.cookies.key)
  if(cookieJson == null) return res.status(401).send({status:"failed", code:"401"})
  req.udata = cookieJson
  next()
})

app.use('/socket', socket);
app.use(require('./routes/indexs'))

app.use((req, res, next) => {
    const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
  });
  
  app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    console.log(err)
    res.render('error');
  });


  let fs = require('fs')
  let options = {
    key: fs.readFileSync('./rootca.key'),
    cert: fs.readFileSync('./rootca.crt')
  }
  require('https').createServer(options, app).listen(4001,()=>{
    console.log("listen 4001 https")
  })


  process.on('uncaughtException', (er)=>{
    console.log(er)
  })
