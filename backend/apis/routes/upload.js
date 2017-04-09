var uploadCtrl = require(global.modulePath('upload', 'controller'));

module.exports = [
    {
        verb: 'post',
        endpoint: '/upload/:userAccountID',
        callback: uploadCtrl.uploadFile
    }
];