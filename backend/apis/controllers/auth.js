var config = require('config');
var jwt = require('jsonwebtoken');
var models = require(global.modulePath('', 'model'));
var sequelize = models.sequelize;
var UserAccount = models.UserAccount;

module.exports = {
    authenticate,
    //refreshToken
}

function authenticate(req, res) {
    var user = req.body;
    
    var _UserAccount = UserAccount.build();
    
    _UserAccount.authenticate(user).then(function(profile) {
        if (profile) {
            res.status(200).json(profile);
        }
        else{
            res.status(401).json({
                message: 'Invalid user or password'
            });
        }
    });
}

//function refreshToken(req, res) {
//    try {
//        var profile = jwt.verify(req.body.token, config.jwtSecret);
////        var token;
////        if(moment().utc().unix() - profile.iat > 30){
////            delete profile.iat;
////            delete profile.exp;
////
////            token = jwt.sign(profile, config.jwtSecret, {
////                expiresIn: config.tokenLifeTime
////            });
////        }
////        else{
////            token = req.body.token;
////        }
//
//
//        delete profile.iat;
//        delete profile.exp;
//
//        var token = jwt.sign(profile, config.jwtSecret, {
//            expiresIn: config.tokenLifeTime
//        });
//
//        res.status(200).json({ token });
//    }
//    catch (err) {
//        res.status(401).json({
//            message: 'Token expired.'
//        });
//    }
//}
