var config = require('config');
var models = require(global.modulePath('', 'model'));
var sequelize = models.sequelize;
var Shop = models.Shop;

module.exports = {
    getByUserAccountID,
    createOrUpdateByUserAccountID
}

function getByUserAccountID(req, res) {
    var userAccountID = req.params.userAccountID;

    var _Shop = Shop.build();
    
    _Shop.getByUserAccountID(userAccountID).then(function(shop) {
        res.status(200).json(shop);
    });
}

function createOrUpdateByUserAccountID(req, res) {
    var userAccountID = req.params.userAccountID;
    var shopInfo = req.body;
    
    var _Shop = Shop.build();
    
    _Shop.getByUserAccountID(userAccountID).then(function(shop) {
        if (!shop) {
            _Shop.createByUserAccountID(userAccountID, shopInfo).then(function(result) {
                res.status(200).json(result);
            });
        }
        else{
            _Shop.updateByUserAccountID(userAccountID, shopInfo).then(function(result) {
                res.status(200).json(result);
            });
        }
    });
}