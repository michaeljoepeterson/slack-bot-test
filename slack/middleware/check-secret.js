const {SIGN_SECRET} = require('../../config');
const crypto = require('crypto');
const tsscmp = require('tsscmp');

/**
 * handle secret checks for validating slack request
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const checkSecret = function (req, res, next) {
    try{
        const secretPassed = req.headers['x-slack-signature'];
        const requestTime = req.headers['x-slack-request-timestamp'];
        const [version,hash] = secretPassed.split('=');
        const hmac = crypto.createHmac('sha256', SIGN_SECRET);
        const base = `${version}:${requestTime}:${JSON.stringify(req.body)}`;
        hmac.update(base);
        let isValid = tsscmp(hash, hmac.digest('hex'));
        if(isValid){
            next();
        }
        else{
            res.status(500);
            return res.json({
                message:'An error occured'
            });
        }
    }
    catch(e){
        res.status(500);
        return res.json({
            message:'An error occured'
        });
    }
}

module.exports = {checkSecret};