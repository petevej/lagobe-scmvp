module.exports = function (sequelize, DataTypes) {
    var CompanyPrefix = sequelize.define("CompanyPrefix", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: false
        }
    }, {
        tableName: "company.prefix",
        timestamps: false,
        instanceMethods: {
            getCompanyPrefixes
        }
    });
    return CompanyPrefix;

    function getCompanyPrefixes() {
        return CompanyPrefix.all({
            raw: true
        }).then(function (companyPrefix) {
            return companyPrefix;
        });
    }
};