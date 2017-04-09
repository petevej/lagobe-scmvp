module.exports = function (sequelize, DataTypes) {
    var Location = sequelize.define("Location", {
        code: {
            type: DataTypes.CHAR(6),
            primaryKey: true
        },
        area: {
            type: DataTypes.CHAR(1),
            primaryKey: true
        },
        province: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        amphur: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        district: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        zipcode: {
            type: DataTypes.CHAR(5),
            allowNull: false
        }
    }, {
        tableName: "location",
        timestamps: false,
        instanceMethods: {
            getLocationData
        }
    });
    return Location;

    function getLocationData(field, queries) {
        return Location.all({
            distinct: true,
            attributes: [[sequelize.literal('DISTINCT `'+field+'`'), field]],
            where: queries,
            raw: true
        }).then(function (location) {
            if (location) {
                var arr = [];
                location.forEach(function(loc) {
                    arr.push(loc[field]);
                });
                
                return arr;
            }
            else {
                return null;
            }
        });
    }
};