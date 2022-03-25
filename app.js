const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');
const mysql = require('mysql');

let connection =  mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '1004sky^^',
  database : 'testdb'
});
global.connection = connection

const dotenv = require('dotenv').config() 

const pageRoute = require('./routes/page');

const joinRoute = require('./routes/user/join');
const loginRoute = require('./routes/user/login');
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

const app = express();
const server = require('http').createServer(app)
server.listen(4000, ()=>{
  console.log("listen 4000 http")
})
const io = require('socket.io')
const socket_io = io(server);
require('./socket')(socket_io)
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
 
app.use('/', pageRoute);

app.use('/join', joinRoute);
app.use('/login', loginRoute);
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