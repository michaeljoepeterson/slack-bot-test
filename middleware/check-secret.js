const {SIGN_SECRET} = require('../config');
const crypto = require('crypto');
const tsscmp = require('tsscmp');

const checkSecret = function (req, res, next) {
    res.status(500);
    console.log(req.headers);
    try{
        const secretPassed = req.headers['x-slack-signature'];
        const requestTime = req.headers['x-slack-request-timestamp'];
        const [version,hash] = secretPassed.split('=');
        const hmac = crypto.createHmac('sha256', SIGN_SECRET);
        const base = `${version}:${requestTime}:${JSON.stringify(req.body)}`;
        hmac.update(base);
        //console.log(base);
        let isValid = tsscmp(hash, hmac.digest('hex'));
        //console.log(isValid);
        if(isValid){
            next();
        }
        else{
            return res.json({
                message:'An error occured'
            });
        }
    }
    catch(e){
        return res.json({
            message:'An error occured'
        });
    }
}

module.exports = {checkSecret};