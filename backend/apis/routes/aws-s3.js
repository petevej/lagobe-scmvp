var awsS3Ctrl = require(global.modulePath('aws-s3', 'controller'));

module.exports = [
    {
        verb: 'get',
        endpoint: '/awsS3/url',
        callback: awsS3Ctrl.getSignedUrl
    },
    {
        verb: 'post',
        endpoint: '/awsS3/upload/:userAccountID',
        callback: awsS3Ctrl.uploadFile
    }
];