var userCtrl = require(global.modulePath('user', 'controller'));

module.exports = [
    {
        verb: 'post',
        endpoint: '/users',
        callback: userCtrl.create
    }
];