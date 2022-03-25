const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.clearCookie();
    res.status(200).send({status:"success", code:"0000"})
})

module.exports = router;