var bankCtrl = require(global.modulePath('bank', 'controller'));

module.exports = [
    {
        verb: 'get',
        endpoint: '/banks',
        callback: bankCtrl.getBanks
    }
];