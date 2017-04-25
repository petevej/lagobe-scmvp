var config = require('config');
var multer  = require('multer'),
    multerS3 = require('multer-s3'),
    AWS = require('aws-sdk');
    
var s3 = new AWS.S3({
    accessKeyId: config.aws.accessKeyID,
    secretAccessKey: config.aws.secretAccessKey,
    region: config.aws.region
});

module.exports = {
    getSignedUrl,
    uploadFile
}

function getSignedUrl(req, res) {
    var s3BasePath = config.aws.s3BasePath;
    var awsS3Key = req.query.awsS3Key;
    
    var fileName = req.params.fileName;
    var params = {
        Bucket: config.aws.s3Bucket,
        Key: awsS3Key
    };
    
    s3.getSignedUrl('getObject', params, function (err, url) {
        if (err) {
            return res.send({
                message: err
            });
        }
        res.status(200).json({
            awsS3URL: url
        });
    });
}

function uploadFile(req, res) {
    var upload = multer({
        storage: multerS3({
            s3: s3,
            bucket: config.aws.s3Bucket,
            contentType: multerS3.AUTO_CONTENT_TYPE,
            metadata: function (req, file, cb) {
                cb(null, { fieldName: file.fieldname });
            },
            key: function (req, file, cb) {
                var s3BasePath = config.aws.s3BasePath;
                var userAccountID = req.params.userAccountID;
                var fileName = req.query.documentName.toLowerCase()+'_'+Date.now().toString()+file.originalname.substring(file.originalname.lastIndexOf('.'));
                cb(null, `${s3BasePath}/${userAccountID}/${fileName}`);
            }
        }),
        //limits: {
        //    fileSize: 100000
        //}
    });
    
    //Accept a single file with FormData variable name. The single file will be stored in req.file.
    upload.single('file')(req, res, function (err) {
        if (err) {
            //return res.status(400).send({
            //    message: err
            //});
            return res.send({
                message: err
            });
        }
        
        var params = {
            Bucket: config.aws.s3Bucket,
            Key: req.file.key
        };
        s3.getSignedUrl('getObject', params, function (err, url) {
            if (err) {
                return res.send({
                    message: err
                });
            }
            res.status(200).json({
                awsS3URL: url,
                awsS3Key: req.file.key
            });
        });
    });
}