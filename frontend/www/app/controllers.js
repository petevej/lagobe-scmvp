/**
  * Created By: Pete Vejanurug
  * Email: p@lagobe.com
  * Phone: +66903263755
  */

class ParentController {
	constructor($window){
        this._$window = $window;
		this.label = {};
	}
	
	loadLabel(page,language) {
		this._mainService.getLabel(page, language)
		    .then(
		        (data) => {
		            this.label = data;
		        }, (data) => {
		            console.log(data);
		        }
		    );
	}

    switchLanguage(page) {
        let languageOld = this._$window.localStorage.lang;
        let languageNew;

        if(languageOld == "en") {
            languageNew = "th";
        }
        else if(languageOld == "th") {
            languageNew = "en"
        }
        this.loadLabel(page, languageNew);
    }
}

class MainController extends ParentController {
	constructor(mainService, $window, $uibModal, $location) {
		"ngInject";
		super();
		//this._userService = userService;
		
		this._mainService = mainService;
		this._$window = $window;
		this._$uibModal = $uibModal;
		this._$location = $location;

		this.loadLabel('landingpage');
		this.form = {};
        this.notifyError = {
            signin: false
        };
	}

	viewContract() {
        this._$uibModal.open({
			template: '<a embed-pdf href="https://sc.lagobe.com/assets/docs/Lagobe_MPA_2017_Digital.pdf" class="embed"></a>',
			size: 'lg',
			backdrop: true,
			windowTopClass: 'modal-contract'
		});
	}

	signin() {
        this._mainService.signin(this.user)
            .then(
                (data) => {
                	this._$window.localStorage.user = JSON.stringify(data);
                	this._$location.path( '/signup');
                },
                (error) => {
                    this.notifyError.signin = true;
                    this.user.password = "";
                    //alert(error.message);
                }
            );
    }

	signUp() {
    	this._mainService.signUp(this.form)
    		.then(
    			(data) => {
    				this._$window.localStorage.user = JSON.stringify(data);
		    		this.form = {};
		    		this._$location.path( '/signup');
    			},
    			(error) => {
    				alert(error.message);
    			}
    		);
	}

	clearNotifyError() {
        this.notifyError.signin = false;
    }
}

class UserController{
	constructor($scope, $window, $location, $filter, $timeout, userService, CONFIG) {
		"ngInject";
		
        this._$scope = $scope;
        this._$window = $window;
        this._$location = $location;
        this._$filter = $filter;
        this._$timeout = $timeout;
        this._userService = userService;
		this._CONFIG = CONFIG;
        
        this.file = {
            individual: {
                citizenCard: null,
                homeRegister: null
            },
            company: {
                companyCertificate: null,
                tradeRegister: null
            }
        };
		this.image = {
            individual: {
                citizenCard: "",
                homeRegister: ""
            },
            company: {
                companyCertificate: "",
                tradeRegister: ""
            }
        };
        this.companyPrefixes = [];
        this.banks = [];
        this.provinces = {
            pickup: [],
            documentDrop: []
        };
        this.amphurs = {
            pickup: [],
            documentDrop: []
        };
        this.districts = {
            pickup: [],
            documentDrop: []
        };

        this.signOnbehalfOfSwitch = "individual";
        this.signupInfo = {
            store: {
                storeName: "",
                businessType: "individual",
                individual: {
                    register: {
                        firstName: "",
                        lastName: "",
                        citizenID: "",
                        phone: "",
                        lineID: "",
                        email: "",
                        facebook: ""
                    },
                    isContactSameRegister: false,
                    contact: {
                        firstName: "",
                        lastName: "",
                        citizenID: "",
                        phone: "",
                        lineID: "",
                        email: "",
                        facebook: ""
                    },
                    document: {
                        citizenCard: "",
                        homeRegister: ""
                    }
                },
                company: {
                    register: {
                        companyPrefix: "",
                        companyName: "",
                        taxID: "",
                        phone: "",
                        lineID: "",
                        email: "",
                        facebook: ""
                    },
                    contact: {
                        firstName: "",
                        lastName: "",
                        citizenID: "",
                        phone: "",
                        lineID: "",
                        email: "",
                        facebook: ""
                    },
                    document: {
                        companyCertificate: "",
                        tradeRegister: ""
                    }
                }
            },
            bank: {
                bankID: "",
                bankBranch: "",
                accountNumber: "",
                accountType: "ออมทรัพย์",
                accountName: ""
            },
            address: {
                pickup: {
                    zipCode: "",
                    province: "",
                    amphur: "",
                    district: "",
                    other: ""
                },
                isDocumentDropSamePickup: false,
                documentDrop: {
                    zipCode: "",
                    province: "",
                    amphur: "",
                    district: "",
                    other: ""
                }
            }
        };
        this.signupInfoLastModified = JSON.parse(JSON.stringify(this.signupInfo));
        
        this.init();
	}

