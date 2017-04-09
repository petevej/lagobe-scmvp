var models = require(global.modulePath('', 'model'));
var sequelize = models.sequelize;
var Bank = models.Bank;

module.exports = {
    getBanks
}

function getBanks(req, res) {
    var _Bank = Bank.build();
    
    _Bank.getBanks().then(function(bank) {
        res.status(200).json(bank);
    });
}