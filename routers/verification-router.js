const express = require('express');
const router = express.Router();
const {checkSecret} = require('../middleware/check-secret');

router.post('/',checkSecret,(req,res,next) => {
    let {challenge} = req.body;
    res.status(200);
    return res.json({
        challenge
    });
});

module.exports = {router};