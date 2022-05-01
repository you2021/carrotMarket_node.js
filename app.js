const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');
const mysql = require('mysql');

let connection =  mysql.createConnection({
  host : 'ls-8edb8d868883759ca9ce1bac8fbe615d76b2a0f8.cwgg3gicmqf1.ap-northeast-2.rds.amazonaws.com',
  user : 'master',
  password : '1004sky^^',
  database : 'TESTDB'
});
global.connection = connection

const dotenv = require('dotenv').config() 

const pageRoute = require('./routes/page');

const joinRoute = require('./routes/user/join');
const loginRoute = require('./routes/user/login');
const loginCheckRoute = require('./routes/user/loginCheck');
const logoutRoute = require('./routes/user/logout');
const changeRoute = require('./routes/user/change');
const managerRoute = require('./routes/user/manager');

const registrationRoute = require('./routes/post/registration');
const getListRoute = require('./routes/post/getList');
const deleteRoute = require('./routes/post/delete');
const updateRoute = require('./routes/post/update');
const myPostRoute = require('./routes/post/myPost');

const writeCommentRoute = require('./routes/comment/writeComment');
const commentListRoute = require('./routes/comment/commentList');

const writeNoticeRoute = require('./routes/setting/writeNotice');
const noticeRoute = require('./routes/setting/notice');
const writeQuestionRoute = require('./routes/setting/writeQuestion');
const questionRoute = require('./routes/setting/question');
const writeAnswerRoute = require('./routes/setting/writeAnswer');
const answerRoute = require('./routes/setting/answer');

const chattingRoute = require('./routes/chat/chatting');
const chattingListRoute = require('./routes/chat/chattingList');

const townRegistrationRoute = require('./routes/town/townRegistration');
const listRoute = require('./routes/town/list');
const typeListRoute = require('./routes/town/typeList');

const fcmRoute = require('./routes/fcm/save');

const app = express();

const server = require('http').createServer(app)
server.listen(80, ()=>{
  console.log("listen 80 http")
})
const io = require('socket.io')
const socket_io = io(server);
const socket = require('./socket')(socket_io)
const auth = require('./routes/auth')

// const kocket = require('./socket')(socket_io)

app.get('/image/:name', (req, res)=>{
  console.log("image request")
  var img = fs.readFileSync('./images/'+req.params.name);
  res.writeHead(200, {'Content-Type': 'image/jpg' });
  res.end(img, 'binary');
});
app.use(express.urlencoded({extended: false}))
app.use(express.json({limit:"50mb"}))
app.use(cookieParser(process.env.COOKIE_SECRET));
// app.use(session({
//   resave: false,
//   saveUninitialized: false,
//   secret: process.env.COOKIE_SECRET,
//   cookie: {
//     httpOnly: true,
//     secure: false,
//   },
// }));
 

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
app.use('/', pageRoute);

app.use('/join', joinRoute);
app.use('/login', loginRoute);
app.use('/loginCheck', loginCheckRoute);
app.use('/logout', logoutRoute);
app.use('/change', changeRoute);
app.use('/manager', managerRoute);

app.use('/registration', registrationRoute);
app.use('/getList', getListRoute);
app.use('/update', updateRoute);
app.use('/delete', deleteRoute);
app.use('/myPost', myPostRoute);

app.use('/writeComment', writeCommentRoute);
app.use('/commentList', commentListRoute);

app.use('/writeNotice', writeNoticeRoute);
app.use('/notice', noticeRoute);
app.use('/writeQuestion', writeQuestionRoute);
app.use('/question', questionRoute);
app.use('/writeAnswer', writeAnswerRoute);
app.use('/answer', answerRoute);

app.use('/socket', socket);

app.use('/chatting', chattingRoute);
app.use('/chattingList', chattingListRoute);

app.use('/townRegistration', townRegistrationRoute);
app.use('/list', listRoute);
app.use('/typeList', typeListRoute);

app.use('/save', fcmRoute);



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
