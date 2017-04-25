var mailCtrl = require(global.modulePath('mail', 'controller'));

module.exports = [
    {
        verb: 'post',
        endpoint: '/mail',
        callback: mailCtrl.sendMail
    }
];