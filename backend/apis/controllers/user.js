var config = require('config');
var jwt = require('jsonwebtoken');
var models = require(global.modulePath('', 'model'));
var sequelize = models.sequelize;
var UserAccount = models.UserAccount;

module.exports = {
    create
}

function create(req, res){
    var userAccountInfo = req.body;
    
    var _UserAccount = UserAccount.build();
    
    _UserAccount.create(userAccountInfo).then(function(profile) {
        res.status(200).json(profile);
    });
}