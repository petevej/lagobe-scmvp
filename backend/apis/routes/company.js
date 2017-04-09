var companyCtrl = require(global.modulePath('company', 'controller'));

module.exports = [
    {
        verb: 'get',
        endpoint: '/companies/prefixes',
        callback: companyCtrl.getCompanyPrefixes
    }
];