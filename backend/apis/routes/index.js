var express = require('express');
var router = express.Router();
var guard = require('express-jwt-permissions')();

var modules = [
    'user',
    'auth',
    'shop',
    'location',
    'bank',
    'company',
    'upload'
];
modules.forEach((module) => {
    var arrParams = require(global.modulePath(module, 'route'));
    arrParams.forEach((param) => {
        if(param.permissions){
            router[param.verb](param.endpoint, guard.check(param.permissions), param.callback);
        }
        else{
            router[param.verb](param.endpoint, param.callback);
        }
    });
});

module.exports = router;
