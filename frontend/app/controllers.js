/**
 * Created By: Laki Sik
 * Email: mr.laki.sik@gmail.com
 * Phone: +66874414008
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
			template: '<a embed-pdf href="http://sc.lagobe.com/assets/docs/Lagobe_MPA_2017_Digital.pdf" class="embed"></a>',
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
    	console.log(this.form);
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
	constructor($scope, $window, $location, $filter, $timeout, userService) {
		"ngInject";
		
        this._$scope = $scope;
        this._$window = $window;
        this._$location = $location;
        this._$filter = $filter;
        this._$timeout = $timeout;
        this._userService = userService;
        
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
        this.companies = [];
        this.banks = [];
        this.zipCodes = {
            pickup: [],
            documentDrop: []
        };
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


//        this.uniqueProvinces = {
//            pickup: [],
//            documentDrop: []
//        };



        this.signOnbehalfOfSwitch = "individual";
        this.signupInfo = {
            store: {
                storeName: "",
                signOnBehalfOf: "",
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
                        citizenCard: null,
                        homeRegister: null
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
                        companyCertificate: null,
                        tradeRegister: null
                    }
                }
            },
            bank: {
                bankName: "",
                bankBranch: "",
                accountNumber: "",
                accountType: "",
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
//        if(!this._$window.localStorage.user){
//        	this._$location.path( '/');
//        }
//        else{
//            this._userService.getCompanies()
//                .then(
//                    (data) => {
//                        this.companies = data;
//                    },
//                    (error) => {
//                        alert(error.message);
//                    }
//                );
//            this._userService.getBanks()
//                .then(
//                    (data) => {
//                        this.banks = data;
//                    },
//                    (error) => {
//                        alert(error.message);
//                    }
//                );

//            let userStorage = JSON.parse(this._$window.localStorage.user);
//            this.signupInfo.store.individual.register.firstName = userStorage.firstName;
//            this.signupInfo.store.individual.register.lastName = userStorage.lastName;
//            this.signupInfo.store.individual.register.phone = userStorage.phone;
//            this.signupInfo.store.individual.register.email = userStorage.email;
//        }
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
        this._userService.uploadFile(this.file[businessType][documentName])
            .then(
                (data) => {
                    console.log(data);

                    //this.companies = data;
                },
                (error) => {
                    console.log(error);

                    //alert(error.message);
                }
            );
    }

    updateAddressDocumentDropValues() {
        if(this.signupInfo.address.isDocumentDropSamePickup){
            this.zipCodes.documentDrop = this.zipCodes.pickup;
            this.provinces.documentDrop = this.provinces.pickup;
            this.amphurs.documentDrop = this.amphurs.pickup;
            this.districts.documentDrop = this.districts.pickup;

            $.each(this.signupInfo.address.documentDrop, (field, value) => {
                this.signupInfo.address.documentDrop[field] = this.signupInfo.address.pickup[field];
            });
        }
    }
    
    getProvinces(addressType) {
        this.zipCodes[addressType] = [];
        this.provinces[addressType] = [];
        this.amphurs[addressType] = [];
        this.districts[addressType] = [];

        //this.uniqueProvinces[addressType] = [];

        this._userService.getZipCodes(this.signupInfo.address[addressType].zipCode)
            .then(
                (data) => {
                    this.zipCodes[addressType] = data;
                    this.zipCodes[addressType].forEach((item) => {
                        this._userService.getProvince(item.provinceId)
                            .then(
                                (data) => {
                                    this.provinces[addressType].push(data);

//                                    if(this.provinces[addressType].length == this.zipCodes[addressType].length){
//                                        this.uniqueProvinces[addressType] = this._$filter('unique')(this.provinces[addressType], 'id');
//                                        if(this.uniqueProvinces[addressType].length == 1){
//                                            //console.log();
//
//                                            this._$timeout(() => {
//                                                this.signupInfo.address.pickup.province = this.uniqueProvinces[addressType][0].id;
//                                            }, 500);
//
//                                            //this.getAmphurs(addressType);
//                                        }
//
////                                        let uniqueProvinces = this._$filter('unique')(this.provinces[addressType], 'id');
////                                        if(uniqueProvinces.length == 1){
////                                            this.signupInfo.address.pickup.province = this.provinces[addressType][0].id;
////                                            this.getAmphurs(addressType);
////                                        }
//                                    }
                                },
                                (error) => {
                                    alert(error.message);
                                }
                            );
                    });

//                    this.uniqueProvinces[addressType] = this._$filter('unique')(this.provinces[addressType], 'id');
//                    if(this.uniqueProvinces[addressType].length == 1){
////                        this._$timeout(() => {
////                            this.signupInfo.address.pickup.province = this.uniqueProvinces[addressType][0].id;
////                        }, 500);
//                        this.signupInfo.address.pickup.province = this.uniqueProvinces[addressType][0].id;
//                        //this.getAmphurs(addressType);
//                    }
                },
                (error) => {
                    alert(error.message);
                }
            );
    }

    getAmphurs(addressType) {
        this.amphurs[addressType] = [];
        this.districts[addressType] = [];

        this.zipCodes[addressType]
            .filter((item) =>{
                return item.provinceId == this.signupInfo.address[addressType].province;
            })
            .forEach((item) => {
                this._userService.getAmphur(item.amphurId)
                    .then(
                        (data) => {
                            this.amphurs[addressType].push(data);
                        },
                        (error) => {
                            alert(error.message);
                        }
                    );
            });

        if(this.amphurs[addressType].length == 1){
            this.signupInfo.address.pickup.amphur = this.amphurs[addressType][0].id;
            this.getDistricts(addressType);
        }
    }
    
    getDistricts(addressType) {
        this.districts[addressType] = [];

        this.zipCodes[addressType]
            .filter((item) => {
                let result =
                    (item.provinceId == this.signupInfo.address[addressType].province) &&
                    (item.amphurId == this.signupInfo.address[addressType].amphur);

                return result;
            })
            .forEach((item) => {
                this._userService.getDistrict(item.districtId)
                    .then(
                        (data) => {
                            this.districts[addressType].push(data);
                        },
                        (error) => {
                            alert(error.message);
                        }
                    );
            });

        if(this.districts[addressType].length == 1){
            this.signupInfo.address.pickup.district = this.districts[addressType][0].id;
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

