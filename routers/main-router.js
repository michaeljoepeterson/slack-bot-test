const express = require('express');
const rateLimit = require("express-rate-limit");
const router = express.Router();
const {router: verificationRouter} = require('./verification-router');

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 80,
    message:'An error occured.'
});

router.use(limiter);
router.use('/verify',verificationRouter);

module.exports = {router};