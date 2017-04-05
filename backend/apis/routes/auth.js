var authCtrl = require(global.modulePath('auth', 'controller'));

module.exports = [
    {
        verb: 'post',
        endpoint: '/authenticate',
        callback: authCtrl.authenticate
    },
    //{
    //    verb: 'post',
    //    endpoint: '/refreshToken',
    //    callback: authCtrl.refreshToken
    //}
];
