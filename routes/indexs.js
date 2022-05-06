const router = require('express').Router()

router.router = {
    
pageRoute  : require('./routes/page'),
 joinRoute : require('./routes/user/join'),
 loginRoute : require('./routes/user/login'),
 loginCheckRoute : require('./routes/user/loginCheck'),
 logoutRoute : require('./routes/user/logout'),
 changeRoute : require('./routes/user/change'),
 managerRoute : require('./routes/user/manager'),

 registrationRoute : require('./routes/post/registration'),
 getListRoute : require('./routes/post/getList'),
 deleteRoute : require('./routes/post/delete'),
 updateRoute : require('./routes/post/update'),
 myPostRoute : require('./routes/post/myPost'),

 writeCommentRoute : require('./routes/comment/writeComment'),
 commentListRoute : require('./routes/comment/commentList'),

 writeNoticeRoute : require('./routes/setting/writeNotice'),
 noticeRoute : require('./routes/setting/notice'),
 writeQuestionRoute : require('./routes/setting/writeQuestion'),
 questionRoute : require('./routes/setting/question'),
 writeAnswerRoute : require('./routes/setting/writeAnswer'),
 answerRoute : require('./routes/setting/answer'),

 chattingRoute : require('./routes/chat/chatting'),
 chattingListRoute : require('./routes/chat/chattingList'),

 townRegistrationRoute : require('./routes/town/townRegistration'),
 listRoute : require('./routes/town/list'),
 typeListRoute : require('./routes/town/typeList'),

 fcmRoute : require('./routes/fcm/save')

}




module.exports = router;