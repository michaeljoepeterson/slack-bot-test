/**
 * if slack is sending a challenge request handle it
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const handleChallenge = (req,res,next) => {
    let {challenge} = req.body;
    if(!challenge){
        next();
    }
    else{
        return res.json({
            challenge
        });
    }

}

module.exports = {handleChallenge};