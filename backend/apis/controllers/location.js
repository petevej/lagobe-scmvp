var models = require(global.modulePath('', 'model'));
var sequelize = models.sequelize;
var Location = models.Location;

module.exports = {
    getProvinces,
    getAmphurs,
    getDistricts
}

function getProvinces(req, res) {
    var _Location = Location.build();
    
    _Location.getLocationData('province', req.query).then(function(provinces) {
        if (provinces) {
            res.status(200).json(provinces);
        }
        else{
            res.status(404).json({
                message: 'Not Found'
            });
        }
    });
}

function getAmphurs(req, res) {
    var _Location = Location.build();
    
    _Location.getLocationData('amphur', req.query).then(function(amphurs) {
        if (amphurs) {
            res.status(200).json(amphurs);
        }
        else{
            res.status(404).json({
                message: 'Not Found'
            });
        }
    });
}

function getDistricts(req, res) {
    var _Location = Location.build();
    
    _Location.getLocationData('district', req.query).then(function(districts) {
        if (districts) {
            res.status(200).json(districts);
        }
        else{
            res.status(404).json({
                message: 'Not Found'
            });
        }
    });
}