/**
 * generic error handler for the app
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const errorHandler = function (req, res, next) {
    res.status(500);
    let err = res.err ? res.err : 'no error provided';
    let customMessage = res.errMessage ? res.errMessage : '';
    console.error('Error: ',err);
    return res.json({
        message:'An error occured',
        error:err.message ? err.message : err,
        customMessage
    });
}

module.exports = {errorHandler};