var locationCtrl = require(global.modulePath('location', 'controller'));

module.exports = [
    {
        verb: 'get',
        endpoint: '/location/provinces',
        callback: locationCtrl.getProvinces
    },
    {
        verb: 'get',
        endpoint: '/location/amphurs',
        callback: locationCtrl.getAmphurs
    },
    {
        verb: 'get',
        endpoint: '/location/districts',
        callback: locationCtrl.getDistricts
    },
];