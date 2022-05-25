const router = require('express').Router()


router.use('/', require('./page'))

router.use('/join', require('./user/join'))
router.use('/join', require('./user/login'))
router.use('/loginCheck', require('./user/loginCheck'))
router.use('/logout', require('./user/logout'))
router.use('/change', require('./user/change'))
router.use('/manager', require('./user/manager'))

router.use('/registration', require('./post/registration'))
router.use('/getList', require('./post/getList'))
router.use('/delete', require('./post/delete'))
router.use('/update', require('./post/update'))
router.use('/myPost', require('./post/myPost'))
router.use('/favorite', require('./post/favorite'))
router.use('/interestFavorite', require('./post/interestFavorite'))

router.use('/writeComment', require('./comment/writeComment'))
router.use('/commentList', require('./comment/commentList'))

router.use('/writeNotice', require('./setting/writeNotice'))
router.use('/notice', require('./setting/notice'))
router.use('/writeQuestion', require('./setting/writeQuestion'))
router.use('/question', require('./setting/question'))
router.use('/writeAnswer', require('./setting/writeAnswer'))
router.use('/answer', require('./setting/answer'))

router.use('/chatting', require('./chat/chatting'))
router.use('/chattingList', require('./chat/chattingList'))
router.use('/chatRoomSave', require('./chat/chatRoomSave'))
router.use('/chatCommentSave', require('./chat/chatCommentSave'))

router.use('/townRegistration', require('./town/townRegistration'))
router.use('/list', require('./town/list'))
router.use('/typeList', require('./town/typeList'))

router.use('/save', require('./fcm/save'))
router.use('/fcm', require('./fcm/fcm'))

module.exports = router;