    init() {
        if(!this._$window.localStorage.user){
        	this._$location.path( '/');
        }
        else{
            this._userService.getCompanyPrefixes()
                .then(
                    (data) => {
                        this.companyPrefixes = data;
                    },
                    (error) => {
                        alert(error.message);
                    }
                );
            this._userService.getBanks()
                .then(
                    (data) => {
                        this.banks = data;
                    },
                    (error) => {
                        alert(error.message);
                    }
                );
				
			this._userService.getShopInfo()
                .then(
                    (data) => {
						if (data) {
							data.store.individual.isContactSameRegister = (data.store.individual.isContactSameRegister == 1);
							['pickup', 'documentDrop'].forEach((addressType) => {
								if (data.address[addressType].zipCode) {
									this.getProvinces(addressType, {
										zipcode: data.address[addressType].zipCode
									});
									if (data.address[addressType].province) {
										this.getAmphurs(addressType, {
											zipcode: data.address[addressType].zipCode,
											province: data.address[addressType].province
										});
										if (data.address[addressType].amphur) {
											this.getDistricts(addressType, {
												zipcode: data.address[addressType].zipCode,
												province: data.address[addressType].province,
												amphur: data.address[addressType].amphur
											});
										}
									}
								}
							});
							data.address.isDocumentDropSamePickup = (data.address.isDocumentDropSamePickup == 1);
							
                            this.signupInfo = JSON.parse(JSON.stringify(data));
							
							if (data.store.individual.document.citizenCard) {
								this.getStoreDocumentURL('individual', 'citizenCard');
                            }
							if (data.store.individual.document.homeRegister) {
								this.getStoreDocumentURL('individual', 'homeRegister');
                            }
							if (data.store.company.document.companyCertificate) {
								this.getStoreDocumentURL('company', 'companyCertificate');
                            }
							if (data.store.company.document.tradeRegister) {
								this.getStoreDocumentURL('company', 'tradeRegister');
                            }
							
							$('input[sign-on-behalf-of][value="'+data.store.businessType+'"]').trigger('loadData');
							$('#storeIndividualSwitchContactSameRegister').trigger('loadData');
							$('#addressSwitchDocumentDropSamePickup').trigger('loadData');
                        }
						else {
							let userStorage = JSON.parse(this._$window.localStorage.user);
							this.signupInfo.store.individual.register.firstName = userStorage.firstName;
							this.signupInfo.store.individual.register.lastName = userStorage.lastName;
							this.signupInfo.store.individual.register.phone = userStorage.phone;
							this.signupInfo.store.individual.register.email = userStorage.email;
							
							this.signupInfo.store.individual.businessType = "individual";
							this.signupInfo.bank.accountType = "ออมทรัพย์";
						}
                    },
                    (error) => {
                        alert(error.message);
                    }
                );
        }
    }
	
	save() {
        this._userService.save(this.signupInfo)
            .then(
                (data) => {
                    this.signupInfoLastModified = JSON.parse(JSON.stringify(this.signupInfo));

                    $('#notifySaved').trigger('show');
                },
                (error) => {
                    alert(error.message);
                }
            );
	}

    cancel() {
        this.signupInfo = JSON.parse(JSON.stringify(this.signupInfoLastModified));
    }

