module.exports = function (sequelize, DataTypes) {
    var Shop = sequelize.define("Shop", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_account_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        store_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        store_business_type: {
            type: DataTypes.ENUM('individual', 'company'),
            allowNull: false,
            defaultValue: 'individual'
        },
        store_individual_register_first_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        store_individual_register_last_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        store_individual_register_citizen_id: {
            type: DataTypes.STRING(13),
            allowNull: false
        },
        store_individual_register_phone: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        store_individual_register_line_id: {
            type: DataTypes.STRING(30),
            allowNull: true
        },
        store_individual_register_email: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        store_individual_register_facebook: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        store_individual_is_contact_same_register: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        store_individual_contact_first_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        store_individual_contact_last_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        store_individual_contact_citizen_id: {
            type: DataTypes.STRING(13),
            allowNull: false
        },
        store_individual_contact_phone: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        store_individual_contact_line_id: {
            type: DataTypes.STRING(30),
            allowNull: true
        },
        store_individual_contact_email: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        store_individual_contact_facebook: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        store_individual_document_citizen_card: {
            type: DataTypes.STRING,
            allowNull: false
        },
        store_individual_document_home_register: {
            type: DataTypes.STRING,
            allowNull: false
        },
        store_company_register_company_prefix: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        store_company_register_company_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        store_company_register_tax_id: {
            type: DataTypes.STRING(13),
            allowNull: false
        },
        store_company_register_phone: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        store_company_register_line_id: {
            type: DataTypes.STRING(30),
            allowNull: true
        },
        store_company_register_email: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        store_company_register_facebook: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        store_company_contact_first_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        store_company_contact_last_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        store_company_contact_citizen_id: {
            type: DataTypes.STRING(13),
            allowNull: false
        },
        store_company_contact_phone: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        store_company_contact_line_id: {
            type: DataTypes.STRING(30),
            allowNull: true
        },
        store_company_contact_email: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        store_company_contact_facebook: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        store_company_document_company_certificate: {
            type: DataTypes.STRING,
            allowNull: false
        },
        store_company_document_trade_register: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bank_id: {
            type: DataTypes.CHAR(3),
            allowNull: false
        },
        bank_branch: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        bank_account_number: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        bank_account_type: {
            type: DataTypes.ENUM('ออมทรัพย์', 'กระแสรายวัน'),
            allowNull: false
        },
        bank_account_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        address_pickup_zipcode: {
            type: DataTypes.CHAR(5),
            allowNull: false
        },
        address_pickup_province: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        address_pickup_amphur: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        address_pickup_district: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        address_pickup_other: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address_is_document_drop_same_pickup: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        address_document_drop_zipcode: {
            type: DataTypes.CHAR(5),
            allowNull: false
        },
        address_document_drop_province: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        address_document_drop_amphur: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        address_document_drop_district: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        address_document_drop_other: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: "shop",
        instanceMethods: {
            getByUserAccountID,
            createByUserAccountID,
            updateByUserAccountID
        }
    });
    return Shop;

    function getByUserAccountID(userAccountID) {
        return Shop.findOne({
            where: { user_account_id: userAccountID },
            raw: true
        }).then(function(shop) {
            if (shop) {
                return {
                    store: {
                        storeName: shop.store_name,
                        businessType: shop.store_business_type,
                        individual: {
                            register: {
                                firstName: shop.store_individual_register_first_name,
                                lastName: shop.store_individual_register_last_name,
                                citizenID: shop.store_individual_register_citizen_id,
                                phone: shop.store_individual_register_phone,
                                lineID: shop.store_individual_register_line_id,
                                email: shop.store_individual_register_email,
                                facebook: shop.store_individual_register_facebook
                            },
                            isContactSameRegister: shop.store_individual_is_contact_same_register,
                            contact: {
                                firstName: shop.store_individual_contact_first_name,
                                lastName: shop.store_individual_contact_last_name,
                                citizenID: shop.store_individual_contact_citizen_id,
                                phone: shop.store_individual_contact_phone,
                                lineID: shop.store_individual_contact_line_id,
                                email: shop.store_individual_contact_email,
                                facebook: shop.store_individual_contact_facebook
                            },
                            document: {
                                citizenCard: shop.store_individual_document_citizen_card,
                                homeRegister: shop.store_individual_document_home_register
                            }
                        },
                        company: {
                            register: {
                                companyPrefix: shop.store_company_register_company_prefix,
                                companyName: shop.store_company_register_company_name,
                                taxID: shop.store_company_register_tax_id,
                                phone: shop.store_company_register_phone,
                                lineID: shop.store_company_register_line_id,
                                email: shop.store_company_register_email,
                                facebook: shop.store_company_register_facebook
                            },
                            contact: {
                                firstName: shop.store_company_contact_first_name,
                                lastName: shop.store_company_contact_last_name,
                                citizenID: shop.store_company_contact_citizen_id,
                                phone: shop.store_company_contact_phone,
                                lineID: shop.store_company_contact_line_id,
                                email: shop.store_company_contact_email,
                                facebook: shop.store_company_contact_facebook
                            },
                            document: {
                                companyCertificate: shop.store_company_document_company_certificate,
                                tradeRegister: shop.store_company_document_trade_register
                            }
                        }
                    },
                    bank: {
                        bankID: shop.bank_id,
                        bankBranch: shop.bank_branch,
                        accountNumber: shop.bank_account_number,
                        accountType: shop.bank_account_type,
                        accountName: shop.bank_account_name
                    },
                    address: {
                        pickup: {
                            zipCode: shop.address_pickup_zipcode,
                            province: shop.address_pickup_province,
                            amphur: shop.address_pickup_amphur,
                            district: shop.address_pickup_district,
                            other: shop.address_pickup_other
                        },
                        isDocumentDropSamePickup: shop.address_is_document_drop_same_pickup,
                        documentDrop: {
                            zipCode: shop.address_document_drop_zipcode,
                            province: shop.address_document_drop_province,
                            amphur: shop.address_document_drop_amphur,
                            district: shop.address_document_drop_district,
                            other: shop.address_document_drop_other
                        }
                    }
                };
            }
            else{
                return null;
            }
        });
    }
    
    function createByUserAccountID(userAccountID, shopInfo) {
        var data = {
            user_account_id: userAccountID,
            store_name: shopInfo.store.storeName,
            store_business_type: shopInfo.store.businessType,
            store_individual_register_first_name: shopInfo.store.individual.register.firstName,
            store_individual_register_last_name: shopInfo.store.individual.register.lastName,
            store_individual_register_citizen_id: shopInfo.store.individual.register.citizenID,
            store_individual_register_phone: shopInfo.store.individual.register.phone,
            store_individual_register_line_id: shopInfo.store.individual.register.lineID,
            store_individual_register_email: shopInfo.store.individual.register.email,
            store_individual_register_facebook: shopInfo.store.individual.register.facebook,
            store_individual_is_contact_same_register: shopInfo.store.individual.isContactSameRegister,
            store_individual_contact_first_name: shopInfo.store.individual.contact.firstName,
            store_individual_contact_last_name: shopInfo.store.individual.contact.lastName,
            store_individual_contact_citizen_id: shopInfo.store.individual.contact.citizenID,
            store_individual_contact_phone: shopInfo.store.individual.contact.phone,
            store_individual_contact_line_id: shopInfo.store.individual.contact.lineID,
            store_individual_contact_email: shopInfo.store.individual.contact.email,
            store_individual_contact_facebook: shopInfo.store.individual.contact.facebook,
            store_individual_document_citizen_card: shopInfo.store.individual.document.citizenCard,
            store_individual_document_home_register: shopInfo.store.individual.document.homeRegister,
            store_company_register_company_prefix: shopInfo.store.company.register.companyPrefix,
            store_company_register_company_name: shopInfo.store.company.register.companyName,
            store_company_register_tax_id: shopInfo.store.company.register.taxID,
            store_company_register_phone: shopInfo.store.company.register.phone,
            store_company_register_line_id: shopInfo.store.company.register.lineID,
            store_company_register_email: shopInfo.store.company.register.email,
            store_company_register_facebook: shopInfo.store.company.register.facebook,
            store_company_contact_first_name: shopInfo.store.company.contact.firstName,
            store_company_contact_last_name: shopInfo.store.company.contact.lastName,
            store_company_contact_citizen_id: shopInfo.store.company.contact.citizenID,
            store_company_contact_phone: shopInfo.store.company.contact.phone,
            store_company_contact_line_id: shopInfo.store.company.contact.lineID,
            store_company_contact_email: shopInfo.store.company.contact.email,
            store_company_contact_facebook: shopInfo.store.company.contact.facebook,
            store_company_document_company_certificate: shopInfo.store.company.document.companyCertificate,
            store_company_document_trade_register: shopInfo.store.company.document.tradeRegister,
            bank_id: shopInfo.bank.bankID,
            bank_branch: shopInfo.bank.bankBranch,
            bank_account_number: shopInfo.bank.accountNumber,
            bank_account_type: shopInfo.bank.accountType,
            bank_account_name: shopInfo.bank.accountName,
            address_pickup_zipcode: shopInfo.address.pickup.zipCode,
            address_pickup_province: shopInfo.address.pickup.province,
            address_pickup_amphur: shopInfo.address.pickup.amphur,
            address_pickup_district: shopInfo.address.pickup.district,
            address_pickup_other: shopInfo.address.pickup.other,
            address_is_document_drop_same_pickup: shopInfo.address.isDocumentDropSamePickup,
            address_document_drop_zipcode: shopInfo.address.documentDrop.zipCode,
            address_document_drop_province: shopInfo.address.documentDrop.province,
            address_document_drop_amphur: shopInfo.address.documentDrop.amphur,
            address_document_drop_district: shopInfo.address.documentDrop.district,
            address_document_drop_other: shopInfo.address.documentDrop.other
        };
  
        return Shop.create(data).then(function(shop) {
            return {
                success: true
            };
        });
    }
    
    function updateByUserAccountID(userAccountID, shopInfo) {
        var data = {
            store_name: shopInfo.store.storeName,
            store_business_type: shopInfo.store.businessType,
            store_individual_register_first_name: shopInfo.store.individual.register.firstName,
            store_individual_register_last_name: shopInfo.store.individual.register.lastName,
            store_individual_register_citizen_id: shopInfo.store.individual.register.citizenID,
            store_individual_register_phone: shopInfo.store.individual.register.phone,
            store_individual_register_line_id: shopInfo.store.individual.register.lineID,
            store_individual_register_email: shopInfo.store.individual.register.email,
            store_individual_register_facebook: shopInfo.store.individual.register.facebook,
            store_individual_is_contact_same_register: shopInfo.store.individual.isContactSameRegister,
            store_individual_contact_first_name: shopInfo.store.individual.contact.firstName,
            store_individual_contact_last_name: shopInfo.store.individual.contact.lastName,
            store_individual_contact_citizen_id: shopInfo.store.individual.contact.citizenID,
            store_individual_contact_phone: shopInfo.store.individual.contact.phone,
            store_individual_contact_line_id: shopInfo.store.individual.contact.lineID,
            store_individual_contact_email: shopInfo.store.individual.contact.email,
            store_individual_contact_facebook: shopInfo.store.individual.contact.facebook,
            store_individual_document_citizen_card: shopInfo.store.individual.document.citizenCard,
            store_individual_document_home_register: shopInfo.store.individual.document.homeRegister,
            store_company_register_company_prefix: shopInfo.store.company.register.companyPrefix,
            store_company_register_company_name: shopInfo.store.company.register.companyName,
            store_company_register_tax_id: shopInfo.store.company.register.taxID,
            store_company_register_phone: shopInfo.store.company.register.phone,
            store_company_register_line_id: shopInfo.store.company.register.lineID,
            store_company_register_email: shopInfo.store.company.register.email,
            store_company_register_facebook: shopInfo.store.company.register.facebook,
            store_company_contact_first_name: shopInfo.store.company.contact.firstName,
            store_company_contact_last_name: shopInfo.store.company.contact.lastName,
            store_company_contact_citizen_id: shopInfo.store.company.contact.citizenID,
            store_company_contact_phone: shopInfo.store.company.contact.phone,
            store_company_contact_line_id: shopInfo.store.company.contact.lineID,
            store_company_contact_email: shopInfo.store.company.contact.email,
            store_company_contact_facebook: shopInfo.store.company.contact.facebook,
            store_company_document_company_certificate: shopInfo.store.company.document.companyCertificate,
            store_company_document_trade_register: shopInfo.store.company.document.tradeRegister,
            bank_id: shopInfo.bank.bankID,
            bank_branch: shopInfo.bank.bankBranch,
            bank_account_number: shopInfo.bank.accountNumber,
            bank_account_type: shopInfo.bank.accountType,
            bank_account_name: shopInfo.bank.accountName,
            address_pickup_zipcode: shopInfo.address.pickup.zipCode,
            address_pickup_province: shopInfo.address.pickup.province,
            address_pickup_amphur: shopInfo.address.pickup.amphur,
            address_pickup_district: shopInfo.address.pickup.district,
            address_pickup_other: shopInfo.address.pickup.other,
            address_is_document_drop_same_pickup: shopInfo.address.isDocumentDropSamePickup,
            address_document_drop_zipcode: shopInfo.address.documentDrop.zipCode,
            address_document_drop_province: shopInfo.address.documentDrop.province,
            address_document_drop_amphur: shopInfo.address.documentDrop.amphur,
            address_document_drop_district: shopInfo.address.documentDrop.district,
            address_document_drop_other: shopInfo.address.documentDrop.other
        };
        
        return Shop.update(data, {
            where: {
                user_account_id: userAccountID
            }
        }).then(function(shop) {
            return {
                success: true
            };
        });
    }
};