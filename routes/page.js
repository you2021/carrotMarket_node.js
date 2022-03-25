const express = require('express');
const path = require('path');  // 경로
const router = express.Router();

const app = express();

router.get('/', (req, res) => {
    console.log("a")
    res.sendFile(path.join(__dirname, '../views/home.html'));

})
router.get('/registration_page',  async (req, res, next) => {
    const id = req.cookies.key;
    if(id==null) return res.sendFile(path.join(__dirname, '../views/home.html'));
    res.sendFile(path.join(__dirname, '../views/registration.html'));
})

module.exports = router;