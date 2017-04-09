module.exports = function (sequelize, DataTypes) {
    var Bank = sequelize.define("Bank", {
        id: {
            type: DataTypes.CHAR(3),
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    }, {
        tableName: "bank",
        timestamps: false,
        instanceMethods: {
            getBanks
        }
    });
    return Bank;

    function getBanks() {
        return Bank.all({
            raw: true
        }).then(function (bank) {
            return bank;
        });
    }
};