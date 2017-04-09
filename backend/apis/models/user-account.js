var passwordHash = require(global.modulePath('password-hash', 'helper'));

module.exports = function (sequelize, DataTypes) {
    var UserAccount = sequelize.define("UserAccount", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password_salt: {
            type: DataTypes.STRING(16),
            allowNull: true
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING(10),
            allowNull: false
        }
    }, {
        tableName: "user.account",
        instanceMethods: {
            create,
            authenticate
        }
    });
    return UserAccount;

    function create(userAccountInfo) {
        var email = userAccountInfo.email;
        var password_salt = passwordHash.genSalt();
        var password = passwordHash.hash(userAccountInfo.password, password_salt);
        var first_name = userAccountInfo.firstName;
        var last_name = userAccountInfo.lastName;
        var phone = userAccountInfo.phone;
        var data = {
            email,
            password,
            password_salt,
            first_name,
            last_name,
            phone
        };
        
        return UserAccount.create(data).then(function(userAccount) {
            return {
                id: userAccount.get('id'),
                email,
                //password,
                firstName: first_name,
                lastName: last_name,
                phone
            };
        });
    }
    
    function authenticate(user) {
        var email = user.email;
        var password = user.password;
        
        return UserAccount.findOne({
            where: { email },
            raw: true
        }).then(function (userAccount) {
            if (userAccount) {
                if(passwordHash.hash(password, userAccount.password_salt) == userAccount.password){
                    return {
                        id: userAccount.id,
                        email,
                        //password,
                        firstName: userAccount.first_name,
                        lastName: userAccount.last_name,
                        phone: userAccount.phone
                    };
                }
                else{
                    return ;
                }
            }
            else {
                return ;
            }
        });
    }
};