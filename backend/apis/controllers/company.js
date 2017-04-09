var models = require(global.modulePath('', 'model'));
var sequelize = models.sequelize;
var CompanyPrefix = models.CompanyPrefix;

module.exports = {
    getCompanyPrefixes
}

function getCompanyPrefixes(req, res) {
    var _CompanyPrefix = CompanyPrefix.build();
    
    _CompanyPrefix.getCompanyPrefixes().then(function(companyPrefix) {
        res.status(200).json(companyPrefix);
    });
}