    updateStoreIndividualContactValues() {
        if(this.signupInfo.store.individual.isContactSameRegister){
            $.each(this.signupInfo.store.individual.contact, (field, value) => {
                this.signupInfo.store.individual.contact[field] = this.signupInfo.store.individual.register[field];
            });
        }
    }

    uploadStoreDocument(businessType, documentName) {
        this._userService.uploadFile(documentName, this.file[businessType][documentName])
            .then(
                (data) => {
					this.signupInfo.store[businessType].document[documentName] = data.awsS3Key;
					this.image[businessType][documentName] = data.awsS3URL;
                },
                (error) => {
                    alert(error.message);
                }
            );
    }
	
	getStoreDocumentURL(businessType, documentName) {
		this._userService.getAWSS3URL(this.signupInfo.store[businessType].document[documentName])
            .then(
                (data) => {
					this.image[businessType][documentName] = data.awsS3URL;
                },
                (error) => {
                    alert(error.message);
                }
            );
	}

    updateAddressDocumentDropValues() {
        if(this.signupInfo.address.isDocumentDropSamePickup){
            this.provinces.documentDrop = this.provinces.pickup;
            this.amphurs.documentDrop = this.amphurs.pickup;
            this.districts.documentDrop = this.districts.pickup;

            $.each(this.signupInfo.address.documentDrop, (field, value) => {
                this.signupInfo.address.documentDrop[field] = this.signupInfo.address.pickup[field];
            });
        }
    }
    
    getProvinces(addressType, queries) {
        this.provinces[addressType] = [];
        this.amphurs[addressType] = [];
        this.districts[addressType] = [];
		
		let isDefineQueries = (queries != undefined);
		
		if (!isDefineQueries) {
            queries = {
				zipcode: this.signupInfo.address[addressType].zipCode
			};
        }
		
		this._userService.getProvinces(queries).then(
			(data) => {
				this.provinces[addressType] = data;
				if (!isDefineQueries) {
                    if(this.provinces[addressType].length == 1){
						this.signupInfo.address[addressType].province = this.provinces[addressType][0];
						this.getAmphurs(addressType);
					}
                }
			},
			(error) => {
				alert(error.message);
			}
		);
    }

    getAmphurs(addressType, queries) {
        this.amphurs[addressType] = [];
        this.districts[addressType] = [];
		
		let isDefineQueries = (queries != undefined);
		
		if (!isDefineQueries) {
            queries = {
				zipcode: this.signupInfo.address[addressType].zipCode,
				province: this.signupInfo.address[addressType].province,
			};
        }
		
		this._userService.getAmphurs(queries).then(
			(data) => {
				this.amphurs[addressType] = data;
				if (!isDefineQueries) {
					if(this.amphurs[addressType].length == 1){
						this.signupInfo.address[addressType].amphur = this.amphurs[addressType][0];
						this.getDistricts(addressType);
					}
				}
			},
			(error) => {
				alert(error.message);
			}
		);
    }
    
    getDistricts(addressType, queries) {
        this.districts[addressType] = [];
		
		let isDefineQueries = (queries != undefined);
		
		if (!isDefineQueries) {
            queries = {
				zipcode: this.signupInfo.address[addressType].zipCode,
				province: this.signupInfo.address[addressType].province,
				amphur: this.signupInfo.address[addressType].amphur,
			};
        }
		
		this._userService.getDistricts(queries).then(
			(data) => {
				this.districts[addressType] = data;
				if (!isDefineQueries) {
					if(this.districts[addressType].length == 1){
						this.signupInfo.address[addressType].district = this.districts[addressType][0];
					}
				}
			},
			(error) => {
				alert(error.message);
			}
		);
    }
	
	summaryValue(value) {
		return value? value: "-";
	}
	
	summarySelectValue(items, selectValue) {
		if (selectValue) {
            var obj = {};
			items.forEach(function(item) {
				obj[item.id] = item.name;
			});
			return obj[selectValue];
        }
		else {
			return "-";
		}
	}

    signout() {
        delete this._$window.localStorage.user;
        this._$location.path( '/');
    }
}

angular.module('MainApp')
.controller('MainController', MainController);

angular.module('User')
.controller('UserController', UserController);

