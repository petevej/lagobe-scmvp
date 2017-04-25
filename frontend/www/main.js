(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

require('../bower_components/angular/angular.min');

require('../bower_components/angular-ui/build/angular-ui.min');

require('angular-ui-router');

require('angular-ui-router-styles/ui-router-styles');

require('angular-ui-bootstrap/');

require('./modules');

require('./routers');

require('./constant');

require('./controllers');

require('./services');

require('./directives');

require('./run');

},{"../bower_components/angular-ui/build/angular-ui.min":9,"../bower_components/angular/angular.min":10,"./constant":2,"./controllers":3,"./directives":4,"./modules":5,"./routers":6,"./run":7,"./services":8,"angular-ui-bootstrap/":12,"angular-ui-router":14,"angular-ui-router-styles/ui-router-styles":13}],2:[function(require,module,exports){
"use strict";

/**
  * Created By: Pete Vejanurug
  * Email: p@lagobe.com
  * Phone: +66903263755
  */

var PAGE = {
    LANGUAGE: "th"
};

var CONFIG = {
    PATH: {
        APIS: "/apis"
    }
};

angular.module('MainApp').constant('PAGE', PAGE).constant('CONFIG', CONFIG);

},{}],3:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
  * Created By: Pete Vejanurug
  * Email: p@lagobe.com
  * Phone: +66903263755
  */

var ParentController = function () {
    function ParentController($window) {
        _classCallCheck(this, ParentController);

        this._$window = $window;
        this.label = {};
    }

    _createClass(ParentController, [{
        key: "loadLabel",
        value: function loadLabel(page, language) {
            var _this = this;

            this._mainService.getLabel(page, language).then(function (data) {
                _this.label = data;
            }, function (data) {
                console.log(data);
            });
        }
    }, {
        key: "switchLanguage",
        value: function switchLanguage(page) {
            var languageOld = this._$window.localStorage.lang;
            var languageNew = void 0;

            if (languageOld == "en") {
                languageNew = "th";
            } else if (languageOld == "th") {
                languageNew = "en";
            }
            this.loadLabel(page, languageNew);
        }
    }]);

    return ParentController;
}();

var MainController = function (_ParentController) {
    MainController.$inject = ["mainService", "$window", "$uibModal", "$location"];
    _inherits(MainController, _ParentController);

    function MainController(mainService, $window, $uibModal, $location) {
        "ngInject";

        _classCallCheck(this, MainController);

        //this._userService = userService;

        var _this2 = _possibleConstructorReturn(this, (MainController.__proto__ || Object.getPrototypeOf(MainController)).call(this));

        _this2._mainService = mainService;
        _this2._$window = $window;
        _this2._$uibModal = $uibModal;
        _this2._$location = $location;

        _this2.loadLabel('landingpage');
        _this2.form = {};
        _this2.notifyError = {
            signin: false
        };
        return _this2;
    }

    _createClass(MainController, [{
        key: "viewContract",
        value: function viewContract() {
            this._$uibModal.open({
                template: '<a embed-pdf href="https://sc.lagobe.com/assets/docs/Lagobe_MPA_2017_Digital.pdf" class="embed"></a>',
                size: 'lg',
                backdrop: true,
                windowTopClass: 'modal-contract'
            });
        }
    }, {
        key: "signin",
        value: function signin() {
            var _this3 = this;

            this._mainService.signin(this.user).then(function (data) {
                _this3._$window.localStorage.user = JSON.stringify(data);
                _this3._$location.path('/signup');
            }, function (error) {
                _this3.notifyError.signin = true;
                _this3.user.password = "";
                //alert(error.message);
            });
        }
    }, {
        key: "signUp",
        value: function signUp() {
            var _this4 = this;

            this._mainService.signUp(this.form).then(function (data) {
                _this4._$window.localStorage.user = JSON.stringify(data);
                _this4.form = {};
                _this4._$location.path('/signup');
            }, function (error) {
                alert(error.message);
            });
        }
    }, {
        key: "clearNotifyError",
        value: function clearNotifyError() {
            this.notifyError.signin = false;
        }
    }]);

    return MainController;
}(ParentController);

var UserController = function () {
    UserController.$inject = ["$scope", "$window", "$location", "$filter", "$timeout", "userService", "CONFIG"];
    function UserController($scope, $window, $location, $filter, $timeout, userService, CONFIG) {
        "ngInject";

        _classCallCheck(this, UserController);

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

    _createClass(UserController, [{
        key: "init",
        value: function init() {
            var _this5 = this;

            if (!this._$window.localStorage.user) {
                this._$location.path('/');
            } else {
                this._userService.getCompanyPrefixes().then(function (data) {
                    _this5.companyPrefixes = data;
                }, function (error) {
                    alert(error.message);
                });
                this._userService.getBanks().then(function (data) {
                    _this5.banks = data;
                }, function (error) {
                    alert(error.message);
                });

                this._userService.getShopInfo().then(function (data) {
                    if (data) {
                        data.store.individual.isContactSameRegister = data.store.individual.isContactSameRegister == 1;
                        ['pickup', 'documentDrop'].forEach(function (addressType) {
                            if (data.address[addressType].zipCode) {
                                _this5.getProvinces(addressType, {
                                    zipcode: data.address[addressType].zipCode
                                });
                                if (data.address[addressType].province) {
                                    _this5.getAmphurs(addressType, {
                                        zipcode: data.address[addressType].zipCode,
                                        province: data.address[addressType].province
                                    });
                                    if (data.address[addressType].amphur) {
                                        _this5.getDistricts(addressType, {
                                            zipcode: data.address[addressType].zipCode,
                                            province: data.address[addressType].province,
                                            amphur: data.address[addressType].amphur
                                        });
                                    }
                                }
                            }
                        });
                        data.address.isDocumentDropSamePickup = data.address.isDocumentDropSamePickup == 1;

                        _this5.signupInfo = JSON.parse(JSON.stringify(data));

                        if (data.store.individual.document.citizenCard) {
                            _this5.getStoreDocumentURL('individual', 'citizenCard');
                        }
                        if (data.store.individual.document.homeRegister) {
                            _this5.getStoreDocumentURL('individual', 'homeRegister');
                        }
                        if (data.store.company.document.companyCertificate) {
                            _this5.getStoreDocumentURL('company', 'companyCertificate');
                        }
                        if (data.store.company.document.tradeRegister) {
                            _this5.getStoreDocumentURL('company', 'tradeRegister');
                        }

                        $('input[sign-on-behalf-of][value="' + data.store.businessType + '"]').trigger('loadData');
                        $('#storeIndividualSwitchContactSameRegister').trigger('loadData');
                        $('#addressSwitchDocumentDropSamePickup').trigger('loadData');
                    } else {
                        var userStorage = JSON.parse(_this5._$window.localStorage.user);
                        _this5.signupInfo.store.individual.register.firstName = userStorage.firstName;
                        _this5.signupInfo.store.individual.register.lastName = userStorage.lastName;
                        _this5.signupInfo.store.individual.register.phone = userStorage.phone;
                        _this5.signupInfo.store.individual.register.email = userStorage.email;

                        _this5.signupInfo.store.individual.businessType = "individual";
                        _this5.signupInfo.bank.accountType = "ออมทรัพย์";
                    }
                }, function (error) {
                    alert(error.message);
                });
            }
        }
    }, {
        key: "save",
        value: function save() {
            var _this6 = this;

            this._userService.save(this.signupInfo).then(function (data) {
                _this6.signupInfoLastModified = JSON.parse(JSON.stringify(_this6.signupInfo));

                $('#notifySaved').trigger('show');
            }, function (error) {
                alert(error.message);
            });
        }
    }, {
        key: "cancel",
        value: function cancel() {
            this.signupInfo = JSON.parse(JSON.stringify(this.signupInfoLastModified));
        }
    }, {
        key: "updateStoreIndividualContactValues",
        value: function updateStoreIndividualContactValues() {
            var _this7 = this;

            if (this.signupInfo.store.individual.isContactSameRegister) {
                $.each(this.signupInfo.store.individual.contact, function (field, value) {
                    _this7.signupInfo.store.individual.contact[field] = _this7.signupInfo.store.individual.register[field];
                });
            }
        }
    }, {
        key: "uploadStoreDocument",
        value: function uploadStoreDocument(businessType, documentName) {
            var _this8 = this;

            this._userService.uploadFile(documentName, this.file[businessType][documentName]).then(function (data) {
                _this8.signupInfo.store[businessType].document[documentName] = data.awsS3Key;
                _this8.image[businessType][documentName] = data.awsS3URL;
            }, function (error) {
                alert(error.message);
            });
        }
    }, {
        key: "getStoreDocumentURL",
        value: function getStoreDocumentURL(businessType, documentName) {
            var _this9 = this;

            this._userService.getAWSS3URL(this.signupInfo.store[businessType].document[documentName]).then(function (data) {
                _this9.image[businessType][documentName] = data.awsS3URL;
            }, function (error) {
                alert(error.message);
            });
        }
    }, {
        key: "updateAddressDocumentDropValues",
        value: function updateAddressDocumentDropValues() {
            var _this10 = this;

            if (this.signupInfo.address.isDocumentDropSamePickup) {
                this.provinces.documentDrop = this.provinces.pickup;
                this.amphurs.documentDrop = this.amphurs.pickup;
                this.districts.documentDrop = this.districts.pickup;

                $.each(this.signupInfo.address.documentDrop, function (field, value) {
                    _this10.signupInfo.address.documentDrop[field] = _this10.signupInfo.address.pickup[field];
                });
            }
        }
    }, {
        key: "getProvinces",
        value: function getProvinces(addressType, queries) {
            var _this11 = this;

            this.provinces[addressType] = [];
            this.amphurs[addressType] = [];
            this.districts[addressType] = [];

            var isDefineQueries = queries != undefined;

            if (!isDefineQueries) {
                queries = {
                    zipcode: this.signupInfo.address[addressType].zipCode
                };
            }

            this._userService.getProvinces(queries).then(function (data) {
                _this11.provinces[addressType] = data;
                if (!isDefineQueries) {
                    if (_this11.provinces[addressType].length == 1) {
                        _this11.signupInfo.address[addressType].province = _this11.provinces[addressType][0];
                        _this11.getAmphurs(addressType);
                    }
                }
            }, function (error) {
                alert(error.message);
            });
        }
    }, {
        key: "getAmphurs",
        value: function getAmphurs(addressType, queries) {
            var _this12 = this;

            this.amphurs[addressType] = [];
            this.districts[addressType] = [];

            var isDefineQueries = queries != undefined;

            if (!isDefineQueries) {
                queries = {
                    zipcode: this.signupInfo.address[addressType].zipCode,
                    province: this.signupInfo.address[addressType].province
                };
            }

            this._userService.getAmphurs(queries).then(function (data) {
                _this12.amphurs[addressType] = data;
                if (!isDefineQueries) {
                    if (_this12.amphurs[addressType].length == 1) {
                        _this12.signupInfo.address[addressType].amphur = _this12.amphurs[addressType][0];
                        _this12.getDistricts(addressType);
                    }
                }
            }, function (error) {
                alert(error.message);
            });
        }
    }, {
        key: "getDistricts",
        value: function getDistricts(addressType, queries) {
            var _this13 = this;

            this.districts[addressType] = [];

            var isDefineQueries = queries != undefined;

            if (!isDefineQueries) {
                queries = {
                    zipcode: this.signupInfo.address[addressType].zipCode,
                    province: this.signupInfo.address[addressType].province,
                    amphur: this.signupInfo.address[addressType].amphur
                };
            }

            this._userService.getDistricts(queries).then(function (data) {
                _this13.districts[addressType] = data;
                if (!isDefineQueries) {
                    if (_this13.districts[addressType].length == 1) {
                        _this13.signupInfo.address[addressType].district = _this13.districts[addressType][0];
                    }
                }
            }, function (error) {
                alert(error.message);
            });
        }
    }, {
        key: "summaryValue",
        value: function summaryValue(value) {
            return value ? value : "-";
        }
    }, {
        key: "summarySelectValue",
        value: function summarySelectValue(items, selectValue) {
            if (selectValue) {
                var obj = {};
                items.forEach(function (item) {
                    obj[item.id] = item.name;
                });
                return obj[selectValue];
            } else {
                return "-";
            }
        }
    }, {
        key: "signout",
        value: function signout() {
            delete this._$window.localStorage.user;
            this._$location.path('/');
        }
    }]);

    return UserController;
}();

angular.module('MainApp').controller('MainController', MainController);

angular.module('User').controller('UserController', UserController);

},{}],4:[function(require,module,exports){
'use strict';

/**
  * Created By: Pete Vejanurug
  * Email: p@lagobe.com
  * Phone: +66903263755
  */

reviewsCarousel.$inject = ["$timeout"];
notifySaved.$inject = ["$timeout"];
function mainPage() {
    "ngInject";

    return {
        restrict: 'E',
        link: function link(scope, elem, attrs) {
            var appMaster = {

                preLoader: function preLoader() {
                    imageSources = [];
                    $('img').each(function () {
                        var sources = $(this).attr('src');
                        imageSources.push(sources);
                    });
                    if ($(imageSources).load()) {
                        $('.pre-loader').fadeOut('slow');
                    }
                },

                smoothScroll: function smoothScroll() {
                    // Smooth Scrolling
                    $('a[href*=#]:not([href=#carousel-example-generic])').click(function () {
                        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {

                            var target = $(this.hash);
                            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                            if (target.length) {
                                $('html,body').animate({
                                    scrollTop: target.offset().top
                                }, 1000);
                                return false;
                            }
                        }
                    });
                },

                reviewsCarousel: function reviewsCarousel() {
                    // Reviews Carousel
                    $('.review-filtering').slick({
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        dots: false,
                        arrows: true,
                        autoplay: true,
                        autoplaySpeed: 5000,
                        responsive: [{
                            breakpoint: 824,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }]
                    });
                },

                screensCarousel: function screensCarousel() {
                    // Screens Carousel
                    $('.filtering').slick({
                        slidesToShow: 4,
                        slidesToScroll: 4,
                        dots: false,
                        responsive: [{
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2,
                                infinite: true,
                                dots: true
                            }
                        }, {
                            breakpoint: 600,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2
                            }
                        }, {
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }]
                    });

                    $('.js-filter-all').on('click', function () {
                        $('.filtering').slickUnfilter();
                        $('.filter a').removeClass('active');
                        $(this).addClass('active');
                    });

                    $('.js-filter-one').on('click', function () {
                        $('.filtering').slickFilter('.one');
                        $('.filter a').removeClass('active');
                        $(this).addClass('active');
                    });

                    $('.js-filter-two').on('click', function () {
                        $('.filtering').slickFilter('.two');
                        $('.filter a').removeClass('active');
                        $(this).addClass('active');
                    });

                    $('.js-filter-three').on('click', function () {
                        $('.filtering').slickFilter('.three');
                        $('.filter a').removeClass('active');
                        $(this).addClass('active');
                    });
                },

                animateScript: function animateScript() {
                    $('.scrollpoint.sp-effect1').waypoint(function () {
                        $(this).toggleClass('active');
                        $(this).toggleClass('animated fadeInLeft');
                    }, {
                        offset: '100%'
                    });
                    $('.scrollpoint.sp-effect2').waypoint(function () {
                        $(this).toggleClass('active');
                        $(this).toggleClass('animated fadeInRight');
                    }, {
                        offset: '100%'
                    });
                    $('.scrollpoint.sp-effect3').waypoint(function () {
                        $(this).toggleClass('active');
                        $(this).toggleClass('animated fadeInDown');
                    }, {
                        offset: '100%'
                    });
                    $('.scrollpoint.sp-effect4').waypoint(function () {
                        $(this).toggleClass('active');
                        $(this).toggleClass('animated fadeIn');
                    }, {
                        offset: '100%'
                    });
                    $('.scrollpoint.sp-effect5').waypoint(function () {
                        $(this).toggleClass('active');
                        $(this).toggleClass('animated fadeInUp');
                    }, {
                        offset: '100%'
                    });
                },

                //                revSlider: function () {
                //
                //                    var docHeight = $(window).height();
                //
                //
                //                    var mainSlider = $('.tp-banner').revolution({
                //                        delay: 9000,
                //                        startwidth: 1170,
                //                        startheight: docHeight,
                //                        hideThumbs: 10,
                //                        touchenabled: false,
                //                        fullWidth: "on",
                //                        hideTimerBar: "on",
                //                        fullScreen: "on",
                //                        onHoverStop: "off",
                //                        fullScreenOffsetContainer: ""
                //                    });
                //
                //                },

                scrollMenu: function scrollMenu() {
                    var num = 50; //number of pixels before modifying styles
                    if ($(window).scrollTop() > num) {
                        $('nav').addClass('scrolled');
                    }
                    $(window).bind('scroll', function () {
                        if ($(window).scrollTop() > num) {
                            $('nav').addClass('scrolled');
                        } else {
                            $('nav').removeClass('scrolled');
                        }
                    });

                    $('ul.navbar-nav li a').bind('click', function () {
                        if ($(this).closest('.navbar-collapse').hasClass('in')) {
                            $(this).closest('.navbar-collapse').removeClass('in');
                        }
                    });
                },
                placeHold: function placeHold() {
                    // run Placeholdem on all elements with placeholders
                    Placeholdem(document.querySelectorAll('[placeholder]'));
                },
                animateNumber: function animateNumber() {
                    $('.scrollpoint .number').waypoint(function () {
                        $(this).animateNumber({ number: $(this).attr('num-target') });
                    }, {
                        offset: '100%'
                    });

                    //                    $('.scrollpoint .number').animateNumber({
                    //                        number: 500
                    //                    }, {
                    //                        offset: '100%'
                    //                    });
                }

            }; // AppMaster


            $(document).ready(function () {

                //appMaster.smoothScroll();

                //appMaster.reviewsCarousel();

                appMaster.screensCarousel();

                //                appMaster.animateScript();

                //                appMaster.revSlider();

                appMaster.scrollMenu();

                //appMaster.placeHold();

                //appMaster.animateNumber();

                //appMaster.preLoader();
            });
        }
    };
}

function embedPdf() {
    return {
        restrict: 'A',
        link: function link(scope, elem, attrs) {
            $(elem).gdocsViewer({ width: "100%", height: "100%" });
        }
    };
}

function scrollVisible() {
    "ngInject";

    return {
        restrict: 'A',
        link: function link(scope, elem, attrs) {
            if (elem.hasClass('scrollpoint')) {
                if (elem.hasClass('sp-effect1')) {
                    $(elem).waypoint(function () {
                        $(this).toggleClass('active');
                        $(this).toggleClass('animated fadeInLeft');
                    }, {
                        offset: '100%'
                    });
                } else if (elem.hasClass('sp-effect2')) {
                    $(elem).waypoint(function () {
                        $(this).toggleClass('active');
                        $(this).toggleClass('animated fadeInRight');
                    }, {
                        offset: '100%'
                    });
                } else if (elem.hasClass('sp-effect3')) {
                    $(elem).waypoint(function () {
                        $(this).toggleClass('active');
                        $(this).toggleClass('animated fadeInDown');
                    }, {
                        offset: '100%'
                    });
                } else if (elem.hasClass('sp-effect4')) {
                    $(elem).waypoint(function () {
                        $(this).toggleClass('active');
                        $(this).toggleClass('animated fadeIn');
                    }, {
                        offset: '100%'
                    });
                } else if (elem.hasClass('sp-effect5')) {
                    $(elem).waypoint(function () {
                        $(this).toggleClass('active');
                        $(this).toggleClass('animated fadeInUp');
                    }, {
                        offset: '100%'
                    });
                }
            }
        }
    };
}

function registerMenu() {
    "ngInject";

    return {
        restrict: 'A',
        link: function link(scope, elem, attrs) {
            elem.bind('click', function (event) {
                event.preventDefault();

                $('#' + attrs.menu + 'Tab')[0].click();

                $('#' + attrs.menu + 'Form input.form-control')[0].focus();
            });
        }
    };
}

function registerTab() {
    "ngInject";

    return {
        restrict: 'A',
        link: function link(scope, elem, attrs) {
            elem.bind('click', function (event) {
                event.preventDefault();
                $(elem).tab('show');
            });
        }
    };
}

function numCountSpeed() {
    "ngInject";

    return {
        restrict: 'A',
        link: function link(scope, elem, attrs) {
            $(elem).waypoint(function () {
                $(this).animateNumber({ number: attrs.numTarget });
            }, {
                offset: '100%'
            });
        }
    };
}

function reviewsCarousel($timeout) {
    "ngInject";

    return {
        restrict: 'A',
        link: function link(scope, elem, attrs) {
            $(elem).waypoint(function () {
                $timeout(function () {
                    $(elem).slick({
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        dots: false,
                        arrows: true,
                        autoplay: true,
                        autoplaySpeed: 5000,
                        responsive: [{
                            breakpoint: 824,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }]
                    });
                }, 100);
            });
        }
    };
}

function notifySaved($timeout) {
    "ngInject";

    return {
        restrict: 'E',
        template: 'บันทึกเรียบร้อย',
        link: function link(scope, elem, attrs) {
            elem.css({
                display: "none",
                opacity: 0
            });

            $(elem).on('show', function () {
                elem.css({
                    display: 'block',
                    opacity: 1
                });

                $timeout(function () {
                    $(elem).animate({
                        opacity: 0
                    }, {
                        duration: 1800,
                        complete: function complete() {
                            elem.css('display', 'none');
                        }
                    });
                }, 600);
            });
        }
    };
}

angular.module('MainApp').directive('mainPage', mainPage).directive('embedPdf', embedPdf).directive('scrollVisible', scrollVisible).directive('registerMenu', registerMenu).directive('registerTab', registerTab).directive('numCountSpeed', numCountSpeed).directive('reviewsCarousel', reviewsCarousel).directive('notifySaved', notifySaved);

function signupPage() {
    "ngInject";

    return {
        restrict: 'E',
        link: function link(scope, elem, attrs) {}
    };
}

function stepTab() {
    return {
        restrict: 'A',
        link: function link(scope, elem, attrs) {
            elem.bind('click', function (event) {
                event.preventDefault();
                $(elem).tab('show');
            });
        }
    };
}

function signOnBehalfOf() {
    return {
        restrict: 'A',
        link: function link(scope, elem, attrs) {
            $(elem).bind('loadData', function () {
                scope.user.signOnbehalfOfSwitch = attrs.value;
            });

            $(elem).bind('click', function () {
                scope.user.signOnbehalfOfSwitch = attrs.value;
                scope.$apply();
            });
        }
    };
}

function storeUploadDocument() {
    return {
        restrict: 'A',
        link: function link(scope, elem, attrs) {
            elem.bind('change', function () {
                var files = event.target.files;
                scope.user.file[attrs.businessType][attrs.documentName] = files[0];
                scope.user.uploadStoreDocument(attrs.businessType, attrs.documentName);
            });
        }
    };
}

function storeIndividualSwitchContactSameRegister() {
    return {
        restrict: 'A',
        link: function link(scope, elem, attrs) {
            switchContactSameRegister();

            $(elem).bind('loadData', function () {
                switchContactSameRegister();
            });

            $(elem).bind('click', function () {
                switchContactSameRegister();
                scope.$apply();
            });

            function switchContactSameRegister() {
                var inputs = $('#storeIndividualContactForm .form-control');
                var isContactSameRegister = scope.user.signupInfo.store.individual.isContactSameRegister;

                if (isContactSameRegister) {
                    inputs.attr('readonly', 'readonly');

                    scope.user.updateStoreIndividualContactValues();
                } else {
                    inputs.removeAttr('readonly');
                }
            }
        }
    };
}

function addressSwitchDocumentdropSamePickup() {
    return {
        restrict: 'A',
        link: function link(scope, elem, attrs) {
            $(elem).bind('loadData', function () {
                switchDocumentdropSamePickup();
            });

            $(elem).bind('click', function () {
                switchDocumentdropSamePickup();
                scope.$apply();
            });

            function switchDocumentdropSamePickup() {
                var inputs = $('#addressDocumentDropForm .form-control');
                var isDocumentdropSamePickup = scope.user.signupInfo.address.isDocumentDropSamePickup;
                if (isDocumentdropSamePickup) {
                    inputs.attr('readonly', 'readonly');

                    scope.user.updateAddressDocumentDropValues();
                } else {
                    inputs.removeAttr('readonly');
                }
            }
        }
    };
}

angular.module('User').directive('signupPage', signupPage).directive('stepTab', stepTab).directive('signOnBehalfOf', signOnBehalfOf).directive('storeUploadDocument', storeUploadDocument).directive('storeIndividualSwitchContactSameRegister', storeIndividualSwitchContactSameRegister).directive('addressSwitchDocumentdropSamePickup', addressSwitchDocumentdropSamePickup);

},{}],5:[function(require,module,exports){
'use strict';

/**
  * Created By: Pete Vejanurug
  * Email: p@lagobe.com
  * Phone: +66903263755
  */

angular.module('MainApp', ['uiRouterStyles', 'ui.bootstrap', 'ui.filters', 'User']);

angular.module('User', []);

},{}],6:[function(require,module,exports){
"use strict";

/**
  * Created By: Pete Vejanurug
  * Email: p@lagobe.com
  * Phone: +66903263755
  */

mainConfig.$inject = ["$urlRouterProvider", "$stateProvider", "$locationProvider"];
function mainConfig($urlRouterProvider, $stateProvider, $locationProvider) {
    "ngInject";

    $locationProvider.html5Mode(true);

    //    $locationProvider.html5Mode({
    //        enabled: true,
    //        requireBase: false
    //    });


    $urlRouterProvider.otherwise("/");

    $stateProvider.state("boilerplate", {
        templateUrl: "assets/templates/boilerplate.html",
        controller: "MainController",
        controllerAs: "main"
    }).state("boilerplate.main", {
        url: "/",
        templateUrl: "assets/templates/main.html",
        controller: "MainController",
        controllerAs: "main"
    }).state("boilerplate.privacy", {
        url: "/privacy",
        templateUrl: "assets/templates/privacy.html",
        //            controller: "UserController",
        //            controllerAs: "user",
        data: {
            css: "assets/css/privacy.css"
        }
    })
    //        .state("dashboard", {
    //            url: "/",
    //            templateUrl: "assets/templates/dashboard.html",
    //            controller: "MainController",
    //            controllerAs: "main",
    //        })
    .state("signup", {
        url: "/signup",
        templateUrl: "assets/templates/signup.html",
        controller: "UserController",
        controllerAs: "user",
        data: {
            css: ["assets/css/signup.css", "assets/css/print-a4.css"]
        }
    });
}

angular.module('MainApp').config(mainConfig);

},{}],7:[function(require,module,exports){
"use strict";

/**
  * Created By: Pete Vejanurug
  * Email: p@lagobe.com
  * Phone: +66903263755
  */

mainRun.$inject = ["$rootScope", "$state", "mainService"];
function mainRun($rootScope, $state, mainService) {
  "ngInject";

  //    $rootScope.$on('$stateChangeSuccess', (event, next, toState) => {
  //        if(mainService.isLoggedIn()){
  //            $state.go('dashboard');
  //        }
  //        else{
  //            $state.go('main');
  //        }
  //    });
}

angular.module('MainApp').run(mainRun);

},{}],8:[function(require,module,exports){
'use strict';

/**
  * Created By: Pete Vejanurug
  * Email: p@lagobe.com
  * Phone: +66903263755
  */

mainService.$inject = ["PAGE", "CONFIG", "$q", "$window", "$http"];
userService.$inject = ["CONFIG", "$window", "$http", "$q"];
function mainService(PAGE, CONFIG, $q, $window, $http) {
    "ngInject";

    return {
        signin: signin,
        signUp: signUp,
        create: create,
        update: update,
        isLoggedIn: isLoggedIn,
        getLabel: getLabel
    };

    function signin(user) {
        var deferred = $q.defer();
        $http.post(CONFIG.PATH.APIS + '/authenticate', user).then(function (respond) {
            deferred.resolve(respond.data);
        }, function (reason) {
            deferred.reject(reason.data);
        });
        return deferred.promise;
    }

    function signUp(user) {
        var deferred = $q.defer();
        $http.post(CONFIG.PATH.APIS + '/users', user).then(function (respond) {
            deferred.resolve(respond.data);
        }, function (reason) {
            deferred.reject(reason.data);
        });
        return deferred.promise;
    }

    function create() {}

    function update() {}

    function isLoggedIn() {
        return $window.localStorage.userInfo != null;
    }

    function getLabel(page, language) {
        var _language = void 0;
        if (!language) {
            if ($window.localStorage.lang) {
                _language = $window.localStorage.lang;
            } else {
                _language = PAGE.LANGUAGE;
            }
        } else {
            _language = language;
        }
        $window.localStorage.lang = _language;

        var promise = $http.get('assets/languages/' + page + '/' + _language + '.json').then(function (response) {
            return response.data;
        });
        return promise;
    }
}

function userService(CONFIG, $window, $http, $q) {
    "ngInject";

    return {
        uploadFile: uploadFile,
        save: save,
        getCompanyPrefixes: getCompanyPrefixes,
        getBanks: getBanks,
        getProvinces: getProvinces,
        getAmphurs: getAmphurs,
        getDistricts: getDistricts,
        getShopInfo: getShopInfo,
        getAWSS3URL: getAWSS3URL
    };

    function uploadFile(documentName, file) {
        var deferred = $q.defer();

        var fd = new FormData();fd.append('file', file);
        var userStorage = JSON.parse($window.localStorage.user);
        var userAccountID = userStorage.id;
        $http.post(CONFIG.PATH.APIS + '/awsS3/upload/' + userAccountID + '?documentName=' + documentName, fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }).then(function (respond) {
            deferred.resolve(respond.data);
        }, function (reason) {
            deferred.reject(reason.data);
        });
        return deferred.promise;
    }

    function save(shopInfo) {
        var deferred = $q.defer();
        var userStorage = JSON.parse($window.localStorage.user);
        var userAccountID = userStorage.id;
        $http.put(CONFIG.PATH.APIS + '/shops/user/' + userAccountID, shopInfo).then(function (respond) {
            deferred.resolve(respond.data);
        }, function (reason) {
            deferred.reject(reason.data);
        });
        return deferred.promise;
    }

    function getBanks() {
        var deferred = $q.defer();
        $http.get(CONFIG.PATH.APIS + '/banks').then(function (respond) {
            deferred.resolve(respond.data);
        }, function (reason) {
            deferred.reject(reason.data);
        });
        return deferred.promise;
    }

    function getCompanyPrefixes() {
        var deferred = $q.defer();
        $http.get(CONFIG.PATH.APIS + '/companies/prefixes').then(function (respond) {
            deferred.resolve(respond.data);
        }, function (reason) {
            deferred.reject(reason.data);
        });
        return deferred.promise;
    }

    function getProvinces(queries) {
        var deferred = $q.defer();
        jQuery.ajax(CONFIG.PATH.APIS + '/location/provinces?zipcode=' + queries.zipcode, {
            type: "GET",
            async: false,
            success: function success(data) {
                deferred.resolve(data);
            },
            failure: function failure(data) {
                deferred.reject(data);
            }
        });
        return deferred.promise;
    }

    function getAmphurs(queries) {
        var deferred = $q.defer();
        jQuery.ajax(CONFIG.PATH.APIS + '/location/amphurs?zipcode=' + queries.zipcode + '&province=' + queries.province, {
            type: "GET",
            async: false,
            success: function success(data) {
                deferred.resolve(data);
            },
            failure: function failure(data) {
                deferred.reject(data);
            }
        });
        return deferred.promise;
    }

    function getDistricts(queries) {
        var deferred = $q.defer();
        jQuery.ajax(CONFIG.PATH.APIS + '/location/districts?zipcode=' + queries.zipcode + '&province=' + queries.province + '&amphur=' + queries.amphur, {
            type: "GET",
            async: false,
            success: function success(data) {
                deferred.resolve(data);
            },
            failure: function failure(data) {
                deferred.reject(data);
            }
        });
        return deferred.promise;
    }

    function getShopInfo() {
        var deferred = $q.defer();
        var userStorage = JSON.parse($window.localStorage.user);
        var userAccountID = userStorage.id;
        $http.get(CONFIG.PATH.APIS + '/shops/user/' + userAccountID).then(function (respond) {
            deferred.resolve(respond.data);
        }, function (reason) {
            deferred.reject(reason.data);
        });
        return deferred.promise;
    }

    function getAWSS3URL(awsS3Key) {
        var deferred = $q.defer();
        $http.get(CONFIG.PATH.APIS + '/awsS3/url?awsS3Key=' + awsS3Key).then(function (respond) {
            deferred.resolve(respond.data);
        }, function (reason) {
            deferred.reject(reason.data);
        });
        return deferred.promise;
    }
}

angular.module('MainApp').factory('mainService', mainService);

angular.module('User').factory('userService', userService);

},{}],9:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * AngularUI - The companion suite for AngularJS
 * @version v0.4.0 - 2013-02-15
 * @link http://angular-ui.github.com
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
angular.module("ui.config", []).value("ui.config", {}), angular.module("ui.filters", ["ui.config"]), angular.module("ui.directives", ["ui.config"]), angular.module("ui", ["ui.filters", "ui.directives", "ui.config"]), angular.module("ui.directives").directive("uiAnimate", ["ui.config", "$timeout", function (e, t) {
  var n = {};return angular.isString(e.animate) ? n["class"] = e.animate : e.animate && (n = e.animate), { restrict: "A", link: function link(e, r, i) {
      var s = {};i.uiAnimate && (s = e.$eval(i.uiAnimate), angular.isString(s) && (s = { "class": s })), s = angular.extend({ "class": "ui-animate" }, n, s), r.addClass(s["class"]), t(function () {
        r.removeClass(s["class"]);
      }, 20, !1);
    } };
}]), angular.module("ui.directives").directive("uiCalendar", ["ui.config", "$parse", function (e, t) {
  return e.uiCalendar = e.uiCalendar || {}, { require: "ngModel", restrict: "A", link: function link(t, n, r, i) {
      function a() {
        t.calendar = n.html("");var i = t.calendar.fullCalendar("getView");i && (i = i.name);var o,
            u = { defaultView: i, eventSources: s };r.uiCalendar ? o = t.$eval(r.uiCalendar) : o = {}, angular.extend(u, e.uiCalendar, o), t.calendar.fullCalendar(u);
      }var s = t.$eval(r.ngModel),
          o = 0,
          u = function u() {
        var e = t.$eval(r.equalsTracker);return o = 0, angular.forEach(s, function (e, t) {
          angular.isArray(e) && (o += e.length);
        }), angular.isNumber(e) ? o + s.length + e : o + s.length;
      };a(), t.$watch(u, function (e, t) {
        a();
      });
    } };
}]), angular.module("ui.directives").directive("uiCodemirror", ["ui.config", "$timeout", function (e, t) {
  "use strict";
  var n = ["cursorActivity", "viewportChange", "gutterClick", "focus", "blur", "scroll", "update"];return { restrict: "A", require: "ngModel", link: function link(r, i, s, o) {
      var u, a, f, l, c;if (i[0].type !== "textarea") throw new Error("uiCodemirror3 can only be applied to a textarea element");u = e.codemirror || {}, a = angular.extend({}, u, r.$eval(s.uiCodemirror)), f = function f(e) {
        return function (t, n) {
          var i = t.getValue();i !== o.$viewValue && (o.$setViewValue(i), r.$apply()), typeof e == "function" && e(t, n);
        };
      }, l = function l() {
        c = CodeMirror.fromTextArea(i[0], a), c.on("change", f(a.onChange));for (var e = 0, u = n.length, l; e < u; ++e) {
          l = a["on" + n[e].charAt(0).toUpperCase() + n[e].slice(1)];if (l === void 0) continue;if (typeof l != "function") continue;c.on(n[e], l);
        }o.$formatters.push(function (e) {
          if (angular.isUndefined(e) || e === null) return "";if (angular.isObject(e) || angular.isArray(e)) throw new Error("ui-codemirror cannot use an object or an array as a model");return e;
        }), o.$render = function () {
          c.setValue(o.$viewValue);
        }, s.uiRefresh && r.$watch(s.uiRefresh, function (e, n) {
          e !== n && t(c.refresh);
        });
      }, t(l);
    } };
}]), angular.module("ui.directives").directive("uiCurrency", ["ui.config", "currencyFilter", function (e, t) {
  var n = { pos: "ui-currency-pos", neg: "ui-currency-neg", zero: "ui-currency-zero" };return e.currency && angular.extend(n, e.currency), { restrict: "EAC", require: "ngModel", link: function link(e, r, i, s) {
      var o, u, a;o = angular.extend({}, n, e.$eval(i.uiCurrency)), u = function u(e) {
        var n;return n = e * 1, r.toggleClass(o.pos, n > 0), r.toggleClass(o.neg, n < 0), r.toggleClass(o.zero, n === 0), e === "" ? r.text("") : r.text(t(n, o.symbol)), !0;
      }, s.$render = function () {
        a = s.$viewValue, r.val(a), u(a);
      };
    } };
}]), angular.module("ui.directives").directive("uiDate", ["ui.config", function (e) {
  "use strict";
  var t;return t = {}, angular.isObject(e.date) && angular.extend(t, e.date), { require: "?ngModel", link: function link(t, n, r, i) {
      var s = function s() {
        return angular.extend({}, e.date, t.$eval(r.uiDate));
      },
          o = function o() {
        var e = s();if (i) {
          var r = function r() {
            t.$apply(function () {
              var e = n.datepicker("getDate");n.datepicker("setDate", n.val()), i.$setViewValue(e), n.blur();
            });
          };if (e.onSelect) {
            var o = e.onSelect;e.onSelect = function (e, n) {
              r(), t.$apply(function () {
                o(e, n);
              });
            };
          } else e.onSelect = r;n.bind("change", r), i.$render = function () {
            var e = i.$viewValue;if (angular.isDefined(e) && e !== null && !angular.isDate(e)) throw new Error("ng-Model value must be a Date object - currently it is a " + (typeof e === "undefined" ? "undefined" : _typeof(e)) + " - use ui-date-format to convert it from a string");n.datepicker("setDate", e);
          };
        }n.datepicker("destroy"), n.datepicker(e), i && i.$render();
      };t.$watch(s, o, !0);
    } };
}]).directive("uiDateFormat", ["ui.config", function (e) {
  var t = { require: "ngModel", link: function link(t, n, r, i) {
      var s = r.uiDateFormat || e.dateFormat;s ? (i.$formatters.push(function (e) {
        if (angular.isString(e)) return $.datepicker.parseDate(s, e);
      }), i.$parsers.push(function (e) {
        if (e) return $.datepicker.formatDate(s, e);
      })) : (i.$formatters.push(function (e) {
        if (angular.isString(e)) return new Date(e);
      }), i.$parsers.push(function (e) {
        if (e) return e.toISOString();
      }));
    } };return t;
}]), angular.module("ui.directives").directive("uiEvent", ["$parse", function (e) {
  return function (t, n, r) {
    var i = t.$eval(r.uiEvent);angular.forEach(i, function (r, i) {
      var s = e(r);n.bind(i, function (e) {
        var n = Array.prototype.slice.call(arguments);n = n.splice(1), t.$apply(function () {
          s(t, { $event: e, $params: n });
        });
      });
    });
  };
}]), angular.module("ui.directives").directive("uiIf", [function () {
  return { transclude: "element", priority: 1e3, terminal: !0, restrict: "A", compile: function compile(e, t, n) {
      return function (e, t, r) {
        var i, s;e.$watch(r.uiIf, function (r) {
          i && (i.remove(), i = undefined), s && (s.$destroy(), s = undefined), r && (s = e.$new(), n(s, function (e) {
            i = e, t.after(e);
          }));
        });
      };
    } };
}]), angular.module("ui.directives").directive("uiJq", ["ui.config", "$timeout", function (t, n) {
  return { restrict: "A", compile: function compile(r, i) {
      if (!angular.isFunction(r[i.uiJq])) throw new Error('ui-jq: The "' + i.uiJq + '" function does not exist');var s = t.jq && t.jq[i.uiJq];return function (t, r, i) {
        function u() {
          n(function () {
            r[i.uiJq].apply(r, o);
          }, 0, !1);
        }var o = [];i.uiOptions ? (o = t.$eval("[" + i.uiOptions + "]"), angular.isObject(s) && angular.isObject(o[0]) && (o[0] = angular.extend({}, s, o[0]))) : s && (o = [s]), i.ngModel && r.is("select,input,textarea") && r.on("change", function () {
          r.trigger("input");
        }), i.uiRefresh && t.$watch(i.uiRefresh, function (e) {
          u();
        }), u();
      };
    } };
}]), angular.module("ui.directives").factory("keypressHelper", ["$parse", function (t) {
  var n = { 8: "backspace", 9: "tab", 13: "enter", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home", 37: "left", 38: "up", 39: "right", 40: "down", 45: "insert", 46: "delete" },
      r = function r(e) {
    return e.charAt(0).toUpperCase() + e.slice(1);
  };return function (e, i, s, o) {
    var u,
        a = [];u = i.$eval(o["ui" + r(e)]), angular.forEach(u, function (e, n) {
      var r, i;i = t(e), angular.forEach(n.split(" "), function (e) {
        r = { expression: i, keys: {} }, angular.forEach(e.split("-"), function (e) {
          r.keys[e] = !0;
        }), a.push(r);
      });
    }), s.bind(e, function (t) {
      var r = t.metaKey || t.altKey,
          s = t.ctrlKey,
          o = t.shiftKey,
          u = t.keyCode;e === "keypress" && !o && u >= 97 && u <= 122 && (u -= 32), angular.forEach(a, function (e) {
        var u = e.keys[n[t.keyCode]] || e.keys[t.keyCode.toString()] || !1,
            a = e.keys.alt || !1,
            f = e.keys.ctrl || !1,
            l = e.keys.shift || !1;u && a == r && f == s && l == o && i.$apply(function () {
          e.expression(i, { $event: t });
        });
      });
    });
  };
}]), angular.module("ui.directives").directive("uiKeydown", ["keypressHelper", function (e) {
  return { link: function link(t, n, r) {
      e("keydown", t, n, r);
    } };
}]), angular.module("ui.directives").directive("uiKeypress", ["keypressHelper", function (e) {
  return { link: function link(t, n, r) {
      e("keypress", t, n, r);
    } };
}]), angular.module("ui.directives").directive("uiKeyup", ["keypressHelper", function (e) {
  return { link: function link(t, n, r) {
      e("keyup", t, n, r);
    } };
}]), function () {
  function t(e, t, n, r) {
    angular.forEach(t.split(" "), function (t) {
      var i = { type: "map-" + t };google.maps.event.addListener(n, t, function (t) {
        r.triggerHandler(angular.extend({}, i, t)), e.$$phase || e.$apply();
      });
    });
  }function n(n, r) {
    e.directive(n, [function () {
      return { restrict: "A", link: function link(e, i, s) {
          e.$watch(s[n], function (n) {
            t(e, r, n, i);
          });
        } };
    }]);
  }var e = angular.module("ui.directives");e.directive("uiMap", ["ui.config", "$parse", function (e, n) {
    var r = "bounds_changed center_changed click dblclick drag dragend dragstart heading_changed idle maptypeid_changed mousemove mouseout mouseover projection_changed resize rightclick tilesloaded tilt_changed zoom_changed",
        i = e.map || {};return { restrict: "A", link: function link(e, s, o) {
        var u = angular.extend({}, i, e.$eval(o.uiOptions)),
            a = new google.maps.Map(s[0], u),
            f = n(o.uiMap);f.assign(e, a), t(e, r, a, s);
      } };
  }]), e.directive("uiMapInfoWindow", ["ui.config", "$parse", "$compile", function (e, n, r) {
    var i = "closeclick content_change domready position_changed zindex_changed",
        s = e.mapInfoWindow || {};return { link: function link(e, o, u) {
        var a = angular.extend({}, s, e.$eval(u.uiOptions));a.content = o[0];var f = n(u.uiMapInfoWindow),
            l = f(e);l || (l = new google.maps.InfoWindow(a), f.assign(e, l)), t(e, i, l, o), o.replaceWith("<div></div>");var c = l.open;l.open = function (n, i, s, u, a, f) {
          r(o.contents())(e), c.call(l, n, i, s, u, a, f);
        };
      } };
  }]), n("uiMapMarker", "animation_changed click clickable_changed cursor_changed dblclick drag dragend draggable_changed dragstart flat_changed icon_changed mousedown mouseout mouseover mouseup position_changed rightclick shadow_changed shape_changed title_changed visible_changed zindex_changed"), n("uiMapPolyline", "click dblclick mousedown mousemove mouseout mouseover mouseup rightclick"), n("uiMapPolygon", "click dblclick mousedown mousemove mouseout mouseover mouseup rightclick"), n("uiMapRectangle", "bounds_changed click dblclick mousedown mousemove mouseout mouseover mouseup rightclick"), n("uiMapCircle", "center_changed click dblclick mousedown mousemove mouseout mouseover mouseup radius_changed rightclick"), n("uiMapGroundOverlay", "click dblclick");
}(), angular.module("ui.directives").directive("uiMask", [function () {
  return { require: "ngModel", link: function link(e, t, n, r) {
      r.$render = function () {
        var i = r.$viewValue || "";t.val(i), t.mask(e.$eval(n.uiMask));
      }, r.$parsers.push(function (e) {
        var n = t.isMaskValid() || angular.isUndefined(t.isMaskValid()) && t.val().length > 0;return r.$setValidity("mask", n), n ? e : undefined;
      }), t.bind("keyup", function () {
        e.$apply(function () {
          r.$setViewValue(t.mask());
        });
      });
    } };
}]), angular.module("ui.directives").directive("uiReset", ["ui.config", function (e) {
  var t = null;return e.reset !== undefined && (t = e.reset), { require: "ngModel", link: function link(e, n, r, i) {
      var s;s = angular.element('<a class="ui-reset" />'), n.wrap('<span class="ui-resetwrap" />').after(s), s.bind("click", function (n) {
        n.preventDefault(), e.$apply(function () {
          r.uiReset ? i.$setViewValue(e.$eval(r.uiReset)) : i.$setViewValue(t), i.$render();
        });
      });
    } };
}]), angular.module("ui.directives").directive("uiRoute", ["$location", "$parse", function (e, t) {
  return { restrict: "AC", compile: function compile(n, r) {
      var i;if (r.uiRoute) i = "uiRoute";else if (r.ngHref) i = "ngHref";else {
        if (!r.href) throw new Error("uiRoute missing a route or href property on " + n[0]);i = "href";
      }return function (n, r, s) {
        function a(t) {
          (hash = t.indexOf("#")) > -1 && (t = t.substr(hash + 1)), u = function u() {
            o(n, e.path().indexOf(t) > -1);
          }, u();
        }function f(t) {
          (hash = t.indexOf("#")) > -1 && (t = t.substr(hash + 1)), u = function u() {
            var i = new RegExp("^" + t + "$", ["i"]);o(n, i.test(e.path()));
          }, u();
        }var o = t(s.ngModel || s.routeModel || "$uiRoute").assign,
            u = angular.noop;switch (i) {case "uiRoute":
            s.uiRoute ? f(s.uiRoute) : s.$observe("uiRoute", f);break;case "ngHref":
            s.ngHref ? a(s.ngHref) : s.$observe("ngHref", a);break;case "href":
            a(s.href);}n.$on("$routeChangeSuccess", function () {
          u();
        });
      };
    } };
}]), angular.module("ui.directives").directive("uiScrollfix", ["$window", function (e) {
  "use strict";
  return { link: function link(t, n, r) {
      var i = n.offset().top;r.uiScrollfix ? r.uiScrollfix.charAt(0) === "-" ? r.uiScrollfix = i - r.uiScrollfix.substr(1) : r.uiScrollfix.charAt(0) === "+" && (r.uiScrollfix = i + parseFloat(r.uiScrollfix.substr(1))) : r.uiScrollfix = i, angular.element(e).on("scroll.ui-scrollfix", function () {
        var t;if (angular.isDefined(e.pageYOffset)) t = e.pageYOffset;else {
          var i = document.compatMode && document.compatMode !== "BackCompat" ? document.documentElement : document.body;t = i.scrollTop;
        }!n.hasClass("ui-scrollfix") && t > r.uiScrollfix ? n.addClass("ui-scrollfix") : n.hasClass("ui-scrollfix") && t < r.uiScrollfix && n.removeClass("ui-scrollfix");
      });
    } };
}]), angular.module("ui.directives").directive("uiSelect2", ["ui.config", "$timeout", function (e, t) {
  var n = {};return e.select2 && angular.extend(n, e.select2), { require: "?ngModel", compile: function compile(e, r) {
      var i,
          s,
          o,
          u = e.is("select"),
          a = r.multiple !== undefined;return e.is("select") && (s = e.find("option[ng-repeat], option[data-ng-repeat]"), s.length && (o = s.attr("ng-repeat") || s.attr("data-ng-repeat"), i = jQuery.trim(o.split("|")[0]).split(" ").pop())), function (e, r, s, o) {
        var f = angular.extend({}, n, e.$eval(s.uiSelect2));u ? (delete f.multiple, delete f.initSelection) : a && (f.multiple = !0);if (o) {
          o.$render = function () {
            u ? r.select2("val", o.$modelValue) : a ? o.$modelValue ? angular.isArray(o.$modelValue) ? r.select2("data", o.$modelValue) : r.select2("val", o.$modelValue) : r.select2("data", []) : angular.isObject(o.$modelValue) ? r.select2("data", o.$modelValue) : r.select2("val", o.$modelValue);
          }, i && e.$watch(i, function (e, n, i) {
            if (!e) return;t(function () {
              r.select2("val", o.$viewValue), r.trigger("change");
            });
          });if (!u) {
            r.bind("change", function () {
              e.$apply(function () {
                o.$setViewValue(r.select2("data"));
              });
            });if (f.initSelection) {
              var l = f.initSelection;f.initSelection = function (e, t) {
                l(e, function (e) {
                  o.$setViewValue(e), t(e);
                });
              };
            }
          }
        }s.$observe("disabled", function (e) {
          r.select2(e && "disable" || "enable");
        }), s.ngMultiple && e.$watch(s.ngMultiple, function (e) {
          r.select2(f);
        }), r.val(e.$eval(s.ngModel)), t(function () {
          r.select2(f), !f.initSelection && !u && o.$setViewValue(r.select2("data"));
        });
      };
    } };
}]), angular.module("ui.directives").directive("uiShow", [function () {
  return function (e, t, n) {
    e.$watch(n.uiShow, function (e, n) {
      e ? t.addClass("ui-show") : t.removeClass("ui-show");
    });
  };
}]).directive("uiHide", [function () {
  return function (e, t, n) {
    e.$watch(n.uiHide, function (e, n) {
      e ? t.addClass("ui-hide") : t.removeClass("ui-hide");
    });
  };
}]).directive("uiToggle", [function () {
  return function (e, t, n) {
    e.$watch(n.uiToggle, function (e, n) {
      e ? t.removeClass("ui-hide").addClass("ui-show") : t.removeClass("ui-show").addClass("ui-hide");
    });
  };
}]), angular.module("ui.directives").directive("uiSortable", ["ui.config", function (e) {
  return { require: "?ngModel", link: function link(t, n, r, i) {
      var s, o, u, a, f, l, c, h, p;f = angular.extend({}, e.sortable, t.$eval(r.uiSortable)), i && (i.$render = function () {
        n.sortable("refresh");
      }, u = function u(e, t) {
        t.item.sortable = { index: t.item.index() };
      }, a = function a(e, t) {
        t.item.sortable.resort = i;
      }, s = function s(e, t) {
        t.item.sortable.relocate = !0, i.$modelValue.splice(t.item.index(), 0, t.item.sortable.moved);
      }, o = function o(e, t) {
        i.$modelValue.length === 1 ? t.item.sortable.moved = i.$modelValue.splice(0, 1)[0] : t.item.sortable.moved = i.$modelValue.splice(t.item.sortable.index, 1)[0];
      }, onStop = function onStop(e, n) {
        if (n.item.sortable.resort && !n.item.sortable.relocate) {
          var r, i;i = n.item.sortable.index, r = n.item.index(), i < r && r--, n.item.sortable.resort.$modelValue.splice(r, 0, n.item.sortable.resort.$modelValue.splice(i, 1)[0]);
        }(n.item.sortable.resort || n.item.sortable.relocate) && t.$apply();
      }, h = f.start, f.start = function (e, t) {
        u(e, t), typeof h == "function" && h(e, t);
      }, _stop = f.stop, f.stop = function (e, t) {
        onStop(e, t), typeof _stop == "function" && _stop(e, t);
      }, p = f.update, f.update = function (e, t) {
        a(e, t), typeof p == "function" && p(e, t);
      }, l = f.receive, f.receive = function (e, t) {
        s(e, t), typeof l == "function" && l(e, t);
      }, c = f.remove, f.remove = function (e, t) {
        o(e, t), typeof c == "function" && c(e, t);
      }), n.sortable(f);
    } };
}]), angular.module("ui.directives").directive("uiTinymce", ["ui.config", function (e) {
  return e.tinymce = e.tinymce || {}, { require: "ngModel", link: function link(t, n, r, i) {
      var s,
          o = { onchange_callback: function onchange_callback(e) {
          e.isDirty() && (e.save(), i.$setViewValue(n.val()), t.$$phase || t.$apply());
        }, handle_event_callback: function handle_event_callback(e) {
          return this.isDirty() && (this.save(), i.$setViewValue(n.val()), t.$$phase || t.$apply()), !0;
        }, setup: function setup(e) {
          e.onSetContent.add(function (e, r) {
            e.isDirty() && (e.save(), i.$setViewValue(n.val()), t.$$phase || t.$apply());
          });
        } };r.uiTinymce ? s = t.$eval(r.uiTinymce) : s = {}, angular.extend(o, e.tinymce, s), setTimeout(function () {
        n.tinymce(o);
      });
    } };
}]), angular.module("ui.directives").directive("uiValidate", function () {
  return { restrict: "A", require: "ngModel", link: function link(e, t, n, r) {
      var i,
          s,
          o = {},
          u = e.$eval(n.uiValidate);if (!u) return;angular.isString(u) && (u = { validator: u }), angular.forEach(u, function (t, n) {
        i = function i(_i) {
          return e.$eval(t, { $value: _i }) ? (r.$setValidity(n, !0), _i) : (r.$setValidity(n, !1), undefined);
        }, o[n] = i, r.$formatters.push(i), r.$parsers.push(i);
      }), n.uiValidateWatch && (s = e.$eval(n.uiValidateWatch), angular.isString(s) ? e.$watch(s, function () {
        angular.forEach(o, function (e, t) {
          e(r.$modelValue);
        });
      }) : angular.forEach(s, function (t, n) {
        e.$watch(t, function () {
          o[n](r.$modelValue);
        });
      }));
    } };
}), angular.module("ui.filters").filter("format", function () {
  return function (e, t) {
    if (!e) return e;var n = e.toString(),
        r;return t === undefined ? n : !angular.isArray(t) && !angular.isObject(t) ? n.split("$0").join(t) : (r = angular.isArray(t) && "$" || ":", angular.forEach(t, function (e, t) {
      n = n.split(r + t).join(e);
    }), n);
  };
}), angular.module("ui.filters").filter("highlight", function () {
  return function (e, t, n) {
    return t || angular.isNumber(t) ? (e = e.toString(), t = t.toString(), n ? e.split(t).join('<span class="ui-match">' + t + "</span>") : e.replace(new RegExp(t, "gi"), '<span class="ui-match">$&</span>')) : e;
  };
}), angular.module("ui.filters").filter("inflector", function () {
  function e(e) {
    return e.replace(/^([a-z])|\s+([a-z])/g, function (e) {
      return e.toUpperCase();
    });
  }function t(e, t) {
    return e.replace(/[A-Z]/g, function (e) {
      return t + e;
    });
  }var n = { humanize: function humanize(n) {
      return e(t(n, " ").split("_").join(" "));
    }, underscore: function underscore(e) {
      return e.substr(0, 1).toLowerCase() + t(e.substr(1), "_").toLowerCase().split(" ").join("_");
    }, variable: function variable(t) {
      return t = t.substr(0, 1).toLowerCase() + e(t.split("_").join(" ")).substr(1).split(" ").join(""), t;
    } };return function (e, t, r) {
    return t !== !1 && angular.isString(e) ? (t = t || "humanize", n[t](e)) : e;
  };
}), angular.module("ui.filters").filter("unique", function () {
  return function (e, t) {
    if (t === !1) return e;if ((t || angular.isUndefined(t)) && angular.isArray(e)) {
      var n = {},
          r = [],
          i = function i(e) {
        return angular.isObject(e) && angular.isString(t) ? e[t] : e;
      };angular.forEach(e, function (e) {
        var t,
            n = !1;for (var s = 0; s < r.length; s++) {
          if (angular.equals(i(r[s]), i(e))) {
            n = !0;break;
          }
        }n || r.push(e);
      }), e = r;
    }return e;
  };
});

},{}],10:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
 AngularJS v1.6.4
 (c) 2010-2017 Google, Inc. http://angularjs.org
 License: MIT
*/
(function (x) {
  'use strict';
  function L(a, b) {
    b = b || Error;return function () {
      var d = arguments[0],
          c;c = "[" + (a ? a + ":" : "") + d + "] http://errors.angularjs.org/1.6.4/" + (a ? a + "/" : "") + d;for (d = 1; d < arguments.length; d++) {
        c = c + (1 == d ? "?" : "&") + "p" + (d - 1) + "=";var e = encodeURIComponent,
            f;f = arguments[d];f = "function" == typeof f ? f.toString().replace(/ \{[\s\S]*$/, "") : "undefined" == typeof f ? "undefined" : "string" != typeof f ? JSON.stringify(f) : f;c += e(f);
      }return new b(c);
    };
  }function me(a) {
    if (C(a)) u(a.objectMaxDepth) && (Ic.objectMaxDepth = Sb(a.objectMaxDepth) ? a.objectMaxDepth : NaN);else return Ic;
  }function Sb(a) {
    return ba(a) && 0 < a;
  }function qa(a) {
    if (null == a || Wa(a)) return !1;if (H(a) || F(a) || B && a instanceof B) return !0;var b = "length" in Object(a) && a.length;return ba(b) && (0 <= b && (b - 1 in a || a instanceof Array) || "function" === typeof a.item);
  }function q(a, b, d) {
    var c, e;if (a) if (D(a)) for (c in a) {
      "prototype" !== c && "length" !== c && "name" !== c && a.hasOwnProperty(c) && b.call(d, a[c], c, a);
    } else if (H(a) || qa(a)) {
      var f = "object" !== (typeof a === "undefined" ? "undefined" : _typeof(a));c = 0;for (e = a.length; c < e; c++) {
        (f || c in a) && b.call(d, a[c], c, a);
      }
    } else if (a.forEach && a.forEach !== q) a.forEach(b, d, a);else if (Jc(a)) for (c in a) {
      b.call(d, a[c], c, a);
    } else if ("function" === typeof a.hasOwnProperty) for (c in a) {
      a.hasOwnProperty(c) && b.call(d, a[c], c, a);
    } else for (c in a) {
      ua.call(a, c) && b.call(d, a[c], c, a);
    }return a;
  }function Kc(a, b, d) {
    for (var c = Object.keys(a).sort(), e = 0; e < c.length; e++) {
      b.call(d, a[c[e]], c[e]);
    }return c;
  }function Lc(a) {
    return function (b, d) {
      a(d, b);
    };
  }function ne() {
    return ++qb;
  }function Tb(a, b, d) {
    for (var c = a.$$hashKey, e = 0, f = b.length; e < f; ++e) {
      var g = b[e];
      if (C(g) || D(g)) for (var h = Object.keys(g), k = 0, l = h.length; k < l; k++) {
        var m = h[k],
            n = g[m];d && C(n) ? ga(n) ? a[m] = new Date(n.valueOf()) : Xa(n) ? a[m] = new RegExp(n) : n.nodeName ? a[m] = n.cloneNode(!0) : Ub(n) ? a[m] = n.clone() : (C(a[m]) || (a[m] = H(n) ? [] : {}), Tb(a[m], [n], !0)) : a[m] = n;
      }
    }c ? a.$$hashKey = c : delete a.$$hashKey;return a;
  }function S(a) {
    return Tb(a, va.call(arguments, 1), !1);
  }function oe(a) {
    return Tb(a, va.call(arguments, 1), !0);
  }function Z(a) {
    return parseInt(a, 10);
  }function Vb(a, b) {
    return S(Object.create(a), b);
  }function z() {}function Ya(a) {
    return a;
  }
  function la(a) {
    return function () {
      return a;
    };
  }function Wb(a) {
    return D(a.toString) && a.toString !== ma;
  }function w(a) {
    return "undefined" === typeof a;
  }function u(a) {
    return "undefined" !== typeof a;
  }function C(a) {
    return null !== a && "object" === (typeof a === "undefined" ? "undefined" : _typeof(a));
  }function Jc(a) {
    return null !== a && "object" === (typeof a === "undefined" ? "undefined" : _typeof(a)) && !Mc(a);
  }function F(a) {
    return "string" === typeof a;
  }function ba(a) {
    return "number" === typeof a;
  }function ga(a) {
    return "[object Date]" === ma.call(a);
  }function D(a) {
    return "function" === typeof a;
  }function Xa(a) {
    return "[object RegExp]" === ma.call(a);
  }function Wa(a) {
    return a && a.window === a;
  }function Za(a) {
    return a && a.$evalAsync && a.$watch;
  }function Ha(a) {
    return "boolean" === typeof a;
  }function pe(a) {
    return a && ba(a.length) && qe.test(ma.call(a));
  }function Ub(a) {
    return !(!a || !(a.nodeName || a.prop && a.attr && a.find));
  }function re(a) {
    var b = {};a = a.split(",");var d;for (d = 0; d < a.length; d++) {
      b[a[d]] = !0;
    }return b;
  }function wa(a) {
    return Q(a.nodeName || a[0] && a[0].nodeName);
  }function $a(a, b) {
    var d = a.indexOf(b);0 <= d && a.splice(d, 1);return d;
  }function ra(a, b, d) {
    function c(a, b, c) {
      c--;if (0 > c) return "...";var d = b.$$hashKey,
          f;if (H(a)) {
        f = 0;for (var g = a.length; f < g; f++) {
          b.push(e(a[f], c));
        }
      } else if (Jc(a)) for (f in a) {
        b[f] = e(a[f], c);
      } else if (a && "function" === typeof a.hasOwnProperty) for (f in a) {
        a.hasOwnProperty(f) && (b[f] = e(a[f], c));
      } else for (f in a) {
        ua.call(a, f) && (b[f] = e(a[f], c));
      }d ? b.$$hashKey = d : delete b.$$hashKey;return b;
    }function e(a, b) {
      if (!C(a)) return a;var d = g.indexOf(a);if (-1 !== d) return h[d];if (Wa(a) || Za(a)) throw Fa("cpws");var d = !1,
          e = f(a);void 0 === e && (e = H(a) ? [] : Object.create(Mc(a)), d = !0);g.push(a);h.push(e);return d ? c(a, e, b) : e;
    }function f(a) {
      switch (ma.call(a)) {case "[object Int8Array]":case "[object Int16Array]":case "[object Int32Array]":case "[object Float32Array]":case "[object Float64Array]":case "[object Uint8Array]":case "[object Uint8ClampedArray]":case "[object Uint16Array]":case "[object Uint32Array]":
          return new a.constructor(e(a.buffer), a.byteOffset, a.length);case "[object ArrayBuffer]":
          if (!a.slice) {
            var b = new ArrayBuffer(a.byteLength);new Uint8Array(b).set(new Uint8Array(a));
            return b;
          }return a.slice(0);case "[object Boolean]":case "[object Number]":case "[object String]":case "[object Date]":
          return new a.constructor(a.valueOf());case "[object RegExp]":
          return b = new RegExp(a.source, a.toString().match(/[^/]*$/)[0]), b.lastIndex = a.lastIndex, b;case "[object Blob]":
          return new a.constructor([a], { type: a.type });}if (D(a.cloneNode)) return a.cloneNode(!0);
    }var g = [],
        h = [];d = Sb(d) ? d : NaN;if (b) {
      if (pe(b) || "[object ArrayBuffer]" === ma.call(b)) throw Fa("cpta");if (a === b) throw Fa("cpi");H(b) ? b.length = 0 : q(b, function (a, c) {
        "$$hashKey" !== c && delete b[c];
      });g.push(a);h.push(b);return c(a, b, d);
    }return e(a, d);
  }function Xb(a, b) {
    return a === b || a !== a && b !== b;
  }function sa(a, b) {
    if (a === b) return !0;if (null === a || null === b) return !1;if (a !== a && b !== b) return !0;var d = typeof a === "undefined" ? "undefined" : _typeof(a),
        c;if (d === (typeof b === "undefined" ? "undefined" : _typeof(b)) && "object" === d) if (H(a)) {
      if (!H(b)) return !1;if ((d = a.length) === b.length) {
        for (c = 0; c < d; c++) {
          if (!sa(a[c], b[c])) return !1;
        }return !0;
      }
    } else {
      if (ga(a)) return ga(b) ? Xb(a.getTime(), b.getTime()) : !1;if (Xa(a)) return Xa(b) ? a.toString() === b.toString() : !1;
      if (Za(a) || Za(b) || Wa(a) || Wa(b) || H(b) || ga(b) || Xa(b)) return !1;d = V();for (c in a) {
        if ("$" !== c.charAt(0) && !D(a[c])) {
          if (!sa(a[c], b[c])) return !1;d[c] = !0;
        }
      }for (c in b) {
        if (!(c in d) && "$" !== c.charAt(0) && u(b[c]) && !D(b[c])) return !1;
      }return !0;
    }return !1;
  }function ab(a, b, d) {
    return a.concat(va.call(b, d));
  }function bb(a, b) {
    var d = 2 < arguments.length ? va.call(arguments, 2) : [];return !D(b) || b instanceof RegExp ? b : d.length ? function () {
      return arguments.length ? b.apply(a, ab(d, arguments, 0)) : b.apply(a, d);
    } : function () {
      return arguments.length ? b.apply(a, arguments) : b.call(a);
    };
  }function Nc(a, b) {
    var d = b;"string" === typeof a && "$" === a.charAt(0) && "$" === a.charAt(1) ? d = void 0 : Wa(b) ? d = "$WINDOW" : b && x.document === b ? d = "$DOCUMENT" : Za(b) && (d = "$SCOPE");return d;
  }function cb(a, b) {
    if (!w(a)) return ba(b) || (b = b ? 2 : null), JSON.stringify(a, Nc, b);
  }function Oc(a) {
    return F(a) ? JSON.parse(a) : a;
  }function Pc(a, b) {
    a = a.replace(se, "");var d = Date.parse("Jan 01, 1970 00:00:00 " + a) / 6E4;return da(d) ? b : d;
  }function Yb(a, b, d) {
    d = d ? -1 : 1;var c = a.getTimezoneOffset();b = Pc(b, c);d *= b - c;a = new Date(a.getTime());
    a.setMinutes(a.getMinutes() + d);return a;
  }function xa(a) {
    a = B(a).clone();try {
      a.empty();
    } catch (b) {}var d = B("<div>").append(a).html();try {
      return a[0].nodeType === Ia ? Q(d) : d.match(/^(<[^>]+>)/)[1].replace(/^<([\w-]+)/, function (a, b) {
        return "<" + Q(b);
      });
    } catch (c) {
      return Q(d);
    }
  }function Qc(a) {
    try {
      return decodeURIComponent(a);
    } catch (b) {}
  }function Rc(a) {
    var b = {};q((a || "").split("&"), function (a) {
      var c, e, f;a && (e = a = a.replace(/\+/g, "%20"), c = a.indexOf("="), -1 !== c && (e = a.substring(0, c), f = a.substring(c + 1)), e = Qc(e), u(e) && (f = u(f) ? Qc(f) : !0, ua.call(b, e) ? H(b[e]) ? b[e].push(f) : b[e] = [b[e], f] : b[e] = f));
    });return b;
  }function Zb(a) {
    var b = [];q(a, function (a, c) {
      H(a) ? q(a, function (a) {
        b.push($(c, !0) + (!0 === a ? "" : "=" + $(a, !0)));
      }) : b.push($(c, !0) + (!0 === a ? "" : "=" + $(a, !0)));
    });return b.length ? b.join("&") : "";
  }function db(a) {
    return $(a, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+");
  }function $(a, b) {
    return encodeURIComponent(a).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%3B/gi, ";").replace(/%20/g, b ? "%20" : "+");
  }function te(a, b) {
    var d,
        c,
        e = Ja.length;for (c = 0; c < e; ++c) {
      if (d = Ja[c] + b, F(d = a.getAttribute(d))) return d;
    }return null;
  }function ue(a, b) {
    var d,
        c,
        e = {};q(Ja, function (b) {
      b += "app";!d && a.hasAttribute && a.hasAttribute(b) && (d = a, c = a.getAttribute(b));
    });q(Ja, function (b) {
      b += "app";var e;!d && (e = a.querySelector("[" + b.replace(":", "\\:") + "]")) && (d = e, c = e.getAttribute(b));
    });d && (ve ? (e.strictDi = null !== te(d, "strict-di"), b(d, c ? [c] : [], e)) : x.console.error("Angular: disabling automatic bootstrap. <script> protocol indicates an extension, document.location.href does not match."));
  }
  function Sc(a, b, d) {
    C(d) || (d = {});d = S({ strictDi: !1 }, d);var c = function c() {
      a = B(a);if (a.injector()) {
        var c = a[0] === x.document ? "document" : xa(a);throw Fa("btstrpd", c.replace(/</, "&lt;").replace(/>/, "&gt;"));
      }b = b || [];b.unshift(["$provide", function (b) {
        b.value("$rootElement", a);
      }]);d.debugInfoEnabled && b.push(["$compileProvider", function (a) {
        a.debugInfoEnabled(!0);
      }]);b.unshift("ng");c = eb(b, d.strictDi);c.invoke(["$rootScope", "$rootElement", "$compile", "$injector", function (a, b, c, d) {
        a.$apply(function () {
          b.data("$injector", d);c(b)(a);
        });
      }]);return c;
    },
        e = /^NG_ENABLE_DEBUG_INFO!/,
        f = /^NG_DEFER_BOOTSTRAP!/;x && e.test(x.name) && (d.debugInfoEnabled = !0, x.name = x.name.replace(e, ""));if (x && !f.test(x.name)) return c();x.name = x.name.replace(f, "");ea.resumeBootstrap = function (a) {
      q(a, function (a) {
        b.push(a);
      });return c();
    };D(ea.resumeDeferredBootstrap) && ea.resumeDeferredBootstrap();
  }function we() {
    x.name = "NG_ENABLE_DEBUG_INFO!" + x.name;x.location.reload();
  }function xe(a) {
    a = ea.element(a).injector();if (!a) throw Fa("test");return a.get("$$testability");
  }
  function Tc(a, b) {
    b = b || "_";return a.replace(ye, function (a, c) {
      return (c ? b : "") + a.toLowerCase();
    });
  }function ze() {
    var a;if (!Uc) {
      var b = rb();(na = w(b) ? x.jQuery : b ? x[b] : void 0) && na.fn.on ? (B = na, S(na.fn, { scope: Na.scope, isolateScope: Na.isolateScope, controller: Na.controller, injector: Na.injector, inheritedData: Na.inheritedData }), a = na.cleanData, na.cleanData = function (b) {
        for (var c, e = 0, f; null != (f = b[e]); e++) {
          (c = na._data(f, "events")) && c.$destroy && na(f).triggerHandler("$destroy");
        }a(b);
      }) : B = W;ea.element = B;Uc = !0;
    }
  }function fb(a, b, d) {
    if (!a) throw Fa("areq", b || "?", d || "required");return a;
  }function sb(a, b, d) {
    d && H(a) && (a = a[a.length - 1]);fb(D(a), b, "not a function, got " + (a && "object" === (typeof a === "undefined" ? "undefined" : _typeof(a)) ? a.constructor.name || "Object" : typeof a === "undefined" ? "undefined" : _typeof(a)));return a;
  }function Ka(a, b) {
    if ("hasOwnProperty" === a) throw Fa("badname", b);
  }function Vc(a, b, d) {
    if (!b) return a;b = b.split(".");for (var c, e = a, f = b.length, g = 0; g < f; g++) {
      c = b[g], a && (a = (e = a)[c]);
    }return !d && D(a) ? bb(e, a) : a;
  }function tb(a) {
    for (var b = a[0], d = a[a.length - 1], c, e = 1; b !== d && (b = b.nextSibling); e++) {
      if (c || a[e] !== b) c || (c = B(va.call(a, 0, e))), c.push(b);
    }return c || a;
  }function V() {
    return Object.create(null);
  }function $b(a) {
    if (null == a) return "";switch (typeof a === "undefined" ? "undefined" : _typeof(a)) {case "string":
        break;case "number":
        a = "" + a;break;default:
        a = !Wb(a) || H(a) || ga(a) ? cb(a) : a.toString();}return a;
  }function Ae(a) {
    function b(a, b, c) {
      return a[b] || (a[b] = c());
    }var d = L("$injector"),
        c = L("ng");a = b(a, "angular", Object);a.$$minErr = a.$$minErr || L;return b(a, "module", function () {
      var a = {};return function (f, g, h) {
        var k = {};if ("hasOwnProperty" === f) throw c("badname", "module");
        g && a.hasOwnProperty(f) && (a[f] = null);return b(a, f, function () {
          function a(b, c, d, f) {
            f || (f = e);return function () {
              f[d || "push"]([b, c, arguments]);return v;
            };
          }function b(a, c, d) {
            d || (d = e);return function (b, e) {
              e && D(e) && (e.$$moduleName = f);d.push([a, c, arguments]);return v;
            };
          }if (!g) throw d("nomod", f);var e = [],
              p = [],
              r = [],
              J = a("$injector", "invoke", "push", p),
              v = { _invokeQueue: e, _configBlocks: p, _runBlocks: r, info: function info(a) {
              if (u(a)) {
                if (!C(a)) throw c("aobj", "value");k = a;return this;
              }return k;
            }, requires: g, name: f, provider: b("$provide", "provider"), factory: b("$provide", "factory"), service: b("$provide", "service"), value: a("$provide", "value"), constant: a("$provide", "constant", "unshift"), decorator: b("$provide", "decorator", p), animation: b("$animateProvider", "register"), filter: b("$filterProvider", "register"), controller: b("$controllerProvider", "register"), directive: b("$compileProvider", "directive"), component: b("$compileProvider", "component"), config: J, run: function run(a) {
              r.push(a);return this;
            } };h && J(h);return v;
        });
      };
    });
  }function pa(a, b) {
    if (H(a)) {
      b = b || [];for (var d = 0, c = a.length; d < c; d++) {
        b[d] = a[d];
      }
    } else if (C(a)) for (d in b = b || {}, a) {
      if ("$" !== d.charAt(0) || "$" !== d.charAt(1)) b[d] = a[d];
    }return b || a;
  }function Be(a, b) {
    var d = [];Sb(b) && (a = ra(a, null, b));return JSON.stringify(a, function (a, b) {
      b = Nc(a, b);if (C(b)) {
        if (0 <= d.indexOf(b)) return "...";d.push(b);
      }return b;
    });
  }function Ce(a) {
    S(a, { errorHandlingConfig: me, bootstrap: Sc, copy: ra, extend: S, merge: oe, equals: sa, element: B, forEach: q, injector: eb, noop: z, bind: bb, toJson: cb, fromJson: Oc, identity: Ya, isUndefined: w, isDefined: u, isString: F,
      isFunction: D, isObject: C, isNumber: ba, isElement: Ub, isArray: H, version: De, isDate: ga, lowercase: Q, uppercase: ub, callbacks: { $$counter: 0 }, getTestability: xe, reloadWithDebugInfo: we, $$minErr: L, $$csp: Ga, $$encodeUriSegment: db, $$encodeUriQuery: $, $$stringify: $b });ac = Ae(x);ac("ng", ["ngLocale"], ["$provide", function (a) {
      a.provider({ $$sanitizeUri: Ee });a.provider("$compile", Wc).directive({ a: Fe, input: Xc, textarea: Xc, form: Ge, script: He, select: Ie, option: Je, ngBind: Ke, ngBindHtml: Le, ngBindTemplate: Me, ngClass: Ne, ngClassEven: Oe,
        ngClassOdd: Pe, ngCloak: Qe, ngController: Re, ngForm: Se, ngHide: Te, ngIf: Ue, ngInclude: Ve, ngInit: We, ngNonBindable: Xe, ngPluralize: Ye, ngRepeat: Ze, ngShow: $e, ngStyle: af, ngSwitch: bf, ngSwitchWhen: cf, ngSwitchDefault: df, ngOptions: ef, ngTransclude: ff, ngModel: gf, ngList: hf, ngChange: jf, pattern: Yc, ngPattern: Yc, required: Zc, ngRequired: Zc, minlength: $c, ngMinlength: $c, maxlength: ad, ngMaxlength: ad, ngValue: kf, ngModelOptions: lf }).directive({ ngInclude: mf }).directive(vb).directive(bd);a.provider({ $anchorScroll: nf, $animate: of, $animateCss: pf,
        $$animateJs: qf, $$animateQueue: rf, $$AnimateRunner: sf, $$animateAsyncRun: tf, $browser: uf, $cacheFactory: vf, $controller: wf, $document: xf, $$isDocumentHidden: yf, $exceptionHandler: zf, $filter: cd, $$forceReflow: Af, $interpolate: Bf, $interval: Cf, $http: Df, $httpParamSerializer: Ef, $httpParamSerializerJQLike: Ff, $httpBackend: Gf, $xhrFactory: Hf, $jsonpCallbacks: If, $location: Jf, $log: Kf, $parse: Lf, $rootScope: Mf, $q: Nf, $$q: Of, $sce: Pf, $sceDelegate: Qf, $sniffer: Rf, $templateCache: Sf, $templateRequest: Tf, $$testability: Uf, $timeout: Vf,
        $window: Wf, $$rAF: Xf, $$jqLite: Yf, $$Map: Zf, $$cookieReader: $f });
    }]).info({ angularVersion: "1.6.4" });
  }function gb(a, b) {
    return b.toUpperCase();
  }function wb(a) {
    return a.replace(ag, gb);
  }function bc(a) {
    a = a.nodeType;return 1 === a || !a || 9 === a;
  }function dd(a, b) {
    var d,
        c,
        e = b.createDocumentFragment(),
        f = [];if (cc.test(a)) {
      d = e.appendChild(b.createElement("div"));c = (bg.exec(a) || ["", ""])[1].toLowerCase();c = ha[c] || ha._default;d.innerHTML = c[1] + a.replace(cg, "<$1></$2>") + c[2];for (c = c[0]; c--;) {
        d = d.lastChild;
      }f = ab(f, d.childNodes);
      d = e.firstChild;d.textContent = "";
    } else f.push(b.createTextNode(a));e.textContent = "";e.innerHTML = "";q(f, function (a) {
      e.appendChild(a);
    });return e;
  }function W(a) {
    if (a instanceof W) return a;var b;F(a) && (a = T(a), b = !0);if (!(this instanceof W)) {
      if (b && "<" !== a.charAt(0)) throw dc("nosel");return new W(a);
    }if (b) {
      b = x.document;var d;a = (d = dg.exec(a)) ? [b.createElement(d[1])] : (d = dd(a, b)) ? d.childNodes : [];ec(this, a);
    } else D(a) ? ed(a) : ec(this, a);
  }function fc(a) {
    return a.cloneNode(!0);
  }function xb(a, b) {
    !b && bc(a) && B.cleanData([a]);
    a.querySelectorAll && B.cleanData(a.querySelectorAll("*"));
  }function fd(a, b, d, c) {
    if (u(c)) throw dc("offargs");var e = (c = yb(a)) && c.events,
        f = c && c.handle;if (f) if (b) {
      var g = function g(b) {
        var c = e[b];u(d) && $a(c || [], d);u(d) && c && 0 < c.length || (a.removeEventListener(b, f), delete e[b]);
      };q(b.split(" "), function (a) {
        g(a);zb[a] && g(zb[a]);
      });
    } else for (b in e) {
      "$destroy" !== b && a.removeEventListener(b, f), delete e[b];
    }
  }function gc(a, b) {
    var d = a.ng339,
        c = d && hb[d];c && (b ? delete c.data[b] : (c.handle && (c.events.$destroy && c.handle({}, "$destroy"), fd(a)), delete hb[d], a.ng339 = void 0));
  }function yb(a, b) {
    var d = a.ng339,
        d = d && hb[d];b && !d && (a.ng339 = d = ++eg, d = hb[d] = { events: {}, data: {}, handle: void 0 });return d;
  }function hc(a, b, d) {
    if (bc(a)) {
      var c,
          e = u(d),
          f = !e && b && !C(b),
          g = !b;a = (a = yb(a, !f)) && a.data;if (e) a[wb(b)] = d;else {
        if (g) return a;if (f) return a && a[wb(b)];for (c in b) {
          a[wb(c)] = b[c];
        }
      }
    }
  }function Ab(a, b) {
    return a.getAttribute ? -1 < (" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").indexOf(" " + b + " ") : !1;
  }function Bb(a, b) {
    b && a.setAttribute && q(b.split(" "), function (b) {
      a.setAttribute("class", T((" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").replace(" " + T(b) + " ", " ")));
    });
  }function Cb(a, b) {
    if (b && a.setAttribute) {
      var d = (" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ");q(b.split(" "), function (a) {
        a = T(a);-1 === d.indexOf(" " + a + " ") && (d += a + " ");
      });a.setAttribute("class", T(d));
    }
  }function ec(a, b) {
    if (b) if (b.nodeType) a[a.length++] = b;else {
      var d = b.length;if ("number" === typeof d && b.window !== b) {
        if (d) for (var c = 0; c < d; c++) {
          a[a.length++] = b[c];
        }
      } else a[a.length++] = b;
    }
  }function gd(a, b) {
    return Db(a, "$" + (b || "ngController") + "Controller");
  }function Db(a, b, d) {
    9 === a.nodeType && (a = a.documentElement);for (b = H(b) ? b : [b]; a;) {
      for (var c = 0, e = b.length; c < e; c++) {
        if (u(d = B.data(a, b[c]))) return d;
      }a = a.parentNode || 11 === a.nodeType && a.host;
    }
  }function hd(a) {
    for (xb(a, !0); a.firstChild;) {
      a.removeChild(a.firstChild);
    }
  }function Eb(a, b) {
    b || xb(a);var d = a.parentNode;d && d.removeChild(a);
  }function fg(a, b) {
    b = b || x;if ("complete" === b.document.readyState) b.setTimeout(a);else B(b).on("load", a);
  }function ed(a) {
    function b() {
      x.document.removeEventListener("DOMContentLoaded", b);x.removeEventListener("load", b);a();
    }"complete" === x.document.readyState ? x.setTimeout(a) : (x.document.addEventListener("DOMContentLoaded", b), x.addEventListener("load", b));
  }function id(a, b) {
    var d = Fb[b.toLowerCase()];return d && jd[wa(a)] && d;
  }function gg(a, b) {
    var d = function d(c, _d) {
      c.isDefaultPrevented = function () {
        return c.defaultPrevented;
      };var f = b[_d || c.type],
          g = f ? f.length : 0;if (g) {
        if (w(c.immediatePropagationStopped)) {
          var h = c.stopImmediatePropagation;c.stopImmediatePropagation = function () {
            c.immediatePropagationStopped = !0;c.stopPropagation && c.stopPropagation();h && h.call(c);
          };
        }c.isImmediatePropagationStopped = function () {
          return !0 === c.immediatePropagationStopped;
        };var k = f.specialHandlerWrapper || hg;1 < g && (f = pa(f));for (var l = 0; l < g; l++) {
          c.isImmediatePropagationStopped() || k(a, c, f[l]);
        }
      }
    };d.elem = a;return d;
  }function hg(a, b, d) {
    d.call(a, b);
  }function ig(a, b, d) {
    var c = b.relatedTarget;c && (c === a || jg.call(a, c)) || d.call(a, b);
  }function Yf() {
    this.$get = function () {
      return S(W, { hasClass: function hasClass(a, b) {
          a.attr && (a = a[0]);return Ab(a, b);
        }, addClass: function addClass(a, b) {
          a.attr && (a = a[0]);return Cb(a, b);
        }, removeClass: function removeClass(a, b) {
          a.attr && (a = a[0]);return Bb(a, b);
        } });
    };
  }function Pa(a, b) {
    var d = a && a.$$hashKey;if (d) return "function" === typeof d && (d = a.$$hashKey()), d;d = typeof a === "undefined" ? "undefined" : _typeof(a);return d = "function" === d || "object" === d && null !== a ? a.$$hashKey = d + ":" + (b || ne)() : d + ":" + a;
  }function kd() {
    this._keys = [];this._values = [];this._lastKey = NaN;this._lastIndex = -1;
  }function ld(a) {
    a = Function.prototype.toString.call(a).replace(kg, "");return a.match(lg) || a.match(mg);
  }function ng(a) {
    return (a = ld(a)) ? "function(" + (a[1] || "").replace(/[\s\r\n]+/, " ") + ")" : "fn";
  }function eb(a, b) {
    function d(a) {
      return function (b, c) {
        if (C(b)) q(b, Lc(a));else return a(b, c);
      };
    }function c(a, b) {
      Ka(a, "service");if (D(b) || H(b)) b = p.instantiate(b);if (!b.$get) throw ya("pget", a);return n[a + "Provider"] = b;
    }function e(a, b) {
      return function () {
        var c = v.invoke(b, this);if (w(c)) throw ya("undef", a);return c;
      };
    }function f(a, b, d) {
      return c(a, { $get: !1 !== d ? e(a, b) : b });
    }function g(a) {
      fb(w(a) || H(a), "modulesToLoad", "not an array");var b = [],
          c;q(a, function (a) {
        function d(a) {
          var b, c;b = 0;for (c = a.length; b < c; b++) {
            var e = a[b],
                f = p.get(e[0]);f[e[1]].apply(f, e[2]);
          }
        }if (!m.get(a)) {
          m.set(a, !0);try {
            F(a) ? (c = ac(a), v.modules[a] = c, b = b.concat(g(c.requires)).concat(c._runBlocks), d(c._invokeQueue), d(c._configBlocks)) : D(a) ? b.push(p.invoke(a)) : H(a) ? b.push(p.invoke(a)) : sb(a, "module");
          } catch (e) {
            throw H(a) && (a = a[a.length - 1]), e.message && e.stack && -1 === e.stack.indexOf(e.message) && (e = e.message + "\n" + e.stack), ya("modulerr", a, e.stack || e.message || e);
          }
        }
      });return b;
    }function h(a, c) {
      function d(b, e) {
        if (a.hasOwnProperty(b)) {
          if (a[b] === k) throw ya("cdep", b + " <- " + l.join(" <- "));return a[b];
        }try {
          return l.unshift(b), a[b] = k, a[b] = c(b, e), a[b];
        } catch (f) {
          throw a[b] === k && delete a[b], f;
        } finally {
          l.shift();
        }
      }function e(a, c, f) {
        var g = [];a = eb.$$annotate(a, b, f);for (var k = 0, h = a.length; k < h; k++) {
          var l = a[k];if ("string" !== typeof l) throw ya("itkn", l);g.push(c && c.hasOwnProperty(l) ? c[l] : d(l, f));
        }return g;
      }return { invoke: function invoke(a, b, c, d) {
          "string" === typeof c && (d = c, c = null);c = e(a, c, d);H(a) && (a = a[a.length - 1]);d = a;if (za || "function" !== typeof d) d = !1;else {
            var f = d.$$ngIsClass;
            Ha(f) || (f = d.$$ngIsClass = /^(?:class\b|constructor\()/.test(Function.prototype.toString.call(d)));d = f;
          }return d ? (c.unshift(null), new (Function.prototype.bind.apply(a, c))()) : a.apply(b, c);
        }, instantiate: function instantiate(a, b, c) {
          var d = H(a) ? a[a.length - 1] : a;a = e(a, b, c);a.unshift(null);return new (Function.prototype.bind.apply(d, a))();
        }, get: d, annotate: eb.$$annotate, has: function has(b) {
          return n.hasOwnProperty(b + "Provider") || a.hasOwnProperty(b);
        } };
    }b = !0 === b;var k = {},
        l = [],
        m = new Gb(),
        n = { $provide: { provider: d(c), factory: d(f), service: d(function (a, b) {
          return f(a, ["$injector", function (a) {
            return a.instantiate(b);
          }]);
        }), value: d(function (a, b) {
          return f(a, la(b), !1);
        }), constant: d(function (a, b) {
          Ka(a, "constant");n[a] = b;r[a] = b;
        }), decorator: function decorator(a, b) {
          var c = p.get(a + "Provider"),
              d = c.$get;c.$get = function () {
            var a = v.invoke(d, c);return v.invoke(b, null, { $delegate: a });
          };
        } } },
        p = n.$injector = h(n, function (a, b) {
      ea.isString(b) && l.push(b);throw ya("unpr", l.join(" <- "));
    }),
        r = {},
        J = h(r, function (a, b) {
      var c = p.get(a + "Provider", b);return v.invoke(c.$get, c, void 0, a);
    }),
        v = J;n.$injectorProvider = { $get: la(J) };v.modules = p.modules = V();var t = g(a),
        v = J.get("$injector");v.strictDi = b;q(t, function (a) {
      a && v.invoke(a);
    });return v;
  }function nf() {
    var a = !0;this.disableAutoScrolling = function () {
      a = !1;
    };this.$get = ["$window", "$location", "$rootScope", function (b, d, c) {
      function e(a) {
        var b = null;Array.prototype.some.call(a, function (a) {
          if ("a" === wa(a)) return b = a, !0;
        });return b;
      }function f(a) {
        if (a) {
          a.scrollIntoView();var c;c = g.yOffset;D(c) ? c = c() : Ub(c) ? (c = c[0], c = "fixed" !== b.getComputedStyle(c).position ? 0 : c.getBoundingClientRect().bottom) : ba(c) || (c = 0);c && (a = a.getBoundingClientRect().top, b.scrollBy(0, a - c));
        } else b.scrollTo(0, 0);
      }function g(a) {
        a = F(a) ? a : ba(a) ? a.toString() : d.hash();var b;a ? (b = h.getElementById(a)) ? f(b) : (b = e(h.getElementsByName(a))) ? f(b) : "top" === a && f(null) : f(null);
      }var h = b.document;a && c.$watch(function () {
        return d.hash();
      }, function (a, b) {
        a === b && "" === a || fg(function () {
          c.$evalAsync(g);
        });
      });return g;
    }];
  }function ib(a, b) {
    if (!a && !b) return "";if (!a) return b;if (!b) return a;H(a) && (a = a.join(" "));H(b) && (b = b.join(" "));return a + " " + b;
  }function og(a) {
    F(a) && (a = a.split(" "));var b = V();q(a, function (a) {
      a.length && (b[a] = !0);
    });return b;
  }function ia(a) {
    return C(a) ? a : {};
  }function pg(a, b, d, c) {
    function e(a) {
      try {
        a.apply(null, va.call(arguments, 1));
      } finally {
        if (J--, 0 === J) for (; v.length;) {
          try {
            v.pop()();
          } catch (b) {
            d.error(b);
          }
        }
      }
    }function f() {
      Oa = null;h();
    }function g() {
      t = I();t = w(t) ? null : t;sa(t, G) && (t = G);M = G = t;
    }function h() {
      var a = M;g();if (N !== k.url() || a !== t) N = k.url(), M = t, q(K, function (a) {
        a(k.url(), t);
      });
    }var k = this,
        l = a.location,
        m = a.history,
        n = a.setTimeout,
        p = a.clearTimeout,
        r = {};k.isMock = !1;var J = 0,
        v = [];k.$$completeOutstandingRequest = e;k.$$incOutstandingRequestCount = function () {
      J++;
    };k.notifyWhenNoOutstandingRequests = function (a) {
      0 === J ? a() : v.push(a);
    };var t,
        M,
        N = l.href,
        A = b.find("base"),
        Oa = null,
        I = c.history ? function () {
      try {
        return m.state;
      } catch (a) {}
    } : z;g();k.url = function (b, d, e) {
      w(e) && (e = null);l !== a.location && (l = a.location);m !== a.history && (m = a.history);if (b) {
        var f = M === e;if (N === b && (!c.history || f)) return k;var h = N && Aa(N) === Aa(b);N = b;M = e;!c.history || h && f ? (h || (Oa = b), d ? l.replace(b) : h ? (d = l, e = b.indexOf("#"), e = -1 === e ? "" : b.substr(e), d.hash = e) : l.href = b, l.href !== b && (Oa = b)) : (m[d ? "replaceState" : "pushState"](e, "", b), g());Oa && (Oa = b);return k;
      }return Oa || l.href.replace(/%27/g, "'");
    };k.state = function () {
      return t;
    };var K = [],
        E = !1,
        G = null;k.onUrlChange = function (b) {
      if (!E) {
        if (c.history) B(a).on("popstate", f);B(a).on("hashchange", f);E = !0;
      }K.push(b);return b;
    };k.$$applicationDestroyed = function () {
      B(a).off("hashchange popstate", f);
    };k.$$checkUrlChange = h;k.baseHref = function () {
      var a = A.attr("href");return a ? a.replace(/^(https?:)?\/\/[^/]*/, "") : "";
    };k.defer = function (a, b) {
      var c;J++;c = n(function () {
        delete r[c];e(a);
      }, b || 0);r[c] = !0;return c;
    };k.defer.cancel = function (a) {
      return r[a] ? (delete r[a], p(a), e(z), !0) : !1;
    };
  }function uf() {
    this.$get = ["$window", "$log", "$sniffer", "$document", function (a, b, d, c) {
      return new pg(a, c, b, d);
    }];
  }function vf() {
    this.$get = function () {
      function a(a, c) {
        function e(a) {
          a !== n && (p ? p === a && (p = a.n) : p = a, f(a.n, a.p), f(a, n), n = a, n.n = null);
        }function f(a, b) {
          a !== b && (a && (a.p = b), b && (b.n = a));
        }if (a in b) throw L("$cacheFactory")("iid", a);var g = 0,
            h = S({}, c, { id: a }),
            k = V(),
            l = c && c.capacity || Number.MAX_VALUE,
            m = V(),
            n = null,
            p = null;return b[a] = { put: function put(a, b) {
            if (!w(b)) {
              if (l < Number.MAX_VALUE) {
                var c = m[a] || (m[a] = { key: a });e(c);
              }a in k || g++;k[a] = b;g > l && this.remove(p.key);return b;
            }
          }, get: function get(a) {
            if (l < Number.MAX_VALUE) {
              var b = m[a];if (!b) return;e(b);
            }return k[a];
          }, remove: function remove(a) {
            if (l < Number.MAX_VALUE) {
              var b = m[a];if (!b) return;b === n && (n = b.p);b === p && (p = b.n);f(b.n, b.p);delete m[a];
            }a in k && (delete k[a], g--);
          }, removeAll: function removeAll() {
            k = V();g = 0;m = V();n = p = null;
          }, destroy: function destroy() {
            m = h = k = null;delete b[a];
          }, info: function info() {
            return S({}, h, { size: g });
          } };
      }var b = {};a.info = function () {
        var a = {};q(b, function (b, e) {
          a[e] = b.info();
        });return a;
      };a.get = function (a) {
        return b[a];
      };return a;
    };
  }function Sf() {
    this.$get = ["$cacheFactory", function (a) {
      return a("templates");
    }];
  }function Wc(a, b) {
    function d(a, b, c) {
      var d = /^\s*([@&<]|=(\*?))(\??)\s*([\w$]*)\s*$/,
          e = V();q(a, function (a, f) {
        if (a in n) e[f] = n[a];else {
          var g = a.match(d);if (!g) throw fa("iscp", b, f, a, c ? "controller bindings definition" : "isolate scope definition");
          e[f] = { mode: g[1][0], collection: "*" === g[2], optional: "?" === g[3], attrName: g[4] || f };g[4] && (n[a] = e[f]);
        }
      });return e;
    }function c(a) {
      var b = a.charAt(0);if (!b || b !== Q(b)) throw fa("baddir", a);if (a !== a.trim()) throw fa("baddir", a);
    }function e(a) {
      var b = a.require || a.controller && a.name;!H(b) && C(b) && q(b, function (a, c) {
        var d = a.match(l);a.substring(d[0].length) || (b[c] = d[0] + c);
      });return b;
    }var f = {},
        g = /^\s*directive:\s*([\w-]+)\s+(.*)$/,
        h = /(([\w-]+)(?::([^;]+))?;?)/,
        k = re("ngSrc,ngSrcset,src,srcset"),
        l = /^(?:(\^\^?)?(\?)?(\^\^?)?)?/,
        m = /^(on[a-z]+|formaction)$/,
        n = V();this.directive = function N(b, d) {
      fb(b, "name");Ka(b, "directive");F(b) ? (c(b), fb(d, "directiveFactory"), f.hasOwnProperty(b) || (f[b] = [], a.factory(b + "Directive", ["$injector", "$exceptionHandler", function (a, c) {
        var d = [];q(f[b], function (f, g) {
          try {
            var h = a.invoke(f);D(h) ? h = { compile: la(h) } : !h.compile && h.link && (h.compile = la(h.link));h.priority = h.priority || 0;h.index = g;h.name = h.name || b;h.require = e(h);var k = h,
                l = h.restrict;if (l && (!F(l) || !/[EACM]/.test(l))) throw fa("badrestrict", l, b);k.restrict = l || "EA";h.$$moduleName = f.$$moduleName;d.push(h);
          } catch (m) {
            c(m);
          }
        });return d;
      }])), f[b].push(d)) : q(b, Lc(N));return this;
    };this.component = function (a, b) {
      function c(a) {
        function e(b) {
          return D(b) || H(b) ? function (c, d) {
            return a.invoke(b, this, { $element: c, $attrs: d });
          } : b;
        }var f = b.template || b.templateUrl ? b.template : "",
            g = { controller: d, controllerAs: qg(b.controller) || b.controllerAs || "$ctrl", template: e(f), templateUrl: e(b.templateUrl), transclude: b.transclude, scope: {}, bindToController: b.bindings || {}, restrict: "E", require: b.require };
        q(b, function (a, b) {
          "$" === b.charAt(0) && (g[b] = a);
        });return g;
      }var d = b.controller || function () {};q(b, function (a, b) {
        "$" === b.charAt(0) && (c[b] = a, D(d) && (d[b] = a));
      });c.$inject = ["$injector"];return this.directive(a, c);
    };this.aHrefSanitizationWhitelist = function (a) {
      return u(a) ? (b.aHrefSanitizationWhitelist(a), this) : b.aHrefSanitizationWhitelist();
    };this.imgSrcSanitizationWhitelist = function (a) {
      return u(a) ? (b.imgSrcSanitizationWhitelist(a), this) : b.imgSrcSanitizationWhitelist();
    };var p = !0;this.debugInfoEnabled = function (a) {
      return u(a) ? (p = a, this) : p;
    };var r = !1;this.preAssignBindingsEnabled = function (a) {
      return u(a) ? (r = a, this) : r;
    };var J = 10;this.onChangesTtl = function (a) {
      return arguments.length ? (J = a, this) : J;
    };var v = !0;this.commentDirectivesEnabled = function (a) {
      return arguments.length ? (v = a, this) : v;
    };var t = !0;this.cssClassDirectivesEnabled = function (a) {
      return arguments.length ? (t = a, this) : t;
    };this.$get = ["$injector", "$interpolate", "$exceptionHandler", "$templateRequest", "$parse", "$controller", "$rootScope", "$sce", "$animate", "$$sanitizeUri", function (a, b, c, e, n, E, G, y, O, X) {
      function P() {
        try {
          if (! --ya) throw ia = void 0, fa("infchng", J);G.$apply(function () {
            for (var a = [], b = 0, c = ia.length; b < c; ++b) {
              try {
                ia[b]();
              } catch (d) {
                a.push(d);
              }
            }ia = void 0;if (a.length) throw a;
          });
        } finally {
          ya++;
        }
      }function s(a, b) {
        if (b) {
          var c = Object.keys(b),
              d,
              e,
              f;d = 0;for (e = c.length; d < e; d++) {
            f = c[d], this[f] = b[f];
          }
        } else this.$attr = {};this.$$element = a;
      }function R(a, b, c) {
        ta.innerHTML = "<span " + b + ">";b = ta.firstChild.attributes;var d = b[0];b.removeNamedItem(d.name);d.value = c;a.attributes.setNamedItem(d);
      }function La(a, b) {
        try {
          a.addClass(b);
        } catch (c) {}
      }function ca(a, b, c, d, e) {
        a instanceof B || (a = B(a));var f = Ma(a, b, a, c, d, e);ca.$$addScopeClass(a);var g = null;return function (b, c, d) {
          if (!a) throw fa("multilink");fb(b, "scope");e && e.needsNewScope && (b = b.$parent.$new());d = d || {};var h = d.parentBoundTranscludeFn,
              k = d.transcludeControllers;d = d.futureParentElement;h && h.$$boundTransclude && (h = h.$$boundTransclude);g || (g = (d = d && d[0]) ? "foreignobject" !== wa(d) && ma.call(d).match(/SVG/) ? "svg" : "html" : "html");d = "html" !== g ? B(ha(g, B("<div>").append(a).html())) : c ? Na.clone.call(a) : a;if (k) for (var l in k) {
            d.data("$" + l + "Controller", k[l].instance);
          }ca.$$addScopeInfo(d, b);c && c(d, b);f && f(b, d, d, h);c || (a = f = null);return d;
        };
      }function Ma(a, b, c, d, e, f) {
        function g(a, c, d, e) {
          var f, k, l, m, n, p, r;if (K) for (r = Array(c.length), m = 0; m < h.length; m += 3) {
            f = h[m], r[f] = c[f];
          } else r = c;m = 0;for (n = h.length; m < n;) {
            k = r[h[m++]], c = h[m++], f = h[m++], c ? (c.scope ? (l = a.$new(), ca.$$addScopeInfo(B(k), l)) : l = a, p = c.transcludeOnThisElement ? ja(a, c.transclude, e) : !c.templateOnThisElement && e ? e : !e && b ? ja(a, b) : null, c(f, l, k, d, p)) : f && f(a, k.childNodes, void 0, e);
          }
        }for (var h = [], k = H(a) || a instanceof B, l, m, n, p, K, r = 0; r < a.length; r++) {
          l = new s();11 === za && L(a, r, k);m = jc(a[r], [], l, 0 === r ? d : void 0, e);(f = m.length ? W(m, a[r], l, b, c, null, [], [], f) : null) && f.scope && ca.$$addScopeClass(l.$$element);l = f && f.terminal || !(n = a[r].childNodes) || !n.length ? null : Ma(n, f ? (f.transcludeOnThisElement || !f.templateOnThisElement) && f.transclude : b);if (f || l) h.push(r, f, l), p = !0, K = K || f;f = null;
        }return p ? g : null;
      }function L(a, b, c) {
        var d = a[b],
            e = d.parentNode,
            f;if (d.nodeType === Ia) for (;;) {
          f = e ? d.nextSibling : a[b + 1];if (!f || f.nodeType !== Ia) break;d.nodeValue += f.nodeValue;f.parentNode && f.parentNode.removeChild(f);c && f === a[b + 1] && a.splice(b + 1, 1);
        }
      }function ja(a, b, c) {
        function d(e, f, g, h, k) {
          e || (e = a.$new(!1, k), e.$$transcluded = !0);return b(e, f, { parentBoundTranscludeFn: c, transcludeControllers: g, futureParentElement: h });
        }var e = d.$$slots = V(),
            f;for (f in b.$$slots) {
          e[f] = b.$$slots[f] ? ja(a, b.$$slots[f], c) : null;
        }return d;
      }function jc(a, b, c, d, e) {
        var f = c.$attr,
            g;switch (a.nodeType) {case 1:
            g = wa(a);Y(b, Ba(g), "E", d, e);for (var k, l, m, n, p = a.attributes, K = 0, r = p && p.length; K < r; K++) {
              var G = !1,
                  E = !1;k = p[K];l = k.name;m = k.value;k = Ba(l);(n = Ja.test(k)) && (l = l.replace(md, "").substr(8).replace(/_(.)/g, function (a, b) {
                return b.toUpperCase();
              }));(k = k.match(Ka)) && Z(k[1]) && (G = l, E = l.substr(0, l.length - 5) + "end", l = l.substr(0, l.length - 6));k = Ba(l.toLowerCase());f[k] = l;if (n || !c.hasOwnProperty(k)) c[k] = m, id(a, k) && (c[k] = !0);pa(a, b, m, k, n);Y(b, k, "A", d, e, G, E);
            }"input" === g && "hidden" === a.getAttribute("type") && a.setAttribute("autocomplete", "off");if (!Ga) break;f = a.className;C(f) && (f = f.animVal);if (F(f) && "" !== f) for (; a = h.exec(f);) {
              k = Ba(a[2]), Y(b, k, "C", d, e) && (c[k] = T(a[3])), f = f.substr(a.index + a[0].length);
            }break;case Ia:
            la(b, a.nodeValue);break;case 8:
            if (!Fa) break;jb(a, b, c, d, e);}b.sort(ea);return b;
      }function jb(a, b, c, d, e) {
        try {
          var f = g.exec(a.nodeValue);if (f) {
            var h = Ba(f[1]);Y(b, h, "M", d, e) && (c[h] = T(f[2]));
          }
        } catch (k) {}
      }function nd(a, b, c) {
        var d = [],
            e = 0;if (b && a.hasAttribute && a.hasAttribute(b)) {
          do {
            if (!a) throw fa("uterdir", b, c);1 === a.nodeType && (a.hasAttribute(b) && e++, a.hasAttribute(c) && e--);d.push(a);a = a.nextSibling;
          } while (0 < e);
        } else d.push(a);return B(d);
      }function od(a, b, c) {
        return function (d, e, f, g, h) {
          e = nd(e[0], b, c);return a(d, e, f, g, h);
        };
      }function kc(a, b, c, d, e, f) {
        var g;return a ? ca(b, c, d, e, f) : function () {
          g || (g = ca(b, c, d, e, f), b = c = f = null);return g.apply(this, arguments);
        };
      }function W(a, b, d, e, f, g, h, k, l) {
        function m(a, b, c, d) {
          if (a) {
            c && (a = od(a, c, d));a.require = y.require;a.directiveName = P;if (E === y || y.$$isolateScope) a = qa(a, { isolateScope: !0 });h.push(a);
          }if (b) {
            c && (b = od(b, c, d));b.require = y.require;b.directiveName = P;if (E === y || y.$$isolateScope) b = qa(b, { isolateScope: !0 });k.push(b);
          }
        }function n(a, e, f, g, l) {
          function m(a, b, c, d) {
            var e;Za(a) || (d = c, c = b, b = a, a = void 0);X && (e = O);c || (c = X ? P.parent() : P);if (d) {
              var f = l.$$slots[d];if (f) return f(a, b, e, c, R);if (w(f)) throw fa("noslot", d, xa(P));
            } else return l(a, b, e, c, R);
          }var p, y, t, v, J, O, N, P;b === f ? (g = d, P = d.$$element) : (P = B(f), g = new s(P, d));J = e;E ? v = e.$new(!0) : K && (J = e.$parent);l && (N = m, N.$$boundTransclude = l, N.isSlotFilled = function (a) {
            return !!l.$$slots[a];
          });G && (O = ba(P, g, N, G, v, e, E));E && (ca.$$addScopeInfo(P, v, !0, !(I && (I === E || I === E.$$originalDirective))), ca.$$addScopeClass(P, !0), v.$$isolateBindings = E.$$isolateBindings, y = na(e, g, v, v.$$isolateBindings, E), y.removeWatches && v.$on("$destroy", y.removeWatches));for (p in O) {
            y = G[p];t = O[p];var Hb = y.$$bindings.bindToController;if (r) {
              t.bindingInfo = Hb ? na(J, g, t.instance, Hb, y) : {};var A = t();A !== t.instance && (t.instance = A, P.data("$" + y.name + "Controller", A), t.bindingInfo.removeWatches && t.bindingInfo.removeWatches(), t.bindingInfo = na(J, g, t.instance, Hb, y));
            } else t.instance = t(), P.data("$" + y.name + "Controller", t.instance), t.bindingInfo = na(J, g, t.instance, Hb, y);
          }q(G, function (a, b) {
            var c = a.require;a.bindToController && !H(c) && C(c) && S(O[b].instance, U(b, c, P, O));
          });q(O, function (a) {
            var b = a.instance;if (D(b.$onChanges)) try {
              b.$onChanges(a.bindingInfo.initialChanges);
            } catch (d) {
              c(d);
            }if (D(b.$onInit)) try {
              b.$onInit();
            } catch (e) {
              c(e);
            }D(b.$doCheck) && (J.$watch(function () {
              b.$doCheck();
            }), b.$doCheck());D(b.$onDestroy) && J.$on("$destroy", function () {
              b.$onDestroy();
            });
          });
          p = 0;for (y = h.length; p < y; p++) {
            t = h[p], ra(t, t.isolateScope ? v : e, P, g, t.require && U(t.directiveName, t.require, P, O), N);
          }var R = e;E && (E.template || null === E.templateUrl) && (R = v);a && a(R, f.childNodes, void 0, l);for (p = k.length - 1; 0 <= p; p--) {
            t = k[p], ra(t, t.isolateScope ? v : e, P, g, t.require && U(t.directiveName, t.require, P, O), N);
          }q(O, function (a) {
            a = a.instance;D(a.$postLink) && a.$postLink();
          });
        }l = l || {};for (var p = -Number.MAX_VALUE, K = l.newScopeDirective, G = l.controllerDirectives, E = l.newIsolateScopeDirective, I = l.templateDirective, t = l.nonTlbTranscludeDirective, J = !1, O = !1, X = l.hasElementTranscludeDirective, v = d.$$element = B(b), y, P, N, A = e, R, u = !1, La = !1, x, z = 0, F = a.length; z < F; z++) {
          y = a[z];var Ma = y.$$start,
              L = y.$$end;Ma && (v = nd(b, Ma, L));N = void 0;if (p > y.priority) break;if (x = y.scope) y.templateUrl || (C(x) ? ($("new/isolated scope", E || K, y, v), E = y) : $("new/isolated scope", E, y, v)), K = K || y;P = y.name;if (!u && (y.replace && (y.templateUrl || y.template) || y.transclude && !y.$$tlb)) {
            for (x = z + 1; u = a[x++];) {
              if (u.transclude && !u.$$tlb || u.replace && (u.templateUrl || u.template)) {
                La = !0;break;
              }
            }u = !0;
          }!y.templateUrl && y.controller && (G = G || V(), $("'" + P + "' controller", G[P], y, v), G[P] = y);if (x = y.transclude) if (J = !0, y.$$tlb || ($("transclusion", t, y, v), t = y), "element" === x) X = !0, p = y.priority, N = v, v = d.$$element = B(ca.$$createComment(P, d[P])), b = v[0], ka(f, va.call(N, 0), b), N[0].$$parentNode = N[0].parentNode, A = kc(La, N, e, p, g && g.name, { nonTlbTranscludeDirective: t });else {
            var ja = V();if (C(x)) {
              N = [];var Q = V(),
                  jb = V();q(x, function (a, b) {
                var c = "?" === a.charAt(0);a = c ? a.substring(1) : a;Q[a] = b;ja[b] = null;jb[b] = c;
              });q(v.contents(), function (a) {
                var b = Q[Ba(wa(a))];
                b ? (jb[b] = !0, ja[b] = ja[b] || [], ja[b].push(a)) : N.push(a);
              });q(jb, function (a, b) {
                if (!a) throw fa("reqslot", b);
              });for (var ic in ja) {
                ja[ic] && (ja[ic] = kc(La, ja[ic], e));
              }
            } else N = B(fc(b)).contents();v.empty();A = kc(La, N, e, void 0, void 0, { needsNewScope: y.$$isolateScope || y.$$newScope });A.$$slots = ja;
          }if (y.template) if (O = !0, $("template", I, y, v), I = y, x = D(y.template) ? y.template(v, d) : y.template, x = Ea(x), y.replace) {
            g = y;N = cc.test(x) ? pd(ha(y.templateNamespace, T(x))) : [];b = N[0];if (1 !== N.length || 1 !== b.nodeType) throw fa("tplrt", P, "");
            ka(f, v, b);F = { $attr: {} };x = jc(b, [], F);var Y = a.splice(z + 1, a.length - (z + 1));(E || K) && aa(x, E, K);a = a.concat(x).concat(Y);da(d, F);F = a.length;
          } else v.html(x);if (y.templateUrl) O = !0, $("template", I, y, v), I = y, y.replace && (g = y), n = ga(a.splice(z, a.length - z), v, d, f, J && A, h, k, { controllerDirectives: G, newScopeDirective: K !== y && K, newIsolateScopeDirective: E, templateDirective: I, nonTlbTranscludeDirective: t }), F = a.length;else if (y.compile) try {
            R = y.compile(v, d, A);var Z = y.$$originalDirective || y;D(R) ? m(null, bb(Z, R), Ma, L) : R && m(bb(Z, R.pre), bb(Z, R.post), Ma, L);
          } catch (ea) {
            c(ea, xa(v));
          }y.terminal && (n.terminal = !0, p = Math.max(p, y.priority));
        }n.scope = K && !0 === K.scope;n.transcludeOnThisElement = J;n.templateOnThisElement = O;n.transclude = A;l.hasElementTranscludeDirective = X;return n;
      }function U(a, b, c, d) {
        var e;if (F(b)) {
          var f = b.match(l);b = b.substring(f[0].length);var g = f[1] || f[3],
              f = "?" === f[2];"^^" === g ? c = c.parent() : e = (e = d && d[b]) && e.instance;if (!e) {
            var h = "$" + b + "Controller";e = g ? c.inheritedData(h) : c.data(h);
          }if (!e && !f) throw fa("ctreq", b, a);
        } else if (H(b)) for (e = [], g = 0, f = b.length; g < f; g++) {
          e[g] = U(a, b[g], c, d);
        } else C(b) && (e = {}, q(b, function (b, f) {
          e[f] = U(a, b, c, d);
        }));return e || null;
      }function ba(a, b, c, d, e, f, g) {
        var h = V(),
            k;for (k in d) {
          var l = d[k],
              m = { $scope: l === g || l.$$isolateScope ? e : f, $element: a, $attrs: b, $transclude: c },
              n = l.controller;"@" === n && (n = b[l.name]);m = E(n, m, !0, l.controllerAs);h[l.name] = m;a.data("$" + l.name + "Controller", m.instance);
        }return h;
      }function aa(a, b, c) {
        for (var d = 0, e = a.length; d < e; d++) {
          a[d] = Vb(a[d], { $$isolateScope: b, $$newScope: c });
        }
      }function Y(b, c, e, g, h, k, l) {
        if (c === h) return null;var m = null;if (f.hasOwnProperty(c)) {
          h = a.get(c + "Directive");for (var n = 0, p = h.length; n < p; n++) {
            if (c = h[n], (w(g) || g > c.priority) && -1 !== c.restrict.indexOf(e)) {
              k && (c = Vb(c, { $$start: k, $$end: l }));if (!c.$$bindings) {
                var K = m = c,
                    r = c.name,
                    t = { isolateScope: null, bindToController: null };C(K.scope) && (!0 === K.bindToController ? (t.bindToController = d(K.scope, r, !0), t.isolateScope = {}) : t.isolateScope = d(K.scope, r, !1));C(K.bindToController) && (t.bindToController = d(K.bindToController, r, !0));if (t.bindToController && !K.controller) throw fa("noctrl", r);m = m.$$bindings = t;C(m.isolateScope) && (c.$$isolateBindings = m.isolateScope);
              }b.push(c);m = c;
            }
          }
        }return m;
      }function Z(b) {
        if (f.hasOwnProperty(b)) for (var c = a.get(b + "Directive"), d = 0, e = c.length; d < e; d++) {
          if (b = c[d], b.multiElement) return !0;
        }return !1;
      }function da(a, b) {
        var c = b.$attr,
            d = a.$attr;q(a, function (d, e) {
          "$" !== e.charAt(0) && (b[e] && b[e] !== d && (d = d.length ? d + (("style" === e ? ";" : " ") + b[e]) : b[e]), a.$set(e, d, !0, c[e]));
        });q(b, function (b, e) {
          a.hasOwnProperty(e) || "$" === e.charAt(0) || (a[e] = b, "class" !== e && "style" !== e && (d[e] = c[e]));
        });
      }
      function ga(a, b, d, f, g, h, k, l) {
        var m = [],
            n,
            p,
            K = b[0],
            r = a.shift(),
            t = Vb(r, { templateUrl: null, transclude: null, replace: null, $$originalDirective: r }),
            y = D(r.templateUrl) ? r.templateUrl(b, d) : r.templateUrl,
            E = r.templateNamespace;b.empty();e(y).then(function (c) {
          var e, G;c = Ea(c);if (r.replace) {
            c = cc.test(c) ? pd(ha(E, T(c))) : [];e = c[0];if (1 !== c.length || 1 !== e.nodeType) throw fa("tplrt", r.name, y);c = { $attr: {} };ka(f, b, e);var I = jc(e, [], c);C(r.scope) && aa(I, !0);a = I.concat(a);da(d, c);
          } else e = K, b.html(c);a.unshift(t);n = W(a, e, d, g, b, r, h, k, l);q(f, function (a, c) {
            a === e && (f[c] = b[0]);
          });for (p = Ma(b[0].childNodes, g); m.length;) {
            c = m.shift();G = m.shift();var v = m.shift(),
                J = m.shift(),
                I = b[0];if (!c.$$destroyed) {
              if (G !== K) {
                var O = G.className;l.hasElementTranscludeDirective && r.replace || (I = fc(e));ka(v, B(G), I);La(B(I), O);
              }G = n.transcludeOnThisElement ? ja(c, n.transclude, J) : J;n(p, c, I, f, G);
            }
          }m = null;
        }).catch(function (a) {
          a instanceof Error && c(a);
        });return function (a, b, c, d, e) {
          a = e;b.$$destroyed || (m ? m.push(b, c, d, a) : (n.transcludeOnThisElement && (a = ja(b, n.transclude, e)), n(p, b, c, d, a)));
        };
      }function ea(a, b) {
        var c = b.priority - a.priority;return 0 !== c ? c : a.name !== b.name ? a.name < b.name ? -1 : 1 : a.index - b.index;
      }function $(a, b, c, d) {
        function e(a) {
          return a ? " (module: " + a + ")" : "";
        }if (b) throw fa("multidir", b.name, e(b.$$moduleName), c.name, e(c.$$moduleName), a, xa(d));
      }function la(a, c) {
        var d = b(c, !0);d && a.push({ priority: 0, compile: function compile(a) {
            a = a.parent();var b = !!a.length;b && ca.$$addBindingClass(a);return function (a, c) {
              var e = c.parent();b || ca.$$addBindingClass(e);ca.$$addBindingInfo(e, d.expressions);
              a.$watch(d, function (a) {
                c[0].nodeValue = a;
              });
            };
          } });
      }function ha(a, b) {
        a = Q(a || "html");switch (a) {case "svg":case "math":
            var c = x.document.createElement("div");c.innerHTML = "<" + a + ">" + b + "</" + a + ">";return c.childNodes[0].childNodes;default:
            return b;}
      }function oa(a, b) {
        if ("srcdoc" === b) return y.HTML;var c = wa(a);if ("src" === b || "ngSrc" === b) {
          if (-1 === ["img", "video", "audio", "source", "track"].indexOf(c)) return y.RESOURCE_URL;
        } else if ("xlinkHref" === b || "form" === c && "action" === b || "link" === c && "href" === b) return y.RESOURCE_URL;
      }function pa(a, c, d, e, f) {
        var g = oa(a, e),
            h = k[e] || f,
            l = b(d, !f, g, h);if (l) {
          if ("multiple" === e && "select" === wa(a)) throw fa("selmulti", xa(a));if (m.test(e)) throw fa("nodomevents");c.push({ priority: 100, compile: function compile() {
              return { pre: function pre(a, c, f) {
                  c = f.$$observers || (f.$$observers = V());var k = f[e];k !== d && (l = k && b(k, !0, g, h), d = k);l && (f[e] = l(a), (c[e] || (c[e] = [])).$$inter = !0, (f.$$observers && f.$$observers[e].$$scope || a).$watch(l, function (a, b) {
                    "class" === e && a !== b ? f.$updateClass(a, b) : f.$set(e, a);
                  }));
                } };
            } });
        }
      }function ka(a, b, c) {
        var d = b[0],
            e = b.length,
            f = d.parentNode,
            g,
            h;if (a) for (g = 0, h = a.length; g < h; g++) {
          if (a[g] === d) {
            a[g++] = c;h = g + e - 1;for (var k = a.length; g < k; g++, h++) {
              h < k ? a[g] = a[h] : delete a[g];
            }a.length -= e - 1;a.context === d && (a.context = c);break;
          }
        }f && f.replaceChild(c, d);a = x.document.createDocumentFragment();for (g = 0; g < e; g++) {
          a.appendChild(b[g]);
        }B.hasData(d) && (B.data(c, B.data(d)), B(d).off("$destroy"));B.cleanData(a.querySelectorAll("*"));for (g = 1; g < e; g++) {
          delete b[g];
        }b[0] = c;b.length = 1;
      }function qa(a, b) {
        return S(function () {
          return a.apply(null, arguments);
        }, a, b);
      }function ra(a, b, d, e, f, g) {
        try {
          a(b, d, e, f, g);
        } catch (h) {
          c(h, xa(d));
        }
      }function na(a, c, d, e, f) {
        function g(b, c, e) {
          D(d.$onChanges) && !Xb(c, e) && (ia || (a.$$postDigest(P), ia = []), m || (m = {}, ia.push(h)), m[b] && (e = m[b].previousValue), m[b] = new Ib(e, c));
        }function h() {
          d.$onChanges(m);m = void 0;
        }var k = [],
            l = {},
            m;q(e, function (e, h) {
          var m = e.attrName,
              p = e.optional,
              r,
              t,
              y,
              G;switch (e.mode) {case "@":
              p || ua.call(c, m) || (d[h] = c[m] = void 0);p = c.$observe(m, function (a) {
                if (F(a) || Ha(a)) g(h, a, d[h]), d[h] = a;
              });c.$$observers[m].$$scope = a;r = c[m];
              F(r) ? d[h] = b(r)(a) : Ha(r) && (d[h] = r);l[h] = new Ib(lc, d[h]);k.push(p);break;case "=":
              if (!ua.call(c, m)) {
                if (p) break;c[m] = void 0;
              }if (p && !c[m]) break;t = n(c[m]);G = t.literal ? sa : Xb;y = t.assign || function () {
                r = d[h] = t(a);throw fa("nonassign", c[m], m, f.name);
              };r = d[h] = t(a);p = function p(b) {
                G(b, d[h]) || (G(b, r) ? y(a, b = d[h]) : d[h] = b);return r = b;
              };p.$stateful = !0;p = e.collection ? a.$watchCollection(c[m], p) : a.$watch(n(c[m], p), null, t.literal);k.push(p);break;case "<":
              if (!ua.call(c, m)) {
                if (p) break;c[m] = void 0;
              }if (p && !c[m]) break;t = n(c[m]);
              var E = t.literal,
                  I = d[h] = t(a);l[h] = new Ib(lc, d[h]);p = a.$watch(t, function (a, b) {
                if (b === a) {
                  if (b === I || E && sa(b, I)) return;b = I;
                }g(h, a, b);d[h] = a;
              }, E);k.push(p);break;case "&":
              t = c.hasOwnProperty(m) ? n(c[m]) : z;if (t === z && p) break;d[h] = function (b) {
                return t(a, b);
              };}
        });return { initialChanges: l, removeWatches: k.length && function () {
            for (var a = 0, b = k.length; a < b; ++a) {
              k[a]();
            }
          } };
      }var Ca = /^\w/,
          ta = x.document.createElement("div"),
          Fa = v,
          Ga = t,
          ya = J,
          ia;s.prototype = { $normalize: Ba, $addClass: function $addClass(a) {
          a && 0 < a.length && O.addClass(this.$$element, a);
        }, $removeClass: function $removeClass(a) {
          a && 0 < a.length && O.removeClass(this.$$element, a);
        }, $updateClass: function $updateClass(a, b) {
          var c = qd(a, b);c && c.length && O.addClass(this.$$element, c);(c = qd(b, a)) && c.length && O.removeClass(this.$$element, c);
        }, $set: function $set(a, b, d, e) {
          var f = id(this.$$element[0], a),
              g = rd[a],
              h = a;f ? (this.$$element.prop(a, b), e = f) : g && (this[g] = b, h = g);this[a] = b;e ? this.$attr[a] = e : (e = this.$attr[a]) || (this.$attr[a] = e = Tc(a, "-"));f = wa(this.$$element);if ("a" === f && ("href" === a || "xlinkHref" === a) || "img" === f && "src" === a) this[a] = b = X(b, "src" === a);else if ("img" === f && "srcset" === a && u(b)) {
            for (var f = "", g = T(b), k = /(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/, k = /\s/.test(g) ? k : /(,)/, g = g.split(k), k = Math.floor(g.length / 2), l = 0; l < k; l++) {
              var m = 2 * l,
                  f = f + X(T(g[m]), !0),
                  f = f + (" " + T(g[m + 1]));
            }g = T(g[2 * l]).split(/\s/);f += X(T(g[0]), !0);2 === g.length && (f += " " + T(g[1]));this[a] = b = f;
          }!1 !== d && (null === b || w(b) ? this.$$element.removeAttr(e) : Ca.test(e) ? this.$$element.attr(e, b) : R(this.$$element[0], e, b));(a = this.$$observers) && q(a[h], function (a) {
            try {
              a(b);
            } catch (d) {
              c(d);
            }
          });
        },
        $observe: function $observe(a, b) {
          var c = this,
              d = c.$$observers || (c.$$observers = V()),
              e = d[a] || (d[a] = []);e.push(b);G.$evalAsync(function () {
            e.$$inter || !c.hasOwnProperty(a) || w(c[a]) || b(c[a]);
          });return function () {
            $a(e, b);
          };
        } };var Aa = b.startSymbol(),
          Da = b.endSymbol(),
          Ea = "{{" === Aa && "}}" === Da ? Ya : function (a) {
        return a.replace(/\{\{/g, Aa).replace(/}}/g, Da);
      },
          Ja = /^ngAttr[A-Z]/,
          Ka = /^(.+)Start$/;ca.$$addBindingInfo = p ? function (a, b) {
        var c = a.data("$binding") || [];H(b) ? c = c.concat(b) : c.push(b);a.data("$binding", c);
      } : z;ca.$$addBindingClass = p ? function (a) {
        La(a, "ng-binding");
      } : z;ca.$$addScopeInfo = p ? function (a, b, c, d) {
        a.data(c ? d ? "$isolateScopeNoTemplate" : "$isolateScope" : "$scope", b);
      } : z;ca.$$addScopeClass = p ? function (a, b) {
        La(a, b ? "ng-isolate-scope" : "ng-scope");
      } : z;ca.$$createComment = function (a, b) {
        var c = "";p && (c = " " + (a || "") + ": ", b && (c += b + " "));return x.document.createComment(c);
      };return ca;
    }];
  }function Ib(a, b) {
    this.previousValue = a;this.currentValue = b;
  }function Ba(a) {
    return a.replace(md, "").replace(rg, gb);
  }function qd(a, b) {
    var d = "",
        c = a.split(/\s+/),
        e = b.split(/\s+/),
        f = 0;a: for (; f < c.length; f++) {
      for (var g = c[f], h = 0; h < e.length; h++) {
        if (g === e[h]) continue a;
      }d += (0 < d.length ? " " : "") + g;
    }return d;
  }function pd(a) {
    a = B(a);var b = a.length;if (1 >= b) return a;for (; b--;) {
      var d = a[b];(8 === d.nodeType || d.nodeType === Ia && "" === d.nodeValue.trim()) && sg.call(a, b, 1);
    }return a;
  }function qg(a, b) {
    if (b && F(b)) return b;if (F(a)) {
      var d = sd.exec(a);if (d) return d[3];
    }
  }function wf() {
    var a = {},
        b = !1;this.has = function (b) {
      return a.hasOwnProperty(b);
    };this.register = function (b, c) {
      Ka(b, "controller");C(b) ? S(a, b) : a[b] = c;
    };this.allowGlobals = function () {
      b = !0;
    };this.$get = ["$injector", "$window", function (d, c) {
      function e(a, b, c, d) {
        if (!a || !C(a.$scope)) throw L("$controller")("noscp", d, b);a.$scope[b] = c;
      }return function (f, g, h, k) {
        var l, m, n;h = !0 === h;k && F(k) && (n = k);if (F(f)) {
          k = f.match(sd);if (!k) throw td("ctrlfmt", f);m = k[1];n = n || k[3];f = a.hasOwnProperty(m) ? a[m] : Vc(g.$scope, m, !0) || (b ? Vc(c, m, !0) : void 0);if (!f) throw td("ctrlreg", m);sb(f, m, !0);
        }if (h) return h = (H(f) ? f[f.length - 1] : f).prototype, l = Object.create(h || null), n && e(g, n, l, m || f.name), S(function () {
          var a = d.invoke(f, l, g, m);a !== l && (C(a) || D(a)) && (l = a, n && e(g, n, l, m || f.name));return l;
        }, { instance: l, identifier: n });l = d.instantiate(f, g, m);n && e(g, n, l, m || f.name);return l;
      };
    }];
  }function xf() {
    this.$get = ["$window", function (a) {
      return B(a.document);
    }];
  }function yf() {
    this.$get = ["$document", "$rootScope", function (a, b) {
      function d() {
        e = c.hidden;
      }var c = a[0],
          e = c && c.hidden;a.on("visibilitychange", d);b.$on("$destroy", function () {
        a.off("visibilitychange", d);
      });return function () {
        return e;
      };
    }];
  }function zf() {
    this.$get = ["$log", function (a) {
      return function (b, d) {
        a.error.apply(a, arguments);
      };
    }];
  }function mc(a) {
    return C(a) ? ga(a) ? a.toISOString() : cb(a) : a;
  }function Ef() {
    this.$get = function () {
      return function (a) {
        if (!a) return "";var b = [];Kc(a, function (a, c) {
          null === a || w(a) || (H(a) ? q(a, function (a) {
            b.push($(c) + "=" + $(mc(a)));
          }) : b.push($(c) + "=" + $(mc(a))));
        });return b.join("&");
      };
    };
  }function Ff() {
    this.$get = function () {
      return function (a) {
        function b(a, e, f) {
          null === a || w(a) || (H(a) ? q(a, function (a, c) {
            b(a, e + "[" + (C(a) ? c : "") + "]");
          }) : C(a) && !ga(a) ? Kc(a, function (a, c) {
            b(a, e + (f ? "" : "[") + c + (f ? "" : "]"));
          }) : d.push($(e) + "=" + $(mc(a))));
        }if (!a) return "";var d = [];b(a, "", !0);return d.join("&");
      };
    };
  }function nc(a, b) {
    if (F(a)) {
      var d = a.replace(tg, "").trim();if (d) {
        var c = b("Content-Type");(c = c && 0 === c.indexOf(ud)) || (c = (c = d.match(ug)) && vg[c[0]].test(d));if (c) try {
          a = Oc(d);
        } catch (e) {
          throw oc("baddata", a, e);
        }
      }
    }return a;
  }function vd(a) {
    var b = V(),
        d;F(a) ? q(a.split("\n"), function (a) {
      d = a.indexOf(":");var e = Q(T(a.substr(0, d)));a = T(a.substr(d + 1));e && (b[e] = b[e] ? b[e] + ", " + a : a);
    }) : C(a) && q(a, function (a, d) {
      var f = Q(d),
          g = T(a);f && (b[f] = b[f] ? b[f] + ", " + g : g);
    });return b;
  }function wd(a) {
    var b;return function (d) {
      b || (b = vd(a));return d ? (d = b[Q(d)], void 0 === d && (d = null), d) : b;
    };
  }function xd(a, b, d, c) {
    if (D(c)) return c(a, b, d);q(c, function (c) {
      a = c(a, b, d);
    });return a;
  }function Df() {
    var a = this.defaults = { transformResponse: [nc], transformRequest: [function (a) {
        return C(a) && "[object File]" !== ma.call(a) && "[object Blob]" !== ma.call(a) && "[object FormData]" !== ma.call(a) ? cb(a) : a;
      }], headers: { common: { Accept: "application/json, text/plain, */*" },
        post: pa(pc), put: pa(pc), patch: pa(pc) }, xsrfCookieName: "XSRF-TOKEN", xsrfHeaderName: "X-XSRF-TOKEN", paramSerializer: "$httpParamSerializer", jsonpCallbackParam: "callback" },
        b = !1;this.useApplyAsync = function (a) {
      return u(a) ? (b = !!a, this) : b;
    };var d = this.interceptors = [];this.$get = ["$browser", "$httpBackend", "$$cookieReader", "$cacheFactory", "$rootScope", "$q", "$injector", "$sce", function (c, e, f, g, h, k, l, m) {
      function n(b) {
        function d(a, b) {
          for (var c = 0, e = b.length; c < e;) {
            var f = b[c++],
                g = b[c++];a = a.then(f, g);
          }b.length = 0;return a;
        }
        function e(a, b) {
          var c,
              d = {};q(a, function (a, e) {
            D(a) ? (c = a(b), null != c && (d[e] = c)) : d[e] = a;
          });return d;
        }function f(a) {
          var b = S({}, a);b.data = xd(a.data, a.headers, a.status, g.transformResponse);a = a.status;return 200 <= a && 300 > a ? b : k.reject(b);
        }if (!C(b)) throw L("$http")("badreq", b);if (!F(m.valueOf(b.url))) throw L("$http")("badreq", b.url);var g = S({ method: "get", transformRequest: a.transformRequest, transformResponse: a.transformResponse, paramSerializer: a.paramSerializer, jsonpCallbackParam: a.jsonpCallbackParam }, b);g.headers = function (b) {
          var c = a.headers,
              d = S({}, b.headers),
              f,
              g,
              h,
              c = S({}, c.common, c[Q(b.method)]);a: for (f in c) {
            g = Q(f);for (h in d) {
              if (Q(h) === g) continue a;
            }d[f] = c[f];
          }return e(d, pa(b));
        }(b);g.method = ub(g.method);g.paramSerializer = F(g.paramSerializer) ? l.get(g.paramSerializer) : g.paramSerializer;c.$$incOutstandingRequestCount();var h = [],
            n = [];b = k.resolve(g);q(t, function (a) {
          (a.request || a.requestError) && h.unshift(a.request, a.requestError);(a.response || a.responseError) && n.push(a.response, a.responseError);
        });b = d(b, h);b = b.then(function (b) {
          var c = b.headers,
              d = xd(b.data, wd(c), void 0, b.transformRequest);w(d) && q(c, function (a, b) {
            "content-type" === Q(b) && delete c[b];
          });w(b.withCredentials) && !w(a.withCredentials) && (b.withCredentials = a.withCredentials);return p(b, d).then(f, f);
        });b = d(b, n);return b = b.finally(function () {
          c.$$completeOutstandingRequest(z);
        });
      }function p(c, d) {
        function g(a) {
          if (a) {
            var c = {};q(a, function (a, d) {
              c[d] = function (c) {
                function d() {
                  a(c);
                }b ? h.$applyAsync(d) : h.$$phase ? d() : h.$apply(d);
              };
            });return c;
          }
        }function l(a, c, d, e) {
          function f() {
            p(c, a, d, e);
          }O && (200 <= a && 300 > a ? O.put(R, [a, c, vd(d), e]) : O.remove(R));b ? h.$applyAsync(f) : (f(), h.$$phase || h.$apply());
        }function p(a, b, d, e) {
          b = -1 <= b ? b : 0;(200 <= b && 300 > b ? G.resolve : G.reject)({ data: a, status: b, headers: wd(d), config: c, statusText: e });
        }function K(a) {
          p(a.data, a.status, pa(a.headers()), a.statusText);
        }function t() {
          var a = n.pendingRequests.indexOf(c);-1 !== a && n.pendingRequests.splice(a, 1);
        }var G = k.defer(),
            y = G.promise,
            O,
            X,
            P = c.headers,
            s = "jsonp" === Q(c.method),
            R = c.url;s ? R = m.getTrustedResourceUrl(R) : F(R) || (R = m.valueOf(R));R = r(R, c.paramSerializer(c.params));s && (R = J(R, c.jsonpCallbackParam));n.pendingRequests.push(c);y.then(t, t);!c.cache && !a.cache || !1 === c.cache || "GET" !== c.method && "JSONP" !== c.method || (O = C(c.cache) ? c.cache : C(a.cache) ? a.cache : v);O && (X = O.get(R), u(X) ? X && D(X.then) ? X.then(K, K) : H(X) ? p(X[1], X[0], pa(X[2]), X[3]) : p(X, 200, {}, "OK") : O.put(R, y));w(X) && ((X = yd(c.url) ? f()[c.xsrfCookieName || a.xsrfCookieName] : void 0) && (P[c.xsrfHeaderName || a.xsrfHeaderName] = X), e(c.method, R, d, l, P, c.timeout, c.withCredentials, c.responseType, g(c.eventHandlers), g(c.uploadEventHandlers)));return y;
      }function r(a, b) {
        0 < b.length && (a += (-1 === a.indexOf("?") ? "?" : "&") + b);return a;
      }function J(a, b) {
        if (/[&?][^=]+=JSON_CALLBACK/.test(a)) throw oc("badjsonp", a);if (new RegExp("[&?]" + b + "=").test(a)) throw oc("badjsonp", b, a);return a += (-1 === a.indexOf("?") ? "?" : "&") + b + "=JSON_CALLBACK";
      }var v = g("$http");a.paramSerializer = F(a.paramSerializer) ? l.get(a.paramSerializer) : a.paramSerializer;var t = [];q(d, function (a) {
        t.unshift(F(a) ? l.get(a) : l.invoke(a));
      });n.pendingRequests = [];(function (a) {
        q(arguments, function (a) {
          n[a] = function (b, c) {
            return n(S({}, c || {}, { method: a, url: b }));
          };
        });
      })("get", "delete", "head", "jsonp");(function (a) {
        q(arguments, function (a) {
          n[a] = function (b, c, d) {
            return n(S({}, d || {}, { method: a, url: b, data: c }));
          };
        });
      })("post", "put", "patch");n.defaults = a;return n;
    }];
  }function Hf() {
    this.$get = function () {
      return function () {
        return new x.XMLHttpRequest();
      };
    };
  }function Gf() {
    this.$get = ["$browser", "$jsonpCallbacks", "$document", "$xhrFactory", function (a, b, d, c) {
      return wg(a, c, a.defer, b, d[0]);
    }];
  }function wg(a, b, d, c, e) {
    function f(a, b, d) {
      a = a.replace("JSON_CALLBACK", b);var f = e.createElement("script"),
          _m = null;f.type = "text/javascript";f.src = a;f.async = !0;_m = function m(a) {
        f.removeEventListener("load", _m);f.removeEventListener("error", _m);e.body.removeChild(f);f = null;var g = -1,
            r = "unknown";a && ("load" !== a.type || c.wasCalled(b) || (a = { type: "error" }), r = a.type, g = "error" === a.type ? 404 : 200);d && d(g, r);
      };f.addEventListener("load", _m);f.addEventListener("error", _m);e.body.appendChild(f);return _m;
    }return function (e, h, k, l, m, n, p, r, J, v) {
      function t() {
        N && N();A && A.abort();
      }h = h || a.url();if ("jsonp" === Q(e)) var M = c.createCallback(h),
          N = f(h, M, function (a, b) {
        var e = 200 === a && c.getResponse(M);u(I) && d.cancel(I);N = A = null;l(a, e, "", b);c.removeCallback(M);
      });else {
        var A = b(e, h);A.open(e, h, !0);q(m, function (a, b) {
          u(a) && A.setRequestHeader(b, a);
        });A.onload = function () {
          var a = A.statusText || "",
              b = "response" in A ? A.response : A.responseText,
              c = 1223 === A.status ? 204 : A.status;0 === c && (c = b ? 200 : "file" === Ca(h).protocol ? 404 : 0);var e = A.getAllResponseHeaders();u(I) && d.cancel(I);N = A = null;l(c, b, e, a);
        };e = function e() {
          u(I) && d.cancel(I);N = A = null;l(-1, null, null, "");
        };A.onerror = e;A.onabort = e;A.ontimeout = e;q(J, function (a, b) {
          A.addEventListener(b, a);
        });q(v, function (a, b) {
          A.upload.addEventListener(b, a);
        });p && (A.withCredentials = !0);if (r) try {
          A.responseType = r;
        } catch (s) {
          if ("json" !== r) throw s;
        }A.send(w(k) ? null : k);
      }if (0 < n) var I = d(t, n);else n && D(n.then) && n.then(t);
    };
  }function Bf() {
    var a = "{{",
        b = "}}";this.startSymbol = function (b) {
      return b ? (a = b, this) : a;
    };this.endSymbol = function (a) {
      return a ? (b = a, this) : b;
    };this.$get = ["$parse", "$exceptionHandler", "$sce", function (d, c, e) {
      function f(a) {
        return "\\\\\\" + a;
      }function g(c) {
        return c.replace(n, a).replace(p, b);
      }function h(a, b, c, d) {
        var e = a.$watch(function (a) {
          e();return d(a);
        }, b, c);return e;
      }function k(f, k, n, p) {
        function M(a) {
          try {
            var b = a;a = n ? e.getTrusted(n, b) : e.valueOf(b);return p && !u(a) ? a : $b(a);
          } catch (d) {
            c(Da.interr(f, d));
          }
        }if (!f.length || -1 === f.indexOf(a)) {
          var q;k || (k = g(f), q = la(k), q.exp = f, q.expressions = [], q.$$watchDelegate = h);return q;
        }p = !!p;var A,
            s,
            I = 0,
            K = [],
            E = [];q = f.length;for (var G = [], y = []; I < q;) {
          if (-1 !== (A = f.indexOf(a, I)) && -1 !== (s = f.indexOf(b, A + l))) I !== A && G.push(g(f.substring(I, A))), I = f.substring(A + l, s), K.push(I), E.push(d(I, M)), I = s + m, y.push(G.length), G.push("");else {
            I !== q && G.push(g(f.substring(I)));break;
          }
        }n && 1 < G.length && Da.throwNoconcat(f);if (!k || K.length) {
          var O = function O(a) {
            for (var b = 0, c = K.length; b < c; b++) {
              if (p && w(a[b])) return;G[y[b]] = a[b];
            }return G.join("");
          };return S(function (a) {
            var b = 0,
                d = K.length,
                e = Array(d);try {
              for (; b < d; b++) {
                e[b] = E[b](a);
              }return O(e);
            } catch (g) {
              c(Da.interr(f, g));
            }
          }, { exp: f, expressions: K, $$watchDelegate: function $$watchDelegate(a, b) {
              var c;return a.$watchGroup(E, function (d, e) {
                var f = O(d);D(b) && b.call(this, f, d !== e ? c : f, a);c = f;
              });
            } });
        }
      }var l = a.length,
          m = b.length,
          n = new RegExp(a.replace(/./g, f), "g"),
          p = new RegExp(b.replace(/./g, f), "g");k.startSymbol = function () {
        return a;
      };k.endSymbol = function () {
        return b;
      };return k;
    }];
  }function Cf() {
    this.$get = ["$rootScope", "$window", "$q", "$$q", "$browser", function (a, b, d, c, e) {
      function f(f, k, l, m) {
        function n() {
          p ? f.apply(null, r) : f(t);
        }var p = 4 < arguments.length,
            r = p ? va.call(arguments, 4) : [],
            J = b.setInterval,
            v = b.clearInterval,
            t = 0,
            M = u(m) && !m,
            q = (M ? c : d).defer(),
            A = q.promise;l = u(l) ? l : 0;A.$$intervalId = J(function () {
          M ? e.defer(n) : a.$evalAsync(n);q.notify(t++);0 < l && t >= l && (q.resolve(t), v(A.$$intervalId), delete g[A.$$intervalId]);M || a.$apply();
        }, k);g[A.$$intervalId] = q;return A;
      }var g = {};f.cancel = function (a) {
        return a && a.$$intervalId in g ? (g[a.$$intervalId].promise.catch(z), g[a.$$intervalId].reject("canceled"), b.clearInterval(a.$$intervalId), delete g[a.$$intervalId], !0) : !1;
      };return f;
    }];
  }function qc(a) {
    a = a.split("/");for (var b = a.length; b--;) {
      a[b] = db(a[b]);
    }return a.join("/");
  }function zd(a, b) {
    var d = Ca(a);b.$$protocol = d.protocol;b.$$host = d.hostname;b.$$port = Z(d.port) || xg[d.protocol] || null;
  }function Ad(a, b) {
    if (yg.test(a)) throw kb("badpath", a);var d = "/" !== a.charAt(0);d && (a = "/" + a);var c = Ca(a);b.$$path = decodeURIComponent(d && "/" === c.pathname.charAt(0) ? c.pathname.substring(1) : c.pathname);b.$$search = Rc(c.search);b.$$hash = decodeURIComponent(c.hash);b.$$path && "/" !== b.$$path.charAt(0) && (b.$$path = "/" + b.$$path);
  }function rc(a, b) {
    return a.slice(0, b.length) === b;
  }function ka(a, b) {
    if (rc(b, a)) return b.substr(a.length);
  }function Aa(a) {
    var b = a.indexOf("#");return -1 === b ? a : a.substr(0, b);
  }function lb(a) {
    return a.replace(/(#.+)|#$/, "$1");
  }function sc(a, b, d) {
    this.$$html5 = !0;d = d || "";zd(a, this);this.$$parse = function (a) {
      var d = ka(b, a);if (!F(d)) throw kb("ipthprfx", a, b);Ad(d, this);this.$$path || (this.$$path = "/");this.$$compose();
    };this.$$compose = function () {
      var a = Zb(this.$$search),
          d = this.$$hash ? "#" + db(this.$$hash) : "";this.$$url = qc(this.$$path) + (a ? "?" + a : "") + d;this.$$absUrl = b + this.$$url.substr(1);this.$$urlUpdatedByLocation = !0;
    };this.$$parseLinkUrl = function (c, e) {
      if (e && "#" === e[0]) return this.hash(e.slice(1)), !0;var f, g;u(f = ka(a, c)) ? (g = f, g = d && u(f = ka(d, f)) ? b + (ka("/", f) || f) : a + g) : u(f = ka(b, c)) ? g = b + f : b === c + "/" && (g = b);g && this.$$parse(g);return !!g;
    };
  }function tc(a, b, d) {
    zd(a, this);this.$$parse = function (c) {
      var e = ka(a, c) || ka(b, c),
          f;w(e) || "#" !== e.charAt(0) ? this.$$html5 ? f = e : (f = "", w(e) && (a = c, this.replace())) : (f = ka(d, e), w(f) && (f = e));Ad(f, this);c = this.$$path;var e = a,
          g = /^\/[A-Z]:(\/.*)/;rc(f, e) && (f = f.replace(e, ""));g.exec(f) || (c = (f = g.exec(c)) ? f[1] : c);this.$$path = c;this.$$compose();
    };this.$$compose = function () {
      var b = Zb(this.$$search),
          e = this.$$hash ? "#" + db(this.$$hash) : "";this.$$url = qc(this.$$path) + (b ? "?" + b : "") + e;this.$$absUrl = a + (this.$$url ? d + this.$$url : "");this.$$urlUpdatedByLocation = !0;
    };this.$$parseLinkUrl = function (b, d) {
      return Aa(a) === Aa(b) ? (this.$$parse(b), !0) : !1;
    };
  }function Bd(a, b, d) {
    this.$$html5 = !0;tc.apply(this, arguments);this.$$parseLinkUrl = function (c, e) {
      if (e && "#" === e[0]) return this.hash(e.slice(1)), !0;var f, g;a === Aa(c) ? f = c : (g = ka(b, c)) ? f = a + d + g : b === c + "/" && (f = b);f && this.$$parse(f);return !!f;
    };this.$$compose = function () {
      var b = Zb(this.$$search),
          e = this.$$hash ? "#" + db(this.$$hash) : "";this.$$url = qc(this.$$path) + (b ? "?" + b : "") + e;this.$$absUrl = a + d + this.$$url;this.$$urlUpdatedByLocation = !0;
    };
  }function Jb(a) {
    return function () {
      return this[a];
    };
  }function Cd(a, b) {
    return function (d) {
      if (w(d)) return this[a];this[a] = b(d);this.$$compose();return this;
    };
  }function Jf() {
    var a = "!",
        b = { enabled: !1, requireBase: !0, rewriteLinks: !0 };
    this.hashPrefix = function (b) {
      return u(b) ? (a = b, this) : a;
    };this.html5Mode = function (a) {
      if (Ha(a)) return b.enabled = a, this;if (C(a)) {
        Ha(a.enabled) && (b.enabled = a.enabled);Ha(a.requireBase) && (b.requireBase = a.requireBase);if (Ha(a.rewriteLinks) || F(a.rewriteLinks)) b.rewriteLinks = a.rewriteLinks;return this;
      }return b;
    };this.$get = ["$rootScope", "$browser", "$sniffer", "$rootElement", "$window", function (d, c, e, f, g) {
      function h(a, b, d) {
        var e = l.url(),
            f = l.$$state;try {
          c.url(a, b, d), l.$$state = c.state();
        } catch (g) {
          throw l.url(e), l.$$state = f, g;
        }
      }function k(a, b) {
        d.$broadcast("$locationChangeSuccess", l.absUrl(), a, l.$$state, b);
      }var l, m;m = c.baseHref();var n = c.url(),
          p;if (b.enabled) {
        if (!m && b.requireBase) throw kb("nobase");p = n.substring(0, n.indexOf("/", n.indexOf("//") + 2)) + (m || "/");m = e.history ? sc : Bd;
      } else p = Aa(n), m = tc;var r = p.substr(0, Aa(p).lastIndexOf("/") + 1);l = new m(p, r, "#" + a);l.$$parseLinkUrl(n, n);l.$$state = c.state();var J = /^\s*(javascript|mailto):/i;f.on("click", function (a) {
        var e = b.rewriteLinks;if (e && !a.ctrlKey && !a.metaKey && !a.shiftKey && 2 !== a.which && 2 !== a.button) {
          for (var h = B(a.target); "a" !== wa(h[0]);) {
            if (h[0] === f[0] || !(h = h.parent())[0]) return;
          }if (!F(e) || !w(h.attr(e))) {
            var e = h.prop("href"),
                k = h.attr("href") || h.attr("xlink:href");C(e) && "[object SVGAnimatedString]" === e.toString() && (e = Ca(e.animVal).href);J.test(e) || !e || h.attr("target") || a.isDefaultPrevented() || !l.$$parseLinkUrl(e, k) || (a.preventDefault(), l.absUrl() !== c.url() && (d.$apply(), g.angular["ff-684208-preventDefault"] = !0));
          }
        }
      });lb(l.absUrl()) !== lb(n) && c.url(l.absUrl(), !0);var v = !0;
      c.onUrlChange(function (a, b) {
        rc(a, r) ? (d.$evalAsync(function () {
          var c = l.absUrl(),
              e = l.$$state,
              f;a = lb(a);l.$$parse(a);l.$$state = b;f = d.$broadcast("$locationChangeStart", a, c, b, e).defaultPrevented;l.absUrl() === a && (f ? (l.$$parse(c), l.$$state = e, h(c, !1, e)) : (v = !1, k(c, e)));
        }), d.$$phase || d.$digest()) : g.location.href = a;
      });d.$watch(function () {
        if (v || l.$$urlUpdatedByLocation) {
          l.$$urlUpdatedByLocation = !1;var a = lb(c.url()),
              b = lb(l.absUrl()),
              f = c.state(),
              g = l.$$replace,
              m = a !== b || l.$$html5 && e.history && f !== l.$$state;if (v || m) v = !1, d.$evalAsync(function () {
            var b = l.absUrl(),
                c = d.$broadcast("$locationChangeStart", b, a, l.$$state, f).defaultPrevented;l.absUrl() === b && (c ? (l.$$parse(a), l.$$state = f) : (m && h(b, g, f === l.$$state ? null : l.$$state), k(a, f)));
          });
        }l.$$replace = !1;
      });return l;
    }];
  }function Kf() {
    var a = !0,
        b = this;this.debugEnabled = function (b) {
      return u(b) ? (a = b, this) : a;
    };this.$get = ["$window", function (d) {
      function c(a) {
        a instanceof Error && (a.stack && f ? a = a.message && -1 === a.stack.indexOf(a.message) ? "Error: " + a.message + "\n" + a.stack : a.stack : a.sourceURL && (a = a.message + "\n" + a.sourceURL + ":" + a.line));return a;
      }function e(a) {
        var b = d.console || {},
            e = b[a] || b.log || z;a = !1;try {
          a = !!e.apply;
        } catch (f) {}return a ? function () {
          var a = [];q(arguments, function (b) {
            a.push(c(b));
          });return e.apply(b, a);
        } : function (a, b) {
          e(a, null == b ? "" : b);
        };
      }var f = za || /\bEdge\//.test(d.navigator && d.navigator.userAgent);return { log: e("log"), info: e("info"), warn: e("warn"), error: e("error"), debug: function () {
          var c = e("debug");return function () {
            a && c.apply(b, arguments);
          };
        }() };
    }];
  }function zg(a) {
    return a + "";
  }function Ag(a, b) {
    return "undefined" !== typeof a ? a : b;
  }function Dd(a, b) {
    return "undefined" === typeof a ? b : "undefined" === typeof b ? a : a + b;
  }function U(a, b) {
    var d, c, e;switch (a.type) {case s.Program:
        d = !0;q(a.body, function (a) {
          U(a.expression, b);d = d && a.expression.constant;
        });a.constant = d;break;case s.Literal:
        a.constant = !0;a.toWatch = [];break;case s.UnaryExpression:
        U(a.argument, b);a.constant = a.argument.constant;a.toWatch = a.argument.toWatch;break;case s.BinaryExpression:
        U(a.left, b);U(a.right, b);a.constant = a.left.constant && a.right.constant;
        a.toWatch = a.left.toWatch.concat(a.right.toWatch);break;case s.LogicalExpression:
        U(a.left, b);U(a.right, b);a.constant = a.left.constant && a.right.constant;a.toWatch = a.constant ? [] : [a];break;case s.ConditionalExpression:
        U(a.test, b);U(a.alternate, b);U(a.consequent, b);a.constant = a.test.constant && a.alternate.constant && a.consequent.constant;a.toWatch = a.constant ? [] : [a];break;case s.Identifier:
        a.constant = !1;a.toWatch = [a];break;case s.MemberExpression:
        U(a.object, b);a.computed && U(a.property, b);a.constant = a.object.constant && (!a.computed || a.property.constant);a.toWatch = [a];break;case s.CallExpression:
        d = e = a.filter ? !b(a.callee.name).$stateful : !1;c = [];q(a.arguments, function (a) {
          U(a, b);d = d && a.constant;a.constant || c.push.apply(c, a.toWatch);
        });a.constant = d;a.toWatch = e ? c : [a];break;case s.AssignmentExpression:
        U(a.left, b);U(a.right, b);a.constant = a.left.constant && a.right.constant;a.toWatch = [a];break;case s.ArrayExpression:
        d = !0;c = [];q(a.elements, function (a) {
          U(a, b);d = d && a.constant;a.constant || c.push.apply(c, a.toWatch);
        });a.constant = d;a.toWatch = c;break;case s.ObjectExpression:
        d = !0;c = [];q(a.properties, function (a) {
          U(a.value, b);d = d && a.value.constant && !a.computed;a.value.constant || c.push.apply(c, a.value.toWatch);a.computed && (U(a.key, b), a.key.constant || c.push.apply(c, a.key.toWatch));
        });a.constant = d;a.toWatch = c;break;case s.ThisExpression:
        a.constant = !1;a.toWatch = [];break;case s.LocalsExpression:
        a.constant = !1, a.toWatch = [];}
  }function Ed(a) {
    if (1 === a.length) {
      a = a[0].expression;var b = a.toWatch;return 1 !== b.length ? b : b[0] !== a ? b : void 0;
    }
  }function Fd(a) {
    return a.type === s.Identifier || a.type === s.MemberExpression;
  }function Gd(a) {
    if (1 === a.body.length && Fd(a.body[0].expression)) return { type: s.AssignmentExpression, left: a.body[0].expression, right: { type: s.NGValueParameter }, operator: "=" };
  }function Hd(a) {
    this.$filter = a;
  }function Id(a) {
    this.$filter = a;
  }function uc(a, b, d) {
    this.ast = new s(a, d);this.astCompiler = d.csp ? new Id(b) : new Hd(b);
  }function vc(a) {
    return D(a.valueOf) ? a.valueOf() : Bg.call(a);
  }function Lf() {
    var a = V(),
        b = { "true": !0, "false": !1, "null": null, undefined: void 0 },
        d,
        c;this.addLiteral = function (a, c) {
      b[a] = c;
    };this.setIdentifierFns = function (a, b) {
      d = a;c = b;return this;
    };this.$get = ["$filter", function (e) {
      function f(a, b, c) {
        return null == a || null == b ? a === b : "object" !== (typeof a === "undefined" ? "undefined" : _typeof(a)) || (a = vc(a), "object" !== (typeof a === "undefined" ? "undefined" : _typeof(a)) || c) ? a === b || a !== a && b !== b : !1;
      }function g(a, b, c, d, e) {
        var g = d.inputs,
            h;if (1 === g.length) {
          var k = f,
              g = g[0];return a.$watch(function (a) {
            var b = g(a);f(b, k, d.literal) || (h = d(a, void 0, void 0, [b]), k = b && vc(b));return h;
          }, b, c, e);
        }for (var l = [], m = [], n = 0, E = g.length; n < E; n++) {
          l[n] = f, m[n] = null;
        }return a.$watch(function (a) {
          for (var b = !1, c = 0, e = g.length; c < e; c++) {
            var k = g[c](a);if (b || (b = !f(k, l[c], d.literal))) m[c] = k, l[c] = k && vc(k);
          }b && (h = d(a, void 0, void 0, m));return h;
        }, b, c, e);
      }function h(a, b, c, d, e) {
        function f(a) {
          return d(a);
        }function h(a, c, d) {
          n = a;D(b) && b(a, c, d);l(a) && d.$$postDigest(function () {
            l(n) && m();
          });
        }var l = d.literal ? k : u,
            m,
            n;return m = d.inputs ? g(a, h, c, d, e) : a.$watch(f, h, c);
      }function k(a) {
        var b = !0;q(a, function (a) {
          u(a) || (b = !1);
        });return b;
      }function l(a, b, c, d) {
        var e = a.$watch(function (a) {
          e();return d(a);
        }, b, c);return e;
      }function m(a, b) {
        function c(d, e, g, h) {
          g = f && h ? h[0] : a(d, e, g, h);return b(g, d, e);
        }function d(c, e, g, k) {
          g = f && k ? k[0] : a(c, e, g, k);c = b(g, c, e);return h(g) ? c : g;
        }if (!b) return a;var e = a.$$watchDelegate,
            f = !1,
            h = a.literal ? k : u,
            l = a.oneTime ? d : c;l.literal = a.literal;l.oneTime = a.oneTime;f = !a.inputs;e && e !== g ? (l.$$watchDelegate = e, l.inputs = a.inputs) : b.$stateful || (l.$$watchDelegate = g, l.inputs = a.inputs ? a.inputs : [a]);return l;
      }var n = { csp: Ga().noUnsafeEval, literals: ra(b), isIdentifierStart: D(d) && d, isIdentifierContinue: D(c) && c };return function (b, c) {
        var d, f, k;switch (typeof b === "undefined" ? "undefined" : _typeof(b)) {case "string":
            return k = b = b.trim(), d = a[k], d || (":" === b.charAt(0) && ":" === b.charAt(1) && (f = !0, b = b.substring(2)), d = new wc(n), d = new uc(d, e, n).parse(b), d.constant ? d.$$watchDelegate = l : f ? (d.oneTime = !0, d.$$watchDelegate = h) : d.inputs && (d.$$watchDelegate = g), a[k] = d), m(d, c);case "function":
            return m(b, c);default:
            return m(z, c);}
      };
    }];
  }function Nf() {
    var a = !0;this.$get = ["$rootScope", "$exceptionHandler", function (b, d) {
      return Jd(function (a) {
        b.$evalAsync(a);
      }, d, a);
    }];this.errorOnUnhandledRejections = function (b) {
      return u(b) ? (a = b, this) : a;
    };
  }function Of() {
    var a = !0;this.$get = ["$browser", "$exceptionHandler", function (b, d) {
      return Jd(function (a) {
        b.defer(a);
      }, d, a);
    }];this.errorOnUnhandledRejections = function (b) {
      return u(b) ? (a = b, this) : a;
    };
  }function Jd(a, b, d) {
    function c() {
      return new e();
    }function e() {
      var a = this.promise = new f();this.resolve = function (b) {
        k(a, b);
      };this.reject = function (b) {
        m(a, b);
      };this.notify = function (b) {
        p(a, b);
      };
    }function f() {
      this.$$state = { status: 0 };
    }function g() {
      for (; !s && A.length;) {
        var a = A.shift();if (!a.pur) {
          a.pur = !0;var c = a.value,
              c = "Possibly unhandled rejection: " + ("function" === typeof c ? c.toString().replace(/ \{[\s\S]*$/, "") : w(c) ? "undefined" : "string" !== typeof c ? Be(c, void 0) : c);a.value instanceof Error ? b(a.value, c) : b(c);
        }
      }
    }function h(b) {
      !d || b.pending || 2 !== b.status || b.pur || (0 === s && 0 === A.length && a(g), A.push(b));!b.processScheduled && b.pending && (b.processScheduled = !0, ++s, a(function () {
        var c, e, f;f = b.pending;b.processScheduled = !1;b.pending = void 0;try {
          for (var h = 0, l = f.length; h < l; ++h) {
            b.pur = !0;e = f[h][0];c = f[h][b.status];try {
              D(c) ? k(e, c(b.value)) : 1 === b.status ? k(e, b.value) : m(e, b.value);
            } catch (n) {
              m(e, n);
            }
          }
        } finally {
          --s, d && 0 === s && a(g);
        }
      }));
    }function k(a, b) {
      a.$$state.status || (b === a ? n(a, M("qcycle", b)) : l(a, b));
    }function l(a, b) {
      function c(b) {
        g || (g = !0, l(a, b));
      }function d(b) {
        g || (g = !0, n(a, b));
      }function e(b) {
        p(a, b);
      }var f,
          g = !1;try {
        if (C(b) || D(b)) f = b.then;D(f) ? (a.$$state.status = -1, f.call(b, c, d, e)) : (a.$$state.value = b, a.$$state.status = 1, h(a.$$state));
      } catch (k) {
        d(k);
      }
    }function m(a, b) {
      a.$$state.status || n(a, b);
    }function n(a, b) {
      a.$$state.value = b;a.$$state.status = 2;h(a.$$state);
    }function p(c, d) {
      var e = c.$$state.pending;0 >= c.$$state.status && e && e.length && a(function () {
        for (var a, c, f = 0, g = e.length; f < g; f++) {
          c = e[f][0];a = e[f][3];try {
            p(c, D(a) ? a(d) : d);
          } catch (h) {
            b(h);
          }
        }
      });
    }function r(a) {
      var b = new f();m(b, a);return b;
    }function J(a, b, c) {
      var d = null;try {
        D(c) && (d = c());
      } catch (e) {
        return r(e);
      }return d && D(d.then) ? d.then(function () {
        return b(a);
      }, r) : b(a);
    }function v(a, b, c, d) {
      var e = new f();k(e, a);return e.then(b, c, d);
    }function t(a) {
      if (!D(a)) throw M("norslvr", a);var b = new f();a(function (a) {
        k(b, a);
      }, function (a) {
        m(b, a);
      });return b;
    }var M = L("$q", TypeError),
        s = 0,
        A = [];S(f.prototype, { then: function then(a, b, c) {
        if (w(a) && w(b) && w(c)) return this;var d = new f();this.$$state.pending = this.$$state.pending || [];this.$$state.pending.push([d, a, b, c]);0 < this.$$state.status && h(this.$$state);return d;
      }, "catch": function _catch(a) {
        return this.then(null, a);
      }, "finally": function _finally(a, b) {
        return this.then(function (b) {
          return J(b, u, a);
        }, function (b) {
          return J(b, r, a);
        }, b);
      } });var u = v;t.prototype = f.prototype;t.defer = c;t.reject = r;t.when = v;t.resolve = u;t.all = function (a) {
      var b = new f(),
          c = 0,
          d = H(a) ? [] : {};q(a, function (a, e) {
        c++;v(a).then(function (a) {
          d[e] = a;--c || k(b, d);
        }, function (a) {
          m(b, a);
        });
      });0 === c && k(b, d);return b;
    };t.race = function (a) {
      var b = c();q(a, function (a) {
        v(a).then(b.resolve, b.reject);
      });return b.promise;
    };return t;
  }function Xf() {
    this.$get = ["$window", "$timeout", function (a, b) {
      var d = a.requestAnimationFrame || a.webkitRequestAnimationFrame,
          c = a.cancelAnimationFrame || a.webkitCancelAnimationFrame || a.webkitCancelRequestAnimationFrame,
          e = !!d,
          f = e ? function (a) {
        var b = d(a);return function () {
          c(b);
        };
      } : function (a) {
        var c = b(a, 16.66, !1);return function () {
          b.cancel(c);
        };
      };f.supported = e;return f;
    }];
  }function Mf() {
    function a(a) {
      function b() {
        this.$$watchers = this.$$nextSibling = this.$$childHead = this.$$childTail = null;this.$$listeners = {};this.$$listenerCount = {};this.$$watchersCount = 0;this.$id = ++qb;this.$$ChildScope = null;
      }b.prototype = a;return b;
    }var b = 10,
        d = L("$rootScope"),
        c = null,
        e = null;this.digestTtl = function (a) {
      arguments.length && (b = a);return b;
    };this.$get = ["$exceptionHandler", "$parse", "$browser", function (f, g, h) {
      function k(a) {
        a.currentScope.$$destroyed = !0;
      }function l(a) {
        9 === za && (a.$$childHead && l(a.$$childHead), a.$$nextSibling && l(a.$$nextSibling));a.$parent = a.$$nextSibling = a.$$prevSibling = a.$$childHead = a.$$childTail = a.$root = a.$$watchers = null;
      }function m() {
        this.$id = ++qb;this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null;this.$root = this;this.$$destroyed = !1;this.$$listeners = {};this.$$listenerCount = {};this.$$watchersCount = 0;this.$$isolateBindings = null;
      }function n(a) {
        if (M.$$phase) throw d("inprog", M.$$phase);M.$$phase = a;
      }function p(a, b) {
        do {
          a.$$watchersCount += b;
        } while (a = a.$parent);
      }function r(a, b, c) {
        do {
          a.$$listenerCount[c] -= b, 0 === a.$$listenerCount[c] && delete a.$$listenerCount[c];
        } while (a = a.$parent);
      }function J() {}function v() {
        for (; u.length;) {
          try {
            u.shift()();
          } catch (a) {
            f(a);
          }
        }e = null;
      }function t() {
        null === e && (e = h.defer(function () {
          M.$apply(v);
        }));
      }m.prototype = { constructor: m, $new: function $new(b, c) {
          var d;c = c || this;b ? (d = new m(), d.$root = this.$root) : (this.$$ChildScope || (this.$$ChildScope = a(this)), d = new this.$$ChildScope());
          d.$parent = c;d.$$prevSibling = c.$$childTail;c.$$childHead ? (c.$$childTail.$$nextSibling = d, c.$$childTail = d) : c.$$childHead = c.$$childTail = d;(b || c !== this) && d.$on("$destroy", k);return d;
        }, $watch: function $watch(a, b, d, e) {
          var f = g(a);if (f.$$watchDelegate) return f.$$watchDelegate(this, b, d, f, a);var h = this,
              k = h.$$watchers,
              l = { fn: b, last: J, get: f, exp: e || a, eq: !!d };c = null;D(b) || (l.fn = z);k || (k = h.$$watchers = [], k.$$digestWatchIndex = -1);k.unshift(l);k.$$digestWatchIndex++;p(this, 1);return function () {
            var a = $a(k, l);0 <= a && (p(h, -1), a < k.$$digestWatchIndex && k.$$digestWatchIndex--);c = null;
          };
        }, $watchGroup: function $watchGroup(a, b) {
          function c() {
            h = !1;k ? (k = !1, b(e, e, g)) : b(e, d, g);
          }var d = Array(a.length),
              e = Array(a.length),
              f = [],
              g = this,
              h = !1,
              k = !0;if (!a.length) {
            var l = !0;g.$evalAsync(function () {
              l && b(e, e, g);
            });return function () {
              l = !1;
            };
          }if (1 === a.length) return this.$watch(a[0], function (a, c, f) {
            e[0] = a;d[0] = c;b(e, a === c ? e : d, f);
          });q(a, function (a, b) {
            var k = g.$watch(a, function (a, f) {
              e[b] = a;d[b] = f;h || (h = !0, g.$evalAsync(c));
            });f.push(k);
          });return function () {
            for (; f.length;) {
              f.shift()();
            }
          };
        },
        $watchCollection: function $watchCollection(a, b) {
          function c(a) {
            e = a;var b, d, g, h;if (!w(e)) {
              if (C(e)) {
                if (qa(e)) for (f !== n && (f = n, t = f.length = 0, l++), a = e.length, t !== a && (l++, f.length = t = a), b = 0; b < a; b++) {
                  h = f[b], g = e[b], d = h !== h && g !== g, d || h === g || (l++, f[b] = g);
                } else {
                  f !== p && (f = p = {}, t = 0, l++);a = 0;for (b in e) {
                    ua.call(e, b) && (a++, g = e[b], h = f[b], b in f ? (d = h !== h && g !== g, d || h === g || (l++, f[b] = g)) : (t++, f[b] = g, l++));
                  }if (t > a) for (b in l++, f) {
                    ua.call(e, b) || (t--, delete f[b]);
                  }
                }
              } else f !== e && (f = e, l++);return l;
            }
          }c.$stateful = !0;var d = this,
              e,
              f,
              h,
              k = 1 < b.length,
              l = 0,
              m = g(a, c),
              n = [],
              p = {},
              r = !0,
              t = 0;return this.$watch(m, function () {
            r ? (r = !1, b(e, e, d)) : b(e, h, d);if (k) if (C(e)) {
              if (qa(e)) {
                h = Array(e.length);for (var a = 0; a < e.length; a++) {
                  h[a] = e[a];
                }
              } else for (a in h = {}, e) {
                ua.call(e, a) && (h[a] = e[a]);
              }
            } else h = e;
          });
        }, $digest: function $digest() {
          var a,
              g,
              k,
              l,
              m,
              p,
              r,
              t = b,
              q,
              u = [],
              w,
              x;n("$digest");h.$$checkUrlChange();this === M && null !== e && (h.defer.cancel(e), v());c = null;do {
            r = !1;q = this;for (p = 0; p < s.length; p++) {
              try {
                x = s[p], l = x.fn, l(x.scope, x.locals);
              } catch (z) {
                f(z);
              }c = null;
            }s.length = 0;a: do {
              if (p = q.$$watchers) for (p.$$digestWatchIndex = p.length; p.$$digestWatchIndex--;) {
                try {
                  if (a = p[p.$$digestWatchIndex]) if (m = a.get, (g = m(q)) !== (k = a.last) && !(a.eq ? sa(g, k) : da(g) && da(k))) r = !0, c = a, a.last = a.eq ? ra(g, null) : g, l = a.fn, l(g, k === J ? g : k, q), 5 > t && (w = 4 - t, u[w] || (u[w] = []), u[w].push({ msg: D(a.exp) ? "fn: " + (a.exp.name || a.exp.toString()) : a.exp, newVal: g, oldVal: k }));else if (a === c) {
                    r = !1;break a;
                  }
                } catch (B) {
                  f(B);
                }
              }if (!(p = q.$$watchersCount && q.$$childHead || q !== this && q.$$nextSibling)) for (; q !== this && !(p = q.$$nextSibling);) {
                q = q.$parent;
              }
            } while (q = p);if ((r || s.length) && !t--) throw M.$$phase = null, d("infdig", b, u);
          } while (r || s.length);for (M.$$phase = null; I < A.length;) {
            try {
              A[I++]();
            } catch (F) {
              f(F);
            }
          }A.length = I = 0;h.$$checkUrlChange();
        }, $destroy: function $destroy() {
          if (!this.$$destroyed) {
            var a = this.$parent;this.$broadcast("$destroy");this.$$destroyed = !0;this === M && h.$$applicationDestroyed();p(this, -this.$$watchersCount);for (var b in this.$$listenerCount) {
              r(this, this.$$listenerCount[b], b);
            }a && a.$$childHead === this && (a.$$childHead = this.$$nextSibling);a && a.$$childTail === this && (a.$$childTail = this.$$prevSibling);this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling);this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling);this.$destroy = this.$digest = this.$apply = this.$evalAsync = this.$applyAsync = z;this.$on = this.$watch = this.$watchGroup = function () {
              return z;
            };this.$$listeners = {};this.$$nextSibling = null;l(this);
          }
        }, $eval: function $eval(a, b) {
          return g(a)(this, b);
        }, $evalAsync: function $evalAsync(a, b) {
          M.$$phase || s.length || h.defer(function () {
            s.length && M.$digest();
          });s.push({ scope: this, fn: g(a), locals: b });
        }, $$postDigest: function $$postDigest(a) {
          A.push(a);
        },
        $apply: function $apply(a) {
          try {
            n("$apply");try {
              return this.$eval(a);
            } finally {
              M.$$phase = null;
            }
          } catch (b) {
            f(b);
          } finally {
            try {
              M.$digest();
            } catch (c) {
              throw f(c), c;
            }
          }
        }, $applyAsync: function $applyAsync(a) {
          function b() {
            c.$eval(a);
          }var c = this;a && u.push(b);a = g(a);t();
        }, $on: function $on(a, b) {
          var c = this.$$listeners[a];c || (this.$$listeners[a] = c = []);c.push(b);var d = this;do {
            d.$$listenerCount[a] || (d.$$listenerCount[a] = 0), d.$$listenerCount[a]++;
          } while (d = d.$parent);var e = this;return function () {
            var d = c.indexOf(b);-1 !== d && (c[d] = null, r(e, 1, a));
          };
        }, $emit: function $emit(a, b) {
          var c = [],
              d,
              e = this,
              g = !1,
              h = { name: a, targetScope: e, stopPropagation: function stopPropagation() {
              g = !0;
            }, preventDefault: function preventDefault() {
              h.defaultPrevented = !0;
            }, defaultPrevented: !1 },
              k = ab([h], arguments, 1),
              l,
              m;do {
            d = e.$$listeners[a] || c;h.currentScope = e;l = 0;for (m = d.length; l < m; l++) {
              if (d[l]) try {
                d[l].apply(null, k);
              } catch (n) {
                f(n);
              } else d.splice(l, 1), l--, m--;
            }if (g) return h.currentScope = null, h;e = e.$parent;
          } while (e);h.currentScope = null;return h;
        }, $broadcast: function $broadcast(a, b) {
          var c = this,
              d = this,
              e = { name: a, targetScope: this, preventDefault: function preventDefault() {
              e.defaultPrevented = !0;
            }, defaultPrevented: !1 };if (!this.$$listenerCount[a]) return e;for (var g = ab([e], arguments, 1), h, k; c = d;) {
            e.currentScope = c;d = c.$$listeners[a] || [];h = 0;for (k = d.length; h < k; h++) {
              if (d[h]) try {
                d[h].apply(null, g);
              } catch (l) {
                f(l);
              } else d.splice(h, 1), h--, k--;
            }if (!(d = c.$$listenerCount[a] && c.$$childHead || c !== this && c.$$nextSibling)) for (; c !== this && !(d = c.$$nextSibling);) {
              c = c.$parent;
            }
          }e.currentScope = null;return e;
        } };var M = new m(),
          s = M.$$asyncQueue = [],
          A = M.$$postDigestQueue = [],
          u = M.$$applyAsyncQueue = [],
          I = 0;return M;
    }];
  }function Ee() {
    var a = /^\s*(https?|ftp|mailto|tel|file):/,
        b = /^\s*((https?|ftp|file|blob):|data:image\/)/;this.aHrefSanitizationWhitelist = function (b) {
      return u(b) ? (a = b, this) : a;
    };this.imgSrcSanitizationWhitelist = function (a) {
      return u(a) ? (b = a, this) : b;
    };this.$get = function () {
      return function (d, c) {
        var e = c ? b : a,
            f;f = Ca(d).href;return "" === f || f.match(e) ? d : "unsafe:" + f;
      };
    };
  }function Cg(a) {
    if ("self" === a) return a;if (F(a)) {
      if (-1 < a.indexOf("***")) throw ta("iwcard", a);a = Kd(a).replace(/\\\*\\\*/g, ".*").replace(/\\\*/g, "[^:/.?&;]*");return new RegExp("^" + a + "$");
    }if (Xa(a)) return new RegExp("^" + a.source + "$");throw ta("imatcher");
  }function Ld(a) {
    var b = [];u(a) && q(a, function (a) {
      b.push(Cg(a));
    });return b;
  }function Qf() {
    this.SCE_CONTEXTS = oa;var a = ["self"],
        b = [];this.resourceUrlWhitelist = function (b) {
      arguments.length && (a = Ld(b));return a;
    };this.resourceUrlBlacklist = function (a) {
      arguments.length && (b = Ld(a));return b;
    };this.$get = ["$injector", function (d) {
      function c(a, b) {
        return "self" === a ? yd(b) : !!a.exec(b.href);
      }function e(a) {
        var b = function b(a) {
          this.$$unwrapTrustedValue = function () {
            return a;
          };
        };a && (b.prototype = new a());b.prototype.valueOf = function () {
          return this.$$unwrapTrustedValue();
        };b.prototype.toString = function () {
          return this.$$unwrapTrustedValue().toString();
        };return b;
      }var f = function f(a) {
        throw ta("unsafe");
      };d.has("$sanitize") && (f = d.get("$sanitize"));var g = e(),
          h = {};h[oa.HTML] = e(g);h[oa.CSS] = e(g);h[oa.URL] = e(g);h[oa.JS] = e(g);h[oa.RESOURCE_URL] = e(h[oa.URL]);return { trustAs: function trustAs(a, b) {
          var c = h.hasOwnProperty(a) ? h[a] : null;if (!c) throw ta("icontext", a, b);if (null === b || w(b) || "" === b) return b;if ("string" !== typeof b) throw ta("itype", a);return new c(b);
        }, getTrusted: function getTrusted(d, e) {
          if (null === e || w(e) || "" === e) return e;var g = h.hasOwnProperty(d) ? h[d] : null;if (g && e instanceof g) return e.$$unwrapTrustedValue();if (d === oa.RESOURCE_URL) {
            var g = Ca(e.toString()),
                n,
                p,
                r = !1;n = 0;for (p = a.length; n < p; n++) {
              if (c(a[n], g)) {
                r = !0;break;
              }
            }if (r) for (n = 0, p = b.length; n < p; n++) {
              if (c(b[n], g)) {
                r = !1;break;
              }
            }if (r) return e;throw ta("insecurl", e.toString());
          }if (d === oa.HTML) return f(e);throw ta("unsafe");
        }, valueOf: function valueOf(a) {
          return a instanceof g ? a.$$unwrapTrustedValue() : a;
        } };
    }];
  }function Pf() {
    var a = !0;this.enabled = function (b) {
      arguments.length && (a = !!b);return a;
    };this.$get = ["$parse", "$sceDelegate", function (b, d) {
      if (a && 8 > za) throw ta("iequirks");var c = pa(oa);c.isEnabled = function () {
        return a;
      };c.trustAs = d.trustAs;c.getTrusted = d.getTrusted;c.valueOf = d.valueOf;a || (c.trustAs = c.getTrusted = function (a, b) {
        return b;
      }, c.valueOf = Ya);c.parseAs = function (a, d) {
        var e = b(d);return e.literal && e.constant ? e : b(d, function (b) {
          return c.getTrusted(a, b);
        });
      };var e = c.parseAs,
          f = c.getTrusted,
          g = c.trustAs;q(oa, function (a, b) {
        var d = Q(b);c[("parse_as_" + d).replace(xc, gb)] = function (b) {
          return e(a, b);
        };c[("get_trusted_" + d).replace(xc, gb)] = function (b) {
          return f(a, b);
        };c[("trust_as_" + d).replace(xc, gb)] = function (b) {
          return g(a, b);
        };
      });return c;
    }];
  }function Rf() {
    this.$get = ["$window", "$document", function (a, b) {
      var d = {},
          c = !((!a.nw || !a.nw.process) && a.chrome && (a.chrome.app && a.chrome.app.runtime || !a.chrome.app && a.chrome.runtime && a.chrome.runtime.id)) && a.history && a.history.pushState,
          e = Z((/android (\d+)/.exec(Q((a.navigator || {}).userAgent)) || [])[1]),
          f = /Boxee/i.test((a.navigator || {}).userAgent),
          g = b[0] || {},
          h = g.body && g.body.style,
          k = !1,
          l = !1;h && (k = !!("transition" in h || "webkitTransition" in h), l = !!("animation" in h || "webkitAnimation" in h));return { history: !(!c || 4 > e || f), hasEvent: function hasEvent(a) {
          if ("input" === a && za) return !1;if (w(d[a])) {
            var b = g.createElement("div");d[a] = "on" + a in b;
          }return d[a];
        }, csp: Ga(), transitions: k, animations: l, android: e };
    }];
  }function Tf() {
    var a;this.httpOptions = function (b) {
      return b ? (a = b, this) : a;
    };this.$get = ["$exceptionHandler", "$templateCache", "$http", "$q", "$sce", function (b, d, c, e, f) {
      function g(h, k) {
        g.totalPendingRequests++;if (!F(h) || w(d.get(h))) h = f.getTrustedResourceUrl(h);var l = c.defaults && c.defaults.transformResponse;H(l) ? l = l.filter(function (a) {
          return a !== nc;
        }) : l === nc && (l = null);return c.get(h, S({ cache: d, transformResponse: l }, a)).finally(function () {
          g.totalPendingRequests--;
        }).then(function (a) {
          d.put(h, a.data);return a.data;
        }, function (a) {
          k || (a = Dg("tpload", h, a.status, a.statusText), b(a));return e.reject(a);
        });
      }g.totalPendingRequests = 0;return g;
    }];
  }function Uf() {
    this.$get = ["$rootScope", "$browser", "$location", function (a, b, d) {
      return { findBindings: function findBindings(a, b, d) {
          a = a.getElementsByClassName("ng-binding");var g = [];q(a, function (a) {
            var c = ea.element(a).data("$binding");c && q(c, function (c) {
              d ? new RegExp("(^|\\s)" + Kd(b) + "(\\s|\\||$)").test(c) && g.push(a) : -1 !== c.indexOf(b) && g.push(a);
            });
          });return g;
        }, findModels: function findModels(a, b, d) {
          for (var g = ["ng-", "data-ng-", "ng\\:"], h = 0; h < g.length; ++h) {
            var k = a.querySelectorAll("[" + g[h] + "model" + (d ? "=" : "*=") + '"' + b + '"]');if (k.length) return k;
          }
        }, getLocation: function getLocation() {
          return d.url();
        }, setLocation: function setLocation(b) {
          b !== d.url() && (d.url(b), a.$digest());
        }, whenStable: function whenStable(a) {
          b.notifyWhenNoOutstandingRequests(a);
        } };
    }];
  }function Vf() {
    this.$get = ["$rootScope", "$browser", "$q", "$$q", "$exceptionHandler", function (a, b, d, c, e) {
      function f(f, k, l) {
        D(f) || (l = k, k = f, f = z);var m = va.call(arguments, 3),
            n = u(l) && !l,
            p = (n ? c : d).defer(),
            r = p.promise,
            q;q = b.defer(function () {
          try {
            p.resolve(f.apply(null, m));
          } catch (b) {
            p.reject(b), e(b);
          } finally {
            delete g[r.$$timeoutId];
          }n || a.$apply();
        }, k);r.$$timeoutId = q;g[q] = p;return r;
      }var g = {};f.cancel = function (a) {
        return a && a.$$timeoutId in g ? (g[a.$$timeoutId].promise.catch(z), g[a.$$timeoutId].reject("canceled"), delete g[a.$$timeoutId], b.defer.cancel(a.$$timeoutId)) : !1;
      };return f;
    }];
  }function Ca(a) {
    za && (aa.setAttribute("href", a), a = aa.href);aa.setAttribute("href", a);return { href: aa.href, protocol: aa.protocol ? aa.protocol.replace(/:$/, "") : "", host: aa.host, search: aa.search ? aa.search.replace(/^\?/, "") : "", hash: aa.hash ? aa.hash.replace(/^#/, "") : "", hostname: aa.hostname, port: aa.port, pathname: "/" === aa.pathname.charAt(0) ? aa.pathname : "/" + aa.pathname };
  }function yd(a) {
    a = F(a) ? Ca(a) : a;return a.protocol === Md.protocol && a.host === Md.host;
  }function Wf() {
    this.$get = la(x);
  }function Nd(a) {
    function b(a) {
      try {
        return decodeURIComponent(a);
      } catch (b) {
        return a;
      }
    }var d = a[0] || {},
        c = {},
        e = "";return function () {
      var a, g, h, k, l;try {
        a = d.cookie || "";
      } catch (m) {
        a = "";
      }if (a !== e) for (e = a, a = e.split("; "), c = {}, h = 0; h < a.length; h++) {
        g = a[h], k = g.indexOf("="), 0 < k && (l = b(g.substring(0, k)), w(c[l]) && (c[l] = b(g.substring(k + 1))));
      }return c;
    };
  }function $f() {
    this.$get = Nd;
  }function cd(a) {
    function b(d, c) {
      if (C(d)) {
        var e = {};q(d, function (a, c) {
          e[c] = b(c, a);
        });return e;
      }return a.factory(d + "Filter", c);
    }this.register = b;this.$get = ["$injector", function (a) {
      return function (b) {
        return a.get(b + "Filter");
      };
    }];b("currency", Od);b("date", Pd);b("filter", Eg);b("json", Fg);b("limitTo", Gg);b("lowercase", Hg);b("number", Qd);b("orderBy", Rd);b("uppercase", Ig);
  }function Eg() {
    return function (a, b, d, c) {
      if (!qa(a)) {
        if (null == a) return a;throw L("filter")("notarray", a);
      }c = c || "$";var e;switch (yc(b)) {case "function":
          break;case "boolean":case "null":case "number":case "string":
          e = !0;case "object":
          b = Jg(b, d, c, e);break;default:
          return a;}return Array.prototype.filter.call(a, b);
    };
  }function Jg(a, b, d, c) {
    var e = C(a) && d in a;!0 === b ? b = sa : D(b) || (b = function b(a, _b) {
      if (w(a)) return !1;if (null === a || null === _b) return a === _b;if (C(_b) || C(a) && !Wb(a)) return !1;a = Q("" + a);_b = Q("" + _b);return -1 !== a.indexOf(_b);
    });return function (f) {
      return e && !C(f) ? Ea(f, a[d], b, d, !1) : Ea(f, a, b, d, c);
    };
  }function Ea(a, b, d, c, e, f) {
    var g = yc(a),
        h = yc(b);if ("string" === h && "!" === b.charAt(0)) return !Ea(a, b.substring(1), d, c, e);if (H(a)) return a.some(function (a) {
      return Ea(a, b, d, c, e);
    });switch (g) {case "object":
        var k;if (e) {
          for (k in a) {
            if (k.charAt && "$" !== k.charAt(0) && Ea(a[k], b, d, c, !0)) return !0;
          }return f ? !1 : Ea(a, b, d, c, !1);
        }if ("object" === h) {
          for (k in b) {
            if (f = b[k], !D(f) && !w(f) && (g = k === c, !Ea(g ? a : a[k], f, d, c, g, g))) return !1;
          }return !0;
        }return d(a, b);case "function":
        return !1;default:
        return d(a, b);}
  }function yc(a) {
    return null === a ? "null" : typeof a === "undefined" ? "undefined" : _typeof(a);
  }function Od(a) {
    var b = a.NUMBER_FORMATS;return function (a, c, e) {
      w(c) && (c = b.CURRENCY_SYM);w(e) && (e = b.PATTERNS[1].maxFrac);return null == a ? a : Sd(a, b.PATTERNS[1], b.GROUP_SEP, b.DECIMAL_SEP, e).replace(/\u00A4/g, c);
    };
  }function Qd(a) {
    var b = a.NUMBER_FORMATS;return function (a, c) {
      return null == a ? a : Sd(a, b.PATTERNS[0], b.GROUP_SEP, b.DECIMAL_SEP, c);
    };
  }function Kg(a) {
    var b = 0,
        d,
        c,
        e,
        f,
        g;-1 < (c = a.indexOf(Td)) && (a = a.replace(Td, ""));0 < (e = a.search(/e/i)) ? (0 > c && (c = e), c += +a.slice(e + 1), a = a.substring(0, e)) : 0 > c && (c = a.length);for (e = 0; a.charAt(e) === zc; e++) {}
    if (e === (g = a.length)) d = [0], c = 1;else {
      for (g--; a.charAt(g) === zc;) {
        g--;
      }c -= e;d = [];for (f = 0; e <= g; e++, f++) {
        d[f] = +a.charAt(e);
      }
    }c > Ud && (d = d.splice(0, Ud - 1), b = c - 1, c = 1);return { d: d, e: b, i: c };
  }function Lg(a, b, d, c) {
    var e = a.d,
        f = e.length - a.i;b = w(b) ? Math.min(Math.max(d, f), c) : +b;d = b + a.i;c = e[d];if (0 < d) {
      e.splice(Math.max(a.i, d));for (var g = d; g < e.length; g++) {
        e[g] = 0;
      }
    } else for (f = Math.max(0, f), a.i = 1, e.length = Math.max(1, d = b + 1), e[0] = 0, g = 1; g < d; g++) {
      e[g] = 0;
    }if (5 <= c) if (0 > d - 1) {
      for (c = 0; c > d; c--) {
        e.unshift(0), a.i++;
      }e.unshift(1);a.i++;
    } else e[d - 1]++;for (; f < Math.max(0, b); f++) {
      e.push(0);
    }if (b = e.reduceRight(function (a, b, c, d) {
      b += a;d[c] = b % 10;return Math.floor(b / 10);
    }, 0)) e.unshift(b), a.i++;
  }function Sd(a, b, d, c, e) {
    if (!F(a) && !ba(a) || isNaN(a)) return "";var f = !isFinite(a),
        g = !1,
        h = Math.abs(a) + "",
        k = "";if (f) k = "\u221E";else {
      g = Kg(h);Lg(g, e, b.minFrac, b.maxFrac);k = g.d;h = g.i;e = g.e;f = [];for (g = k.reduce(function (a, b) {
        return a && !b;
      }, !0); 0 > h;) {
        k.unshift(0), h++;
      }0 < h ? f = k.splice(h, k.length) : (f = k, k = [0]);h = [];for (k.length >= b.lgSize && h.unshift(k.splice(-b.lgSize, k.length).join("")); k.length > b.gSize;) {
        h.unshift(k.splice(-b.gSize, k.length).join(""));
      }k.length && h.unshift(k.join(""));k = h.join(d);f.length && (k += c + f.join(""));e && (k += "e+" + e);
    }return 0 > a && !g ? b.negPre + k + b.negSuf : b.posPre + k + b.posSuf;
  }function Kb(a, b, d, c) {
    var e = "";if (0 > a || c && 0 >= a) c ? a = -a + 1 : (a = -a, e = "-");for (a = "" + a; a.length < b;) {
      a = zc + a;
    }d && (a = a.substr(a.length - b));return e + a;
  }function Y(a, b, d, c, e) {
    d = d || 0;return function (f) {
      f = f["get" + a]();if (0 < d || f > -d) f += d;0 === f && -12 === d && (f = 12);return Kb(f, b, c, e);
    };
  }function mb(a, b, d) {
    return function (c, e) {
      var f = c["get" + a](),
          g = ub((d ? "STANDALONE" : "") + (b ? "SHORT" : "") + a);return e[g][f];
    };
  }function Vd(a) {
    var b = new Date(a, 0, 1).getDay();return new Date(a, 0, (4 >= b ? 5 : 12) - b);
  }function Wd(a) {
    return function (b) {
      var d = Vd(b.getFullYear());b = +new Date(b.getFullYear(), b.getMonth(), b.getDate() + (4 - b.getDay())) - +d;b = 1 + Math.round(b / 6048E5);return Kb(b, a);
    };
  }function Ac(a, b) {
    return 0 >= a.getFullYear() ? b.ERAS[0] : b.ERAS[1];
  }function Pd(a) {
    function b(a) {
      var b;if (b = a.match(d)) {
        a = new Date(0);var f = 0,
            g = 0,
            h = b[8] ? a.setUTCFullYear : a.setFullYear,
            k = b[8] ? a.setUTCHours : a.setHours;b[9] && (f = Z(b[9] + b[10]), g = Z(b[9] + b[11]));h.call(a, Z(b[1]), Z(b[2]) - 1, Z(b[3]));f = Z(b[4] || 0) - f;g = Z(b[5] || 0) - g;h = Z(b[6] || 0);b = Math.round(1E3 * parseFloat("0." + (b[7] || 0)));k.call(a, f, g, h, b);
      }return a;
    }var d = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;return function (c, d, f) {
      var g = "",
          h = [],
          k,
          l;d = d || "mediumDate";d = a.DATETIME_FORMATS[d] || d;F(c) && (c = Mg.test(c) ? Z(c) : b(c));ba(c) && (c = new Date(c));if (!ga(c) || !isFinite(c.getTime())) return c;
      for (; d;) {
        (l = Ng.exec(d)) ? (h = ab(h, l, 1), d = h.pop()) : (h.push(d), d = null);
      }var m = c.getTimezoneOffset();f && (m = Pc(f, m), c = Yb(c, f, !0));q(h, function (b) {
        k = Og[b];g += k ? k(c, a.DATETIME_FORMATS, m) : "''" === b ? "'" : b.replace(/(^'|'$)/g, "").replace(/''/g, "'");
      });return g;
    };
  }function Fg() {
    return function (a, b) {
      w(b) && (b = 2);return cb(a, b);
    };
  }function Gg() {
    return function (a, b, d) {
      b = Infinity === Math.abs(Number(b)) ? Number(b) : Z(b);if (da(b)) return a;ba(a) && (a = a.toString());if (!qa(a)) return a;d = !d || isNaN(d) ? 0 : Z(d);d = 0 > d ? Math.max(0, a.length + d) : d;return 0 <= b ? Bc(a, d, d + b) : 0 === d ? Bc(a, b, a.length) : Bc(a, Math.max(0, d + b), d);
    };
  }function Bc(a, b, d) {
    return F(a) ? a.slice(b, d) : va.call(a, b, d);
  }function Rd(a) {
    function b(b) {
      return b.map(function (b) {
        var c = 1,
            d = Ya;if (D(b)) d = b;else if (F(b)) {
          if ("+" === b.charAt(0) || "-" === b.charAt(0)) c = "-" === b.charAt(0) ? -1 : 1, b = b.substring(1);if ("" !== b && (d = a(b), d.constant)) var e = d(),
              d = function d(a) {
            return a[e];
          };
        }return { get: d, descending: c };
      });
    }function d(a) {
      switch (typeof a === "undefined" ? "undefined" : _typeof(a)) {case "number":case "boolean":case "string":
          return !0;default:
          return !1;}
    }
    function c(a, b) {
      var c = 0,
          d = a.type,
          k = b.type;if (d === k) {
        var k = a.value,
            l = b.value;"string" === d ? (k = k.toLowerCase(), l = l.toLowerCase()) : "object" === d && (C(k) && (k = a.index), C(l) && (l = b.index));k !== l && (c = k < l ? -1 : 1);
      } else c = d < k ? -1 : 1;return c;
    }return function (a, f, g, h) {
      if (null == a) return a;if (!qa(a)) throw L("orderBy")("notarray", a);H(f) || (f = [f]);0 === f.length && (f = ["+"]);var k = b(f),
          l = g ? -1 : 1,
          m = D(h) ? h : c;a = Array.prototype.map.call(a, function (a, b) {
        return { value: a, tieBreaker: { value: b, type: "number", index: b }, predicateValues: k.map(function (c) {
            var e = c.get(a);c = typeof e === "undefined" ? "undefined" : _typeof(e);if (null === e) c = "string", e = "null";else if ("object" === c) a: {
              if (D(e.valueOf) && (e = e.valueOf(), d(e))) break a;Wb(e) && (e = e.toString(), d(e));
            }return { value: e, type: c, index: b };
          }) };
      });a.sort(function (a, b) {
        for (var c = 0, d = k.length; c < d; c++) {
          var e = m(a.predicateValues[c], b.predicateValues[c]);if (e) return e * k[c].descending * l;
        }return m(a.tieBreaker, b.tieBreaker) * l;
      });return a = a.map(function (a) {
        return a.value;
      });
    };
  }function Qa(a) {
    D(a) && (a = { link: a });a.restrict = a.restrict || "AC";return la(a);
  }function Lb(a, b, d, c, e) {
    this.$$controls = [];this.$error = {};this.$$success = {};this.$pending = void 0;this.$name = e(b.name || b.ngForm || "")(d);this.$dirty = !1;this.$valid = this.$pristine = !0;this.$submitted = this.$invalid = !1;this.$$parentForm = Mb;this.$$element = a;this.$$animate = c;Xd(this);
  }function Xd(a) {
    a.$$classCache = {};a.$$classCache[Yd] = !(a.$$classCache[nb] = a.$$element.hasClass(nb));
  }function Zd(a) {
    function b(a, b, c) {
      c && !a.$$classCache[b] ? (a.$$animate.addClass(a.$$element, b), a.$$classCache[b] = !0) : !c && a.$$classCache[b] && (a.$$animate.removeClass(a.$$element, b), a.$$classCache[b] = !1);
    }function d(a, c, d) {
      c = c ? "-" + Tc(c, "-") : "";b(a, nb + c, !0 === d);b(a, Yd + c, !1 === d);
    }var c = a.set,
        e = a.unset;a.clazz.prototype.$setValidity = function (a, g, h) {
      w(g) ? (this.$pending || (this.$pending = {}), c(this.$pending, a, h)) : (this.$pending && e(this.$pending, a, h), $d(this.$pending) && (this.$pending = void 0));Ha(g) ? g ? (e(this.$error, a, h), c(this.$$success, a, h)) : (c(this.$error, a, h), e(this.$$success, a, h)) : (e(this.$error, a, h), e(this.$$success, a, h));this.$pending ? (b(this, "ng-pending", !0), this.$valid = this.$invalid = void 0, d(this, "", null)) : (b(this, "ng-pending", !1), this.$valid = $d(this.$error), this.$invalid = !this.$valid, d(this, "", this.$valid));g = this.$pending && this.$pending[a] ? void 0 : this.$error[a] ? !1 : this.$$success[a] ? !0 : null;d(this, a, g);this.$$parentForm.$setValidity(a, g, this);
    };
  }function $d(a) {
    if (a) for (var b in a) {
      if (a.hasOwnProperty(b)) return !1;
    }return !0;
  }function Cc(a) {
    a.$formatters.push(function (b) {
      return a.$isEmpty(b) ? b : b.toString();
    });
  }function Ra(a, b, d, c, e, f) {
    var g = Q(b[0].type);if (!e.android) {
      var h = !1;b.on("compositionstart", function () {
        h = !0;
      });b.on("compositionend", function () {
        h = !1;l();
      });
    }var k,
        l = function l(a) {
      k && (f.defer.cancel(k), k = null);if (!h) {
        var e = b.val();a = a && a.type;"password" === g || d.ngTrim && "false" === d.ngTrim || (e = T(e));(c.$viewValue !== e || "" === e && c.$$hasNativeValidators) && c.$setViewValue(e, a);
      }
    };if (e.hasEvent("input")) b.on("input", l);else {
      var m = function m(a, b, c) {
        k || (k = f.defer(function () {
          k = null;b && b.value === c || l(a);
        }));
      };b.on("keydown", function (a) {
        var b = a.keyCode;91 === b || 15 < b && 19 > b || 37 <= b && 40 >= b || m(a, this, this.value);
      });if (e.hasEvent("paste")) b.on("paste cut", m);
    }b.on("change", l);if (ae[g] && c.$$hasNativeValidators && g === d.type) b.on("keydown wheel mousedown", function (a) {
      if (!k) {
        var b = this.validity,
            c = b.badInput,
            d = b.typeMismatch;k = f.defer(function () {
          k = null;b.badInput === c && b.typeMismatch === d || l(a);
        });
      }
    });c.$render = function () {
      var a = c.$isEmpty(c.$viewValue) ? "" : c.$viewValue;b.val() !== a && b.val(a);
    };
  }function Nb(a, b) {
    return function (d, c) {
      var e, f;if (ga(d)) return d;if (F(d)) {
        '"' === d.charAt(0) && '"' === d.charAt(d.length - 1) && (d = d.substring(1, d.length - 1));if (Pg.test(d)) return new Date(d);
        a.lastIndex = 0;if (e = a.exec(d)) return e.shift(), f = c ? { yyyy: c.getFullYear(), MM: c.getMonth() + 1, dd: c.getDate(), HH: c.getHours(), mm: c.getMinutes(), ss: c.getSeconds(), sss: c.getMilliseconds() / 1E3 } : { yyyy: 1970, MM: 1, dd: 1, HH: 0, mm: 0, ss: 0, sss: 0 }, q(e, function (a, c) {
          c < b.length && (f[b[c]] = +a);
        }), new Date(f.yyyy, f.MM - 1, f.dd, f.HH, f.mm, f.ss || 0, 1E3 * f.sss || 0);
      }return NaN;
    };
  }function ob(a, b, d, c) {
    return function (e, f, g, h, k, l, m) {
      function n(a) {
        return a && !(a.getTime && a.getTime() !== a.getTime());
      }function p(a) {
        return u(a) && !ga(a) ? d(a) || void 0 : a;
      }Dc(e, f, g, h);Ra(e, f, g, h, k, l);var r = h && h.$options.getOption("timezone"),
          q;h.$$parserName = a;h.$parsers.push(function (a) {
        if (h.$isEmpty(a)) return null;if (b.test(a)) return a = d(a, q), r && (a = Yb(a, r)), a;
      });h.$formatters.push(function (a) {
        if (a && !ga(a)) throw pb("datefmt", a);if (n(a)) return (q = a) && r && (q = Yb(q, r, !0)), m("date")(a, c, r);q = null;return "";
      });if (u(g.min) || g.ngMin) {
        var v;h.$validators.min = function (a) {
          return !n(a) || w(v) || d(a) >= v;
        };g.$observe("min", function (a) {
          v = p(a);h.$validate();
        });
      }if (u(g.max) || g.ngMax) {
        var t;
        h.$validators.max = function (a) {
          return !n(a) || w(t) || d(a) <= t;
        };g.$observe("max", function (a) {
          t = p(a);h.$validate();
        });
      }
    };
  }function Dc(a, b, d, c) {
    (c.$$hasNativeValidators = C(b[0].validity)) && c.$parsers.push(function (a) {
      var c = b.prop("validity") || {};return c.badInput || c.typeMismatch ? void 0 : a;
    });
  }function be(a) {
    a.$$parserName = "number";a.$parsers.push(function (b) {
      if (a.$isEmpty(b)) return null;if (Qg.test(b)) return parseFloat(b);
    });a.$formatters.push(function (b) {
      if (!a.$isEmpty(b)) {
        if (!ba(b)) throw pb("numfmt", b);b = b.toString();
      }return b;
    });
  }
  function Sa(a) {
    u(a) && !ba(a) && (a = parseFloat(a));return da(a) ? void 0 : a;
  }function Ec(a) {
    var b = a.toString(),
        d = b.indexOf(".");return -1 === d ? -1 < a && 1 > a && (a = /e-(\d+)$/.exec(b)) ? Number(a[1]) : 0 : b.length - d - 1;
  }function ce(a, b, d) {
    a = Number(a);var c = (a | 0) !== a,
        e = (b | 0) !== b,
        f = (d | 0) !== d;if (c || e || f) {
      var g = c ? Ec(a) : 0,
          h = e ? Ec(b) : 0,
          k = f ? Ec(d) : 0,
          g = Math.max(g, h, k),
          g = Math.pow(10, g);a *= g;b *= g;d *= g;c && (a = Math.round(a));e && (b = Math.round(b));f && (d = Math.round(d));
    }return 0 === (a - b) % d;
  }function de(a, b, d, c, e) {
    if (u(c)) {
      a = a(c);if (!a.constant) throw pb("constexpr", d, c);return a(b);
    }return e;
  }function Fc(a, b) {
    function d(a, b) {
      if (!a || !a.length) return [];if (!b || !b.length) return a;var c = [],
          d = 0;a: for (; d < a.length; d++) {
        for (var e = a[d], m = 0; m < b.length; m++) {
          if (e === b[m]) continue a;
        }c.push(e);
      }return c;
    }function c(a) {
      var b = a;H(a) ? b = a.map(c).join(" ") : C(a) && (b = Object.keys(a).filter(function (b) {
        return a[b];
      }).join(" "));return b;
    }a = "ngClass" + a;var e;return ["$parse", function (f) {
      return { restrict: "AC", link: function link(g, h, k) {
          function l(a, b) {
            var c = [];q(a, function (a) {
              if (0 < b || n[a]) n[a] = (n[a] || 0) + b, n[a] === +(0 < b) && c.push(a);
            });return c.join(" ");
          }function m(a) {
            if (a === b) {
              var c = r,
                  c = l(c && c.split(" "), 1);k.$addClass(c);
            } else c = r, c = l(c && c.split(" "), -1), k.$removeClass(c);p = a;
          }var n = h.data("$classCounts"),
              p = !0,
              r;n || (n = V(), h.data("$classCounts", n));"ngClass" !== a && (e || (e = f("$index", function (a) {
            return a & 1;
          })), g.$watch(e, m));g.$watch(f(k[a], c), function (a) {
            F(a) || (a = c(a));if (p === b) {
              var e = a,
                  f = r && r.split(" "),
                  g = e && e.split(" "),
                  e = d(f, g),
                  f = d(g, f),
                  e = l(e, -1),
                  f = l(f, 1);k.$addClass(f);k.$removeClass(e);
            }r = a;
          });
        } };
    }];
  }
  function Ob(a, b, d, c, e, f, g, h, k) {
    this.$modelValue = this.$viewValue = Number.NaN;this.$$rawModelValue = void 0;this.$validators = {};this.$asyncValidators = {};this.$parsers = [];this.$formatters = [];this.$viewChangeListeners = [];this.$untouched = !0;this.$touched = !1;this.$pristine = !0;this.$dirty = !1;this.$valid = !0;this.$invalid = !1;this.$error = {};this.$$success = {};this.$pending = void 0;this.$name = k(d.name || "", !1)(a);this.$$parentForm = Mb;this.$options = Pb;this.$$parsedNgModel = e(d.ngModel);this.$$parsedNgModelAssign = this.$$parsedNgModel.assign;
    this.$$ngModelGet = this.$$parsedNgModel;this.$$ngModelSet = this.$$parsedNgModelAssign;this.$$pendingDebounce = null;this.$$parserValid = void 0;this.$$currentValidationRunId = 0;Object.defineProperty(this, "$$scope", { value: a });this.$$attr = d;this.$$element = c;this.$$animate = f;this.$$timeout = g;this.$$parse = e;this.$$q = h;this.$$exceptionHandler = b;Xd(this);Rg(this);
  }function Rg(a) {
    a.$$scope.$watch(function (b) {
      b = a.$$ngModelGet(b);if (b !== a.$modelValue && (a.$modelValue === a.$modelValue || b === b)) {
        a.$modelValue = a.$$rawModelValue = b;a.$$parserValid = void 0;for (var d = a.$formatters, c = d.length, e = b; c--;) {
          e = d[c](e);
        }a.$viewValue !== e && (a.$$updateEmptyClasses(e), a.$viewValue = a.$$lastCommittedViewValue = e, a.$render(), a.$$runValidators(a.$modelValue, a.$viewValue, z));
      }return b;
    });
  }function Gc(a) {
    this.$$options = a;
  }function ee(a, b) {
    q(b, function (b, c) {
      u(a[c]) || (a[c] = b);
    });
  }function Ta(a, b) {
    a.prop("selected", b);a.attr("selected", b);
  }var Sg = /^\/(.+)\/([a-z]*)$/,
      ua = Object.prototype.hasOwnProperty,
      Ic = { objectMaxDepth: 5 },
      Q = function Q(a) {
    return F(a) ? a.toLowerCase() : a;
  },
      ub = function ub(a) {
    return F(a) ? a.toUpperCase() : a;
  },
      za,
      B,
      na,
      va = [].slice,
      sg = [].splice,
      Tg = [].push,
      ma = Object.prototype.toString,
      Mc = Object.getPrototypeOf,
      Fa = L("ng"),
      ea = x.angular || (x.angular = {}),
      ac,
      qb = 0;za = x.document.documentMode;var da = Number.isNaN || function (a) {
    return a !== a;
  };z.$inject = [];Ya.$inject = [];var H = Array.isArray,
      qe = /^\[object (?:Uint8|Uint8Clamped|Uint16|Uint32|Int8|Int16|Int32|Float32|Float64)Array]$/,
      T = function T(a) {
    return F(a) ? a.trim() : a;
  },
      Kd = function Kd(a) {
    return a.replace(/([-()[\]{}+?*.$^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08");
  },
      Ga = function Ga() {
    if (!u(Ga.rules)) {
      var a = x.document.querySelector("[ng-csp]") || x.document.querySelector("[data-ng-csp]");if (a) {
        var b = a.getAttribute("ng-csp") || a.getAttribute("data-ng-csp");Ga.rules = { noUnsafeEval: !b || -1 !== b.indexOf("no-unsafe-eval"), noInlineStyle: !b || -1 !== b.indexOf("no-inline-style") };
      } else {
        a = Ga;try {
          new Function(""), b = !1;
        } catch (d) {
          b = !0;
        }a.rules = { noUnsafeEval: b, noInlineStyle: !1 };
      }
    }return Ga.rules;
  },
      rb = function rb() {
    if (u(rb.name_)) return rb.name_;var a,
        b,
        d = Ja.length,
        c,
        e;for (b = 0; b < d; ++b) {
      if (c = Ja[b], a = x.document.querySelector("[" + c.replace(":", "\\:") + "jq]")) {
        e = a.getAttribute(c + "jq");break;
      }
    }return rb.name_ = e;
  },
      se = /:/g,
      Ja = ["ng-", "data-ng-", "ng:", "x-ng-"],
      ve = function (a) {
    var b = a.currentScript;if (!b) return !0;if (!(b instanceof x.HTMLScriptElement || b instanceof x.SVGScriptElement)) return !1;b = b.attributes;return [b.getNamedItem("src"), b.getNamedItem("href"), b.getNamedItem("xlink:href")].every(function (b) {
      if (!b) return !0;if (!b.value) return !1;var c = a.createElement("a");c.href = b.value;if (a.location.origin === c.origin) return !0;switch (c.protocol) {case "http:":case "https:":case "ftp:":case "blob:":case "file:":case "data:":
          return !0;default:
          return !1;}
    });
  }(x.document),
      ye = /[A-Z]/g,
      Uc = !1,
      Ia = 3,
      De = { full: "1.6.4", major: 1, minor: 6, dot: 4, codeName: "phenomenal-footnote" };W.expando = "ng339";var hb = W.cache = {},
      eg = 1;W._data = function (a) {
    return this.cache[a[this.expando]] || {};
  };var ag = /-([a-z])/g,
      Ug = /^-ms-/,
      zb = { mouseleave: "mouseout", mouseenter: "mouseover" },
      dc = L("jqLite"),
      dg = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
      cc = /<|&#?\w+;/,
      bg = /<([\w:-]+)/,
      cg = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
      ha = { option: [1, '<select multiple="multiple">', "</select>"], thead: [1, "<table>", "</table>"], col: [2, "<table><colgroup>", "</colgroup></table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: [0, "", ""] };ha.optgroup = ha.option;ha.tbody = ha.tfoot = ha.colgroup = ha.caption = ha.thead;ha.th = ha.td;var jg = x.Node.prototype.contains || function (a) {
    return !!(this.compareDocumentPosition(a) & 16);
  },
      Na = W.prototype = { ready: ed, toString: function toString() {
      var a = [];q(this, function (b) {
        a.push("" + b);
      });return "[" + a.join(", ") + "]";
    }, eq: function eq(a) {
      return 0 <= a ? B(this[a]) : B(this[this.length + a]);
    }, length: 0, push: Tg, sort: [].sort, splice: [].splice },
      Fb = {};q("multiple selected checked disabled readOnly required open".split(" "), function (a) {
    Fb[Q(a)] = a;
  });var jd = {};q("input select option textarea button form details".split(" "), function (a) {
    jd[a] = !0;
  });var rd = { ngMinlength: "minlength", ngMaxlength: "maxlength", ngMin: "min", ngMax: "max",
    ngPattern: "pattern", ngStep: "step" };q({ data: hc, removeData: gc, hasData: function hasData(a) {
      for (var b in hb[a.ng339]) {
        return !0;
      }return !1;
    }, cleanData: function cleanData(a) {
      for (var b = 0, d = a.length; b < d; b++) {
        gc(a[b]);
      }
    } }, function (a, b) {
    W[b] = a;
  });q({ data: hc, inheritedData: Db, scope: function scope(a) {
      return B.data(a, "$scope") || Db(a.parentNode || a, ["$isolateScope", "$scope"]);
    }, isolateScope: function isolateScope(a) {
      return B.data(a, "$isolateScope") || B.data(a, "$isolateScopeNoTemplate");
    }, controller: gd, injector: function injector(a) {
      return Db(a, "$injector");
    }, removeAttr: function removeAttr(a, b) {
      a.removeAttribute(b);
    }, hasClass: Ab, css: function css(a, b, d) {
      b = wb(b.replace(Ug, "ms-"));if (u(d)) a.style[b] = d;else return a.style[b];
    }, attr: function attr(a, b, d) {
      var c = a.nodeType;if (c !== Ia && 2 !== c && 8 !== c && a.getAttribute) {
        var c = Q(b),
            e = Fb[c];if (u(d)) null === d || !1 === d && e ? a.removeAttribute(b) : a.setAttribute(b, e ? c : d);else return a = a.getAttribute(b), e && null !== a && (a = c), null === a ? void 0 : a;
      }
    }, prop: function prop(a, b, d) {
      if (u(d)) a[b] = d;else return a[b];
    }, text: function () {
      function a(a, d) {
        if (w(d)) {
          var c = a.nodeType;return 1 === c || c === Ia ? a.textContent : "";
        }a.textContent = d;
      }a.$dv = "";return a;
    }(), val: function val(a, b) {
      if (w(b)) {
        if (a.multiple && "select" === wa(a)) {
          var d = [];q(a.options, function (a) {
            a.selected && d.push(a.value || a.text);
          });return d;
        }return a.value;
      }a.value = b;
    }, html: function html(a, b) {
      if (w(b)) return a.innerHTML;xb(a, !0);a.innerHTML = b;
    }, empty: hd }, function (a, b) {
    W.prototype[b] = function (b, c) {
      var e,
          f,
          g = this.length;if (a !== hd && w(2 === a.length && a !== Ab && a !== gd ? b : c)) {
        if (C(b)) {
          for (e = 0; e < g; e++) {
            if (a === hc) a(this[e], b);else for (f in b) {
              a(this[e], f, b[f]);
            }
          }return this;
        }e = a.$dv;g = w(e) ? Math.min(g, 1) : g;for (f = 0; f < g; f++) {
          var h = a(this[f], b, c);e = e ? e + h : h;
        }return e;
      }for (e = 0; e < g; e++) {
        a(this[e], b, c);
      }return this;
    };
  });q({ removeData: gc, on: function on(a, b, d, c) {
      if (u(c)) throw dc("onargs");if (bc(a)) {
        c = yb(a, !0);var e = c.events,
            f = c.handle;f || (f = c.handle = gg(a, e));c = 0 <= b.indexOf(" ") ? b.split(" ") : [b];for (var g = c.length, h = function h(b, c, g) {
          var h = e[b];h || (h = e[b] = [], h.specialHandlerWrapper = c, "$destroy" === b || g || a.addEventListener(b, f));h.push(d);
        }; g--;) {
          b = c[g], zb[b] ? (h(zb[b], ig), h(b, void 0, !0)) : h(b);
        }
      }
    },
    off: fd, one: function one(a, b, d) {
      a = B(a);a.on(b, function e() {
        a.off(b, d);a.off(b, e);
      });a.on(b, d);
    }, replaceWith: function replaceWith(a, b) {
      var d,
          c = a.parentNode;xb(a);q(new W(b), function (b) {
        d ? c.insertBefore(b, d.nextSibling) : c.replaceChild(b, a);d = b;
      });
    }, children: function children(a) {
      var b = [];q(a.childNodes, function (a) {
        1 === a.nodeType && b.push(a);
      });return b;
    }, contents: function contents(a) {
      return a.contentDocument || a.childNodes || [];
    }, append: function append(a, b) {
      var d = a.nodeType;if (1 === d || 11 === d) {
        b = new W(b);for (var d = 0, c = b.length; d < c; d++) {
          a.appendChild(b[d]);
        }
      }
    },
    prepend: function prepend(a, b) {
      if (1 === a.nodeType) {
        var d = a.firstChild;q(new W(b), function (b) {
          a.insertBefore(b, d);
        });
      }
    }, wrap: function wrap(a, b) {
      var d = B(b).eq(0).clone()[0],
          c = a.parentNode;c && c.replaceChild(d, a);d.appendChild(a);
    }, remove: Eb, detach: function detach(a) {
      Eb(a, !0);
    }, after: function after(a, b) {
      var d = a,
          c = a.parentNode;if (c) {
        b = new W(b);for (var e = 0, f = b.length; e < f; e++) {
          var g = b[e];c.insertBefore(g, d.nextSibling);d = g;
        }
      }
    }, addClass: Cb, removeClass: Bb, toggleClass: function toggleClass(a, b, d) {
      b && q(b.split(" "), function (b) {
        var e = d;w(e) && (e = !Ab(a, b));
        (e ? Cb : Bb)(a, b);
      });
    }, parent: function parent(a) {
      return (a = a.parentNode) && 11 !== a.nodeType ? a : null;
    }, next: function next(a) {
      return a.nextElementSibling;
    }, find: function find(a, b) {
      return a.getElementsByTagName ? a.getElementsByTagName(b) : [];
    }, clone: fc, triggerHandler: function triggerHandler(a, b, d) {
      var c,
          e,
          f = b.type || b,
          g = yb(a);if (g = (g = g && g.events) && g[f]) c = { preventDefault: function preventDefault() {
          this.defaultPrevented = !0;
        }, isDefaultPrevented: function isDefaultPrevented() {
          return !0 === this.defaultPrevented;
        }, stopImmediatePropagation: function stopImmediatePropagation() {
          this.immediatePropagationStopped = !0;
        }, isImmediatePropagationStopped: function isImmediatePropagationStopped() {
          return !0 === this.immediatePropagationStopped;
        }, stopPropagation: z, type: f, target: a }, b.type && (c = S(c, b)), b = pa(g), e = d ? [c].concat(d) : [c], q(b, function (b) {
        c.isImmediatePropagationStopped() || b.apply(a, e);
      });
    } }, function (a, b) {
    W.prototype[b] = function (b, c, e) {
      for (var f, g = 0, h = this.length; g < h; g++) {
        w(f) ? (f = a(this[g], b, c, e), u(f) && (f = B(f))) : ec(f, a(this[g], b, c, e));
      }return u(f) ? f : this;
    };
  });W.prototype.bind = W.prototype.on;W.prototype.unbind = W.prototype.off;var Vg = Object.create(null);kd.prototype = { _idx: function _idx(a) {
      if (a === this._lastKey) return this._lastIndex;
      this._lastKey = a;return this._lastIndex = this._keys.indexOf(a);
    }, _transformKey: function _transformKey(a) {
      return da(a) ? Vg : a;
    }, get: function get(a) {
      a = this._transformKey(a);a = this._idx(a);if (-1 !== a) return this._values[a];
    }, set: function set(a, b) {
      a = this._transformKey(a);var d = this._idx(a);-1 === d && (d = this._lastIndex = this._keys.length);this._keys[d] = a;this._values[d] = b;
    }, delete: function _delete(a) {
      a = this._transformKey(a);a = this._idx(a);if (-1 === a) return !1;this._keys.splice(a, 1);this._values.splice(a, 1);this._lastKey = NaN;this._lastIndex = -1;return !0;
    } };
  var Gb = kd,
      Zf = [function () {
    this.$get = [function () {
      return Gb;
    }];
  }],
      lg = /^([^(]+?)=>/,
      mg = /^[^(]*\(\s*([^)]*)\)/m,
      Wg = /,/,
      Xg = /^\s*(_?)(\S+?)\1\s*$/,
      kg = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,
      ya = L("$injector");eb.$$annotate = function (a, b, d) {
    var c;if ("function" === typeof a) {
      if (!(c = a.$inject)) {
        c = [];if (a.length) {
          if (b) throw F(d) && d || (d = a.name || ng(a)), ya("strictdi", d);b = ld(a);q(b[1].split(Wg), function (a) {
            a.replace(Xg, function (a, b, d) {
              c.push(d);
            });
          });
        }a.$inject = c;
      }
    } else H(a) ? (b = a.length - 1, sb(a[b], "fn"), c = a.slice(0, b)) : sb(a, "fn", !0);return c;
  };var fe = L("$animate"),
      qf = function qf() {
    this.$get = z;
  },
      rf = function rf() {
    var a = new Gb(),
        b = [];this.$get = ["$$AnimateRunner", "$rootScope", function (d, c) {
      function e(a, b, c) {
        var d = !1;b && (b = F(b) ? b.split(" ") : H(b) ? b : [], q(b, function (b) {
          b && (d = !0, a[b] = c);
        }));return d;
      }function f() {
        q(b, function (b) {
          var c = a.get(b);if (c) {
            var d = og(b.attr("class")),
                e = "",
                f = "";q(c, function (a, b) {
              a !== !!d[b] && (a ? e += (e.length ? " " : "") + b : f += (f.length ? " " : "") + b);
            });q(b, function (a) {
              e && Cb(a, e);f && Bb(a, f);
            });a.delete(b);
          }
        });b.length = 0;
      }return { enabled: z,
        on: z, off: z, pin: z, push: function push(g, h, k, l) {
          l && l();k = k || {};k.from && g.css(k.from);k.to && g.css(k.to);if (k.addClass || k.removeClass) if (h = k.addClass, l = k.removeClass, k = a.get(g) || {}, h = e(k, h, !0), l = e(k, l, !1), h || l) a.set(g, k), b.push(g), 1 === b.length && c.$$postDigest(f);g = new d();g.complete();return g;
        } };
    }];
  },
      of = ["$provide", function (a) {
    var b = this,
        d = null;this.$$registeredAnimations = Object.create(null);this.register = function (c, d) {
      if (c && "." !== c.charAt(0)) throw fe("notcsel", c);var f = c + "-animation";b.$$registeredAnimations[c.substr(1)] = f;a.factory(f, d);
    };this.classNameFilter = function (a) {
      if (1 === arguments.length && (d = a instanceof RegExp ? a : null) && /[(\s|\/)]ng-animate[(\s|\/)]/.test(d.toString())) throw d = null, fe("nongcls", "ng-animate");return d;
    };this.$get = ["$$animateQueue", function (a) {
      function b(a, c, d) {
        if (d) {
          var e;a: {
            for (e = 0; e < d.length; e++) {
              var l = d[e];if (1 === l.nodeType) {
                e = l;break a;
              }
            }e = void 0;
          }!e || e.parentNode || e.previousElementSibling || (d = null);
        }d ? d.after(a) : c.prepend(a);
      }return { on: a.on, off: a.off, pin: a.pin, enabled: a.enabled, cancel: function cancel(a) {
          a.end && a.end();
        }, enter: function enter(d, g, h, k) {
          g = g && B(g);h = h && B(h);g = g || h.parent();b(d, g, h);return a.push(d, "enter", ia(k));
        }, move: function move(d, g, h, k) {
          g = g && B(g);h = h && B(h);g = g || h.parent();b(d, g, h);return a.push(d, "move", ia(k));
        }, leave: function leave(b, d) {
          return a.push(b, "leave", ia(d), function () {
            b.remove();
          });
        }, addClass: function addClass(b, d, e) {
          e = ia(e);e.addClass = ib(e.addclass, d);return a.push(b, "addClass", e);
        }, removeClass: function removeClass(b, d, e) {
          e = ia(e);e.removeClass = ib(e.removeClass, d);return a.push(b, "removeClass", e);
        }, setClass: function setClass(b, d, e, k) {
          k = ia(k);k.addClass = ib(k.addClass, d);k.removeClass = ib(k.removeClass, e);return a.push(b, "setClass", k);
        }, animate: function animate(b, d, e, k, l) {
          l = ia(l);l.from = l.from ? S(l.from, d) : d;l.to = l.to ? S(l.to, e) : e;l.tempClasses = ib(l.tempClasses, k || "ng-inline-animate");return a.push(b, "animate", l);
        } };
    }];
  }],
      tf = function tf() {
    this.$get = ["$$rAF", function (a) {
      function b(b) {
        d.push(b);1 < d.length || a(function () {
          for (var a = 0; a < d.length; a++) {
            d[a]();
          }d = [];
        });
      }var d = [];return function () {
        var a = !1;b(function () {
          a = !0;
        });return function (d) {
          a ? d() : b(d);
        };
      };
    }];
  },
      sf = function sf() {
    this.$get = ["$q", "$sniffer", "$$animateAsyncRun", "$$isDocumentHidden", "$timeout", function (a, b, d, c, e) {
      function f(a) {
        this.setHost(a);var b = d();this._doneCallbacks = [];this._tick = function (a) {
          c() ? e(a, 0, !1) : b(a);
        };this._state = 0;
      }f.chain = function (a, b) {
        function c() {
          if (d === a.length) b(!0);else a[d](function (a) {
            !1 === a ? b(!1) : (d++, c());
          });
        }var d = 0;c();
      };f.all = function (a, b) {
        function c(f) {
          e = e && f;++d === a.length && b(e);
        }var d = 0,
            e = !0;q(a, function (a) {
          a.done(c);
        });
      };f.prototype = { setHost: function setHost(a) {
          this.host = a || {};
        },
        done: function done(a) {
          2 === this._state ? a() : this._doneCallbacks.push(a);
        }, progress: z, getPromise: function getPromise() {
          if (!this.promise) {
            var b = this;this.promise = a(function (a, c) {
              b.done(function (b) {
                !1 === b ? c() : a();
              });
            });
          }return this.promise;
        }, then: function then(a, b) {
          return this.getPromise().then(a, b);
        }, "catch": function _catch(a) {
          return this.getPromise()["catch"](a);
        }, "finally": function _finally(a) {
          return this.getPromise()["finally"](a);
        }, pause: function pause() {
          this.host.pause && this.host.pause();
        }, resume: function resume() {
          this.host.resume && this.host.resume();
        }, end: function end() {
          this.host.end && this.host.end();this._resolve(!0);
        }, cancel: function cancel() {
          this.host.cancel && this.host.cancel();this._resolve(!1);
        }, complete: function complete(a) {
          var b = this;0 === b._state && (b._state = 1, b._tick(function () {
            b._resolve(a);
          }));
        }, _resolve: function _resolve(a) {
          2 !== this._state && (q(this._doneCallbacks, function (b) {
            b(a);
          }), this._doneCallbacks.length = 0, this._state = 2);
        } };return f;
    }];
  },
      pf = function pf() {
    this.$get = ["$$rAF", "$q", "$$AnimateRunner", function (a, b, d) {
      return function (b, e) {
        function f() {
          a(function () {
            g.addClass && (b.addClass(g.addClass), g.addClass = null);g.removeClass && (b.removeClass(g.removeClass), g.removeClass = null);g.to && (b.css(g.to), g.to = null);h || k.complete();h = !0;
          });return k;
        }var g = e || {};g.$$prepared || (g = ra(g));g.cleanupStyles && (g.from = g.to = null);g.from && (b.css(g.from), g.from = null);var h,
            k = new d();return { start: f, end: f };
      };
    }];
  },
      fa = L("$compile"),
      lc = new function () {}();Wc.$inject = ["$provide", "$$sanitizeUriProvider"];Ib.prototype.isFirstChange = function () {
    return this.previousValue === lc;
  };var md = /^((?:x|data)[:\-_])/i,
      rg = /[:\-_]+(.)/g,
      td = L("$controller"),
      sd = /^(\S+)(\s+as\s+([\w$]+))?$/,
      Af = function Af() {
    this.$get = ["$document", function (a) {
      return function (b) {
        b ? !b.nodeType && b instanceof B && (b = b[0]) : b = a[0].body;return b.offsetWidth + 1;
      };
    }];
  },
      ud = "application/json",
      pc = { "Content-Type": ud + ";charset=utf-8" },
      ug = /^\[|^\{(?!\{)/,
      vg = { "[": /]$/, "{": /}$/ },
      tg = /^\)]\}',?\n/,
      oc = L("$http"),
      Da = ea.$interpolateMinErr = L("$interpolate");Da.throwNoconcat = function (a) {
    throw Da("noconcat", a);
  };Da.interr = function (a, b) {
    return Da("interr", a, b.toString());
  };var If = function If() {
    this.$get = function () {
      function a(a) {
        var b = function b(a) {
          b.data = a;b.called = !0;
        };b.id = a;return b;
      }var b = ea.callbacks,
          d = {};return { createCallback: function createCallback(c) {
          c = "_" + (b.$$counter++).toString(36);var e = "angular.callbacks." + c,
              f = a(c);d[e] = b[c] = f;return e;
        }, wasCalled: function wasCalled(a) {
          return d[a].called;
        }, getResponse: function getResponse(a) {
          return d[a].data;
        }, removeCallback: function removeCallback(a) {
          delete b[d[a].id];delete d[a];
        } };
    };
  },
      Yg = /^([^?#]*)(\?([^#]*))?(#(.*))?$/,
      xg = { http: 80, https: 443, ftp: 21 },
      kb = L("$location"),
      yg = /^\s*[\\/]{2,}/,
      Zg = { $$absUrl: "", $$html5: !1, $$replace: !1, absUrl: Jb("$$absUrl"),
    url: function url(a) {
      if (w(a)) return this.$$url;var b = Yg.exec(a);(b[1] || "" === a) && this.path(decodeURIComponent(b[1]));(b[2] || b[1] || "" === a) && this.search(b[3] || "");this.hash(b[5] || "");return this;
    }, protocol: Jb("$$protocol"), host: Jb("$$host"), port: Jb("$$port"), path: Cd("$$path", function (a) {
      a = null !== a ? a.toString() : "";return "/" === a.charAt(0) ? a : "/" + a;
    }), search: function search(a, b) {
      switch (arguments.length) {case 0:
          return this.$$search;case 1:
          if (F(a) || ba(a)) a = a.toString(), this.$$search = Rc(a);else if (C(a)) a = ra(a, {}), q(a, function (b, c) {
            null == b && delete a[c];
          }), this.$$search = a;else throw kb("isrcharg");break;default:
          w(b) || null === b ? delete this.$$search[a] : this.$$search[a] = b;}this.$$compose();return this;
    }, hash: Cd("$$hash", function (a) {
      return null !== a ? a.toString() : "";
    }), replace: function replace() {
      this.$$replace = !0;return this;
    } };q([Bd, tc, sc], function (a) {
    a.prototype = Object.create(Zg);a.prototype.state = function (b) {
      if (!arguments.length) return this.$$state;if (a !== sc || !this.$$html5) throw kb("nostate");this.$$state = w(b) ? null : b;this.$$urlUpdatedByLocation = !0;return this;
    };
  });var Ua = L("$parse"),
      Bg = {}.constructor.prototype.valueOf,
      Qb = V();q("+ - * / % === !== == != < > <= >= && || ! = |".split(" "), function (a) {
    Qb[a] = !0;
  });var $g = { n: "\n", f: "\f", r: "\r", t: "\t", v: "\v", "'": "'", '"': '"' },
      wc = function wc(a) {
    this.options = a;
  };wc.prototype = { constructor: wc, lex: function lex(a) {
      this.text = a;this.index = 0;for (this.tokens = []; this.index < this.text.length;) {
        if (a = this.text.charAt(this.index), '"' === a || "'" === a) this.readString(a);else if (this.isNumber(a) || "." === a && this.isNumber(this.peek())) this.readNumber();else if (this.isIdentifierStart(this.peekMultichar())) this.readIdent();else if (this.is(a, "(){}[].,;:?")) this.tokens.push({ index: this.index, text: a }), this.index++;else if (this.isWhitespace(a)) this.index++;else {
          var b = a + this.peek(),
              d = b + this.peek(2),
              c = Qb[b],
              e = Qb[d];Qb[a] || c || e ? (a = e ? d : c ? b : a, this.tokens.push({ index: this.index, text: a, operator: !0 }), this.index += a.length) : this.throwError("Unexpected next character ", this.index, this.index + 1);
        }
      }return this.tokens;
    }, is: function is(a, b) {
      return -1 !== b.indexOf(a);
    }, peek: function peek(a) {
      a = a || 1;return this.index + a < this.text.length ? this.text.charAt(this.index + a) : !1;
    }, isNumber: function isNumber(a) {
      return "0" <= a && "9" >= a && "string" === typeof a;
    }, isWhitespace: function isWhitespace(a) {
      return " " === a || "\r" === a || "\t" === a || "\n" === a || "\v" === a || "\xA0" === a;
    }, isIdentifierStart: function isIdentifierStart(a) {
      return this.options.isIdentifierStart ? this.options.isIdentifierStart(a, this.codePointAt(a)) : this.isValidIdentifierStart(a);
    }, isValidIdentifierStart: function isValidIdentifierStart(a) {
      return "a" <= a && "z" >= a || "A" <= a && "Z" >= a || "_" === a || "$" === a;
    }, isIdentifierContinue: function isIdentifierContinue(a) {
      return this.options.isIdentifierContinue ? this.options.isIdentifierContinue(a, this.codePointAt(a)) : this.isValidIdentifierContinue(a);
    }, isValidIdentifierContinue: function isValidIdentifierContinue(a, b) {
      return this.isValidIdentifierStart(a, b) || this.isNumber(a);
    }, codePointAt: function codePointAt(a) {
      return 1 === a.length ? a.charCodeAt(0) : (a.charCodeAt(0) << 10) + a.charCodeAt(1) - 56613888;
    }, peekMultichar: function peekMultichar() {
      var a = this.text.charAt(this.index),
          b = this.peek();if (!b) return a;var d = a.charCodeAt(0),
          c = b.charCodeAt(0);return 55296 <= d && 56319 >= d && 56320 <= c && 57343 >= c ? a + b : a;
    }, isExpOperator: function isExpOperator(a) {
      return "-" === a || "+" === a || this.isNumber(a);
    }, throwError: function throwError(a, b, d) {
      d = d || this.index;b = u(b) ? "s " + b + "-" + this.index + " [" + this.text.substring(b, d) + "]" : " " + d;throw Ua("lexerr", a, b, this.text);
    }, readNumber: function readNumber() {
      for (var a = "", b = this.index; this.index < this.text.length;) {
        var d = Q(this.text.charAt(this.index));if ("." === d || this.isNumber(d)) a += d;else {
          var c = this.peek();if ("e" === d && this.isExpOperator(c)) a += d;else if (this.isExpOperator(d) && c && this.isNumber(c) && "e" === a.charAt(a.length - 1)) a += d;else if (!this.isExpOperator(d) || c && this.isNumber(c) || "e" !== a.charAt(a.length - 1)) break;else this.throwError("Invalid exponent");
        }this.index++;
      }this.tokens.push({ index: b, text: a, constant: !0, value: Number(a) });
    }, readIdent: function readIdent() {
      var a = this.index;for (this.index += this.peekMultichar().length; this.index < this.text.length;) {
        var b = this.peekMultichar();if (!this.isIdentifierContinue(b)) break;this.index += b.length;
      }this.tokens.push({ index: a, text: this.text.slice(a, this.index), identifier: !0 });
    }, readString: function readString(a) {
      var b = this.index;this.index++;
      for (var d = "", c = a, e = !1; this.index < this.text.length;) {
        var f = this.text.charAt(this.index),
            c = c + f;if (e) "u" === f ? (e = this.text.substring(this.index + 1, this.index + 5), e.match(/[\da-f]{4}/i) || this.throwError("Invalid unicode escape [\\u" + e + "]"), this.index += 4, d += String.fromCharCode(parseInt(e, 16))) : d += $g[f] || f, e = !1;else if ("\\" === f) e = !0;else {
          if (f === a) {
            this.index++;this.tokens.push({ index: b, text: c, constant: !0, value: d });return;
          }d += f;
        }this.index++;
      }this.throwError("Unterminated quote", b);
    } };var s = function s(a, b) {
    this.lexer = a;this.options = b;
  };s.Program = "Program";s.ExpressionStatement = "ExpressionStatement";s.AssignmentExpression = "AssignmentExpression";s.ConditionalExpression = "ConditionalExpression";s.LogicalExpression = "LogicalExpression";s.BinaryExpression = "BinaryExpression";s.UnaryExpression = "UnaryExpression";s.CallExpression = "CallExpression";s.MemberExpression = "MemberExpression";s.Identifier = "Identifier";s.Literal = "Literal";s.ArrayExpression = "ArrayExpression";s.Property = "Property";s.ObjectExpression = "ObjectExpression";
  s.ThisExpression = "ThisExpression";s.LocalsExpression = "LocalsExpression";s.NGValueParameter = "NGValueParameter";s.prototype = { ast: function ast(a) {
      this.text = a;this.tokens = this.lexer.lex(a);a = this.program();0 !== this.tokens.length && this.throwError("is an unexpected token", this.tokens[0]);return a;
    }, program: function program() {
      for (var a = [];;) {
        if (0 < this.tokens.length && !this.peek("}", ")", ";", "]") && a.push(this.expressionStatement()), !this.expect(";")) return { type: s.Program, body: a };
      }
    }, expressionStatement: function expressionStatement() {
      return { type: s.ExpressionStatement,
        expression: this.filterChain() };
    }, filterChain: function filterChain() {
      for (var a = this.expression(); this.expect("|");) {
        a = this.filter(a);
      }return a;
    }, expression: function expression() {
      return this.assignment();
    }, assignment: function assignment() {
      var a = this.ternary();if (this.expect("=")) {
        if (!Fd(a)) throw Ua("lval");a = { type: s.AssignmentExpression, left: a, right: this.assignment(), operator: "=" };
      }return a;
    }, ternary: function ternary() {
      var a = this.logicalOR(),
          b,
          d;return this.expect("?") && (b = this.expression(), this.consume(":")) ? (d = this.expression(), { type: s.ConditionalExpression,
        test: a, alternate: b, consequent: d }) : a;
    }, logicalOR: function logicalOR() {
      for (var a = this.logicalAND(); this.expect("||");) {
        a = { type: s.LogicalExpression, operator: "||", left: a, right: this.logicalAND() };
      }return a;
    }, logicalAND: function logicalAND() {
      for (var a = this.equality(); this.expect("&&");) {
        a = { type: s.LogicalExpression, operator: "&&", left: a, right: this.equality() };
      }return a;
    }, equality: function equality() {
      for (var a = this.relational(), b; b = this.expect("==", "!=", "===", "!==");) {
        a = { type: s.BinaryExpression, operator: b.text, left: a, right: this.relational() };
      }return a;
    }, relational: function relational() {
      for (var a = this.additive(), b; b = this.expect("<", ">", "<=", ">=");) {
        a = { type: s.BinaryExpression, operator: b.text, left: a, right: this.additive() };
      }return a;
    }, additive: function additive() {
      for (var a = this.multiplicative(), b; b = this.expect("+", "-");) {
        a = { type: s.BinaryExpression, operator: b.text, left: a, right: this.multiplicative() };
      }return a;
    }, multiplicative: function multiplicative() {
      for (var a = this.unary(), b; b = this.expect("*", "/", "%");) {
        a = { type: s.BinaryExpression, operator: b.text, left: a, right: this.unary() };
      }return a;
    },
    unary: function unary() {
      var a;return (a = this.expect("+", "-", "!")) ? { type: s.UnaryExpression, operator: a.text, prefix: !0, argument: this.unary() } : this.primary();
    }, primary: function primary() {
      var a;this.expect("(") ? (a = this.filterChain(), this.consume(")")) : this.expect("[") ? a = this.arrayDeclaration() : this.expect("{") ? a = this.object() : this.selfReferential.hasOwnProperty(this.peek().text) ? a = ra(this.selfReferential[this.consume().text]) : this.options.literals.hasOwnProperty(this.peek().text) ? a = { type: s.Literal, value: this.options.literals[this.consume().text] } : this.peek().identifier ? a = this.identifier() : this.peek().constant ? a = this.constant() : this.throwError("not a primary expression", this.peek());for (var b; b = this.expect("(", "[", ".");) {
        "(" === b.text ? (a = { type: s.CallExpression, callee: a, arguments: this.parseArguments() }, this.consume(")")) : "[" === b.text ? (a = { type: s.MemberExpression, object: a, property: this.expression(), computed: !0 }, this.consume("]")) : "." === b.text ? a = { type: s.MemberExpression, object: a, property: this.identifier(), computed: !1 } : this.throwError("IMPOSSIBLE");
      }return a;
    }, filter: function filter(a) {
      a = [a];for (var b = { type: s.CallExpression, callee: this.identifier(), arguments: a, filter: !0 }; this.expect(":");) {
        a.push(this.expression());
      }return b;
    }, parseArguments: function parseArguments() {
      var a = [];if (")" !== this.peekToken().text) {
        do {
          a.push(this.filterChain());
        } while (this.expect(","));
      }return a;
    }, identifier: function identifier() {
      var a = this.consume();a.identifier || this.throwError("is not a valid identifier", a);return { type: s.Identifier, name: a.text };
    }, constant: function constant() {
      return { type: s.Literal, value: this.consume().value };
    },
    arrayDeclaration: function arrayDeclaration() {
      var a = [];if ("]" !== this.peekToken().text) {
        do {
          if (this.peek("]")) break;a.push(this.expression());
        } while (this.expect(","));
      }this.consume("]");return { type: s.ArrayExpression, elements: a };
    }, object: function object() {
      var a = [],
          b;if ("}" !== this.peekToken().text) {
        do {
          if (this.peek("}")) break;b = { type: s.Property, kind: "init" };this.peek().constant ? (b.key = this.constant(), b.computed = !1, this.consume(":"), b.value = this.expression()) : this.peek().identifier ? (b.key = this.identifier(), b.computed = !1, this.peek(":") ? (this.consume(":"), b.value = this.expression()) : b.value = b.key) : this.peek("[") ? (this.consume("["), b.key = this.expression(), this.consume("]"), b.computed = !0, this.consume(":"), b.value = this.expression()) : this.throwError("invalid key", this.peek());a.push(b);
        } while (this.expect(","));
      }this.consume("}");return { type: s.ObjectExpression, properties: a };
    }, throwError: function throwError(a, b) {
      throw Ua("syntax", b.text, a, b.index + 1, this.text, this.text.substring(b.index));
    }, consume: function consume(a) {
      if (0 === this.tokens.length) throw Ua("ueoe", this.text);var b = this.expect(a);b || this.throwError("is unexpected, expecting [" + a + "]", this.peek());return b;
    }, peekToken: function peekToken() {
      if (0 === this.tokens.length) throw Ua("ueoe", this.text);return this.tokens[0];
    }, peek: function peek(a, b, d, c) {
      return this.peekAhead(0, a, b, d, c);
    }, peekAhead: function peekAhead(a, b, d, c, e) {
      if (this.tokens.length > a) {
        a = this.tokens[a];var f = a.text;if (f === b || f === d || f === c || f === e || !(b || d || c || e)) return a;
      }return !1;
    }, expect: function expect(a, b, d, c) {
      return (a = this.peek(a, b, d, c)) ? (this.tokens.shift(), a) : !1;
    }, selfReferential: { "this": { type: s.ThisExpression },
      $locals: { type: s.LocalsExpression } } };Hd.prototype = { compile: function compile(a) {
      var b = this;this.state = { nextId: 0, filters: {}, fn: { vars: [], body: [], own: {} }, assign: { vars: [], body: [], own: {} }, inputs: [] };U(a, b.$filter);var d = "",
          c;this.stage = "assign";if (c = Gd(a)) this.state.computing = "assign", d = this.nextId(), this.recurse(c, d), this.return_(d), d = "fn.assign=" + this.generateFunction("assign", "s,v,l");c = Ed(a.body);b.stage = "inputs";q(c, function (a, c) {
        var d = "fn" + c;b.state[d] = { vars: [], body: [], own: {} };b.state.computing = d;var h = b.nextId();
        b.recurse(a, h);b.return_(h);b.state.inputs.push(d);a.watchId = c;
      });this.state.computing = "fn";this.stage = "main";this.recurse(a);a = '"' + this.USE + " " + this.STRICT + '";\n' + this.filterPrefix() + "var fn=" + this.generateFunction("fn", "s,l,a,i") + d + this.watchFns() + "return fn;";a = new Function("$filter", "getStringValue", "ifDefined", "plus", a)(this.$filter, zg, Ag, Dd);this.state = this.stage = void 0;return a;
    }, USE: "use", STRICT: "strict", watchFns: function watchFns() {
      var a = [],
          b = this.state.inputs,
          d = this;q(b, function (b) {
        a.push("var " + b + "=" + d.generateFunction(b, "s"));
      });b.length && a.push("fn.inputs=[" + b.join(",") + "];");return a.join("");
    }, generateFunction: function generateFunction(a, b) {
      return "function(" + b + "){" + this.varsPrefix(a) + this.body(a) + "};";
    }, filterPrefix: function filterPrefix() {
      var a = [],
          b = this;q(this.state.filters, function (d, c) {
        a.push(d + "=$filter(" + b.escape(c) + ")");
      });return a.length ? "var " + a.join(",") + ";" : "";
    }, varsPrefix: function varsPrefix(a) {
      return this.state[a].vars.length ? "var " + this.state[a].vars.join(",") + ";" : "";
    }, body: function body(a) {
      return this.state[a].body.join("");
    },
    recurse: function recurse(a, b, d, c, e, f) {
      var g,
          h,
          k = this,
          l,
          m,
          n;c = c || z;if (!f && u(a.watchId)) b = b || this.nextId(), this.if_("i", this.lazyAssign(b, this.computedMember("i", a.watchId)), this.lazyRecurse(a, b, d, c, e, !0));else switch (a.type) {case s.Program:
          q(a.body, function (b, c) {
            k.recurse(b.expression, void 0, void 0, function (a) {
              h = a;
            });c !== a.body.length - 1 ? k.current().body.push(h, ";") : k.return_(h);
          });break;case s.Literal:
          m = this.escape(a.value);this.assign(b, m);c(b || m);break;case s.UnaryExpression:
          this.recurse(a.argument, void 0, void 0, function (a) {
            h = a;
          });m = a.operator + "(" + this.ifDefined(h, 0) + ")";this.assign(b, m);c(m);break;case s.BinaryExpression:
          this.recurse(a.left, void 0, void 0, function (a) {
            g = a;
          });this.recurse(a.right, void 0, void 0, function (a) {
            h = a;
          });m = "+" === a.operator ? this.plus(g, h) : "-" === a.operator ? this.ifDefined(g, 0) + a.operator + this.ifDefined(h, 0) : "(" + g + ")" + a.operator + "(" + h + ")";this.assign(b, m);c(m);break;case s.LogicalExpression:
          b = b || this.nextId();k.recurse(a.left, b);k.if_("&&" === a.operator ? b : k.not(b), k.lazyRecurse(a.right, b));c(b);break;case s.ConditionalExpression:
          b = b || this.nextId();k.recurse(a.test, b);k.if_(b, k.lazyRecurse(a.alternate, b), k.lazyRecurse(a.consequent, b));c(b);break;case s.Identifier:
          b = b || this.nextId();d && (d.context = "inputs" === k.stage ? "s" : this.assign(this.nextId(), this.getHasOwnProperty("l", a.name) + "?l:s"), d.computed = !1, d.name = a.name);k.if_("inputs" === k.stage || k.not(k.getHasOwnProperty("l", a.name)), function () {
            k.if_("inputs" === k.stage || "s", function () {
              e && 1 !== e && k.if_(k.isNull(k.nonComputedMember("s", a.name)), k.lazyAssign(k.nonComputedMember("s", a.name), "{}"));k.assign(b, k.nonComputedMember("s", a.name));
            });
          }, b && k.lazyAssign(b, k.nonComputedMember("l", a.name)));c(b);break;case s.MemberExpression:
          g = d && (d.context = this.nextId()) || this.nextId();b = b || this.nextId();k.recurse(a.object, g, void 0, function () {
            k.if_(k.notNull(g), function () {
              a.computed ? (h = k.nextId(), k.recurse(a.property, h), k.getStringValue(h), e && 1 !== e && k.if_(k.not(k.computedMember(g, h)), k.lazyAssign(k.computedMember(g, h), "{}")), m = k.computedMember(g, h), k.assign(b, m), d && (d.computed = !0, d.name = h)) : (e && 1 !== e && k.if_(k.isNull(k.nonComputedMember(g, a.property.name)), k.lazyAssign(k.nonComputedMember(g, a.property.name), "{}")), m = k.nonComputedMember(g, a.property.name), k.assign(b, m), d && (d.computed = !1, d.name = a.property.name));
            }, function () {
              k.assign(b, "undefined");
            });c(b);
          }, !!e);break;case s.CallExpression:
          b = b || this.nextId();a.filter ? (h = k.filter(a.callee.name), l = [], q(a.arguments, function (a) {
            var b = k.nextId();k.recurse(a, b);l.push(b);
          }), m = h + "(" + l.join(",") + ")", k.assign(b, m), c(b)) : (h = k.nextId(), g = {}, l = [], k.recurse(a.callee, h, g, function () {
            k.if_(k.notNull(h), function () {
              q(a.arguments, function (b) {
                k.recurse(b, a.constant ? void 0 : k.nextId(), void 0, function (a) {
                  l.push(a);
                });
              });m = g.name ? k.member(g.context, g.name, g.computed) + "(" + l.join(",") + ")" : h + "(" + l.join(",") + ")";k.assign(b, m);
            }, function () {
              k.assign(b, "undefined");
            });c(b);
          }));break;case s.AssignmentExpression:
          h = this.nextId();g = {};this.recurse(a.left, void 0, g, function () {
            k.if_(k.notNull(g.context), function () {
              k.recurse(a.right, h);m = k.member(g.context, g.name, g.computed) + a.operator + h;k.assign(b, m);c(b || m);
            });
          }, 1);break;case s.ArrayExpression:
          l = [];q(a.elements, function (b) {
            k.recurse(b, a.constant ? void 0 : k.nextId(), void 0, function (a) {
              l.push(a);
            });
          });m = "[" + l.join(",") + "]";this.assign(b, m);c(b || m);break;case s.ObjectExpression:
          l = [];n = !1;q(a.properties, function (a) {
            a.computed && (n = !0);
          });n ? (b = b || this.nextId(), this.assign(b, "{}"), q(a.properties, function (a) {
            a.computed ? (g = k.nextId(), k.recurse(a.key, g)) : g = a.key.type === s.Identifier ? a.key.name : "" + a.key.value;h = k.nextId();
            k.recurse(a.value, h);k.assign(k.member(b, g, a.computed), h);
          })) : (q(a.properties, function (b) {
            k.recurse(b.value, a.constant ? void 0 : k.nextId(), void 0, function (a) {
              l.push(k.escape(b.key.type === s.Identifier ? b.key.name : "" + b.key.value) + ":" + a);
            });
          }), m = "{" + l.join(",") + "}", this.assign(b, m));c(b || m);break;case s.ThisExpression:
          this.assign(b, "s");c(b || "s");break;case s.LocalsExpression:
          this.assign(b, "l");c(b || "l");break;case s.NGValueParameter:
          this.assign(b, "v"), c(b || "v");}
    }, getHasOwnProperty: function getHasOwnProperty(a, b) {
      var d = a + "." + b,
          c = this.current().own;c.hasOwnProperty(d) || (c[d] = this.nextId(!1, a + "&&(" + this.escape(b) + " in " + a + ")"));return c[d];
    }, assign: function assign(a, b) {
      if (a) return this.current().body.push(a, "=", b, ";"), a;
    }, filter: function filter(a) {
      this.state.filters.hasOwnProperty(a) || (this.state.filters[a] = this.nextId(!0));return this.state.filters[a];
    }, ifDefined: function ifDefined(a, b) {
      return "ifDefined(" + a + "," + this.escape(b) + ")";
    }, plus: function plus(a, b) {
      return "plus(" + a + "," + b + ")";
    }, return_: function return_(a) {
      this.current().body.push("return ", a, ";");
    }, if_: function if_(a, b, d) {
      if (!0 === a) b();else {
        var c = this.current().body;c.push("if(", a, "){");b();c.push("}");d && (c.push("else{"), d(), c.push("}"));
      }
    }, not: function not(a) {
      return "!(" + a + ")";
    }, isNull: function isNull(a) {
      return a + "==null";
    }, notNull: function notNull(a) {
      return a + "!=null";
    }, nonComputedMember: function nonComputedMember(a, b) {
      var d = /[^$_a-zA-Z0-9]/g;return (/^[$_a-zA-Z][$_a-zA-Z0-9]*$/.test(b) ? a + "." + b : a + '["' + b.replace(d, this.stringEscapeFn) + '"]'
      );
    }, computedMember: function computedMember(a, b) {
      return a + "[" + b + "]";
    }, member: function member(a, b, d) {
      return d ? this.computedMember(a, b) : this.nonComputedMember(a, b);
    }, getStringValue: function getStringValue(a) {
      this.assign(a, "getStringValue(" + a + ")");
    }, lazyRecurse: function lazyRecurse(a, b, d, c, e, f) {
      var g = this;return function () {
        g.recurse(a, b, d, c, e, f);
      };
    }, lazyAssign: function lazyAssign(a, b) {
      var d = this;return function () {
        d.assign(a, b);
      };
    }, stringEscapeRegex: /[^ a-zA-Z0-9]/g, stringEscapeFn: function stringEscapeFn(a) {
      return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
    }, escape: function escape(a) {
      if (F(a)) return "'" + a.replace(this.stringEscapeRegex, this.stringEscapeFn) + "'";if (ba(a)) return a.toString();if (!0 === a) return "true";if (!1 === a) return "false";if (null === a) return "null";if ("undefined" === typeof a) return "undefined";throw Ua("esc");
    }, nextId: function nextId(a, b) {
      var d = "v" + this.state.nextId++;a || this.current().vars.push(d + (b ? "=" + b : ""));return d;
    }, current: function current() {
      return this.state[this.state.computing];
    } };Id.prototype = { compile: function compile(a) {
      var b = this;U(a, b.$filter);var d, c;if (d = Gd(a)) c = this.recurse(d);d = Ed(a.body);var e;d && (e = [], q(d, function (a, c) {
        var d = b.recurse(a);a.input = d;e.push(d);a.watchId = c;
      }));var f = [];q(a.body, function (a) {
        f.push(b.recurse(a.expression));
      });
      a = 0 === a.body.length ? z : 1 === a.body.length ? f[0] : function (a, b) {
        var c;q(f, function (d) {
          c = d(a, b);
        });return c;
      };c && (a.assign = function (a, b, d) {
        return c(a, d, b);
      });e && (a.inputs = e);return a;
    }, recurse: function recurse(a, b, d) {
      var c,
          e,
          f = this,
          g;if (a.input) return this.inputs(a.input, a.watchId);switch (a.type) {case s.Literal:
          return this.value(a.value, b);case s.UnaryExpression:
          return e = this.recurse(a.argument), this["unary" + a.operator](e, b);case s.BinaryExpression:
          return c = this.recurse(a.left), e = this.recurse(a.right), this["binary" + a.operator](c, e, b);case s.LogicalExpression:
          return c = this.recurse(a.left), e = this.recurse(a.right), this["binary" + a.operator](c, e, b);case s.ConditionalExpression:
          return this["ternary?:"](this.recurse(a.test), this.recurse(a.alternate), this.recurse(a.consequent), b);case s.Identifier:
          return f.identifier(a.name, b, d);case s.MemberExpression:
          return c = this.recurse(a.object, !1, !!d), a.computed || (e = a.property.name), a.computed && (e = this.recurse(a.property)), a.computed ? this.computedMember(c, e, b, d) : this.nonComputedMember(c, e, b, d);case s.CallExpression:
          return g = [], q(a.arguments, function (a) {
            g.push(f.recurse(a));
          }), a.filter && (e = this.$filter(a.callee.name)), a.filter || (e = this.recurse(a.callee, !0)), a.filter ? function (a, c, d, f) {
            for (var n = [], p = 0; p < g.length; ++p) {
              n.push(g[p](a, c, d, f));
            }a = e.apply(void 0, n, f);return b ? { context: void 0, name: void 0, value: a } : a;
          } : function (a, c, d, f) {
            var n = e(a, c, d, f),
                p;if (null != n.value) {
              p = [];for (var r = 0; r < g.length; ++r) {
                p.push(g[r](a, c, d, f));
              }p = n.value.apply(n.context, p);
            }return b ? { value: p } : p;
          };case s.AssignmentExpression:
          return c = this.recurse(a.left, !0, 1), e = this.recurse(a.right), function (a, d, f, g) {
            var n = c(a, d, f, g);a = e(a, d, f, g);n.context[n.name] = a;return b ? { value: a } : a;
          };case s.ArrayExpression:
          return g = [], q(a.elements, function (a) {
            g.push(f.recurse(a));
          }), function (a, c, d, e) {
            for (var f = [], p = 0; p < g.length; ++p) {
              f.push(g[p](a, c, d, e));
            }return b ? { value: f } : f;
          };case s.ObjectExpression:
          return g = [], q(a.properties, function (a) {
            a.computed ? g.push({ key: f.recurse(a.key), computed: !0, value: f.recurse(a.value) }) : g.push({ key: a.key.type === s.Identifier ? a.key.name : "" + a.key.value, computed: !1, value: f.recurse(a.value) });
          }), function (a, c, d, e) {
            for (var f = {}, p = 0; p < g.length; ++p) {
              g[p].computed ? f[g[p].key(a, c, d, e)] = g[p].value(a, c, d, e) : f[g[p].key] = g[p].value(a, c, d, e);
            }return b ? { value: f } : f;
          };case s.ThisExpression:
          return function (a) {
            return b ? { value: a } : a;
          };case s.LocalsExpression:
          return function (a, c) {
            return b ? { value: c } : c;
          };case s.NGValueParameter:
          return function (a, c, d) {
            return b ? { value: d } : d;
          };}
    }, "unary+": function unary(a, b) {
      return function (d, c, e, f) {
        d = a(d, c, e, f);d = u(d) ? +d : 0;return b ? { value: d } : d;
      };
    }, "unary-": function unary(a, b) {
      return function (d, c, e, f) {
        d = a(d, c, e, f);d = u(d) ? -d : -0;return b ? { value: d } : d;
      };
    }, "unary!": function unary(a, b) {
      return function (d, c, e, f) {
        d = !a(d, c, e, f);return b ? { value: d } : d;
      };
    }, "binary+": function binary(a, b, d) {
      return function (c, e, f, g) {
        var h = a(c, e, f, g);c = b(c, e, f, g);h = Dd(h, c);return d ? { value: h } : h;
      };
    }, "binary-": function binary(a, b, d) {
      return function (c, e, f, g) {
        var h = a(c, e, f, g);c = b(c, e, f, g);h = (u(h) ? h : 0) - (u(c) ? c : 0);return d ? { value: h } : h;
      };
    }, "binary*": function binary(a, b, d) {
      return function (c, e, f, g) {
        c = a(c, e, f, g) * b(c, e, f, g);
        return d ? { value: c } : c;
      };
    }, "binary/": function binary(a, b, d) {
      return function (c, e, f, g) {
        c = a(c, e, f, g) / b(c, e, f, g);return d ? { value: c } : c;
      };
    }, "binary%": function binary(a, b, d) {
      return function (c, e, f, g) {
        c = a(c, e, f, g) % b(c, e, f, g);return d ? { value: c } : c;
      };
    }, "binary===": function binary(a, b, d) {
      return function (c, e, f, g) {
        c = a(c, e, f, g) === b(c, e, f, g);return d ? { value: c } : c;
      };
    }, "binary!==": function binary(a, b, d) {
      return function (c, e, f, g) {
        c = a(c, e, f, g) !== b(c, e, f, g);return d ? { value: c } : c;
      };
    }, "binary==": function binary(a, b, d) {
      return function (c, e, f, g) {
        c = a(c, e, f, g) == b(c, e, f, g);return d ? { value: c } : c;
      };
    }, "binary!=": function binary(a, b, d) {
      return function (c, e, f, g) {
        c = a(c, e, f, g) != b(c, e, f, g);return d ? { value: c } : c;
      };
    }, "binary<": function binary(a, b, d) {
      return function (c, e, f, g) {
        c = a(c, e, f, g) < b(c, e, f, g);return d ? { value: c } : c;
      };
    }, "binary>": function binary(a, b, d) {
      return function (c, e, f, g) {
        c = a(c, e, f, g) > b(c, e, f, g);return d ? { value: c } : c;
      };
    }, "binary<=": function binary(a, b, d) {
      return function (c, e, f, g) {
        c = a(c, e, f, g) <= b(c, e, f, g);return d ? { value: c } : c;
      };
    }, "binary>=": function binary(a, b, d) {
      return function (c, e, f, g) {
        c = a(c, e, f, g) >= b(c, e, f, g);return d ? { value: c } : c;
      };
    }, "binary&&": function binary(a, b, d) {
      return function (c, e, f, g) {
        c = a(c, e, f, g) && b(c, e, f, g);return d ? { value: c } : c;
      };
    }, "binary||": function binary(a, b, d) {
      return function (c, e, f, g) {
        c = a(c, e, f, g) || b(c, e, f, g);return d ? { value: c } : c;
      };
    }, "ternary?:": function ternary(a, b, d, c) {
      return function (e, f, g, h) {
        e = a(e, f, g, h) ? b(e, f, g, h) : d(e, f, g, h);return c ? { value: e } : e;
      };
    }, value: function value(a, b) {
      return function () {
        return b ? { context: void 0, name: void 0, value: a } : a;
      };
    }, identifier: function identifier(a, b, d) {
      return function (c, e, f, g) {
        c = e && a in e ? e : c;d && 1 !== d && c && null == c[a] && (c[a] = {});e = c ? c[a] : void 0;return b ? { context: c, name: a, value: e } : e;
      };
    }, computedMember: function computedMember(a, b, d, c) {
      return function (e, f, g, h) {
        var k = a(e, f, g, h),
            l,
            m;null != k && (l = b(e, f, g, h), l += "", c && 1 !== c && k && !k[l] && (k[l] = {}), m = k[l]);return d ? { context: k, name: l, value: m } : m;
      };
    }, nonComputedMember: function nonComputedMember(a, b, d, c) {
      return function (e, f, g, h) {
        e = a(e, f, g, h);c && 1 !== c && e && null == e[b] && (e[b] = {});f = null != e ? e[b] : void 0;return d ? { context: e, name: b, value: f } : f;
      };
    }, inputs: function inputs(a, b) {
      return function (d, c, e, f) {
        return f ? f[b] : a(d, c, e);
      };
    } };uc.prototype = { constructor: uc, parse: function parse(a) {
      a = this.ast.ast(a);var b = this.astCompiler.compile(a);b.literal = 0 === a.body.length || 1 === a.body.length && (a.body[0].expression.type === s.Literal || a.body[0].expression.type === s.ArrayExpression || a.body[0].expression.type === s.ObjectExpression);b.constant = a.constant;return b;
    } };var ta = L("$sce"),
      oa = { HTML: "html", CSS: "css", URL: "url", RESOURCE_URL: "resourceUrl", JS: "js" },
      xc = /_([a-z])/g,
      Dg = L("$compile"),
      aa = x.document.createElement("a"),
      Md = Ca(x.location.href);Nd.$inject = ["$document"];
  cd.$inject = ["$provide"];var Ud = 22,
      Td = ".",
      zc = "0";Od.$inject = ["$locale"];Qd.$inject = ["$locale"];var Og = { yyyy: Y("FullYear", 4, 0, !1, !0), yy: Y("FullYear", 2, 0, !0, !0), y: Y("FullYear", 1, 0, !1, !0), MMMM: mb("Month"), MMM: mb("Month", !0), MM: Y("Month", 2, 1), M: Y("Month", 1, 1), LLLL: mb("Month", !1, !0), dd: Y("Date", 2), d: Y("Date", 1), HH: Y("Hours", 2), H: Y("Hours", 1), hh: Y("Hours", 2, -12), h: Y("Hours", 1, -12), mm: Y("Minutes", 2), m: Y("Minutes", 1), ss: Y("Seconds", 2), s: Y("Seconds", 1), sss: Y("Milliseconds", 3), EEEE: mb("Day"), EEE: mb("Day", !0),
    a: function a(_a, b) {
      return 12 > _a.getHours() ? b.AMPMS[0] : b.AMPMS[1];
    }, Z: function Z(a, b, d) {
      a = -1 * d;return a = (0 <= a ? "+" : "") + (Kb(Math[0 < a ? "floor" : "ceil"](a / 60), 2) + Kb(Math.abs(a % 60), 2));
    }, ww: Wd(2), w: Wd(1), G: Ac, GG: Ac, GGG: Ac, GGGG: function GGGG(a, b) {
      return 0 >= a.getFullYear() ? b.ERANAMES[0] : b.ERANAMES[1];
    } },
      Ng = /((?:[^yMLdHhmsaZEwG']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|L+|d+|H+|h+|m+|s+|a|Z|G+|w+))([\s\S]*)/,
      Mg = /^-?\d+$/;Pd.$inject = ["$locale"];var Hg = la(Q),
      Ig = la(ub);Rd.$inject = ["$parse"];var Fe = la({ restrict: "E", compile: function compile(a, b) {
      if (!b.href && !b.xlinkHref) return function (a, b) {
        if ("a" === b[0].nodeName.toLowerCase()) {
          var e = "[object SVGAnimatedString]" === ma.call(b.prop("href")) ? "xlink:href" : "href";b.on("click", function (a) {
            b.attr(e) || a.preventDefault();
          });
        }
      };
    } }),
      vb = {};q(Fb, function (a, b) {
    function d(a, d, e) {
      a.$watch(e[c], function (a) {
        e.$set(b, !!a);
      });
    }if ("multiple" !== a) {
      var c = Ba("ng-" + b),
          e = d;"checked" === a && (e = function e(a, b, _e) {
        _e.ngModel !== _e[c] && d(a, b, _e);
      });vb[c] = function () {
        return { restrict: "A", priority: 100, link: e };
      };
    }
  });q(rd, function (a, b) {
    vb[b] = function () {
      return { priority: 100, link: function link(a, c, e) {
          if ("ngPattern" === b && "/" === e.ngPattern.charAt(0) && (c = e.ngPattern.match(Sg))) {
            e.$set("ngPattern", new RegExp(c[1], c[2]));return;
          }a.$watch(e[b], function (a) {
            e.$set(b, a);
          });
        } };
    };
  });q(["src", "srcset", "href"], function (a) {
    var b = Ba("ng-" + a);vb[b] = function () {
      return { priority: 99, link: function link(d, c, e) {
          var f = a,
              g = a;"href" === a && "[object SVGAnimatedString]" === ma.call(c.prop("href")) && (g = "xlinkHref", e.$attr[g] = "xlink:href", f = null);e.$observe(b, function (b) {
            b ? (e.$set(g, b), za && f && c.prop(f, e[g])) : "href" === a && e.$set(g, null);
          });
        } };
    };
  });var Mb = { $addControl: z, $$renameControl: function $$renameControl(a, b) {
      a.$name = b;
    }, $removeControl: z, $setValidity: z, $setDirty: z, $setPristine: z, $setSubmitted: z };Lb.$inject = ["$element", "$attrs", "$scope", "$animate", "$interpolate"];Lb.prototype = { $rollbackViewValue: function $rollbackViewValue() {
      q(this.$$controls, function (a) {
        a.$rollbackViewValue();
      });
    }, $commitViewValue: function $commitViewValue() {
      q(this.$$controls, function (a) {
        a.$commitViewValue();
      });
    }, $addControl: function $addControl(a) {
      Ka(a.$name, "input");this.$$controls.push(a);
      a.$name && (this[a.$name] = a);a.$$parentForm = this;
    }, $$renameControl: function $$renameControl(a, b) {
      var d = a.$name;this[d] === a && delete this[d];this[b] = a;a.$name = b;
    }, $removeControl: function $removeControl(a) {
      a.$name && this[a.$name] === a && delete this[a.$name];q(this.$pending, function (b, d) {
        this.$setValidity(d, null, a);
      }, this);q(this.$error, function (b, d) {
        this.$setValidity(d, null, a);
      }, this);q(this.$$success, function (b, d) {
        this.$setValidity(d, null, a);
      }, this);$a(this.$$controls, a);a.$$parentForm = Mb;
    }, $setDirty: function $setDirty() {
      this.$$animate.removeClass(this.$$element, Va);this.$$animate.addClass(this.$$element, Rb);this.$dirty = !0;this.$pristine = !1;this.$$parentForm.$setDirty();
    }, $setPristine: function $setPristine() {
      this.$$animate.setClass(this.$$element, Va, Rb + " ng-submitted");this.$dirty = !1;this.$pristine = !0;this.$submitted = !1;q(this.$$controls, function (a) {
        a.$setPristine();
      });
    }, $setUntouched: function $setUntouched() {
      q(this.$$controls, function (a) {
        a.$setUntouched();
      });
    }, $setSubmitted: function $setSubmitted() {
      this.$$animate.addClass(this.$$element, "ng-submitted");this.$submitted = !0;this.$$parentForm.$setSubmitted();
    } };
  Zd({ clazz: Lb, set: function set(a, b, d) {
      var c = a[b];c ? -1 === c.indexOf(d) && c.push(d) : a[b] = [d];
    }, unset: function unset(a, b, d) {
      var c = a[b];c && ($a(c, d), 0 === c.length && delete a[b]);
    } });var ge = function ge(a) {
    return ["$timeout", "$parse", function (b, d) {
      function c(a) {
        return "" === a ? d('this[""]').assign : d(a).assign || z;
      }return { name: "form", restrict: a ? "EAC" : "E", require: ["form", "^^?form"], controller: Lb, compile: function compile(d, f) {
          d.addClass(Va).addClass(nb);var g = f.name ? "name" : a && f.ngForm ? "ngForm" : !1;return { pre: function pre(a, d, e, f) {
              var n = f[0];if (!("action" in e)) {
                var p = function p(b) {
                  a.$apply(function () {
                    n.$commitViewValue();n.$setSubmitted();
                  });b.preventDefault();
                };d[0].addEventListener("submit", p);d.on("$destroy", function () {
                  b(function () {
                    d[0].removeEventListener("submit", p);
                  }, 0, !1);
                });
              }(f[1] || n.$$parentForm).$addControl(n);var r = g ? c(n.$name) : z;g && (r(a, n), e.$observe(g, function (b) {
                n.$name !== b && (r(a, void 0), n.$$parentForm.$$renameControl(n, b), r = c(n.$name), r(a, n));
              }));d.on("$destroy", function () {
                n.$$parentForm.$removeControl(n);r(a, void 0);S(n, Mb);
              });
            } };
        } };
    }];
  },
      Ge = ge(),
      Se = ge(!0),
      Pg = /^\d{4,}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+(?:[+-][0-2]\d:[0-5]\d|Z)$/,
      ah = /^[a-z][a-z\d.+-]*:\/*(?:[^:@]+(?::[^@]+)?@)?(?:[^\s:/?#]+|\[[a-f\d:]+])(?::\d+)?(?:\/[^?#]*)?(?:\?[^#]*)?(?:#.*)?$/i,
      bh = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/,
      Qg = /^\s*(-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/,
      he = /^(\d{4,})-(\d{2})-(\d{2})$/,
      ie = /^(\d{4,})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,
      Hc = /^(\d{4,})-W(\d\d)$/,
      je = /^(\d{4,})-(\d\d)$/,
      ke = /^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,
      ae = V();q(["date", "datetime-local", "month", "time", "week"], function (a) {
    ae[a] = !0;
  });var le = { text: function text(a, b, d, c, e, f) {
      Ra(a, b, d, c, e, f);Cc(c);
    }, date: ob("date", he, Nb(he, ["yyyy", "MM", "dd"]), "yyyy-MM-dd"), "datetime-local": ob("datetimelocal", ie, Nb(ie, "yyyy MM dd HH mm ss sss".split(" ")), "yyyy-MM-ddTHH:mm:ss.sss"), time: ob("time", ke, Nb(ke, ["HH", "mm", "ss", "sss"]), "HH:mm:ss.sss"), week: ob("week", Hc, function (a, b) {
      if (ga(a)) return a;
      if (F(a)) {
        Hc.lastIndex = 0;var d = Hc.exec(a);if (d) {
          var c = +d[1],
              e = +d[2],
              f = d = 0,
              g = 0,
              h = 0,
              k = Vd(c),
              e = 7 * (e - 1);b && (d = b.getHours(), f = b.getMinutes(), g = b.getSeconds(), h = b.getMilliseconds());return new Date(c, 0, k.getDate() + e, d, f, g, h);
        }
      }return NaN;
    }, "yyyy-Www"), month: ob("month", je, Nb(je, ["yyyy", "MM"]), "yyyy-MM"), number: function number(a, b, d, c, e, f) {
      Dc(a, b, d, c);be(c);Ra(a, b, d, c, e, f);var g, h;if (u(d.min) || d.ngMin) c.$validators.min = function (a) {
        return c.$isEmpty(a) || w(g) || a >= g;
      }, d.$observe("min", function (a) {
        g = Sa(a);c.$validate();
      });
      if (u(d.max) || d.ngMax) c.$validators.max = function (a) {
        return c.$isEmpty(a) || w(h) || a <= h;
      }, d.$observe("max", function (a) {
        h = Sa(a);c.$validate();
      });if (u(d.step) || d.ngStep) {
        var k;c.$validators.step = function (a, b) {
          return c.$isEmpty(b) || w(k) || ce(b, g || 0, k);
        };d.$observe("step", function (a) {
          k = Sa(a);c.$validate();
        });
      }
    }, url: function url(a, b, d, c, e, f) {
      Ra(a, b, d, c, e, f);Cc(c);c.$$parserName = "url";c.$validators.url = function (a, b) {
        var d = a || b;return c.$isEmpty(d) || ah.test(d);
      };
    }, email: function email(a, b, d, c, e, f) {
      Ra(a, b, d, c, e, f);Cc(c);c.$$parserName = "email";c.$validators.email = function (a, b) {
        var d = a || b;return c.$isEmpty(d) || bh.test(d);
      };
    }, radio: function radio(a, b, d, c) {
      var e = !d.ngTrim || "false" !== T(d.ngTrim);w(d.name) && b.attr("name", ++qb);b.on("click", function (a) {
        var g;b[0].checked && (g = d.value, e && (g = T(g)), c.$setViewValue(g, a && a.type));
      });c.$render = function () {
        var a = d.value;e && (a = T(a));b[0].checked = a === c.$viewValue;
      };d.$observe("value", c.$render);
    }, range: function range(a, b, d, c, e, f) {
      function g(a, c) {
        b.attr(a, d[a]);d.$observe(a, c);
      }function h(a) {
        n = Sa(a);da(c.$modelValue) || (m ? (a = b.val(), n > a && (a = n, b.val(a)), c.$setViewValue(a)) : c.$validate());
      }function k(a) {
        p = Sa(a);da(c.$modelValue) || (m ? (a = b.val(), p < a && (b.val(p), a = p < n ? n : p), c.$setViewValue(a)) : c.$validate());
      }function l(a) {
        r = Sa(a);da(c.$modelValue) || (m && c.$viewValue !== b.val() ? c.$setViewValue(b.val()) : c.$validate());
      }Dc(a, b, d, c);be(c);Ra(a, b, d, c, e, f);var m = c.$$hasNativeValidators && "range" === b[0].type,
          n = m ? 0 : void 0,
          p = m ? 100 : void 0,
          r = m ? 1 : void 0,
          q = b[0].validity;a = u(d.min);e = u(d.max);f = u(d.step);var s = c.$render;c.$render = m && u(q.rangeUnderflow) && u(q.rangeOverflow) ? function () {
        s();c.$setViewValue(b.val());
      } : s;a && (c.$validators.min = m ? function () {
        return !0;
      } : function (a, b) {
        return c.$isEmpty(b) || w(n) || b >= n;
      }, g("min", h));e && (c.$validators.max = m ? function () {
        return !0;
      } : function (a, b) {
        return c.$isEmpty(b) || w(p) || b <= p;
      }, g("max", k));f && (c.$validators.step = m ? function () {
        return !q.stepMismatch;
      } : function (a, b) {
        return c.$isEmpty(b) || w(r) || ce(b, n || 0, r);
      }, g("step", l));
    }, checkbox: function checkbox(a, b, d, c, e, f, g, h) {
      var k = de(h, a, "ngTrueValue", d.ngTrueValue, !0),
          l = de(h, a, "ngFalseValue", d.ngFalseValue, !1);b.on("click", function (a) {
        c.$setViewValue(b[0].checked, a && a.type);
      });c.$render = function () {
        b[0].checked = c.$viewValue;
      };c.$isEmpty = function (a) {
        return !1 === a;
      };c.$formatters.push(function (a) {
        return sa(a, k);
      });c.$parsers.push(function (a) {
        return a ? k : l;
      });
    }, hidden: z, button: z, submit: z, reset: z, file: z },
      Xc = ["$browser", "$sniffer", "$filter", "$parse", function (a, b, d, c) {
    return { restrict: "E", require: ["?ngModel"], link: { pre: function pre(e, f, g, h) {
          h[0] && (le[Q(g.type)] || le.text)(e, f, g, h[0], b, a, d, c);
        } } };
  }],
      ch = /^(true|false|\d+)$/,
      kf = function kf() {
    function a(a, d, c) {
      var e = u(c) ? c : 9 === za ? "" : null;a.prop("value", e);d.$set("value", c);
    }return { restrict: "A", priority: 100, compile: function compile(b, d) {
        return ch.test(d.ngValue) ? function (b, d, f) {
          b = b.$eval(f.ngValue);a(d, f, b);
        } : function (b, d, f) {
          b.$watch(f.ngValue, function (b) {
            a(d, f, b);
          });
        };
      } };
  },
      Ke = ["$compile", function (a) {
    return { restrict: "AC", compile: function compile(b) {
        a.$$addBindingClass(b);return function (b, c, e) {
          a.$$addBindingInfo(c, e.ngBind);c = c[0];b.$watch(e.ngBind, function (a) {
            c.textContent = $b(a);
          });
        };
      } };
  }],
      Me = ["$interpolate", "$compile", function (a, b) {
    return { compile: function compile(d) {
        b.$$addBindingClass(d);return function (c, d, f) {
          c = a(d.attr(f.$attr.ngBindTemplate));b.$$addBindingInfo(d, c.expressions);d = d[0];f.$observe("ngBindTemplate", function (a) {
            d.textContent = w(a) ? "" : a;
          });
        };
      } };
  }],
      Le = ["$sce", "$parse", "$compile", function (a, b, d) {
    return { restrict: "A", compile: function compile(c, e) {
        var f = b(e.ngBindHtml),
            g = b(e.ngBindHtml, function (b) {
          return a.valueOf(b);
        });d.$$addBindingClass(c);return function (b, c, e) {
          d.$$addBindingInfo(c, e.ngBindHtml);b.$watch(g, function () {
            var d = f(b);c.html(a.getTrustedHtml(d) || "");
          });
        };
      } };
  }],
      jf = la({ restrict: "A", require: "ngModel", link: function link(a, b, d, c) {
      c.$viewChangeListeners.push(function () {
        a.$eval(d.ngChange);
      });
    } }),
      Ne = Fc("", !0),
      Pe = Fc("Odd", 0),
      Oe = Fc("Even", 1),
      Qe = Qa({ compile: function compile(a, b) {
      b.$set("ngCloak", void 0);a.removeClass("ng-cloak");
    } }),
      Re = [function () {
    return { restrict: "A", scope: !0, controller: "@", priority: 500 };
  }],
      bd = {},
      dh = { blur: !0, focus: !0 };q("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "), function (a) {
    var b = Ba("ng-" + a);bd[b] = ["$parse", "$rootScope", function (d, c) {
      return { restrict: "A", compile: function compile(e, f) {
          var g = d(f[b]);return function (b, d) {
            d.on(a, function (d) {
              var e = function e() {
                g(b, { $event: d });
              };dh[a] && c.$$phase ? b.$evalAsync(e) : b.$apply(e);
            });
          };
        } };
    }];
  });var Ue = ["$animate", "$compile", function (a, b) {
    return { multiElement: !0, transclude: "element", priority: 600, terminal: !0, restrict: "A", $$tlb: !0, link: function link(d, c, e, f, g) {
        var h, k, l;d.$watch(e.ngIf, function (d) {
          d ? k || g(function (d, f) {
            k = f;d[d.length++] = b.$$createComment("end ngIf", e.ngIf);h = { clone: d };a.enter(d, c.parent(), c);
          }) : (l && (l.remove(), l = null), k && (k.$destroy(), k = null), h && (l = tb(h.clone), a.leave(l).done(function (a) {
            !1 !== a && (l = null);
          }), h = null));
        });
      } };
  }],
      Ve = ["$templateRequest", "$anchorScroll", "$animate", function (a, b, d) {
    return { restrict: "ECA", priority: 400, terminal: !0, transclude: "element", controller: ea.noop, compile: function compile(c, e) {
        var f = e.ngInclude || e.src,
            g = e.onload || "",
            h = e.autoscroll;return function (c, e, m, n, p) {
          var r = 0,
              q,
              s,
              t,
              w = function w() {
            s && (s.remove(), s = null);q && (q.$destroy(), q = null);t && (d.leave(t).done(function (a) {
              !1 !== a && (s = null);
            }), s = t, t = null);
          };c.$watch(f, function (f) {
            var m = function m(a) {
              !1 === a || !u(h) || h && !c.$eval(h) || b();
            },
                s = ++r;f ? (a(f, !0).then(function (a) {
              if (!c.$$destroyed && s === r) {
                var b = c.$new();n.template = a;a = p(b, function (a) {
                  w();d.enter(a, null, e).done(m);
                });q = b;t = a;q.$emit("$includeContentLoaded", f);c.$eval(g);
              }
            }, function () {
              c.$$destroyed || s !== r || (w(), c.$emit("$includeContentError", f));
            }), c.$emit("$includeContentRequested", f)) : (w(), n.template = null);
          });
        };
      } };
  }],
      mf = ["$compile", function (a) {
    return { restrict: "ECA",
      priority: -400, require: "ngInclude", link: function link(b, d, c, e) {
        ma.call(d[0]).match(/SVG/) ? (d.empty(), a(dd(e.template, x.document).childNodes)(b, function (a) {
          d.append(a);
        }, { futureParentElement: d })) : (d.html(e.template), a(d.contents())(b));
      } };
  }],
      We = Qa({ priority: 450, compile: function compile() {
      return { pre: function pre(a, b, d) {
          a.$eval(d.ngInit);
        } };
    } }),
      hf = function hf() {
    return { restrict: "A", priority: 100, require: "ngModel", link: function link(a, b, d, c) {
        var e = d.ngList || ", ",
            f = "false" !== d.ngTrim,
            g = f ? T(e) : e;c.$parsers.push(function (a) {
          if (!w(a)) {
            var b = [];a && q(a.split(g), function (a) {
              a && b.push(f ? T(a) : a);
            });return b;
          }
        });c.$formatters.push(function (a) {
          if (H(a)) return a.join(e);
        });c.$isEmpty = function (a) {
          return !a || !a.length;
        };
      } };
  },
      nb = "ng-valid",
      Yd = "ng-invalid",
      Va = "ng-pristine",
      Rb = "ng-dirty",
      pb = L("ngModel");Ob.$inject = "$scope $exceptionHandler $attrs $element $parse $animate $timeout $q $interpolate".split(" ");Ob.prototype = { $$initGetterSetters: function $$initGetterSetters() {
      if (this.$options.getOption("getterSetter")) {
        var a = this.$$parse(this.$$attr.ngModel + "()"),
            b = this.$$parse(this.$$attr.ngModel + "($$$p)");this.$$ngModelGet = function (b) {
          var c = this.$$parsedNgModel(b);D(c) && (c = a(b));return c;
        };this.$$ngModelSet = function (a, c) {
          D(this.$$parsedNgModel(a)) ? b(a, { $$$p: c }) : this.$$parsedNgModelAssign(a, c);
        };
      } else if (!this.$$parsedNgModel.assign) throw pb("nonassign", this.$$attr.ngModel, xa(this.$$element));
    }, $render: z, $isEmpty: function $isEmpty(a) {
      return w(a) || "" === a || null === a || a !== a;
    }, $$updateEmptyClasses: function $$updateEmptyClasses(a) {
      this.$isEmpty(a) ? (this.$$animate.removeClass(this.$$element, "ng-not-empty"), this.$$animate.addClass(this.$$element, "ng-empty")) : (this.$$animate.removeClass(this.$$element, "ng-empty"), this.$$animate.addClass(this.$$element, "ng-not-empty"));
    }, $setPristine: function $setPristine() {
      this.$dirty = !1;this.$pristine = !0;this.$$animate.removeClass(this.$$element, Rb);this.$$animate.addClass(this.$$element, Va);
    }, $setDirty: function $setDirty() {
      this.$dirty = !0;this.$pristine = !1;this.$$animate.removeClass(this.$$element, Va);this.$$animate.addClass(this.$$element, Rb);this.$$parentForm.$setDirty();
    }, $setUntouched: function $setUntouched() {
      this.$touched = !1;this.$untouched = !0;this.$$animate.setClass(this.$$element, "ng-untouched", "ng-touched");
    }, $setTouched: function $setTouched() {
      this.$touched = !0;this.$untouched = !1;this.$$animate.setClass(this.$$element, "ng-touched", "ng-untouched");
    }, $rollbackViewValue: function $rollbackViewValue() {
      this.$$timeout.cancel(this.$$pendingDebounce);this.$viewValue = this.$$lastCommittedViewValue;this.$render();
    }, $validate: function $validate() {
      if (!da(this.$modelValue)) {
        var a = this.$$lastCommittedViewValue,
            b = this.$$rawModelValue,
            d = this.$valid,
            c = this.$modelValue,
            e = this.$options.getOption("allowInvalid"),
            f = this;this.$$runValidators(b, a, function (a) {
          e || d === a || (f.$modelValue = a ? b : void 0, f.$modelValue !== c && f.$$writeModelToScope());
        });
      }
    }, $$runValidators: function $$runValidators(a, b, d) {
      function c() {
        var c = !0;q(k.$validators, function (d, e) {
          var g = Boolean(d(a, b));c = c && g;f(e, g);
        });return c ? !0 : (q(k.$asyncValidators, function (a, b) {
          f(b, null);
        }), !1);
      }function e() {
        var c = [],
            d = !0;q(k.$asyncValidators, function (e, g) {
          var k = e(a, b);if (!k || !D(k.then)) throw pb("nopromise", k);f(g, void 0);c.push(k.then(function () {
            f(g, !0);
          }, function () {
            d = !1;f(g, !1);
          }));
        });
        c.length ? k.$$q.all(c).then(function () {
          g(d);
        }, z) : g(!0);
      }function f(a, b) {
        h === k.$$currentValidationRunId && k.$setValidity(a, b);
      }function g(a) {
        h === k.$$currentValidationRunId && d(a);
      }this.$$currentValidationRunId++;var h = this.$$currentValidationRunId,
          k = this;(function () {
        var a = k.$$parserName || "parse";if (w(k.$$parserValid)) f(a, null);else return k.$$parserValid || (q(k.$validators, function (a, b) {
          f(b, null);
        }), q(k.$asyncValidators, function (a, b) {
          f(b, null);
        })), f(a, k.$$parserValid), k.$$parserValid;return !0;
      })() ? c() ? e() : g(!1) : g(!1);
    }, $commitViewValue: function $commitViewValue() {
      var a = this.$viewValue;this.$$timeout.cancel(this.$$pendingDebounce);if (this.$$lastCommittedViewValue !== a || "" === a && this.$$hasNativeValidators) this.$$updateEmptyClasses(a), this.$$lastCommittedViewValue = a, this.$pristine && this.$setDirty(), this.$$parseAndValidate();
    }, $$parseAndValidate: function $$parseAndValidate() {
      var a = this.$$lastCommittedViewValue,
          b = this;if (this.$$parserValid = w(a) ? void 0 : !0) for (var d = 0; d < this.$parsers.length; d++) {
        if (a = this.$parsers[d](a), w(a)) {
          this.$$parserValid = !1;break;
        }
      }da(this.$modelValue) && (this.$modelValue = this.$$ngModelGet(this.$$scope));var c = this.$modelValue,
          e = this.$options.getOption("allowInvalid");this.$$rawModelValue = a;e && (this.$modelValue = a, b.$modelValue !== c && b.$$writeModelToScope());this.$$runValidators(a, this.$$lastCommittedViewValue, function (d) {
        e || (b.$modelValue = d ? a : void 0, b.$modelValue !== c && b.$$writeModelToScope());
      });
    }, $$writeModelToScope: function $$writeModelToScope() {
      this.$$ngModelSet(this.$$scope, this.$modelValue);q(this.$viewChangeListeners, function (a) {
        try {
          a();
        } catch (b) {
          this.$$exceptionHandler(b);
        }
      }, this);
    }, $setViewValue: function $setViewValue(a, b) {
      this.$viewValue = a;this.$options.getOption("updateOnDefault") && this.$$debounceViewValueCommit(b);
    }, $$debounceViewValueCommit: function $$debounceViewValueCommit(a) {
      var b = this.$options.getOption("debounce");ba(b[a]) ? b = b[a] : ba(b["default"]) && (b = b["default"]);this.$$timeout.cancel(this.$$pendingDebounce);var d = this;0 < b ? this.$$pendingDebounce = this.$$timeout(function () {
        d.$commitViewValue();
      }, b) : this.$$scope.$root.$$phase ? this.$commitViewValue() : this.$$scope.$apply(function () {
        d.$commitViewValue();
      });
    },
    $overrideModelOptions: function $overrideModelOptions(a) {
      this.$options = this.$options.createChild(a);
    } };Zd({ clazz: Ob, set: function set(a, b) {
      a[b] = !0;
    }, unset: function unset(a, b) {
      delete a[b];
    } });var gf = ["$rootScope", function (a) {
    return { restrict: "A", require: ["ngModel", "^?form", "^?ngModelOptions"], controller: Ob, priority: 1, compile: function compile(b) {
        b.addClass(Va).addClass("ng-untouched").addClass(nb);return { pre: function pre(a, b, e, f) {
            var g = f[0];b = f[1] || g.$$parentForm;if (f = f[2]) g.$options = f.$options;g.$$initGetterSetters();b.$addControl(g);e.$observe("name", function (a) {
              g.$name !== a && g.$$parentForm.$$renameControl(g, a);
            });a.$on("$destroy", function () {
              g.$$parentForm.$removeControl(g);
            });
          }, post: function post(b, c, e, f) {
            function g() {
              h.$setTouched();
            }var h = f[0];if (h.$options.getOption("updateOn")) c.on(h.$options.getOption("updateOn"), function (a) {
              h.$$debounceViewValueCommit(a && a.type);
            });c.on("blur", function () {
              h.$touched || (a.$$phase ? b.$evalAsync(g) : b.$apply(g));
            });
          } };
      } };
  }],
      Pb,
      eh = /(\s+|^)default(\s+|$)/;Gc.prototype = { getOption: function getOption(a) {
      return this.$$options[a];
    }, createChild: function createChild(a) {
      var b = !1;a = S({}, a);q(a, function (d, c) {
        "$inherit" === d ? "*" === c ? b = !0 : (a[c] = this.$$options[c], "updateOn" === c && (a.updateOnDefault = this.$$options.updateOnDefault)) : "updateOn" === c && (a.updateOnDefault = !1, a[c] = T(d.replace(eh, function () {
          a.updateOnDefault = !0;return " ";
        })));
      }, this);b && (delete a["*"], ee(a, this.$$options));ee(a, Pb.$$options);return new Gc(a);
    } };Pb = new Gc({ updateOn: "", updateOnDefault: !0, debounce: 0, getterSetter: !1, allowInvalid: !1, timezone: null });var lf = function lf() {
    function a(a, d) {
      this.$$attrs = a;this.$$scope = d;
    }a.$inject = ["$attrs", "$scope"];a.prototype = { $onInit: function $onInit() {
        var a = this.parentCtrl ? this.parentCtrl.$options : Pb,
            d = this.$$scope.$eval(this.$$attrs.ngModelOptions);this.$options = a.createChild(d);
      } };return { restrict: "A", priority: 10, require: { parentCtrl: "?^^ngModelOptions" }, bindToController: !0, controller: a };
  },
      Xe = Qa({ terminal: !0, priority: 1E3 }),
      fh = L("ngOptions"),
      gh = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?(?:\s+disable\s+when\s+([\s\S]+?))?\s+for\s+(?:([$\w][$\w]*)|(?:\(\s*([$\w][$\w]*)\s*,\s*([$\w][$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,
      ef = ["$compile", "$document", "$parse", function (a, b, d) {
    function c(a, b, c) {
      function e(a, b, c, d, f) {
        this.selectValue = a;this.viewValue = b;this.label = c;this.group = d;this.disabled = f;
      }function f(a) {
        var b;if (!q && qa(a)) b = a;else {
          b = [];for (var c in a) {
            a.hasOwnProperty(c) && "$" !== c.charAt(0) && b.push(c);
          }
        }return b;
      }var n = a.match(gh);if (!n) throw fh("iexp", a, xa(b));var p = n[5] || n[7],
          q = n[6];a = / as /.test(n[0]) && n[1];var s = n[9];b = d(n[2] ? n[1] : p);var v = a && d(a) || b,
          t = s && d(s),
          u = s ? function (a, b) {
        return t(c, b);
      } : function (a) {
        return Pa(a);
      },
          w = function w(a, b) {
        return u(a, G(a, b));
      },
          A = d(n[2] || n[1]),
          x = d(n[3] || ""),
          I = d(n[4] || ""),
          K = d(n[8]),
          E = {},
          G = q ? function (a, b) {
        E[q] = b;E[p] = a;return E;
      } : function (a) {
        E[p] = a;return E;
      };return { trackBy: s, getTrackByValue: w, getWatchables: d(K, function (a) {
          var b = [];a = a || [];for (var d = f(a), e = d.length, g = 0; g < e; g++) {
            var h = a === d ? g : d[g],
                l = a[h],
                h = G(l, h),
                l = u(l, h);b.push(l);if (n[2] || n[1]) l = A(c, h), b.push(l);n[4] && (h = I(c, h), b.push(h));
          }return b;
        }), getOptions: function getOptions() {
          for (var a = [], b = {}, d = K(c) || [], g = f(d), h = g.length, n = 0; n < h; n++) {
            var p = d === g ? n : g[n],
                q = G(d[p], p),
                r = v(c, q),
                p = u(r, q),
                t = A(c, q),
                E = x(c, q),
                q = I(c, q),
                r = new e(p, r, t, E, q);a.push(r);b[p] = r;
          }return { items: a, selectValueMap: b, getOptionFromViewValue: function getOptionFromViewValue(a) {
              return b[w(a)];
            }, getViewValueFromOption: function getViewValueFromOption(a) {
              return s ? ra(a.viewValue) : a.viewValue;
            } };
        } };
    }var e = x.document.createElement("option"),
        f = x.document.createElement("optgroup");return { restrict: "A", terminal: !0, require: ["select", "ngModel"], link: { pre: function pre(a, b, c, d) {
          d[0].registerOption = z;
        }, post: function post(d, h, k, l) {
          function m(a) {
            var b = (a = A.getOptionFromViewValue(a)) && a.element;b && !b.selected && (b.selected = !0);return a;
          }function n(a, b) {
            a.element = b;b.disabled = a.disabled;a.label !== b.label && (b.label = a.label, b.textContent = a.label);b.value = a.selectValue;
          }function p() {
            var a = A && r.readValue();if (A) for (var b = A.items.length - 1; 0 <= b; b--) {
              var c = A.items[b];u(c.group) ? Eb(c.element.parentNode) : Eb(c.element);
            }A = z.getOptions();var d = {};x && h.prepend(r.emptyOption);A.items.forEach(function (a) {
              var b;if (u(a.group)) {
                b = d[a.group];b || (b = f.cloneNode(!1), I.appendChild(b), b.label = null === a.group ? "null" : a.group, d[a.group] = b);var c = e.cloneNode(!1);
              } else b = I, c = e.cloneNode(!1);b.appendChild(c);n(a, c);
            });h[0].appendChild(I);s.$render();s.$isEmpty(a) || (b = r.readValue(), (z.trackBy || v ? sa(a, b) : a === b) || (s.$setViewValue(b), s.$render()));
          }var r = l[0],
              s = l[1],
              v = k.multiple;l = 0;for (var t = h.children(), w = t.length; l < w; l++) {
            if ("" === t[l].value) {
              r.hasEmptyOption = !0;r.emptyOption = t.eq(l);break;
            }
          }var x = !!r.emptyOption;B(e.cloneNode(!1)).val("?");var A,
              z = c(k.ngOptions, h, d),
              I = b[0].createDocumentFragment();r.generateUnknownOptionValue = function (a) {
            return "?";
          };v ? (r.writeValue = function (a) {
            var b = a && a.map(m) || [];A.items.forEach(function (a) {
              a.element.selected && -1 === Array.prototype.indexOf.call(b, a) && (a.element.selected = !1);
            });
          }, r.readValue = function () {
            var a = h.val() || [],
                b = [];q(a, function (a) {
              (a = A.selectValueMap[a]) && !a.disabled && b.push(A.getViewValueFromOption(a));
            });return b;
          }, z.trackBy && d.$watchCollection(function () {
            if (H(s.$viewValue)) return s.$viewValue.map(function (a) {
              return z.getTrackByValue(a);
            });
          }, function () {
            s.$render();
          })) : (r.writeValue = function (a) {
            var b = A.selectValueMap[h.val()],
                c = A.getOptionFromViewValue(a);b && b.element.removeAttribute("selected");c ? (h[0].value !== c.selectValue && (r.removeUnknownOption(), r.unselectEmptyOption(), h[0].value = c.selectValue, c.element.selected = !0), c.element.setAttribute("selected", "selected")) : x ? r.selectEmptyOption() : r.unknownOption.parent().length ? r.updateUnknownOption(a) : r.renderUnknownOption(a);
          }, r.readValue = function () {
            var a = A.selectValueMap[h.val()];return a && !a.disabled ? (r.unselectEmptyOption(), r.removeUnknownOption(), A.getViewValueFromOption(a)) : null;
          }, z.trackBy && d.$watch(function () {
            return z.getTrackByValue(s.$viewValue);
          }, function () {
            s.$render();
          }));x && (r.emptyOption.remove(), a(r.emptyOption)(d), 8 === r.emptyOption[0].nodeType ? (r.hasEmptyOption = !1, r.registerOption = function (a, b) {
            "" === b.val() && (r.hasEmptyOption = !0, r.emptyOption = b, r.emptyOption.removeClass("ng-scope"), s.$render(), b.on("$destroy", function () {
              r.hasEmptyOption = !1;r.emptyOption = void 0;
            }));
          }) : r.emptyOption.removeClass("ng-scope"));h.empty();p();d.$watchCollection(z.getWatchables, p);
        } } };
  }],
      Ye = ["$locale", "$interpolate", "$log", function (a, b, d) {
    var c = /{}/g,
        e = /^when(Minus)?(.+)$/;return { link: function link(f, g, h) {
        function k(a) {
          g.text(a || "");
        }var l = h.count,
            m = h.$attr.when && g.attr(h.$attr.when),
            n = h.offset || 0,
            p = f.$eval(m) || {},
            r = {},
            s = b.startSymbol(),
            v = b.endSymbol(),
            t = s + l + "-" + n + v,
            u = ea.noop,
            x;q(h, function (a, b) {
          var c = e.exec(b);c && (c = (c[1] ? "-" : "") + Q(c[2]), p[c] = g.attr(h.$attr[b]));
        });q(p, function (a, d) {
          r[d] = b(a.replace(c, t));
        });f.$watch(l, function (b) {
          var c = parseFloat(b),
              e = da(c);e || c in p || (c = a.pluralCat(c - n));c === x || e && da(x) || (u(), e = r[c], w(e) ? (null != b && d.debug("ngPluralize: no rule defined for '" + c + "' in " + m), u = z, k()) : u = f.$watch(e, k), x = c);
        });
      } };
  }],
      Ze = ["$parse", "$animate", "$compile", function (a, b, d) {
    var c = L("ngRepeat"),
        e = function e(a, b, c, d, _e2, m, n) {
      a[c] = d;_e2 && (a[_e2] = m);a.$index = b;a.$first = 0 === b;a.$last = b === n - 1;a.$middle = !(a.$first || a.$last);a.$odd = !(a.$even = 0 === (b & 1));
    };return { restrict: "A", multiElement: !0, transclude: "element", priority: 1E3, terminal: !0, $$tlb: !0, compile: function compile(f, g) {
        var h = g.ngRepeat,
            k = d.$$createComment("end ngRepeat", h),
            l = h.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);if (!l) throw c("iexp", h);var m = l[1],
            n = l[2],
            p = l[3],
            r = l[4],
            l = m.match(/^(?:(\s*[$\w]+)|\(\s*([$\w]+)\s*,\s*([$\w]+)\s*\))$/);if (!l) throw c("iidexp", m);var s = l[3] || l[1],
            v = l[2];if (p && (!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(p) || /^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent|\$root|\$id)$/.test(p))) throw c("badident", p);var t,
            u,
            w,
            x,
            z = { $id: Pa };r ? t = a(r) : (w = function w(a, b) {
          return Pa(b);
        }, x = function x(a) {
          return a;
        });return function (a, d, f, g, l) {
          t && (u = function u(b, c, d) {
            v && (z[v] = b);z[s] = c;z.$index = d;return t(a, z);
          });var m = V();a.$watchCollection(n, function (f) {
            var g,
                n,
                r = d[0],
                t,
                z = V(),
                B,
                D,
                F,
                C,
                G,
                E,
                H;p && (a[p] = f);if (qa(f)) G = f, n = u || w;else for (H in n = u || x, G = [], f) {
              ua.call(f, H) && "$" !== H.charAt(0) && G.push(H);
            }B = G.length;H = Array(B);for (g = 0; g < B; g++) {
              if (D = f === G ? g : G[g], F = f[D], C = n(D, F, g), m[C]) E = m[C], delete m[C], z[C] = E, H[g] = E;else {
                if (z[C]) throw q(H, function (a) {
                  a && a.scope && (m[a.id] = a);
                }), c("dupes", h, C, F);H[g] = { id: C,
                  scope: void 0, clone: void 0 };z[C] = !0;
              }
            }for (t in m) {
              E = m[t];C = tb(E.clone);b.leave(C);if (C[0].parentNode) for (g = 0, n = C.length; g < n; g++) {
                C[g].$$NG_REMOVED = !0;
              }E.scope.$destroy();
            }for (g = 0; g < B; g++) {
              if (D = f === G ? g : G[g], F = f[D], E = H[g], E.scope) {
                t = r;do {
                  t = t.nextSibling;
                } while (t && t.$$NG_REMOVED);E.clone[0] !== t && b.move(tb(E.clone), null, r);r = E.clone[E.clone.length - 1];e(E.scope, g, s, F, v, D, B);
              } else l(function (a, c) {
                E.scope = c;var d = k.cloneNode(!1);a[a.length++] = d;b.enter(a, null, r);r = d;E.clone = a;z[E.id] = E;e(E.scope, g, s, F, v, D, B);
              });
            }m = z;
          });
        };
      } };
  }],
      $e = ["$animate", function (a) {
    return { restrict: "A", multiElement: !0, link: function link(b, d, c) {
        b.$watch(c.ngShow, function (b) {
          a[b ? "removeClass" : "addClass"](d, "ng-hide", { tempClasses: "ng-hide-animate" });
        });
      } };
  }],
      Te = ["$animate", function (a) {
    return { restrict: "A", multiElement: !0, link: function link(b, d, c) {
        b.$watch(c.ngHide, function (b) {
          a[b ? "addClass" : "removeClass"](d, "ng-hide", { tempClasses: "ng-hide-animate" });
        });
      } };
  }],
      af = Qa(function (a, b, d) {
    a.$watch(d.ngStyle, function (a, d) {
      d && a !== d && q(d, function (a, c) {
        b.css(c, "");
      });a && b.css(a);
    }, !0);
  }),
      bf = ["$animate", "$compile", function (a, b) {
    return { require: "ngSwitch", controller: ["$scope", function () {
        this.cases = {};
      }], link: function link(d, c, e, f) {
        var g = [],
            h = [],
            k = [],
            l = [],
            m = function m(a, b) {
          return function (c) {
            !1 !== c && a.splice(b, 1);
          };
        };d.$watch(e.ngSwitch || e.on, function (c) {
          for (var d, e; k.length;) {
            a.cancel(k.pop());
          }d = 0;for (e = l.length; d < e; ++d) {
            var s = tb(h[d].clone);l[d].$destroy();(k[d] = a.leave(s)).done(m(k, d));
          }h.length = 0;l.length = 0;(g = f.cases["!" + c] || f.cases["?"]) && q(g, function (c) {
            c.transclude(function (d, e) {
              l.push(e);
              var f = c.element;d[d.length++] = b.$$createComment("end ngSwitchWhen");h.push({ clone: d });a.enter(d, f.parent(), f);
            });
          });
        });
      } };
  }],
      cf = Qa({ transclude: "element", priority: 1200, require: "^ngSwitch", multiElement: !0, link: function link(a, b, d, c, e) {
      a = d.ngSwitchWhen.split(d.ngSwitchWhenSeparator).sort().filter(function (a, b, c) {
        return c[b - 1] !== a;
      });q(a, function (a) {
        c.cases["!" + a] = c.cases["!" + a] || [];c.cases["!" + a].push({ transclude: e, element: b });
      });
    } }),
      df = Qa({ transclude: "element", priority: 1200, require: "^ngSwitch", multiElement: !0, link: function link(a, b, d, c, e) {
      c.cases["?"] = c.cases["?"] || [];c.cases["?"].push({ transclude: e, element: b });
    } }),
      hh = L("ngTransclude"),
      ff = ["$compile", function (a) {
    return { restrict: "EAC", terminal: !0, compile: function compile(b) {
        var d = a(b.contents());b.empty();return function (a, b, f, g, h) {
          function k() {
            d(a, function (a) {
              b.append(a);
            });
          }if (!h) throw hh("orphan", xa(b));f.ngTransclude === f.$attr.ngTransclude && (f.ngTransclude = "");f = f.ngTransclude || f.ngTranscludeSlot;h(function (a, c) {
            var d;if (d = a.length) a: {
              d = 0;for (var f = a.length; d < f; d++) {
                var g = a[d];if (g.nodeType !== Ia || g.nodeValue.trim()) {
                  d = !0;break a;
                }
              }d = void 0;
            }d ? b.append(a) : (k(), c.$destroy());
          }, null, f);f && !h.isSlotFilled(f) && k();
        };
      } };
  }],
      He = ["$templateCache", function (a) {
    return { restrict: "E", terminal: !0, compile: function compile(b, d) {
        "text/ng-template" === d.type && a.put(d.id, b[0].text);
      } };
  }],
      ih = { $setViewValue: z, $render: z },
      jh = ["$element", "$scope", function (a, b) {
    function d() {
      g || (g = !0, b.$$postDigest(function () {
        g = !1;e.ngModelCtrl.$render();
      }));
    }function c(a) {
      h || (h = !0, b.$$postDigest(function () {
        b.$$destroyed || (h = !1, e.ngModelCtrl.$setViewValue(e.readValue()), a && e.ngModelCtrl.$render());
      }));
    }var e = this,
        f = new Gb();e.selectValueMap = {};e.ngModelCtrl = ih;e.multiple = !1;e.unknownOption = B(x.document.createElement("option"));e.hasEmptyOption = !1;e.emptyOption = void 0;e.renderUnknownOption = function (b) {
      b = e.generateUnknownOptionValue(b);e.unknownOption.val(b);a.prepend(e.unknownOption);Ta(e.unknownOption, !0);a.val(b);
    };e.updateUnknownOption = function (b) {
      b = e.generateUnknownOptionValue(b);e.unknownOption.val(b);Ta(e.unknownOption, !0);a.val(b);
    };e.generateUnknownOptionValue = function (a) {
      return "? " + Pa(a) + " ?";
    };e.removeUnknownOption = function () {
      e.unknownOption.parent() && e.unknownOption.remove();
    };e.selectEmptyOption = function () {
      e.emptyOption && (a.val(""), Ta(e.emptyOption, !0));
    };e.unselectEmptyOption = function () {
      e.hasEmptyOption && e.emptyOption.removeAttr("selected");
    };b.$on("$destroy", function () {
      e.renderUnknownOption = z;
    });e.readValue = function () {
      var b = a.val(),
          b = b in e.selectValueMap ? e.selectValueMap[b] : b;return e.hasOption(b) ? b : null;
    };e.writeValue = function (b) {
      var c = a[0].options[a[0].selectedIndex];
      c && Ta(B(c), !1);e.hasOption(b) ? (e.removeUnknownOption(), c = Pa(b), a.val(c in e.selectValueMap ? c : b), Ta(B(a[0].options[a[0].selectedIndex]), !0)) : null == b && e.emptyOption ? (e.removeUnknownOption(), e.selectEmptyOption()) : e.unknownOption.parent().length ? e.updateUnknownOption(b) : e.renderUnknownOption(b);
    };e.addOption = function (a, b) {
      if (8 !== b[0].nodeType) {
        Ka(a, '"option value"');"" === a && (e.hasEmptyOption = !0, e.emptyOption = b);var c = f.get(a) || 0;f.set(a, c + 1);d();
      }
    };e.removeOption = function (a) {
      var b = f.get(a);b && (1 === b ? (f.delete(a), "" === a && (e.hasEmptyOption = !1, e.emptyOption = void 0)) : f.set(a, b - 1));
    };e.hasOption = function (a) {
      return !!f.get(a);
    };var g = !1,
        h = !1;e.registerOption = function (a, b, f, g, h) {
      if (f.$attr.ngValue) {
        var q,
            s = NaN;f.$observe("value", function (a) {
          var d,
              f = b.prop("selected");u(s) && (e.removeOption(q), delete e.selectValueMap[s], d = !0);s = Pa(a);q = a;e.selectValueMap[s] = a;e.addOption(a, b);b.attr("value", s);d && f && c();
        });
      } else g ? f.$observe("value", function (a) {
        e.readValue();var d,
            f = b.prop("selected");u(q) && (e.removeOption(q), d = !0);q = a;e.addOption(a, b);d && f && c();
      }) : h ? a.$watch(h, function (a, d) {
        f.$set("value", a);var g = b.prop("selected");d !== a && e.removeOption(d);e.addOption(a, b);d && g && c();
      }) : e.addOption(f.value, b);f.$observe("disabled", function (a) {
        if ("true" === a || a && b.prop("selected")) e.multiple ? c(!0) : (e.ngModelCtrl.$setViewValue(null), e.ngModelCtrl.$render());
      });b.on("$destroy", function () {
        var a = e.readValue(),
            b = f.value;e.removeOption(b);d();(e.multiple && a && -1 !== a.indexOf(b) || a === b) && c(!0);
      });
    };
  }],
      Ie = function Ie() {
    return { restrict: "E", require: ["select", "?ngModel"], controller: jh, priority: 1, link: { pre: function pre(a, b, d, c) {
          var e = c[0],
              f = c[1];if (f) {
            if (e.ngModelCtrl = f, b.on("change", function () {
              e.removeUnknownOption();a.$apply(function () {
                f.$setViewValue(e.readValue());
              });
            }), d.multiple) {
              e.multiple = !0;e.readValue = function () {
                var a = [];q(b.find("option"), function (b) {
                  b.selected && !b.disabled && (b = b.value, a.push(b in e.selectValueMap ? e.selectValueMap[b] : b));
                });return a;
              };e.writeValue = function (a) {
                q(b.find("option"), function (b) {
                  var c = !!a && (-1 !== Array.prototype.indexOf.call(a, b.value) || -1 !== Array.prototype.indexOf.call(a, e.selectValueMap[b.value]));c !== b.selected && Ta(B(b), c);
                });
              };var g,
                  h = NaN;a.$watch(function () {
                h !== f.$viewValue || sa(g, f.$viewValue) || (g = pa(f.$viewValue), f.$render());h = f.$viewValue;
              });f.$isEmpty = function (a) {
                return !a || 0 === a.length;
              };
            }
          } else e.registerOption = z;
        }, post: function post(a, b, d, c) {
          var e = c[1];if (e) {
            var f = c[0];e.$render = function () {
              f.writeValue(e.$viewValue);
            };
          }
        } } };
  },
      Je = ["$interpolate", function (a) {
    return { restrict: "E", priority: 100, compile: function compile(b, d) {
        var c, e;u(d.ngValue) || (u(d.value) ? c = a(d.value, !0) : (e = a(b.text(), !0)) || d.$set("value", b.text()));return function (a, b, d) {
          var k = b.parent();(k = k.data("$selectController") || k.parent().data("$selectController")) && k.registerOption(a, b, d, c, e);
        };
      } };
  }],
      Zc = function Zc() {
    return { restrict: "A", require: "?ngModel", link: function link(a, b, d, c) {
        c && (d.required = !0, c.$validators.required = function (a, b) {
          return !d.required || !c.$isEmpty(b);
        }, d.$observe("required", function () {
          c.$validate();
        }));
      } };
  },
      Yc = function Yc() {
    return { restrict: "A", require: "?ngModel", link: function link(a, b, d, c) {
        if (c) {
          var e,
              f = d.ngPattern || d.pattern;d.$observe("pattern", function (a) {
            F(a) && 0 < a.length && (a = new RegExp("^" + a + "$"));if (a && !a.test) throw L("ngPattern")("noregexp", f, a, xa(b));e = a || void 0;c.$validate();
          });c.$validators.pattern = function (a, b) {
            return c.$isEmpty(b) || w(e) || e.test(b);
          };
        }
      } };
  },
      ad = function ad() {
    return { restrict: "A", require: "?ngModel", link: function link(a, b, d, c) {
        if (c) {
          var e = -1;d.$observe("maxlength", function (a) {
            a = Z(a);e = da(a) ? -1 : a;c.$validate();
          });c.$validators.maxlength = function (a, b) {
            return 0 > e || c.$isEmpty(b) || b.length <= e;
          };
        }
      } };
  },
      $c = function $c() {
    return { restrict: "A", require: "?ngModel", link: function link(a, b, d, c) {
        if (c) {
          var e = 0;d.$observe("minlength", function (a) {
            e = Z(a) || 0;c.$validate();
          });c.$validators.minlength = function (a, b) {
            return c.$isEmpty(b) || b.length >= e;
          };
        }
      } };
  };x.angular.bootstrap ? x.console && console.log("WARNING: Tried to load angular more than once.") : (ze(), Ce(ea), ea.module("ngLocale", [], ["$provide", function (a) {
    function b(a) {
      a += "";var b = a.indexOf(".");return -1 == b ? 0 : a.length - b - 1;
    }a.value("$locale", { DATETIME_FORMATS: { AMPMS: ["AM", "PM"], DAY: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "), ERANAMES: ["Before Christ", "Anno Domini"], ERAS: ["BC", "AD"], FIRSTDAYOFWEEK: 6, MONTH: "January February March April May June July August September October November December".split(" "), SHORTDAY: "Sun Mon Tue Wed Thu Fri Sat".split(" "), SHORTMONTH: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "), STANDALONEMONTH: "January February March April May June July August September October November December".split(" "), WEEKENDRANGE: [5, 6], fullDate: "EEEE, MMMM d, y", longDate: "MMMM d, y", medium: "MMM d, y h:mm:ss a", mediumDate: "MMM d, y", mediumTime: "h:mm:ss a", "short": "M/d/yy h:mm a", shortDate: "M/d/yy", shortTime: "h:mm a" }, NUMBER_FORMATS: { CURRENCY_SYM: "$", DECIMAL_SEP: ".", GROUP_SEP: ",", PATTERNS: [{ gSize: 3, lgSize: 3, maxFrac: 3, minFrac: 0, minInt: 1, negPre: "-", negSuf: "", posPre: "", posSuf: "" }, { gSize: 3, lgSize: 3, maxFrac: 2, minFrac: 2, minInt: 1, negPre: "-\xA4", negSuf: "", posPre: "\xA4", posSuf: "" }] }, id: "en-us", localeID: "en_US", pluralCat: function pluralCat(a, c) {
        var e = a | 0,
            f = c;void 0 === f && (f = Math.min(b(a), 3));Math.pow(10, f);return 1 == e && 0 == f ? "one" : "other";
      } });
  }]), B(function () {
    ue(x.document, Sc);
  }));
})(window);!window.angular.$$csp().noInlineStyle && window.angular.element(document.head).prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}.ng-animate-shim{visibility:hidden;}.ng-anchor{position:absolute;}</style>');


},{}],11:[function(require,module,exports){
/*
 * angular-ui-bootstrap
 * http://angular-ui.github.io/bootstrap/

 * Version: 2.5.0 - 2017-01-28
 * License: MIT
 */angular.module("ui.bootstrap", ["ui.bootstrap.tpls", "ui.bootstrap.collapse","ui.bootstrap.tabindex","ui.bootstrap.accordion","ui.bootstrap.alert","ui.bootstrap.buttons","ui.bootstrap.carousel","ui.bootstrap.dateparser","ui.bootstrap.isClass","ui.bootstrap.datepicker","ui.bootstrap.position","ui.bootstrap.datepickerPopup","ui.bootstrap.debounce","ui.bootstrap.multiMap","ui.bootstrap.dropdown","ui.bootstrap.stackedMap","ui.bootstrap.modal","ui.bootstrap.paging","ui.bootstrap.pager","ui.bootstrap.pagination","ui.bootstrap.tooltip","ui.bootstrap.popover","ui.bootstrap.progressbar","ui.bootstrap.rating","ui.bootstrap.tabs","ui.bootstrap.timepicker","ui.bootstrap.typeahead"]);
angular.module("ui.bootstrap.tpls", ["uib/template/accordion/accordion-group.html","uib/template/accordion/accordion.html","uib/template/alert/alert.html","uib/template/carousel/carousel.html","uib/template/carousel/slide.html","uib/template/datepicker/datepicker.html","uib/template/datepicker/day.html","uib/template/datepicker/month.html","uib/template/datepicker/year.html","uib/template/datepickerPopup/popup.html","uib/template/modal/window.html","uib/template/pager/pager.html","uib/template/pagination/pagination.html","uib/template/tooltip/tooltip-html-popup.html","uib/template/tooltip/tooltip-popup.html","uib/template/tooltip/tooltip-template-popup.html","uib/template/popover/popover-html.html","uib/template/popover/popover-template.html","uib/template/popover/popover.html","uib/template/progressbar/bar.html","uib/template/progressbar/progress.html","uib/template/progressbar/progressbar.html","uib/template/rating/rating.html","uib/template/tabs/tab.html","uib/template/tabs/tabset.html","uib/template/timepicker/timepicker.html","uib/template/typeahead/typeahead-match.html","uib/template/typeahead/typeahead-popup.html"]);
angular.module('ui.bootstrap.collapse', [])

  .directive('uibCollapse', ['$animate', '$q', '$parse', '$injector', function($animate, $q, $parse, $injector) {
    var $animateCss = $injector.has('$animateCss') ? $injector.get('$animateCss') : null;
    return {
      link: function(scope, element, attrs) {
        var expandingExpr = $parse(attrs.expanding),
          expandedExpr = $parse(attrs.expanded),
          collapsingExpr = $parse(attrs.collapsing),
          collapsedExpr = $parse(attrs.collapsed),
          horizontal = false,
          css = {},
          cssTo = {};

        init();

        function init() {
          horizontal = !!('horizontal' in attrs);
          if (horizontal) {
            css = {
              width: ''
            };
            cssTo = {width: '0'};
          } else {
            css = {
              height: ''
            };
            cssTo = {height: '0'};
          }
          if (!scope.$eval(attrs.uibCollapse)) {
            element.addClass('in')
              .addClass('collapse')
              .attr('aria-expanded', true)
              .attr('aria-hidden', false)
              .css(css);
          }
        }

        function getScrollFromElement(element) {
          if (horizontal) {
            return {width: element.scrollWidth + 'px'};
          }
          return {height: element.scrollHeight + 'px'};
        }

        function expand() {
          if (element.hasClass('collapse') && element.hasClass('in')) {
            return;
          }

          $q.resolve(expandingExpr(scope))
            .then(function() {
              element.removeClass('collapse')
                .addClass('collapsing')
                .attr('aria-expanded', true)
                .attr('aria-hidden', false);

              if ($animateCss) {
                $animateCss(element, {
                  addClass: 'in',
                  easing: 'ease',
                  css: {
                    overflow: 'hidden'
                  },
                  to: getScrollFromElement(element[0])
                }).start()['finally'](expandDone);
              } else {
                $animate.addClass(element, 'in', {
                  css: {
                    overflow: 'hidden'
                  },
                  to: getScrollFromElement(element[0])
                }).then(expandDone);
              }
            }, angular.noop);
        }

        function expandDone() {
          element.removeClass('collapsing')
            .addClass('collapse')
            .css(css);
          expandedExpr(scope);
        }

        function collapse() {
          if (!element.hasClass('collapse') && !element.hasClass('in')) {
            return collapseDone();
          }

          $q.resolve(collapsingExpr(scope))
            .then(function() {
              element
              // IMPORTANT: The width must be set before adding "collapsing" class.
              // Otherwise, the browser attempts to animate from width 0 (in
              // collapsing class) to the given width here.
                .css(getScrollFromElement(element[0]))
                // initially all panel collapse have the collapse class, this removal
                // prevents the animation from jumping to collapsed state
                .removeClass('collapse')
                .addClass('collapsing')
                .attr('aria-expanded', false)
                .attr('aria-hidden', true);

              if ($animateCss) {
                $animateCss(element, {
                  removeClass: 'in',
                  to: cssTo
                }).start()['finally'](collapseDone);
              } else {
                $animate.removeClass(element, 'in', {
                  to: cssTo
                }).then(collapseDone);
              }
            }, angular.noop);
        }

        function collapseDone() {
          element.css(cssTo); // Required so that collapse works when animation is disabled
          element.removeClass('collapsing')
            .addClass('collapse');
          collapsedExpr(scope);
        }

        scope.$watch(attrs.uibCollapse, function(shouldCollapse) {
          if (shouldCollapse) {
            collapse();
          } else {
            expand();
          }
        });
      }
    };
  }]);

angular.module('ui.bootstrap.tabindex', [])

.directive('uibTabindexToggle', function() {
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
      attrs.$observe('disabled', function(disabled) {
        attrs.$set('tabindex', disabled ? -1 : null);
      });
    }
  };
});

angular.module('ui.bootstrap.accordion', ['ui.bootstrap.collapse', 'ui.bootstrap.tabindex'])

.constant('uibAccordionConfig', {
  closeOthers: true
})

.controller('UibAccordionController', ['$scope', '$attrs', 'uibAccordionConfig', function($scope, $attrs, accordionConfig) {
  // This array keeps track of the accordion groups
  this.groups = [];

  // Ensure that all the groups in this accordion are closed, unless close-others explicitly says not to
  this.closeOthers = function(openGroup) {
    var closeOthers = angular.isDefined($attrs.closeOthers) ?
      $scope.$eval($attrs.closeOthers) : accordionConfig.closeOthers;
    if (closeOthers) {
      angular.forEach(this.groups, function(group) {
        if (group !== openGroup) {
          group.isOpen = false;
        }
      });
    }
  };

  // This is called from the accordion-group directive to add itself to the accordion
  this.addGroup = function(groupScope) {
    var that = this;
    this.groups.push(groupScope);

    groupScope.$on('$destroy', function(event) {
      that.removeGroup(groupScope);
    });
  };

  // This is called from the accordion-group directive when to remove itself
  this.removeGroup = function(group) {
    var index = this.groups.indexOf(group);
    if (index !== -1) {
      this.groups.splice(index, 1);
    }
  };
}])

// The accordion directive simply sets up the directive controller
// and adds an accordion CSS class to itself element.
.directive('uibAccordion', function() {
  return {
    controller: 'UibAccordionController',
    controllerAs: 'accordion',
    transclude: true,
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'uib/template/accordion/accordion.html';
    }
  };
})

// The accordion-group directive indicates a block of html that will expand and collapse in an accordion
.directive('uibAccordionGroup', function() {
  return {
    require: '^uibAccordion',         // We need this directive to be inside an accordion
    transclude: true,              // It transcludes the contents of the directive into the template
    restrict: 'A',
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'uib/template/accordion/accordion-group.html';
    },
    scope: {
      heading: '@',               // Interpolate the heading attribute onto this scope
      panelClass: '@?',           // Ditto with panelClass
      isOpen: '=?',
      isDisabled: '=?'
    },
    controller: function() {
      this.setHeading = function(element) {
        this.heading = element;
      };
    },
    link: function(scope, element, attrs, accordionCtrl) {
      element.addClass('panel');
      accordionCtrl.addGroup(scope);

      scope.openClass = attrs.openClass || 'panel-open';
      scope.panelClass = attrs.panelClass || 'panel-default';
      scope.$watch('isOpen', function(value) {
        element.toggleClass(scope.openClass, !!value);
        if (value) {
          accordionCtrl.closeOthers(scope);
        }
      });

      scope.toggleOpen = function($event) {
        if (!scope.isDisabled) {
          if (!$event || $event.which === 32) {
            scope.isOpen = !scope.isOpen;
          }
        }
      };

      var id = 'accordiongroup-' + scope.$id + '-' + Math.floor(Math.random() * 10000);
      scope.headingId = id + '-tab';
      scope.panelId = id + '-panel';
    }
  };
})

// Use accordion-heading below an accordion-group to provide a heading containing HTML
.directive('uibAccordionHeading', function() {
  return {
    transclude: true,   // Grab the contents to be used as the heading
    template: '',       // In effect remove this element!
    replace: true,
    require: '^uibAccordionGroup',
    link: function(scope, element, attrs, accordionGroupCtrl, transclude) {
      // Pass the heading to the accordion-group controller
      // so that it can be transcluded into the right place in the template
      // [The second parameter to transclude causes the elements to be cloned so that they work in ng-repeat]
      accordionGroupCtrl.setHeading(transclude(scope, angular.noop));
    }
  };
})

// Use in the accordion-group template to indicate where you want the heading to be transcluded
// You must provide the property on the accordion-group controller that will hold the transcluded element
.directive('uibAccordionTransclude', function() {
  return {
    require: '^uibAccordionGroup',
    link: function(scope, element, attrs, controller) {
      scope.$watch(function() { return controller[attrs.uibAccordionTransclude]; }, function(heading) {
        if (heading) {
          var elem = angular.element(element[0].querySelector(getHeaderSelectors()));
          elem.html('');
          elem.append(heading);
        }
      });
    }
  };

  function getHeaderSelectors() {
      return 'uib-accordion-header,' +
          'data-uib-accordion-header,' +
          'x-uib-accordion-header,' +
          'uib\\:accordion-header,' +
          '[uib-accordion-header],' +
          '[data-uib-accordion-header],' +
          '[x-uib-accordion-header]';
  }
});

angular.module('ui.bootstrap.alert', [])

.controller('UibAlertController', ['$scope', '$element', '$attrs', '$interpolate', '$timeout', function($scope, $element, $attrs, $interpolate, $timeout) {
  $scope.closeable = !!$attrs.close;
  $element.addClass('alert');
  $attrs.$set('role', 'alert');
  if ($scope.closeable) {
    $element.addClass('alert-dismissible');
  }

  var dismissOnTimeout = angular.isDefined($attrs.dismissOnTimeout) ?
    $interpolate($attrs.dismissOnTimeout)($scope.$parent) : null;

  if (dismissOnTimeout) {
    $timeout(function() {
      $scope.close();
    }, parseInt(dismissOnTimeout, 10));
  }
}])

.directive('uibAlert', function() {
  return {
    controller: 'UibAlertController',
    controllerAs: 'alert',
    restrict: 'A',
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'uib/template/alert/alert.html';
    },
    transclude: true,
    scope: {
      close: '&'
    }
  };
});

angular.module('ui.bootstrap.buttons', [])

.constant('uibButtonConfig', {
  activeClass: 'active',
  toggleEvent: 'click'
})

.controller('UibButtonsController', ['uibButtonConfig', function(buttonConfig) {
  this.activeClass = buttonConfig.activeClass || 'active';
  this.toggleEvent = buttonConfig.toggleEvent || 'click';
}])

.directive('uibBtnRadio', ['$parse', function($parse) {
  return {
    require: ['uibBtnRadio', 'ngModel'],
    controller: 'UibButtonsController',
    controllerAs: 'buttons',
    link: function(scope, element, attrs, ctrls) {
      var buttonsCtrl = ctrls[0], ngModelCtrl = ctrls[1];
      var uncheckableExpr = $parse(attrs.uibUncheckable);

      element.find('input').css({display: 'none'});

      //model -> UI
      ngModelCtrl.$render = function() {
        element.toggleClass(buttonsCtrl.activeClass, angular.equals(ngModelCtrl.$modelValue, scope.$eval(attrs.uibBtnRadio)));
      };

      //ui->model
      element.on(buttonsCtrl.toggleEvent, function() {
        if (attrs.disabled) {
          return;
        }

        var isActive = element.hasClass(buttonsCtrl.activeClass);

        if (!isActive || angular.isDefined(attrs.uncheckable)) {
          scope.$apply(function() {
            ngModelCtrl.$setViewValue(isActive ? null : scope.$eval(attrs.uibBtnRadio));
            ngModelCtrl.$render();
          });
        }
      });

      if (attrs.uibUncheckable) {
        scope.$watch(uncheckableExpr, function(uncheckable) {
          attrs.$set('uncheckable', uncheckable ? '' : undefined);
        });
      }
    }
  };
}])

.directive('uibBtnCheckbox', function() {
  return {
    require: ['uibBtnCheckbox', 'ngModel'],
    controller: 'UibButtonsController',
    controllerAs: 'button',
    link: function(scope, element, attrs, ctrls) {
      var buttonsCtrl = ctrls[0], ngModelCtrl = ctrls[1];

      element.find('input').css({display: 'none'});

      function getTrueValue() {
        return getCheckboxValue(attrs.btnCheckboxTrue, true);
      }

      function getFalseValue() {
        return getCheckboxValue(attrs.btnCheckboxFalse, false);
      }

      function getCheckboxValue(attribute, defaultValue) {
        return angular.isDefined(attribute) ? scope.$eval(attribute) : defaultValue;
      }

      //model -> UI
      ngModelCtrl.$render = function() {
        element.toggleClass(buttonsCtrl.activeClass, angular.equals(ngModelCtrl.$modelValue, getTrueValue()));
      };

      //ui->model
      element.on(buttonsCtrl.toggleEvent, function() {
        if (attrs.disabled) {
          return;
        }

        scope.$apply(function() {
          ngModelCtrl.$setViewValue(element.hasClass(buttonsCtrl.activeClass) ? getFalseValue() : getTrueValue());
          ngModelCtrl.$render();
        });
      });
    }
  };
});

angular.module('ui.bootstrap.carousel', [])

.controller('UibCarouselController', ['$scope', '$element', '$interval', '$timeout', '$animate', function($scope, $element, $interval, $timeout, $animate) {
  var self = this,
    slides = self.slides = $scope.slides = [],
    SLIDE_DIRECTION = 'uib-slideDirection',
    currentIndex = $scope.active,
    currentInterval, isPlaying;

  var destroyed = false;
  $element.addClass('carousel');

  self.addSlide = function(slide, element) {
    slides.push({
      slide: slide,
      element: element
    });
    slides.sort(function(a, b) {
      return +a.slide.index - +b.slide.index;
    });
    //if this is the first slide or the slide is set to active, select it
    if (slide.index === $scope.active || slides.length === 1 && !angular.isNumber($scope.active)) {
      if ($scope.$currentTransition) {
        $scope.$currentTransition = null;
      }

      currentIndex = slide.index;
      $scope.active = slide.index;
      setActive(currentIndex);
      self.select(slides[findSlideIndex(slide)]);
      if (slides.length === 1) {
        $scope.play();
      }
    }
  };

  self.getCurrentIndex = function() {
    for (var i = 0; i < slides.length; i++) {
      if (slides[i].slide.index === currentIndex) {
        return i;
      }
    }
  };

  self.next = $scope.next = function() {
    var newIndex = (self.getCurrentIndex() + 1) % slides.length;

    if (newIndex === 0 && $scope.noWrap()) {
      $scope.pause();
      return;
    }

    return self.select(slides[newIndex], 'next');
  };

  self.prev = $scope.prev = function() {
    var newIndex = self.getCurrentIndex() - 1 < 0 ? slides.length - 1 : self.getCurrentIndex() - 1;

    if ($scope.noWrap() && newIndex === slides.length - 1) {
      $scope.pause();
      return;
    }

    return self.select(slides[newIndex], 'prev');
  };

  self.removeSlide = function(slide) {
    var index = findSlideIndex(slide);

    //get the index of the slide inside the carousel
    slides.splice(index, 1);
    if (slides.length > 0 && currentIndex === index) {
      if (index >= slides.length) {
        currentIndex = slides.length - 1;
        $scope.active = currentIndex;
        setActive(currentIndex);
        self.select(slides[slides.length - 1]);
      } else {
        currentIndex = index;
        $scope.active = currentIndex;
        setActive(currentIndex);
        self.select(slides[index]);
      }
    } else if (currentIndex > index) {
      currentIndex--;
      $scope.active = currentIndex;
    }

    //clean the active value when no more slide
    if (slides.length === 0) {
      currentIndex = null;
      $scope.active = null;
    }
  };

  /* direction: "prev" or "next" */
  self.select = $scope.select = function(nextSlide, direction) {
    var nextIndex = findSlideIndex(nextSlide.slide);
    //Decide direction if it's not given
    if (direction === undefined) {
      direction = nextIndex > self.getCurrentIndex() ? 'next' : 'prev';
    }
    //Prevent this user-triggered transition from occurring if there is already one in progress
    if (nextSlide.slide.index !== currentIndex &&
      !$scope.$currentTransition) {
      goNext(nextSlide.slide, nextIndex, direction);
    }
  };

  /* Allow outside people to call indexOf on slides array */
  $scope.indexOfSlide = function(slide) {
    return +slide.slide.index;
  };

  $scope.isActive = function(slide) {
    return $scope.active === slide.slide.index;
  };

  $scope.isPrevDisabled = function() {
    return $scope.active === 0 && $scope.noWrap();
  };

  $scope.isNextDisabled = function() {
    return $scope.active === slides.length - 1 && $scope.noWrap();
  };

  $scope.pause = function() {
    if (!$scope.noPause) {
      isPlaying = false;
      resetTimer();
    }
  };

  $scope.play = function() {
    if (!isPlaying) {
      isPlaying = true;
      restartTimer();
    }
  };

  $element.on('mouseenter', $scope.pause);
  $element.on('mouseleave', $scope.play);

  $scope.$on('$destroy', function() {
    destroyed = true;
    resetTimer();
  });

  $scope.$watch('noTransition', function(noTransition) {
    $animate.enabled($element, !noTransition);
  });

  $scope.$watch('interval', restartTimer);

  $scope.$watchCollection('slides', resetTransition);

  $scope.$watch('active', function(index) {
    if (angular.isNumber(index) && currentIndex !== index) {
      for (var i = 0; i < slides.length; i++) {
        if (slides[i].slide.index === index) {
          index = i;
          break;
        }
      }

      var slide = slides[index];
      if (slide) {
        setActive(index);
        self.select(slides[index]);
        currentIndex = index;
      }
    }
  });

  function getSlideByIndex(index) {
    for (var i = 0, l = slides.length; i < l; ++i) {
      if (slides[i].index === index) {
        return slides[i];
      }
    }
  }

  function setActive(index) {
    for (var i = 0; i < slides.length; i++) {
      slides[i].slide.active = i === index;
    }
  }

  function goNext(slide, index, direction) {
    if (destroyed) {
      return;
    }

    angular.extend(slide, {direction: direction});
    angular.extend(slides[currentIndex].slide || {}, {direction: direction});
    if ($animate.enabled($element) && !$scope.$currentTransition &&
      slides[index].element && self.slides.length > 1) {
      slides[index].element.data(SLIDE_DIRECTION, slide.direction);
      var currentIdx = self.getCurrentIndex();

      if (angular.isNumber(currentIdx) && slides[currentIdx].element) {
        slides[currentIdx].element.data(SLIDE_DIRECTION, slide.direction);
      }

      $scope.$currentTransition = true;
      $animate.on('addClass', slides[index].element, function(element, phase) {
        if (phase === 'close') {
          $scope.$currentTransition = null;
          $animate.off('addClass', element);
        }
      });
    }

    $scope.active = slide.index;
    currentIndex = slide.index;
    setActive(index);

    //every time you change slides, reset the timer
    restartTimer();
  }

  function findSlideIndex(slide) {
    for (var i = 0; i < slides.length; i++) {
      if (slides[i].slide === slide) {
        return i;
      }
    }
  }

  function resetTimer() {
    if (currentInterval) {
      $interval.cancel(currentInterval);
      currentInterval = null;
    }
  }

  function resetTransition(slides) {
    if (!slides.length) {
      $scope.$currentTransition = null;
    }
  }

  function restartTimer() {
    resetTimer();
    var interval = +$scope.interval;
    if (!isNaN(interval) && interval > 0) {
      currentInterval = $interval(timerFn, interval);
    }
  }

  function timerFn() {
    var interval = +$scope.interval;
    if (isPlaying && !isNaN(interval) && interval > 0 && slides.length) {
      $scope.next();
    } else {
      $scope.pause();
    }
  }
}])

.directive('uibCarousel', function() {
  return {
    transclude: true,
    controller: 'UibCarouselController',
    controllerAs: 'carousel',
    restrict: 'A',
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'uib/template/carousel/carousel.html';
    },
    scope: {
      active: '=',
      interval: '=',
      noTransition: '=',
      noPause: '=',
      noWrap: '&'
    }
  };
})

.directive('uibSlide', ['$animate', function($animate) {
  return {
    require: '^uibCarousel',
    restrict: 'A',
    transclude: true,
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'uib/template/carousel/slide.html';
    },
    scope: {
      actual: '=?',
      index: '=?'
    },
    link: function (scope, element, attrs, carouselCtrl) {
      element.addClass('item');
      carouselCtrl.addSlide(scope, element);
      //when the scope is destroyed then remove the slide from the current slides array
      scope.$on('$destroy', function() {
        carouselCtrl.removeSlide(scope);
      });

      scope.$watch('active', function(active) {
        $animate[active ? 'addClass' : 'removeClass'](element, 'active');
      });
    }
  };
}])

.animation('.item', ['$animateCss',
function($animateCss) {
  var SLIDE_DIRECTION = 'uib-slideDirection';

  function removeClass(element, className, callback) {
    element.removeClass(className);
    if (callback) {
      callback();
    }
  }

  return {
    beforeAddClass: function(element, className, done) {
      if (className === 'active') {
        var stopped = false;
        var direction = element.data(SLIDE_DIRECTION);
        var directionClass = direction === 'next' ? 'left' : 'right';
        var removeClassFn = removeClass.bind(this, element,
          directionClass + ' ' + direction, done);
        element.addClass(direction);

        $animateCss(element, {addClass: directionClass})
          .start()
          .done(removeClassFn);

        return function() {
          stopped = true;
        };
      }
      done();
    },
    beforeRemoveClass: function (element, className, done) {
      if (className === 'active') {
        var stopped = false;
        var direction = element.data(SLIDE_DIRECTION);
        var directionClass = direction === 'next' ? 'left' : 'right';
        var removeClassFn = removeClass.bind(this, element, directionClass, done);

        $animateCss(element, {addClass: directionClass})
          .start()
          .done(removeClassFn);

        return function() {
          stopped = true;
        };
      }
      done();
    }
  };
}]);

angular.module('ui.bootstrap.dateparser', [])

.service('uibDateParser', ['$log', '$locale', 'dateFilter', 'orderByFilter', 'filterFilter', function($log, $locale, dateFilter, orderByFilter, filterFilter) {
  // Pulled from https://github.com/mbostock/d3/blob/master/src/format/requote.js
  var SPECIAL_CHARACTERS_REGEXP = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;

  var localeId;
  var formatCodeToRegex;

  this.init = function() {
    localeId = $locale.id;

    this.parsers = {};
    this.formatters = {};

    formatCodeToRegex = [
      {
        key: 'yyyy',
        regex: '\\d{4}',
        apply: function(value) { this.year = +value; },
        formatter: function(date) {
          var _date = new Date();
          _date.setFullYear(Math.abs(date.getFullYear()));
          return dateFilter(_date, 'yyyy');
        }
      },
      {
        key: 'yy',
        regex: '\\d{2}',
        apply: function(value) { value = +value; this.year = value < 69 ? value + 2000 : value + 1900; },
        formatter: function(date) {
          var _date = new Date();
          _date.setFullYear(Math.abs(date.getFullYear()));
          return dateFilter(_date, 'yy');
        }
      },
      {
        key: 'y',
        regex: '\\d{1,4}',
        apply: function(value) { this.year = +value; },
        formatter: function(date) {
          var _date = new Date();
          _date.setFullYear(Math.abs(date.getFullYear()));
          return dateFilter(_date, 'y');
        }
      },
      {
        key: 'M!',
        regex: '0?[1-9]|1[0-2]',
        apply: function(value) { this.month = value - 1; },
        formatter: function(date) {
          var value = date.getMonth();
          if (/^[0-9]$/.test(value)) {
            return dateFilter(date, 'MM');
          }

          return dateFilter(date, 'M');
        }
      },
      {
        key: 'MMMM',
        regex: $locale.DATETIME_FORMATS.MONTH.join('|'),
        apply: function(value) { this.month = $locale.DATETIME_FORMATS.MONTH.indexOf(value); },
        formatter: function(date) { return dateFilter(date, 'MMMM'); }
      },
      {
        key: 'MMM',
        regex: $locale.DATETIME_FORMATS.SHORTMONTH.join('|'),
        apply: function(value) { this.month = $locale.DATETIME_FORMATS.SHORTMONTH.indexOf(value); },
        formatter: function(date) { return dateFilter(date, 'MMM'); }
      },
      {
        key: 'MM',
        regex: '0[1-9]|1[0-2]',
        apply: function(value) { this.month = value - 1; },
        formatter: function(date) { return dateFilter(date, 'MM'); }
      },
      {
        key: 'M',
        regex: '[1-9]|1[0-2]',
        apply: function(value) { this.month = value - 1; },
        formatter: function(date) { return dateFilter(date, 'M'); }
      },
      {
        key: 'd!',
        regex: '[0-2]?[0-9]{1}|3[0-1]{1}',
        apply: function(value) { this.date = +value; },
        formatter: function(date) {
          var value = date.getDate();
          if (/^[1-9]$/.test(value)) {
            return dateFilter(date, 'dd');
          }

          return dateFilter(date, 'd');
        }
      },
      {
        key: 'dd',
        regex: '[0-2][0-9]{1}|3[0-1]{1}',
        apply: function(value) { this.date = +value; },
        formatter: function(date) { return dateFilter(date, 'dd'); }
      },
      {
        key: 'd',
        regex: '[1-2]?[0-9]{1}|3[0-1]{1}',
        apply: function(value) { this.date = +value; },
        formatter: function(date) { return dateFilter(date, 'd'); }
      },
      {
        key: 'EEEE',
        regex: $locale.DATETIME_FORMATS.DAY.join('|'),
        formatter: function(date) { return dateFilter(date, 'EEEE'); }
      },
      {
        key: 'EEE',
        regex: $locale.DATETIME_FORMATS.SHORTDAY.join('|'),
        formatter: function(date) { return dateFilter(date, 'EEE'); }
      },
      {
        key: 'HH',
        regex: '(?:0|1)[0-9]|2[0-3]',
        apply: function(value) { this.hours = +value; },
        formatter: function(date) { return dateFilter(date, 'HH'); }
      },
      {
        key: 'hh',
        regex: '0[0-9]|1[0-2]',
        apply: function(value) { this.hours = +value; },
        formatter: function(date) { return dateFilter(date, 'hh'); }
      },
      {
        key: 'H',
        regex: '1?[0-9]|2[0-3]',
        apply: function(value) { this.hours = +value; },
        formatter: function(date) { return dateFilter(date, 'H'); }
      },
      {
        key: 'h',
        regex: '[0-9]|1[0-2]',
        apply: function(value) { this.hours = +value; },
        formatter: function(date) { return dateFilter(date, 'h'); }
      },
      {
        key: 'mm',
        regex: '[0-5][0-9]',
        apply: function(value) { this.minutes = +value; },
        formatter: function(date) { return dateFilter(date, 'mm'); }
      },
      {
        key: 'm',
        regex: '[0-9]|[1-5][0-9]',
        apply: function(value) { this.minutes = +value; },
        formatter: function(date) { return dateFilter(date, 'm'); }
      },
      {
        key: 'sss',
        regex: '[0-9][0-9][0-9]',
        apply: function(value) { this.milliseconds = +value; },
        formatter: function(date) { return dateFilter(date, 'sss'); }
      },
      {
        key: 'ss',
        regex: '[0-5][0-9]',
        apply: function(value) { this.seconds = +value; },
        formatter: function(date) { return dateFilter(date, 'ss'); }
      },
      {
        key: 's',
        regex: '[0-9]|[1-5][0-9]',
        apply: function(value) { this.seconds = +value; },
        formatter: function(date) { return dateFilter(date, 's'); }
      },
      {
        key: 'a',
        regex: $locale.DATETIME_FORMATS.AMPMS.join('|'),
        apply: function(value) {
          if (this.hours === 12) {
            this.hours = 0;
          }

          if (value === 'PM') {
            this.hours += 12;
          }
        },
        formatter: function(date) { return dateFilter(date, 'a'); }
      },
      {
        key: 'Z',
        regex: '[+-]\\d{4}',
        apply: function(value) {
          var matches = value.match(/([+-])(\d{2})(\d{2})/),
            sign = matches[1],
            hours = matches[2],
            minutes = matches[3];
          this.hours += toInt(sign + hours);
          this.minutes += toInt(sign + minutes);
        },
        formatter: function(date) {
          return dateFilter(date, 'Z');
        }
      },
      {
        key: 'ww',
        regex: '[0-4][0-9]|5[0-3]',
        formatter: function(date) { return dateFilter(date, 'ww'); }
      },
      {
        key: 'w',
        regex: '[0-9]|[1-4][0-9]|5[0-3]',
        formatter: function(date) { return dateFilter(date, 'w'); }
      },
      {
        key: 'GGGG',
        regex: $locale.DATETIME_FORMATS.ERANAMES.join('|').replace(/\s/g, '\\s'),
        formatter: function(date) { return dateFilter(date, 'GGGG'); }
      },
      {
        key: 'GGG',
        regex: $locale.DATETIME_FORMATS.ERAS.join('|'),
        formatter: function(date) { return dateFilter(date, 'GGG'); }
      },
      {
        key: 'GG',
        regex: $locale.DATETIME_FORMATS.ERAS.join('|'),
        formatter: function(date) { return dateFilter(date, 'GG'); }
      },
      {
        key: 'G',
        regex: $locale.DATETIME_FORMATS.ERAS.join('|'),
        formatter: function(date) { return dateFilter(date, 'G'); }
      }
    ];

    if (angular.version.major >= 1 && angular.version.minor > 4) {
      formatCodeToRegex.push({
        key: 'LLLL',
        regex: $locale.DATETIME_FORMATS.STANDALONEMONTH.join('|'),
        apply: function(value) { this.month = $locale.DATETIME_FORMATS.STANDALONEMONTH.indexOf(value); },
        formatter: function(date) { return dateFilter(date, 'LLLL'); }
      });
    }
  };

  this.init();

  function getFormatCodeToRegex(key) {
    return filterFilter(formatCodeToRegex, {key: key}, true)[0];
  }

  this.getParser = function (key) {
    var f = getFormatCodeToRegex(key);
    return f && f.apply || null;
  };

  this.overrideParser = function (key, parser) {
    var f = getFormatCodeToRegex(key);
    if (f && angular.isFunction(parser)) {
      this.parsers = {};
      f.apply = parser;
    }
  }.bind(this);

  function createParser(format) {
    var map = [], regex = format.split('');

    // check for literal values
    var quoteIndex = format.indexOf('\'');
    if (quoteIndex > -1) {
      var inLiteral = false;
      format = format.split('');
      for (var i = quoteIndex; i < format.length; i++) {
        if (inLiteral) {
          if (format[i] === '\'') {
            if (i + 1 < format.length && format[i+1] === '\'') { // escaped single quote
              format[i+1] = '$';
              regex[i+1] = '';
            } else { // end of literal
              regex[i] = '';
              inLiteral = false;
            }
          }
          format[i] = '$';
        } else {
          if (format[i] === '\'') { // start of literal
            format[i] = '$';
            regex[i] = '';
            inLiteral = true;
          }
        }
      }

      format = format.join('');
    }

    angular.forEach(formatCodeToRegex, function(data) {
      var index = format.indexOf(data.key);

      if (index > -1) {
        format = format.split('');

        regex[index] = '(' + data.regex + ')';
        format[index] = '$'; // Custom symbol to define consumed part of format
        for (var i = index + 1, n = index + data.key.length; i < n; i++) {
          regex[i] = '';
          format[i] = '$';
        }
        format = format.join('');

        map.push({
          index: index,
          key: data.key,
          apply: data.apply,
          matcher: data.regex
        });
      }
    });

    return {
      regex: new RegExp('^' + regex.join('') + '$'),
      map: orderByFilter(map, 'index')
    };
  }

  function createFormatter(format) {
    var formatters = [];
    var i = 0;
    var formatter, literalIdx;
    while (i < format.length) {
      if (angular.isNumber(literalIdx)) {
        if (format.charAt(i) === '\'') {
          if (i + 1 >= format.length || format.charAt(i + 1) !== '\'') {
            formatters.push(constructLiteralFormatter(format, literalIdx, i));
            literalIdx = null;
          }
        } else if (i === format.length) {
          while (literalIdx < format.length) {
            formatter = constructFormatterFromIdx(format, literalIdx);
            formatters.push(formatter);
            literalIdx = formatter.endIdx;
          }
        }

        i++;
        continue;
      }

      if (format.charAt(i) === '\'') {
        literalIdx = i;
        i++;
        continue;
      }

      formatter = constructFormatterFromIdx(format, i);

      formatters.push(formatter.parser);
      i = formatter.endIdx;
    }

    return formatters;
  }

  function constructLiteralFormatter(format, literalIdx, endIdx) {
    return function() {
      return format.substr(literalIdx + 1, endIdx - literalIdx - 1);
    };
  }

  function constructFormatterFromIdx(format, i) {
    var currentPosStr = format.substr(i);
    for (var j = 0; j < formatCodeToRegex.length; j++) {
      if (new RegExp('^' + formatCodeToRegex[j].key).test(currentPosStr)) {
        var data = formatCodeToRegex[j];
        return {
          endIdx: i + data.key.length,
          parser: data.formatter
        };
      }
    }

    return {
      endIdx: i + 1,
      parser: function() {
        return currentPosStr.charAt(0);
      }
    };
  }

  this.filter = function(date, format) {
    if (!angular.isDate(date) || isNaN(date) || !format) {
      return '';
    }

    format = $locale.DATETIME_FORMATS[format] || format;

    if ($locale.id !== localeId) {
      this.init();
    }

    if (!this.formatters[format]) {
      this.formatters[format] = createFormatter(format);
    }

    var formatters = this.formatters[format];

    return formatters.reduce(function(str, formatter) {
      return str + formatter(date);
    }, '');
  };

  this.parse = function(input, format, baseDate) {
    if (!angular.isString(input) || !format) {
      return input;
    }

    format = $locale.DATETIME_FORMATS[format] || format;
    format = format.replace(SPECIAL_CHARACTERS_REGEXP, '\\$&');

    if ($locale.id !== localeId) {
      this.init();
    }

    if (!this.parsers[format]) {
      this.parsers[format] = createParser(format, 'apply');
    }

    var parser = this.parsers[format],
        regex = parser.regex,
        map = parser.map,
        results = input.match(regex),
        tzOffset = false;
    if (results && results.length) {
      var fields, dt;
      if (angular.isDate(baseDate) && !isNaN(baseDate.getTime())) {
        fields = {
          year: baseDate.getFullYear(),
          month: baseDate.getMonth(),
          date: baseDate.getDate(),
          hours: baseDate.getHours(),
          minutes: baseDate.getMinutes(),
          seconds: baseDate.getSeconds(),
          milliseconds: baseDate.getMilliseconds()
        };
      } else {
        if (baseDate) {
          $log.warn('dateparser:', 'baseDate is not a valid date');
        }
        fields = { year: 1900, month: 0, date: 1, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 };
      }

      for (var i = 1, n = results.length; i < n; i++) {
        var mapper = map[i - 1];
        if (mapper.matcher === 'Z') {
          tzOffset = true;
        }

        if (mapper.apply) {
          mapper.apply.call(fields, results[i]);
        }
      }

      var datesetter = tzOffset ? Date.prototype.setUTCFullYear :
        Date.prototype.setFullYear;
      var timesetter = tzOffset ? Date.prototype.setUTCHours :
        Date.prototype.setHours;

      if (isValid(fields.year, fields.month, fields.date)) {
        if (angular.isDate(baseDate) && !isNaN(baseDate.getTime()) && !tzOffset) {
          dt = new Date(baseDate);
          datesetter.call(dt, fields.year, fields.month, fields.date);
          timesetter.call(dt, fields.hours, fields.minutes,
            fields.seconds, fields.milliseconds);
        } else {
          dt = new Date(0);
          datesetter.call(dt, fields.year, fields.month, fields.date);
          timesetter.call(dt, fields.hours || 0, fields.minutes || 0,
            fields.seconds || 0, fields.milliseconds || 0);
        }
      }

      return dt;
    }
  };

  // Check if date is valid for specific month (and year for February).
  // Month: 0 = Jan, 1 = Feb, etc
  function isValid(year, month, date) {
    if (date < 1) {
      return false;
    }

    if (month === 1 && date > 28) {
      return date === 29 && (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0);
    }

    if (month === 3 || month === 5 || month === 8 || month === 10) {
      return date < 31;
    }

    return true;
  }

  function toInt(str) {
    return parseInt(str, 10);
  }

  this.toTimezone = toTimezone;
  this.fromTimezone = fromTimezone;
  this.timezoneToOffset = timezoneToOffset;
  this.addDateMinutes = addDateMinutes;
  this.convertTimezoneToLocal = convertTimezoneToLocal;

  function toTimezone(date, timezone) {
    return date && timezone ? convertTimezoneToLocal(date, timezone) : date;
  }

  function fromTimezone(date, timezone) {
    return date && timezone ? convertTimezoneToLocal(date, timezone, true) : date;
  }

  //https://github.com/angular/angular.js/blob/622c42169699ec07fc6daaa19fe6d224e5d2f70e/src/Angular.js#L1207
  function timezoneToOffset(timezone, fallback) {
    timezone = timezone.replace(/:/g, '');
    var requestedTimezoneOffset = Date.parse('Jan 01, 1970 00:00:00 ' + timezone) / 60000;
    return isNaN(requestedTimezoneOffset) ? fallback : requestedTimezoneOffset;
  }

  function addDateMinutes(date, minutes) {
    date = new Date(date.getTime());
    date.setMinutes(date.getMinutes() + minutes);
    return date;
  }

  function convertTimezoneToLocal(date, timezone, reverse) {
    reverse = reverse ? -1 : 1;
    var dateTimezoneOffset = date.getTimezoneOffset();
    var timezoneOffset = timezoneToOffset(timezone, dateTimezoneOffset);
    return addDateMinutes(date, reverse * (timezoneOffset - dateTimezoneOffset));
  }
}]);

// Avoiding use of ng-class as it creates a lot of watchers when a class is to be applied to
// at most one element.
angular.module('ui.bootstrap.isClass', [])
.directive('uibIsClass', [
         '$animate',
function ($animate) {
  //                    11111111          22222222
  var ON_REGEXP = /^\s*([\s\S]+?)\s+on\s+([\s\S]+?)\s*$/;
  //                    11111111           22222222
  var IS_REGEXP = /^\s*([\s\S]+?)\s+for\s+([\s\S]+?)\s*$/;

  var dataPerTracked = {};

  return {
    restrict: 'A',
    compile: function(tElement, tAttrs) {
      var linkedScopes = [];
      var instances = [];
      var expToData = {};
      var lastActivated = null;
      var onExpMatches = tAttrs.uibIsClass.match(ON_REGEXP);
      var onExp = onExpMatches[2];
      var expsStr = onExpMatches[1];
      var exps = expsStr.split(',');

      return linkFn;

      function linkFn(scope, element, attrs) {
        linkedScopes.push(scope);
        instances.push({
          scope: scope,
          element: element
        });

        exps.forEach(function(exp, k) {
          addForExp(exp, scope);
        });

        scope.$on('$destroy', removeScope);
      }

      function addForExp(exp, scope) {
        var matches = exp.match(IS_REGEXP);
        var clazz = scope.$eval(matches[1]);
        var compareWithExp = matches[2];
        var data = expToData[exp];
        if (!data) {
          var watchFn = function(compareWithVal) {
            var newActivated = null;
            instances.some(function(instance) {
              var thisVal = instance.scope.$eval(onExp);
              if (thisVal === compareWithVal) {
                newActivated = instance;
                return true;
              }
            });
            if (data.lastActivated !== newActivated) {
              if (data.lastActivated) {
                $animate.removeClass(data.lastActivated.element, clazz);
              }
              if (newActivated) {
                $animate.addClass(newActivated.element, clazz);
              }
              data.lastActivated = newActivated;
            }
          };
          expToData[exp] = data = {
            lastActivated: null,
            scope: scope,
            watchFn: watchFn,
            compareWithExp: compareWithExp,
            watcher: scope.$watch(compareWithExp, watchFn)
          };
        }
        data.watchFn(scope.$eval(compareWithExp));
      }

      function removeScope(e) {
        var removedScope = e.targetScope;
        var index = linkedScopes.indexOf(removedScope);
        linkedScopes.splice(index, 1);
        instances.splice(index, 1);
        if (linkedScopes.length) {
          var newWatchScope = linkedScopes[0];
          angular.forEach(expToData, function(data) {
            if (data.scope === removedScope) {
              data.watcher = newWatchScope.$watch(data.compareWithExp, data.watchFn);
              data.scope = newWatchScope;
            }
          });
        } else {
          expToData = {};
        }
      }
    }
  };
}]);
angular.module('ui.bootstrap.datepicker', ['ui.bootstrap.dateparser', 'ui.bootstrap.isClass'])

.value('$datepickerSuppressError', false)

.value('$datepickerLiteralWarning', true)

.constant('uibDatepickerConfig', {
  datepickerMode: 'day',
  formatDay: 'dd',
  formatMonth: 'MMMM',
  formatYear: 'yyyy',
  formatDayHeader: 'EEE',
  formatDayTitle: 'MMMM yyyy',
  formatMonthTitle: 'yyyy',
  maxDate: null,
  maxMode: 'year',
  minDate: null,
  minMode: 'day',
  monthColumns: 3,
  ngModelOptions: {},
  shortcutPropagation: false,
  showWeeks: true,
  yearColumns: 5,
  yearRows: 4
})

.controller('UibDatepickerController', ['$scope', '$element', '$attrs', '$parse', '$interpolate', '$locale', '$log', 'dateFilter', 'uibDatepickerConfig', '$datepickerLiteralWarning', '$datepickerSuppressError', 'uibDateParser',
  function($scope, $element, $attrs, $parse, $interpolate, $locale, $log, dateFilter, datepickerConfig, $datepickerLiteralWarning, $datepickerSuppressError, dateParser) {
  var self = this,
      ngModelCtrl = { $setViewValue: angular.noop }, // nullModelCtrl;
      ngModelOptions = {},
      watchListeners = [];

  $element.addClass('uib-datepicker');
  $attrs.$set('role', 'application');

  if (!$scope.datepickerOptions) {
    $scope.datepickerOptions = {};
  }

  // Modes chain
  this.modes = ['day', 'month', 'year'];

  [
    'customClass',
    'dateDisabled',
    'datepickerMode',
    'formatDay',
    'formatDayHeader',
    'formatDayTitle',
    'formatMonth',
    'formatMonthTitle',
    'formatYear',
    'maxDate',
    'maxMode',
    'minDate',
    'minMode',
    'monthColumns',
    'showWeeks',
    'shortcutPropagation',
    'startingDay',
    'yearColumns',
    'yearRows'
  ].forEach(function(key) {
    switch (key) {
      case 'customClass':
      case 'dateDisabled':
        $scope[key] = $scope.datepickerOptions[key] || angular.noop;
        break;
      case 'datepickerMode':
        $scope.datepickerMode = angular.isDefined($scope.datepickerOptions.datepickerMode) ?
          $scope.datepickerOptions.datepickerMode : datepickerConfig.datepickerMode;
        break;
      case 'formatDay':
      case 'formatDayHeader':
      case 'formatDayTitle':
      case 'formatMonth':
      case 'formatMonthTitle':
      case 'formatYear':
        self[key] = angular.isDefined($scope.datepickerOptions[key]) ?
          $interpolate($scope.datepickerOptions[key])($scope.$parent) :
          datepickerConfig[key];
        break;
      case 'monthColumns':
      case 'showWeeks':
      case 'shortcutPropagation':
      case 'yearColumns':
      case 'yearRows':
        self[key] = angular.isDefined($scope.datepickerOptions[key]) ?
          $scope.datepickerOptions[key] : datepickerConfig[key];
        break;
      case 'startingDay':
        if (angular.isDefined($scope.datepickerOptions.startingDay)) {
          self.startingDay = $scope.datepickerOptions.startingDay;
        } else if (angular.isNumber(datepickerConfig.startingDay)) {
          self.startingDay = datepickerConfig.startingDay;
        } else {
          self.startingDay = ($locale.DATETIME_FORMATS.FIRSTDAYOFWEEK + 8) % 7;
        }

        break;
      case 'maxDate':
      case 'minDate':
        $scope.$watch('datepickerOptions.' + key, function(value) {
          if (value) {
            if (angular.isDate(value)) {
              self[key] = dateParser.fromTimezone(new Date(value), ngModelOptions.getOption('timezone'));
            } else {
              if ($datepickerLiteralWarning) {
                $log.warn('Literal date support has been deprecated, please switch to date object usage');
              }

              self[key] = new Date(dateFilter(value, 'medium'));
            }
          } else {
            self[key] = datepickerConfig[key] ?
              dateParser.fromTimezone(new Date(datepickerConfig[key]), ngModelOptions.getOption('timezone')) :
              null;
          }

          self.refreshView();
        });

        break;
      case 'maxMode':
      case 'minMode':
        if ($scope.datepickerOptions[key]) {
          $scope.$watch(function() { return $scope.datepickerOptions[key]; }, function(value) {
            self[key] = $scope[key] = angular.isDefined(value) ? value : $scope.datepickerOptions[key];
            if (key === 'minMode' && self.modes.indexOf($scope.datepickerOptions.datepickerMode) < self.modes.indexOf(self[key]) ||
              key === 'maxMode' && self.modes.indexOf($scope.datepickerOptions.datepickerMode) > self.modes.indexOf(self[key])) {
              $scope.datepickerMode = self[key];
              $scope.datepickerOptions.datepickerMode = self[key];
            }
          });
        } else {
          self[key] = $scope[key] = datepickerConfig[key] || null;
        }

        break;
    }
  });

  $scope.uniqueId = 'datepicker-' + $scope.$id + '-' + Math.floor(Math.random() * 10000);

  $scope.disabled = angular.isDefined($attrs.disabled) || false;
  if (angular.isDefined($attrs.ngDisabled)) {
    watchListeners.push($scope.$parent.$watch($attrs.ngDisabled, function(disabled) {
      $scope.disabled = disabled;
      self.refreshView();
    }));
  }

  $scope.isActive = function(dateObject) {
    if (self.compare(dateObject.date, self.activeDate) === 0) {
      $scope.activeDateId = dateObject.uid;
      return true;
    }
    return false;
  };

  this.init = function(ngModelCtrl_) {
    ngModelCtrl = ngModelCtrl_;
    ngModelOptions = extractOptions(ngModelCtrl);

    if ($scope.datepickerOptions.initDate) {
      self.activeDate = dateParser.fromTimezone($scope.datepickerOptions.initDate, ngModelOptions.getOption('timezone')) || new Date();
      $scope.$watch('datepickerOptions.initDate', function(initDate) {
        if (initDate && (ngModelCtrl.$isEmpty(ngModelCtrl.$modelValue) || ngModelCtrl.$invalid)) {
          self.activeDate = dateParser.fromTimezone(initDate, ngModelOptions.getOption('timezone'));
          self.refreshView();
        }
      });
    } else {
      self.activeDate = new Date();
    }

    var date = ngModelCtrl.$modelValue ? new Date(ngModelCtrl.$modelValue) : new Date();
    this.activeDate = !isNaN(date) ?
      dateParser.fromTimezone(date, ngModelOptions.getOption('timezone')) :
      dateParser.fromTimezone(new Date(), ngModelOptions.getOption('timezone'));

    ngModelCtrl.$render = function() {
      self.render();
    };
  };

  this.render = function() {
    if (ngModelCtrl.$viewValue) {
      var date = new Date(ngModelCtrl.$viewValue),
          isValid = !isNaN(date);

      if (isValid) {
        this.activeDate = dateParser.fromTimezone(date, ngModelOptions.getOption('timezone'));
      } else if (!$datepickerSuppressError) {
        $log.error('Datepicker directive: "ng-model" value must be a Date object');
      }
    }
    this.refreshView();
  };

  this.refreshView = function() {
    if (this.element) {
      $scope.selectedDt = null;
      this._refreshView();
      if ($scope.activeDt) {
        $scope.activeDateId = $scope.activeDt.uid;
      }

      var date = ngModelCtrl.$viewValue ? new Date(ngModelCtrl.$viewValue) : null;
      date = dateParser.fromTimezone(date, ngModelOptions.getOption('timezone'));
      ngModelCtrl.$setValidity('dateDisabled', !date ||
        this.element && !this.isDisabled(date));
    }
  };

  this.createDateObject = function(date, format) {
    var model = ngModelCtrl.$viewValue ? new Date(ngModelCtrl.$viewValue) : null;
    model = dateParser.fromTimezone(model, ngModelOptions.getOption('timezone'));
    var today = new Date();
    today = dateParser.fromTimezone(today, ngModelOptions.getOption('timezone'));
    var time = this.compare(date, today);
    var dt = {
      date: date,
      label: dateParser.filter(date, format),
      selected: model && this.compare(date, model) === 0,
      disabled: this.isDisabled(date),
      past: time < 0,
      current: time === 0,
      future: time > 0,
      customClass: this.customClass(date) || null
    };

    if (model && this.compare(date, model) === 0) {
      $scope.selectedDt = dt;
    }

    if (self.activeDate && this.compare(dt.date, self.activeDate) === 0) {
      $scope.activeDt = dt;
    }

    return dt;
  };

  this.isDisabled = function(date) {
    return $scope.disabled ||
      this.minDate && this.compare(date, this.minDate) < 0 ||
      this.maxDate && this.compare(date, this.maxDate) > 0 ||
      $scope.dateDisabled && $scope.dateDisabled({date: date, mode: $scope.datepickerMode});
  };

  this.customClass = function(date) {
    return $scope.customClass({date: date, mode: $scope.datepickerMode});
  };

  // Split array into smaller arrays
  this.split = function(arr, size) {
    var arrays = [];
    while (arr.length > 0) {
      arrays.push(arr.splice(0, size));
    }
    return arrays;
  };

  $scope.select = function(date) {
    if ($scope.datepickerMode === self.minMode) {
      var dt = ngModelCtrl.$viewValue ? dateParser.fromTimezone(new Date(ngModelCtrl.$viewValue), ngModelOptions.getOption('timezone')) : new Date(0, 0, 0, 0, 0, 0, 0);
      dt.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
      dt = dateParser.toTimezone(dt, ngModelOptions.getOption('timezone'));
      ngModelCtrl.$setViewValue(dt);
      ngModelCtrl.$render();
    } else {
      self.activeDate = date;
      setMode(self.modes[self.modes.indexOf($scope.datepickerMode) - 1]);

      $scope.$emit('uib:datepicker.mode');
    }

    $scope.$broadcast('uib:datepicker.focus');
  };

  $scope.move = function(direction) {
    var year = self.activeDate.getFullYear() + direction * (self.step.years || 0),
        month = self.activeDate.getMonth() + direction * (self.step.months || 0);
    self.activeDate.setFullYear(year, month, 1);
    self.refreshView();
  };

  $scope.toggleMode = function(direction) {
    direction = direction || 1;

    if ($scope.datepickerMode === self.maxMode && direction === 1 ||
      $scope.datepickerMode === self.minMode && direction === -1) {
      return;
    }

    setMode(self.modes[self.modes.indexOf($scope.datepickerMode) + direction]);

    $scope.$emit('uib:datepicker.mode');
  };

  // Key event mapper
  $scope.keys = { 13: 'enter', 32: 'space', 33: 'pageup', 34: 'pagedown', 35: 'end', 36: 'home', 37: 'left', 38: 'up', 39: 'right', 40: 'down' };

  var focusElement = function() {
    self.element[0].focus();
  };

  // Listen for focus requests from popup directive
  $scope.$on('uib:datepicker.focus', focusElement);

  $scope.keydown = function(evt) {
    var key = $scope.keys[evt.which];

    if (!key || evt.shiftKey || evt.altKey || $scope.disabled) {
      return;
    }

    evt.preventDefault();
    if (!self.shortcutPropagation) {
      evt.stopPropagation();
    }

    if (key === 'enter' || key === 'space') {
      if (self.isDisabled(self.activeDate)) {
        return; // do nothing
      }
      $scope.select(self.activeDate);
    } else if (evt.ctrlKey && (key === 'up' || key === 'down')) {
      $scope.toggleMode(key === 'up' ? 1 : -1);
    } else {
      self.handleKeyDown(key, evt);
      self.refreshView();
    }
  };

  $element.on('keydown', function(evt) {
    $scope.$apply(function() {
      $scope.keydown(evt);
    });
  });

  $scope.$on('$destroy', function() {
    //Clear all watch listeners on destroy
    while (watchListeners.length) {
      watchListeners.shift()();
    }
  });

  function setMode(mode) {
    $scope.datepickerMode = mode;
    $scope.datepickerOptions.datepickerMode = mode;
  }

  function extractOptions(ngModelCtrl) {
    var ngModelOptions;

    if (angular.version.minor < 6) { // in angular < 1.6 $options could be missing
      // guarantee a value
      ngModelOptions = ngModelCtrl.$options ||
        $scope.datepickerOptions.ngModelOptions ||
        datepickerConfig.ngModelOptions ||
        {};

      // mimic 1.6+ api
      ngModelOptions.getOption = function (key) {
        return ngModelOptions[key];
      };
    } else { // in angular >=1.6 $options is always present
      // ng-model-options defaults timezone to null; don't let its precedence squash a non-null value
      var timezone = ngModelCtrl.$options.getOption('timezone') ||
        ($scope.datepickerOptions.ngModelOptions ? $scope.datepickerOptions.ngModelOptions.timezone : null) ||
        (datepickerConfig.ngModelOptions ? datepickerConfig.ngModelOptions.timezone : null);

      // values passed to createChild override existing values
      ngModelOptions = ngModelCtrl.$options // start with a ModelOptions instance
        .createChild(datepickerConfig.ngModelOptions) // lowest precedence
        .createChild($scope.datepickerOptions.ngModelOptions)
        .createChild(ngModelCtrl.$options) // highest precedence
        .createChild({timezone: timezone}); // to keep from squashing a non-null value
    }

    return ngModelOptions;
  }
}])

.controller('UibDaypickerController', ['$scope', '$element', 'dateFilter', function(scope, $element, dateFilter) {
  var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  this.step = { months: 1 };
  this.element = $element;
  function getDaysInMonth(year, month) {
    return month === 1 && year % 4 === 0 &&
      (year % 100 !== 0 || year % 400 === 0) ? 29 : DAYS_IN_MONTH[month];
  }

  this.init = function(ctrl) {
    angular.extend(ctrl, this);
    scope.showWeeks = ctrl.showWeeks;
    ctrl.refreshView();
  };

  this.getDates = function(startDate, n) {
    var dates = new Array(n), current = new Date(startDate), i = 0, date;
    while (i < n) {
      date = new Date(current);
      dates[i++] = date;
      current.setDate(current.getDate() + 1);
    }
    return dates;
  };

  this._refreshView = function() {
    var year = this.activeDate.getFullYear(),
      month = this.activeDate.getMonth(),
      firstDayOfMonth = new Date(this.activeDate);

    firstDayOfMonth.setFullYear(year, month, 1);

    var difference = this.startingDay - firstDayOfMonth.getDay(),
      numDisplayedFromPreviousMonth = difference > 0 ?
        7 - difference : - difference,
      firstDate = new Date(firstDayOfMonth);

    if (numDisplayedFromPreviousMonth > 0) {
      firstDate.setDate(-numDisplayedFromPreviousMonth + 1);
    }

    // 42 is the number of days on a six-week calendar
    var days = this.getDates(firstDate, 42);
    for (var i = 0; i < 42; i ++) {
      days[i] = angular.extend(this.createDateObject(days[i], this.formatDay), {
        secondary: days[i].getMonth() !== month,
        uid: scope.uniqueId + '-' + i
      });
    }

    scope.labels = new Array(7);
    for (var j = 0; j < 7; j++) {
      scope.labels[j] = {
        abbr: dateFilter(days[j].date, this.formatDayHeader),
        full: dateFilter(days[j].date, 'EEEE')
      };
    }

    scope.title = dateFilter(this.activeDate, this.formatDayTitle);
    scope.rows = this.split(days, 7);

    if (scope.showWeeks) {
      scope.weekNumbers = [];
      var thursdayIndex = (4 + 7 - this.startingDay) % 7,
          numWeeks = scope.rows.length;
      for (var curWeek = 0; curWeek < numWeeks; curWeek++) {
        scope.weekNumbers.push(
          getISO8601WeekNumber(scope.rows[curWeek][thursdayIndex].date));
      }
    }
  };

  this.compare = function(date1, date2) {
    var _date1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    var _date2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
    _date1.setFullYear(date1.getFullYear());
    _date2.setFullYear(date2.getFullYear());
    return _date1 - _date2;
  };

  function getISO8601WeekNumber(date) {
    var checkDate = new Date(date);
    checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7)); // Thursday
    var time = checkDate.getTime();
    checkDate.setMonth(0); // Compare with Jan 1
    checkDate.setDate(1);
    return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
  }

  this.handleKeyDown = function(key, evt) {
    var date = this.activeDate.getDate();

    if (key === 'left') {
      date = date - 1;
    } else if (key === 'up') {
      date = date - 7;
    } else if (key === 'right') {
      date = date + 1;
    } else if (key === 'down') {
      date = date + 7;
    } else if (key === 'pageup' || key === 'pagedown') {
      var month = this.activeDate.getMonth() + (key === 'pageup' ? - 1 : 1);
      this.activeDate.setMonth(month, 1);
      date = Math.min(getDaysInMonth(this.activeDate.getFullYear(), this.activeDate.getMonth()), date);
    } else if (key === 'home') {
      date = 1;
    } else if (key === 'end') {
      date = getDaysInMonth(this.activeDate.getFullYear(), this.activeDate.getMonth());
    }
    this.activeDate.setDate(date);
  };
}])

.controller('UibMonthpickerController', ['$scope', '$element', 'dateFilter', function(scope, $element, dateFilter) {
  this.step = { years: 1 };
  this.element = $element;

  this.init = function(ctrl) {
    angular.extend(ctrl, this);
    ctrl.refreshView();
  };

  this._refreshView = function() {
    var months = new Array(12),
        year = this.activeDate.getFullYear(),
        date;

    for (var i = 0; i < 12; i++) {
      date = new Date(this.activeDate);
      date.setFullYear(year, i, 1);
      months[i] = angular.extend(this.createDateObject(date, this.formatMonth), {
        uid: scope.uniqueId + '-' + i
      });
    }

    scope.title = dateFilter(this.activeDate, this.formatMonthTitle);
    scope.rows = this.split(months, this.monthColumns);
    scope.yearHeaderColspan = this.monthColumns > 3 ? this.monthColumns - 2 : 1;
  };

  this.compare = function(date1, date2) {
    var _date1 = new Date(date1.getFullYear(), date1.getMonth());
    var _date2 = new Date(date2.getFullYear(), date2.getMonth());
    _date1.setFullYear(date1.getFullYear());
    _date2.setFullYear(date2.getFullYear());
    return _date1 - _date2;
  };

  this.handleKeyDown = function(key, evt) {
    var date = this.activeDate.getMonth();

    if (key === 'left') {
      date = date - 1;
    } else if (key === 'up') {
      date = date - this.monthColumns;
    } else if (key === 'right') {
      date = date + 1;
    } else if (key === 'down') {
      date = date + this.monthColumns;
    } else if (key === 'pageup' || key === 'pagedown') {
      var year = this.activeDate.getFullYear() + (key === 'pageup' ? - 1 : 1);
      this.activeDate.setFullYear(year);
    } else if (key === 'home') {
      date = 0;
    } else if (key === 'end') {
      date = 11;
    }
    this.activeDate.setMonth(date);
  };
}])

.controller('UibYearpickerController', ['$scope', '$element', 'dateFilter', function(scope, $element, dateFilter) {
  var columns, range;
  this.element = $element;

  function getStartingYear(year) {
    return parseInt((year - 1) / range, 10) * range + 1;
  }

  this.yearpickerInit = function() {
    columns = this.yearColumns;
    range = this.yearRows * columns;
    this.step = { years: range };
  };

  this._refreshView = function() {
    var years = new Array(range), date;

    for (var i = 0, start = getStartingYear(this.activeDate.getFullYear()); i < range; i++) {
      date = new Date(this.activeDate);
      date.setFullYear(start + i, 0, 1);
      years[i] = angular.extend(this.createDateObject(date, this.formatYear), {
        uid: scope.uniqueId + '-' + i
      });
    }

    scope.title = [years[0].label, years[range - 1].label].join(' - ');
    scope.rows = this.split(years, columns);
    scope.columns = columns;
  };

  this.compare = function(date1, date2) {
    return date1.getFullYear() - date2.getFullYear();
  };

  this.handleKeyDown = function(key, evt) {
    var date = this.activeDate.getFullYear();

    if (key === 'left') {
      date = date - 1;
    } else if (key === 'up') {
      date = date - columns;
    } else if (key === 'right') {
      date = date + 1;
    } else if (key === 'down') {
      date = date + columns;
    } else if (key === 'pageup' || key === 'pagedown') {
      date += (key === 'pageup' ? - 1 : 1) * range;
    } else if (key === 'home') {
      date = getStartingYear(this.activeDate.getFullYear());
    } else if (key === 'end') {
      date = getStartingYear(this.activeDate.getFullYear()) + range - 1;
    }
    this.activeDate.setFullYear(date);
  };
}])

.directive('uibDatepicker', function() {
  return {
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'uib/template/datepicker/datepicker.html';
    },
    scope: {
      datepickerOptions: '=?'
    },
    require: ['uibDatepicker', '^ngModel'],
    restrict: 'A',
    controller: 'UibDatepickerController',
    controllerAs: 'datepicker',
    link: function(scope, element, attrs, ctrls) {
      var datepickerCtrl = ctrls[0], ngModelCtrl = ctrls[1];

      datepickerCtrl.init(ngModelCtrl);
    }
  };
})

.directive('uibDaypicker', function() {
  return {
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'uib/template/datepicker/day.html';
    },
    require: ['^uibDatepicker', 'uibDaypicker'],
    restrict: 'A',
    controller: 'UibDaypickerController',
    link: function(scope, element, attrs, ctrls) {
      var datepickerCtrl = ctrls[0],
        daypickerCtrl = ctrls[1];

      daypickerCtrl.init(datepickerCtrl);
    }
  };
})

.directive('uibMonthpicker', function() {
  return {
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'uib/template/datepicker/month.html';
    },
    require: ['^uibDatepicker', 'uibMonthpicker'],
    restrict: 'A',
    controller: 'UibMonthpickerController',
    link: function(scope, element, attrs, ctrls) {
      var datepickerCtrl = ctrls[0],
        monthpickerCtrl = ctrls[1];

      monthpickerCtrl.init(datepickerCtrl);
    }
  };
})

.directive('uibYearpicker', function() {
  return {
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'uib/template/datepicker/year.html';
    },
    require: ['^uibDatepicker', 'uibYearpicker'],
    restrict: 'A',
    controller: 'UibYearpickerController',
    link: function(scope, element, attrs, ctrls) {
      var ctrl = ctrls[0];
      angular.extend(ctrl, ctrls[1]);
      ctrl.yearpickerInit();

      ctrl.refreshView();
    }
  };
});

angular.module('ui.bootstrap.position', [])

/**
 * A set of utility methods for working with the DOM.
 * It is meant to be used where we need to absolute-position elements in
 * relation to another element (this is the case for tooltips, popovers,
 * typeahead suggestions etc.).
 */
  .factory('$uibPosition', ['$document', '$window', function($document, $window) {
    /**
     * Used by scrollbarWidth() function to cache scrollbar's width.
     * Do not access this variable directly, use scrollbarWidth() instead.
     */
    var SCROLLBAR_WIDTH;
    /**
     * scrollbar on body and html element in IE and Edge overlay
     * content and should be considered 0 width.
     */
    var BODY_SCROLLBAR_WIDTH;
    var OVERFLOW_REGEX = {
      normal: /(auto|scroll)/,
      hidden: /(auto|scroll|hidden)/
    };
    var PLACEMENT_REGEX = {
      auto: /\s?auto?\s?/i,
      primary: /^(top|bottom|left|right)$/,
      secondary: /^(top|bottom|left|right|center)$/,
      vertical: /^(top|bottom)$/
    };
    var BODY_REGEX = /(HTML|BODY)/;

    return {

      /**
       * Provides a raw DOM element from a jQuery/jQLite element.
       *
       * @param {element} elem - The element to convert.
       *
       * @returns {element} A HTML element.
       */
      getRawNode: function(elem) {
        return elem.nodeName ? elem : elem[0] || elem;
      },

      /**
       * Provides a parsed number for a style property.  Strips
       * units and casts invalid numbers to 0.
       *
       * @param {string} value - The style value to parse.
       *
       * @returns {number} A valid number.
       */
      parseStyle: function(value) {
        value = parseFloat(value);
        return isFinite(value) ? value : 0;
      },

      /**
       * Provides the closest positioned ancestor.
       *
       * @param {element} element - The element to get the offest parent for.
       *
       * @returns {element} The closest positioned ancestor.
       */
      offsetParent: function(elem) {
        elem = this.getRawNode(elem);

        var offsetParent = elem.offsetParent || $document[0].documentElement;

        function isStaticPositioned(el) {
          return ($window.getComputedStyle(el).position || 'static') === 'static';
        }

        while (offsetParent && offsetParent !== $document[0].documentElement && isStaticPositioned(offsetParent)) {
          offsetParent = offsetParent.offsetParent;
        }

        return offsetParent || $document[0].documentElement;
      },

      /**
       * Provides the scrollbar width, concept from TWBS measureScrollbar()
       * function in https://github.com/twbs/bootstrap/blob/master/js/modal.js
       * In IE and Edge, scollbar on body and html element overlay and should
       * return a width of 0.
       *
       * @returns {number} The width of the browser scollbar.
       */
      scrollbarWidth: function(isBody) {
        if (isBody) {
          if (angular.isUndefined(BODY_SCROLLBAR_WIDTH)) {
            var bodyElem = $document.find('body');
            bodyElem.addClass('uib-position-body-scrollbar-measure');
            BODY_SCROLLBAR_WIDTH = $window.innerWidth - bodyElem[0].clientWidth;
            BODY_SCROLLBAR_WIDTH = isFinite(BODY_SCROLLBAR_WIDTH) ? BODY_SCROLLBAR_WIDTH : 0;
            bodyElem.removeClass('uib-position-body-scrollbar-measure');
          }
          return BODY_SCROLLBAR_WIDTH;
        }

        if (angular.isUndefined(SCROLLBAR_WIDTH)) {
          var scrollElem = angular.element('<div class="uib-position-scrollbar-measure"></div>');
          $document.find('body').append(scrollElem);
          SCROLLBAR_WIDTH = scrollElem[0].offsetWidth - scrollElem[0].clientWidth;
          SCROLLBAR_WIDTH = isFinite(SCROLLBAR_WIDTH) ? SCROLLBAR_WIDTH : 0;
          scrollElem.remove();
        }

        return SCROLLBAR_WIDTH;
      },

      /**
       * Provides the padding required on an element to replace the scrollbar.
       *
       * @returns {object} An object with the following properties:
       *   <ul>
       *     <li>**scrollbarWidth**: the width of the scrollbar</li>
       *     <li>**widthOverflow**: whether the the width is overflowing</li>
       *     <li>**right**: the amount of right padding on the element needed to replace the scrollbar</li>
       *     <li>**rightOriginal**: the amount of right padding currently on the element</li>
       *     <li>**heightOverflow**: whether the the height is overflowing</li>
       *     <li>**bottom**: the amount of bottom padding on the element needed to replace the scrollbar</li>
       *     <li>**bottomOriginal**: the amount of bottom padding currently on the element</li>
       *   </ul>
       */
      scrollbarPadding: function(elem) {
        elem = this.getRawNode(elem);

        var elemStyle = $window.getComputedStyle(elem);
        var paddingRight = this.parseStyle(elemStyle.paddingRight);
        var paddingBottom = this.parseStyle(elemStyle.paddingBottom);
        var scrollParent = this.scrollParent(elem, false, true);
        var scrollbarWidth = this.scrollbarWidth(BODY_REGEX.test(scrollParent.tagName));

        return {
          scrollbarWidth: scrollbarWidth,
          widthOverflow: scrollParent.scrollWidth > scrollParent.clientWidth,
          right: paddingRight + scrollbarWidth,
          originalRight: paddingRight,
          heightOverflow: scrollParent.scrollHeight > scrollParent.clientHeight,
          bottom: paddingBottom + scrollbarWidth,
          originalBottom: paddingBottom
         };
      },

      /**
       * Checks to see if the element is scrollable.
       *
       * @param {element} elem - The element to check.
       * @param {boolean=} [includeHidden=false] - Should scroll style of 'hidden' be considered,
       *   default is false.
       *
       * @returns {boolean} Whether the element is scrollable.
       */
      isScrollable: function(elem, includeHidden) {
        elem = this.getRawNode(elem);

        var overflowRegex = includeHidden ? OVERFLOW_REGEX.hidden : OVERFLOW_REGEX.normal;
        var elemStyle = $window.getComputedStyle(elem);
        return overflowRegex.test(elemStyle.overflow + elemStyle.overflowY + elemStyle.overflowX);
      },

      /**
       * Provides the closest scrollable ancestor.
       * A port of the jQuery UI scrollParent method:
       * https://github.com/jquery/jquery-ui/blob/master/ui/scroll-parent.js
       *
       * @param {element} elem - The element to find the scroll parent of.
       * @param {boolean=} [includeHidden=false] - Should scroll style of 'hidden' be considered,
       *   default is false.
       * @param {boolean=} [includeSelf=false] - Should the element being passed be
       * included in the scrollable llokup.
       *
       * @returns {element} A HTML element.
       */
      scrollParent: function(elem, includeHidden, includeSelf) {
        elem = this.getRawNode(elem);

        var overflowRegex = includeHidden ? OVERFLOW_REGEX.hidden : OVERFLOW_REGEX.normal;
        var documentEl = $document[0].documentElement;
        var elemStyle = $window.getComputedStyle(elem);
        if (includeSelf && overflowRegex.test(elemStyle.overflow + elemStyle.overflowY + elemStyle.overflowX)) {
          return elem;
        }
        var excludeStatic = elemStyle.position === 'absolute';
        var scrollParent = elem.parentElement || documentEl;

        if (scrollParent === documentEl || elemStyle.position === 'fixed') {
          return documentEl;
        }

        while (scrollParent.parentElement && scrollParent !== documentEl) {
          var spStyle = $window.getComputedStyle(scrollParent);
          if (excludeStatic && spStyle.position !== 'static') {
            excludeStatic = false;
          }

          if (!excludeStatic && overflowRegex.test(spStyle.overflow + spStyle.overflowY + spStyle.overflowX)) {
            break;
          }
          scrollParent = scrollParent.parentElement;
        }

        return scrollParent;
      },

      /**
       * Provides read-only equivalent of jQuery's position function:
       * http://api.jquery.com/position/ - distance to closest positioned
       * ancestor.  Does not account for margins by default like jQuery position.
       *
       * @param {element} elem - The element to caclulate the position on.
       * @param {boolean=} [includeMargins=false] - Should margins be accounted
       * for, default is false.
       *
       * @returns {object} An object with the following properties:
       *   <ul>
       *     <li>**width**: the width of the element</li>
       *     <li>**height**: the height of the element</li>
       *     <li>**top**: distance to top edge of offset parent</li>
       *     <li>**left**: distance to left edge of offset parent</li>
       *   </ul>
       */
      position: function(elem, includeMagins) {
        elem = this.getRawNode(elem);

        var elemOffset = this.offset(elem);
        if (includeMagins) {
          var elemStyle = $window.getComputedStyle(elem);
          elemOffset.top -= this.parseStyle(elemStyle.marginTop);
          elemOffset.left -= this.parseStyle(elemStyle.marginLeft);
        }
        var parent = this.offsetParent(elem);
        var parentOffset = {top: 0, left: 0};

        if (parent !== $document[0].documentElement) {
          parentOffset = this.offset(parent);
          parentOffset.top += parent.clientTop - parent.scrollTop;
          parentOffset.left += parent.clientLeft - parent.scrollLeft;
        }

        return {
          width: Math.round(angular.isNumber(elemOffset.width) ? elemOffset.width : elem.offsetWidth),
          height: Math.round(angular.isNumber(elemOffset.height) ? elemOffset.height : elem.offsetHeight),
          top: Math.round(elemOffset.top - parentOffset.top),
          left: Math.round(elemOffset.left - parentOffset.left)
        };
      },

      /**
       * Provides read-only equivalent of jQuery's offset function:
       * http://api.jquery.com/offset/ - distance to viewport.  Does
       * not account for borders, margins, or padding on the body
       * element.
       *
       * @param {element} elem - The element to calculate the offset on.
       *
       * @returns {object} An object with the following properties:
       *   <ul>
       *     <li>**width**: the width of the element</li>
       *     <li>**height**: the height of the element</li>
       *     <li>**top**: distance to top edge of viewport</li>
       *     <li>**right**: distance to bottom edge of viewport</li>
       *   </ul>
       */
      offset: function(elem) {
        elem = this.getRawNode(elem);

        var elemBCR = elem.getBoundingClientRect();
        return {
          width: Math.round(angular.isNumber(elemBCR.width) ? elemBCR.width : elem.offsetWidth),
          height: Math.round(angular.isNumber(elemBCR.height) ? elemBCR.height : elem.offsetHeight),
          top: Math.round(elemBCR.top + ($window.pageYOffset || $document[0].documentElement.scrollTop)),
          left: Math.round(elemBCR.left + ($window.pageXOffset || $document[0].documentElement.scrollLeft))
        };
      },

      /**
       * Provides offset distance to the closest scrollable ancestor
       * or viewport.  Accounts for border and scrollbar width.
       *
       * Right and bottom dimensions represent the distance to the
       * respective edge of the viewport element.  If the element
       * edge extends beyond the viewport, a negative value will be
       * reported.
       *
       * @param {element} elem - The element to get the viewport offset for.
       * @param {boolean=} [useDocument=false] - Should the viewport be the document element instead
       * of the first scrollable element, default is false.
       * @param {boolean=} [includePadding=true] - Should the padding on the offset parent element
       * be accounted for, default is true.
       *
       * @returns {object} An object with the following properties:
       *   <ul>
       *     <li>**top**: distance to the top content edge of viewport element</li>
       *     <li>**bottom**: distance to the bottom content edge of viewport element</li>
       *     <li>**left**: distance to the left content edge of viewport element</li>
       *     <li>**right**: distance to the right content edge of viewport element</li>
       *   </ul>
       */
      viewportOffset: function(elem, useDocument, includePadding) {
        elem = this.getRawNode(elem);
        includePadding = includePadding !== false ? true : false;

        var elemBCR = elem.getBoundingClientRect();
        var offsetBCR = {top: 0, left: 0, bottom: 0, right: 0};

        var offsetParent = useDocument ? $document[0].documentElement : this.scrollParent(elem);
        var offsetParentBCR = offsetParent.getBoundingClientRect();

        offsetBCR.top = offsetParentBCR.top + offsetParent.clientTop;
        offsetBCR.left = offsetParentBCR.left + offsetParent.clientLeft;
        if (offsetParent === $document[0].documentElement) {
          offsetBCR.top += $window.pageYOffset;
          offsetBCR.left += $window.pageXOffset;
        }
        offsetBCR.bottom = offsetBCR.top + offsetParent.clientHeight;
        offsetBCR.right = offsetBCR.left + offsetParent.clientWidth;

        if (includePadding) {
          var offsetParentStyle = $window.getComputedStyle(offsetParent);
          offsetBCR.top += this.parseStyle(offsetParentStyle.paddingTop);
          offsetBCR.bottom -= this.parseStyle(offsetParentStyle.paddingBottom);
          offsetBCR.left += this.parseStyle(offsetParentStyle.paddingLeft);
          offsetBCR.right -= this.parseStyle(offsetParentStyle.paddingRight);
        }

        return {
          top: Math.round(elemBCR.top - offsetBCR.top),
          bottom: Math.round(offsetBCR.bottom - elemBCR.bottom),
          left: Math.round(elemBCR.left - offsetBCR.left),
          right: Math.round(offsetBCR.right - elemBCR.right)
        };
      },

      /**
       * Provides an array of placement values parsed from a placement string.
       * Along with the 'auto' indicator, supported placement strings are:
       *   <ul>
       *     <li>top: element on top, horizontally centered on host element.</li>
       *     <li>top-left: element on top, left edge aligned with host element left edge.</li>
       *     <li>top-right: element on top, lerightft edge aligned with host element right edge.</li>
       *     <li>bottom: element on bottom, horizontally centered on host element.</li>
       *     <li>bottom-left: element on bottom, left edge aligned with host element left edge.</li>
       *     <li>bottom-right: element on bottom, right edge aligned with host element right edge.</li>
       *     <li>left: element on left, vertically centered on host element.</li>
       *     <li>left-top: element on left, top edge aligned with host element top edge.</li>
       *     <li>left-bottom: element on left, bottom edge aligned with host element bottom edge.</li>
       *     <li>right: element on right, vertically centered on host element.</li>
       *     <li>right-top: element on right, top edge aligned with host element top edge.</li>
       *     <li>right-bottom: element on right, bottom edge aligned with host element bottom edge.</li>
       *   </ul>
       * A placement string with an 'auto' indicator is expected to be
       * space separated from the placement, i.e: 'auto bottom-left'  If
       * the primary and secondary placement values do not match 'top,
       * bottom, left, right' then 'top' will be the primary placement and
       * 'center' will be the secondary placement.  If 'auto' is passed, true
       * will be returned as the 3rd value of the array.
       *
       * @param {string} placement - The placement string to parse.
       *
       * @returns {array} An array with the following values
       * <ul>
       *   <li>**[0]**: The primary placement.</li>
       *   <li>**[1]**: The secondary placement.</li>
       *   <li>**[2]**: If auto is passed: true, else undefined.</li>
       * </ul>
       */
      parsePlacement: function(placement) {
        var autoPlace = PLACEMENT_REGEX.auto.test(placement);
        if (autoPlace) {
          placement = placement.replace(PLACEMENT_REGEX.auto, '');
        }

        placement = placement.split('-');

        placement[0] = placement[0] || 'top';
        if (!PLACEMENT_REGEX.primary.test(placement[0])) {
          placement[0] = 'top';
        }

        placement[1] = placement[1] || 'center';
        if (!PLACEMENT_REGEX.secondary.test(placement[1])) {
          placement[1] = 'center';
        }

        if (autoPlace) {
          placement[2] = true;
        } else {
          placement[2] = false;
        }

        return placement;
      },

      /**
       * Provides coordinates for an element to be positioned relative to
       * another element.  Passing 'auto' as part of the placement parameter
       * will enable smart placement - where the element fits. i.e:
       * 'auto left-top' will check to see if there is enough space to the left
       * of the hostElem to fit the targetElem, if not place right (same for secondary
       * top placement).  Available space is calculated using the viewportOffset
       * function.
       *
       * @param {element} hostElem - The element to position against.
       * @param {element} targetElem - The element to position.
       * @param {string=} [placement=top] - The placement for the targetElem,
       *   default is 'top'. 'center' is assumed as secondary placement for
       *   'top', 'left', 'right', and 'bottom' placements.  Available placements are:
       *   <ul>
       *     <li>top</li>
       *     <li>top-right</li>
       *     <li>top-left</li>
       *     <li>bottom</li>
       *     <li>bottom-left</li>
       *     <li>bottom-right</li>
       *     <li>left</li>
       *     <li>left-top</li>
       *     <li>left-bottom</li>
       *     <li>right</li>
       *     <li>right-top</li>
       *     <li>right-bottom</li>
       *   </ul>
       * @param {boolean=} [appendToBody=false] - Should the top and left values returned
       *   be calculated from the body element, default is false.
       *
       * @returns {object} An object with the following properties:
       *   <ul>
       *     <li>**top**: Value for targetElem top.</li>
       *     <li>**left**: Value for targetElem left.</li>
       *     <li>**placement**: The resolved placement.</li>
       *   </ul>
       */
      positionElements: function(hostElem, targetElem, placement, appendToBody) {
        hostElem = this.getRawNode(hostElem);
        targetElem = this.getRawNode(targetElem);

        // need to read from prop to support tests.
        var targetWidth = angular.isDefined(targetElem.offsetWidth) ? targetElem.offsetWidth : targetElem.prop('offsetWidth');
        var targetHeight = angular.isDefined(targetElem.offsetHeight) ? targetElem.offsetHeight : targetElem.prop('offsetHeight');

        placement = this.parsePlacement(placement);

        var hostElemPos = appendToBody ? this.offset(hostElem) : this.position(hostElem);
        var targetElemPos = {top: 0, left: 0, placement: ''};

        if (placement[2]) {
          var viewportOffset = this.viewportOffset(hostElem, appendToBody);

          var targetElemStyle = $window.getComputedStyle(targetElem);
          var adjustedSize = {
            width: targetWidth + Math.round(Math.abs(this.parseStyle(targetElemStyle.marginLeft) + this.parseStyle(targetElemStyle.marginRight))),
            height: targetHeight + Math.round(Math.abs(this.parseStyle(targetElemStyle.marginTop) + this.parseStyle(targetElemStyle.marginBottom)))
          };

          placement[0] = placement[0] === 'top' && adjustedSize.height > viewportOffset.top && adjustedSize.height <= viewportOffset.bottom ? 'bottom' :
                         placement[0] === 'bottom' && adjustedSize.height > viewportOffset.bottom && adjustedSize.height <= viewportOffset.top ? 'top' :
                         placement[0] === 'left' && adjustedSize.width > viewportOffset.left && adjustedSize.width <= viewportOffset.right ? 'right' :
                         placement[0] === 'right' && adjustedSize.width > viewportOffset.right && adjustedSize.width <= viewportOffset.left ? 'left' :
                         placement[0];

          placement[1] = placement[1] === 'top' && adjustedSize.height - hostElemPos.height > viewportOffset.bottom && adjustedSize.height - hostElemPos.height <= viewportOffset.top ? 'bottom' :
                         placement[1] === 'bottom' && adjustedSize.height - hostElemPos.height > viewportOffset.top && adjustedSize.height - hostElemPos.height <= viewportOffset.bottom ? 'top' :
                         placement[1] === 'left' && adjustedSize.width - hostElemPos.width > viewportOffset.right && adjustedSize.width - hostElemPos.width <= viewportOffset.left ? 'right' :
                         placement[1] === 'right' && adjustedSize.width - hostElemPos.width > viewportOffset.left && adjustedSize.width - hostElemPos.width <= viewportOffset.right ? 'left' :
                         placement[1];

          if (placement[1] === 'center') {
            if (PLACEMENT_REGEX.vertical.test(placement[0])) {
              var xOverflow = hostElemPos.width / 2 - targetWidth / 2;
              if (viewportOffset.left + xOverflow < 0 && adjustedSize.width - hostElemPos.width <= viewportOffset.right) {
                placement[1] = 'left';
              } else if (viewportOffset.right + xOverflow < 0 && adjustedSize.width - hostElemPos.width <= viewportOffset.left) {
                placement[1] = 'right';
              }
            } else {
              var yOverflow = hostElemPos.height / 2 - adjustedSize.height / 2;
              if (viewportOffset.top + yOverflow < 0 && adjustedSize.height - hostElemPos.height <= viewportOffset.bottom) {
                placement[1] = 'top';
              } else if (viewportOffset.bottom + yOverflow < 0 && adjustedSize.height - hostElemPos.height <= viewportOffset.top) {
                placement[1] = 'bottom';
              }
            }
          }
        }

        switch (placement[0]) {
          case 'top':
            targetElemPos.top = hostElemPos.top - targetHeight;
            break;
          case 'bottom':
            targetElemPos.top = hostElemPos.top + hostElemPos.height;
            break;
          case 'left':
            targetElemPos.left = hostElemPos.left - targetWidth;
            break;
          case 'right':
            targetElemPos.left = hostElemPos.left + hostElemPos.width;
            break;
        }

        switch (placement[1]) {
          case 'top':
            targetElemPos.top = hostElemPos.top;
            break;
          case 'bottom':
            targetElemPos.top = hostElemPos.top + hostElemPos.height - targetHeight;
            break;
          case 'left':
            targetElemPos.left = hostElemPos.left;
            break;
          case 'right':
            targetElemPos.left = hostElemPos.left + hostElemPos.width - targetWidth;
            break;
          case 'center':
            if (PLACEMENT_REGEX.vertical.test(placement[0])) {
              targetElemPos.left = hostElemPos.left + hostElemPos.width / 2 - targetWidth / 2;
            } else {
              targetElemPos.top = hostElemPos.top + hostElemPos.height / 2 - targetHeight / 2;
            }
            break;
        }

        targetElemPos.top = Math.round(targetElemPos.top);
        targetElemPos.left = Math.round(targetElemPos.left);
        targetElemPos.placement = placement[1] === 'center' ? placement[0] : placement[0] + '-' + placement[1];

        return targetElemPos;
      },

      /**
       * Provides a way to adjust the top positioning after first
       * render to correctly align element to top after content
       * rendering causes resized element height
       *
       * @param {array} placementClasses - The array of strings of classes
       * element should have.
       * @param {object} containerPosition - The object with container
       * position information
       * @param {number} initialHeight - The initial height for the elem.
       * @param {number} currentHeight - The current height for the elem.
       */
      adjustTop: function(placementClasses, containerPosition, initialHeight, currentHeight) {
        if (placementClasses.indexOf('top') !== -1 && initialHeight !== currentHeight) {
          return {
            top: containerPosition.top - currentHeight + 'px'
          };
        }
      },

      /**
       * Provides a way for positioning tooltip & dropdown
       * arrows when using placement options beyond the standard
       * left, right, top, or bottom.
       *
       * @param {element} elem - The tooltip/dropdown element.
       * @param {string} placement - The placement for the elem.
       */
      positionArrow: function(elem, placement) {
        elem = this.getRawNode(elem);

        var innerElem = elem.querySelector('.tooltip-inner, .popover-inner');
        if (!innerElem) {
          return;
        }

        var isTooltip = angular.element(innerElem).hasClass('tooltip-inner');

        var arrowElem = isTooltip ? elem.querySelector('.tooltip-arrow') : elem.querySelector('.arrow');
        if (!arrowElem) {
          return;
        }

        var arrowCss = {
          top: '',
          bottom: '',
          left: '',
          right: ''
        };

        placement = this.parsePlacement(placement);
        if (placement[1] === 'center') {
          // no adjustment necessary - just reset styles
          angular.element(arrowElem).css(arrowCss);
          return;
        }

        var borderProp = 'border-' + placement[0] + '-width';
        var borderWidth = $window.getComputedStyle(arrowElem)[borderProp];

        var borderRadiusProp = 'border-';
        if (PLACEMENT_REGEX.vertical.test(placement[0])) {
          borderRadiusProp += placement[0] + '-' + placement[1];
        } else {
          borderRadiusProp += placement[1] + '-' + placement[0];
        }
        borderRadiusProp += '-radius';
        var borderRadius = $window.getComputedStyle(isTooltip ? innerElem : elem)[borderRadiusProp];

        switch (placement[0]) {
          case 'top':
            arrowCss.bottom = isTooltip ? '0' : '-' + borderWidth;
            break;
          case 'bottom':
            arrowCss.top = isTooltip ? '0' : '-' + borderWidth;
            break;
          case 'left':
            arrowCss.right = isTooltip ? '0' : '-' + borderWidth;
            break;
          case 'right':
            arrowCss.left = isTooltip ? '0' : '-' + borderWidth;
            break;
        }

        arrowCss[placement[1]] = borderRadius;

        angular.element(arrowElem).css(arrowCss);
      }
    };
  }]);

angular.module('ui.bootstrap.datepickerPopup', ['ui.bootstrap.datepicker', 'ui.bootstrap.position'])

.value('$datepickerPopupLiteralWarning', true)

.constant('uibDatepickerPopupConfig', {
  altInputFormats: [],
  appendToBody: false,
  clearText: 'Clear',
  closeOnDateSelection: true,
  closeText: 'Done',
  currentText: 'Today',
  datepickerPopup: 'yyyy-MM-dd',
  datepickerPopupTemplateUrl: 'uib/template/datepickerPopup/popup.html',
  datepickerTemplateUrl: 'uib/template/datepicker/datepicker.html',
  html5Types: {
    date: 'yyyy-MM-dd',
    'datetime-local': 'yyyy-MM-ddTHH:mm:ss.sss',
    'month': 'yyyy-MM'
  },
  onOpenFocus: true,
  showButtonBar: true,
  placement: 'auto bottom-left'
})

.controller('UibDatepickerPopupController', ['$scope', '$element', '$attrs', '$compile', '$log', '$parse', '$window', '$document', '$rootScope', '$uibPosition', 'dateFilter', 'uibDateParser', 'uibDatepickerPopupConfig', '$timeout', 'uibDatepickerConfig', '$datepickerPopupLiteralWarning',
function($scope, $element, $attrs, $compile, $log, $parse, $window, $document, $rootScope, $position, dateFilter, dateParser, datepickerPopupConfig, $timeout, datepickerConfig, $datepickerPopupLiteralWarning) {
  var cache = {},
    isHtml5DateInput = false;
  var dateFormat, closeOnDateSelection, appendToBody, onOpenFocus,
    datepickerPopupTemplateUrl, datepickerTemplateUrl, popupEl, datepickerEl, scrollParentEl,
    ngModel, ngModelOptions, $popup, altInputFormats, watchListeners = [];

  this.init = function(_ngModel_) {
    ngModel = _ngModel_;
    ngModelOptions = extractOptions(ngModel);
    closeOnDateSelection = angular.isDefined($attrs.closeOnDateSelection) ?
      $scope.$parent.$eval($attrs.closeOnDateSelection) :
      datepickerPopupConfig.closeOnDateSelection;
    appendToBody = angular.isDefined($attrs.datepickerAppendToBody) ?
      $scope.$parent.$eval($attrs.datepickerAppendToBody) :
      datepickerPopupConfig.appendToBody;
    onOpenFocus = angular.isDefined($attrs.onOpenFocus) ?
      $scope.$parent.$eval($attrs.onOpenFocus) : datepickerPopupConfig.onOpenFocus;
    datepickerPopupTemplateUrl = angular.isDefined($attrs.datepickerPopupTemplateUrl) ?
      $attrs.datepickerPopupTemplateUrl :
      datepickerPopupConfig.datepickerPopupTemplateUrl;
    datepickerTemplateUrl = angular.isDefined($attrs.datepickerTemplateUrl) ?
      $attrs.datepickerTemplateUrl : datepickerPopupConfig.datepickerTemplateUrl;
    altInputFormats = angular.isDefined($attrs.altInputFormats) ?
      $scope.$parent.$eval($attrs.altInputFormats) :
      datepickerPopupConfig.altInputFormats;

    $scope.showButtonBar = angular.isDefined($attrs.showButtonBar) ?
      $scope.$parent.$eval($attrs.showButtonBar) :
      datepickerPopupConfig.showButtonBar;

    if (datepickerPopupConfig.html5Types[$attrs.type]) {
      dateFormat = datepickerPopupConfig.html5Types[$attrs.type];
      isHtml5DateInput = true;
    } else {
      dateFormat = $attrs.uibDatepickerPopup || datepickerPopupConfig.datepickerPopup;
      $attrs.$observe('uibDatepickerPopup', function(value, oldValue) {
        var newDateFormat = value || datepickerPopupConfig.datepickerPopup;
        // Invalidate the $modelValue to ensure that formatters re-run
        // FIXME: Refactor when PR is merged: https://github.com/angular/angular.js/pull/10764
        if (newDateFormat !== dateFormat) {
          dateFormat = newDateFormat;
          ngModel.$modelValue = null;

          if (!dateFormat) {
            throw new Error('uibDatepickerPopup must have a date format specified.');
          }
        }
      });
    }

    if (!dateFormat) {
      throw new Error('uibDatepickerPopup must have a date format specified.');
    }

    if (isHtml5DateInput && $attrs.uibDatepickerPopup) {
      throw new Error('HTML5 date input types do not support custom formats.');
    }

    // popup element used to display calendar
    popupEl = angular.element('<div uib-datepicker-popup-wrap><div uib-datepicker></div></div>');

    popupEl.attr({
      'ng-model': 'date',
      'ng-change': 'dateSelection(date)',
      'template-url': datepickerPopupTemplateUrl
    });

    // datepicker element
    datepickerEl = angular.element(popupEl.children()[0]);
    datepickerEl.attr('template-url', datepickerTemplateUrl);

    if (!$scope.datepickerOptions) {
      $scope.datepickerOptions = {};
    }

    if (isHtml5DateInput) {
      if ($attrs.type === 'month') {
        $scope.datepickerOptions.datepickerMode = 'month';
        $scope.datepickerOptions.minMode = 'month';
      }
    }

    datepickerEl.attr('datepicker-options', 'datepickerOptions');

    if (!isHtml5DateInput) {
      // Internal API to maintain the correct ng-invalid-[key] class
      ngModel.$$parserName = 'date';
      ngModel.$validators.date = validator;
      ngModel.$parsers.unshift(parseDate);
      ngModel.$formatters.push(function(value) {
        if (ngModel.$isEmpty(value)) {
          $scope.date = value;
          return value;
        }

        if (angular.isNumber(value)) {
          value = new Date(value);
        }

        $scope.date = dateParser.fromTimezone(value, ngModelOptions.getOption('timezone'));

        return dateParser.filter($scope.date, dateFormat);
      });
    } else {
      ngModel.$formatters.push(function(value) {
        $scope.date = dateParser.fromTimezone(value, ngModelOptions.getOption('timezone'));
        return value;
      });
    }

    // Detect changes in the view from the text box
    ngModel.$viewChangeListeners.push(function() {
      $scope.date = parseDateString(ngModel.$viewValue);
    });

    $element.on('keydown', inputKeydownBind);

    $popup = $compile(popupEl)($scope);
    // Prevent jQuery cache memory leak (template is now redundant after linking)
    popupEl.remove();

    if (appendToBody) {
      $document.find('body').append($popup);
    } else {
      $element.after($popup);
    }

    $scope.$on('$destroy', function() {
      if ($scope.isOpen === true) {
        if (!$rootScope.$$phase) {
          $scope.$apply(function() {
            $scope.isOpen = false;
          });
        }
      }

      $popup.remove();
      $element.off('keydown', inputKeydownBind);
      $document.off('click', documentClickBind);
      if (scrollParentEl) {
        scrollParentEl.off('scroll', positionPopup);
      }
      angular.element($window).off('resize', positionPopup);

      //Clear all watch listeners on destroy
      while (watchListeners.length) {
        watchListeners.shift()();
      }
    });
  };

  $scope.getText = function(key) {
    return $scope[key + 'Text'] || datepickerPopupConfig[key + 'Text'];
  };

  $scope.isDisabled = function(date) {
    if (date === 'today') {
      date = dateParser.fromTimezone(new Date(), ngModelOptions.getOption('timezone'));
    }

    var dates = {};
    angular.forEach(['minDate', 'maxDate'], function(key) {
      if (!$scope.datepickerOptions[key]) {
        dates[key] = null;
      } else if (angular.isDate($scope.datepickerOptions[key])) {
        dates[key] = new Date($scope.datepickerOptions[key]);
      } else {
        if ($datepickerPopupLiteralWarning) {
          $log.warn('Literal date support has been deprecated, please switch to date object usage');
        }

        dates[key] = new Date(dateFilter($scope.datepickerOptions[key], 'medium'));
      }
    });

    return $scope.datepickerOptions &&
      dates.minDate && $scope.compare(date, dates.minDate) < 0 ||
      dates.maxDate && $scope.compare(date, dates.maxDate) > 0;
  };

  $scope.compare = function(date1, date2) {
    return new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()) - new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
  };

  // Inner change
  $scope.dateSelection = function(dt) {
    $scope.date = dt;
    var date = $scope.date ? dateParser.filter($scope.date, dateFormat) : null; // Setting to NULL is necessary for form validators to function
    $element.val(date);
    ngModel.$setViewValue(date);

    if (closeOnDateSelection) {
      $scope.isOpen = false;
      $element[0].focus();
    }
  };

  $scope.keydown = function(evt) {
    if (evt.which === 27) {
      evt.stopPropagation();
      $scope.isOpen = false;
      $element[0].focus();
    }
  };

  $scope.select = function(date, evt) {
    evt.stopPropagation();

    if (date === 'today') {
      var today = new Date();
      if (angular.isDate($scope.date)) {
        date = new Date($scope.date);
        date.setFullYear(today.getFullYear(), today.getMonth(), today.getDate());
      } else {
        date = dateParser.fromTimezone(today, ngModelOptions.getOption('timezone'));
        date.setHours(0, 0, 0, 0);
      }
    }
    $scope.dateSelection(date);
  };

  $scope.close = function(evt) {
    evt.stopPropagation();

    $scope.isOpen = false;
    $element[0].focus();
  };

  $scope.disabled = angular.isDefined($attrs.disabled) || false;
  if ($attrs.ngDisabled) {
    watchListeners.push($scope.$parent.$watch($parse($attrs.ngDisabled), function(disabled) {
      $scope.disabled = disabled;
    }));
  }

  $scope.$watch('isOpen', function(value) {
    if (value) {
      if (!$scope.disabled) {
        $timeout(function() {
          positionPopup();

          if (onOpenFocus) {
            $scope.$broadcast('uib:datepicker.focus');
          }

          $document.on('click', documentClickBind);

          var placement = $attrs.popupPlacement ? $attrs.popupPlacement : datepickerPopupConfig.placement;
          if (appendToBody || $position.parsePlacement(placement)[2]) {
            scrollParentEl = scrollParentEl || angular.element($position.scrollParent($element));
            if (scrollParentEl) {
              scrollParentEl.on('scroll', positionPopup);
            }
          } else {
            scrollParentEl = null;
          }

          angular.element($window).on('resize', positionPopup);
        }, 0, false);
      } else {
        $scope.isOpen = false;
      }
    } else {
      $document.off('click', documentClickBind);
      if (scrollParentEl) {
        scrollParentEl.off('scroll', positionPopup);
      }
      angular.element($window).off('resize', positionPopup);
    }
  });

  function cameltoDash(string) {
    return string.replace(/([A-Z])/g, function($1) { return '-' + $1.toLowerCase(); });
  }

  function parseDateString(viewValue) {
    var date = dateParser.parse(viewValue, dateFormat, $scope.date);
    if (isNaN(date)) {
      for (var i = 0; i < altInputFormats.length; i++) {
        date = dateParser.parse(viewValue, altInputFormats[i], $scope.date);
        if (!isNaN(date)) {
          return date;
        }
      }
    }
    return date;
  }

  function parseDate(viewValue) {
    if (angular.isNumber(viewValue)) {
      // presumably timestamp to date object
      viewValue = new Date(viewValue);
    }

    if (!viewValue) {
      return null;
    }

    if (angular.isDate(viewValue) && !isNaN(viewValue)) {
      return viewValue;
    }

    if (angular.isString(viewValue)) {
      var date = parseDateString(viewValue);
      if (!isNaN(date)) {
        return dateParser.toTimezone(date, ngModelOptions.getOption('timezone'));
      }
    }

    return ngModelOptions.getOption('allowInvalid') ? viewValue : undefined;
  }

  function validator(modelValue, viewValue) {
    var value = modelValue || viewValue;

    if (!$attrs.ngRequired && !value) {
      return true;
    }

    if (angular.isNumber(value)) {
      value = new Date(value);
    }

    if (!value) {
      return true;
    }

    if (angular.isDate(value) && !isNaN(value)) {
      return true;
    }

    if (angular.isString(value)) {
      return !isNaN(parseDateString(value));
    }

    return false;
  }

  function documentClickBind(event) {
    if (!$scope.isOpen && $scope.disabled) {
      return;
    }

    var popup = $popup[0];
    var dpContainsTarget = $element[0].contains(event.target);
    // The popup node may not be an element node
    // In some browsers (IE) only element nodes have the 'contains' function
    var popupContainsTarget = popup.contains !== undefined && popup.contains(event.target);
    if ($scope.isOpen && !(dpContainsTarget || popupContainsTarget)) {
      $scope.$apply(function() {
        $scope.isOpen = false;
      });
    }
  }

  function inputKeydownBind(evt) {
    if (evt.which === 27 && $scope.isOpen) {
      evt.preventDefault();
      evt.stopPropagation();
      $scope.$apply(function() {
        $scope.isOpen = false;
      });
      $element[0].focus();
    } else if (evt.which === 40 && !$scope.isOpen) {
      evt.preventDefault();
      evt.stopPropagation();
      $scope.$apply(function() {
        $scope.isOpen = true;
      });
    }
  }

  function positionPopup() {
    if ($scope.isOpen) {
      var dpElement = angular.element($popup[0].querySelector('.uib-datepicker-popup'));
      var placement = $attrs.popupPlacement ? $attrs.popupPlacement : datepickerPopupConfig.placement;
      var position = $position.positionElements($element, dpElement, placement, appendToBody);
      dpElement.css({top: position.top + 'px', left: position.left + 'px'});
      if (dpElement.hasClass('uib-position-measure')) {
        dpElement.removeClass('uib-position-measure');
      }
    }
  }

  function extractOptions(ngModelCtrl) {
    var ngModelOptions;

    if (angular.version.minor < 6) { // in angular < 1.6 $options could be missing
      // guarantee a value
      ngModelOptions = angular.isObject(ngModelCtrl.$options) ?
        ngModelCtrl.$options :
        {
          timezone: null
        };

      // mimic 1.6+ api
      ngModelOptions.getOption = function (key) {
        return ngModelOptions[key];
      };
    } else { // in angular >=1.6 $options is always present
      ngModelOptions = ngModelCtrl.$options;
    }

    return ngModelOptions;
  }

  $scope.$on('uib:datepicker.mode', function() {
    $timeout(positionPopup, 0, false);
  });
}])

.directive('uibDatepickerPopup', function() {
  return {
    require: ['ngModel', 'uibDatepickerPopup'],
    controller: 'UibDatepickerPopupController',
    scope: {
      datepickerOptions: '=?',
      isOpen: '=?',
      currentText: '@',
      clearText: '@',
      closeText: '@'
    },
    link: function(scope, element, attrs, ctrls) {
      var ngModel = ctrls[0],
        ctrl = ctrls[1];

      ctrl.init(ngModel);
    }
  };
})

.directive('uibDatepickerPopupWrap', function() {
  return {
    restrict: 'A',
    transclude: true,
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'uib/template/datepickerPopup/popup.html';
    }
  };
});

angular.module('ui.bootstrap.debounce', [])
/**
 * A helper, internal service that debounces a function
 */
  .factory('$$debounce', ['$timeout', function($timeout) {
    return function(callback, debounceTime) {
      var timeoutPromise;

      return function() {
        var self = this;
        var args = Array.prototype.slice.call(arguments);
        if (timeoutPromise) {
          $timeout.cancel(timeoutPromise);
        }

        timeoutPromise = $timeout(function() {
          callback.apply(self, args);
        }, debounceTime);
      };
    };
  }]);

angular.module('ui.bootstrap.multiMap', [])
/**
 * A helper, internal data structure that stores all references attached to key
 */
  .factory('$$multiMap', function() {
    return {
      createNew: function() {
        var map = {};

        return {
          entries: function() {
            return Object.keys(map).map(function(key) {
              return {
                key: key,
                value: map[key]
              };
            });
          },
          get: function(key) {
            return map[key];
          },
          hasKey: function(key) {
            return !!map[key];
          },
          keys: function() {
            return Object.keys(map);
          },
          put: function(key, value) {
            if (!map[key]) {
              map[key] = [];
            }

            map[key].push(value);
          },
          remove: function(key, value) {
            var values = map[key];

            if (!values) {
              return;
            }

            var idx = values.indexOf(value);

            if (idx !== -1) {
              values.splice(idx, 1);
            }

            if (!values.length) {
              delete map[key];
            }
          }
        };
      }
    };
  });

angular.module('ui.bootstrap.dropdown', ['ui.bootstrap.multiMap', 'ui.bootstrap.position'])

.constant('uibDropdownConfig', {
  appendToOpenClass: 'uib-dropdown-open',
  openClass: 'open'
})

.service('uibDropdownService', ['$document', '$rootScope', '$$multiMap', function($document, $rootScope, $$multiMap) {
  var openScope = null;
  var openedContainers = $$multiMap.createNew();

  this.isOnlyOpen = function(dropdownScope, appendTo) {
    var openedDropdowns = openedContainers.get(appendTo);
    if (openedDropdowns) {
      var openDropdown = openedDropdowns.reduce(function(toClose, dropdown) {
        if (dropdown.scope === dropdownScope) {
          return dropdown;
        }

        return toClose;
      }, {});
      if (openDropdown) {
        return openedDropdowns.length === 1;
      }
    }

    return false;
  };

  this.open = function(dropdownScope, element, appendTo) {
    if (!openScope) {
      $document.on('click', closeDropdown);
    }

    if (openScope && openScope !== dropdownScope) {
      openScope.isOpen = false;
    }

    openScope = dropdownScope;

    if (!appendTo) {
      return;
    }

    var openedDropdowns = openedContainers.get(appendTo);
    if (openedDropdowns) {
      var openedScopes = openedDropdowns.map(function(dropdown) {
        return dropdown.scope;
      });
      if (openedScopes.indexOf(dropdownScope) === -1) {
        openedContainers.put(appendTo, {
          scope: dropdownScope
        });
      }
    } else {
      openedContainers.put(appendTo, {
        scope: dropdownScope
      });
    }
  };

  this.close = function(dropdownScope, element, appendTo) {
    if (openScope === dropdownScope) {
      $document.off('click', closeDropdown);
      $document.off('keydown', this.keybindFilter);
      openScope = null;
    }

    if (!appendTo) {
      return;
    }

    var openedDropdowns = openedContainers.get(appendTo);
    if (openedDropdowns) {
      var dropdownToClose = openedDropdowns.reduce(function(toClose, dropdown) {
        if (dropdown.scope === dropdownScope) {
          return dropdown;
        }

        return toClose;
      }, {});
      if (dropdownToClose) {
        openedContainers.remove(appendTo, dropdownToClose);
      }
    }
  };

  var closeDropdown = function(evt) {
    // This method may still be called during the same mouse event that
    // unbound this event handler. So check openScope before proceeding.
    if (!openScope || !openScope.isOpen) { return; }

    if (evt && openScope.getAutoClose() === 'disabled') { return; }

    if (evt && evt.which === 3) { return; }

    var toggleElement = openScope.getToggleElement();
    if (evt && toggleElement && toggleElement[0].contains(evt.target)) {
      return;
    }

    var dropdownElement = openScope.getDropdownElement();
    if (evt && openScope.getAutoClose() === 'outsideClick' &&
      dropdownElement && dropdownElement[0].contains(evt.target)) {
      return;
    }

    openScope.focusToggleElement();
    openScope.isOpen = false;

    if (!$rootScope.$$phase) {
      openScope.$apply();
    }
  };

  this.keybindFilter = function(evt) {
    if (!openScope) {
      // see this.close as ESC could have been pressed which kills the scope so we can not proceed
      return;
    }

    var dropdownElement = openScope.getDropdownElement();
    var toggleElement = openScope.getToggleElement();
    var dropdownElementTargeted = dropdownElement && dropdownElement[0].contains(evt.target);
    var toggleElementTargeted = toggleElement && toggleElement[0].contains(evt.target);
    if (evt.which === 27) {
      evt.stopPropagation();
      openScope.focusToggleElement();
      closeDropdown();
    } else if (openScope.isKeynavEnabled() && [38, 40].indexOf(evt.which) !== -1 && openScope.isOpen && (dropdownElementTargeted || toggleElementTargeted)) {
      evt.preventDefault();
      evt.stopPropagation();
      openScope.focusDropdownEntry(evt.which);
    }
  };
}])

.controller('UibDropdownController', ['$scope', '$element', '$attrs', '$parse', 'uibDropdownConfig', 'uibDropdownService', '$animate', '$uibPosition', '$document', '$compile', '$templateRequest', function($scope, $element, $attrs, $parse, dropdownConfig, uibDropdownService, $animate, $position, $document, $compile, $templateRequest) {
  var self = this,
    scope = $scope.$new(), // create a child scope so we are not polluting original one
    templateScope,
    appendToOpenClass = dropdownConfig.appendToOpenClass,
    openClass = dropdownConfig.openClass,
    getIsOpen,
    setIsOpen = angular.noop,
    toggleInvoker = $attrs.onToggle ? $parse($attrs.onToggle) : angular.noop,
    keynavEnabled = false,
    selectedOption = null,
    body = $document.find('body');

  $element.addClass('dropdown');

  this.init = function() {
    if ($attrs.isOpen) {
      getIsOpen = $parse($attrs.isOpen);
      setIsOpen = getIsOpen.assign;

      $scope.$watch(getIsOpen, function(value) {
        scope.isOpen = !!value;
      });
    }

    keynavEnabled = angular.isDefined($attrs.keyboardNav);
  };

  this.toggle = function(open) {
    scope.isOpen = arguments.length ? !!open : !scope.isOpen;
    if (angular.isFunction(setIsOpen)) {
      setIsOpen(scope, scope.isOpen);
    }

    return scope.isOpen;
  };

  // Allow other directives to watch status
  this.isOpen = function() {
    return scope.isOpen;
  };

  scope.getToggleElement = function() {
    return self.toggleElement;
  };

  scope.getAutoClose = function() {
    return $attrs.autoClose || 'always'; //or 'outsideClick' or 'disabled'
  };

  scope.getElement = function() {
    return $element;
  };

  scope.isKeynavEnabled = function() {
    return keynavEnabled;
  };

  scope.focusDropdownEntry = function(keyCode) {
    var elems = self.dropdownMenu ? //If append to body is used.
      angular.element(self.dropdownMenu).find('a') :
      $element.find('ul').eq(0).find('a');

    switch (keyCode) {
      case 40: {
        if (!angular.isNumber(self.selectedOption)) {
          self.selectedOption = 0;
        } else {
          self.selectedOption = self.selectedOption === elems.length - 1 ?
            self.selectedOption :
            self.selectedOption + 1;
        }
        break;
      }
      case 38: {
        if (!angular.isNumber(self.selectedOption)) {
          self.selectedOption = elems.length - 1;
        } else {
          self.selectedOption = self.selectedOption === 0 ?
            0 : self.selectedOption - 1;
        }
        break;
      }
    }
    elems[self.selectedOption].focus();
  };

  scope.getDropdownElement = function() {
    return self.dropdownMenu;
  };

  scope.focusToggleElement = function() {
    if (self.toggleElement) {
      self.toggleElement[0].focus();
    }
  };

  function removeDropdownMenu() {
    $element.append(self.dropdownMenu);
  }

  scope.$watch('isOpen', function(isOpen, wasOpen) {
    var appendTo = null,
      appendToBody = false;

    if (angular.isDefined($attrs.dropdownAppendTo)) {
      var appendToEl = $parse($attrs.dropdownAppendTo)(scope);
      if (appendToEl) {
        appendTo = angular.element(appendToEl);
      }
    }

    if (angular.isDefined($attrs.dropdownAppendToBody)) {
      var appendToBodyValue = $parse($attrs.dropdownAppendToBody)(scope);
      if (appendToBodyValue !== false) {
        appendToBody = true;
      }
    }

    if (appendToBody && !appendTo) {
      appendTo = body;
    }

    if (appendTo && self.dropdownMenu) {
      if (isOpen) {
        appendTo.append(self.dropdownMenu);
        $element.on('$destroy', removeDropdownMenu);
      } else {
        $element.off('$destroy', removeDropdownMenu);
        removeDropdownMenu();
      }
    }

    if (appendTo && self.dropdownMenu) {
      var pos = $position.positionElements($element, self.dropdownMenu, 'bottom-left', true),
        css,
        rightalign,
        scrollbarPadding,
        scrollbarWidth = 0;

      css = {
        top: pos.top + 'px',
        display: isOpen ? 'block' : 'none'
      };

      rightalign = self.dropdownMenu.hasClass('dropdown-menu-right');
      if (!rightalign) {
        css.left = pos.left + 'px';
        css.right = 'auto';
      } else {
        css.left = 'auto';
        scrollbarPadding = $position.scrollbarPadding(appendTo);

        if (scrollbarPadding.heightOverflow && scrollbarPadding.scrollbarWidth) {
          scrollbarWidth = scrollbarPadding.scrollbarWidth;
        }

        css.right = window.innerWidth - scrollbarWidth -
          (pos.left + $element.prop('offsetWidth')) + 'px';
      }

      // Need to adjust our positioning to be relative to the appendTo container
      // if it's not the body element
      if (!appendToBody) {
        var appendOffset = $position.offset(appendTo);

        css.top = pos.top - appendOffset.top + 'px';

        if (!rightalign) {
          css.left = pos.left - appendOffset.left + 'px';
        } else {
          css.right = window.innerWidth -
            (pos.left - appendOffset.left + $element.prop('offsetWidth')) + 'px';
        }
      }

      self.dropdownMenu.css(css);
    }

    var openContainer = appendTo ? appendTo : $element;
    var dropdownOpenClass = appendTo ? appendToOpenClass : openClass;
    var hasOpenClass = openContainer.hasClass(dropdownOpenClass);
    var isOnlyOpen = uibDropdownService.isOnlyOpen($scope, appendTo);

    if (hasOpenClass === !isOpen) {
      var toggleClass;
      if (appendTo) {
        toggleClass = !isOnlyOpen ? 'addClass' : 'removeClass';
      } else {
        toggleClass = isOpen ? 'addClass' : 'removeClass';
      }
      $animate[toggleClass](openContainer, dropdownOpenClass).then(function() {
        if (angular.isDefined(isOpen) && isOpen !== wasOpen) {
          toggleInvoker($scope, { open: !!isOpen });
        }
      });
    }

    if (isOpen) {
      if (self.dropdownMenuTemplateUrl) {
        $templateRequest(self.dropdownMenuTemplateUrl).then(function(tplContent) {
          templateScope = scope.$new();
          $compile(tplContent.trim())(templateScope, function(dropdownElement) {
            var newEl = dropdownElement;
            self.dropdownMenu.replaceWith(newEl);
            self.dropdownMenu = newEl;
            $document.on('keydown', uibDropdownService.keybindFilter);
          });
        });
      } else {
        $document.on('keydown', uibDropdownService.keybindFilter);
      }

      scope.focusToggleElement();
      uibDropdownService.open(scope, $element, appendTo);
    } else {
      uibDropdownService.close(scope, $element, appendTo);
      if (self.dropdownMenuTemplateUrl) {
        if (templateScope) {
          templateScope.$destroy();
        }
        var newEl = angular.element('<ul class="dropdown-menu"></ul>');
        self.dropdownMenu.replaceWith(newEl);
        self.dropdownMenu = newEl;
      }

      self.selectedOption = null;
    }

    if (angular.isFunction(setIsOpen)) {
      setIsOpen($scope, isOpen);
    }
  });
}])

.directive('uibDropdown', function() {
  return {
    controller: 'UibDropdownController',
    link: function(scope, element, attrs, dropdownCtrl) {
      dropdownCtrl.init();
    }
  };
})

.directive('uibDropdownMenu', function() {
  return {
    restrict: 'A',
    require: '?^uibDropdown',
    link: function(scope, element, attrs, dropdownCtrl) {
      if (!dropdownCtrl || angular.isDefined(attrs.dropdownNested)) {
        return;
      }

      element.addClass('dropdown-menu');

      var tplUrl = attrs.templateUrl;
      if (tplUrl) {
        dropdownCtrl.dropdownMenuTemplateUrl = tplUrl;
      }

      if (!dropdownCtrl.dropdownMenu) {
        dropdownCtrl.dropdownMenu = element;
      }
    }
  };
})

.directive('uibDropdownToggle', function() {
  return {
    require: '?^uibDropdown',
    link: function(scope, element, attrs, dropdownCtrl) {
      if (!dropdownCtrl) {
        return;
      }

      element.addClass('dropdown-toggle');

      dropdownCtrl.toggleElement = element;

      var toggleDropdown = function(event) {
        event.preventDefault();

        if (!element.hasClass('disabled') && !attrs.disabled) {
          scope.$apply(function() {
            dropdownCtrl.toggle();
          });
        }
      };

      element.on('click', toggleDropdown);

      // WAI-ARIA
      element.attr({ 'aria-haspopup': true, 'aria-expanded': false });
      scope.$watch(dropdownCtrl.isOpen, function(isOpen) {
        element.attr('aria-expanded', !!isOpen);
      });

      scope.$on('$destroy', function() {
        element.off('click', toggleDropdown);
      });
    }
  };
});

angular.module('ui.bootstrap.stackedMap', [])
/**
 * A helper, internal data structure that acts as a map but also allows getting / removing
 * elements in the LIFO order
 */
  .factory('$$stackedMap', function() {
    return {
      createNew: function() {
        var stack = [];

        return {
          add: function(key, value) {
            stack.push({
              key: key,
              value: value
            });
          },
          get: function(key) {
            for (var i = 0; i < stack.length; i++) {
              if (key === stack[i].key) {
                return stack[i];
              }
            }
          },
          keys: function() {
            var keys = [];
            for (var i = 0; i < stack.length; i++) {
              keys.push(stack[i].key);
            }
            return keys;
          },
          top: function() {
            return stack[stack.length - 1];
          },
          remove: function(key) {
            var idx = -1;
            for (var i = 0; i < stack.length; i++) {
              if (key === stack[i].key) {
                idx = i;
                break;
              }
            }
            return stack.splice(idx, 1)[0];
          },
          removeTop: function() {
            return stack.pop();
          },
          length: function() {
            return stack.length;
          }
        };
      }
    };
  });
angular.module('ui.bootstrap.modal', ['ui.bootstrap.multiMap', 'ui.bootstrap.stackedMap', 'ui.bootstrap.position'])
/**
 * Pluggable resolve mechanism for the modal resolve resolution
 * Supports UI Router's $resolve service
 */
  .provider('$uibResolve', function() {
    var resolve = this;
    this.resolver = null;

    this.setResolver = function(resolver) {
      this.resolver = resolver;
    };

    this.$get = ['$injector', '$q', function($injector, $q) {
      var resolver = resolve.resolver ? $injector.get(resolve.resolver) : null;
      return {
        resolve: function(invocables, locals, parent, self) {
          if (resolver) {
            return resolver.resolve(invocables, locals, parent, self);
          }

          var promises = [];

          angular.forEach(invocables, function(value) {
            if (angular.isFunction(value) || angular.isArray(value)) {
              promises.push($q.resolve($injector.invoke(value)));
            } else if (angular.isString(value)) {
              promises.push($q.resolve($injector.get(value)));
            } else {
              promises.push($q.resolve(value));
            }
          });

          return $q.all(promises).then(function(resolves) {
            var resolveObj = {};
            var resolveIter = 0;
            angular.forEach(invocables, function(value, key) {
              resolveObj[key] = resolves[resolveIter++];
            });

            return resolveObj;
          });
        }
      };
    }];
  })

/**
 * A helper directive for the $modal service. It creates a backdrop element.
 */
  .directive('uibModalBackdrop', ['$animate', '$injector', '$uibModalStack',
  function($animate, $injector, $modalStack) {
    return {
      restrict: 'A',
      compile: function(tElement, tAttrs) {
        tElement.addClass(tAttrs.backdropClass);
        return linkFn;
      }
    };

    function linkFn(scope, element, attrs) {
      if (attrs.modalInClass) {
        $animate.addClass(element, attrs.modalInClass);

        scope.$on($modalStack.NOW_CLOSING_EVENT, function(e, setIsAsync) {
          var done = setIsAsync();
          if (scope.modalOptions.animation) {
            $animate.removeClass(element, attrs.modalInClass).then(done);
          } else {
            done();
          }
        });
      }
    }
  }])

  .directive('uibModalWindow', ['$uibModalStack', '$q', '$animateCss', '$document',
  function($modalStack, $q, $animateCss, $document) {
    return {
      scope: {
        index: '@'
      },
      restrict: 'A',
      transclude: true,
      templateUrl: function(tElement, tAttrs) {
        return tAttrs.templateUrl || 'uib/template/modal/window.html';
      },
      link: function(scope, element, attrs) {
        element.addClass(attrs.windowTopClass || '');
        scope.size = attrs.size;

        scope.close = function(evt) {
          var modal = $modalStack.getTop();
          if (modal && modal.value.backdrop &&
            modal.value.backdrop !== 'static' &&
            evt.target === evt.currentTarget) {
            evt.preventDefault();
            evt.stopPropagation();
            $modalStack.dismiss(modal.key, 'backdrop click');
          }
        };

        // moved from template to fix issue #2280
        element.on('click', scope.close);

        // This property is only added to the scope for the purpose of detecting when this directive is rendered.
        // We can detect that by using this property in the template associated with this directive and then use
        // {@link Attribute#$observe} on it. For more details please see {@link TableColumnResize}.
        scope.$isRendered = true;

        // Deferred object that will be resolved when this modal is rendered.
        var modalRenderDeferObj = $q.defer();
        // Resolve render promise post-digest
        scope.$$postDigest(function() {
          modalRenderDeferObj.resolve();
        });

        modalRenderDeferObj.promise.then(function() {
          var animationPromise = null;

          if (attrs.modalInClass) {
            animationPromise = $animateCss(element, {
              addClass: attrs.modalInClass
            }).start();

            scope.$on($modalStack.NOW_CLOSING_EVENT, function(e, setIsAsync) {
              var done = setIsAsync();
              $animateCss(element, {
                removeClass: attrs.modalInClass
              }).start().then(done);
            });
          }


          $q.when(animationPromise).then(function() {
            // Notify {@link $modalStack} that modal is rendered.
            var modal = $modalStack.getTop();
            if (modal) {
              $modalStack.modalRendered(modal.key);
            }

            /**
             * If something within the freshly-opened modal already has focus (perhaps via a
             * directive that causes focus) then there's no need to try to focus anything.
             */
            if (!($document[0].activeElement && element[0].contains($document[0].activeElement))) {
              var inputWithAutofocus = element[0].querySelector('[autofocus]');
              /**
               * Auto-focusing of a freshly-opened modal element causes any child elements
               * with the autofocus attribute to lose focus. This is an issue on touch
               * based devices which will show and then hide the onscreen keyboard.
               * Attempts to refocus the autofocus element via JavaScript will not reopen
               * the onscreen keyboard. Fixed by updated the focusing logic to only autofocus
               * the modal element if the modal does not contain an autofocus element.
               */
              if (inputWithAutofocus) {
                inputWithAutofocus.focus();
              } else {
                element[0].focus();
              }
            }
          });
        });
      }
    };
  }])

  .directive('uibModalAnimationClass', function() {
    return {
      compile: function(tElement, tAttrs) {
        if (tAttrs.modalAnimation) {
          tElement.addClass(tAttrs.uibModalAnimationClass);
        }
      }
    };
  })

  .directive('uibModalTransclude', ['$animate', function($animate) {
    return {
      link: function(scope, element, attrs, controller, transclude) {
        transclude(scope.$parent, function(clone) {
          element.empty();
          $animate.enter(clone, element);
        });
      }
    };
  }])

  .factory('$uibModalStack', ['$animate', '$animateCss', '$document',
    '$compile', '$rootScope', '$q', '$$multiMap', '$$stackedMap', '$uibPosition',
    function($animate, $animateCss, $document, $compile, $rootScope, $q, $$multiMap, $$stackedMap, $uibPosition) {
      var OPENED_MODAL_CLASS = 'modal-open';

      var backdropDomEl, backdropScope;
      var openedWindows = $$stackedMap.createNew();
      var openedClasses = $$multiMap.createNew();
      var $modalStack = {
        NOW_CLOSING_EVENT: 'modal.stack.now-closing'
      };
      var topModalIndex = 0;
      var previousTopOpenedModal = null;
      var ARIA_HIDDEN_ATTRIBUTE_NAME = 'data-bootstrap-modal-aria-hidden-count';

      //Modal focus behavior
      var tabbableSelector = 'a[href], area[href], input:not([disabled]):not([tabindex=\'-1\']), ' +
        'button:not([disabled]):not([tabindex=\'-1\']),select:not([disabled]):not([tabindex=\'-1\']), textarea:not([disabled]):not([tabindex=\'-1\']), ' +
        'iframe, object, embed, *[tabindex]:not([tabindex=\'-1\']), *[contenteditable=true]';
      var scrollbarPadding;
      var SNAKE_CASE_REGEXP = /[A-Z]/g;

      // TODO: extract into common dependency with tooltip
      function snake_case(name) {
        var separator = '-';
        return name.replace(SNAKE_CASE_REGEXP, function(letter, pos) {
          return (pos ? separator : '') + letter.toLowerCase();
        });
      }

      function isVisible(element) {
        return !!(element.offsetWidth ||
          element.offsetHeight ||
          element.getClientRects().length);
      }

      function backdropIndex() {
        var topBackdropIndex = -1;
        var opened = openedWindows.keys();
        for (var i = 0; i < opened.length; i++) {
          if (openedWindows.get(opened[i]).value.backdrop) {
            topBackdropIndex = i;
          }
        }

        // If any backdrop exist, ensure that it's index is always
        // right below the top modal
        if (topBackdropIndex > -1 && topBackdropIndex < topModalIndex) {
          topBackdropIndex = topModalIndex;
        }
        return topBackdropIndex;
      }

      $rootScope.$watch(backdropIndex, function(newBackdropIndex) {
        if (backdropScope) {
          backdropScope.index = newBackdropIndex;
        }
      });

      function removeModalWindow(modalInstance, elementToReceiveFocus) {
        var modalWindow = openedWindows.get(modalInstance).value;
        var appendToElement = modalWindow.appendTo;

        //clean up the stack
        openedWindows.remove(modalInstance);
        previousTopOpenedModal = openedWindows.top();
        if (previousTopOpenedModal) {
          topModalIndex = parseInt(previousTopOpenedModal.value.modalDomEl.attr('index'), 10);
        }

        removeAfterAnimate(modalWindow.modalDomEl, modalWindow.modalScope, function() {
          var modalBodyClass = modalWindow.openedClass || OPENED_MODAL_CLASS;
          openedClasses.remove(modalBodyClass, modalInstance);
          var areAnyOpen = openedClasses.hasKey(modalBodyClass);
          appendToElement.toggleClass(modalBodyClass, areAnyOpen);
          if (!areAnyOpen && scrollbarPadding && scrollbarPadding.heightOverflow && scrollbarPadding.scrollbarWidth) {
            if (scrollbarPadding.originalRight) {
              appendToElement.css({paddingRight: scrollbarPadding.originalRight + 'px'});
            } else {
              appendToElement.css({paddingRight: ''});
            }
            scrollbarPadding = null;
          }
          toggleTopWindowClass(true);
        }, modalWindow.closedDeferred);
        checkRemoveBackdrop();

        //move focus to specified element if available, or else to body
        if (elementToReceiveFocus && elementToReceiveFocus.focus) {
          elementToReceiveFocus.focus();
        } else if (appendToElement.focus) {
          appendToElement.focus();
        }
      }

      // Add or remove "windowTopClass" from the top window in the stack
      function toggleTopWindowClass(toggleSwitch) {
        var modalWindow;

        if (openedWindows.length() > 0) {
          modalWindow = openedWindows.top().value;
          modalWindow.modalDomEl.toggleClass(modalWindow.windowTopClass || '', toggleSwitch);
        }
      }

      function checkRemoveBackdrop() {
        //remove backdrop if no longer needed
        if (backdropDomEl && backdropIndex() === -1) {
          var backdropScopeRef = backdropScope;
          removeAfterAnimate(backdropDomEl, backdropScope, function() {
            backdropScopeRef = null;
          });
          backdropDomEl = undefined;
          backdropScope = undefined;
        }
      }

      function removeAfterAnimate(domEl, scope, done, closedDeferred) {
        var asyncDeferred;
        var asyncPromise = null;
        var setIsAsync = function() {
          if (!asyncDeferred) {
            asyncDeferred = $q.defer();
            asyncPromise = asyncDeferred.promise;
          }

          return function asyncDone() {
            asyncDeferred.resolve();
          };
        };
        scope.$broadcast($modalStack.NOW_CLOSING_EVENT, setIsAsync);

        // Note that it's intentional that asyncPromise might be null.
        // That's when setIsAsync has not been called during the
        // NOW_CLOSING_EVENT broadcast.
        return $q.when(asyncPromise).then(afterAnimating);

        function afterAnimating() {
          if (afterAnimating.done) {
            return;
          }
          afterAnimating.done = true;

          $animate.leave(domEl).then(function() {
            if (done) {
              done();
            }

            domEl.remove();
            if (closedDeferred) {
              closedDeferred.resolve();
            }
          });

          scope.$destroy();
        }
      }

      $document.on('keydown', keydownListener);

      $rootScope.$on('$destroy', function() {
        $document.off('keydown', keydownListener);
      });

      function keydownListener(evt) {
        if (evt.isDefaultPrevented()) {
          return evt;
        }

        var modal = openedWindows.top();
        if (modal) {
          switch (evt.which) {
            case 27: {
              if (modal.value.keyboard) {
                evt.preventDefault();
                $rootScope.$apply(function() {
                  $modalStack.dismiss(modal.key, 'escape key press');
                });
              }
              break;
            }
            case 9: {
              var list = $modalStack.loadFocusElementList(modal);
              var focusChanged = false;
              if (evt.shiftKey) {
                if ($modalStack.isFocusInFirstItem(evt, list) || $modalStack.isModalFocused(evt, modal)) {
                  focusChanged = $modalStack.focusLastFocusableElement(list);
                }
              } else {
                if ($modalStack.isFocusInLastItem(evt, list)) {
                  focusChanged = $modalStack.focusFirstFocusableElement(list);
                }
              }

              if (focusChanged) {
                evt.preventDefault();
                evt.stopPropagation();
              }

              break;
            }
          }
        }
      }

      $modalStack.open = function(modalInstance, modal) {
        var modalOpener = $document[0].activeElement,
          modalBodyClass = modal.openedClass || OPENED_MODAL_CLASS;

        toggleTopWindowClass(false);

        // Store the current top first, to determine what index we ought to use
        // for the current top modal
        previousTopOpenedModal = openedWindows.top();

        openedWindows.add(modalInstance, {
          deferred: modal.deferred,
          renderDeferred: modal.renderDeferred,
          closedDeferred: modal.closedDeferred,
          modalScope: modal.scope,
          backdrop: modal.backdrop,
          keyboard: modal.keyboard,
          openedClass: modal.openedClass,
          windowTopClass: modal.windowTopClass,
          animation: modal.animation,
          appendTo: modal.appendTo
        });

        openedClasses.put(modalBodyClass, modalInstance);

        var appendToElement = modal.appendTo,
            currBackdropIndex = backdropIndex();

        if (currBackdropIndex >= 0 && !backdropDomEl) {
          backdropScope = $rootScope.$new(true);
          backdropScope.modalOptions = modal;
          backdropScope.index = currBackdropIndex;
          backdropDomEl = angular.element('<div uib-modal-backdrop="modal-backdrop"></div>');
          backdropDomEl.attr({
            'class': 'modal-backdrop',
            'ng-style': '{\'z-index\': 1040 + (index && 1 || 0) + index*10}',
            'uib-modal-animation-class': 'fade',
            'modal-in-class': 'in'
          });
          if (modal.backdropClass) {
            backdropDomEl.addClass(modal.backdropClass);
          }

          if (modal.animation) {
            backdropDomEl.attr('modal-animation', 'true');
          }
          $compile(backdropDomEl)(backdropScope);
          $animate.enter(backdropDomEl, appendToElement);
          if ($uibPosition.isScrollable(appendToElement)) {
            scrollbarPadding = $uibPosition.scrollbarPadding(appendToElement);
            if (scrollbarPadding.heightOverflow && scrollbarPadding.scrollbarWidth) {
              appendToElement.css({paddingRight: scrollbarPadding.right + 'px'});
            }
          }
        }

        var content;
        if (modal.component) {
          content = document.createElement(snake_case(modal.component.name));
          content = angular.element(content);
          content.attr({
            resolve: '$resolve',
            'modal-instance': '$uibModalInstance',
            close: '$close($value)',
            dismiss: '$dismiss($value)'
          });
        } else {
          content = modal.content;
        }

        // Set the top modal index based on the index of the previous top modal
        topModalIndex = previousTopOpenedModal ? parseInt(previousTopOpenedModal.value.modalDomEl.attr('index'), 10) + 1 : 0;
        var angularDomEl = angular.element('<div uib-modal-window="modal-window"></div>');
        angularDomEl.attr({
          'class': 'modal',
          'template-url': modal.windowTemplateUrl,
          'window-top-class': modal.windowTopClass,
          'role': 'dialog',
          'aria-labelledby': modal.ariaLabelledBy,
          'aria-describedby': modal.ariaDescribedBy,
          'size': modal.size,
          'index': topModalIndex,
          'animate': 'animate',
          'ng-style': '{\'z-index\': 1050 + $$topModalIndex*10, display: \'block\'}',
          'tabindex': -1,
          'uib-modal-animation-class': 'fade',
          'modal-in-class': 'in'
        }).append(content);
        if (modal.windowClass) {
          angularDomEl.addClass(modal.windowClass);
        }

        if (modal.animation) {
          angularDomEl.attr('modal-animation', 'true');
        }

        appendToElement.addClass(modalBodyClass);
        if (modal.scope) {
          // we need to explicitly add the modal index to the modal scope
          // because it is needed by ngStyle to compute the zIndex property.
          modal.scope.$$topModalIndex = topModalIndex;
        }
        $animate.enter($compile(angularDomEl)(modal.scope), appendToElement);

        openedWindows.top().value.modalDomEl = angularDomEl;
        openedWindows.top().value.modalOpener = modalOpener;

        applyAriaHidden(angularDomEl);

        function applyAriaHidden(el) {
          if (!el || el[0].tagName === 'BODY') {
            return;
          }

          getSiblings(el).forEach(function(sibling) {
            var elemIsAlreadyHidden = sibling.getAttribute('aria-hidden') === 'true',
              ariaHiddenCount = parseInt(sibling.getAttribute(ARIA_HIDDEN_ATTRIBUTE_NAME), 10);

            if (!ariaHiddenCount) {
              ariaHiddenCount = elemIsAlreadyHidden ? 1 : 0;
            }

            sibling.setAttribute(ARIA_HIDDEN_ATTRIBUTE_NAME, ariaHiddenCount + 1);
            sibling.setAttribute('aria-hidden', 'true');
          });

          return applyAriaHidden(el.parent());

          function getSiblings(el) {
            var children = el.parent() ? el.parent().children() : [];

            return Array.prototype.filter.call(children, function(child) {
              return child !== el[0];
            });
          }
        }
      };

      function broadcastClosing(modalWindow, resultOrReason, closing) {
        return !modalWindow.value.modalScope.$broadcast('modal.closing', resultOrReason, closing).defaultPrevented;
      }

      function unhideBackgroundElements() {
        Array.prototype.forEach.call(
          document.querySelectorAll('[' + ARIA_HIDDEN_ATTRIBUTE_NAME + ']'),
          function(hiddenEl) {
            var ariaHiddenCount = parseInt(hiddenEl.getAttribute(ARIA_HIDDEN_ATTRIBUTE_NAME), 10),
              newHiddenCount = ariaHiddenCount - 1;
            hiddenEl.setAttribute(ARIA_HIDDEN_ATTRIBUTE_NAME, newHiddenCount);

            if (!newHiddenCount) {
              hiddenEl.removeAttribute(ARIA_HIDDEN_ATTRIBUTE_NAME);
              hiddenEl.removeAttribute('aria-hidden');
            }
          }
        );
      }

      $modalStack.close = function(modalInstance, result) {
        var modalWindow = openedWindows.get(modalInstance);
        unhideBackgroundElements();
        if (modalWindow && broadcastClosing(modalWindow, result, true)) {
          modalWindow.value.modalScope.$$uibDestructionScheduled = true;
          modalWindow.value.deferred.resolve(result);
          removeModalWindow(modalInstance, modalWindow.value.modalOpener);
          return true;
        }

        return !modalWindow;
      };

      $modalStack.dismiss = function(modalInstance, reason) {
        var modalWindow = openedWindows.get(modalInstance);
        unhideBackgroundElements();
        if (modalWindow && broadcastClosing(modalWindow, reason, false)) {
          modalWindow.value.modalScope.$$uibDestructionScheduled = true;
          modalWindow.value.deferred.reject(reason);
          removeModalWindow(modalInstance, modalWindow.value.modalOpener);
          return true;
        }
        return !modalWindow;
      };

      $modalStack.dismissAll = function(reason) {
        var topModal = this.getTop();
        while (topModal && this.dismiss(topModal.key, reason)) {
          topModal = this.getTop();
        }
      };

      $modalStack.getTop = function() {
        return openedWindows.top();
      };

      $modalStack.modalRendered = function(modalInstance) {
        var modalWindow = openedWindows.get(modalInstance);
        if (modalWindow) {
          modalWindow.value.renderDeferred.resolve();
        }
      };

      $modalStack.focusFirstFocusableElement = function(list) {
        if (list.length > 0) {
          list[0].focus();
          return true;
        }
        return false;
      };

      $modalStack.focusLastFocusableElement = function(list) {
        if (list.length > 0) {
          list[list.length - 1].focus();
          return true;
        }
        return false;
      };

      $modalStack.isModalFocused = function(evt, modalWindow) {
        if (evt && modalWindow) {
          var modalDomEl = modalWindow.value.modalDomEl;
          if (modalDomEl && modalDomEl.length) {
            return (evt.target || evt.srcElement) === modalDomEl[0];
          }
        }
        return false;
      };

      $modalStack.isFocusInFirstItem = function(evt, list) {
        if (list.length > 0) {
          return (evt.target || evt.srcElement) === list[0];
        }
        return false;
      };

      $modalStack.isFocusInLastItem = function(evt, list) {
        if (list.length > 0) {
          return (evt.target || evt.srcElement) === list[list.length - 1];
        }
        return false;
      };

      $modalStack.loadFocusElementList = function(modalWindow) {
        if (modalWindow) {
          var modalDomE1 = modalWindow.value.modalDomEl;
          if (modalDomE1 && modalDomE1.length) {
            var elements = modalDomE1[0].querySelectorAll(tabbableSelector);
            return elements ?
              Array.prototype.filter.call(elements, function(element) {
                return isVisible(element);
              }) : elements;
          }
        }
      };

      return $modalStack;
    }])

  .provider('$uibModal', function() {
    var $modalProvider = {
      options: {
        animation: true,
        backdrop: true, //can also be false or 'static'
        keyboard: true
      },
      $get: ['$rootScope', '$q', '$document', '$templateRequest', '$controller', '$uibResolve', '$uibModalStack',
        function ($rootScope, $q, $document, $templateRequest, $controller, $uibResolve, $modalStack) {
          var $modal = {};

          function getTemplatePromise(options) {
            return options.template ? $q.when(options.template) :
              $templateRequest(angular.isFunction(options.templateUrl) ?
                options.templateUrl() : options.templateUrl);
          }

          var promiseChain = null;
          $modal.getPromiseChain = function() {
            return promiseChain;
          };

          $modal.open = function(modalOptions) {
            var modalResultDeferred = $q.defer();
            var modalOpenedDeferred = $q.defer();
            var modalClosedDeferred = $q.defer();
            var modalRenderDeferred = $q.defer();

            //prepare an instance of a modal to be injected into controllers and returned to a caller
            var modalInstance = {
              result: modalResultDeferred.promise,
              opened: modalOpenedDeferred.promise,
              closed: modalClosedDeferred.promise,
              rendered: modalRenderDeferred.promise,
              close: function (result) {
                return $modalStack.close(modalInstance, result);
              },
              dismiss: function (reason) {
                return $modalStack.dismiss(modalInstance, reason);
              }
            };

            //merge and clean up options
            modalOptions = angular.extend({}, $modalProvider.options, modalOptions);
            modalOptions.resolve = modalOptions.resolve || {};
            modalOptions.appendTo = modalOptions.appendTo || $document.find('body').eq(0);

            if (!modalOptions.appendTo.length) {
              throw new Error('appendTo element not found. Make sure that the element passed is in DOM.');
            }

            //verify options
            if (!modalOptions.component && !modalOptions.template && !modalOptions.templateUrl) {
              throw new Error('One of component or template or templateUrl options is required.');
            }

            var templateAndResolvePromise;
            if (modalOptions.component) {
              templateAndResolvePromise = $q.when($uibResolve.resolve(modalOptions.resolve, {}, null, null));
            } else {
              templateAndResolvePromise =
                $q.all([getTemplatePromise(modalOptions), $uibResolve.resolve(modalOptions.resolve, {}, null, null)]);
            }

            function resolveWithTemplate() {
              return templateAndResolvePromise;
            }

            // Wait for the resolution of the existing promise chain.
            // Then switch to our own combined promise dependency (regardless of how the previous modal fared).
            // Then add to $modalStack and resolve opened.
            // Finally clean up the chain variable if no subsequent modal has overwritten it.
            var samePromise;
            samePromise = promiseChain = $q.all([promiseChain])
              .then(resolveWithTemplate, resolveWithTemplate)
              .then(function resolveSuccess(tplAndVars) {
                var providedScope = modalOptions.scope || $rootScope;

                var modalScope = providedScope.$new();
                modalScope.$close = modalInstance.close;
                modalScope.$dismiss = modalInstance.dismiss;

                modalScope.$on('$destroy', function() {
                  if (!modalScope.$$uibDestructionScheduled) {
                    modalScope.$dismiss('$uibUnscheduledDestruction');
                  }
                });

                var modal = {
                  scope: modalScope,
                  deferred: modalResultDeferred,
                  renderDeferred: modalRenderDeferred,
                  closedDeferred: modalClosedDeferred,
                  animation: modalOptions.animation,
                  backdrop: modalOptions.backdrop,
                  keyboard: modalOptions.keyboard,
                  backdropClass: modalOptions.backdropClass,
                  windowTopClass: modalOptions.windowTopClass,
                  windowClass: modalOptions.windowClass,
                  windowTemplateUrl: modalOptions.windowTemplateUrl,
                  ariaLabelledBy: modalOptions.ariaLabelledBy,
                  ariaDescribedBy: modalOptions.ariaDescribedBy,
                  size: modalOptions.size,
                  openedClass: modalOptions.openedClass,
                  appendTo: modalOptions.appendTo
                };

                var component = {};
                var ctrlInstance, ctrlInstantiate, ctrlLocals = {};

                if (modalOptions.component) {
                  constructLocals(component, false, true, false);
                  component.name = modalOptions.component;
                  modal.component = component;
                } else if (modalOptions.controller) {
                  constructLocals(ctrlLocals, true, false, true);

                  // the third param will make the controller instantiate later,private api
                  // @see https://github.com/angular/angular.js/blob/master/src/ng/controller.js#L126
                  ctrlInstantiate = $controller(modalOptions.controller, ctrlLocals, true, modalOptions.controllerAs);
                  if (modalOptions.controllerAs && modalOptions.bindToController) {
                    ctrlInstance = ctrlInstantiate.instance;
                    ctrlInstance.$close = modalScope.$close;
                    ctrlInstance.$dismiss = modalScope.$dismiss;
                    angular.extend(ctrlInstance, {
                      $resolve: ctrlLocals.$scope.$resolve
                    }, providedScope);
                  }

                  ctrlInstance = ctrlInstantiate();

                  if (angular.isFunction(ctrlInstance.$onInit)) {
                    ctrlInstance.$onInit();
                  }
                }

                if (!modalOptions.component) {
                  modal.content = tplAndVars[0];
                }

                $modalStack.open(modalInstance, modal);
                modalOpenedDeferred.resolve(true);

                function constructLocals(obj, template, instanceOnScope, injectable) {
                  obj.$scope = modalScope;
                  obj.$scope.$resolve = {};
                  if (instanceOnScope) {
                    obj.$scope.$uibModalInstance = modalInstance;
                  } else {
                    obj.$uibModalInstance = modalInstance;
                  }

                  var resolves = template ? tplAndVars[1] : tplAndVars;
                  angular.forEach(resolves, function(value, key) {
                    if (injectable) {
                      obj[key] = value;
                    }

                    obj.$scope.$resolve[key] = value;
                  });
                }
            }, function resolveError(reason) {
              modalOpenedDeferred.reject(reason);
              modalResultDeferred.reject(reason);
            })['finally'](function() {
              if (promiseChain === samePromise) {
                promiseChain = null;
              }
            });

            return modalInstance;
          };

          return $modal;
        }
      ]
    };

    return $modalProvider;
  });

angular.module('ui.bootstrap.paging', [])
/**
 * Helper internal service for generating common controller code between the
 * pager and pagination components
 */
.factory('uibPaging', ['$parse', function($parse) {
  return {
    create: function(ctrl, $scope, $attrs) {
      ctrl.setNumPages = $attrs.numPages ? $parse($attrs.numPages).assign : angular.noop;
      ctrl.ngModelCtrl = { $setViewValue: angular.noop }; // nullModelCtrl
      ctrl._watchers = [];

      ctrl.init = function(ngModelCtrl, config) {
        ctrl.ngModelCtrl = ngModelCtrl;
        ctrl.config = config;

        ngModelCtrl.$render = function() {
          ctrl.render();
        };

        if ($attrs.itemsPerPage) {
          ctrl._watchers.push($scope.$parent.$watch($attrs.itemsPerPage, function(value) {
            ctrl.itemsPerPage = parseInt(value, 10);
            $scope.totalPages = ctrl.calculateTotalPages();
            ctrl.updatePage();
          }));
        } else {
          ctrl.itemsPerPage = config.itemsPerPage;
        }

        $scope.$watch('totalItems', function(newTotal, oldTotal) {
          if (angular.isDefined(newTotal) || newTotal !== oldTotal) {
            $scope.totalPages = ctrl.calculateTotalPages();
            ctrl.updatePage();
          }
        });
      };

      ctrl.calculateTotalPages = function() {
        var totalPages = ctrl.itemsPerPage < 1 ? 1 : Math.ceil($scope.totalItems / ctrl.itemsPerPage);
        return Math.max(totalPages || 0, 1);
      };

      ctrl.render = function() {
        $scope.page = parseInt(ctrl.ngModelCtrl.$viewValue, 10) || 1;
      };

      $scope.selectPage = function(page, evt) {
        if (evt) {
          evt.preventDefault();
        }

        var clickAllowed = !$scope.ngDisabled || !evt;
        if (clickAllowed && $scope.page !== page && page > 0 && page <= $scope.totalPages) {
          if (evt && evt.target) {
            evt.target.blur();
          }
          ctrl.ngModelCtrl.$setViewValue(page);
          ctrl.ngModelCtrl.$render();
        }
      };

      $scope.getText = function(key) {
        return $scope[key + 'Text'] || ctrl.config[key + 'Text'];
      };

      $scope.noPrevious = function() {
        return $scope.page === 1;
      };

      $scope.noNext = function() {
        return $scope.page === $scope.totalPages;
      };

      ctrl.updatePage = function() {
        ctrl.setNumPages($scope.$parent, $scope.totalPages); // Readonly variable

        if ($scope.page > $scope.totalPages) {
          $scope.selectPage($scope.totalPages);
        } else {
          ctrl.ngModelCtrl.$render();
        }
      };

      $scope.$on('$destroy', function() {
        while (ctrl._watchers.length) {
          ctrl._watchers.shift()();
        }
      });
    }
  };
}]);

angular.module('ui.bootstrap.pager', ['ui.bootstrap.paging', 'ui.bootstrap.tabindex'])

.controller('UibPagerController', ['$scope', '$attrs', 'uibPaging', 'uibPagerConfig', function($scope, $attrs, uibPaging, uibPagerConfig) {
  $scope.align = angular.isDefined($attrs.align) ? $scope.$parent.$eval($attrs.align) : uibPagerConfig.align;

  uibPaging.create(this, $scope, $attrs);
}])

.constant('uibPagerConfig', {
  itemsPerPage: 10,
  previousText: '« Previous',
  nextText: 'Next »',
  align: true
})

.directive('uibPager', ['uibPagerConfig', function(uibPagerConfig) {
  return {
    scope: {
      totalItems: '=',
      previousText: '@',
      nextText: '@',
      ngDisabled: '='
    },
    require: ['uibPager', '?ngModel'],
    restrict: 'A',
    controller: 'UibPagerController',
    controllerAs: 'pager',
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'uib/template/pager/pager.html';
    },
    link: function(scope, element, attrs, ctrls) {
      element.addClass('pager');
      var paginationCtrl = ctrls[0], ngModelCtrl = ctrls[1];

      if (!ngModelCtrl) {
        return; // do nothing if no ng-model
      }

      paginationCtrl.init(ngModelCtrl, uibPagerConfig);
    }
  };
}]);

angular.module('ui.bootstrap.pagination', ['ui.bootstrap.paging', 'ui.bootstrap.tabindex'])
.controller('UibPaginationController', ['$scope', '$attrs', '$parse', 'uibPaging', 'uibPaginationConfig', function($scope, $attrs, $parse, uibPaging, uibPaginationConfig) {
  var ctrl = this;
  // Setup configuration parameters
  var maxSize = angular.isDefined($attrs.maxSize) ? $scope.$parent.$eval($attrs.maxSize) : uibPaginationConfig.maxSize,
    rotate = angular.isDefined($attrs.rotate) ? $scope.$parent.$eval($attrs.rotate) : uibPaginationConfig.rotate,
    forceEllipses = angular.isDefined($attrs.forceEllipses) ? $scope.$parent.$eval($attrs.forceEllipses) : uibPaginationConfig.forceEllipses,
    boundaryLinkNumbers = angular.isDefined($attrs.boundaryLinkNumbers) ? $scope.$parent.$eval($attrs.boundaryLinkNumbers) : uibPaginationConfig.boundaryLinkNumbers,
    pageLabel = angular.isDefined($attrs.pageLabel) ? function(idx) { return $scope.$parent.$eval($attrs.pageLabel, {$page: idx}); } : angular.identity;
  $scope.boundaryLinks = angular.isDefined($attrs.boundaryLinks) ? $scope.$parent.$eval($attrs.boundaryLinks) : uibPaginationConfig.boundaryLinks;
  $scope.directionLinks = angular.isDefined($attrs.directionLinks) ? $scope.$parent.$eval($attrs.directionLinks) : uibPaginationConfig.directionLinks;
  $attrs.$set('role', 'menu');

  uibPaging.create(this, $scope, $attrs);

  if ($attrs.maxSize) {
    ctrl._watchers.push($scope.$parent.$watch($parse($attrs.maxSize), function(value) {
      maxSize = parseInt(value, 10);
      ctrl.render();
    }));
  }

  // Create page object used in template
  function makePage(number, text, isActive) {
    return {
      number: number,
      text: text,
      active: isActive
    };
  }

  function getPages(currentPage, totalPages) {
    var pages = [];

    // Default page limits
    var startPage = 1, endPage = totalPages;
    var isMaxSized = angular.isDefined(maxSize) && maxSize < totalPages;

    // recompute if maxSize
    if (isMaxSized) {
      if (rotate) {
        // Current page is displayed in the middle of the visible ones
        startPage = Math.max(currentPage - Math.floor(maxSize / 2), 1);
        endPage = startPage + maxSize - 1;

        // Adjust if limit is exceeded
        if (endPage > totalPages) {
          endPage = totalPages;
          startPage = endPage - maxSize + 1;
        }
      } else {
        // Visible pages are paginated with maxSize
        startPage = (Math.ceil(currentPage / maxSize) - 1) * maxSize + 1;

        // Adjust last page if limit is exceeded
        endPage = Math.min(startPage + maxSize - 1, totalPages);
      }
    }

    // Add page number links
    for (var number = startPage; number <= endPage; number++) {
      var page = makePage(number, pageLabel(number), number === currentPage);
      pages.push(page);
    }

    // Add links to move between page sets
    if (isMaxSized && maxSize > 0 && (!rotate || forceEllipses || boundaryLinkNumbers)) {
      if (startPage > 1) {
        if (!boundaryLinkNumbers || startPage > 3) { //need ellipsis for all options unless range is too close to beginning
        var previousPageSet = makePage(startPage - 1, '...', false);
        pages.unshift(previousPageSet);
      }
        if (boundaryLinkNumbers) {
          if (startPage === 3) { //need to replace ellipsis when the buttons would be sequential
            var secondPageLink = makePage(2, '2', false);
            pages.unshift(secondPageLink);
          }
          //add the first page
          var firstPageLink = makePage(1, '1', false);
          pages.unshift(firstPageLink);
        }
      }

      if (endPage < totalPages) {
        if (!boundaryLinkNumbers || endPage < totalPages - 2) { //need ellipsis for all options unless range is too close to end
        var nextPageSet = makePage(endPage + 1, '...', false);
        pages.push(nextPageSet);
      }
        if (boundaryLinkNumbers) {
          if (endPage === totalPages - 2) { //need to replace ellipsis when the buttons would be sequential
            var secondToLastPageLink = makePage(totalPages - 1, totalPages - 1, false);
            pages.push(secondToLastPageLink);
          }
          //add the last page
          var lastPageLink = makePage(totalPages, totalPages, false);
          pages.push(lastPageLink);
        }
      }
    }
    return pages;
  }

  var originalRender = this.render;
  this.render = function() {
    originalRender();
    if ($scope.page > 0 && $scope.page <= $scope.totalPages) {
      $scope.pages = getPages($scope.page, $scope.totalPages);
    }
  };
}])

.constant('uibPaginationConfig', {
  itemsPerPage: 10,
  boundaryLinks: false,
  boundaryLinkNumbers: false,
  directionLinks: true,
  firstText: 'First',
  previousText: 'Previous',
  nextText: 'Next',
  lastText: 'Last',
  rotate: true,
  forceEllipses: false
})

.directive('uibPagination', ['$parse', 'uibPaginationConfig', function($parse, uibPaginationConfig) {
  return {
    scope: {
      totalItems: '=',
      firstText: '@',
      previousText: '@',
      nextText: '@',
      lastText: '@',
      ngDisabled:'='
    },
    require: ['uibPagination', '?ngModel'],
    restrict: 'A',
    controller: 'UibPaginationController',
    controllerAs: 'pagination',
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'uib/template/pagination/pagination.html';
    },
    link: function(scope, element, attrs, ctrls) {
      element.addClass('pagination');
      var paginationCtrl = ctrls[0], ngModelCtrl = ctrls[1];

      if (!ngModelCtrl) {
         return; // do nothing if no ng-model
      }

      paginationCtrl.init(ngModelCtrl, uibPaginationConfig);
    }
  };
}]);

/**
 * The following features are still outstanding: animation as a
 * function, placement as a function, inside, support for more triggers than
 * just mouse enter/leave, html tooltips, and selector delegation.
 */
angular.module('ui.bootstrap.tooltip', ['ui.bootstrap.position', 'ui.bootstrap.stackedMap'])

/**
 * The $tooltip service creates tooltip- and popover-like directives as well as
 * houses global options for them.
 */
.provider('$uibTooltip', function() {
  // The default options tooltip and popover.
  var defaultOptions = {
    placement: 'top',
    placementClassPrefix: '',
    animation: true,
    popupDelay: 0,
    popupCloseDelay: 0,
    useContentExp: false
  };

  // Default hide triggers for each show trigger
  var triggerMap = {
    'mouseenter': 'mouseleave',
    'click': 'click',
    'outsideClick': 'outsideClick',
    'focus': 'blur',
    'none': ''
  };

  // The options specified to the provider globally.
  var globalOptions = {};

  /**
   * `options({})` allows global configuration of all tooltips in the
   * application.
   *
   *   var app = angular.module( 'App', ['ui.bootstrap.tooltip'], function( $tooltipProvider ) {
   *     // place tooltips left instead of top by default
   *     $tooltipProvider.options( { placement: 'left' } );
   *   });
   */
	this.options = function(value) {
		angular.extend(globalOptions, value);
	};

  /**
   * This allows you to extend the set of trigger mappings available. E.g.:
   *
   *   $tooltipProvider.setTriggers( { 'openTrigger': 'closeTrigger' } );
   */
  this.setTriggers = function setTriggers(triggers) {
    angular.extend(triggerMap, triggers);
  };

  /**
   * This is a helper function for translating camel-case to snake_case.
   */
  function snake_case(name) {
    var regexp = /[A-Z]/g;
    var separator = '-';
    return name.replace(regexp, function(letter, pos) {
      return (pos ? separator : '') + letter.toLowerCase();
    });
  }

  /**
   * Returns the actual instance of the $tooltip service.
   * TODO support multiple triggers
   */
  this.$get = ['$window', '$compile', '$timeout', '$document', '$uibPosition', '$interpolate', '$rootScope', '$parse', '$$stackedMap', function($window, $compile, $timeout, $document, $position, $interpolate, $rootScope, $parse, $$stackedMap) {
    var openedTooltips = $$stackedMap.createNew();
    $document.on('keyup', keypressListener);

    $rootScope.$on('$destroy', function() {
      $document.off('keyup', keypressListener);
    });

    function keypressListener(e) {
      if (e.which === 27) {
        var last = openedTooltips.top();
        if (last) {
          last.value.close();
          last = null;
        }
      }
    }

    return function $tooltip(ttType, prefix, defaultTriggerShow, options) {
      options = angular.extend({}, defaultOptions, globalOptions, options);

      /**
       * Returns an object of show and hide triggers.
       *
       * If a trigger is supplied,
       * it is used to show the tooltip; otherwise, it will use the `trigger`
       * option passed to the `$tooltipProvider.options` method; else it will
       * default to the trigger supplied to this directive factory.
       *
       * The hide trigger is based on the show trigger. If the `trigger` option
       * was passed to the `$tooltipProvider.options` method, it will use the
       * mapped trigger from `triggerMap` or the passed trigger if the map is
       * undefined; otherwise, it uses the `triggerMap` value of the show
       * trigger; else it will just use the show trigger.
       */
      function getTriggers(trigger) {
        var show = (trigger || options.trigger || defaultTriggerShow).split(' ');
        var hide = show.map(function(trigger) {
          return triggerMap[trigger] || trigger;
        });
        return {
          show: show,
          hide: hide
        };
      }

      var directiveName = snake_case(ttType);

      var startSym = $interpolate.startSymbol();
      var endSym = $interpolate.endSymbol();
      var template =
        '<div '+ directiveName + '-popup ' +
          'uib-title="' + startSym + 'title' + endSym + '" ' +
          (options.useContentExp ?
            'content-exp="contentExp()" ' :
            'content="' + startSym + 'content' + endSym + '" ') +
          'origin-scope="origScope" ' +
          'class="uib-position-measure ' + prefix + '" ' +
          'tooltip-animation-class="fade"' +
          'uib-tooltip-classes ' +
          'ng-class="{ in: isOpen }" ' +
          '>' +
        '</div>';

      return {
        compile: function(tElem, tAttrs) {
          var tooltipLinker = $compile(template);

          return function link(scope, element, attrs, tooltipCtrl) {
            var tooltip;
            var tooltipLinkedScope;
            var transitionTimeout;
            var showTimeout;
            var hideTimeout;
            var positionTimeout;
            var adjustmentTimeout;
            var appendToBody = angular.isDefined(options.appendToBody) ? options.appendToBody : false;
            var triggers = getTriggers(undefined);
            var hasEnableExp = angular.isDefined(attrs[prefix + 'Enable']);
            var ttScope = scope.$new(true);
            var repositionScheduled = false;
            var isOpenParse = angular.isDefined(attrs[prefix + 'IsOpen']) ? $parse(attrs[prefix + 'IsOpen']) : false;
            var contentParse = options.useContentExp ? $parse(attrs[ttType]) : false;
            var observers = [];
            var lastPlacement;

            var positionTooltip = function() {
              // check if tooltip exists and is not empty
              if (!tooltip || !tooltip.html()) { return; }

              if (!positionTimeout) {
                positionTimeout = $timeout(function() {
                  var ttPosition = $position.positionElements(element, tooltip, ttScope.placement, appendToBody);
                  var initialHeight = angular.isDefined(tooltip.offsetHeight) ? tooltip.offsetHeight : tooltip.prop('offsetHeight');
                  var elementPos = appendToBody ? $position.offset(element) : $position.position(element);
                  tooltip.css({ top: ttPosition.top + 'px', left: ttPosition.left + 'px' });
                  var placementClasses = ttPosition.placement.split('-');

                  if (!tooltip.hasClass(placementClasses[0])) {
                    tooltip.removeClass(lastPlacement.split('-')[0]);
                    tooltip.addClass(placementClasses[0]);
                  }

                  if (!tooltip.hasClass(options.placementClassPrefix + ttPosition.placement)) {
                    tooltip.removeClass(options.placementClassPrefix + lastPlacement);
                    tooltip.addClass(options.placementClassPrefix + ttPosition.placement);
                  }

                  adjustmentTimeout = $timeout(function() {
                    var currentHeight = angular.isDefined(tooltip.offsetHeight) ? tooltip.offsetHeight : tooltip.prop('offsetHeight');
                    var adjustment = $position.adjustTop(placementClasses, elementPos, initialHeight, currentHeight);
                    if (adjustment) {
                      tooltip.css(adjustment);
                    }
                    adjustmentTimeout = null;
                  }, 0, false);

                  // first time through tt element will have the
                  // uib-position-measure class or if the placement
                  // has changed we need to position the arrow.
                  if (tooltip.hasClass('uib-position-measure')) {
                    $position.positionArrow(tooltip, ttPosition.placement);
                    tooltip.removeClass('uib-position-measure');
                  } else if (lastPlacement !== ttPosition.placement) {
                    $position.positionArrow(tooltip, ttPosition.placement);
                  }
                  lastPlacement = ttPosition.placement;

                  positionTimeout = null;
                }, 0, false);
              }
            };

            // Set up the correct scope to allow transclusion later
            ttScope.origScope = scope;

            // By default, the tooltip is not open.
            // TODO add ability to start tooltip opened
            ttScope.isOpen = false;

            function toggleTooltipBind() {
              if (!ttScope.isOpen) {
                showTooltipBind();
              } else {
                hideTooltipBind();
              }
            }

            // Show the tooltip with delay if specified, otherwise show it immediately
            function showTooltipBind() {
              if (hasEnableExp && !scope.$eval(attrs[prefix + 'Enable'])) {
                return;
              }

              cancelHide();
              prepareTooltip();

              if (ttScope.popupDelay) {
                // Do nothing if the tooltip was already scheduled to pop-up.
                // This happens if show is triggered multiple times before any hide is triggered.
                if (!showTimeout) {
                  showTimeout = $timeout(show, ttScope.popupDelay, false);
                }
              } else {
                show();
              }
            }

            function hideTooltipBind() {
              cancelShow();

              if (ttScope.popupCloseDelay) {
                if (!hideTimeout) {
                  hideTimeout = $timeout(hide, ttScope.popupCloseDelay, false);
                }
              } else {
                hide();
              }
            }

            // Show the tooltip popup element.
            function show() {
              cancelShow();
              cancelHide();

              // Don't show empty tooltips.
              if (!ttScope.content) {
                return angular.noop;
              }

              createTooltip();

              // And show the tooltip.
              ttScope.$evalAsync(function() {
                ttScope.isOpen = true;
                assignIsOpen(true);
                positionTooltip();
              });
            }

            function cancelShow() {
              if (showTimeout) {
                $timeout.cancel(showTimeout);
                showTimeout = null;
              }

              if (positionTimeout) {
                $timeout.cancel(positionTimeout);
                positionTimeout = null;
              }
            }

            // Hide the tooltip popup element.
            function hide() {
              if (!ttScope) {
                return;
              }

              // First things first: we don't show it anymore.
              ttScope.$evalAsync(function() {
                if (ttScope) {
                  ttScope.isOpen = false;
                  assignIsOpen(false);
                  // And now we remove it from the DOM. However, if we have animation, we
                  // need to wait for it to expire beforehand.
                  // FIXME: this is a placeholder for a port of the transitions library.
                  // The fade transition in TWBS is 150ms.
                  if (ttScope.animation) {
                    if (!transitionTimeout) {
                      transitionTimeout = $timeout(removeTooltip, 150, false);
                    }
                  } else {
                    removeTooltip();
                  }
                }
              });
            }

            function cancelHide() {
              if (hideTimeout) {
                $timeout.cancel(hideTimeout);
                hideTimeout = null;
              }

              if (transitionTimeout) {
                $timeout.cancel(transitionTimeout);
                transitionTimeout = null;
              }
            }

            function createTooltip() {
              // There can only be one tooltip element per directive shown at once.
              if (tooltip) {
                return;
              }

              tooltipLinkedScope = ttScope.$new();
              tooltip = tooltipLinker(tooltipLinkedScope, function(tooltip) {
                if (appendToBody) {
                  $document.find('body').append(tooltip);
                } else {
                  element.after(tooltip);
                }
              });

              openedTooltips.add(ttScope, {
                close: hide
              });

              prepObservers();
            }

            function removeTooltip() {
              cancelShow();
              cancelHide();
              unregisterObservers();

              if (tooltip) {
                tooltip.remove();
                
                tooltip = null;
                if (adjustmentTimeout) {
                  $timeout.cancel(adjustmentTimeout);
                }
              }

              openedTooltips.remove(ttScope);
              
              if (tooltipLinkedScope) {
                tooltipLinkedScope.$destroy();
                tooltipLinkedScope = null;
              }
            }

            /**
             * Set the initial scope values. Once
             * the tooltip is created, the observers
             * will be added to keep things in sync.
             */
            function prepareTooltip() {
              ttScope.title = attrs[prefix + 'Title'];
              if (contentParse) {
                ttScope.content = contentParse(scope);
              } else {
                ttScope.content = attrs[ttType];
              }

              ttScope.popupClass = attrs[prefix + 'Class'];
              ttScope.placement = angular.isDefined(attrs[prefix + 'Placement']) ? attrs[prefix + 'Placement'] : options.placement;
              var placement = $position.parsePlacement(ttScope.placement);
              lastPlacement = placement[1] ? placement[0] + '-' + placement[1] : placement[0];

              var delay = parseInt(attrs[prefix + 'PopupDelay'], 10);
              var closeDelay = parseInt(attrs[prefix + 'PopupCloseDelay'], 10);
              ttScope.popupDelay = !isNaN(delay) ? delay : options.popupDelay;
              ttScope.popupCloseDelay = !isNaN(closeDelay) ? closeDelay : options.popupCloseDelay;
            }

            function assignIsOpen(isOpen) {
              if (isOpenParse && angular.isFunction(isOpenParse.assign)) {
                isOpenParse.assign(scope, isOpen);
              }
            }

            ttScope.contentExp = function() {
              return ttScope.content;
            };

            /**
             * Observe the relevant attributes.
             */
            attrs.$observe('disabled', function(val) {
              if (val) {
                cancelShow();
              }

              if (val && ttScope.isOpen) {
                hide();
              }
            });

            if (isOpenParse) {
              scope.$watch(isOpenParse, function(val) {
                if (ttScope && !val === ttScope.isOpen) {
                  toggleTooltipBind();
                }
              });
            }

            function prepObservers() {
              observers.length = 0;

              if (contentParse) {
                observers.push(
                  scope.$watch(contentParse, function(val) {
                    ttScope.content = val;
                    if (!val && ttScope.isOpen) {
                      hide();
                    }
                  })
                );

                observers.push(
                  tooltipLinkedScope.$watch(function() {
                    if (!repositionScheduled) {
                      repositionScheduled = true;
                      tooltipLinkedScope.$$postDigest(function() {
                        repositionScheduled = false;
                        if (ttScope && ttScope.isOpen) {
                          positionTooltip();
                        }
                      });
                    }
                  })
                );
              } else {
                observers.push(
                  attrs.$observe(ttType, function(val) {
                    ttScope.content = val;
                    if (!val && ttScope.isOpen) {
                      hide();
                    } else {
                      positionTooltip();
                    }
                  })
                );
              }

              observers.push(
                attrs.$observe(prefix + 'Title', function(val) {
                  ttScope.title = val;
                  if (ttScope.isOpen) {
                    positionTooltip();
                  }
                })
              );

              observers.push(
                attrs.$observe(prefix + 'Placement', function(val) {
                  ttScope.placement = val ? val : options.placement;
                  if (ttScope.isOpen) {
                    positionTooltip();
                  }
                })
              );
            }

            function unregisterObservers() {
              if (observers.length) {
                angular.forEach(observers, function(observer) {
                  observer();
                });
                observers.length = 0;
              }
            }

            // hide tooltips/popovers for outsideClick trigger
            function bodyHideTooltipBind(e) {
              if (!ttScope || !ttScope.isOpen || !tooltip) {
                return;
              }
              // make sure the tooltip/popover link or tool tooltip/popover itself were not clicked
              if (!element[0].contains(e.target) && !tooltip[0].contains(e.target)) {
                hideTooltipBind();
              }
            }

            // KeyboardEvent handler to hide the tooltip on Escape key press
            function hideOnEscapeKey(e) {
              if (e.which === 27) {
                hideTooltipBind();
              }
            }

            var unregisterTriggers = function() {
              triggers.show.forEach(function(trigger) {
                if (trigger === 'outsideClick') {
                  element.off('click', toggleTooltipBind);
                } else {
                  element.off(trigger, showTooltipBind);
                  element.off(trigger, toggleTooltipBind);
                }
                element.off('keypress', hideOnEscapeKey);
              });
              triggers.hide.forEach(function(trigger) {
                if (trigger === 'outsideClick') {
                  $document.off('click', bodyHideTooltipBind);
                } else {
                  element.off(trigger, hideTooltipBind);
                }
              });
            };

            function prepTriggers() {
              var showTriggers = [], hideTriggers = [];
              var val = scope.$eval(attrs[prefix + 'Trigger']);
              unregisterTriggers();

              if (angular.isObject(val)) {
                Object.keys(val).forEach(function(key) {
                  showTriggers.push(key);
                  hideTriggers.push(val[key]);
                });
                triggers = {
                  show: showTriggers,
                  hide: hideTriggers
                };
              } else {
                triggers = getTriggers(val);
              }

              if (triggers.show !== 'none') {
                triggers.show.forEach(function(trigger, idx) {
                  if (trigger === 'outsideClick') {
                    element.on('click', toggleTooltipBind);
                    $document.on('click', bodyHideTooltipBind);
                  } else if (trigger === triggers.hide[idx]) {
                    element.on(trigger, toggleTooltipBind);
                  } else if (trigger) {
                    element.on(trigger, showTooltipBind);
                    element.on(triggers.hide[idx], hideTooltipBind);
                  }
                  element.on('keypress', hideOnEscapeKey);
                });
              }
            }

            prepTriggers();

            var animation = scope.$eval(attrs[prefix + 'Animation']);
            ttScope.animation = angular.isDefined(animation) ? !!animation : options.animation;

            var appendToBodyVal;
            var appendKey = prefix + 'AppendToBody';
            if (appendKey in attrs && attrs[appendKey] === undefined) {
              appendToBodyVal = true;
            } else {
              appendToBodyVal = scope.$eval(attrs[appendKey]);
            }

            appendToBody = angular.isDefined(appendToBodyVal) ? appendToBodyVal : appendToBody;

            // Make sure tooltip is destroyed and removed.
            scope.$on('$destroy', function onDestroyTooltip() {
              unregisterTriggers();
              removeTooltip();
              ttScope = null;
            });
          };
        }
      };
    };
  }];
})

// This is mostly ngInclude code but with a custom scope
.directive('uibTooltipTemplateTransclude', [
         '$animate', '$sce', '$compile', '$templateRequest',
function ($animate, $sce, $compile, $templateRequest) {
  return {
    link: function(scope, elem, attrs) {
      var origScope = scope.$eval(attrs.tooltipTemplateTranscludeScope);

      var changeCounter = 0,
        currentScope,
        previousElement,
        currentElement;

      var cleanupLastIncludeContent = function() {
        if (previousElement) {
          previousElement.remove();
          previousElement = null;
        }

        if (currentScope) {
          currentScope.$destroy();
          currentScope = null;
        }

        if (currentElement) {
          $animate.leave(currentElement).then(function() {
            previousElement = null;
          });
          previousElement = currentElement;
          currentElement = null;
        }
      };

      scope.$watch($sce.parseAsResourceUrl(attrs.uibTooltipTemplateTransclude), function(src) {
        var thisChangeId = ++changeCounter;

        if (src) {
          //set the 2nd param to true to ignore the template request error so that the inner
          //contents and scope can be cleaned up.
          $templateRequest(src, true).then(function(response) {
            if (thisChangeId !== changeCounter) { return; }
            var newScope = origScope.$new();
            var template = response;

            var clone = $compile(template)(newScope, function(clone) {
              cleanupLastIncludeContent();
              $animate.enter(clone, elem);
            });

            currentScope = newScope;
            currentElement = clone;

            currentScope.$emit('$includeContentLoaded', src);
          }, function() {
            if (thisChangeId === changeCounter) {
              cleanupLastIncludeContent();
              scope.$emit('$includeContentError', src);
            }
          });
          scope.$emit('$includeContentRequested', src);
        } else {
          cleanupLastIncludeContent();
        }
      });

      scope.$on('$destroy', cleanupLastIncludeContent);
    }
  };
}])

/**
 * Note that it's intentional that these classes are *not* applied through $animate.
 * They must not be animated as they're expected to be present on the tooltip on
 * initialization.
 */
.directive('uibTooltipClasses', ['$uibPosition', function($uibPosition) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      // need to set the primary position so the
      // arrow has space during position measure.
      // tooltip.positionTooltip()
      if (scope.placement) {
        // // There are no top-left etc... classes
        // // in TWBS, so we need the primary position.
        var position = $uibPosition.parsePlacement(scope.placement);
        element.addClass(position[0]);
      }

      if (scope.popupClass) {
        element.addClass(scope.popupClass);
      }

      if (scope.animation) {
        element.addClass(attrs.tooltipAnimationClass);
      }
    }
  };
}])

.directive('uibTooltipPopup', function() {
  return {
    restrict: 'A',
    scope: { content: '@' },
    templateUrl: 'uib/template/tooltip/tooltip-popup.html'
  };
})

.directive('uibTooltip', [ '$uibTooltip', function($uibTooltip) {
  return $uibTooltip('uibTooltip', 'tooltip', 'mouseenter');
}])

.directive('uibTooltipTemplatePopup', function() {
  return {
    restrict: 'A',
    scope: { contentExp: '&', originScope: '&' },
    templateUrl: 'uib/template/tooltip/tooltip-template-popup.html'
  };
})

.directive('uibTooltipTemplate', ['$uibTooltip', function($uibTooltip) {
  return $uibTooltip('uibTooltipTemplate', 'tooltip', 'mouseenter', {
    useContentExp: true
  });
}])

.directive('uibTooltipHtmlPopup', function() {
  return {
    restrict: 'A',
    scope: { contentExp: '&' },
    templateUrl: 'uib/template/tooltip/tooltip-html-popup.html'
  };
})

.directive('uibTooltipHtml', ['$uibTooltip', function($uibTooltip) {
  return $uibTooltip('uibTooltipHtml', 'tooltip', 'mouseenter', {
    useContentExp: true
  });
}]);

/**
 * The following features are still outstanding: popup delay, animation as a
 * function, placement as a function, inside, support for more triggers than
 * just mouse enter/leave, and selector delegatation.
 */
angular.module('ui.bootstrap.popover', ['ui.bootstrap.tooltip'])

.directive('uibPopoverTemplatePopup', function() {
  return {
    restrict: 'A',
    scope: { uibTitle: '@', contentExp: '&', originScope: '&' },
    templateUrl: 'uib/template/popover/popover-template.html'
  };
})

.directive('uibPopoverTemplate', ['$uibTooltip', function($uibTooltip) {
  return $uibTooltip('uibPopoverTemplate', 'popover', 'click', {
    useContentExp: true
  });
}])

.directive('uibPopoverHtmlPopup', function() {
  return {
    restrict: 'A',
    scope: { contentExp: '&', uibTitle: '@' },
    templateUrl: 'uib/template/popover/popover-html.html'
  };
})

.directive('uibPopoverHtml', ['$uibTooltip', function($uibTooltip) {
  return $uibTooltip('uibPopoverHtml', 'popover', 'click', {
    useContentExp: true
  });
}])

.directive('uibPopoverPopup', function() {
  return {
    restrict: 'A',
    scope: { uibTitle: '@', content: '@' },
    templateUrl: 'uib/template/popover/popover.html'
  };
})

.directive('uibPopover', ['$uibTooltip', function($uibTooltip) {
  return $uibTooltip('uibPopover', 'popover', 'click');
}]);

angular.module('ui.bootstrap.progressbar', [])

.constant('uibProgressConfig', {
  animate: true,
  max: 100
})

.controller('UibProgressController', ['$scope', '$attrs', 'uibProgressConfig', function($scope, $attrs, progressConfig) {
  var self = this,
      animate = angular.isDefined($attrs.animate) ? $scope.$parent.$eval($attrs.animate) : progressConfig.animate;

  this.bars = [];
  $scope.max = getMaxOrDefault();

  this.addBar = function(bar, element, attrs) {
    if (!animate) {
      element.css({'transition': 'none'});
    }

    this.bars.push(bar);

    bar.max = getMaxOrDefault();
    bar.title = attrs && angular.isDefined(attrs.title) ? attrs.title : 'progressbar';

    bar.$watch('value', function(value) {
      bar.recalculatePercentage();
    });

    bar.recalculatePercentage = function() {
      var totalPercentage = self.bars.reduce(function(total, bar) {
        bar.percent = +(100 * bar.value / bar.max).toFixed(2);
        return total + bar.percent;
      }, 0);

      if (totalPercentage > 100) {
        bar.percent -= totalPercentage - 100;
      }
    };

    bar.$on('$destroy', function() {
      element = null;
      self.removeBar(bar);
    });
  };

  this.removeBar = function(bar) {
    this.bars.splice(this.bars.indexOf(bar), 1);
    this.bars.forEach(function (bar) {
      bar.recalculatePercentage();
    });
  };

  //$attrs.$observe('maxParam', function(maxParam) {
  $scope.$watch('maxParam', function(maxParam) {
    self.bars.forEach(function(bar) {
      bar.max = getMaxOrDefault();
      bar.recalculatePercentage();
    });
  });

  function getMaxOrDefault () {
    return angular.isDefined($scope.maxParam) ? $scope.maxParam : progressConfig.max;
  }
}])

.directive('uibProgress', function() {
  return {
    replace: true,
    transclude: true,
    controller: 'UibProgressController',
    require: 'uibProgress',
    scope: {
      maxParam: '=?max'
    },
    templateUrl: 'uib/template/progressbar/progress.html'
  };
})

.directive('uibBar', function() {
  return {
    replace: true,
    transclude: true,
    require: '^uibProgress',
    scope: {
      value: '=',
      type: '@'
    },
    templateUrl: 'uib/template/progressbar/bar.html',
    link: function(scope, element, attrs, progressCtrl) {
      progressCtrl.addBar(scope, element, attrs);
    }
  };
})

.directive('uibProgressbar', function() {
  return {
    replace: true,
    transclude: true,
    controller: 'UibProgressController',
    scope: {
      value: '=',
      maxParam: '=?max',
      type: '@'
    },
    templateUrl: 'uib/template/progressbar/progressbar.html',
    link: function(scope, element, attrs, progressCtrl) {
      progressCtrl.addBar(scope, angular.element(element.children()[0]), {title: attrs.title});
    }
  };
});

angular.module('ui.bootstrap.rating', [])

.constant('uibRatingConfig', {
  max: 5,
  stateOn: null,
  stateOff: null,
  enableReset: true,
  titles: ['one', 'two', 'three', 'four', 'five']
})

.controller('UibRatingController', ['$scope', '$attrs', 'uibRatingConfig', function($scope, $attrs, ratingConfig) {
  var ngModelCtrl = { $setViewValue: angular.noop },
    self = this;

  this.init = function(ngModelCtrl_) {
    ngModelCtrl = ngModelCtrl_;
    ngModelCtrl.$render = this.render;

    ngModelCtrl.$formatters.push(function(value) {
      if (angular.isNumber(value) && value << 0 !== value) {
        value = Math.round(value);
      }

      return value;
    });

    this.stateOn = angular.isDefined($attrs.stateOn) ? $scope.$parent.$eval($attrs.stateOn) : ratingConfig.stateOn;
    this.stateOff = angular.isDefined($attrs.stateOff) ? $scope.$parent.$eval($attrs.stateOff) : ratingConfig.stateOff;
    this.enableReset = angular.isDefined($attrs.enableReset) ?
      $scope.$parent.$eval($attrs.enableReset) : ratingConfig.enableReset;
    var tmpTitles = angular.isDefined($attrs.titles) ? $scope.$parent.$eval($attrs.titles) : ratingConfig.titles;
    this.titles = angular.isArray(tmpTitles) && tmpTitles.length > 0 ?
      tmpTitles : ratingConfig.titles;

    var ratingStates = angular.isDefined($attrs.ratingStates) ?
      $scope.$parent.$eval($attrs.ratingStates) :
      new Array(angular.isDefined($attrs.max) ? $scope.$parent.$eval($attrs.max) : ratingConfig.max);
    $scope.range = this.buildTemplateObjects(ratingStates);
  };

  this.buildTemplateObjects = function(states) {
    for (var i = 0, n = states.length; i < n; i++) {
      states[i] = angular.extend({ index: i }, { stateOn: this.stateOn, stateOff: this.stateOff, title: this.getTitle(i) }, states[i]);
    }
    return states;
  };

  this.getTitle = function(index) {
    if (index >= this.titles.length) {
      return index + 1;
    }

    return this.titles[index];
  };

  $scope.rate = function(value) {
    if (!$scope.readonly && value >= 0 && value <= $scope.range.length) {
      var newViewValue = self.enableReset && ngModelCtrl.$viewValue === value ? 0 : value;
      ngModelCtrl.$setViewValue(newViewValue);
      ngModelCtrl.$render();
    }
  };

  $scope.enter = function(value) {
    if (!$scope.readonly) {
      $scope.value = value;
    }
    $scope.onHover({value: value});
  };

  $scope.reset = function() {
    $scope.value = ngModelCtrl.$viewValue;
    $scope.onLeave();
  };

  $scope.onKeydown = function(evt) {
    if (/(37|38|39|40)/.test(evt.which)) {
      evt.preventDefault();
      evt.stopPropagation();
      $scope.rate($scope.value + (evt.which === 38 || evt.which === 39 ? 1 : -1));
    }
  };

  this.render = function() {
    $scope.value = ngModelCtrl.$viewValue;
    $scope.title = self.getTitle($scope.value - 1);
  };
}])

.directive('uibRating', function() {
  return {
    require: ['uibRating', 'ngModel'],
    restrict: 'A',
    scope: {
      readonly: '=?readOnly',
      onHover: '&',
      onLeave: '&'
    },
    controller: 'UibRatingController',
    templateUrl: 'uib/template/rating/rating.html',
    link: function(scope, element, attrs, ctrls) {
      var ratingCtrl = ctrls[0], ngModelCtrl = ctrls[1];
      ratingCtrl.init(ngModelCtrl);
    }
  };
});

angular.module('ui.bootstrap.tabs', [])

.controller('UibTabsetController', ['$scope', function ($scope) {
  var ctrl = this,
    oldIndex;
  ctrl.tabs = [];

  ctrl.select = function(index, evt) {
    if (!destroyed) {
      var previousIndex = findTabIndex(oldIndex);
      var previousSelected = ctrl.tabs[previousIndex];
      if (previousSelected) {
        previousSelected.tab.onDeselect({
          $event: evt,
          $selectedIndex: index
        });
        if (evt && evt.isDefaultPrevented()) {
          return;
        }
        previousSelected.tab.active = false;
      }

      var selected = ctrl.tabs[index];
      if (selected) {
        selected.tab.onSelect({
          $event: evt
        });
        selected.tab.active = true;
        ctrl.active = selected.index;
        oldIndex = selected.index;
      } else if (!selected && angular.isDefined(oldIndex)) {
        ctrl.active = null;
        oldIndex = null;
      }
    }
  };

  ctrl.addTab = function addTab(tab) {
    ctrl.tabs.push({
      tab: tab,
      index: tab.index
    });
    ctrl.tabs.sort(function(t1, t2) {
      if (t1.index > t2.index) {
        return 1;
      }

      if (t1.index < t2.index) {
        return -1;
      }

      return 0;
    });

    if (tab.index === ctrl.active || !angular.isDefined(ctrl.active) && ctrl.tabs.length === 1) {
      var newActiveIndex = findTabIndex(tab.index);
      ctrl.select(newActiveIndex);
    }
  };

  ctrl.removeTab = function removeTab(tab) {
    var index;
    for (var i = 0; i < ctrl.tabs.length; i++) {
      if (ctrl.tabs[i].tab === tab) {
        index = i;
        break;
      }
    }

    if (ctrl.tabs[index].index === ctrl.active) {
      var newActiveTabIndex = index === ctrl.tabs.length - 1 ?
        index - 1 : index + 1 % ctrl.tabs.length;
      ctrl.select(newActiveTabIndex);
    }

    ctrl.tabs.splice(index, 1);
  };

  $scope.$watch('tabset.active', function(val) {
    if (angular.isDefined(val) && val !== oldIndex) {
      ctrl.select(findTabIndex(val));
    }
  });

  var destroyed;
  $scope.$on('$destroy', function() {
    destroyed = true;
  });

  function findTabIndex(index) {
    for (var i = 0; i < ctrl.tabs.length; i++) {
      if (ctrl.tabs[i].index === index) {
        return i;
      }
    }
  }
}])

.directive('uibTabset', function() {
  return {
    transclude: true,
    replace: true,
    scope: {},
    bindToController: {
      active: '=?',
      type: '@'
    },
    controller: 'UibTabsetController',
    controllerAs: 'tabset',
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'uib/template/tabs/tabset.html';
    },
    link: function(scope, element, attrs) {
      scope.vertical = angular.isDefined(attrs.vertical) ?
        scope.$parent.$eval(attrs.vertical) : false;
      scope.justified = angular.isDefined(attrs.justified) ?
        scope.$parent.$eval(attrs.justified) : false;
    }
  };
})

.directive('uibTab', ['$parse', function($parse) {
  return {
    require: '^uibTabset',
    replace: true,
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'uib/template/tabs/tab.html';
    },
    transclude: true,
    scope: {
      heading: '@',
      index: '=?',
      classes: '@?',
      onSelect: '&select', //This callback is called in contentHeadingTransclude
                          //once it inserts the tab's content into the dom
      onDeselect: '&deselect'
    },
    controller: function() {
      //Empty controller so other directives can require being 'under' a tab
    },
    controllerAs: 'tab',
    link: function(scope, elm, attrs, tabsetCtrl, transclude) {
      scope.disabled = false;
      if (attrs.disable) {
        scope.$parent.$watch($parse(attrs.disable), function(value) {
          scope.disabled = !! value;
        });
      }

      if (angular.isUndefined(attrs.index)) {
        if (tabsetCtrl.tabs && tabsetCtrl.tabs.length) {
          scope.index = Math.max.apply(null, tabsetCtrl.tabs.map(function(t) { return t.index; })) + 1;
        } else {
          scope.index = 0;
        }
      }

      if (angular.isUndefined(attrs.classes)) {
        scope.classes = '';
      }

      scope.select = function(evt) {
        if (!scope.disabled) {
          var index;
          for (var i = 0; i < tabsetCtrl.tabs.length; i++) {
            if (tabsetCtrl.tabs[i].tab === scope) {
              index = i;
              break;
            }
          }

          tabsetCtrl.select(index, evt);
        }
      };

      tabsetCtrl.addTab(scope);
      scope.$on('$destroy', function() {
        tabsetCtrl.removeTab(scope);
      });

      //We need to transclude later, once the content container is ready.
      //when this link happens, we're inside a tab heading.
      scope.$transcludeFn = transclude;
    }
  };
}])

.directive('uibTabHeadingTransclude', function() {
  return {
    restrict: 'A',
    require: '^uibTab',
    link: function(scope, elm) {
      scope.$watch('headingElement', function updateHeadingElement(heading) {
        if (heading) {
          elm.html('');
          elm.append(heading);
        }
      });
    }
  };
})

.directive('uibTabContentTransclude', function() {
  return {
    restrict: 'A',
    require: '^uibTabset',
    link: function(scope, elm, attrs) {
      var tab = scope.$eval(attrs.uibTabContentTransclude).tab;

      //Now our tab is ready to be transcluded: both the tab heading area
      //and the tab content area are loaded.  Transclude 'em both.
      tab.$transcludeFn(tab.$parent, function(contents) {
        angular.forEach(contents, function(node) {
          if (isTabHeading(node)) {
            //Let tabHeadingTransclude know.
            tab.headingElement = node;
          } else {
            elm.append(node);
          }
        });
      });
    }
  };

  function isTabHeading(node) {
    return node.tagName && (
      node.hasAttribute('uib-tab-heading') ||
      node.hasAttribute('data-uib-tab-heading') ||
      node.hasAttribute('x-uib-tab-heading') ||
      node.tagName.toLowerCase() === 'uib-tab-heading' ||
      node.tagName.toLowerCase() === 'data-uib-tab-heading' ||
      node.tagName.toLowerCase() === 'x-uib-tab-heading' ||
      node.tagName.toLowerCase() === 'uib:tab-heading'
    );
  }
});

angular.module('ui.bootstrap.timepicker', [])

.constant('uibTimepickerConfig', {
  hourStep: 1,
  minuteStep: 1,
  secondStep: 1,
  showMeridian: true,
  showSeconds: false,
  meridians: null,
  readonlyInput: false,
  mousewheel: true,
  arrowkeys: true,
  showSpinners: true,
  templateUrl: 'uib/template/timepicker/timepicker.html'
})

.controller('UibTimepickerController', ['$scope', '$element', '$attrs', '$parse', '$log', '$locale', 'uibTimepickerConfig', function($scope, $element, $attrs, $parse, $log, $locale, timepickerConfig) {
  var hoursModelCtrl, minutesModelCtrl, secondsModelCtrl;
  var selected = new Date(),
    watchers = [],
    ngModelCtrl = { $setViewValue: angular.noop }, // nullModelCtrl
    meridians = angular.isDefined($attrs.meridians) ? $scope.$parent.$eval($attrs.meridians) : timepickerConfig.meridians || $locale.DATETIME_FORMATS.AMPMS,
    padHours = angular.isDefined($attrs.padHours) ? $scope.$parent.$eval($attrs.padHours) : true;

  $scope.tabindex = angular.isDefined($attrs.tabindex) ? $attrs.tabindex : 0;
  $element.removeAttr('tabindex');

  this.init = function(ngModelCtrl_, inputs) {
    ngModelCtrl = ngModelCtrl_;
    ngModelCtrl.$render = this.render;

    ngModelCtrl.$formatters.unshift(function(modelValue) {
      return modelValue ? new Date(modelValue) : null;
    });

    var hoursInputEl = inputs.eq(0),
        minutesInputEl = inputs.eq(1),
        secondsInputEl = inputs.eq(2);

    hoursModelCtrl = hoursInputEl.controller('ngModel');
    minutesModelCtrl = minutesInputEl.controller('ngModel');
    secondsModelCtrl = secondsInputEl.controller('ngModel');

    var mousewheel = angular.isDefined($attrs.mousewheel) ? $scope.$parent.$eval($attrs.mousewheel) : timepickerConfig.mousewheel;

    if (mousewheel) {
      this.setupMousewheelEvents(hoursInputEl, minutesInputEl, secondsInputEl);
    }

    var arrowkeys = angular.isDefined($attrs.arrowkeys) ? $scope.$parent.$eval($attrs.arrowkeys) : timepickerConfig.arrowkeys;
    if (arrowkeys) {
      this.setupArrowkeyEvents(hoursInputEl, minutesInputEl, secondsInputEl);
    }

    $scope.readonlyInput = angular.isDefined($attrs.readonlyInput) ? $scope.$parent.$eval($attrs.readonlyInput) : timepickerConfig.readonlyInput;
    this.setupInputEvents(hoursInputEl, minutesInputEl, secondsInputEl);
  };

  var hourStep = timepickerConfig.hourStep;
  if ($attrs.hourStep) {
    watchers.push($scope.$parent.$watch($parse($attrs.hourStep), function(value) {
      hourStep = +value;
    }));
  }

  var minuteStep = timepickerConfig.minuteStep;
  if ($attrs.minuteStep) {
    watchers.push($scope.$parent.$watch($parse($attrs.minuteStep), function(value) {
      minuteStep = +value;
    }));
  }

  var min;
  watchers.push($scope.$parent.$watch($parse($attrs.min), function(value) {
    var dt = new Date(value);
    min = isNaN(dt) ? undefined : dt;
  }));

  var max;
  watchers.push($scope.$parent.$watch($parse($attrs.max), function(value) {
    var dt = new Date(value);
    max = isNaN(dt) ? undefined : dt;
  }));

  var disabled = false;
  if ($attrs.ngDisabled) {
    watchers.push($scope.$parent.$watch($parse($attrs.ngDisabled), function(value) {
      disabled = value;
    }));
  }

  $scope.noIncrementHours = function() {
    var incrementedSelected = addMinutes(selected, hourStep * 60);
    return disabled || incrementedSelected > max ||
      incrementedSelected < selected && incrementedSelected < min;
  };

  $scope.noDecrementHours = function() {
    var decrementedSelected = addMinutes(selected, -hourStep * 60);
    return disabled || decrementedSelected < min ||
      decrementedSelected > selected && decrementedSelected > max;
  };

  $scope.noIncrementMinutes = function() {
    var incrementedSelected = addMinutes(selected, minuteStep);
    return disabled || incrementedSelected > max ||
      incrementedSelected < selected && incrementedSelected < min;
  };

  $scope.noDecrementMinutes = function() {
    var decrementedSelected = addMinutes(selected, -minuteStep);
    return disabled || decrementedSelected < min ||
      decrementedSelected > selected && decrementedSelected > max;
  };

  $scope.noIncrementSeconds = function() {
    var incrementedSelected = addSeconds(selected, secondStep);
    return disabled || incrementedSelected > max ||
      incrementedSelected < selected && incrementedSelected < min;
  };

  $scope.noDecrementSeconds = function() {
    var decrementedSelected = addSeconds(selected, -secondStep);
    return disabled || decrementedSelected < min ||
      decrementedSelected > selected && decrementedSelected > max;
  };

  $scope.noToggleMeridian = function() {
    if (selected.getHours() < 12) {
      return disabled || addMinutes(selected, 12 * 60) > max;
    }

    return disabled || addMinutes(selected, -12 * 60) < min;
  };

  var secondStep = timepickerConfig.secondStep;
  if ($attrs.secondStep) {
    watchers.push($scope.$parent.$watch($parse($attrs.secondStep), function(value) {
      secondStep = +value;
    }));
  }

  $scope.showSeconds = timepickerConfig.showSeconds;
  if ($attrs.showSeconds) {
    watchers.push($scope.$parent.$watch($parse($attrs.showSeconds), function(value) {
      $scope.showSeconds = !!value;
    }));
  }

  // 12H / 24H mode
  $scope.showMeridian = timepickerConfig.showMeridian;
  if ($attrs.showMeridian) {
    watchers.push($scope.$parent.$watch($parse($attrs.showMeridian), function(value) {
      $scope.showMeridian = !!value;

      if (ngModelCtrl.$error.time) {
        // Evaluate from template
        var hours = getHoursFromTemplate(), minutes = getMinutesFromTemplate();
        if (angular.isDefined(hours) && angular.isDefined(minutes)) {
          selected.setHours(hours);
          refresh();
        }
      } else {
        updateTemplate();
      }
    }));
  }

  // Get $scope.hours in 24H mode if valid
  function getHoursFromTemplate() {
    var hours = +$scope.hours;
    var valid = $scope.showMeridian ? hours > 0 && hours < 13 :
      hours >= 0 && hours < 24;
    if (!valid || $scope.hours === '') {
      return undefined;
    }

    if ($scope.showMeridian) {
      if (hours === 12) {
        hours = 0;
      }
      if ($scope.meridian === meridians[1]) {
        hours = hours + 12;
      }
    }
    return hours;
  }

  function getMinutesFromTemplate() {
    var minutes = +$scope.minutes;
    var valid = minutes >= 0 && minutes < 60;
    if (!valid || $scope.minutes === '') {
      return undefined;
    }
    return minutes;
  }

  function getSecondsFromTemplate() {
    var seconds = +$scope.seconds;
    return seconds >= 0 && seconds < 60 ? seconds : undefined;
  }

  function pad(value, noPad) {
    if (value === null) {
      return '';
    }

    return angular.isDefined(value) && value.toString().length < 2 && !noPad ?
      '0' + value : value.toString();
  }

  // Respond on mousewheel spin
  this.setupMousewheelEvents = function(hoursInputEl, minutesInputEl, secondsInputEl) {
    var isScrollingUp = function(e) {
      if (e.originalEvent) {
        e = e.originalEvent;
      }
      //pick correct delta variable depending on event
      var delta = e.wheelDelta ? e.wheelDelta : -e.deltaY;
      return e.detail || delta > 0;
    };

    hoursInputEl.on('mousewheel wheel', function(e) {
      if (!disabled) {
        $scope.$apply(isScrollingUp(e) ? $scope.incrementHours() : $scope.decrementHours());
      }
      e.preventDefault();
    });

    minutesInputEl.on('mousewheel wheel', function(e) {
      if (!disabled) {
        $scope.$apply(isScrollingUp(e) ? $scope.incrementMinutes() : $scope.decrementMinutes());
      }
      e.preventDefault();
    });

     secondsInputEl.on('mousewheel wheel', function(e) {
      if (!disabled) {
        $scope.$apply(isScrollingUp(e) ? $scope.incrementSeconds() : $scope.decrementSeconds());
      }
      e.preventDefault();
    });
  };

  // Respond on up/down arrowkeys
  this.setupArrowkeyEvents = function(hoursInputEl, minutesInputEl, secondsInputEl) {
    hoursInputEl.on('keydown', function(e) {
      if (!disabled) {
        if (e.which === 38) { // up
          e.preventDefault();
          $scope.incrementHours();
          $scope.$apply();
        } else if (e.which === 40) { // down
          e.preventDefault();
          $scope.decrementHours();
          $scope.$apply();
        }
      }
    });

    minutesInputEl.on('keydown', function(e) {
      if (!disabled) {
        if (e.which === 38) { // up
          e.preventDefault();
          $scope.incrementMinutes();
          $scope.$apply();
        } else if (e.which === 40) { // down
          e.preventDefault();
          $scope.decrementMinutes();
          $scope.$apply();
        }
      }
    });

    secondsInputEl.on('keydown', function(e) {
      if (!disabled) {
        if (e.which === 38) { // up
          e.preventDefault();
          $scope.incrementSeconds();
          $scope.$apply();
        } else if (e.which === 40) { // down
          e.preventDefault();
          $scope.decrementSeconds();
          $scope.$apply();
        }
      }
    });
  };

  this.setupInputEvents = function(hoursInputEl, minutesInputEl, secondsInputEl) {
    if ($scope.readonlyInput) {
      $scope.updateHours = angular.noop;
      $scope.updateMinutes = angular.noop;
      $scope.updateSeconds = angular.noop;
      return;
    }

    var invalidate = function(invalidHours, invalidMinutes, invalidSeconds) {
      ngModelCtrl.$setViewValue(null);
      ngModelCtrl.$setValidity('time', false);
      if (angular.isDefined(invalidHours)) {
        $scope.invalidHours = invalidHours;
        if (hoursModelCtrl) {
          hoursModelCtrl.$setValidity('hours', false);
        }
      }

      if (angular.isDefined(invalidMinutes)) {
        $scope.invalidMinutes = invalidMinutes;
        if (minutesModelCtrl) {
          minutesModelCtrl.$setValidity('minutes', false);
        }
      }

      if (angular.isDefined(invalidSeconds)) {
        $scope.invalidSeconds = invalidSeconds;
        if (secondsModelCtrl) {
          secondsModelCtrl.$setValidity('seconds', false);
        }
      }
    };

    $scope.updateHours = function() {
      var hours = getHoursFromTemplate(),
        minutes = getMinutesFromTemplate();

      ngModelCtrl.$setDirty();

      if (angular.isDefined(hours) && angular.isDefined(minutes)) {
        selected.setHours(hours);
        selected.setMinutes(minutes);
        if (selected < min || selected > max) {
          invalidate(true);
        } else {
          refresh('h');
        }
      } else {
        invalidate(true);
      }
    };

    hoursInputEl.on('blur', function(e) {
      ngModelCtrl.$setTouched();
      if (modelIsEmpty()) {
        makeValid();
      } else if ($scope.hours === null || $scope.hours === '') {
        invalidate(true);
      } else if (!$scope.invalidHours && $scope.hours < 10) {
        $scope.$apply(function() {
          $scope.hours = pad($scope.hours, !padHours);
        });
      }
    });

    $scope.updateMinutes = function() {
      var minutes = getMinutesFromTemplate(),
        hours = getHoursFromTemplate();

      ngModelCtrl.$setDirty();

      if (angular.isDefined(minutes) && angular.isDefined(hours)) {
        selected.setHours(hours);
        selected.setMinutes(minutes);
        if (selected < min || selected > max) {
          invalidate(undefined, true);
        } else {
          refresh('m');
        }
      } else {
        invalidate(undefined, true);
      }
    };

    minutesInputEl.on('blur', function(e) {
      ngModelCtrl.$setTouched();
      if (modelIsEmpty()) {
        makeValid();
      } else if ($scope.minutes === null) {
        invalidate(undefined, true);
      } else if (!$scope.invalidMinutes && $scope.minutes < 10) {
        $scope.$apply(function() {
          $scope.minutes = pad($scope.minutes);
        });
      }
    });

    $scope.updateSeconds = function() {
      var seconds = getSecondsFromTemplate();

      ngModelCtrl.$setDirty();

      if (angular.isDefined(seconds)) {
        selected.setSeconds(seconds);
        refresh('s');
      } else {
        invalidate(undefined, undefined, true);
      }
    };

    secondsInputEl.on('blur', function(e) {
      if (modelIsEmpty()) {
        makeValid();
      } else if (!$scope.invalidSeconds && $scope.seconds < 10) {
        $scope.$apply( function() {
          $scope.seconds = pad($scope.seconds);
        });
      }
    });

  };

  this.render = function() {
    var date = ngModelCtrl.$viewValue;

    if (isNaN(date)) {
      ngModelCtrl.$setValidity('time', false);
      $log.error('Timepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.');
    } else {
      if (date) {
        selected = date;
      }

      if (selected < min || selected > max) {
        ngModelCtrl.$setValidity('time', false);
        $scope.invalidHours = true;
        $scope.invalidMinutes = true;
      } else {
        makeValid();
      }
      updateTemplate();
    }
  };

  // Call internally when we know that model is valid.
  function refresh(keyboardChange) {
    makeValid();
    ngModelCtrl.$setViewValue(new Date(selected));
    updateTemplate(keyboardChange);
  }

  function makeValid() {
    if (hoursModelCtrl) {
      hoursModelCtrl.$setValidity('hours', true);
    }

    if (minutesModelCtrl) {
      minutesModelCtrl.$setValidity('minutes', true);
    }

    if (secondsModelCtrl) {
      secondsModelCtrl.$setValidity('seconds', true);
    }

    ngModelCtrl.$setValidity('time', true);
    $scope.invalidHours = false;
    $scope.invalidMinutes = false;
    $scope.invalidSeconds = false;
  }

  function updateTemplate(keyboardChange) {
    if (!ngModelCtrl.$modelValue) {
      $scope.hours = null;
      $scope.minutes = null;
      $scope.seconds = null;
      $scope.meridian = meridians[0];
    } else {
      var hours = selected.getHours(),
        minutes = selected.getMinutes(),
        seconds = selected.getSeconds();

      if ($scope.showMeridian) {
        hours = hours === 0 || hours === 12 ? 12 : hours % 12; // Convert 24 to 12 hour system
      }

      $scope.hours = keyboardChange === 'h' ? hours : pad(hours, !padHours);
      if (keyboardChange !== 'm') {
        $scope.minutes = pad(minutes);
      }
      $scope.meridian = selected.getHours() < 12 ? meridians[0] : meridians[1];

      if (keyboardChange !== 's') {
        $scope.seconds = pad(seconds);
      }
      $scope.meridian = selected.getHours() < 12 ? meridians[0] : meridians[1];
    }
  }

  function addSecondsToSelected(seconds) {
    selected = addSeconds(selected, seconds);
    refresh();
  }

  function addMinutes(selected, minutes) {
    return addSeconds(selected, minutes*60);
  }

  function addSeconds(date, seconds) {
    var dt = new Date(date.getTime() + seconds * 1000);
    var newDate = new Date(date);
    newDate.setHours(dt.getHours(), dt.getMinutes(), dt.getSeconds());
    return newDate;
  }

  function modelIsEmpty() {
    return ($scope.hours === null || $scope.hours === '') &&
      ($scope.minutes === null || $scope.minutes === '') &&
      (!$scope.showSeconds || $scope.showSeconds && ($scope.seconds === null || $scope.seconds === ''));
  }

  $scope.showSpinners = angular.isDefined($attrs.showSpinners) ?
    $scope.$parent.$eval($attrs.showSpinners) : timepickerConfig.showSpinners;

  $scope.incrementHours = function() {
    if (!$scope.noIncrementHours()) {
      addSecondsToSelected(hourStep * 60 * 60);
    }
  };

  $scope.decrementHours = function() {
    if (!$scope.noDecrementHours()) {
      addSecondsToSelected(-hourStep * 60 * 60);
    }
  };

  $scope.incrementMinutes = function() {
    if (!$scope.noIncrementMinutes()) {
      addSecondsToSelected(minuteStep * 60);
    }
  };

  $scope.decrementMinutes = function() {
    if (!$scope.noDecrementMinutes()) {
      addSecondsToSelected(-minuteStep * 60);
    }
  };

  $scope.incrementSeconds = function() {
    if (!$scope.noIncrementSeconds()) {
      addSecondsToSelected(secondStep);
    }
  };

  $scope.decrementSeconds = function() {
    if (!$scope.noDecrementSeconds()) {
      addSecondsToSelected(-secondStep);
    }
  };

  $scope.toggleMeridian = function() {
    var minutes = getMinutesFromTemplate(),
        hours = getHoursFromTemplate();

    if (!$scope.noToggleMeridian()) {
      if (angular.isDefined(minutes) && angular.isDefined(hours)) {
        addSecondsToSelected(12 * 60 * (selected.getHours() < 12 ? 60 : -60));
      } else {
        $scope.meridian = $scope.meridian === meridians[0] ? meridians[1] : meridians[0];
      }
    }
  };

  $scope.blur = function() {
    ngModelCtrl.$setTouched();
  };

  $scope.$on('$destroy', function() {
    while (watchers.length) {
      watchers.shift()();
    }
  });
}])

.directive('uibTimepicker', ['uibTimepickerConfig', function(uibTimepickerConfig) {
  return {
    require: ['uibTimepicker', '?^ngModel'],
    restrict: 'A',
    controller: 'UibTimepickerController',
    controllerAs: 'timepicker',
    scope: {},
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || uibTimepickerConfig.templateUrl;
    },
    link: function(scope, element, attrs, ctrls) {
      var timepickerCtrl = ctrls[0], ngModelCtrl = ctrls[1];

      if (ngModelCtrl) {
        timepickerCtrl.init(ngModelCtrl, element.find('input'));
      }
    }
  };
}]);

angular.module('ui.bootstrap.typeahead', ['ui.bootstrap.debounce', 'ui.bootstrap.position'])

/**
 * A helper service that can parse typeahead's syntax (string provided by users)
 * Extracted to a separate service for ease of unit testing
 */
  .factory('uibTypeaheadParser', ['$parse', function($parse) {
    //                      000001111111100000000000002222222200000000000000003333333333333330000000000044444444000
    var TYPEAHEAD_REGEXP = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+([\s\S]+?)$/;
    return {
      parse: function(input) {
        var match = input.match(TYPEAHEAD_REGEXP);
        if (!match) {
          throw new Error(
            'Expected typeahead specification in form of "_modelValue_ (as _label_)? for _item_ in _collection_"' +
              ' but got "' + input + '".');
        }

        return {
          itemName: match[3],
          source: $parse(match[4]),
          viewMapper: $parse(match[2] || match[1]),
          modelMapper: $parse(match[1])
        };
      }
    };
  }])

  .controller('UibTypeaheadController', ['$scope', '$element', '$attrs', '$compile', '$parse', '$q', '$timeout', '$document', '$window', '$rootScope', '$$debounce', '$uibPosition', 'uibTypeaheadParser',
    function(originalScope, element, attrs, $compile, $parse, $q, $timeout, $document, $window, $rootScope, $$debounce, $position, typeaheadParser) {
    var HOT_KEYS = [9, 13, 27, 38, 40];
    var eventDebounceTime = 200;
    var modelCtrl, ngModelOptions;
    //SUPPORTED ATTRIBUTES (OPTIONS)

    //minimal no of characters that needs to be entered before typeahead kicks-in
    var minLength = originalScope.$eval(attrs.typeaheadMinLength);
    if (!minLength && minLength !== 0) {
      minLength = 1;
    }

    originalScope.$watch(attrs.typeaheadMinLength, function (newVal) {
        minLength = !newVal && newVal !== 0 ? 1 : newVal;
    });

    //minimal wait time after last character typed before typeahead kicks-in
    var waitTime = originalScope.$eval(attrs.typeaheadWaitMs) || 0;

    //should it restrict model values to the ones selected from the popup only?
    var isEditable = originalScope.$eval(attrs.typeaheadEditable) !== false;
    originalScope.$watch(attrs.typeaheadEditable, function (newVal) {
      isEditable = newVal !== false;
    });

    //binding to a variable that indicates if matches are being retrieved asynchronously
    var isLoadingSetter = $parse(attrs.typeaheadLoading).assign || angular.noop;

    //a function to determine if an event should cause selection
    var isSelectEvent = attrs.typeaheadShouldSelect ? $parse(attrs.typeaheadShouldSelect) : function(scope, vals) {
      var evt = vals.$event;
      return evt.which === 13 || evt.which === 9;
    };

    //a callback executed when a match is selected
    var onSelectCallback = $parse(attrs.typeaheadOnSelect);

    //should it select highlighted popup value when losing focus?
    var isSelectOnBlur = angular.isDefined(attrs.typeaheadSelectOnBlur) ? originalScope.$eval(attrs.typeaheadSelectOnBlur) : false;

    //binding to a variable that indicates if there were no results after the query is completed
    var isNoResultsSetter = $parse(attrs.typeaheadNoResults).assign || angular.noop;

    var inputFormatter = attrs.typeaheadInputFormatter ? $parse(attrs.typeaheadInputFormatter) : undefined;

    var appendToBody = attrs.typeaheadAppendToBody ? originalScope.$eval(attrs.typeaheadAppendToBody) : false;

    var appendTo = attrs.typeaheadAppendTo ?
      originalScope.$eval(attrs.typeaheadAppendTo) : null;

    var focusFirst = originalScope.$eval(attrs.typeaheadFocusFirst) !== false;

    //If input matches an item of the list exactly, select it automatically
    var selectOnExact = attrs.typeaheadSelectOnExact ? originalScope.$eval(attrs.typeaheadSelectOnExact) : false;

    //binding to a variable that indicates if dropdown is open
    var isOpenSetter = $parse(attrs.typeaheadIsOpen).assign || angular.noop;

    var showHint = originalScope.$eval(attrs.typeaheadShowHint) || false;

    //INTERNAL VARIABLES

    //model setter executed upon match selection
    var parsedModel = $parse(attrs.ngModel);
    var invokeModelSetter = $parse(attrs.ngModel + '($$$p)');
    var $setModelValue = function(scope, newValue) {
      if (angular.isFunction(parsedModel(originalScope)) &&
        ngModelOptions.getOption('getterSetter')) {
        return invokeModelSetter(scope, {$$$p: newValue});
      }

      return parsedModel.assign(scope, newValue);
    };

    //expressions used by typeahead
    var parserResult = typeaheadParser.parse(attrs.uibTypeahead);

    var hasFocus;

    //Used to avoid bug in iOS webview where iOS keyboard does not fire
    //mousedown & mouseup events
    //Issue #3699
    var selected;

    //create a child scope for the typeahead directive so we are not polluting original scope
    //with typeahead-specific data (matches, query etc.)
    var scope = originalScope.$new();
    var offDestroy = originalScope.$on('$destroy', function() {
      scope.$destroy();
    });
    scope.$on('$destroy', offDestroy);

    // WAI-ARIA
    var popupId = 'typeahead-' + scope.$id + '-' + Math.floor(Math.random() * 10000);
    element.attr({
      'aria-autocomplete': 'list',
      'aria-expanded': false,
      'aria-owns': popupId
    });

    var inputsContainer, hintInputElem;
    //add read-only input to show hint
    if (showHint) {
      inputsContainer = angular.element('<div></div>');
      inputsContainer.css('position', 'relative');
      element.after(inputsContainer);
      hintInputElem = element.clone();
      hintInputElem.attr('placeholder', '');
      hintInputElem.attr('tabindex', '-1');
      hintInputElem.val('');
      hintInputElem.css({
        'position': 'absolute',
        'top': '0px',
        'left': '0px',
        'border-color': 'transparent',
        'box-shadow': 'none',
        'opacity': 1,
        'background': 'none 0% 0% / auto repeat scroll padding-box border-box rgb(255, 255, 255)',
        'color': '#999'
      });
      element.css({
        'position': 'relative',
        'vertical-align': 'top',
        'background-color': 'transparent'
      });

      if (hintInputElem.attr('id')) {
        hintInputElem.removeAttr('id'); // remove duplicate id if present.
      }
      inputsContainer.append(hintInputElem);
      hintInputElem.after(element);
    }

    //pop-up element used to display matches
    var popUpEl = angular.element('<div uib-typeahead-popup></div>');
    popUpEl.attr({
      id: popupId,
      matches: 'matches',
      active: 'activeIdx',
      select: 'select(activeIdx, evt)',
      'move-in-progress': 'moveInProgress',
      query: 'query',
      position: 'position',
      'assign-is-open': 'assignIsOpen(isOpen)',
      debounce: 'debounceUpdate'
    });
    //custom item template
    if (angular.isDefined(attrs.typeaheadTemplateUrl)) {
      popUpEl.attr('template-url', attrs.typeaheadTemplateUrl);
    }

    if (angular.isDefined(attrs.typeaheadPopupTemplateUrl)) {
      popUpEl.attr('popup-template-url', attrs.typeaheadPopupTemplateUrl);
    }

    var resetHint = function() {
      if (showHint) {
        hintInputElem.val('');
      }
    };

    var resetMatches = function() {
      scope.matches = [];
      scope.activeIdx = -1;
      element.attr('aria-expanded', false);
      resetHint();
    };

    var getMatchId = function(index) {
      return popupId + '-option-' + index;
    };

    // Indicate that the specified match is the active (pre-selected) item in the list owned by this typeahead.
    // This attribute is added or removed automatically when the `activeIdx` changes.
    scope.$watch('activeIdx', function(index) {
      if (index < 0) {
        element.removeAttr('aria-activedescendant');
      } else {
        element.attr('aria-activedescendant', getMatchId(index));
      }
    });

    var inputIsExactMatch = function(inputValue, index) {
      if (scope.matches.length > index && inputValue) {
        return inputValue.toUpperCase() === scope.matches[index].label.toUpperCase();
      }

      return false;
    };

    var getMatchesAsync = function(inputValue, evt) {
      var locals = {$viewValue: inputValue};
      isLoadingSetter(originalScope, true);
      isNoResultsSetter(originalScope, false);
      $q.when(parserResult.source(originalScope, locals)).then(function(matches) {
        //it might happen that several async queries were in progress if a user were typing fast
        //but we are interested only in responses that correspond to the current view value
        var onCurrentRequest = inputValue === modelCtrl.$viewValue;
        if (onCurrentRequest && hasFocus) {
          if (matches && matches.length > 0) {
            scope.activeIdx = focusFirst ? 0 : -1;
            isNoResultsSetter(originalScope, false);
            scope.matches.length = 0;

            //transform labels
            for (var i = 0; i < matches.length; i++) {
              locals[parserResult.itemName] = matches[i];
              scope.matches.push({
                id: getMatchId(i),
                label: parserResult.viewMapper(scope, locals),
                model: matches[i]
              });
            }

            scope.query = inputValue;
            //position pop-up with matches - we need to re-calculate its position each time we are opening a window
            //with matches as a pop-up might be absolute-positioned and position of an input might have changed on a page
            //due to other elements being rendered
            recalculatePosition();

            element.attr('aria-expanded', true);

            //Select the single remaining option if user input matches
            if (selectOnExact && scope.matches.length === 1 && inputIsExactMatch(inputValue, 0)) {
              if (angular.isNumber(scope.debounceUpdate) || angular.isObject(scope.debounceUpdate)) {
                $$debounce(function() {
                  scope.select(0, evt);
                }, angular.isNumber(scope.debounceUpdate) ? scope.debounceUpdate : scope.debounceUpdate['default']);
              } else {
                scope.select(0, evt);
              }
            }

            if (showHint) {
              var firstLabel = scope.matches[0].label;
              if (angular.isString(inputValue) &&
                inputValue.length > 0 &&
                firstLabel.slice(0, inputValue.length).toUpperCase() === inputValue.toUpperCase()) {
                hintInputElem.val(inputValue + firstLabel.slice(inputValue.length));
              } else {
                hintInputElem.val('');
              }
            }
          } else {
            resetMatches();
            isNoResultsSetter(originalScope, true);
          }
        }
        if (onCurrentRequest) {
          isLoadingSetter(originalScope, false);
        }
      }, function() {
        resetMatches();
        isLoadingSetter(originalScope, false);
        isNoResultsSetter(originalScope, true);
      });
    };

    // bind events only if appendToBody params exist - performance feature
    if (appendToBody) {
      angular.element($window).on('resize', fireRecalculating);
      $document.find('body').on('scroll', fireRecalculating);
    }

    // Declare the debounced function outside recalculating for
    // proper debouncing
    var debouncedRecalculate = $$debounce(function() {
      // if popup is visible
      if (scope.matches.length) {
        recalculatePosition();
      }

      scope.moveInProgress = false;
    }, eventDebounceTime);

    // Default progress type
    scope.moveInProgress = false;

    function fireRecalculating() {
      if (!scope.moveInProgress) {
        scope.moveInProgress = true;
        scope.$digest();
      }

      debouncedRecalculate();
    }

    // recalculate actual position and set new values to scope
    // after digest loop is popup in right position
    function recalculatePosition() {
      scope.position = appendToBody ? $position.offset(element) : $position.position(element);
      scope.position.top += element.prop('offsetHeight');
    }

    //we need to propagate user's query so we can higlight matches
    scope.query = undefined;

    //Declare the timeout promise var outside the function scope so that stacked calls can be cancelled later
    var timeoutPromise;

    var scheduleSearchWithTimeout = function(inputValue) {
      timeoutPromise = $timeout(function() {
        getMatchesAsync(inputValue);
      }, waitTime);
    };

    var cancelPreviousTimeout = function() {
      if (timeoutPromise) {
        $timeout.cancel(timeoutPromise);
      }
    };

    resetMatches();

    scope.assignIsOpen = function (isOpen) {
      isOpenSetter(originalScope, isOpen);
    };

    scope.select = function(activeIdx, evt) {
      //called from within the $digest() cycle
      var locals = {};
      var model, item;

      selected = true;
      locals[parserResult.itemName] = item = scope.matches[activeIdx].model;
      model = parserResult.modelMapper(originalScope, locals);
      $setModelValue(originalScope, model);
      modelCtrl.$setValidity('editable', true);
      modelCtrl.$setValidity('parse', true);

      onSelectCallback(originalScope, {
        $item: item,
        $model: model,
        $label: parserResult.viewMapper(originalScope, locals),
        $event: evt
      });

      resetMatches();

      //return focus to the input element if a match was selected via a mouse click event
      // use timeout to avoid $rootScope:inprog error
      if (scope.$eval(attrs.typeaheadFocusOnSelect) !== false) {
        $timeout(function() { element[0].focus(); }, 0, false);
      }
    };

    //bind keyboard events: arrows up(38) / down(40), enter(13) and tab(9), esc(27)
    element.on('keydown', function(evt) {
      //typeahead is open and an "interesting" key was pressed
      if (scope.matches.length === 0 || HOT_KEYS.indexOf(evt.which) === -1) {
        return;
      }

      var shouldSelect = isSelectEvent(originalScope, {$event: evt});

      /**
       * if there's nothing selected (i.e. focusFirst) and enter or tab is hit
       * or
       * shift + tab is pressed to bring focus to the previous element
       * then clear the results
       */
      if (scope.activeIdx === -1 && shouldSelect || evt.which === 9 && !!evt.shiftKey) {
        resetMatches();
        scope.$digest();
        return;
      }

      evt.preventDefault();
      var target;
      switch (evt.which) {
        case 27: // escape
          evt.stopPropagation();

          resetMatches();
          originalScope.$digest();
          break;
        case 38: // up arrow
          scope.activeIdx = (scope.activeIdx > 0 ? scope.activeIdx : scope.matches.length) - 1;
          scope.$digest();
          target = popUpEl[0].querySelectorAll('.uib-typeahead-match')[scope.activeIdx];
          target.parentNode.scrollTop = target.offsetTop;
          break;
        case 40: // down arrow
          scope.activeIdx = (scope.activeIdx + 1) % scope.matches.length;
          scope.$digest();
          target = popUpEl[0].querySelectorAll('.uib-typeahead-match')[scope.activeIdx];
          target.parentNode.scrollTop = target.offsetTop;
          break;
        default:
          if (shouldSelect) {
            scope.$apply(function() {
              if (angular.isNumber(scope.debounceUpdate) || angular.isObject(scope.debounceUpdate)) {
                $$debounce(function() {
                  scope.select(scope.activeIdx, evt);
                }, angular.isNumber(scope.debounceUpdate) ? scope.debounceUpdate : scope.debounceUpdate['default']);
              } else {
                scope.select(scope.activeIdx, evt);
              }
            });
          }
      }
    });

    element.on('focus', function (evt) {
      hasFocus = true;
      if (minLength === 0 && !modelCtrl.$viewValue) {
        $timeout(function() {
          getMatchesAsync(modelCtrl.$viewValue, evt);
        }, 0);
      }
    });

    element.on('blur', function(evt) {
      if (isSelectOnBlur && scope.matches.length && scope.activeIdx !== -1 && !selected) {
        selected = true;
        scope.$apply(function() {
          if (angular.isObject(scope.debounceUpdate) && angular.isNumber(scope.debounceUpdate.blur)) {
            $$debounce(function() {
              scope.select(scope.activeIdx, evt);
            }, scope.debounceUpdate.blur);
          } else {
            scope.select(scope.activeIdx, evt);
          }
        });
      }
      if (!isEditable && modelCtrl.$error.editable) {
        modelCtrl.$setViewValue();
        scope.$apply(function() {
          // Reset validity as we are clearing
          modelCtrl.$setValidity('editable', true);
          modelCtrl.$setValidity('parse', true);
        });
        element.val('');
      }
      hasFocus = false;
      selected = false;
    });

    // Keep reference to click handler to unbind it.
    var dismissClickHandler = function(evt) {
      // Issue #3973
      // Firefox treats right click as a click on document
      if (element[0] !== evt.target && evt.which !== 3 && scope.matches.length !== 0) {
        resetMatches();
        if (!$rootScope.$$phase) {
          originalScope.$digest();
        }
      }
    };

    $document.on('click', dismissClickHandler);

    originalScope.$on('$destroy', function() {
      $document.off('click', dismissClickHandler);
      if (appendToBody || appendTo) {
        $popup.remove();
      }

      if (appendToBody) {
        angular.element($window).off('resize', fireRecalculating);
        $document.find('body').off('scroll', fireRecalculating);
      }
      // Prevent jQuery cache memory leak
      popUpEl.remove();

      if (showHint) {
          inputsContainer.remove();
      }
    });

    var $popup = $compile(popUpEl)(scope);

    if (appendToBody) {
      $document.find('body').append($popup);
    } else if (appendTo) {
      angular.element(appendTo).eq(0).append($popup);
    } else {
      element.after($popup);
    }

    this.init = function(_modelCtrl) {
      modelCtrl = _modelCtrl;
      ngModelOptions = extractOptions(modelCtrl);

      scope.debounceUpdate = $parse(ngModelOptions.getOption('debounce'))(originalScope);

      //plug into $parsers pipeline to open a typeahead on view changes initiated from DOM
      //$parsers kick-in on all the changes coming from the view as well as manually triggered by $setViewValue
      modelCtrl.$parsers.unshift(function(inputValue) {
        hasFocus = true;

        if (minLength === 0 || inputValue && inputValue.length >= minLength) {
          if (waitTime > 0) {
            cancelPreviousTimeout();
            scheduleSearchWithTimeout(inputValue);
          } else {
            getMatchesAsync(inputValue);
          }
        } else {
          isLoadingSetter(originalScope, false);
          cancelPreviousTimeout();
          resetMatches();
        }

        if (isEditable) {
          return inputValue;
        }

        if (!inputValue) {
          // Reset in case user had typed something previously.
          modelCtrl.$setValidity('editable', true);
          return null;
        }

        modelCtrl.$setValidity('editable', false);
        return undefined;
      });

      modelCtrl.$formatters.push(function(modelValue) {
        var candidateViewValue, emptyViewValue;
        var locals = {};

        // The validity may be set to false via $parsers (see above) if
        // the model is restricted to selected values. If the model
        // is set manually it is considered to be valid.
        if (!isEditable) {
          modelCtrl.$setValidity('editable', true);
        }

        if (inputFormatter) {
          locals.$model = modelValue;
          return inputFormatter(originalScope, locals);
        }

        //it might happen that we don't have enough info to properly render input value
        //we need to check for this situation and simply return model value if we can't apply custom formatting
        locals[parserResult.itemName] = modelValue;
        candidateViewValue = parserResult.viewMapper(originalScope, locals);
        locals[parserResult.itemName] = undefined;
        emptyViewValue = parserResult.viewMapper(originalScope, locals);

        return candidateViewValue !== emptyViewValue ? candidateViewValue : modelValue;
      });
    };

    function extractOptions(ngModelCtrl) {
      var ngModelOptions;

      if (angular.version.minor < 6) { // in angular < 1.6 $options could be missing
        // guarantee a value
        ngModelOptions = ngModelCtrl.$options || {};

        // mimic 1.6+ api
        ngModelOptions.getOption = function (key) {
          return ngModelOptions[key];
        };
      } else { // in angular >=1.6 $options is always present
        ngModelOptions = ngModelCtrl.$options;
      }

      return ngModelOptions;
    }
  }])

  .directive('uibTypeahead', function() {
    return {
      controller: 'UibTypeaheadController',
      require: ['ngModel', 'uibTypeahead'],
      link: function(originalScope, element, attrs, ctrls) {
        ctrls[1].init(ctrls[0]);
      }
    };
  })

  .directive('uibTypeaheadPopup', ['$$debounce', function($$debounce) {
    return {
      scope: {
        matches: '=',
        query: '=',
        active: '=',
        position: '&',
        moveInProgress: '=',
        select: '&',
        assignIsOpen: '&',
        debounce: '&'
      },
      replace: true,
      templateUrl: function(element, attrs) {
        return attrs.popupTemplateUrl || 'uib/template/typeahead/typeahead-popup.html';
      },
      link: function(scope, element, attrs) {
        scope.templateUrl = attrs.templateUrl;

        scope.isOpen = function() {
          var isDropdownOpen = scope.matches.length > 0;
          scope.assignIsOpen({ isOpen: isDropdownOpen });
          return isDropdownOpen;
        };

        scope.isActive = function(matchIdx) {
          return scope.active === matchIdx;
        };

        scope.selectActive = function(matchIdx) {
          scope.active = matchIdx;
        };

        scope.selectMatch = function(activeIdx, evt) {
          var debounce = scope.debounce();
          if (angular.isNumber(debounce) || angular.isObject(debounce)) {
            $$debounce(function() {
              scope.select({activeIdx: activeIdx, evt: evt});
            }, angular.isNumber(debounce) ? debounce : debounce['default']);
          } else {
            scope.select({activeIdx: activeIdx, evt: evt});
          }
        };
      }
    };
  }])

  .directive('uibTypeaheadMatch', ['$templateRequest', '$compile', '$parse', function($templateRequest, $compile, $parse) {
    return {
      scope: {
        index: '=',
        match: '=',
        query: '='
      },
      link: function(scope, element, attrs) {
        var tplUrl = $parse(attrs.templateUrl)(scope.$parent) || 'uib/template/typeahead/typeahead-match.html';
        $templateRequest(tplUrl).then(function(tplContent) {
          var tplEl = angular.element(tplContent.trim());
          element.replaceWith(tplEl);
          $compile(tplEl)(scope);
        });
      }
    };
  }])

  .filter('uibTypeaheadHighlight', ['$sce', '$injector', '$log', function($sce, $injector, $log) {
    var isSanitizePresent;
    isSanitizePresent = $injector.has('$sanitize');

    function escapeRegexp(queryToEscape) {
      // Regex: capture the whole query string and replace it with the string that will be used to match
      // the results, for example if the capture is "a" the result will be \a
      return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
    }

    function containsHtml(matchItem) {
      return /<.*>/g.test(matchItem);
    }

    return function(matchItem, query) {
      if (!isSanitizePresent && containsHtml(matchItem)) {
        $log.warn('Unsafe use of typeahead please use ngSanitize'); // Warn the user about the danger
      }
      matchItem = query ? ('' + matchItem).replace(new RegExp(escapeRegexp(query), 'gi'), '<strong>$&</strong>') : matchItem; // Replaces the capture string with a the same string inside of a "strong" tag
      if (!isSanitizePresent) {
        matchItem = $sce.trustAsHtml(matchItem); // If $sanitize is not present we pack the string in a $sce object for the ng-bind-html directive
      }
      return matchItem;
    };
  }]);

angular.module("uib/template/accordion/accordion-group.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("uib/template/accordion/accordion-group.html",
    "<div role=\"tab\" id=\"{{::headingId}}\" aria-selected=\"{{isOpen}}\" class=\"panel-heading\" ng-keypress=\"toggleOpen($event)\">\n" +
    "  <h4 class=\"panel-title\">\n" +
    "    <a role=\"button\" data-toggle=\"collapse\" href aria-expanded=\"{{isOpen}}\" aria-controls=\"{{::panelId}}\" tabindex=\"0\" class=\"accordion-toggle\" ng-click=\"toggleOpen()\" uib-accordion-transclude=\"heading\" ng-disabled=\"isDisabled\" uib-tabindex-toggle><span uib-accordion-header ng-class=\"{'text-muted': isDisabled}\">{{heading}}</span></a>\n" +
    "  </h4>\n" +
    "</div>\n" +
    "<div id=\"{{::panelId}}\" aria-labelledby=\"{{::headingId}}\" aria-hidden=\"{{!isOpen}}\" role=\"tabpanel\" class=\"panel-collapse collapse\" uib-collapse=\"!isOpen\">\n" +
    "  <div class=\"panel-body\" ng-transclude></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("uib/template/accordion/accordion.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("uib/template/accordion/accordion.html",
    "<div role=\"tablist\" class=\"panel-group\" ng-transclude></div>");
}]);

angular.module("uib/template/alert/alert.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("uib/template/alert/alert.html",
    "<button ng-show=\"closeable\" type=\"button\" class=\"close\" ng-click=\"close({$event: $event})\">\n" +
    "  <span aria-hidden=\"true\">&times;</span>\n" +
    "  <span class=\"sr-only\">Close</span>\n" +
    "</button>\n" +
    "<div ng-transclude></div>\n" +
    "");
}]);

angular.module("uib/template/carousel/carousel.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("uib/template/carousel/carousel.html",
    "<div class=\"carousel-inner\" ng-transclude></div>\n" +
    "<a role=\"button\" href class=\"left carousel-control\" ng-click=\"prev()\" ng-class=\"{ disabled: isPrevDisabled() }\" ng-show=\"slides.length > 1\">\n" +
    "  <span aria-hidden=\"true\" class=\"glyphicon glyphicon-chevron-left\"></span>\n" +
    "  <span class=\"sr-only\">previous</span>\n" +
    "</a>\n" +
    "<a role=\"button\" href class=\"right carousel-control\" ng-click=\"next()\" ng-class=\"{ disabled: isNextDisabled() }\" ng-show=\"slides.length > 1\">\n" +
    "  <span aria-hidden=\"true\" class=\"glyphicon glyphicon-chevron-right\"></span>\n" +
    "  <span class=\"sr-only\">next</span>\n" +
    "</a>\n" +
    "<ol class=\"carousel-indicators\" ng-show=\"slides.length > 1\">\n" +
    "  <li ng-repeat=\"slide in slides | orderBy:indexOfSlide track by $index\" ng-class=\"{ active: isActive(slide) }\" ng-click=\"select(slide)\">\n" +
    "    <span class=\"sr-only\">slide {{ $index + 1 }} of {{ slides.length }}<span ng-if=\"isActive(slide)\">, currently active</span></span>\n" +
    "  </li>\n" +
    "</ol>\n" +
    "");
}]);

angular.module("uib/template/carousel/slide.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("uib/template/carousel/slide.html",
    "<div class=\"text-center\" ng-transclude></div>\n" +
    "");
}]);

angular.module("uib/template/datepicker/datepicker.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("uib/template/datepicker/datepicker.html",
    "<div ng-switch=\"datepickerMode\">\n" +
    "  <div uib-daypicker ng-switch-when=\"day\" tabindex=\"0\" class=\"uib-daypicker\"></div>\n" +
    "  <div uib-monthpicker ng-switch-when=\"month\" tabindex=\"0\" class=\"uib-monthpicker\"></div>\n" +
    "  <div uib-yearpicker ng-switch-when=\"year\" tabindex=\"0\" class=\"uib-yearpicker\"></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("uib/template/datepicker/day.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("uib/template/datepicker/day.html",
    "<table role=\"grid\" aria-labelledby=\"{{::uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +
    "  <thead>\n" +
    "    <tr>\n" +
    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-left uib-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i aria-hidden=\"true\" class=\"glyphicon glyphicon-chevron-left\"></i><span class=\"sr-only\">previous</span></button></th>\n" +
    "      <th colspan=\"{{::5 + showWeeks}}\"><button id=\"{{::uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"btn btn-default btn-sm uib-title\" ng-click=\"toggleMode()\" ng-disabled=\"datepickerMode === maxMode\" tabindex=\"-1\"><strong>{{title}}</strong></button></th>\n" +
    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-right uib-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i aria-hidden=\"true\" class=\"glyphicon glyphicon-chevron-right\"></i><span class=\"sr-only\">next</span></button></th>\n" +
    "    </tr>\n" +
    "    <tr>\n" +
    "      <th ng-if=\"showWeeks\" class=\"text-center\"></th>\n" +
    "      <th ng-repeat=\"label in ::labels track by $index\" class=\"text-center\"><small aria-label=\"{{::label.full}}\">{{::label.abbr}}</small></th>\n" +
    "    </tr>\n" +
    "  </thead>\n" +
    "  <tbody>\n" +
    "    <tr class=\"uib-weeks\" ng-repeat=\"row in rows track by $index\" role=\"row\">\n" +
    "      <td ng-if=\"showWeeks\" class=\"text-center h6\"><em>{{ weekNumbers[$index] }}</em></td>\n" +
    "      <td ng-repeat=\"dt in row\" class=\"uib-day text-center\" role=\"gridcell\"\n" +
    "        id=\"{{::dt.uid}}\"\n" +
    "        ng-class=\"::dt.customClass\">\n" +
    "        <button type=\"button\" class=\"btn btn-default btn-sm\"\n" +
    "          uib-is-class=\"\n" +
    "            'btn-info' for selectedDt,\n" +
    "            'active' for activeDt\n" +
    "            on dt\"\n" +
    "          ng-click=\"select(dt.date)\"\n" +
    "          ng-disabled=\"::dt.disabled\"\n" +
    "          tabindex=\"-1\"><span ng-class=\"::{'text-muted': dt.secondary, 'text-info': dt.current}\">{{::dt.label}}</span></button>\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "  </tbody>\n" +
    "</table>\n" +
    "");
}]);

angular.module("uib/template/datepicker/month.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("uib/template/datepicker/month.html",
    "<table role=\"grid\" aria-labelledby=\"{{::uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +
    "  <thead>\n" +
    "    <tr>\n" +
    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-left uib-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i aria-hidden=\"true\" class=\"glyphicon glyphicon-chevron-left\"></i><span class=\"sr-only\">previous</span></button></th>\n" +
    "      <th colspan=\"{{::yearHeaderColspan}}\"><button id=\"{{::uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"btn btn-default btn-sm uib-title\" ng-click=\"toggleMode()\" ng-disabled=\"datepickerMode === maxMode\" tabindex=\"-1\"><strong>{{title}}</strong></button></th>\n" +
    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-right uib-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i aria-hidden=\"true\" class=\"glyphicon glyphicon-chevron-right\"></i><span class=\"sr-only\">next</span></i></button></th>\n" +
    "    </tr>\n" +
    "  </thead>\n" +
    "  <tbody>\n" +
    "    <tr class=\"uib-months\" ng-repeat=\"row in rows track by $index\" role=\"row\">\n" +
    "      <td ng-repeat=\"dt in row\" class=\"uib-month text-center\" role=\"gridcell\"\n" +
    "        id=\"{{::dt.uid}}\"\n" +
    "        ng-class=\"::dt.customClass\">\n" +
    "        <button type=\"button\" class=\"btn btn-default\"\n" +
    "          uib-is-class=\"\n" +
    "            'btn-info' for selectedDt,\n" +
    "            'active' for activeDt\n" +
    "            on dt\"\n" +
    "          ng-click=\"select(dt.date)\"\n" +
    "          ng-disabled=\"::dt.disabled\"\n" +
    "          tabindex=\"-1\"><span ng-class=\"::{'text-info': dt.current}\">{{::dt.label}}</span></button>\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "  </tbody>\n" +
    "</table>\n" +
    "");
}]);

angular.module("uib/template/datepicker/year.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("uib/template/datepicker/year.html",
    "<table role=\"grid\" aria-labelledby=\"{{::uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +
    "  <thead>\n" +
    "    <tr>\n" +
    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-left uib-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i aria-hidden=\"true\" class=\"glyphicon glyphicon-chevron-left\"></i><span class=\"sr-only\">previous</span></button></th>\n" +
    "      <th colspan=\"{{::columns - 2}}\"><button id=\"{{::uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"btn btn-default btn-sm uib-title\" ng-click=\"toggleMode()\" ng-disabled=\"datepickerMode === maxMode\" tabindex=\"-1\"><strong>{{title}}</strong></button></th>\n" +
    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-right uib-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i aria-hidden=\"true\" class=\"glyphicon glyphicon-chevron-right\"></i><span class=\"sr-only\">next</span></button></th>\n" +
    "    </tr>\n" +
    "  </thead>\n" +
    "  <tbody>\n" +
    "    <tr class=\"uib-years\" ng-repeat=\"row in rows track by $index\" role=\"row\">\n" +
    "      <td ng-repeat=\"dt in row\" class=\"uib-year text-center\" role=\"gridcell\"\n" +
    "        id=\"{{::dt.uid}}\"\n" +
    "        ng-class=\"::dt.customClass\">\n" +
    "        <button type=\"button\" class=\"btn btn-default\"\n" +
    "          uib-is-class=\"\n" +
    "            'btn-info' for selectedDt,\n" +
    "            'active' for activeDt\n" +
    "            on dt\"\n" +
    "          ng-click=\"select(dt.date)\"\n" +
    "          ng-disabled=\"::dt.disabled\"\n" +
    "          tabindex=\"-1\"><span ng-class=\"::{'text-info': dt.current}\">{{::dt.label}}</span></button>\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "  </tbody>\n" +
    "</table>\n" +
    "");
}]);

angular.module("uib/template/datepickerPopup/popup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("uib/template/datepickerPopup/popup.html",
    "<ul role=\"presentation\" class=\"uib-datepicker-popup dropdown-menu uib-position-measure\" dropdown-nested ng-if=\"isOpen\" ng-keydown=\"keydown($event)\" ng-click=\"$event.stopPropagation()\">\n" +
    "  <li ng-transclude></li>\n" +
    "  <li ng-if=\"showButtonBar\" class=\"uib-button-bar\">\n" +
    "    <span class=\"btn-group pull-left\">\n" +
    "      <button type=\"button\" class=\"btn btn-sm btn-info uib-datepicker-current\" ng-click=\"select('today', $event)\" ng-disabled=\"isDisabled('today')\">{{ getText('current') }}</button>\n" +
    "      <button type=\"button\" class=\"btn btn-sm btn-danger uib-clear\" ng-click=\"select(null, $event)\">{{ getText('clear') }}</button>\n" +
    "    </span>\n" +
    "    <button type=\"button\" class=\"btn btn-sm btn-success pull-right uib-close\" ng-click=\"close($event)\">{{ getText('close') }}</button>\n" +
    "  </li>\n" +
    "</ul>\n" +
    "");
}]);

angular.module("uib/template/modal/window.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("uib/template/modal/window.html",
    "<div class=\"modal-dialog {{size ? 'modal-' + size : ''}}\"><div class=\"modal-content\" uib-modal-transclude></div></div>\n" +
    "");
}]);

angular.module("uib/template/pager/pager.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("uib/template/pager/pager.html",
    "<li ng-class=\"{disabled: noPrevious()||ngDisabled, previous: align}\"><a href ng-click=\"selectPage(page - 1, $event)\" ng-disabled=\"noPrevious()||ngDisabled\" uib-tabindex-toggle>{{::getText('previous')}}</a></li>\n" +
    "<li ng-class=\"{disabled: noNext()||ngDisabled, next: align}\"><a href ng-click=\"selectPage(page + 1, $event)\" ng-disabled=\"noNext()||ngDisabled\" uib-tabindex-toggle>{{::getText('next')}}</a></li>\n" +
    "");
}]);

angular.module("uib/template/pagination/pagination.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("uib/template/pagination/pagination.html",
    "<li role=\"menuitem\" ng-if=\"::boundaryLinks\" ng-class=\"{disabled: noPrevious()||ngDisabled}\" class=\"pagination-first\"><a href ng-click=\"selectPage(1, $event)\" ng-disabled=\"noPrevious()||ngDisabled\" uib-tabindex-toggle>{{::getText('first')}}</a></li>\n" +
    "<li role=\"menuitem\" ng-if=\"::directionLinks\" ng-class=\"{disabled: noPrevious()||ngDisabled}\" class=\"pagination-prev\"><a href ng-click=\"selectPage(page - 1, $event)\" ng-disabled=\"noPrevious()||ngDisabled\" uib-tabindex-toggle>{{::getText('previous')}}</a></li>\n" +
    "<li role=\"menuitem\" ng-repeat=\"page in pages track by $index\" ng-class=\"{active: page.active,disabled: ngDisabled&&!page.active}\" class=\"pagination-page\"><a href ng-click=\"selectPage(page.number, $event)\" ng-disabled=\"ngDisabled&&!page.active\" uib-tabindex-toggle>{{page.text}}</a></li>\n" +
    "<li role=\"menuitem\" ng-if=\"::directionLinks\" ng-class=\"{disabled: noNext()||ngDisabled}\" class=\"pagination-next\"><a href ng-click=\"selectPage(page + 1, $event)\" ng-disabled=\"noNext()||ngDisabled\" uib-tabindex-toggle>{{::getText('next')}}</a></li>\n" +
    "<li role=\"menuitem\" ng-if=\"::boundaryLinks\" ng-class=\"{disabled: noNext()||ngDisabled}\" class=\"pagination-last\"><a href ng-click=\"selectPage(totalPages, $event)\" ng-disabled=\"noNext()||ngDisabled\" uib-tabindex-toggle>{{::getText('last')}}</a></li>\n" +
    "");
}]);

angular.module("uib/template/tooltip/tooltip-html-popup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("uib/template/tooltip/tooltip-html-popup.html",
    "<div class=\"tooltip-arrow\"></div>\n" +
    "<div class=\"tooltip-inner\" ng-bind-html=\"contentExp()\"></div>\n" +
    "");
}]);

angular.module("uib/template/tooltip/tooltip-popup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("uib/template/tooltip/tooltip-popup.html",
    "<div class=\"tooltip-arrow\"></div>\n" +
    "<div class=\"tooltip-inner\" ng-bind=\"content\"></div>\n" +
    "");
}]);

angular.module("uib/template/tooltip/tooltip-template-popup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("uib/template/tooltip/tooltip-template-popup.html",
    "<div class=\"tooltip-arrow\"></div>\n" +
    "<div class=\"tooltip-inner\"\n" +
    "  uib-tooltip-template-transclude=\"contentExp()\"\n" +
    "  tooltip-template-transclude-scope=\"originScope()\"></div>\n" +
    "");
}]);

angular.module("uib/template/popover/popover-html.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("uib/template/popover/popover-html.html",
    "<div class=\"arrow\"></div>\n" +
    "\n" +
    "<div class=\"popover-inner\">\n" +
    "    <h3 class=\"popover-title\" ng-bind=\"uibTitle\" ng-if=\"uibTitle\"></h3>\n" +
    "    <div class=\"popover-content\" ng-bind-html=\"contentExp()\"></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("uib/template/popover/popover-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("uib/template/popover/popover-template.html",
    "<div class=\"arrow\"></div>\n" +
    "\n" +
    "<div class=\"popover-inner\">\n" +
    "    <h3 class=\"popover-title\" ng-bind=\"uibTitle\" ng-if=\"uibTitle\"></h3>\n" +
    "    <div class=\"popover-content\"\n" +
    "      uib-tooltip-template-transclude=\"contentExp()\"\n" +
    "      tooltip-template-transclude-scope=\"originScope()\"></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("uib/template/popover/popover.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("uib/template/popover/popover.html",
    "<div class=\"arrow\"></div>\n" +
    "\n" +
    "<div class=\"popover-inner\">\n" +
    "    <h3 class=\"popover-title\" ng-bind=\"uibTitle\" ng-if=\"uibTitle\"></h3>\n" +
    "    <div class=\"popover-content\" ng-bind=\"content\"></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("uib/template/progressbar/bar.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("uib/template/progressbar/bar.html",
    "<div class=\"progress-bar\" ng-class=\"type && 'progress-bar-' + type\" role=\"progressbar\" aria-valuenow=\"{{value}}\" aria-valuemin=\"0\" aria-valuemax=\"{{max}}\" ng-style=\"{width: (percent < 100 ? percent : 100) + '%'}\" aria-valuetext=\"{{percent | number:0}}%\" aria-labelledby=\"{{::title}}\" ng-transclude></div>\n" +
    "");
}]);

angular.module("uib/template/progressbar/progress.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("uib/template/progressbar/progress.html",
    "<div class=\"progress\" ng-transclude aria-labelledby=\"{{::title}}\"></div>");
}]);

angular.module("uib/template/progressbar/progressbar.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("uib/template/progressbar/progressbar.html",
    "<div class=\"progress\">\n" +
    "  <div class=\"progress-bar\" ng-class=\"type && 'progress-bar-' + type\" role=\"progressbar\" aria-valuenow=\"{{value}}\" aria-valuemin=\"0\" aria-valuemax=\"{{max}}\" ng-style=\"{width: (percent < 100 ? percent : 100) + '%'}\" aria-valuetext=\"{{percent | number:0}}%\" aria-labelledby=\"{{::title}}\" ng-transclude></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("uib/template/rating/rating.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("uib/template/rating/rating.html",
    "<span ng-mouseleave=\"reset()\" ng-keydown=\"onKeydown($event)\" tabindex=\"0\" role=\"slider\" aria-valuemin=\"0\" aria-valuemax=\"{{range.length}}\" aria-valuenow=\"{{value}}\" aria-valuetext=\"{{title}}\">\n" +
    "    <span ng-repeat-start=\"r in range track by $index\" class=\"sr-only\">({{ $index < value ? '*' : ' ' }})</span>\n" +
    "    <i ng-repeat-end ng-mouseenter=\"enter($index + 1)\" ng-click=\"rate($index + 1)\" class=\"glyphicon\" ng-class=\"$index < value && (r.stateOn || 'glyphicon-star') || (r.stateOff || 'glyphicon-star-empty')\" ng-attr-title=\"{{r.title}}\"></i>\n" +
    "</span>\n" +
    "");
}]);

angular.module("uib/template/tabs/tab.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("uib/template/tabs/tab.html",
    "<li ng-class=\"[{active: active, disabled: disabled}, classes]\" class=\"uib-tab nav-item\">\n" +
    "  <a href ng-click=\"select($event)\" class=\"nav-link\" uib-tab-heading-transclude>{{heading}}</a>\n" +
    "</li>\n" +
    "");
}]);

angular.module("uib/template/tabs/tabset.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("uib/template/tabs/tabset.html",
    "<div>\n" +
    "  <ul class=\"nav nav-{{tabset.type || 'tabs'}}\" ng-class=\"{'nav-stacked': vertical, 'nav-justified': justified}\" ng-transclude></ul>\n" +
    "  <div class=\"tab-content\">\n" +
    "    <div class=\"tab-pane\"\n" +
    "         ng-repeat=\"tab in tabset.tabs\"\n" +
    "         ng-class=\"{active: tabset.active === tab.index}\"\n" +
    "         uib-tab-content-transclude=\"tab\">\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("uib/template/timepicker/timepicker.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("uib/template/timepicker/timepicker.html",
    "<table class=\"uib-timepicker\">\n" +
    "  <tbody>\n" +
    "    <tr class=\"text-center\" ng-show=\"::showSpinners\">\n" +
    "      <td class=\"uib-increment hours\"><a ng-click=\"incrementHours()\" ng-class=\"{disabled: noIncrementHours()}\" class=\"btn btn-link\" ng-disabled=\"noIncrementHours()\" tabindex=\"-1\"><span class=\"glyphicon glyphicon-chevron-up\"></span></a></td>\n" +
    "      <td>&nbsp;</td>\n" +
    "      <td class=\"uib-increment minutes\"><a ng-click=\"incrementMinutes()\" ng-class=\"{disabled: noIncrementMinutes()}\" class=\"btn btn-link\" ng-disabled=\"noIncrementMinutes()\" tabindex=\"-1\"><span class=\"glyphicon glyphicon-chevron-up\"></span></a></td>\n" +
    "      <td ng-show=\"showSeconds\">&nbsp;</td>\n" +
    "      <td ng-show=\"showSeconds\" class=\"uib-increment seconds\"><a ng-click=\"incrementSeconds()\" ng-class=\"{disabled: noIncrementSeconds()}\" class=\"btn btn-link\" ng-disabled=\"noIncrementSeconds()\" tabindex=\"-1\"><span class=\"glyphicon glyphicon-chevron-up\"></span></a></td>\n" +
    "      <td ng-show=\"showMeridian\"></td>\n" +
    "    </tr>\n" +
    "    <tr>\n" +
    "      <td class=\"form-group uib-time hours\" ng-class=\"{'has-error': invalidHours}\">\n" +
    "        <input type=\"text\" placeholder=\"HH\" ng-model=\"hours\" ng-change=\"updateHours()\" class=\"form-control text-center\" ng-readonly=\"::readonlyInput\" maxlength=\"2\" tabindex=\"{{::tabindex}}\" ng-disabled=\"noIncrementHours()\" ng-blur=\"blur()\">\n" +
    "      </td>\n" +
    "      <td class=\"uib-separator\">:</td>\n" +
    "      <td class=\"form-group uib-time minutes\" ng-class=\"{'has-error': invalidMinutes}\">\n" +
    "        <input type=\"text\" placeholder=\"MM\" ng-model=\"minutes\" ng-change=\"updateMinutes()\" class=\"form-control text-center\" ng-readonly=\"::readonlyInput\" maxlength=\"2\" tabindex=\"{{::tabindex}}\" ng-disabled=\"noIncrementMinutes()\" ng-blur=\"blur()\">\n" +
    "      </td>\n" +
    "      <td ng-show=\"showSeconds\" class=\"uib-separator\">:</td>\n" +
    "      <td class=\"form-group uib-time seconds\" ng-class=\"{'has-error': invalidSeconds}\" ng-show=\"showSeconds\">\n" +
    "        <input type=\"text\" placeholder=\"SS\" ng-model=\"seconds\" ng-change=\"updateSeconds()\" class=\"form-control text-center\" ng-readonly=\"readonlyInput\" maxlength=\"2\" tabindex=\"{{::tabindex}}\" ng-disabled=\"noIncrementSeconds()\" ng-blur=\"blur()\">\n" +
    "      </td>\n" +
    "      <td ng-show=\"showMeridian\" class=\"uib-time am-pm\"><button type=\"button\" ng-class=\"{disabled: noToggleMeridian()}\" class=\"btn btn-default text-center\" ng-click=\"toggleMeridian()\" ng-disabled=\"noToggleMeridian()\" tabindex=\"{{::tabindex}}\">{{meridian}}</button></td>\n" +
    "    </tr>\n" +
    "    <tr class=\"text-center\" ng-show=\"::showSpinners\">\n" +
    "      <td class=\"uib-decrement hours\"><a ng-click=\"decrementHours()\" ng-class=\"{disabled: noDecrementHours()}\" class=\"btn btn-link\" ng-disabled=\"noDecrementHours()\" tabindex=\"-1\"><span class=\"glyphicon glyphicon-chevron-down\"></span></a></td>\n" +
    "      <td>&nbsp;</td>\n" +
    "      <td class=\"uib-decrement minutes\"><a ng-click=\"decrementMinutes()\" ng-class=\"{disabled: noDecrementMinutes()}\" class=\"btn btn-link\" ng-disabled=\"noDecrementMinutes()\" tabindex=\"-1\"><span class=\"glyphicon glyphicon-chevron-down\"></span></a></td>\n" +
    "      <td ng-show=\"showSeconds\">&nbsp;</td>\n" +
    "      <td ng-show=\"showSeconds\" class=\"uib-decrement seconds\"><a ng-click=\"decrementSeconds()\" ng-class=\"{disabled: noDecrementSeconds()}\" class=\"btn btn-link\" ng-disabled=\"noDecrementSeconds()\" tabindex=\"-1\"><span class=\"glyphicon glyphicon-chevron-down\"></span></a></td>\n" +
    "      <td ng-show=\"showMeridian\"></td>\n" +
    "    </tr>\n" +
    "  </tbody>\n" +
    "</table>\n" +
    "");
}]);

angular.module("uib/template/typeahead/typeahead-match.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("uib/template/typeahead/typeahead-match.html",
    "<a href\n" +
    "   tabindex=\"-1\"\n" +
    "   ng-bind-html=\"match.label | uibTypeaheadHighlight:query\"\n" +
    "   ng-attr-title=\"{{match.label}}\"></a>\n" +
    "");
}]);

angular.module("uib/template/typeahead/typeahead-popup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("uib/template/typeahead/typeahead-popup.html",
    "<ul class=\"dropdown-menu\" ng-show=\"isOpen() && !moveInProgress\" ng-style=\"{top: position().top+'px', left: position().left+'px'}\" role=\"listbox\" aria-hidden=\"{{!isOpen()}}\">\n" +
    "    <li class=\"uib-typeahead-match\" ng-repeat=\"match in matches track by $index\" ng-class=\"{active: isActive($index) }\" ng-mouseenter=\"selectActive($index)\" ng-click=\"selectMatch($index, $event)\" role=\"option\" id=\"{{::match.id}}\">\n" +
    "        <div uib-typeahead-match index=\"$index\" match=\"match\" query=\"query\" template-url=\"templateUrl\"></div>\n" +
    "    </li>\n" +
    "</ul>\n" +
    "");
}]);
angular.module('ui.bootstrap.carousel').run(function() {!angular.$$csp().noInlineStyle && !angular.$$uibCarouselCss && angular.element(document).find('head').prepend('<style type="text/css">.ng-animate.item:not(.left):not(.right){-webkit-transition:0s ease-in-out left;transition:0s ease-in-out left}</style>'); angular.$$uibCarouselCss = true; });
angular.module('ui.bootstrap.datepicker').run(function() {!angular.$$csp().noInlineStyle && !angular.$$uibDatepickerCss && angular.element(document).find('head').prepend('<style type="text/css">.uib-datepicker .uib-title{width:100%;}.uib-day button,.uib-month button,.uib-year button{min-width:100%;}.uib-left,.uib-right{width:100%}</style>'); angular.$$uibDatepickerCss = true; });
angular.module('ui.bootstrap.position').run(function() {!angular.$$csp().noInlineStyle && !angular.$$uibPositionCss && angular.element(document).find('head').prepend('<style type="text/css">.uib-position-measure{display:block !important;visibility:hidden !important;position:absolute !important;top:-9999px !important;left:-9999px !important;}.uib-position-scrollbar-measure{position:absolute !important;top:-9999px !important;width:50px !important;height:50px !important;overflow:scroll !important;}.uib-position-body-scrollbar-measure{overflow:scroll !important;}</style>'); angular.$$uibPositionCss = true; });
angular.module('ui.bootstrap.datepickerPopup').run(function() {!angular.$$csp().noInlineStyle && !angular.$$uibDatepickerpopupCss && angular.element(document).find('head').prepend('<style type="text/css">.uib-datepicker-popup.dropdown-menu{display:block;float:none;margin:0;}.uib-button-bar{padding:10px 9px 2px;}</style>'); angular.$$uibDatepickerpopupCss = true; });
angular.module('ui.bootstrap.tooltip').run(function() {!angular.$$csp().noInlineStyle && !angular.$$uibTooltipCss && angular.element(document).find('head').prepend('<style type="text/css">[uib-tooltip-popup].tooltip.top-left > .tooltip-arrow,[uib-tooltip-popup].tooltip.top-right > .tooltip-arrow,[uib-tooltip-popup].tooltip.bottom-left > .tooltip-arrow,[uib-tooltip-popup].tooltip.bottom-right > .tooltip-arrow,[uib-tooltip-popup].tooltip.left-top > .tooltip-arrow,[uib-tooltip-popup].tooltip.left-bottom > .tooltip-arrow,[uib-tooltip-popup].tooltip.right-top > .tooltip-arrow,[uib-tooltip-popup].tooltip.right-bottom > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.top-left > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.top-right > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.bottom-left > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.bottom-right > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.left-top > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.left-bottom > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.right-top > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.right-bottom > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.top-left > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.top-right > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.bottom-left > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.bottom-right > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.left-top > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.left-bottom > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.right-top > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.right-bottom > .tooltip-arrow,[uib-popover-popup].popover.top-left > .arrow,[uib-popover-popup].popover.top-right > .arrow,[uib-popover-popup].popover.bottom-left > .arrow,[uib-popover-popup].popover.bottom-right > .arrow,[uib-popover-popup].popover.left-top > .arrow,[uib-popover-popup].popover.left-bottom > .arrow,[uib-popover-popup].popover.right-top > .arrow,[uib-popover-popup].popover.right-bottom > .arrow,[uib-popover-html-popup].popover.top-left > .arrow,[uib-popover-html-popup].popover.top-right > .arrow,[uib-popover-html-popup].popover.bottom-left > .arrow,[uib-popover-html-popup].popover.bottom-right > .arrow,[uib-popover-html-popup].popover.left-top > .arrow,[uib-popover-html-popup].popover.left-bottom > .arrow,[uib-popover-html-popup].popover.right-top > .arrow,[uib-popover-html-popup].popover.right-bottom > .arrow,[uib-popover-template-popup].popover.top-left > .arrow,[uib-popover-template-popup].popover.top-right > .arrow,[uib-popover-template-popup].popover.bottom-left > .arrow,[uib-popover-template-popup].popover.bottom-right > .arrow,[uib-popover-template-popup].popover.left-top > .arrow,[uib-popover-template-popup].popover.left-bottom > .arrow,[uib-popover-template-popup].popover.right-top > .arrow,[uib-popover-template-popup].popover.right-bottom > .arrow{top:auto;bottom:auto;left:auto;right:auto;margin:0;}[uib-popover-popup].popover,[uib-popover-html-popup].popover,[uib-popover-template-popup].popover{display:block !important;}</style>'); angular.$$uibTooltipCss = true; });
angular.module('ui.bootstrap.timepicker').run(function() {!angular.$$csp().noInlineStyle && !angular.$$uibTimepickerCss && angular.element(document).find('head').prepend('<style type="text/css">.uib-time input{width:50px;}</style>'); angular.$$uibTimepickerCss = true; });
angular.module('ui.bootstrap.typeahead').run(function() {!angular.$$csp().noInlineStyle && !angular.$$uibTypeaheadCss && angular.element(document).find('head').prepend('<style type="text/css">[uib-typeahead-popup].dropdown-menu{display:block;}</style>'); angular.$$uibTypeaheadCss = true; });
},{}],12:[function(require,module,exports){
require('./dist/ui-bootstrap-tpls');

module.exports = 'ui.bootstrap';

},{"./dist/ui-bootstrap-tpls":11}],13:[function(require,module,exports){
/**
 * @author Manuel Mazzuola
 * https://github.com/manuelmazzuola/angular-ui-router-styles
 * Inspired by https://github.com/tennisgent/angular-route-styles
 */

(function() {
  'use strict';
  angular
    .module('uiRouterStyles', ['ui.router'])
    .directive('head', uiRouterStylesDirective);

  uiRouterStylesDirective.$inject = ['$rootScope', '$compile', '$state', '$interpolate'];
  function uiRouterStylesDirective($rootScope, $compile, $state, $interpolate) {
    var directive = {
      restrict: 'E',
      link: uiRouterStylesLink
    };

    return directive;

    function uiRouterStylesLink(scope, elem) {
      var start = $interpolate.startSymbol(), end = $interpolate.endSymbol();
      var html = '<link rel="stylesheet" ng-repeat="(k, css) in routeStyles track by k" ng-href="' + start + 'css' + end + '" >';

      scope.routeStyles = [];

      activate();

      ////

      function activate() {
        elem.append($compile(html)(scope));
        $rootScope.$on('$stateChangeSuccess', stateChangeSuccessCallback);
      }

      // Get the parent state
      function $$parentState(state) {
        // Check if state has explicit parent OR we try guess parent from its name
        var name = state.parent || (/^(.+)\.[^.]+$/.exec(state.name) || [])[1];
        // If we were able to figure out parent name then get this state
        return name && $state.get(name);
      }

      function stateChangeSuccessCallback(evt, toState) {
        // From current state to the root
        scope.routeStyles = [];
        for(var state = toState; state && state.name !== ''; state=$$parentState(state)) {
          if(state && state.data && state.data.css) {
            if(!Array.isArray(state.data.css)) {
              state.data.css = [state.data.css];
            }
            angular.forEach(state.data.css, function(css) {
              if(scope.routeStyles.indexOf(css) === -1) {
                scope.routeStyles.push(css);
              }
            });
          }
        }
        scope.routeStyles.reverse();
      }
    }
  }
})();

},{}],14:[function(require,module,exports){
/**
 * State-based routing for AngularJS
 * @version v0.4.2
 * @link http://angular-ui.github.com/
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
  module.exports = 'ui.router';
}

(function (window, angular, undefined) {
/*jshint globalstrict:true*/
/*global angular:false*/
'use strict';

var isDefined = angular.isDefined,
    isFunction = angular.isFunction,
    isString = angular.isString,
    isObject = angular.isObject,
    isArray = angular.isArray,
    forEach = angular.forEach,
    extend = angular.extend,
    copy = angular.copy,
    toJson = angular.toJson;

function inherit(parent, extra) {
  return extend(new (extend(function() {}, { prototype: parent }))(), extra);
}

function merge(dst) {
  forEach(arguments, function(obj) {
    if (obj !== dst) {
      forEach(obj, function(value, key) {
        if (!dst.hasOwnProperty(key)) dst[key] = value;
      });
    }
  });
  return dst;
}

/**
 * Finds the common ancestor path between two states.
 *
 * @param {Object} first The first state.
 * @param {Object} second The second state.
 * @return {Array} Returns an array of state names in descending order, not including the root.
 */
function ancestors(first, second) {
  var path = [];

  for (var n in first.path) {
    if (first.path[n] !== second.path[n]) break;
    path.push(first.path[n]);
  }
  return path;
}

/**
 * IE8-safe wrapper for `Object.keys()`.
 *
 * @param {Object} object A JavaScript object.
 * @return {Array} Returns the keys of the object as an array.
 */
function objectKeys(object) {
  if (Object.keys) {
    return Object.keys(object);
  }
  var result = [];

  forEach(object, function(val, key) {
    result.push(key);
  });
  return result;
}

/**
 * IE8-safe wrapper for `Array.prototype.indexOf()`.
 *
 * @param {Array} array A JavaScript array.
 * @param {*} value A value to search the array for.
 * @return {Number} Returns the array index value of `value`, or `-1` if not present.
 */
function indexOf(array, value) {
  if (Array.prototype.indexOf) {
    return array.indexOf(value, Number(arguments[2]) || 0);
  }
  var len = array.length >>> 0, from = Number(arguments[2]) || 0;
  from = (from < 0) ? Math.ceil(from) : Math.floor(from);

  if (from < 0) from += len;

  for (; from < len; from++) {
    if (from in array && array[from] === value) return from;
  }
  return -1;
}

/**
 * Merges a set of parameters with all parameters inherited between the common parents of the
 * current state and a given destination state.
 *
 * @param {Object} currentParams The value of the current state parameters ($stateParams).
 * @param {Object} newParams The set of parameters which will be composited with inherited params.
 * @param {Object} $current Internal definition of object representing the current state.
 * @param {Object} $to Internal definition of object representing state to transition to.
 */
function inheritParams(currentParams, newParams, $current, $to) {
  var parents = ancestors($current, $to), parentParams, inherited = {}, inheritList = [];

  for (var i in parents) {
    if (!parents[i] || !parents[i].params) continue;
    parentParams = objectKeys(parents[i].params);
    if (!parentParams.length) continue;

    for (var j in parentParams) {
      if (indexOf(inheritList, parentParams[j]) >= 0) continue;
      inheritList.push(parentParams[j]);
      inherited[parentParams[j]] = currentParams[parentParams[j]];
    }
  }
  return extend({}, inherited, newParams);
}

/**
 * Performs a non-strict comparison of the subset of two objects, defined by a list of keys.
 *
 * @param {Object} a The first object.
 * @param {Object} b The second object.
 * @param {Array} keys The list of keys within each object to compare. If the list is empty or not specified,
 *                     it defaults to the list of keys in `a`.
 * @return {Boolean} Returns `true` if the keys match, otherwise `false`.
 */
function equalForKeys(a, b, keys) {
  if (!keys) {
    keys = [];
    for (var n in a) keys.push(n); // Used instead of Object.keys() for IE8 compatibility
  }

  for (var i=0; i<keys.length; i++) {
    var k = keys[i];
    if (a[k] != b[k]) return false; // Not '===', values aren't necessarily normalized
  }
  return true;
}

/**
 * Returns the subset of an object, based on a list of keys.
 *
 * @param {Array} keys
 * @param {Object} values
 * @return {Boolean} Returns a subset of `values`.
 */
function filterByKeys(keys, values) {
  var filtered = {};

  forEach(keys, function (name) {
    filtered[name] = values[name];
  });
  return filtered;
}

// like _.indexBy
// when you know that your index values will be unique, or you want last-one-in to win
function indexBy(array, propName) {
  var result = {};
  forEach(array, function(item) {
    result[item[propName]] = item;
  });
  return result;
}

// extracted from underscore.js
// Return a copy of the object only containing the whitelisted properties.
function pick(obj) {
  var copy = {};
  var keys = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));
  forEach(keys, function(key) {
    if (key in obj) copy[key] = obj[key];
  });
  return copy;
}

// extracted from underscore.js
// Return a copy of the object omitting the blacklisted properties.
function omit(obj) {
  var copy = {};
  var keys = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));
  for (var key in obj) {
    if (indexOf(keys, key) == -1) copy[key] = obj[key];
  }
  return copy;
}

function pluck(collection, key) {
  var result = isArray(collection) ? [] : {};

  forEach(collection, function(val, i) {
    result[i] = isFunction(key) ? key(val) : val[key];
  });
  return result;
}

function filter(collection, callback) {
  var array = isArray(collection);
  var result = array ? [] : {};
  forEach(collection, function(val, i) {
    if (callback(val, i)) {
      result[array ? result.length : i] = val;
    }
  });
  return result;
}

function map(collection, callback) {
  var result = isArray(collection) ? [] : {};

  forEach(collection, function(val, i) {
    result[i] = callback(val, i);
  });
  return result;
}

// issue #2676 #2889
function silenceUncaughtInPromise (promise) {
  return promise.then(undefined, function() {}) && promise;
}

/**
 * @ngdoc overview
 * @name ui.router.util
 *
 * @description
 * # ui.router.util sub-module
 *
 * This module is a dependency of other sub-modules. Do not include this module as a dependency
 * in your angular app (use {@link ui.router} module instead).
 *
 */
angular.module('ui.router.util', ['ng']);

/**
 * @ngdoc overview
 * @name ui.router.router
 * 
 * @requires ui.router.util
 *
 * @description
 * # ui.router.router sub-module
 *
 * This module is a dependency of other sub-modules. Do not include this module as a dependency
 * in your angular app (use {@link ui.router} module instead).
 */
angular.module('ui.router.router', ['ui.router.util']);

/**
 * @ngdoc overview
 * @name ui.router.state
 * 
 * @requires ui.router.router
 * @requires ui.router.util
 *
 * @description
 * # ui.router.state sub-module
 *
 * This module is a dependency of the main ui.router module. Do not include this module as a dependency
 * in your angular app (use {@link ui.router} module instead).
 * 
 */
angular.module('ui.router.state', ['ui.router.router', 'ui.router.util']);

/**
 * @ngdoc overview
 * @name ui.router
 *
 * @requires ui.router.state
 *
 * @description
 * # ui.router
 * 
 * ## The main module for ui.router 
 * There are several sub-modules included with the ui.router module, however only this module is needed
 * as a dependency within your angular app. The other modules are for organization purposes. 
 *
 * The modules are:
 * * ui.router - the main "umbrella" module
 * * ui.router.router - 
 * 
 * *You'll need to include **only** this module as the dependency within your angular app.*
 * 
 * <pre>
 * <!doctype html>
 * <html ng-app="myApp">
 * <head>
 *   <script src="js/angular.js"></script>
 *   <!-- Include the ui-router script -->
 *   <script src="js/angular-ui-router.min.js"></script>
 *   <script>
 *     // ...and add 'ui.router' as a dependency
 *     var myApp = angular.module('myApp', ['ui.router']);
 *   </script>
 * </head>
 * <body>
 * </body>
 * </html>
 * </pre>
 */
angular.module('ui.router', ['ui.router.state']);

angular.module('ui.router.compat', ['ui.router']);

/**
 * @ngdoc object
 * @name ui.router.util.$resolve
 *
 * @requires $q
 * @requires $injector
 *
 * @description
 * Manages resolution of (acyclic) graphs of promises.
 */
$Resolve.$inject = ['$q', '$injector'];
function $Resolve(  $q,    $injector) {
  
  var VISIT_IN_PROGRESS = 1,
      VISIT_DONE = 2,
      NOTHING = {},
      NO_DEPENDENCIES = [],
      NO_LOCALS = NOTHING,
      NO_PARENT = extend($q.when(NOTHING), { $$promises: NOTHING, $$values: NOTHING });
  

  /**
   * @ngdoc function
   * @name ui.router.util.$resolve#study
   * @methodOf ui.router.util.$resolve
   *
   * @description
   * Studies a set of invocables that are likely to be used multiple times.
   * <pre>
   * $resolve.study(invocables)(locals, parent, self)
   * </pre>
   * is equivalent to
   * <pre>
   * $resolve.resolve(invocables, locals, parent, self)
   * </pre>
   * but the former is more efficient (in fact `resolve` just calls `study` 
   * internally).
   *
   * @param {object} invocables Invocable objects
   * @return {function} a function to pass in locals, parent and self
   */
  this.study = function (invocables) {
    if (!isObject(invocables)) throw new Error("'invocables' must be an object");
    var invocableKeys = objectKeys(invocables || {});
    
    // Perform a topological sort of invocables to build an ordered plan
    var plan = [], cycle = [], visited = {};
    function visit(value, key) {
      if (visited[key] === VISIT_DONE) return;
      
      cycle.push(key);
      if (visited[key] === VISIT_IN_PROGRESS) {
        cycle.splice(0, indexOf(cycle, key));
        throw new Error("Cyclic dependency: " + cycle.join(" -> "));
      }
      visited[key] = VISIT_IN_PROGRESS;
      
      if (isString(value)) {
        plan.push(key, [ function() { return $injector.get(value); }], NO_DEPENDENCIES);
      } else {
        var params = $injector.annotate(value);
        forEach(params, function (param) {
          if (param !== key && invocables.hasOwnProperty(param)) visit(invocables[param], param);
        });
        plan.push(key, value, params);
      }
      
      cycle.pop();
      visited[key] = VISIT_DONE;
    }
    forEach(invocables, visit);
    invocables = cycle = visited = null; // plan is all that's required
    
    function isResolve(value) {
      return isObject(value) && value.then && value.$$promises;
    }
    
    return function (locals, parent, self) {
      if (isResolve(locals) && self === undefined) {
        self = parent; parent = locals; locals = null;
      }
      if (!locals) locals = NO_LOCALS;
      else if (!isObject(locals)) {
        throw new Error("'locals' must be an object");
      }       
      if (!parent) parent = NO_PARENT;
      else if (!isResolve(parent)) {
        throw new Error("'parent' must be a promise returned by $resolve.resolve()");
      }
      
      // To complete the overall resolution, we have to wait for the parent
      // promise and for the promise for each invokable in our plan.
      var resolution = $q.defer(),
          result = silenceUncaughtInPromise(resolution.promise),
          promises = result.$$promises = {},
          values = extend({}, locals),
          wait = 1 + plan.length/3,
          merged = false;

      silenceUncaughtInPromise(result);
          
      function done() {
        // Merge parent values we haven't got yet and publish our own $$values
        if (!--wait) {
          if (!merged) merge(values, parent.$$values); 
          result.$$values = values;
          result.$$promises = result.$$promises || true; // keep for isResolve()
          delete result.$$inheritedValues;
          resolution.resolve(values);
        }
      }
      
      function fail(reason) {
        result.$$failure = reason;
        resolution.reject(reason);
      }

      // Short-circuit if parent has already failed
      if (isDefined(parent.$$failure)) {
        fail(parent.$$failure);
        return result;
      }
      
      if (parent.$$inheritedValues) {
        merge(values, omit(parent.$$inheritedValues, invocableKeys));
      }

      // Merge parent values if the parent has already resolved, or merge
      // parent promises and wait if the parent resolve is still in progress.
      extend(promises, parent.$$promises);
      if (parent.$$values) {
        merged = merge(values, omit(parent.$$values, invocableKeys));
        result.$$inheritedValues = omit(parent.$$values, invocableKeys);
        done();
      } else {
        if (parent.$$inheritedValues) {
          result.$$inheritedValues = omit(parent.$$inheritedValues, invocableKeys);
        }        
        parent.then(done, fail);
      }
      
      // Process each invocable in the plan, but ignore any where a local of the same name exists.
      for (var i=0, ii=plan.length; i<ii; i+=3) {
        if (locals.hasOwnProperty(plan[i])) done();
        else invoke(plan[i], plan[i+1], plan[i+2]);
      }
      
      function invoke(key, invocable, params) {
        // Create a deferred for this invocation. Failures will propagate to the resolution as well.
        var invocation = $q.defer(), waitParams = 0;
        function onfailure(reason) {
          invocation.reject(reason);
          fail(reason);
        }
        // Wait for any parameter that we have a promise for (either from parent or from this
        // resolve; in that case study() will have made sure it's ordered before us in the plan).
        forEach(params, function (dep) {
          if (promises.hasOwnProperty(dep) && !locals.hasOwnProperty(dep)) {
            waitParams++;
            promises[dep].then(function (result) {
              values[dep] = result;
              if (!(--waitParams)) proceed();
            }, onfailure);
          }
        });
        if (!waitParams) proceed();
        function proceed() {
          if (isDefined(result.$$failure)) return;
          try {
            invocation.resolve($injector.invoke(invocable, self, values));
            invocation.promise.then(function (result) {
              values[key] = result;
              done();
            }, onfailure);
          } catch (e) {
            onfailure(e);
          }
        }
        // Publish promise synchronously; invocations further down in the plan may depend on it.
        promises[key] = silenceUncaughtInPromise(invocation.promise);
      }
      
      return result;
    };
  };
  
  /**
   * @ngdoc function
   * @name ui.router.util.$resolve#resolve
   * @methodOf ui.router.util.$resolve
   *
   * @description
   * Resolves a set of invocables. An invocable is a function to be invoked via 
   * `$injector.invoke()`, and can have an arbitrary number of dependencies. 
   * An invocable can either return a value directly,
   * or a `$q` promise. If a promise is returned it will be resolved and the 
   * resulting value will be used instead. Dependencies of invocables are resolved 
   * (in this order of precedence)
   *
   * - from the specified `locals`
   * - from another invocable that is part of this `$resolve` call
   * - from an invocable that is inherited from a `parent` call to `$resolve` 
   *   (or recursively
   * - from any ancestor `$resolve` of that parent).
   *
   * The return value of `$resolve` is a promise for an object that contains 
   * (in this order of precedence)
   *
   * - any `locals` (if specified)
   * - the resolved return values of all injectables
   * - any values inherited from a `parent` call to `$resolve` (if specified)
   *
   * The promise will resolve after the `parent` promise (if any) and all promises 
   * returned by injectables have been resolved. If any invocable 
   * (or `$injector.invoke`) throws an exception, or if a promise returned by an 
   * invocable is rejected, the `$resolve` promise is immediately rejected with the 
   * same error. A rejection of a `parent` promise (if specified) will likewise be 
   * propagated immediately. Once the `$resolve` promise has been rejected, no 
   * further invocables will be called.
   * 
   * Cyclic dependencies between invocables are not permitted and will cause `$resolve`
   * to throw an error. As a special case, an injectable can depend on a parameter 
   * with the same name as the injectable, which will be fulfilled from the `parent` 
   * injectable of the same name. This allows inherited values to be decorated. 
   * Note that in this case any other injectable in the same `$resolve` with the same
   * dependency would see the decorated value, not the inherited value.
   *
   * Note that missing dependencies -- unlike cyclic dependencies -- will cause an 
   * (asynchronous) rejection of the `$resolve` promise rather than a (synchronous) 
   * exception.
   *
   * Invocables are invoked eagerly as soon as all dependencies are available. 
   * This is true even for dependencies inherited from a `parent` call to `$resolve`.
   *
   * As a special case, an invocable can be a string, in which case it is taken to 
   * be a service name to be passed to `$injector.get()`. This is supported primarily 
   * for backwards-compatibility with the `resolve` property of `$routeProvider` 
   * routes.
   *
   * @param {object} invocables functions to invoke or 
   * `$injector` services to fetch.
   * @param {object} locals  values to make available to the injectables
   * @param {object} parent  a promise returned by another call to `$resolve`.
   * @param {object} self  the `this` for the invoked methods
   * @return {object} Promise for an object that contains the resolved return value
   * of all invocables, as well as any inherited and local values.
   */
  this.resolve = function (invocables, locals, parent, self) {
    return this.study(invocables)(locals, parent, self);
  };
}

angular.module('ui.router.util').service('$resolve', $Resolve);



/**
 * @ngdoc object
 * @name ui.router.util.$templateFactoryProvider
 *
 * @description
 * Provider for $templateFactory. Manages which template-loading mechanism to
 * use, and will default to the most recent one ($templateRequest on Angular
 * versions starting from 1.3, $http otherwise).
 */
function TemplateFactoryProvider() {
  var shouldUnsafelyUseHttp = angular.version.minor < 3;

  /**
   * @ngdoc function
   * @name ui.router.util.$templateFactoryProvider#shouldUnsafelyUseHttp
   * @methodOf ui.router.util.$templateFactoryProvider
   *
   * @description
   * Forces $templateFactory to use $http instead of $templateRequest. This
   * might cause XSS, as $http doesn't enforce the regular security checks for
   * templates that have been introduced in Angular 1.3. Note that setting this
   * to false on Angular older than 1.3.x will crash, as the $templateRequest
   * service (and the security checks) are not implemented on these versions.
   *
   * See the $sce documentation, section
   * <a href="https://docs.angularjs.org/api/ng/service/$sce#impact-on-loading-templates">
   * Impact on loading templates</a> for more details about this mechanism.
   *
   * @param {boolean} value
   */
  this.shouldUnsafelyUseHttp = function(value) {
    shouldUnsafelyUseHttp = !!value;
  };

  /**
   * @ngdoc object
   * @name ui.router.util.$templateFactory
   *
   * @requires $http
   * @requires $templateCache
   * @requires $injector
   *
   * @description
   * Service. Manages loading of templates.
   */
  this.$get = ['$http', '$templateCache', '$injector', function($http, $templateCache, $injector){
    return new TemplateFactory($http, $templateCache, $injector, shouldUnsafelyUseHttp);}];
}


/**
 * @ngdoc object
 * @name ui.router.util.$templateFactory
 *
 * @requires $http
 * @requires $templateCache
 * @requires $injector
 *
 * @description
 * Service. Manages loading of templates.
 */
function TemplateFactory($http, $templateCache, $injector, shouldUnsafelyUseHttp) {

  /**
   * @ngdoc function
   * @name ui.router.util.$templateFactory#fromConfig
   * @methodOf ui.router.util.$templateFactory
   *
   * @description
   * Creates a template from a configuration object. 
   *
   * @param {object} config Configuration object for which to load a template. 
   * The following properties are search in the specified order, and the first one 
   * that is defined is used to create the template:
   *
   * @param {string|object} config.template html string template or function to 
   * load via {@link ui.router.util.$templateFactory#fromString fromString}.
   * @param {string|object} config.templateUrl url to load or a function returning 
   * the url to load via {@link ui.router.util.$templateFactory#fromUrl fromUrl}.
   * @param {Function} config.templateProvider function to invoke via 
   * {@link ui.router.util.$templateFactory#fromProvider fromProvider}.
   * @param {object} params  Parameters to pass to the template function.
   * @param {object} locals Locals to pass to `invoke` if the template is loaded 
   * via a `templateProvider`. Defaults to `{ params: params }`.
   *
   * @return {string|object}  The template html as a string, or a promise for 
   * that string,or `null` if no template is configured.
   */
  this.fromConfig = function (config, params, locals) {
    return (
      isDefined(config.template) ? this.fromString(config.template, params) :
      isDefined(config.templateUrl) ? this.fromUrl(config.templateUrl, params) :
      isDefined(config.templateProvider) ? this.fromProvider(config.templateProvider, params, locals) :
      null
    );
  };

  /**
   * @ngdoc function
   * @name ui.router.util.$templateFactory#fromString
   * @methodOf ui.router.util.$templateFactory
   *
   * @description
   * Creates a template from a string or a function returning a string.
   *
   * @param {string|object} template html template as a string or function that 
   * returns an html template as a string.
   * @param {object} params Parameters to pass to the template function.
   *
   * @return {string|object} The template html as a string, or a promise for that 
   * string.
   */
  this.fromString = function (template, params) {
    return isFunction(template) ? template(params) : template;
  };

  /**
   * @ngdoc function
   * @name ui.router.util.$templateFactory#fromUrl
   * @methodOf ui.router.util.$templateFactory
   * 
   * @description
   * Loads a template from the a URL via `$http` and `$templateCache`.
   *
   * @param {string|Function} url url of the template to load, or a function 
   * that returns a url.
   * @param {Object} params Parameters to pass to the url function.
   * @return {string|Promise.<string>} The template html as a string, or a promise 
   * for that string.
   */
  this.fromUrl = function (url, params) {
    if (isFunction(url)) url = url(params);
    if (url == null) return null;
    else {
      if(!shouldUnsafelyUseHttp) {
        return $injector.get('$templateRequest')(url);
      } else {
        return $http
          .get(url, { cache: $templateCache, headers: { Accept: 'text/html' }})
          .then(function(response) { return response.data; });
      }
    }
  };

  /**
   * @ngdoc function
   * @name ui.router.util.$templateFactory#fromProvider
   * @methodOf ui.router.util.$templateFactory
   *
   * @description
   * Creates a template by invoking an injectable provider function.
   *
   * @param {Function} provider Function to invoke via `$injector.invoke`
   * @param {Object} params Parameters for the template.
   * @param {Object} locals Locals to pass to `invoke`. Defaults to 
   * `{ params: params }`.
   * @return {string|Promise.<string>} The template html as a string, or a promise 
   * for that string.
   */
  this.fromProvider = function (provider, params, locals) {
    return $injector.invoke(provider, null, locals || { params: params });
  };
}

angular.module('ui.router.util').provider('$templateFactory', TemplateFactoryProvider);

var $$UMFP; // reference to $UrlMatcherFactoryProvider

/**
 * @ngdoc object
 * @name ui.router.util.type:UrlMatcher
 *
 * @description
 * Matches URLs against patterns and extracts named parameters from the path or the search
 * part of the URL. A URL pattern consists of a path pattern, optionally followed by '?' and a list
 * of search parameters. Multiple search parameter names are separated by '&'. Search parameters
 * do not influence whether or not a URL is matched, but their values are passed through into
 * the matched parameters returned by {@link ui.router.util.type:UrlMatcher#methods_exec exec}.
 *
 * Path parameter placeholders can be specified using simple colon/catch-all syntax or curly brace
 * syntax, which optionally allows a regular expression for the parameter to be specified:
 *
 * * `':'` name - colon placeholder
 * * `'*'` name - catch-all placeholder
 * * `'{' name '}'` - curly placeholder
 * * `'{' name ':' regexp|type '}'` - curly placeholder with regexp or type name. Should the
 *   regexp itself contain curly braces, they must be in matched pairs or escaped with a backslash.
 *
 * Parameter names may contain only word characters (latin letters, digits, and underscore) and
 * must be unique within the pattern (across both path and search parameters). For colon
 * placeholders or curly placeholders without an explicit regexp, a path parameter matches any
 * number of characters other than '/'. For catch-all placeholders the path parameter matches
 * any number of characters.
 *
 * Examples:
 *
 * * `'/hello/'` - Matches only if the path is exactly '/hello/'. There is no special treatment for
 *   trailing slashes, and patterns have to match the entire path, not just a prefix.
 * * `'/user/:id'` - Matches '/user/bob' or '/user/1234!!!' or even '/user/' but not '/user' or
 *   '/user/bob/details'. The second path segment will be captured as the parameter 'id'.
 * * `'/user/{id}'` - Same as the previous example, but using curly brace syntax.
 * * `'/user/{id:[^/]*}'` - Same as the previous example.
 * * `'/user/{id:[0-9a-fA-F]{1,8}}'` - Similar to the previous example, but only matches if the id
 *   parameter consists of 1 to 8 hex digits.
 * * `'/files/{path:.*}'` - Matches any URL starting with '/files/' and captures the rest of the
 *   path into the parameter 'path'.
 * * `'/files/*path'` - ditto.
 * * `'/calendar/{start:date}'` - Matches "/calendar/2014-11-12" (because the pattern defined
 *   in the built-in  `date` Type matches `2014-11-12`) and provides a Date object in $stateParams.start
 *
 * @param {string} pattern  The pattern to compile into a matcher.
 * @param {Object} config  A configuration object hash:
 * @param {Object=} parentMatcher Used to concatenate the pattern/config onto
 *   an existing UrlMatcher
 *
 * * `caseInsensitive` - `true` if URL matching should be case insensitive, otherwise `false`, the default value (for backward compatibility) is `false`.
 * * `strict` - `false` if matching against a URL with a trailing slash should be treated as equivalent to a URL without a trailing slash, the default value is `true`.
 *
 * @property {string} prefix  A static prefix of this pattern. The matcher guarantees that any
 *   URL matching this matcher (i.e. any string for which {@link ui.router.util.type:UrlMatcher#methods_exec exec()} returns
 *   non-null) will start with this prefix.
 *
 * @property {string} source  The pattern that was passed into the constructor
 *
 * @property {string} sourcePath  The path portion of the source property
 *
 * @property {string} sourceSearch  The search portion of the source property
 *
 * @property {string} regex  The constructed regex that will be used to match against the url when
 *   it is time to determine which url will match.
 *
 * @returns {Object}  New `UrlMatcher` object
 */
function UrlMatcher(pattern, config, parentMatcher) {
  config = extend({ params: {} }, isObject(config) ? config : {});

  // Find all placeholders and create a compiled pattern, using either classic or curly syntax:
  //   '*' name
  //   ':' name
  //   '{' name '}'
  //   '{' name ':' regexp '}'
  // The regular expression is somewhat complicated due to the need to allow curly braces
  // inside the regular expression. The placeholder regexp breaks down as follows:
  //    ([:*])([\w\[\]]+)              - classic placeholder ($1 / $2) (search version has - for snake-case)
  //    \{([\w\[\]]+)(?:\:\s*( ... ))?\}  - curly brace placeholder ($3) with optional regexp/type ... ($4) (search version has - for snake-case
  //    (?: ... | ... | ... )+         - the regexp consists of any number of atoms, an atom being either
  //    [^{}\\]+                       - anything other than curly braces or backslash
  //    \\.                            - a backslash escape
  //    \{(?:[^{}\\]+|\\.)*\}          - a matched set of curly braces containing other atoms
  var placeholder       = /([:*])([\w\[\]]+)|\{([\w\[\]]+)(?:\:\s*((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,
      searchPlaceholder = /([:]?)([\w\[\].-]+)|\{([\w\[\].-]+)(?:\:\s*((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,
      compiled = '^', last = 0, m,
      segments = this.segments = [],
      parentParams = parentMatcher ? parentMatcher.params : {},
      params = this.params = parentMatcher ? parentMatcher.params.$$new() : new $$UMFP.ParamSet(),
      paramNames = [];

  function addParameter(id, type, config, location) {
    paramNames.push(id);
    if (parentParams[id]) return parentParams[id];
    if (!/^\w+([-.]+\w+)*(?:\[\])?$/.test(id)) throw new Error("Invalid parameter name '" + id + "' in pattern '" + pattern + "'");
    if (params[id]) throw new Error("Duplicate parameter name '" + id + "' in pattern '" + pattern + "'");
    params[id] = new $$UMFP.Param(id, type, config, location);
    return params[id];
  }

  function quoteRegExp(string, pattern, squash, optional) {
    var surroundPattern = ['',''], result = string.replace(/[\\\[\]\^$*+?.()|{}]/g, "\\$&");
    if (!pattern) return result;
    switch(squash) {
      case false: surroundPattern = ['(', ')' + (optional ? "?" : "")]; break;
      case true:
        result = result.replace(/\/$/, '');
        surroundPattern = ['(?:\/(', ')|\/)?'];
      break;
      default:    surroundPattern = ['(' + squash + "|", ')?']; break;
    }
    return result + surroundPattern[0] + pattern + surroundPattern[1];
  }

  this.source = pattern;

  // Split into static segments separated by path parameter placeholders.
  // The number of segments is always 1 more than the number of parameters.
  function matchDetails(m, isSearch) {
    var id, regexp, segment, type, cfg, arrayMode;
    id          = m[2] || m[3]; // IE[78] returns '' for unmatched groups instead of null
    cfg         = config.params[id];
    segment     = pattern.substring(last, m.index);
    regexp      = isSearch ? m[4] : m[4] || (m[1] == '*' ? '.*' : null);

    if (regexp) {
      type      = $$UMFP.type(regexp) || inherit($$UMFP.type("string"), { pattern: new RegExp(regexp, config.caseInsensitive ? 'i' : undefined) });
    }

    return {
      id: id, regexp: regexp, segment: segment, type: type, cfg: cfg
    };
  }

  var p, param, segment;
  while ((m = placeholder.exec(pattern))) {
    p = matchDetails(m, false);
    if (p.segment.indexOf('?') >= 0) break; // we're into the search part

    param = addParameter(p.id, p.type, p.cfg, "path");
    compiled += quoteRegExp(p.segment, param.type.pattern.source, param.squash, param.isOptional);
    segments.push(p.segment);
    last = placeholder.lastIndex;
  }
  segment = pattern.substring(last);

  // Find any search parameter names and remove them from the last segment
  var i = segment.indexOf('?');

  if (i >= 0) {
    var search = this.sourceSearch = segment.substring(i);
    segment = segment.substring(0, i);
    this.sourcePath = pattern.substring(0, last + i);

    if (search.length > 0) {
      last = 0;
      while ((m = searchPlaceholder.exec(search))) {
        p = matchDetails(m, true);
        param = addParameter(p.id, p.type, p.cfg, "search");
        last = placeholder.lastIndex;
        // check if ?&
      }
    }
  } else {
    this.sourcePath = pattern;
    this.sourceSearch = '';
  }

  compiled += quoteRegExp(segment) + (config.strict === false ? '\/?' : '') + '$';
  segments.push(segment);

  this.regexp = new RegExp(compiled, config.caseInsensitive ? 'i' : undefined);
  this.prefix = segments[0];
  this.$$paramNames = paramNames;
}

/**
 * @ngdoc function
 * @name ui.router.util.type:UrlMatcher#concat
 * @methodOf ui.router.util.type:UrlMatcher
 *
 * @description
 * Returns a new matcher for a pattern constructed by appending the path part and adding the
 * search parameters of the specified pattern to this pattern. The current pattern is not
 * modified. This can be understood as creating a pattern for URLs that are relative to (or
 * suffixes of) the current pattern.
 *
 * @example
 * The following two matchers are equivalent:
 * <pre>
 * new UrlMatcher('/user/{id}?q').concat('/details?date');
 * new UrlMatcher('/user/{id}/details?q&date');
 * </pre>
 *
 * @param {string} pattern  The pattern to append.
 * @param {Object} config  An object hash of the configuration for the matcher.
 * @returns {UrlMatcher}  A matcher for the concatenated pattern.
 */
UrlMatcher.prototype.concat = function (pattern, config) {
  // Because order of search parameters is irrelevant, we can add our own search
  // parameters to the end of the new pattern. Parse the new pattern by itself
  // and then join the bits together, but it's much easier to do this on a string level.
  var defaultConfig = {
    caseInsensitive: $$UMFP.caseInsensitive(),
    strict: $$UMFP.strictMode(),
    squash: $$UMFP.defaultSquashPolicy()
  };
  return new UrlMatcher(this.sourcePath + pattern + this.sourceSearch, extend(defaultConfig, config), this);
};

UrlMatcher.prototype.toString = function () {
  return this.source;
};

/**
 * @ngdoc function
 * @name ui.router.util.type:UrlMatcher#exec
 * @methodOf ui.router.util.type:UrlMatcher
 *
 * @description
 * Tests the specified path against this matcher, and returns an object containing the captured
 * parameter values, or null if the path does not match. The returned object contains the values
 * of any search parameters that are mentioned in the pattern, but their value may be null if
 * they are not present in `searchParams`. This means that search parameters are always treated
 * as optional.
 *
 * @example
 * <pre>
 * new UrlMatcher('/user/{id}?q&r').exec('/user/bob', {
 *   x: '1', q: 'hello'
 * });
 * // returns { id: 'bob', q: 'hello', r: null }
 * </pre>
 *
 * @param {string} path  The URL path to match, e.g. `$location.path()`.
 * @param {Object} searchParams  URL search parameters, e.g. `$location.search()`.
 * @returns {Object}  The captured parameter values.
 */
UrlMatcher.prototype.exec = function (path, searchParams) {
  var m = this.regexp.exec(path);
  if (!m) return null;
  searchParams = searchParams || {};

  var paramNames = this.parameters(), nTotal = paramNames.length,
    nPath = this.segments.length - 1,
    values = {}, i, j, cfg, paramName;

  if (nPath !== m.length - 1) throw new Error("Unbalanced capture group in route '" + this.source + "'");

  function decodePathArray(string) {
    function reverseString(str) { return str.split("").reverse().join(""); }
    function unquoteDashes(str) { return str.replace(/\\-/g, "-"); }

    var split = reverseString(string).split(/-(?!\\)/);
    var allReversed = map(split, reverseString);
    return map(allReversed, unquoteDashes).reverse();
  }

  var param, paramVal;
  for (i = 0; i < nPath; i++) {
    paramName = paramNames[i];
    param = this.params[paramName];
    paramVal = m[i+1];
    // if the param value matches a pre-replace pair, replace the value before decoding.
    for (j = 0; j < param.replace.length; j++) {
      if (param.replace[j].from === paramVal) paramVal = param.replace[j].to;
    }
    if (paramVal && param.array === true) paramVal = decodePathArray(paramVal);
    if (isDefined(paramVal)) paramVal = param.type.decode(paramVal);
    values[paramName] = param.value(paramVal);
  }
  for (/**/; i < nTotal; i++) {
    paramName = paramNames[i];
    values[paramName] = this.params[paramName].value(searchParams[paramName]);
    param = this.params[paramName];
    paramVal = searchParams[paramName];
    for (j = 0; j < param.replace.length; j++) {
      if (param.replace[j].from === paramVal) paramVal = param.replace[j].to;
    }
    if (isDefined(paramVal)) paramVal = param.type.decode(paramVal);
    values[paramName] = param.value(paramVal);
  }

  return values;
};

/**
 * @ngdoc function
 * @name ui.router.util.type:UrlMatcher#parameters
 * @methodOf ui.router.util.type:UrlMatcher
 *
 * @description
 * Returns the names of all path and search parameters of this pattern in an unspecified order.
 *
 * @returns {Array.<string>}  An array of parameter names. Must be treated as read-only. If the
 *    pattern has no parameters, an empty array is returned.
 */
UrlMatcher.prototype.parameters = function (param) {
  if (!isDefined(param)) return this.$$paramNames;
  return this.params[param] || null;
};

/**
 * @ngdoc function
 * @name ui.router.util.type:UrlMatcher#validates
 * @methodOf ui.router.util.type:UrlMatcher
 *
 * @description
 * Checks an object hash of parameters to validate their correctness according to the parameter
 * types of this `UrlMatcher`.
 *
 * @param {Object} params The object hash of parameters to validate.
 * @returns {boolean} Returns `true` if `params` validates, otherwise `false`.
 */
UrlMatcher.prototype.validates = function (params) {
  return this.params.$$validates(params);
};

/**
 * @ngdoc function
 * @name ui.router.util.type:UrlMatcher#format
 * @methodOf ui.router.util.type:UrlMatcher
 *
 * @description
 * Creates a URL that matches this pattern by substituting the specified values
 * for the path and search parameters. Null values for path parameters are
 * treated as empty strings.
 *
 * @example
 * <pre>
 * new UrlMatcher('/user/{id}?q').format({ id:'bob', q:'yes' });
 * // returns '/user/bob?q=yes'
 * </pre>
 *
 * @param {Object} values  the values to substitute for the parameters in this pattern.
 * @returns {string}  the formatted URL (path and optionally search part).
 */
UrlMatcher.prototype.format = function (values) {
  values = values || {};
  var segments = this.segments, params = this.parameters(), paramset = this.params;
  if (!this.validates(values)) return null;

  var i, search = false, nPath = segments.length - 1, nTotal = params.length, result = segments[0];

  function encodeDashes(str) { // Replace dashes with encoded "\-"
    return encodeURIComponent(str).replace(/-/g, function(c) { return '%5C%' + c.charCodeAt(0).toString(16).toUpperCase(); });
  }

  for (i = 0; i < nTotal; i++) {
    var isPathParam = i < nPath;
    var name = params[i], param = paramset[name], value = param.value(values[name]);
    var isDefaultValue = param.isOptional && param.type.equals(param.value(), value);
    var squash = isDefaultValue ? param.squash : false;
    var encoded = param.type.encode(value);

    if (isPathParam) {
      var nextSegment = segments[i + 1];
      var isFinalPathParam = i + 1 === nPath;

      if (squash === false) {
        if (encoded != null) {
          if (isArray(encoded)) {
            result += map(encoded, encodeDashes).join("-");
          } else {
            result += encodeURIComponent(encoded);
          }
        }
        result += nextSegment;
      } else if (squash === true) {
        var capture = result.match(/\/$/) ? /\/?(.*)/ : /(.*)/;
        result += nextSegment.match(capture)[1];
      } else if (isString(squash)) {
        result += squash + nextSegment;
      }

      if (isFinalPathParam && param.squash === true && result.slice(-1) === '/') result = result.slice(0, -1);
    } else {
      if (encoded == null || (isDefaultValue && squash !== false)) continue;
      if (!isArray(encoded)) encoded = [ encoded ];
      if (encoded.length === 0) continue;
      encoded = map(encoded, encodeURIComponent).join('&' + name + '=');
      result += (search ? '&' : '?') + (name + '=' + encoded);
      search = true;
    }
  }

  return result;
};

/**
 * @ngdoc object
 * @name ui.router.util.type:Type
 *
 * @description
 * Implements an interface to define custom parameter types that can be decoded from and encoded to
 * string parameters matched in a URL. Used by {@link ui.router.util.type:UrlMatcher `UrlMatcher`}
 * objects when matching or formatting URLs, or comparing or validating parameter values.
 *
 * See {@link ui.router.util.$urlMatcherFactory#methods_type `$urlMatcherFactory#type()`} for more
 * information on registering custom types.
 *
 * @param {Object} config  A configuration object which contains the custom type definition.  The object's
 *        properties will override the default methods and/or pattern in `Type`'s public interface.
 * @example
 * <pre>
 * {
 *   decode: function(val) { return parseInt(val, 10); },
 *   encode: function(val) { return val && val.toString(); },
 *   equals: function(a, b) { return this.is(a) && a === b; },
 *   is: function(val) { return angular.isNumber(val) isFinite(val) && val % 1 === 0; },
 *   pattern: /\d+/
 * }
 * </pre>
 *
 * @property {RegExp} pattern The regular expression pattern used to match values of this type when
 *           coming from a substring of a URL.
 *
 * @returns {Object}  Returns a new `Type` object.
 */
function Type(config) {
  extend(this, config);
}

/**
 * @ngdoc function
 * @name ui.router.util.type:Type#is
 * @methodOf ui.router.util.type:Type
 *
 * @description
 * Detects whether a value is of a particular type. Accepts a native (decoded) value
 * and determines whether it matches the current `Type` object.
 *
 * @param {*} val  The value to check.
 * @param {string} key  Optional. If the type check is happening in the context of a specific
 *        {@link ui.router.util.type:UrlMatcher `UrlMatcher`} object, this is the name of the
 *        parameter in which `val` is stored. Can be used for meta-programming of `Type` objects.
 * @returns {Boolean}  Returns `true` if the value matches the type, otherwise `false`.
 */
Type.prototype.is = function(val, key) {
  return true;
};

/**
 * @ngdoc function
 * @name ui.router.util.type:Type#encode
 * @methodOf ui.router.util.type:Type
 *
 * @description
 * Encodes a custom/native type value to a string that can be embedded in a URL. Note that the
 * return value does *not* need to be URL-safe (i.e. passed through `encodeURIComponent()`), it
 * only needs to be a representation of `val` that has been coerced to a string.
 *
 * @param {*} val  The value to encode.
 * @param {string} key  The name of the parameter in which `val` is stored. Can be used for
 *        meta-programming of `Type` objects.
 * @returns {string}  Returns a string representation of `val` that can be encoded in a URL.
 */
Type.prototype.encode = function(val, key) {
  return val;
};

/**
 * @ngdoc function
 * @name ui.router.util.type:Type#decode
 * @methodOf ui.router.util.type:Type
 *
 * @description
 * Converts a parameter value (from URL string or transition param) to a custom/native value.
 *
 * @param {string} val  The URL parameter value to decode.
 * @param {string} key  The name of the parameter in which `val` is stored. Can be used for
 *        meta-programming of `Type` objects.
 * @returns {*}  Returns a custom representation of the URL parameter value.
 */
Type.prototype.decode = function(val, key) {
  return val;
};

/**
 * @ngdoc function
 * @name ui.router.util.type:Type#equals
 * @methodOf ui.router.util.type:Type
 *
 * @description
 * Determines whether two decoded values are equivalent.
 *
 * @param {*} a  A value to compare against.
 * @param {*} b  A value to compare against.
 * @returns {Boolean}  Returns `true` if the values are equivalent/equal, otherwise `false`.
 */
Type.prototype.equals = function(a, b) {
  return a == b;
};

Type.prototype.$subPattern = function() {
  var sub = this.pattern.toString();
  return sub.substr(1, sub.length - 2);
};

Type.prototype.pattern = /.*/;

Type.prototype.toString = function() { return "{Type:" + this.name + "}"; };

/** Given an encoded string, or a decoded object, returns a decoded object */
Type.prototype.$normalize = function(val) {
  return this.is(val) ? val : this.decode(val);
};

/*
 * Wraps an existing custom Type as an array of Type, depending on 'mode'.
 * e.g.:
 * - urlmatcher pattern "/path?{queryParam[]:int}"
 * - url: "/path?queryParam=1&queryParam=2
 * - $stateParams.queryParam will be [1, 2]
 * if `mode` is "auto", then
 * - url: "/path?queryParam=1 will create $stateParams.queryParam: 1
 * - url: "/path?queryParam=1&queryParam=2 will create $stateParams.queryParam: [1, 2]
 */
Type.prototype.$asArray = function(mode, isSearch) {
  if (!mode) return this;
  if (mode === "auto" && !isSearch) throw new Error("'auto' array mode is for query parameters only");

  function ArrayType(type, mode) {
    function bindTo(type, callbackName) {
      return function() {
        return type[callbackName].apply(type, arguments);
      };
    }

    // Wrap non-array value as array
    function arrayWrap(val) { return isArray(val) ? val : (isDefined(val) ? [ val ] : []); }
    // Unwrap array value for "auto" mode. Return undefined for empty array.
    function arrayUnwrap(val) {
      switch(val.length) {
        case 0: return undefined;
        case 1: return mode === "auto" ? val[0] : val;
        default: return val;
      }
    }
    function falsey(val) { return !val; }

    // Wraps type (.is/.encode/.decode) functions to operate on each value of an array
    function arrayHandler(callback, allTruthyMode) {
      return function handleArray(val) {
        if (isArray(val) && val.length === 0) return val;
        val = arrayWrap(val);
        var result = map(val, callback);
        if (allTruthyMode === true)
          return filter(result, falsey).length === 0;
        return arrayUnwrap(result);
      };
    }

    // Wraps type (.equals) functions to operate on each value of an array
    function arrayEqualsHandler(callback) {
      return function handleArray(val1, val2) {
        var left = arrayWrap(val1), right = arrayWrap(val2);
        if (left.length !== right.length) return false;
        for (var i = 0; i < left.length; i++) {
          if (!callback(left[i], right[i])) return false;
        }
        return true;
      };
    }

    this.encode = arrayHandler(bindTo(type, 'encode'));
    this.decode = arrayHandler(bindTo(type, 'decode'));
    this.is     = arrayHandler(bindTo(type, 'is'), true);
    this.equals = arrayEqualsHandler(bindTo(type, 'equals'));
    this.pattern = type.pattern;
    this.$normalize = arrayHandler(bindTo(type, '$normalize'));
    this.name = type.name;
    this.$arrayMode = mode;
  }

  return new ArrayType(this, mode);
};



/**
 * @ngdoc object
 * @name ui.router.util.$urlMatcherFactory
 *
 * @description
 * Factory for {@link ui.router.util.type:UrlMatcher `UrlMatcher`} instances. The factory
 * is also available to providers under the name `$urlMatcherFactoryProvider`.
 */
function $UrlMatcherFactory() {
  $$UMFP = this;

  var isCaseInsensitive = false, isStrictMode = true, defaultSquashPolicy = false;

  // Use tildes to pre-encode slashes.
  // If the slashes are simply URLEncoded, the browser can choose to pre-decode them,
  // and bidirectional encoding/decoding fails.
  // Tilde was chosen because it's not a RFC 3986 section 2.2 Reserved Character
  function valToString(val) { return val != null ? val.toString().replace(/(~|\/)/g, function (m) { return {'~':'~~', '/':'~2F'}[m]; }) : val; }
  function valFromString(val) { return val != null ? val.toString().replace(/(~~|~2F)/g, function (m) { return {'~~':'~', '~2F':'/'}[m]; }) : val; }

  var $types = {}, enqueue = true, typeQueue = [], injector, defaultTypes = {
    "string": {
      encode: valToString,
      decode: valFromString,
      // TODO: in 1.0, make string .is() return false if value is undefined/null by default.
      // In 0.2.x, string params are optional by default for backwards compat
      is: function(val) { return val == null || !isDefined(val) || typeof val === "string"; },
      pattern: /[^/]*/
    },
    "int": {
      encode: valToString,
      decode: function(val) { return parseInt(val, 10); },
      is: function(val) { return val !== undefined && val !== null && this.decode(val.toString()) === val; },
      pattern: /\d+/
    },
    "bool": {
      encode: function(val) { return val ? 1 : 0; },
      decode: function(val) { return parseInt(val, 10) !== 0; },
      is: function(val) { return val === true || val === false; },
      pattern: /0|1/
    },
    "date": {
      encode: function (val) {
        if (!this.is(val))
          return undefined;
        return [ val.getFullYear(),
          ('0' + (val.getMonth() + 1)).slice(-2),
          ('0' + val.getDate()).slice(-2)
        ].join("-");
      },
      decode: function (val) {
        if (this.is(val)) return val;
        var match = this.capture.exec(val);
        return match ? new Date(match[1], match[2] - 1, match[3]) : undefined;
      },
      is: function(val) { return val instanceof Date && !isNaN(val.valueOf()); },
      equals: function (a, b) { return this.is(a) && this.is(b) && a.toISOString() === b.toISOString(); },
      pattern: /[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])/,
      capture: /([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/
    },
    "json": {
      encode: angular.toJson,
      decode: angular.fromJson,
      is: angular.isObject,
      equals: angular.equals,
      pattern: /[^/]*/
    },
    "any": { // does not encode/decode
      encode: angular.identity,
      decode: angular.identity,
      equals: angular.equals,
      pattern: /.*/
    }
  };

  function getDefaultConfig() {
    return {
      strict: isStrictMode,
      caseInsensitive: isCaseInsensitive
    };
  }

  function isInjectable(value) {
    return (isFunction(value) || (isArray(value) && isFunction(value[value.length - 1])));
  }

  /**
   * [Internal] Get the default value of a parameter, which may be an injectable function.
   */
  $UrlMatcherFactory.$$getDefaultValue = function(config) {
    if (!isInjectable(config.value)) return config.value;
    if (!injector) throw new Error("Injectable functions cannot be called at configuration time");
    return injector.invoke(config.value);
  };

  /**
   * @ngdoc function
   * @name ui.router.util.$urlMatcherFactory#caseInsensitive
   * @methodOf ui.router.util.$urlMatcherFactory
   *
   * @description
   * Defines whether URL matching should be case sensitive (the default behavior), or not.
   *
   * @param {boolean} value `false` to match URL in a case sensitive manner; otherwise `true`;
   * @returns {boolean} the current value of caseInsensitive
   */
  this.caseInsensitive = function(value) {
    if (isDefined(value))
      isCaseInsensitive = value;
    return isCaseInsensitive;
  };

  /**
   * @ngdoc function
   * @name ui.router.util.$urlMatcherFactory#strictMode
   * @methodOf ui.router.util.$urlMatcherFactory
   *
   * @description
   * Defines whether URLs should match trailing slashes, or not (the default behavior).
   *
   * @param {boolean=} value `false` to match trailing slashes in URLs, otherwise `true`.
   * @returns {boolean} the current value of strictMode
   */
  this.strictMode = function(value) {
    if (isDefined(value))
      isStrictMode = value;
    return isStrictMode;
  };

  /**
   * @ngdoc function
   * @name ui.router.util.$urlMatcherFactory#defaultSquashPolicy
   * @methodOf ui.router.util.$urlMatcherFactory
   *
   * @description
   * Sets the default behavior when generating or matching URLs with default parameter values.
   *
   * @param {string} value A string that defines the default parameter URL squashing behavior.
   *    `nosquash`: When generating an href with a default parameter value, do not squash the parameter value from the URL
   *    `slash`: When generating an href with a default parameter value, squash (remove) the parameter value, and, if the
   *             parameter is surrounded by slashes, squash (remove) one slash from the URL
   *    any other string, e.g. "~": When generating an href with a default parameter value, squash (remove)
   *             the parameter value from the URL and replace it with this string.
   */
  this.defaultSquashPolicy = function(value) {
    if (!isDefined(value)) return defaultSquashPolicy;
    if (value !== true && value !== false && !isString(value))
      throw new Error("Invalid squash policy: " + value + ". Valid policies: false, true, arbitrary-string");
    defaultSquashPolicy = value;
    return value;
  };

  /**
   * @ngdoc function
   * @name ui.router.util.$urlMatcherFactory#compile
   * @methodOf ui.router.util.$urlMatcherFactory
   *
   * @description
   * Creates a {@link ui.router.util.type:UrlMatcher `UrlMatcher`} for the specified pattern.
   *
   * @param {string} pattern  The URL pattern.
   * @param {Object} config  The config object hash.
   * @returns {UrlMatcher}  The UrlMatcher.
   */
  this.compile = function (pattern, config) {
    return new UrlMatcher(pattern, extend(getDefaultConfig(), config));
  };

  /**
   * @ngdoc function
   * @name ui.router.util.$urlMatcherFactory#isMatcher
   * @methodOf ui.router.util.$urlMatcherFactory
   *
   * @description
   * Returns true if the specified object is a `UrlMatcher`, or false otherwise.
   *
   * @param {Object} object  The object to perform the type check against.
   * @returns {Boolean}  Returns `true` if the object matches the `UrlMatcher` interface, by
   *          implementing all the same methods.
   */
  this.isMatcher = function (o) {
    if (!isObject(o)) return false;
    var result = true;

    forEach(UrlMatcher.prototype, function(val, name) {
      if (isFunction(val)) {
        result = result && (isDefined(o[name]) && isFunction(o[name]));
      }
    });
    return result;
  };

  /**
   * @ngdoc function
   * @name ui.router.util.$urlMatcherFactory#type
   * @methodOf ui.router.util.$urlMatcherFactory
   *
   * @description
   * Registers a custom {@link ui.router.util.type:Type `Type`} object that can be used to
   * generate URLs with typed parameters.
   *
   * @param {string} name  The type name.
   * @param {Object|Function} definition   The type definition. See
   *        {@link ui.router.util.type:Type `Type`} for information on the values accepted.
   * @param {Object|Function} definitionFn (optional) A function that is injected before the app
   *        runtime starts.  The result of this function is merged into the existing `definition`.
   *        See {@link ui.router.util.type:Type `Type`} for information on the values accepted.
   *
   * @returns {Object}  Returns `$urlMatcherFactoryProvider`.
   *
   * @example
   * This is a simple example of a custom type that encodes and decodes items from an
   * array, using the array index as the URL-encoded value:
   *
   * <pre>
   * var list = ['John', 'Paul', 'George', 'Ringo'];
   *
   * $urlMatcherFactoryProvider.type('listItem', {
   *   encode: function(item) {
   *     // Represent the list item in the URL using its corresponding index
   *     return list.indexOf(item);
   *   },
   *   decode: function(item) {
   *     // Look up the list item by index
   *     return list[parseInt(item, 10)];
   *   },
   *   is: function(item) {
   *     // Ensure the item is valid by checking to see that it appears
   *     // in the list
   *     return list.indexOf(item) > -1;
   *   }
   * });
   *
   * $stateProvider.state('list', {
   *   url: "/list/{item:listItem}",
   *   controller: function($scope, $stateParams) {
   *     console.log($stateParams.item);
   *   }
   * });
   *
   * // ...
   *
   * // Changes URL to '/list/3', logs "Ringo" to the console
   * $state.go('list', { item: "Ringo" });
   * </pre>
   *
   * This is a more complex example of a type that relies on dependency injection to
   * interact with services, and uses the parameter name from the URL to infer how to
   * handle encoding and decoding parameter values:
   *
   * <pre>
   * // Defines a custom type that gets a value from a service,
   * // where each service gets different types of values from
   * // a backend API:
   * $urlMatcherFactoryProvider.type('dbObject', {}, function(Users, Posts) {
   *
   *   // Matches up services to URL parameter names
   *   var services = {
   *     user: Users,
   *     post: Posts
   *   };
   *
   *   return {
   *     encode: function(object) {
   *       // Represent the object in the URL using its unique ID
   *       return object.id;
   *     },
   *     decode: function(value, key) {
   *       // Look up the object by ID, using the parameter
   *       // name (key) to call the correct service
   *       return services[key].findById(value);
   *     },
   *     is: function(object, key) {
   *       // Check that object is a valid dbObject
   *       return angular.isObject(object) && object.id && services[key];
   *     }
   *     equals: function(a, b) {
   *       // Check the equality of decoded objects by comparing
   *       // their unique IDs
   *       return a.id === b.id;
   *     }
   *   };
   * });
   *
   * // In a config() block, you can then attach URLs with
   * // type-annotated parameters:
   * $stateProvider.state('users', {
   *   url: "/users",
   *   // ...
   * }).state('users.item', {
   *   url: "/{user:dbObject}",
   *   controller: function($scope, $stateParams) {
   *     // $stateParams.user will now be an object returned from
   *     // the Users service
   *   },
   *   // ...
   * });
   * </pre>
   */
  this.type = function (name, definition, definitionFn) {
    if (!isDefined(definition)) return $types[name];
    if ($types.hasOwnProperty(name)) throw new Error("A type named '" + name + "' has already been defined.");

    $types[name] = new Type(extend({ name: name }, definition));
    if (definitionFn) {
      typeQueue.push({ name: name, def: definitionFn });
      if (!enqueue) flushTypeQueue();
    }
    return this;
  };

  // `flushTypeQueue()` waits until `$urlMatcherFactory` is injected before invoking the queued `definitionFn`s
  function flushTypeQueue() {
    while(typeQueue.length) {
      var type = typeQueue.shift();
      if (type.pattern) throw new Error("You cannot override a type's .pattern at runtime.");
      angular.extend($types[type.name], injector.invoke(type.def));
    }
  }

  // Register default types. Store them in the prototype of $types.
  forEach(defaultTypes, function(type, name) { $types[name] = new Type(extend({name: name}, type)); });
  $types = inherit($types, {});

  /* No need to document $get, since it returns this */
  this.$get = ['$injector', function ($injector) {
    injector = $injector;
    enqueue = false;
    flushTypeQueue();

    forEach(defaultTypes, function(type, name) {
      if (!$types[name]) $types[name] = new Type(type);
    });
    return this;
  }];

  this.Param = function Param(id, type, config, location) {
    var self = this;
    config = unwrapShorthand(config);
    type = getType(config, type, location);
    var arrayMode = getArrayMode();
    type = arrayMode ? type.$asArray(arrayMode, location === "search") : type;
    if (type.name === "string" && !arrayMode && location === "path" && config.value === undefined)
      config.value = ""; // for 0.2.x; in 0.3.0+ do not automatically default to ""
    var isOptional = config.value !== undefined;
    var squash = getSquashPolicy(config, isOptional);
    var replace = getReplace(config, arrayMode, isOptional, squash);

    function unwrapShorthand(config) {
      var keys = isObject(config) ? objectKeys(config) : [];
      var isShorthand = indexOf(keys, "value") === -1 && indexOf(keys, "type") === -1 &&
                        indexOf(keys, "squash") === -1 && indexOf(keys, "array") === -1;
      if (isShorthand) config = { value: config };
      config.$$fn = isInjectable(config.value) ? config.value : function () { return config.value; };
      return config;
    }

    function getType(config, urlType, location) {
      if (config.type && urlType) throw new Error("Param '"+id+"' has two type configurations.");
      if (urlType) return urlType;
      if (!config.type) return (location === "config" ? $types.any : $types.string);

      if (angular.isString(config.type))
        return $types[config.type];
      if (config.type instanceof Type)
        return config.type;
      return new Type(config.type);
    }

    // array config: param name (param[]) overrides default settings.  explicit config overrides param name.
    function getArrayMode() {
      var arrayDefaults = { array: (location === "search" ? "auto" : false) };
      var arrayParamNomenclature = id.match(/\[\]$/) ? { array: true } : {};
      return extend(arrayDefaults, arrayParamNomenclature, config).array;
    }

    /**
     * returns false, true, or the squash value to indicate the "default parameter url squash policy".
     */
    function getSquashPolicy(config, isOptional) {
      var squash = config.squash;
      if (!isOptional || squash === false) return false;
      if (!isDefined(squash) || squash == null) return defaultSquashPolicy;
      if (squash === true || isString(squash)) return squash;
      throw new Error("Invalid squash policy: '" + squash + "'. Valid policies: false, true, or arbitrary string");
    }

    function getReplace(config, arrayMode, isOptional, squash) {
      var replace, configuredKeys, defaultPolicy = [
        { from: "",   to: (isOptional || arrayMode ? undefined : "") },
        { from: null, to: (isOptional || arrayMode ? undefined : "") }
      ];
      replace = isArray(config.replace) ? config.replace : [];
      if (isString(squash))
        replace.push({ from: squash, to: undefined });
      configuredKeys = map(replace, function(item) { return item.from; } );
      return filter(defaultPolicy, function(item) { return indexOf(configuredKeys, item.from) === -1; }).concat(replace);
    }

    /**
     * [Internal] Get the default value of a parameter, which may be an injectable function.
     */
    function $$getDefaultValue() {
      if (!injector) throw new Error("Injectable functions cannot be called at configuration time");
      var defaultValue = injector.invoke(config.$$fn);
      if (defaultValue !== null && defaultValue !== undefined && !self.type.is(defaultValue))
        throw new Error("Default value (" + defaultValue + ") for parameter '" + self.id + "' is not an instance of Type (" + self.type.name + ")");
      return defaultValue;
    }

    /**
     * [Internal] Gets the decoded representation of a value if the value is defined, otherwise, returns the
     * default value, which may be the result of an injectable function.
     */
    function $value(value) {
      function hasReplaceVal(val) { return function(obj) { return obj.from === val; }; }
      function $replace(value) {
        var replacement = map(filter(self.replace, hasReplaceVal(value)), function(obj) { return obj.to; });
        return replacement.length ? replacement[0] : value;
      }
      value = $replace(value);
      return !isDefined(value) ? $$getDefaultValue() : self.type.$normalize(value);
    }

    function toString() { return "{Param:" + id + " " + type + " squash: '" + squash + "' optional: " + isOptional + "}"; }

    extend(this, {
      id: id,
      type: type,
      location: location,
      array: arrayMode,
      squash: squash,
      replace: replace,
      isOptional: isOptional,
      value: $value,
      dynamic: undefined,
      config: config,
      toString: toString
    });
  };

  function ParamSet(params) {
    extend(this, params || {});
  }

  ParamSet.prototype = {
    $$new: function() {
      return inherit(this, extend(new ParamSet(), { $$parent: this}));
    },
    $$keys: function () {
      var keys = [], chain = [], parent = this,
        ignore = objectKeys(ParamSet.prototype);
      while (parent) { chain.push(parent); parent = parent.$$parent; }
      chain.reverse();
      forEach(chain, function(paramset) {
        forEach(objectKeys(paramset), function(key) {
            if (indexOf(keys, key) === -1 && indexOf(ignore, key) === -1) keys.push(key);
        });
      });
      return keys;
    },
    $$values: function(paramValues) {
      var values = {}, self = this;
      forEach(self.$$keys(), function(key) {
        values[key] = self[key].value(paramValues && paramValues[key]);
      });
      return values;
    },
    $$equals: function(paramValues1, paramValues2) {
      var equal = true, self = this;
      forEach(self.$$keys(), function(key) {
        var left = paramValues1 && paramValues1[key], right = paramValues2 && paramValues2[key];
        if (!self[key].type.equals(left, right)) equal = false;
      });
      return equal;
    },
    $$validates: function $$validate(paramValues) {
      var keys = this.$$keys(), i, param, rawVal, normalized, encoded;
      for (i = 0; i < keys.length; i++) {
        param = this[keys[i]];
        rawVal = paramValues[keys[i]];
        if ((rawVal === undefined || rawVal === null) && param.isOptional)
          break; // There was no parameter value, but the param is optional
        normalized = param.type.$normalize(rawVal);
        if (!param.type.is(normalized))
          return false; // The value was not of the correct Type, and could not be decoded to the correct Type
        encoded = param.type.encode(normalized);
        if (angular.isString(encoded) && !param.type.pattern.exec(encoded))
          return false; // The value was of the correct type, but when encoded, did not match the Type's regexp
      }
      return true;
    },
    $$parent: undefined
  };

  this.ParamSet = ParamSet;
}

// Register as a provider so it's available to other providers
angular.module('ui.router.util').provider('$urlMatcherFactory', $UrlMatcherFactory);
angular.module('ui.router.util').run(['$urlMatcherFactory', function($urlMatcherFactory) { }]);

/**
 * @ngdoc object
 * @name ui.router.router.$urlRouterProvider
 *
 * @requires ui.router.util.$urlMatcherFactoryProvider
 * @requires $locationProvider
 *
 * @description
 * `$urlRouterProvider` has the responsibility of watching `$location`. 
 * When `$location` changes it runs through a list of rules one by one until a 
 * match is found. `$urlRouterProvider` is used behind the scenes anytime you specify 
 * a url in a state configuration. All urls are compiled into a UrlMatcher object.
 *
 * There are several methods on `$urlRouterProvider` that make it useful to use directly
 * in your module config.
 */
$UrlRouterProvider.$inject = ['$locationProvider', '$urlMatcherFactoryProvider'];
function $UrlRouterProvider(   $locationProvider,   $urlMatcherFactory) {
  var rules = [], otherwise = null, interceptDeferred = false, listener;

  // Returns a string that is a prefix of all strings matching the RegExp
  function regExpPrefix(re) {
    var prefix = /^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(re.source);
    return (prefix != null) ? prefix[1].replace(/\\(.)/g, "$1") : '';
  }

  // Interpolates matched values into a String.replace()-style pattern
  function interpolate(pattern, match) {
    return pattern.replace(/\$(\$|\d{1,2})/, function (m, what) {
      return match[what === '$' ? 0 : Number(what)];
    });
  }

  /**
   * @ngdoc function
   * @name ui.router.router.$urlRouterProvider#rule
   * @methodOf ui.router.router.$urlRouterProvider
   *
   * @description
   * Defines rules that are used by `$urlRouterProvider` to find matches for
   * specific URLs.
   *
   * @example
   * <pre>
   * var app = angular.module('app', ['ui.router.router']);
   *
   * app.config(function ($urlRouterProvider) {
   *   // Here's an example of how you might allow case insensitive urls
   *   $urlRouterProvider.rule(function ($injector, $location) {
   *     var path = $location.path(),
   *         normalized = path.toLowerCase();
   *
   *     if (path !== normalized) {
   *       return normalized;
   *     }
   *   });
   * });
   * </pre>
   *
   * @param {function} rule Handler function that takes `$injector` and `$location`
   * services as arguments. You can use them to return a valid path as a string.
   *
   * @return {object} `$urlRouterProvider` - `$urlRouterProvider` instance
   */
  this.rule = function (rule) {
    if (!isFunction(rule)) throw new Error("'rule' must be a function");
    rules.push(rule);
    return this;
  };

  /**
   * @ngdoc object
   * @name ui.router.router.$urlRouterProvider#otherwise
   * @methodOf ui.router.router.$urlRouterProvider
   *
   * @description
   * Defines a path that is used when an invalid route is requested.
   *
   * @example
   * <pre>
   * var app = angular.module('app', ['ui.router.router']);
   *
   * app.config(function ($urlRouterProvider) {
   *   // if the path doesn't match any of the urls you configured
   *   // otherwise will take care of routing the user to the
   *   // specified url
   *   $urlRouterProvider.otherwise('/index');
   *
   *   // Example of using function rule as param
   *   $urlRouterProvider.otherwise(function ($injector, $location) {
   *     return '/a/valid/url';
   *   });
   * });
   * </pre>
   *
   * @param {string|function} rule The url path you want to redirect to or a function 
   * rule that returns the url path. The function version is passed two params: 
   * `$injector` and `$location` services, and must return a url string.
   *
   * @return {object} `$urlRouterProvider` - `$urlRouterProvider` instance
   */
  this.otherwise = function (rule) {
    if (isString(rule)) {
      var redirect = rule;
      rule = function () { return redirect; };
    }
    else if (!isFunction(rule)) throw new Error("'rule' must be a function");
    otherwise = rule;
    return this;
  };


  function handleIfMatch($injector, handler, match) {
    if (!match) return false;
    var result = $injector.invoke(handler, handler, { $match: match });
    return isDefined(result) ? result : true;
  }

  /**
   * @ngdoc function
   * @name ui.router.router.$urlRouterProvider#when
   * @methodOf ui.router.router.$urlRouterProvider
   *
   * @description
   * Registers a handler for a given url matching. 
   * 
   * If the handler is a string, it is
   * treated as a redirect, and is interpolated according to the syntax of match
   * (i.e. like `String.replace()` for `RegExp`, or like a `UrlMatcher` pattern otherwise).
   *
   * If the handler is a function, it is injectable. It gets invoked if `$location`
   * matches. You have the option of inject the match object as `$match`.
   *
   * The handler can return
   *
   * - **falsy** to indicate that the rule didn't match after all, then `$urlRouter`
   *   will continue trying to find another one that matches.
   * - **string** which is treated as a redirect and passed to `$location.url()`
   * - **void** or any **truthy** value tells `$urlRouter` that the url was handled.
   *
   * @example
   * <pre>
   * var app = angular.module('app', ['ui.router.router']);
   *
   * app.config(function ($urlRouterProvider) {
   *   $urlRouterProvider.when($state.url, function ($match, $stateParams) {
   *     if ($state.$current.navigable !== state ||
   *         !equalForKeys($match, $stateParams) {
   *      $state.transitionTo(state, $match, false);
   *     }
   *   });
   * });
   * </pre>
   *
   * @param {string|object} what The incoming path that you want to redirect.
   * @param {string|function} handler The path you want to redirect your user to.
   */
  this.when = function (what, handler) {
    var redirect, handlerIsString = isString(handler);
    if (isString(what)) what = $urlMatcherFactory.compile(what);

    if (!handlerIsString && !isFunction(handler) && !isArray(handler))
      throw new Error("invalid 'handler' in when()");

    var strategies = {
      matcher: function (what, handler) {
        if (handlerIsString) {
          redirect = $urlMatcherFactory.compile(handler);
          handler = ['$match', function ($match) { return redirect.format($match); }];
        }
        return extend(function ($injector, $location) {
          return handleIfMatch($injector, handler, what.exec($location.path(), $location.search()));
        }, {
          prefix: isString(what.prefix) ? what.prefix : ''
        });
      },
      regex: function (what, handler) {
        if (what.global || what.sticky) throw new Error("when() RegExp must not be global or sticky");

        if (handlerIsString) {
          redirect = handler;
          handler = ['$match', function ($match) { return interpolate(redirect, $match); }];
        }
        return extend(function ($injector, $location) {
          return handleIfMatch($injector, handler, what.exec($location.path()));
        }, {
          prefix: regExpPrefix(what)
        });
      }
    };

    var check = { matcher: $urlMatcherFactory.isMatcher(what), regex: what instanceof RegExp };

    for (var n in check) {
      if (check[n]) return this.rule(strategies[n](what, handler));
    }

    throw new Error("invalid 'what' in when()");
  };

  /**
   * @ngdoc function
   * @name ui.router.router.$urlRouterProvider#deferIntercept
   * @methodOf ui.router.router.$urlRouterProvider
   *
   * @description
   * Disables (or enables) deferring location change interception.
   *
   * If you wish to customize the behavior of syncing the URL (for example, if you wish to
   * defer a transition but maintain the current URL), call this method at configuration time.
   * Then, at run time, call `$urlRouter.listen()` after you have configured your own
   * `$locationChangeSuccess` event handler.
   *
   * @example
   * <pre>
   * var app = angular.module('app', ['ui.router.router']);
   *
   * app.config(function ($urlRouterProvider) {
   *
   *   // Prevent $urlRouter from automatically intercepting URL changes;
   *   // this allows you to configure custom behavior in between
   *   // location changes and route synchronization:
   *   $urlRouterProvider.deferIntercept();
   *
   * }).run(function ($rootScope, $urlRouter, UserService) {
   *
   *   $rootScope.$on('$locationChangeSuccess', function(e) {
   *     // UserService is an example service for managing user state
   *     if (UserService.isLoggedIn()) return;
   *
   *     // Prevent $urlRouter's default handler from firing
   *     e.preventDefault();
   *
   *     UserService.handleLogin().then(function() {
   *       // Once the user has logged in, sync the current URL
   *       // to the router:
   *       $urlRouter.sync();
   *     });
   *   });
   *
   *   // Configures $urlRouter's listener *after* your custom listener
   *   $urlRouter.listen();
   * });
   * </pre>
   *
   * @param {boolean} defer Indicates whether to defer location change interception. Passing
            no parameter is equivalent to `true`.
   */
  this.deferIntercept = function (defer) {
    if (defer === undefined) defer = true;
    interceptDeferred = defer;
  };

  /**
   * @ngdoc object
   * @name ui.router.router.$urlRouter
   *
   * @requires $location
   * @requires $rootScope
   * @requires $injector
   * @requires $browser
   *
   * @description
   *
   */
  this.$get = $get;
  $get.$inject = ['$location', '$rootScope', '$injector', '$browser', '$sniffer'];
  function $get(   $location,   $rootScope,   $injector,   $browser,   $sniffer) {

    var baseHref = $browser.baseHref(), location = $location.url(), lastPushedUrl;

    function appendBasePath(url, isHtml5, absolute) {
      if (baseHref === '/') return url;
      if (isHtml5) return baseHref.slice(0, -1) + url;
      if (absolute) return baseHref.slice(1) + url;
      return url;
    }

    // TODO: Optimize groups of rules with non-empty prefix into some sort of decision tree
    function update(evt) {
      if (evt && evt.defaultPrevented) return;
      var ignoreUpdate = lastPushedUrl && $location.url() === lastPushedUrl;
      lastPushedUrl = undefined;
      // TODO: Re-implement this in 1.0 for https://github.com/angular-ui/ui-router/issues/1573
      //if (ignoreUpdate) return true;

      function check(rule) {
        var handled = rule($injector, $location);

        if (!handled) return false;
        if (isString(handled)) $location.replace().url(handled);
        return true;
      }
      var n = rules.length, i;

      for (i = 0; i < n; i++) {
        if (check(rules[i])) return;
      }
      // always check otherwise last to allow dynamic updates to the set of rules
      if (otherwise) check(otherwise);
    }

    function listen() {
      listener = listener || $rootScope.$on('$locationChangeSuccess', update);
      return listener;
    }

    if (!interceptDeferred) listen();

    return {
      /**
       * @ngdoc function
       * @name ui.router.router.$urlRouter#sync
       * @methodOf ui.router.router.$urlRouter
       *
       * @description
       * Triggers an update; the same update that happens when the address bar url changes, aka `$locationChangeSuccess`.
       * This method is useful when you need to use `preventDefault()` on the `$locationChangeSuccess` event,
       * perform some custom logic (route protection, auth, config, redirection, etc) and then finally proceed
       * with the transition by calling `$urlRouter.sync()`.
       *
       * @example
       * <pre>
       * angular.module('app', ['ui.router'])
       *   .run(function($rootScope, $urlRouter) {
       *     $rootScope.$on('$locationChangeSuccess', function(evt) {
       *       // Halt state change from even starting
       *       evt.preventDefault();
       *       // Perform custom logic
       *       var meetsRequirement = ...
       *       // Continue with the update and state transition if logic allows
       *       if (meetsRequirement) $urlRouter.sync();
       *     });
       * });
       * </pre>
       */
      sync: function() {
        update();
      },

      listen: function() {
        return listen();
      },

      update: function(read) {
        if (read) {
          location = $location.url();
          return;
        }
        if ($location.url() === location) return;

        $location.url(location);
        $location.replace();
      },

      push: function(urlMatcher, params, options) {
         var url = urlMatcher.format(params || {});

        // Handle the special hash param, if needed
        if (url !== null && params && params['#']) {
            url += '#' + params['#'];
        }

        $location.url(url);
        lastPushedUrl = options && options.$$avoidResync ? $location.url() : undefined;
        if (options && options.replace) $location.replace();
      },

      /**
       * @ngdoc function
       * @name ui.router.router.$urlRouter#href
       * @methodOf ui.router.router.$urlRouter
       *
       * @description
       * A URL generation method that returns the compiled URL for a given
       * {@link ui.router.util.type:UrlMatcher `UrlMatcher`}, populated with the provided parameters.
       *
       * @example
       * <pre>
       * $bob = $urlRouter.href(new UrlMatcher("/about/:person"), {
       *   person: "bob"
       * });
       * // $bob == "/about/bob";
       * </pre>
       *
       * @param {UrlMatcher} urlMatcher The `UrlMatcher` object which is used as the template of the URL to generate.
       * @param {object=} params An object of parameter values to fill the matcher's required parameters.
       * @param {object=} options Options object. The options are:
       *
       * - **`absolute`** - {boolean=false},  If true will generate an absolute url, e.g. "http://www.example.com/fullurl".
       *
       * @returns {string} Returns the fully compiled URL, or `null` if `params` fail validation against `urlMatcher`
       */
      href: function(urlMatcher, params, options) {
        if (!urlMatcher.validates(params)) return null;

        var isHtml5 = $locationProvider.html5Mode();
        if (angular.isObject(isHtml5)) {
          isHtml5 = isHtml5.enabled;
        }

        isHtml5 = isHtml5 && $sniffer.history;
        
        var url = urlMatcher.format(params);
        options = options || {};

        if (!isHtml5 && url !== null) {
          url = "#" + $locationProvider.hashPrefix() + url;
        }

        // Handle special hash param, if needed
        if (url !== null && params && params['#']) {
          url += '#' + params['#'];
        }

        url = appendBasePath(url, isHtml5, options.absolute);

        if (!options.absolute || !url) {
          return url;
        }

        var slash = (!isHtml5 && url ? '/' : ''), port = $location.port();
        port = (port === 80 || port === 443 ? '' : ':' + port);

        return [$location.protocol(), '://', $location.host(), port, slash, url].join('');
      }
    };
  }
}

angular.module('ui.router.router').provider('$urlRouter', $UrlRouterProvider);

/**
 * @ngdoc object
 * @name ui.router.state.$stateProvider
 *
 * @requires ui.router.router.$urlRouterProvider
 * @requires ui.router.util.$urlMatcherFactoryProvider
 *
 * @description
 * The new `$stateProvider` works similar to Angular's v1 router, but it focuses purely
 * on state.
 *
 * A state corresponds to a "place" in the application in terms of the overall UI and
 * navigation. A state describes (via the controller / template / view properties) what
 * the UI looks like and does at that place.
 *
 * States often have things in common, and the primary way of factoring out these
 * commonalities in this model is via the state hierarchy, i.e. parent/child states aka
 * nested states.
 *
 * The `$stateProvider` provides interfaces to declare these states for your app.
 */
$StateProvider.$inject = ['$urlRouterProvider', '$urlMatcherFactoryProvider'];
function $StateProvider(   $urlRouterProvider,   $urlMatcherFactory) {

  var root, states = {}, $state, queue = {}, abstractKey = 'abstract';

  // Builds state properties from definition passed to registerState()
  var stateBuilder = {

    // Derive parent state from a hierarchical name only if 'parent' is not explicitly defined.
    // state.children = [];
    // if (parent) parent.children.push(state);
    parent: function(state) {
      if (isDefined(state.parent) && state.parent) return findState(state.parent);
      // regex matches any valid composite state name
      // would match "contact.list" but not "contacts"
      var compositeName = /^(.+)\.[^.]+$/.exec(state.name);
      return compositeName ? findState(compositeName[1]) : root;
    },

    // inherit 'data' from parent and override by own values (if any)
    data: function(state) {
      if (state.parent && state.parent.data) {
        state.data = state.self.data = inherit(state.parent.data, state.data);
      }
      return state.data;
    },

    // Build a URLMatcher if necessary, either via a relative or absolute URL
    url: function(state) {
      var url = state.url, config = { params: state.params || {} };

      if (isString(url)) {
        if (url.charAt(0) == '^') return $urlMatcherFactory.compile(url.substring(1), config);
        return (state.parent.navigable || root).url.concat(url, config);
      }

      if (!url || $urlMatcherFactory.isMatcher(url)) return url;
      throw new Error("Invalid url '" + url + "' in state '" + state + "'");
    },

    // Keep track of the closest ancestor state that has a URL (i.e. is navigable)
    navigable: function(state) {
      return state.url ? state : (state.parent ? state.parent.navigable : null);
    },

    // Own parameters for this state. state.url.params is already built at this point. Create and add non-url params
    ownParams: function(state) {
      var params = state.url && state.url.params || new $$UMFP.ParamSet();
      forEach(state.params || {}, function(config, id) {
        if (!params[id]) params[id] = new $$UMFP.Param(id, null, config, "config");
      });
      return params;
    },

    // Derive parameters for this state and ensure they're a super-set of parent's parameters
    params: function(state) {
      var ownParams = pick(state.ownParams, state.ownParams.$$keys());
      return state.parent && state.parent.params ? extend(state.parent.params.$$new(), ownParams) : new $$UMFP.ParamSet();
    },

    // If there is no explicit multi-view configuration, make one up so we don't have
    // to handle both cases in the view directive later. Note that having an explicit
    // 'views' property will mean the default unnamed view properties are ignored. This
    // is also a good time to resolve view names to absolute names, so everything is a
    // straight lookup at link time.
    views: function(state) {
      var views = {};

      forEach(isDefined(state.views) ? state.views : { '': state }, function (view, name) {
        if (name.indexOf('@') < 0) name += '@' + state.parent.name;
        view.resolveAs = view.resolveAs || state.resolveAs || '$resolve';
        views[name] = view;
      });
      return views;
    },

    // Keep a full path from the root down to this state as this is needed for state activation.
    path: function(state) {
      return state.parent ? state.parent.path.concat(state) : []; // exclude root from path
    },

    // Speed up $state.contains() as it's used a lot
    includes: function(state) {
      var includes = state.parent ? extend({}, state.parent.includes) : {};
      includes[state.name] = true;
      return includes;
    },

    $delegates: {}
  };

  function isRelative(stateName) {
    return stateName.indexOf(".") === 0 || stateName.indexOf("^") === 0;
  }

  function findState(stateOrName, base) {
    if (!stateOrName) return undefined;

    var isStr = isString(stateOrName),
        name  = isStr ? stateOrName : stateOrName.name,
        path  = isRelative(name);

    if (path) {
      if (!base) throw new Error("No reference point given for path '"  + name + "'");
      base = findState(base);
      
      var rel = name.split("."), i = 0, pathLength = rel.length, current = base;

      for (; i < pathLength; i++) {
        if (rel[i] === "" && i === 0) {
          current = base;
          continue;
        }
        if (rel[i] === "^") {
          if (!current.parent) throw new Error("Path '" + name + "' not valid for state '" + base.name + "'");
          current = current.parent;
          continue;
        }
        break;
      }
      rel = rel.slice(i).join(".");
      name = current.name + (current.name && rel ? "." : "") + rel;
    }
    var state = states[name];

    if (state && (isStr || (!isStr && (state === stateOrName || state.self === stateOrName)))) {
      return state;
    }
    return undefined;
  }

  function queueState(parentName, state) {
    if (!queue[parentName]) {
      queue[parentName] = [];
    }
    queue[parentName].push(state);
  }

  function flushQueuedChildren(parentName) {
    var queued = queue[parentName] || [];
    while(queued.length) {
      registerState(queued.shift());
    }
  }

  function registerState(state) {
    // Wrap a new object around the state so we can store our private details easily.
    state = inherit(state, {
      self: state,
      resolve: state.resolve || {},
      toString: function() { return this.name; }
    });

    var name = state.name;
    if (!isString(name) || name.indexOf('@') >= 0) throw new Error("State must have a valid name");
    if (states.hasOwnProperty(name)) throw new Error("State '" + name + "' is already defined");

    // Get parent name
    var parentName = (name.indexOf('.') !== -1) ? name.substring(0, name.lastIndexOf('.'))
        : (isString(state.parent)) ? state.parent
        : (isObject(state.parent) && isString(state.parent.name)) ? state.parent.name
        : '';

    // If parent is not registered yet, add state to queue and register later
    if (parentName && !states[parentName]) {
      return queueState(parentName, state.self);
    }

    for (var key in stateBuilder) {
      if (isFunction(stateBuilder[key])) state[key] = stateBuilder[key](state, stateBuilder.$delegates[key]);
    }
    states[name] = state;

    // Register the state in the global state list and with $urlRouter if necessary.
    if (!state[abstractKey] && state.url) {
      $urlRouterProvider.when(state.url, ['$match', '$stateParams', function ($match, $stateParams) {
        if ($state.$current.navigable != state || !equalForKeys($match, $stateParams)) {
          $state.transitionTo(state, $match, { inherit: true, location: false });
        }
      }]);
    }

    // Register any queued children
    flushQueuedChildren(name);

    return state;
  }

  // Checks text to see if it looks like a glob.
  function isGlob (text) {
    return text.indexOf('*') > -1;
  }

  // Returns true if glob matches current $state name.
  function doesStateMatchGlob (glob) {
    var globSegments = glob.split('.'),
        segments = $state.$current.name.split('.');

    //match single stars
    for (var i = 0, l = globSegments.length; i < l; i++) {
      if (globSegments[i] === '*') {
        segments[i] = '*';
      }
    }

    //match greedy starts
    if (globSegments[0] === '**') {
       segments = segments.slice(indexOf(segments, globSegments[1]));
       segments.unshift('**');
    }
    //match greedy ends
    if (globSegments[globSegments.length - 1] === '**') {
       segments.splice(indexOf(segments, globSegments[globSegments.length - 2]) + 1, Number.MAX_VALUE);
       segments.push('**');
    }

    if (globSegments.length != segments.length) {
      return false;
    }

    return segments.join('') === globSegments.join('');
  }


  // Implicit root state that is always active
  root = registerState({
    name: '',
    url: '^',
    views: null,
    'abstract': true
  });
  root.navigable = null;


  /**
   * @ngdoc function
   * @name ui.router.state.$stateProvider#decorator
   * @methodOf ui.router.state.$stateProvider
   *
   * @description
   * Allows you to extend (carefully) or override (at your own peril) the 
   * `stateBuilder` object used internally by `$stateProvider`. This can be used 
   * to add custom functionality to ui-router, for example inferring templateUrl 
   * based on the state name.
   *
   * When passing only a name, it returns the current (original or decorated) builder
   * function that matches `name`.
   *
   * The builder functions that can be decorated are listed below. Though not all
   * necessarily have a good use case for decoration, that is up to you to decide.
   *
   * In addition, users can attach custom decorators, which will generate new 
   * properties within the state's internal definition. There is currently no clear 
   * use-case for this beyond accessing internal states (i.e. $state.$current), 
   * however, expect this to become increasingly relevant as we introduce additional 
   * meta-programming features.
   *
   * **Warning**: Decorators should not be interdependent because the order of 
   * execution of the builder functions in non-deterministic. Builder functions 
   * should only be dependent on the state definition object and super function.
   *
   *
   * Existing builder functions and current return values:
   *
   * - **parent** `{object}` - returns the parent state object.
   * - **data** `{object}` - returns state data, including any inherited data that is not
   *   overridden by own values (if any).
   * - **url** `{object}` - returns a {@link ui.router.util.type:UrlMatcher UrlMatcher}
   *   or `null`.
   * - **navigable** `{object}` - returns closest ancestor state that has a URL (aka is 
   *   navigable).
   * - **params** `{object}` - returns an array of state params that are ensured to 
   *   be a super-set of parent's params.
   * - **views** `{object}` - returns a views object where each key is an absolute view 
   *   name (i.e. "viewName@stateName") and each value is the config object 
   *   (template, controller) for the view. Even when you don't use the views object 
   *   explicitly on a state config, one is still created for you internally.
   *   So by decorating this builder function you have access to decorating template 
   *   and controller properties.
   * - **ownParams** `{object}` - returns an array of params that belong to the state, 
   *   not including any params defined by ancestor states.
   * - **path** `{string}` - returns the full path from the root down to this state. 
   *   Needed for state activation.
   * - **includes** `{object}` - returns an object that includes every state that 
   *   would pass a `$state.includes()` test.
   *
   * @example
   * <pre>
   * // Override the internal 'views' builder with a function that takes the state
   * // definition, and a reference to the internal function being overridden:
   * $stateProvider.decorator('views', function (state, parent) {
   *   var result = {},
   *       views = parent(state);
   *
   *   angular.forEach(views, function (config, name) {
   *     var autoName = (state.name + '.' + name).replace('.', '/');
   *     config.templateUrl = config.templateUrl || '/partials/' + autoName + '.html';
   *     result[name] = config;
   *   });
   *   return result;
   * });
   *
   * $stateProvider.state('home', {
   *   views: {
   *     'contact.list': { controller: 'ListController' },
   *     'contact.item': { controller: 'ItemController' }
   *   }
   * });
   *
   * // ...
   *
   * $state.go('home');
   * // Auto-populates list and item views with /partials/home/contact/list.html,
   * // and /partials/home/contact/item.html, respectively.
   * </pre>
   *
   * @param {string} name The name of the builder function to decorate. 
   * @param {object} func A function that is responsible for decorating the original 
   * builder function. The function receives two parameters:
   *
   *   - `{object}` - state - The state config object.
   *   - `{object}` - super - The original builder function.
   *
   * @return {object} $stateProvider - $stateProvider instance
   */
  this.decorator = decorator;
  function decorator(name, func) {
    /*jshint validthis: true */
    if (isString(name) && !isDefined(func)) {
      return stateBuilder[name];
    }
    if (!isFunction(func) || !isString(name)) {
      return this;
    }
    if (stateBuilder[name] && !stateBuilder.$delegates[name]) {
      stateBuilder.$delegates[name] = stateBuilder[name];
    }
    stateBuilder[name] = func;
    return this;
  }

  /**
   * @ngdoc function
   * @name ui.router.state.$stateProvider#state
   * @methodOf ui.router.state.$stateProvider
   *
   * @description
   * Registers a state configuration under a given state name. The stateConfig object
   * has the following acceptable properties.
   *
   * @param {string} name A unique state name, e.g. "home", "about", "contacts".
   * To create a parent/child state use a dot, e.g. "about.sales", "home.newest".
   * @param {object} stateConfig State configuration object.
   * @param {string|function=} stateConfig.template
   * <a id='template'></a>
   *   html template as a string or a function that returns
   *   an html template as a string which should be used by the uiView directives. This property 
   *   takes precedence over templateUrl.
   *   
   *   If `template` is a function, it will be called with the following parameters:
   *
   *   - {array.&lt;object&gt;} - state parameters extracted from the current $location.path() by
   *     applying the current state
   *
   * <pre>template:
   *   "<h1>inline template definition</h1>" +
   *   "<div ui-view></div>"</pre>
   * <pre>template: function(params) {
   *       return "<h1>generated template</h1>"; }</pre>
   * </div>
   *
   * @param {string|function=} stateConfig.templateUrl
   * <a id='templateUrl'></a>
   *
   *   path or function that returns a path to an html
   *   template that should be used by uiView.
   *   
   *   If `templateUrl` is a function, it will be called with the following parameters:
   *
   *   - {array.&lt;object&gt;} - state parameters extracted from the current $location.path() by 
   *     applying the current state
   *
   * <pre>templateUrl: "home.html"</pre>
   * <pre>templateUrl: function(params) {
   *     return myTemplates[params.pageId]; }</pre>
   *
   * @param {function=} stateConfig.templateProvider
   * <a id='templateProvider'></a>
   *    Provider function that returns HTML content string.
   * <pre> templateProvider:
   *       function(MyTemplateService, params) {
   *         return MyTemplateService.getTemplate(params.pageId);
   *       }</pre>
   *
   * @param {string|function=} stateConfig.controller
   * <a id='controller'></a>
   *
   *  Controller fn that should be associated with newly
   *   related scope or the name of a registered controller if passed as a string.
   *   Optionally, the ControllerAs may be declared here.
   * <pre>controller: "MyRegisteredController"</pre>
   * <pre>controller:
   *     "MyRegisteredController as fooCtrl"}</pre>
   * <pre>controller: function($scope, MyService) {
   *     $scope.data = MyService.getData(); }</pre>
   *
   * @param {function=} stateConfig.controllerProvider
   * <a id='controllerProvider'></a>
   *
   * Injectable provider function that returns the actual controller or string.
   * <pre>controllerProvider:
   *   function(MyResolveData) {
   *     if (MyResolveData.foo)
   *       return "FooCtrl"
   *     else if (MyResolveData.bar)
   *       return "BarCtrl";
   *     else return function($scope) {
   *       $scope.baz = "Qux";
   *     }
   *   }</pre>
   *
   * @param {string=} stateConfig.controllerAs
   * <a id='controllerAs'></a>
   * 
   * A controller alias name. If present the controller will be
   *   published to scope under the controllerAs name.
   * <pre>controllerAs: "myCtrl"</pre>
   *
   * @param {string|object=} stateConfig.parent
   * <a id='parent'></a>
   * Optionally specifies the parent state of this state.
   *
   * <pre>parent: 'parentState'</pre>
   * <pre>parent: parentState // JS variable</pre>
   *
   * @param {object=} stateConfig.resolve
   * <a id='resolve'></a>
   *
   * An optional map&lt;string, function&gt; of dependencies which
   *   should be injected into the controller. If any of these dependencies are promises, 
   *   the router will wait for them all to be resolved before the controller is instantiated.
   *   If all the promises are resolved successfully, the $stateChangeSuccess event is fired
   *   and the values of the resolved promises are injected into any controllers that reference them.
   *   If any  of the promises are rejected the $stateChangeError event is fired.
   *
   *   The map object is:
   *   
   *   - key - {string}: name of dependency to be injected into controller
   *   - factory - {string|function}: If string then it is alias for service. Otherwise if function, 
   *     it is injected and return value it treated as dependency. If result is a promise, it is 
   *     resolved before its value is injected into controller.
   *
   * <pre>resolve: {
   *     myResolve1:
   *       function($http, $stateParams) {
   *         return $http.get("/api/foos/"+stateParams.fooID);
   *       }
   *     }</pre>
   *
   * @param {string=} stateConfig.url
   * <a id='url'></a>
   *
   *   A url fragment with optional parameters. When a state is navigated or
   *   transitioned to, the `$stateParams` service will be populated with any 
   *   parameters that were passed.
   *
   *   (See {@link ui.router.util.type:UrlMatcher UrlMatcher} `UrlMatcher`} for
   *   more details on acceptable patterns )
   *
   * examples:
   * <pre>url: "/home"
   * url: "/users/:userid"
   * url: "/books/{bookid:[a-zA-Z_-]}"
   * url: "/books/{categoryid:int}"
   * url: "/books/{publishername:string}/{categoryid:int}"
   * url: "/messages?before&after"
   * url: "/messages?{before:date}&{after:date}"
   * url: "/messages/:mailboxid?{before:date}&{after:date}"
   * </pre>
   *
   * @param {object=} stateConfig.views
   * <a id='views'></a>
   * an optional map&lt;string, object&gt; which defined multiple views, or targets views
   * manually/explicitly.
   *
   * Examples:
   *
   * Targets three named `ui-view`s in the parent state's template
   * <pre>views: {
   *     header: {
   *       controller: "headerCtrl",
   *       templateUrl: "header.html"
   *     }, body: {
   *       controller: "bodyCtrl",
   *       templateUrl: "body.html"
   *     }, footer: {
   *       controller: "footCtrl",
   *       templateUrl: "footer.html"
   *     }
   *   }</pre>
   *
   * Targets named `ui-view="header"` from grandparent state 'top''s template, and named `ui-view="body" from parent state's template.
   * <pre>views: {
   *     'header@top': {
   *       controller: "msgHeaderCtrl",
   *       templateUrl: "msgHeader.html"
   *     }, 'body': {
   *       controller: "messagesCtrl",
   *       templateUrl: "messages.html"
   *     }
   *   }</pre>
   *
   * @param {boolean=} [stateConfig.abstract=false]
   * <a id='abstract'></a>
   * An abstract state will never be directly activated,
   *   but can provide inherited properties to its common children states.
   * <pre>abstract: true</pre>
   *
   * @param {function=} stateConfig.onEnter
   * <a id='onEnter'></a>
   *
   * Callback function for when a state is entered. Good way
   *   to trigger an action or dispatch an event, such as opening a dialog.
   * If minifying your scripts, make sure to explicitly annotate this function,
   * because it won't be automatically annotated by your build tools.
   *
   * <pre>onEnter: function(MyService, $stateParams) {
   *     MyService.foo($stateParams.myParam);
   * }</pre>
   *
   * @param {function=} stateConfig.onExit
   * <a id='onExit'></a>
   *
   * Callback function for when a state is exited. Good way to
   *   trigger an action or dispatch an event, such as opening a dialog.
   * If minifying your scripts, make sure to explicitly annotate this function,
   * because it won't be automatically annotated by your build tools.
   *
   * <pre>onExit: function(MyService, $stateParams) {
   *     MyService.cleanup($stateParams.myParam);
   * }</pre>
   *
   * @param {boolean=} [stateConfig.reloadOnSearch=true]
   * <a id='reloadOnSearch'></a>
   *
   * If `false`, will not retrigger the same state
   *   just because a search/query parameter has changed (via $location.search() or $location.hash()). 
   *   Useful for when you'd like to modify $location.search() without triggering a reload.
   * <pre>reloadOnSearch: false</pre>
   *
   * @param {object=} stateConfig.data
   * <a id='data'></a>
   *
   * Arbitrary data object, useful for custom configuration.  The parent state's `data` is
   *   prototypally inherited.  In other words, adding a data property to a state adds it to
   *   the entire subtree via prototypal inheritance.
   *
   * <pre>data: {
   *     requiredRole: 'foo'
   * } </pre>
   *
   * @param {object=} stateConfig.params
   * <a id='params'></a>
   *
   * A map which optionally configures parameters declared in the `url`, or
   *   defines additional non-url parameters.  For each parameter being
   *   configured, add a configuration object keyed to the name of the parameter.
   *
   *   Each parameter configuration object may contain the following properties:
   *
   *   - ** value ** - {object|function=}: specifies the default value for this
   *     parameter.  This implicitly sets this parameter as optional.
   *
   *     When UI-Router routes to a state and no value is
   *     specified for this parameter in the URL or transition, the
   *     default value will be used instead.  If `value` is a function,
   *     it will be injected and invoked, and the return value used.
   *
   *     *Note*: `undefined` is treated as "no default value" while `null`
   *     is treated as "the default value is `null`".
   *
   *     *Shorthand*: If you only need to configure the default value of the
   *     parameter, you may use a shorthand syntax.   In the **`params`**
   *     map, instead mapping the param name to a full parameter configuration
   *     object, simply set map it to the default parameter value, e.g.:
   *
   * <pre>// define a parameter's default value
   * params: {
   *     param1: { value: "defaultValue" }
   * }
   * // shorthand default values
   * params: {
   *     param1: "defaultValue",
   *     param2: "param2Default"
   * }</pre>
   *
   *   - ** array ** - {boolean=}: *(default: false)* If true, the param value will be
   *     treated as an array of values.  If you specified a Type, the value will be
   *     treated as an array of the specified Type.  Note: query parameter values
   *     default to a special `"auto"` mode.
   *
   *     For query parameters in `"auto"` mode, if multiple  values for a single parameter
   *     are present in the URL (e.g.: `/foo?bar=1&bar=2&bar=3`) then the values
   *     are mapped to an array (e.g.: `{ foo: [ '1', '2', '3' ] }`).  However, if
   *     only one value is present (e.g.: `/foo?bar=1`) then the value is treated as single
   *     value (e.g.: `{ foo: '1' }`).
   *
   * <pre>params: {
   *     param1: { array: true }
   * }</pre>
   *
   *   - ** squash ** - {bool|string=}: `squash` configures how a default parameter value is represented in the URL when
   *     the current parameter value is the same as the default value. If `squash` is not set, it uses the
   *     configured default squash policy.
   *     (See {@link ui.router.util.$urlMatcherFactory#methods_defaultSquashPolicy `defaultSquashPolicy()`})
   *
   *   There are three squash settings:
   *
   *     - false: The parameter's default value is not squashed.  It is encoded and included in the URL
   *     - true: The parameter's default value is omitted from the URL.  If the parameter is preceeded and followed
   *       by slashes in the state's `url` declaration, then one of those slashes are omitted.
   *       This can allow for cleaner looking URLs.
   *     - `"<arbitrary string>"`: The parameter's default value is replaced with an arbitrary placeholder of  your choice.
   *
   * <pre>params: {
   *     param1: {
   *       value: "defaultId",
   *       squash: true
   * } }
   * // squash "defaultValue" to "~"
   * params: {
   *     param1: {
   *       value: "defaultValue",
   *       squash: "~"
   * } }
   * </pre>
   *
   *
   * @example
   * <pre>
   * // Some state name examples
   *
   * // stateName can be a single top-level name (must be unique).
   * $stateProvider.state("home", {});
   *
   * // Or it can be a nested state name. This state is a child of the
   * // above "home" state.
   * $stateProvider.state("home.newest", {});
   *
   * // Nest states as deeply as needed.
   * $stateProvider.state("home.newest.abc.xyz.inception", {});
   *
   * // state() returns $stateProvider, so you can chain state declarations.
   * $stateProvider
   *   .state("home", {})
   *   .state("about", {})
   *   .state("contacts", {});
   * </pre>
   *
   */
  this.state = state;
  function state(name, definition) {
    /*jshint validthis: true */
    if (isObject(name)) definition = name;
    else definition.name = name;
    registerState(definition);
    return this;
  }

  /**
   * @ngdoc object
   * @name ui.router.state.$state
   *
   * @requires $rootScope
   * @requires $q
   * @requires ui.router.state.$view
   * @requires $injector
   * @requires ui.router.util.$resolve
   * @requires ui.router.state.$stateParams
   * @requires ui.router.router.$urlRouter
   *
   * @property {object} params A param object, e.g. {sectionId: section.id)}, that 
   * you'd like to test against the current active state.
   * @property {object} current A reference to the state's config object. However 
   * you passed it in. Useful for accessing custom data.
   * @property {object} transition Currently pending transition. A promise that'll 
   * resolve or reject.
   *
   * @description
   * `$state` service is responsible for representing states as well as transitioning
   * between them. It also provides interfaces to ask for current state or even states
   * you're coming from.
   */
  this.$get = $get;
  $get.$inject = ['$rootScope', '$q', '$view', '$injector', '$resolve', '$stateParams', '$urlRouter', '$location', '$urlMatcherFactory'];
  function $get(   $rootScope,   $q,   $view,   $injector,   $resolve,   $stateParams,   $urlRouter,   $location,   $urlMatcherFactory) {

    var TransitionSupersededError = new Error('transition superseded');

    var TransitionSuperseded = silenceUncaughtInPromise($q.reject(TransitionSupersededError));
    var TransitionPrevented = silenceUncaughtInPromise($q.reject(new Error('transition prevented')));
    var TransitionAborted = silenceUncaughtInPromise($q.reject(new Error('transition aborted')));
    var TransitionFailed = silenceUncaughtInPromise($q.reject(new Error('transition failed')));

    // Handles the case where a state which is the target of a transition is not found, and the user
    // can optionally retry or defer the transition
    function handleRedirect(redirect, state, params, options) {
      /**
       * @ngdoc event
       * @name ui.router.state.$state#$stateNotFound
       * @eventOf ui.router.state.$state
       * @eventType broadcast on root scope
       * @description
       * Fired when a requested state **cannot be found** using the provided state name during transition.
       * The event is broadcast allowing any handlers a single chance to deal with the error (usually by
       * lazy-loading the unfound state). A special `unfoundState` object is passed to the listener handler,
       * you can see its three properties in the example. You can use `event.preventDefault()` to abort the
       * transition and the promise returned from `go` will be rejected with a `'transition aborted'` value.
       *
       * @param {Object} event Event object.
       * @param {Object} unfoundState Unfound State information. Contains: `to, toParams, options` properties.
       * @param {State} fromState Current state object.
       * @param {Object} fromParams Current state params.
       *
       * @example
       *
       * <pre>
       * // somewhere, assume lazy.state has not been defined
       * $state.go("lazy.state", {a:1, b:2}, {inherit:false});
       *
       * // somewhere else
       * $scope.$on('$stateNotFound',
       * function(event, unfoundState, fromState, fromParams){
       *     console.log(unfoundState.to); // "lazy.state"
       *     console.log(unfoundState.toParams); // {a:1, b:2}
       *     console.log(unfoundState.options); // {inherit:false} + default options
       * })
       * </pre>
       */
      var evt = $rootScope.$broadcast('$stateNotFound', redirect, state, params);

      if (evt.defaultPrevented) {
        $urlRouter.update();
        return TransitionAborted;
      }

      if (!evt.retry) {
        return null;
      }

      // Allow the handler to return a promise to defer state lookup retry
      if (options.$retry) {
        $urlRouter.update();
        return TransitionFailed;
      }
      var retryTransition = $state.transition = $q.when(evt.retry);

      retryTransition.then(function() {
        if (retryTransition !== $state.transition) {
          $rootScope.$broadcast('$stateChangeCancel', redirect.to, redirect.toParams, state, params);
          return TransitionSuperseded;
        }
        redirect.options.$retry = true;
        return $state.transitionTo(redirect.to, redirect.toParams, redirect.options);
      }, function() {
        return TransitionAborted;
      });
      $urlRouter.update();

      return retryTransition;
    }

    root.locals = { resolve: null, globals: { $stateParams: {} } };

    $state = {
      params: {},
      current: root.self,
      $current: root,
      transition: null
    };

    /**
     * @ngdoc function
     * @name ui.router.state.$state#reload
     * @methodOf ui.router.state.$state
     *
     * @description
     * A method that force reloads the current state. All resolves are re-resolved,
     * controllers reinstantiated, and events re-fired.
     *
     * @example
     * <pre>
     * var app angular.module('app', ['ui.router']);
     *
     * app.controller('ctrl', function ($scope, $state) {
     *   $scope.reload = function(){
     *     $state.reload();
     *   }
     * });
     * </pre>
     *
     * `reload()` is just an alias for:
     * <pre>
     * $state.transitionTo($state.current, $stateParams, { 
     *   reload: true, inherit: false, notify: true
     * });
     * </pre>
     *
     * @param {string=|object=} state - A state name or a state object, which is the root of the resolves to be re-resolved.
     * @example
     * <pre>
     * //assuming app application consists of 3 states: 'contacts', 'contacts.detail', 'contacts.detail.item' 
     * //and current state is 'contacts.detail.item'
     * var app angular.module('app', ['ui.router']);
     *
     * app.controller('ctrl', function ($scope, $state) {
     *   $scope.reload = function(){
     *     //will reload 'contact.detail' and 'contact.detail.item' states
     *     $state.reload('contact.detail');
     *   }
     * });
     * </pre>
     *
     * `reload()` is just an alias for:
     * <pre>
     * $state.transitionTo($state.current, $stateParams, { 
     *   reload: true, inherit: false, notify: true
     * });
     * </pre>

     * @returns {promise} A promise representing the state of the new transition. See
     * {@link ui.router.state.$state#methods_go $state.go}.
     */
    $state.reload = function reload(state) {
      return $state.transitionTo($state.current, $stateParams, { reload: state || true, inherit: false, notify: true});
    };

    /**
     * @ngdoc function
     * @name ui.router.state.$state#go
     * @methodOf ui.router.state.$state
     *
     * @description
     * Convenience method for transitioning to a new state. `$state.go` calls 
     * `$state.transitionTo` internally but automatically sets options to 
     * `{ location: true, inherit: true, relative: $state.$current, notify: true }`. 
     * This allows you to easily use an absolute or relative to path and specify 
     * only the parameters you'd like to update (while letting unspecified parameters 
     * inherit from the currently active ancestor states).
     *
     * @example
     * <pre>
     * var app = angular.module('app', ['ui.router']);
     *
     * app.controller('ctrl', function ($scope, $state) {
     *   $scope.changeState = function () {
     *     $state.go('contact.detail');
     *   };
     * });
     * </pre>
     * <img src='../ngdoc_assets/StateGoExamples.png'/>
     *
     * @param {string} to Absolute state name or relative state path. Some examples:
     *
     * - `$state.go('contact.detail')` - will go to the `contact.detail` state
     * - `$state.go('^')` - will go to a parent state
     * - `$state.go('^.sibling')` - will go to a sibling state
     * - `$state.go('.child.grandchild')` - will go to grandchild state
     *
     * @param {object=} params A map of the parameters that will be sent to the state, 
     * will populate $stateParams. Any parameters that are not specified will be inherited from currently 
     * defined parameters. Only parameters specified in the state definition can be overridden, new 
     * parameters will be ignored. This allows, for example, going to a sibling state that shares parameters
     * specified in a parent state. Parameter inheritance only works between common ancestor states, I.e.
     * transitioning to a sibling will get you the parameters for all parents, transitioning to a child
     * will get you all current parameters, etc.
     * @param {object=} options Options object. The options are:
     *
     * - **`location`** - {boolean=true|string=} - If `true` will update the url in the location bar, if `false`
     *    will not. If string, must be `"replace"`, which will update url and also replace last history record.
     * - **`inherit`** - {boolean=true}, If `true` will inherit url parameters from current url.
     * - **`relative`** - {object=$state.$current}, When transitioning with relative path (e.g '^'), 
     *    defines which state to be relative from.
     * - **`notify`** - {boolean=true}, If `true` will broadcast $stateChangeStart and $stateChangeSuccess events.
     * - **`reload`** (v0.2.5) - {boolean=false|string|object}, If `true` will force transition even if no state or params
     *    have changed.  It will reload the resolves and views of the current state and parent states.
     *    If `reload` is a string (or state object), the state object is fetched (by name, or object reference); and \
     *    the transition reloads the resolves and views for that matched state, and all its children states.
     *
     * @returns {promise} A promise representing the state of the new transition.
     *
     * Possible success values:
     *
     * - $state.current
     *
     * <br/>Possible rejection values:
     *
     * - 'transition superseded' - when a newer transition has been started after this one
     * - 'transition prevented' - when `event.preventDefault()` has been called in a `$stateChangeStart` listener
     * - 'transition aborted' - when `event.preventDefault()` has been called in a `$stateNotFound` listener or
     *   when a `$stateNotFound` `event.retry` promise errors.
     * - 'transition failed' - when a state has been unsuccessfully found after 2 tries.
     * - *resolve error* - when an error has occurred with a `resolve`
     *
     */
    $state.go = function go(to, params, options) {
      return $state.transitionTo(to, params, extend({ inherit: true, relative: $state.$current }, options));
    };

    /**
     * @ngdoc function
     * @name ui.router.state.$state#transitionTo
     * @methodOf ui.router.state.$state
     *
     * @description
     * Low-level method for transitioning to a new state. {@link ui.router.state.$state#methods_go $state.go}
     * uses `transitionTo` internally. `$state.go` is recommended in most situations.
     *
     * @example
     * <pre>
     * var app = angular.module('app', ['ui.router']);
     *
     * app.controller('ctrl', function ($scope, $state) {
     *   $scope.changeState = function () {
     *     $state.transitionTo('contact.detail');
     *   };
     * });
     * </pre>
     *
     * @param {string} to State name.
     * @param {object=} toParams A map of the parameters that will be sent to the state,
     * will populate $stateParams.
     * @param {object=} options Options object. The options are:
     *
     * - **`location`** - {boolean=true|string=} - If `true` will update the url in the location bar, if `false`
     *    will not. If string, must be `"replace"`, which will update url and also replace last history record.
     * - **`inherit`** - {boolean=false}, If `true` will inherit url parameters from current url.
     * - **`relative`** - {object=}, When transitioning with relative path (e.g '^'), 
     *    defines which state to be relative from.
     * - **`notify`** - {boolean=true}, If `true` will broadcast $stateChangeStart and $stateChangeSuccess events.
     * - **`reload`** (v0.2.5) - {boolean=false|string=|object=}, If `true` will force transition even if the state or params 
     *    have not changed, aka a reload of the same state. It differs from reloadOnSearch because you'd
     *    use this when you want to force a reload when *everything* is the same, including search params.
     *    if String, then will reload the state with the name given in reload, and any children.
     *    if Object, then a stateObj is expected, will reload the state found in stateObj, and any children.
     *
     * @returns {promise} A promise representing the state of the new transition. See
     * {@link ui.router.state.$state#methods_go $state.go}.
     */
    $state.transitionTo = function transitionTo(to, toParams, options) {
      toParams = toParams || {};
      options = extend({
        location: true, inherit: false, relative: null, notify: true, reload: false, $retry: false
      }, options || {});

      var from = $state.$current, fromParams = $state.params, fromPath = from.path;
      var evt, toState = findState(to, options.relative);

      // Store the hash param for later (since it will be stripped out by various methods)
      var hash = toParams['#'];

      if (!isDefined(toState)) {
        var redirect = { to: to, toParams: toParams, options: options };
        var redirectResult = handleRedirect(redirect, from.self, fromParams, options);

        if (redirectResult) {
          return redirectResult;
        }

        // Always retry once if the $stateNotFound was not prevented
        // (handles either redirect changed or state lazy-definition)
        to = redirect.to;
        toParams = redirect.toParams;
        options = redirect.options;
        toState = findState(to, options.relative);

        if (!isDefined(toState)) {
          if (!options.relative) throw new Error("No such state '" + to + "'");
          throw new Error("Could not resolve '" + to + "' from state '" + options.relative + "'");
        }
      }
      if (toState[abstractKey]) throw new Error("Cannot transition to abstract state '" + to + "'");
      if (options.inherit) toParams = inheritParams($stateParams, toParams || {}, $state.$current, toState);
      if (!toState.params.$$validates(toParams)) return TransitionFailed;

      toParams = toState.params.$$values(toParams);
      to = toState;

      var toPath = to.path;

      // Starting from the root of the path, keep all levels that haven't changed
      var keep = 0, state = toPath[keep], locals = root.locals, toLocals = [];

      if (!options.reload) {
        while (state && state === fromPath[keep] && state.ownParams.$$equals(toParams, fromParams)) {
          locals = toLocals[keep] = state.locals;
          keep++;
          state = toPath[keep];
        }
      } else if (isString(options.reload) || isObject(options.reload)) {
        if (isObject(options.reload) && !options.reload.name) {
          throw new Error('Invalid reload state object');
        }
        
        var reloadState = options.reload === true ? fromPath[0] : findState(options.reload);
        if (options.reload && !reloadState) {
          throw new Error("No such reload state '" + (isString(options.reload) ? options.reload : options.reload.name) + "'");
        }

        while (state && state === fromPath[keep] && state !== reloadState) {
          locals = toLocals[keep] = state.locals;
          keep++;
          state = toPath[keep];
        }
      }

      // If we're going to the same state and all locals are kept, we've got nothing to do.
      // But clear 'transition', as we still want to cancel any other pending transitions.
      // TODO: We may not want to bump 'transition' if we're called from a location change
      // that we've initiated ourselves, because we might accidentally abort a legitimate
      // transition initiated from code?
      if (shouldSkipReload(to, toParams, from, fromParams, locals, options)) {
        if (hash) toParams['#'] = hash;
        $state.params = toParams;
        copy($state.params, $stateParams);
        copy(filterByKeys(to.params.$$keys(), $stateParams), to.locals.globals.$stateParams);
        if (options.location && to.navigable && to.navigable.url) {
          $urlRouter.push(to.navigable.url, toParams, {
            $$avoidResync: true, replace: options.location === 'replace'
          });
          $urlRouter.update(true);
        }
        $state.transition = null;
        return $q.when($state.current);
      }

      // Filter parameters before we pass them to event handlers etc.
      toParams = filterByKeys(to.params.$$keys(), toParams || {});
      
      // Re-add the saved hash before we start returning things or broadcasting $stateChangeStart
      if (hash) toParams['#'] = hash;
      
      // Broadcast start event and cancel the transition if requested
      if (options.notify) {
        /**
         * @ngdoc event
         * @name ui.router.state.$state#$stateChangeStart
         * @eventOf ui.router.state.$state
         * @eventType broadcast on root scope
         * @description
         * Fired when the state transition **begins**. You can use `event.preventDefault()`
         * to prevent the transition from happening and then the transition promise will be
         * rejected with a `'transition prevented'` value.
         *
         * @param {Object} event Event object.
         * @param {State} toState The state being transitioned to.
         * @param {Object} toParams The params supplied to the `toState`.
         * @param {State} fromState The current state, pre-transition.
         * @param {Object} fromParams The params supplied to the `fromState`.
         *
         * @example
         *
         * <pre>
         * $rootScope.$on('$stateChangeStart',
         * function(event, toState, toParams, fromState, fromParams){
         *     event.preventDefault();
         *     // transitionTo() promise will be rejected with
         *     // a 'transition prevented' error
         * })
         * </pre>
         */
        if ($rootScope.$broadcast('$stateChangeStart', to.self, toParams, from.self, fromParams, options).defaultPrevented) {
          $rootScope.$broadcast('$stateChangeCancel', to.self, toParams, from.self, fromParams);
          //Don't update and resync url if there's been a new transition started. see issue #2238, #600
          if ($state.transition == null) $urlRouter.update();
          return TransitionPrevented;
        }
      }

      // Resolve locals for the remaining states, but don't update any global state just
      // yet -- if anything fails to resolve the current state needs to remain untouched.
      // We also set up an inheritance chain for the locals here. This allows the view directive
      // to quickly look up the correct definition for each view in the current state. Even
      // though we create the locals object itself outside resolveState(), it is initially
      // empty and gets filled asynchronously. We need to keep track of the promise for the
      // (fully resolved) current locals, and pass this down the chain.
      var resolved = $q.when(locals);

      for (var l = keep; l < toPath.length; l++, state = toPath[l]) {
        locals = toLocals[l] = inherit(locals);
        resolved = resolveState(state, toParams, state === to, resolved, locals, options);
      }

      // Once everything is resolved, we are ready to perform the actual transition
      // and return a promise for the new state. We also keep track of what the
      // current promise is, so that we can detect overlapping transitions and
      // keep only the outcome of the last transition.
      var transition = $state.transition = resolved.then(function () {
        var l, entering, exiting;

        if ($state.transition !== transition) {
          $rootScope.$broadcast('$stateChangeCancel', to.self, toParams, from.self, fromParams);
          return TransitionSuperseded;
        }

        // Exit 'from' states not kept
        for (l = fromPath.length - 1; l >= keep; l--) {
          exiting = fromPath[l];
          if (exiting.self.onExit) {
            $injector.invoke(exiting.self.onExit, exiting.self, exiting.locals.globals);
          }
          exiting.locals = null;
        }

        // Enter 'to' states not kept
        for (l = keep; l < toPath.length; l++) {
          entering = toPath[l];
          entering.locals = toLocals[l];
          if (entering.self.onEnter) {
            $injector.invoke(entering.self.onEnter, entering.self, entering.locals.globals);
          }
        }

        // Run it again, to catch any transitions in callbacks
        if ($state.transition !== transition) {
          $rootScope.$broadcast('$stateChangeCancel', to.self, toParams, from.self, fromParams);
          return TransitionSuperseded;
        }

        // Update globals in $state
        $state.$current = to;
        $state.current = to.self;
        $state.params = toParams;
        copy($state.params, $stateParams);
        $state.transition = null;

        if (options.location && to.navigable) {
          $urlRouter.push(to.navigable.url, to.navigable.locals.globals.$stateParams, {
            $$avoidResync: true, replace: options.location === 'replace'
          });
        }

        if (options.notify) {
        /**
         * @ngdoc event
         * @name ui.router.state.$state#$stateChangeSuccess
         * @eventOf ui.router.state.$state
         * @eventType broadcast on root scope
         * @description
         * Fired once the state transition is **complete**.
         *
         * @param {Object} event Event object.
         * @param {State} toState The state being transitioned to.
         * @param {Object} toParams The params supplied to the `toState`.
         * @param {State} fromState The current state, pre-transition.
         * @param {Object} fromParams The params supplied to the `fromState`.
         */
          $rootScope.$broadcast('$stateChangeSuccess', to.self, toParams, from.self, fromParams);
        }
        $urlRouter.update(true);

        return $state.current;
      }).then(null, function (error) {
        // propagate TransitionSuperseded error without emitting $stateChangeCancel
        // as it was already emitted in the success handler above
        if (error === TransitionSupersededError) return TransitionSuperseded;

        if ($state.transition !== transition) {
          $rootScope.$broadcast('$stateChangeCancel', to.self, toParams, from.self, fromParams);
          return TransitionSuperseded;
        }

        $state.transition = null;
        /**
         * @ngdoc event
         * @name ui.router.state.$state#$stateChangeError
         * @eventOf ui.router.state.$state
         * @eventType broadcast on root scope
         * @description
         * Fired when an **error occurs** during transition. It's important to note that if you
         * have any errors in your resolve functions (javascript errors, non-existent services, etc)
         * they will not throw traditionally. You must listen for this $stateChangeError event to
         * catch **ALL** errors.
         *
         * @param {Object} event Event object.
         * @param {State} toState The state being transitioned to.
         * @param {Object} toParams The params supplied to the `toState`.
         * @param {State} fromState The current state, pre-transition.
         * @param {Object} fromParams The params supplied to the `fromState`.
         * @param {Error} error The resolve error object.
         */
        evt = $rootScope.$broadcast('$stateChangeError', to.self, toParams, from.self, fromParams, error);

        if (!evt.defaultPrevented) {
          $urlRouter.update();
        }

        return $q.reject(error);
      });

      silenceUncaughtInPromise(transition);
      return transition;
    };

    /**
     * @ngdoc function
     * @name ui.router.state.$state#is
     * @methodOf ui.router.state.$state
     *
     * @description
     * Similar to {@link ui.router.state.$state#methods_includes $state.includes},
     * but only checks for the full state name. If params is supplied then it will be
     * tested for strict equality against the current active params object, so all params
     * must match with none missing and no extras.
     *
     * @example
     * <pre>
     * $state.$current.name = 'contacts.details.item';
     *
     * // absolute name
     * $state.is('contact.details.item'); // returns true
     * $state.is(contactDetailItemStateObject); // returns true
     *
     * // relative name (. and ^), typically from a template
     * // E.g. from the 'contacts.details' template
     * <div ng-class="{highlighted: $state.is('.item')}">Item</div>
     * </pre>
     *
     * @param {string|object} stateOrName The state name (absolute or relative) or state object you'd like to check.
     * @param {object=} params A param object, e.g. `{sectionId: section.id}`, that you'd like
     * to test against the current active state.
     * @param {object=} options An options object.  The options are:
     *
     * - **`relative`** - {string|object} -  If `stateOrName` is a relative state name and `options.relative` is set, .is will
     * test relative to `options.relative` state (or name).
     *
     * @returns {boolean} Returns true if it is the state.
     */
    $state.is = function is(stateOrName, params, options) {
      options = extend({ relative: $state.$current }, options || {});
      var state = findState(stateOrName, options.relative);

      if (!isDefined(state)) { return undefined; }
      if ($state.$current !== state) { return false; }

      return !params || objectKeys(params).reduce(function(acc, key) {
        var paramDef = state.params[key];
        return acc && !paramDef || paramDef.type.equals($stateParams[key], params[key]);
      }, true);
    };

    /**
     * @ngdoc function
     * @name ui.router.state.$state#includes
     * @methodOf ui.router.state.$state
     *
     * @description
     * A method to determine if the current active state is equal to or is the child of the
     * state stateName. If any params are passed then they will be tested for a match as well.
     * Not all the parameters need to be passed, just the ones you'd like to test for equality.
     *
     * @example
     * Partial and relative names
     * <pre>
     * $state.$current.name = 'contacts.details.item';
     *
     * // Using partial names
     * $state.includes("contacts"); // returns true
     * $state.includes("contacts.details"); // returns true
     * $state.includes("contacts.details.item"); // returns true
     * $state.includes("contacts.list"); // returns false
     * $state.includes("about"); // returns false
     *
     * // Using relative names (. and ^), typically from a template
     * // E.g. from the 'contacts.details' template
     * <div ng-class="{highlighted: $state.includes('.item')}">Item</div>
     * </pre>
     *
     * Basic globbing patterns
     * <pre>
     * $state.$current.name = 'contacts.details.item.url';
     *
     * $state.includes("*.details.*.*"); // returns true
     * $state.includes("*.details.**"); // returns true
     * $state.includes("**.item.**"); // returns true
     * $state.includes("*.details.item.url"); // returns true
     * $state.includes("*.details.*.url"); // returns true
     * $state.includes("*.details.*"); // returns false
     * $state.includes("item.**"); // returns false
     * </pre>
     *
     * @param {string} stateOrName A partial name, relative name, or glob pattern
     * to be searched for within the current state name.
     * @param {object=} params A param object, e.g. `{sectionId: section.id}`,
     * that you'd like to test against the current active state.
     * @param {object=} options An options object.  The options are:
     *
     * - **`relative`** - {string|object=} -  If `stateOrName` is a relative state reference and `options.relative` is set,
     * .includes will test relative to `options.relative` state (or name).
     *
     * @returns {boolean} Returns true if it does include the state
     */
    $state.includes = function includes(stateOrName, params, options) {
      options = extend({ relative: $state.$current }, options || {});
      if (isString(stateOrName) && isGlob(stateOrName)) {
        if (!doesStateMatchGlob(stateOrName)) {
          return false;
        }
        stateOrName = $state.$current.name;
      }

      var state = findState(stateOrName, options.relative);
      if (!isDefined(state)) { return undefined; }
      if (!isDefined($state.$current.includes[state.name])) { return false; }
      if (!params) { return true; }

      var keys = objectKeys(params);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i], paramDef = state.params[key];
        if (paramDef && !paramDef.type.equals($stateParams[key], params[key])) {
          return false;
        }
      }

      return objectKeys(params).reduce(function(acc, key) {
        var paramDef = state.params[key];
        return acc && !paramDef || paramDef.type.equals($stateParams[key], params[key]);
      }, true);
    };


    /**
     * @ngdoc function
     * @name ui.router.state.$state#href
     * @methodOf ui.router.state.$state
     *
     * @description
     * A url generation method that returns the compiled url for the given state populated with the given params.
     *
     * @example
     * <pre>
     * expect($state.href("about.person", { person: "bob" })).toEqual("/about/bob");
     * </pre>
     *
     * @param {string|object} stateOrName The state name or state object you'd like to generate a url from.
     * @param {object=} params An object of parameter values to fill the state's required parameters.
     * @param {object=} options Options object. The options are:
     *
     * - **`lossy`** - {boolean=true} -  If true, and if there is no url associated with the state provided in the
     *    first parameter, then the constructed href url will be built from the first navigable ancestor (aka
     *    ancestor with a valid url).
     * - **`inherit`** - {boolean=true}, If `true` will inherit url parameters from current url.
     * - **`relative`** - {object=$state.$current}, When transitioning with relative path (e.g '^'), 
     *    defines which state to be relative from.
     * - **`absolute`** - {boolean=false},  If true will generate an absolute url, e.g. "http://www.example.com/fullurl".
     * 
     * @returns {string} compiled state url
     */
    $state.href = function href(stateOrName, params, options) {
      options = extend({
        lossy:    true,
        inherit:  true,
        absolute: false,
        relative: $state.$current
      }, options || {});

      var state = findState(stateOrName, options.relative);

      if (!isDefined(state)) return null;
      if (options.inherit) params = inheritParams($stateParams, params || {}, $state.$current, state);
      
      var nav = (state && options.lossy) ? state.navigable : state;

      if (!nav || nav.url === undefined || nav.url === null) {
        return null;
      }
      return $urlRouter.href(nav.url, filterByKeys(state.params.$$keys().concat('#'), params || {}), {
        absolute: options.absolute
      });
    };

    /**
     * @ngdoc function
     * @name ui.router.state.$state#get
     * @methodOf ui.router.state.$state
     *
     * @description
     * Returns the state configuration object for any specific state or all states.
     *
     * @param {string|object=} stateOrName (absolute or relative) If provided, will only get the config for
     * the requested state. If not provided, returns an array of ALL state configs.
     * @param {string|object=} context When stateOrName is a relative state reference, the state will be retrieved relative to context.
     * @returns {Object|Array} State configuration object or array of all objects.
     */
    $state.get = function (stateOrName, context) {
      if (arguments.length === 0) return map(objectKeys(states), function(name) { return states[name].self; });
      var state = findState(stateOrName, context || $state.$current);
      return (state && state.self) ? state.self : null;
    };

    function resolveState(state, params, paramsAreFiltered, inherited, dst, options) {
      // Make a restricted $stateParams with only the parameters that apply to this state if
      // necessary. In addition to being available to the controller and onEnter/onExit callbacks,
      // we also need $stateParams to be available for any $injector calls we make during the
      // dependency resolution process.
      var $stateParams = (paramsAreFiltered) ? params : filterByKeys(state.params.$$keys(), params);
      var locals = { $stateParams: $stateParams };

      // Resolve 'global' dependencies for the state, i.e. those not specific to a view.
      // We're also including $stateParams in this; that way the parameters are restricted
      // to the set that should be visible to the state, and are independent of when we update
      // the global $state and $stateParams values.
      dst.resolve = $resolve.resolve(state.resolve, locals, dst.resolve, state);
      var promises = [dst.resolve.then(function (globals) {
        dst.globals = globals;
      })];
      if (inherited) promises.push(inherited);

      function resolveViews() {
        var viewsPromises = [];

        // Resolve template and dependencies for all views.
        forEach(state.views, function (view, name) {
          var injectables = (view.resolve && view.resolve !== state.resolve ? view.resolve : {});
          injectables.$template = [ function () {
            return $view.load(name, { view: view, locals: dst.globals, params: $stateParams, notify: options.notify }) || '';
          }];

          viewsPromises.push($resolve.resolve(injectables, dst.globals, dst.resolve, state).then(function (result) {
            // References to the controller (only instantiated at link time)
            if (isFunction(view.controllerProvider) || isArray(view.controllerProvider)) {
              var injectLocals = angular.extend({}, injectables, dst.globals);
              result.$$controller = $injector.invoke(view.controllerProvider, null, injectLocals);
            } else {
              result.$$controller = view.controller;
            }
            // Provide access to the state itself for internal use
            result.$$state = state;
            result.$$controllerAs = view.controllerAs;
            result.$$resolveAs = view.resolveAs;
            dst[name] = result;
          }));
        });

        return $q.all(viewsPromises).then(function(){
          return dst.globals;
        });
      }

      // Wait for all the promises and then return the activation object
      return $q.all(promises).then(resolveViews).then(function (values) {
        return dst;
      });
    }

    return $state;
  }

  function shouldSkipReload(to, toParams, from, fromParams, locals, options) {
    // Return true if there are no differences in non-search (path/object) params, false if there are differences
    function nonSearchParamsEqual(fromAndToState, fromParams, toParams) {
      // Identify whether all the parameters that differ between `fromParams` and `toParams` were search params.
      function notSearchParam(key) {
        return fromAndToState.params[key].location != "search";
      }
      var nonQueryParamKeys = fromAndToState.params.$$keys().filter(notSearchParam);
      var nonQueryParams = pick.apply({}, [fromAndToState.params].concat(nonQueryParamKeys));
      var nonQueryParamSet = new $$UMFP.ParamSet(nonQueryParams);
      return nonQueryParamSet.$$equals(fromParams, toParams);
    }

    // If reload was not explicitly requested
    // and we're transitioning to the same state we're already in
    // and    the locals didn't change
    //     or they changed in a way that doesn't merit reloading
    //        (reloadOnParams:false, or reloadOnSearch.false and only search params changed)
    // Then return true.
    if (!options.reload && to === from &&
      (locals === from.locals || (to.self.reloadOnSearch === false && nonSearchParamsEqual(from, fromParams, toParams)))) {
      return true;
    }
  }
}

angular.module('ui.router.state')
  .factory('$stateParams', function () { return {}; })
  .constant("$state.runtime", { autoinject: true })
  .provider('$state', $StateProvider)
  // Inject $state to initialize when entering runtime. #2574
  .run(['$injector', function ($injector) {
    // Allow tests (stateSpec.js) to turn this off by defining this constant
    if ($injector.get("$state.runtime").autoinject) {
      $injector.get('$state');
    }
  }]);


$ViewProvider.$inject = [];
function $ViewProvider() {

  this.$get = $get;
  /**
   * @ngdoc object
   * @name ui.router.state.$view
   *
   * @requires ui.router.util.$templateFactory
   * @requires $rootScope
   *
   * @description
   *
   */
  $get.$inject = ['$rootScope', '$templateFactory'];
  function $get(   $rootScope,   $templateFactory) {
    return {
      // $view.load('full.viewName', { template: ..., controller: ..., resolve: ..., async: false, params: ... })
      /**
       * @ngdoc function
       * @name ui.router.state.$view#load
       * @methodOf ui.router.state.$view
       *
       * @description
       *
       * @param {string} name name
       * @param {object} options option object.
       */
      load: function load(name, options) {
        var result, defaults = {
          template: null, controller: null, view: null, locals: null, notify: true, async: true, params: {}
        };
        options = extend(defaults, options);

        if (options.view) {
          result = $templateFactory.fromConfig(options.view, options.params, options.locals);
        }
        return result;
      }
    };
  }
}

angular.module('ui.router.state').provider('$view', $ViewProvider);

/**
 * @ngdoc object
 * @name ui.router.state.$uiViewScrollProvider
 *
 * @description
 * Provider that returns the {@link ui.router.state.$uiViewScroll} service function.
 */
function $ViewScrollProvider() {

  var useAnchorScroll = false;

  /**
   * @ngdoc function
   * @name ui.router.state.$uiViewScrollProvider#useAnchorScroll
   * @methodOf ui.router.state.$uiViewScrollProvider
   *
   * @description
   * Reverts back to using the core [`$anchorScroll`](http://docs.angularjs.org/api/ng.$anchorScroll) service for
   * scrolling based on the url anchor.
   */
  this.useAnchorScroll = function () {
    useAnchorScroll = true;
  };

  /**
   * @ngdoc object
   * @name ui.router.state.$uiViewScroll
   *
   * @requires $anchorScroll
   * @requires $timeout
   *
   * @description
   * When called with a jqLite element, it scrolls the element into view (after a
   * `$timeout` so the DOM has time to refresh).
   *
   * If you prefer to rely on `$anchorScroll` to scroll the view to the anchor,
   * this can be enabled by calling {@link ui.router.state.$uiViewScrollProvider#methods_useAnchorScroll `$uiViewScrollProvider.useAnchorScroll()`}.
   */
  this.$get = ['$anchorScroll', '$timeout', function ($anchorScroll, $timeout) {
    if (useAnchorScroll) {
      return $anchorScroll;
    }

    return function ($element) {
      return $timeout(function () {
        $element[0].scrollIntoView();
      }, 0, false);
    };
  }];
}

angular.module('ui.router.state').provider('$uiViewScroll', $ViewScrollProvider);

/**
 * @ngdoc directive
 * @name ui.router.state.directive:ui-view
 *
 * @requires ui.router.state.$state
 * @requires $compile
 * @requires $controller
 * @requires $injector
 * @requires ui.router.state.$uiViewScroll
 * @requires $document
 *
 * @restrict ECA
 *
 * @description
 * The ui-view directive tells $state where to place your templates.
 *
 * @param {string=} name A view name. The name should be unique amongst the other views in the
 * same state. You can have views of the same name that live in different states.
 *
 * @param {string=} autoscroll It allows you to set the scroll behavior of the browser window
 * when a view is populated. By default, $anchorScroll is overridden by ui-router's custom scroll
 * service, {@link ui.router.state.$uiViewScroll}. This custom service let's you
 * scroll ui-view elements into view when they are populated during a state activation.
 *
 * *Note: To revert back to old [`$anchorScroll`](http://docs.angularjs.org/api/ng.$anchorScroll)
 * functionality, call `$uiViewScrollProvider.useAnchorScroll()`.*
 *
 * @param {string=} onload Expression to evaluate whenever the view updates.
 *
 * @example
 * A view can be unnamed or named.
 * <pre>
 * <!-- Unnamed -->
 * <div ui-view></div>
 *
 * <!-- Named -->
 * <div ui-view="viewName"></div>
 * </pre>
 *
 * You can only have one unnamed view within any template (or root html). If you are only using a
 * single view and it is unnamed then you can populate it like so:
 * <pre>
 * <div ui-view></div>
 * $stateProvider.state("home", {
 *   template: "<h1>HELLO!</h1>"
 * })
 * </pre>
 *
 * The above is a convenient shortcut equivalent to specifying your view explicitly with the {@link ui.router.state.$stateProvider#methods_state `views`}
 * config property, by name, in this case an empty name:
 * <pre>
 * $stateProvider.state("home", {
 *   views: {
 *     "": {
 *       template: "<h1>HELLO!</h1>"
 *     }
 *   }    
 * })
 * </pre>
 *
 * But typically you'll only use the views property if you name your view or have more than one view
 * in the same template. There's not really a compelling reason to name a view if its the only one,
 * but you could if you wanted, like so:
 * <pre>
 * <div ui-view="main"></div>
 * </pre>
 * <pre>
 * $stateProvider.state("home", {
 *   views: {
 *     "main": {
 *       template: "<h1>HELLO!</h1>"
 *     }
 *   }    
 * })
 * </pre>
 *
 * Really though, you'll use views to set up multiple views:
 * <pre>
 * <div ui-view></div>
 * <div ui-view="chart"></div>
 * <div ui-view="data"></div>
 * </pre>
 *
 * <pre>
 * $stateProvider.state("home", {
 *   views: {
 *     "": {
 *       template: "<h1>HELLO!</h1>"
 *     },
 *     "chart": {
 *       template: "<chart_thing/>"
 *     },
 *     "data": {
 *       template: "<data_thing/>"
 *     }
 *   }    
 * })
 * </pre>
 *
 * Examples for `autoscroll`:
 *
 * <pre>
 * <!-- If autoscroll present with no expression,
 *      then scroll ui-view into view -->
 * <ui-view autoscroll/>
 *
 * <!-- If autoscroll present with valid expression,
 *      then scroll ui-view into view if expression evaluates to true -->
 * <ui-view autoscroll='true'/>
 * <ui-view autoscroll='false'/>
 * <ui-view autoscroll='scopeVariable'/>
 * </pre>
 *
 * Resolve data:
 *
 * The resolved data from the state's `resolve` block is placed on the scope as `$resolve` (this
 * can be customized using [[ViewDeclaration.resolveAs]]).  This can be then accessed from the template.
 *
 * Note that when `controllerAs` is being used, `$resolve` is set on the controller instance *after* the
 * controller is instantiated.  The `$onInit()` hook can be used to perform initialization code which
 * depends on `$resolve` data.
 *
 * Example usage of $resolve in a view template
 * <pre>
 * $stateProvider.state('home', {
 *   template: '<my-component user="$resolve.user"></my-component>',
 *   resolve: {
 *     user: function(UserService) { return UserService.fetchUser(); }
 *   }
 * });
 * </pre>
 */
$ViewDirective.$inject = ['$state', '$injector', '$uiViewScroll', '$interpolate', '$q'];
function $ViewDirective(   $state,   $injector,   $uiViewScroll,   $interpolate,   $q) {

  function getService() {
    return ($injector.has) ? function(service) {
      return $injector.has(service) ? $injector.get(service) : null;
    } : function(service) {
      try {
        return $injector.get(service);
      } catch (e) {
        return null;
      }
    };
  }

  var service = getService(),
      $animator = service('$animator'),
      $animate = service('$animate');

  // Returns a set of DOM manipulation functions based on which Angular version
  // it should use
  function getRenderer(attrs, scope) {
    var statics = function() {
      return {
        enter: function (element, target, cb) { target.after(element); cb(); },
        leave: function (element, cb) { element.remove(); cb(); }
      };
    };

    if ($animate) {
      return {
        enter: function(element, target, cb) {
          if (angular.version.minor > 2) {
            $animate.enter(element, null, target).then(cb);
          } else {
            $animate.enter(element, null, target, cb);
          }
        },
        leave: function(element, cb) {
          if (angular.version.minor > 2) {
            $animate.leave(element).then(cb);
          } else {
            $animate.leave(element, cb);
          }
        }
      };
    }

    if ($animator) {
      var animate = $animator && $animator(scope, attrs);

      return {
        enter: function(element, target, cb) {animate.enter(element, null, target); cb(); },
        leave: function(element, cb) { animate.leave(element); cb(); }
      };
    }

    return statics();
  }

  var directive = {
    restrict: 'ECA',
    terminal: true,
    priority: 400,
    transclude: 'element',
    compile: function (tElement, tAttrs, $transclude) {
      return function (scope, $element, attrs) {
        var previousEl, currentEl, currentScope, latestLocals,
            onloadExp     = attrs.onload || '',
            autoScrollExp = attrs.autoscroll,
            renderer      = getRenderer(attrs, scope),
            inherited     = $element.inheritedData('$uiView');

        scope.$on('$stateChangeSuccess', function() {
          updateView(false);
        });

        updateView(true);

        function cleanupLastView() {
          if (previousEl) {
            previousEl.remove();
            previousEl = null;
          }

          if (currentScope) {
            currentScope.$destroy();
            currentScope = null;
          }

          if (currentEl) {
            var $uiViewData = currentEl.data('$uiViewAnim');
            renderer.leave(currentEl, function() {
              $uiViewData.$$animLeave.resolve();
              previousEl = null;
            });

            previousEl = currentEl;
            currentEl = null;
          }
        }

        function updateView(firstTime) {
          var newScope,
              name            = getUiViewName(scope, attrs, $element, $interpolate),
              previousLocals  = name && $state.$current && $state.$current.locals[name];

          if (!firstTime && previousLocals === latestLocals) return; // nothing to do
          newScope = scope.$new();
          latestLocals = $state.$current.locals[name];

          /**
           * @ngdoc event
           * @name ui.router.state.directive:ui-view#$viewContentLoading
           * @eventOf ui.router.state.directive:ui-view
           * @eventType emits on ui-view directive scope
           * @description
           *
           * Fired once the view **begins loading**, *before* the DOM is rendered.
           *
           * @param {Object} event Event object.
           * @param {string} viewName Name of the view.
           */
          newScope.$emit('$viewContentLoading', name);

          var clone = $transclude(newScope, function(clone) {
            var animEnter = $q.defer(), animLeave = $q.defer();
            var viewAnimData = {
              $animEnter: animEnter.promise,
              $animLeave: animLeave.promise,
              $$animLeave: animLeave
            };

            clone.data('$uiViewAnim', viewAnimData);
            renderer.enter(clone, $element, function onUiViewEnter() {
              animEnter.resolve();
              if(currentScope) {
                currentScope.$emit('$viewContentAnimationEnded');
              }

              if (angular.isDefined(autoScrollExp) && !autoScrollExp || scope.$eval(autoScrollExp)) {
                $uiViewScroll(clone);
              }
            });
            cleanupLastView();
          });

          currentEl = clone;
          currentScope = newScope;
          /**
           * @ngdoc event
           * @name ui.router.state.directive:ui-view#$viewContentLoaded
           * @eventOf ui.router.state.directive:ui-view
           * @eventType emits on ui-view directive scope
           * @description
           * Fired once the view is **loaded**, *after* the DOM is rendered.
           *
           * @param {Object} event Event object.
           * @param {string} viewName Name of the view.
           */
          currentScope.$emit('$viewContentLoaded', name);
          currentScope.$eval(onloadExp);
        }
      };
    }
  };

  return directive;
}

$ViewDirectiveFill.$inject = ['$compile', '$controller', '$state', '$interpolate'];
function $ViewDirectiveFill (  $compile,   $controller,   $state,   $interpolate) {
  return {
    restrict: 'ECA',
    priority: -400,
    compile: function (tElement) {
      var initial = tElement.html();
      if (tElement.empty) {
        tElement.empty();
      } else {
        // ng 1.0.0 doesn't have empty(), which cleans up data and handlers
        tElement[0].innerHTML = null;
      }

      return function (scope, $element, attrs) {
        var current = $state.$current,
            name = getUiViewName(scope, attrs, $element, $interpolate),
            locals  = current && current.locals[name];

        if (! locals) {
          $element.html(initial);
          $compile($element.contents())(scope);
          return;
        }

        $element.data('$uiView', { name: name, state: locals.$$state });
        $element.html(locals.$template ? locals.$template : initial);

        var resolveData = angular.extend({}, locals);
        scope[locals.$$resolveAs] = resolveData;

        var link = $compile($element.contents());

        if (locals.$$controller) {
          locals.$scope = scope;
          locals.$element = $element;
          var controller = $controller(locals.$$controller, locals);
          if (locals.$$controllerAs) {
            scope[locals.$$controllerAs] = controller;
            scope[locals.$$controllerAs][locals.$$resolveAs] = resolveData;
          }
          if (isFunction(controller.$onInit)) controller.$onInit();
          $element.data('$ngControllerController', controller);
          $element.children().data('$ngControllerController', controller);
        }

        link(scope);
      };
    }
  };
}

/**
 * Shared ui-view code for both directives:
 * Given scope, element, and its attributes, return the view's name
 */
function getUiViewName(scope, attrs, element, $interpolate) {
  var name = $interpolate(attrs.uiView || attrs.name || '')(scope);
  var uiViewCreatedBy = element.inheritedData('$uiView');
  return name.indexOf('@') >= 0 ?  name :  (name + '@' + (uiViewCreatedBy ? uiViewCreatedBy.state.name : ''));
}

angular.module('ui.router.state').directive('uiView', $ViewDirective);
angular.module('ui.router.state').directive('uiView', $ViewDirectiveFill);

function parseStateRef(ref, current) {
  var preparsed = ref.match(/^\s*({[^}]*})\s*$/), parsed;
  if (preparsed) ref = current + '(' + preparsed[1] + ')';
  parsed = ref.replace(/\n/g, " ").match(/^([^(]+?)\s*(\((.*)\))?$/);
  if (!parsed || parsed.length !== 4) throw new Error("Invalid state ref '" + ref + "'");
  return { state: parsed[1], paramExpr: parsed[3] || null };
}

function stateContext(el) {
  var stateData = el.parent().inheritedData('$uiView');

  if (stateData && stateData.state && stateData.state.name) {
    return stateData.state;
  }
}

function getTypeInfo(el) {
  // SVGAElement does not use the href attribute, but rather the 'xlinkHref' attribute.
  var isSvg = Object.prototype.toString.call(el.prop('href')) === '[object SVGAnimatedString]';
  var isForm = el[0].nodeName === "FORM";

  return {
    attr: isForm ? "action" : (isSvg ? 'xlink:href' : 'href'),
    isAnchor: el.prop("tagName").toUpperCase() === "A",
    clickable: !isForm
  };
}

function clickHook(el, $state, $timeout, type, current) {
  return function(e) {
    var button = e.which || e.button, target = current();

    if (!(button > 1 || e.ctrlKey || e.metaKey || e.shiftKey || el.attr('target'))) {
      // HACK: This is to allow ng-clicks to be processed before the transition is initiated:
      var transition = $timeout(function() {
        $state.go(target.state, target.params, target.options);
      });
      e.preventDefault();

      // if the state has no URL, ignore one preventDefault from the <a> directive.
      var ignorePreventDefaultCount = type.isAnchor && !target.href ? 1: 0;

      e.preventDefault = function() {
        if (ignorePreventDefaultCount-- <= 0) $timeout.cancel(transition);
      };
    }
  };
}

function defaultOpts(el, $state) {
  return { relative: stateContext(el) || $state.$current, inherit: true };
}

/**
 * @ngdoc directive
 * @name ui.router.state.directive:ui-sref
 *
 * @requires ui.router.state.$state
 * @requires $timeout
 *
 * @restrict A
 *
 * @description
 * A directive that binds a link (`<a>` tag) to a state. If the state has an associated
 * URL, the directive will automatically generate & update the `href` attribute via
 * the {@link ui.router.state.$state#methods_href $state.href()} method. Clicking
 * the link will trigger a state transition with optional parameters.
 *
 * Also middle-clicking, right-clicking, and ctrl-clicking on the link will be
 * handled natively by the browser.
 *
 * You can also use relative state paths within ui-sref, just like the relative
 * paths passed to `$state.go()`. You just need to be aware that the path is relative
 * to the state that the link lives in, in other words the state that loaded the
 * template containing the link.
 *
 * You can specify options to pass to {@link ui.router.state.$state#methods_go $state.go()}
 * using the `ui-sref-opts` attribute. Options are restricted to `location`, `inherit`,
 * and `reload`.
 *
 * @example
 * Here's an example of how you'd use ui-sref and how it would compile. If you have the
 * following template:
 * <pre>
 * <a ui-sref="home">Home</a> | <a ui-sref="about">About</a> | <a ui-sref="{page: 2}">Next page</a>
 *
 * <ul>
 *     <li ng-repeat="contact in contacts">
 *         <a ui-sref="contacts.detail({ id: contact.id })">{{ contact.name }}</a>
 *     </li>
 * </ul>
 * </pre>
 *
 * Then the compiled html would be (assuming Html5Mode is off and current state is contacts):
 * <pre>
 * <a href="#/home" ui-sref="home">Home</a> | <a href="#/about" ui-sref="about">About</a> | <a href="#/contacts?page=2" ui-sref="{page: 2}">Next page</a>
 *
 * <ul>
 *     <li ng-repeat="contact in contacts">
 *         <a href="#/contacts/1" ui-sref="contacts.detail({ id: contact.id })">Joe</a>
 *     </li>
 *     <li ng-repeat="contact in contacts">
 *         <a href="#/contacts/2" ui-sref="contacts.detail({ id: contact.id })">Alice</a>
 *     </li>
 *     <li ng-repeat="contact in contacts">
 *         <a href="#/contacts/3" ui-sref="contacts.detail({ id: contact.id })">Bob</a>
 *     </li>
 * </ul>
 *
 * <a ui-sref="home" ui-sref-opts="{reload: true}">Home</a>
 * </pre>
 *
 * @param {string} ui-sref 'stateName' can be any valid absolute or relative state
 * @param {Object} ui-sref-opts options to pass to {@link ui.router.state.$state#methods_go $state.go()}
 */
$StateRefDirective.$inject = ['$state', '$timeout'];
function $StateRefDirective($state, $timeout) {
  return {
    restrict: 'A',
    require: ['?^uiSrefActive', '?^uiSrefActiveEq'],
    link: function(scope, element, attrs, uiSrefActive) {
      var ref    = parseStateRef(attrs.uiSref, $state.current.name);
      var def    = { state: ref.state, href: null, params: null };
      var type   = getTypeInfo(element);
      var active = uiSrefActive[1] || uiSrefActive[0];
      var unlinkInfoFn = null;
      var hookFn;

      def.options = extend(defaultOpts(element, $state), attrs.uiSrefOpts ? scope.$eval(attrs.uiSrefOpts) : {});

      var update = function(val) {
        if (val) def.params = angular.copy(val);
        def.href = $state.href(ref.state, def.params, def.options);

        if (unlinkInfoFn) unlinkInfoFn();
        if (active) unlinkInfoFn = active.$$addStateInfo(ref.state, def.params);
        if (def.href !== null) attrs.$set(type.attr, def.href);
      };

      if (ref.paramExpr) {
        scope.$watch(ref.paramExpr, function(val) { if (val !== def.params) update(val); }, true);
        def.params = angular.copy(scope.$eval(ref.paramExpr));
      }
      update();

      if (!type.clickable) return;
      hookFn = clickHook(element, $state, $timeout, type, function() { return def; });
      element[element.on ? 'on' : 'bind']("click", hookFn);
      scope.$on('$destroy', function() {
        element[element.off ? 'off' : 'unbind']("click", hookFn);
      });
    }
  };
}

/**
 * @ngdoc directive
 * @name ui.router.state.directive:ui-state
 *
 * @requires ui.router.state.uiSref
 *
 * @restrict A
 *
 * @description
 * Much like ui-sref, but will accept named $scope properties to evaluate for a state definition,
 * params and override options.
 *
 * @param {string} ui-state 'stateName' can be any valid absolute or relative state
 * @param {Object} ui-state-params params to pass to {@link ui.router.state.$state#methods_href $state.href()}
 * @param {Object} ui-state-opts options to pass to {@link ui.router.state.$state#methods_go $state.go()}
 */
$StateRefDynamicDirective.$inject = ['$state', '$timeout'];
function $StateRefDynamicDirective($state, $timeout) {
  return {
    restrict: 'A',
    require: ['?^uiSrefActive', '?^uiSrefActiveEq'],
    link: function(scope, element, attrs, uiSrefActive) {
      var type   = getTypeInfo(element);
      var active = uiSrefActive[1] || uiSrefActive[0];
      var group  = [attrs.uiState, attrs.uiStateParams || null, attrs.uiStateOpts || null];
      var watch  = '[' + group.map(function(val) { return val || 'null'; }).join(', ') + ']';
      var def    = { state: null, params: null, options: null, href: null };
      var unlinkInfoFn = null;
      var hookFn;

      function runStateRefLink (group) {
        def.state = group[0]; def.params = group[1]; def.options = group[2];
        def.href = $state.href(def.state, def.params, def.options);

        if (unlinkInfoFn) unlinkInfoFn();
        if (active) unlinkInfoFn = active.$$addStateInfo(def.state, def.params);
        if (def.href) attrs.$set(type.attr, def.href);
      }

      scope.$watch(watch, runStateRefLink, true);
      runStateRefLink(scope.$eval(watch));

      if (!type.clickable) return;
      hookFn = clickHook(element, $state, $timeout, type, function() { return def; });
      element[element.on ? 'on' : 'bind']("click", hookFn);
      scope.$on('$destroy', function() {
        element[element.off ? 'off' : 'unbind']("click", hookFn);
      });
    }
  };
}


/**
 * @ngdoc directive
 * @name ui.router.state.directive:ui-sref-active
 *
 * @requires ui.router.state.$state
 * @requires ui.router.state.$stateParams
 * @requires $interpolate
 *
 * @restrict A
 *
 * @description
 * A directive working alongside ui-sref to add classes to an element when the
 * related ui-sref directive's state is active, and removing them when it is inactive.
 * The primary use-case is to simplify the special appearance of navigation menus
 * relying on `ui-sref`, by having the "active" state's menu button appear different,
 * distinguishing it from the inactive menu items.
 *
 * ui-sref-active can live on the same element as ui-sref or on a parent element. The first
 * ui-sref-active found at the same level or above the ui-sref will be used.
 *
 * Will activate when the ui-sref's target state or any child state is active. If you
 * need to activate only when the ui-sref target state is active and *not* any of
 * it's children, then you will use
 * {@link ui.router.state.directive:ui-sref-active-eq ui-sref-active-eq}
 *
 * @example
 * Given the following template:
 * <pre>
 * <ul>
 *   <li ui-sref-active="active" class="item">
 *     <a href ui-sref="app.user({user: 'bilbobaggins'})">@bilbobaggins</a>
 *   </li>
 * </ul>
 * </pre>
 *
 *
 * When the app state is "app.user" (or any children states), and contains the state parameter "user" with value "bilbobaggins",
 * the resulting HTML will appear as (note the 'active' class):
 * <pre>
 * <ul>
 *   <li ui-sref-active="active" class="item active">
 *     <a ui-sref="app.user({user: 'bilbobaggins'})" href="/users/bilbobaggins">@bilbobaggins</a>
 *   </li>
 * </ul>
 * </pre>
 *
 * The class name is interpolated **once** during the directives link time (any further changes to the
 * interpolated value are ignored).
 *
 * Multiple classes may be specified in a space-separated format:
 * <pre>
 * <ul>
 *   <li ui-sref-active='class1 class2 class3'>
 *     <a ui-sref="app.user">link</a>
 *   </li>
 * </ul>
 * </pre>
 *
 * It is also possible to pass ui-sref-active an expression that evaluates
 * to an object hash, whose keys represent active class names and whose
 * values represent the respective state names/globs.
 * ui-sref-active will match if the current active state **includes** any of
 * the specified state names/globs, even the abstract ones.
 *
 * @Example
 * Given the following template, with "admin" being an abstract state:
 * <pre>
 * <div ui-sref-active="{'active': 'admin.*'}">
 *   <a ui-sref-active="active" ui-sref="admin.roles">Roles</a>
 * </div>
 * </pre>
 *
 * When the current state is "admin.roles" the "active" class will be applied
 * to both the <div> and <a> elements. It is important to note that the state
 * names/globs passed to ui-sref-active shadow the state provided by ui-sref.
 */

/**
 * @ngdoc directive
 * @name ui.router.state.directive:ui-sref-active-eq
 *
 * @requires ui.router.state.$state
 * @requires ui.router.state.$stateParams
 * @requires $interpolate
 *
 * @restrict A
 *
 * @description
 * The same as {@link ui.router.state.directive:ui-sref-active ui-sref-active} but will only activate
 * when the exact target state used in the `ui-sref` is active; no child states.
 *
 */
$StateRefActiveDirective.$inject = ['$state', '$stateParams', '$interpolate'];
function $StateRefActiveDirective($state, $stateParams, $interpolate) {
  return  {
    restrict: "A",
    controller: ['$scope', '$element', '$attrs', '$timeout', function ($scope, $element, $attrs, $timeout) {
      var states = [], activeClasses = {}, activeEqClass, uiSrefActive;

      // There probably isn't much point in $observing this
      // uiSrefActive and uiSrefActiveEq share the same directive object with some
      // slight difference in logic routing
      activeEqClass = $interpolate($attrs.uiSrefActiveEq || '', false)($scope);

      try {
        uiSrefActive = $scope.$eval($attrs.uiSrefActive);
      } catch (e) {
        // Do nothing. uiSrefActive is not a valid expression.
        // Fall back to using $interpolate below
      }
      uiSrefActive = uiSrefActive || $interpolate($attrs.uiSrefActive || '', false)($scope);
      if (isObject(uiSrefActive)) {
        forEach(uiSrefActive, function(stateOrName, activeClass) {
          if (isString(stateOrName)) {
            var ref = parseStateRef(stateOrName, $state.current.name);
            addState(ref.state, $scope.$eval(ref.paramExpr), activeClass);
          }
        });
      }

      // Allow uiSref to communicate with uiSrefActive[Equals]
      this.$$addStateInfo = function (newState, newParams) {
        // we already got an explicit state provided by ui-sref-active, so we
        // shadow the one that comes from ui-sref
        if (isObject(uiSrefActive) && states.length > 0) {
          return;
        }
        var deregister = addState(newState, newParams, uiSrefActive);
        update();
        return deregister;
      };

      $scope.$on('$stateChangeSuccess', update);

      function addState(stateName, stateParams, activeClass) {
        var state = $state.get(stateName, stateContext($element));
        var stateHash = createStateHash(stateName, stateParams);

        var stateInfo = {
          state: state || { name: stateName },
          params: stateParams,
          hash: stateHash
        };

        states.push(stateInfo);
        activeClasses[stateHash] = activeClass;

        return function removeState() {
          var idx = states.indexOf(stateInfo);
          if (idx !== -1) states.splice(idx, 1);
        };
      }

      /**
       * @param {string} state
       * @param {Object|string} [params]
       * @return {string}
       */
      function createStateHash(state, params) {
        if (!isString(state)) {
          throw new Error('state should be a string');
        }
        if (isObject(params)) {
          return state + toJson(params);
        }
        params = $scope.$eval(params);
        if (isObject(params)) {
          return state + toJson(params);
        }
        return state;
      }

      // Update route state
      function update() {
        for (var i = 0; i < states.length; i++) {
          if (anyMatch(states[i].state, states[i].params)) {
            addClass($element, activeClasses[states[i].hash]);
          } else {
            removeClass($element, activeClasses[states[i].hash]);
          }

          if (exactMatch(states[i].state, states[i].params)) {
            addClass($element, activeEqClass);
          } else {
            removeClass($element, activeEqClass);
          }
        }
      }

      function addClass(el, className) { $timeout(function () { el.addClass(className); }); }
      function removeClass(el, className) { el.removeClass(className); }
      function anyMatch(state, params) { return $state.includes(state.name, params); }
      function exactMatch(state, params) { return $state.is(state.name, params); }

      update();
    }]
  };
}

angular.module('ui.router.state')
  .directive('uiSref', $StateRefDirective)
  .directive('uiSrefActive', $StateRefActiveDirective)
  .directive('uiSrefActiveEq', $StateRefActiveDirective)
  .directive('uiState', $StateRefDynamicDirective);

/**
 * @ngdoc filter
 * @name ui.router.state.filter:isState
 *
 * @requires ui.router.state.$state
 *
 * @description
 * Translates to {@link ui.router.state.$state#methods_is $state.is("stateName")}.
 */
$IsStateFilter.$inject = ['$state'];
function $IsStateFilter($state) {
  var isFilter = function (state, params) {
    return $state.is(state, params);
  };
  isFilter.$stateful = true;
  return isFilter;
}

/**
 * @ngdoc filter
 * @name ui.router.state.filter:includedByState
 *
 * @requires ui.router.state.$state
 *
 * @description
 * Translates to {@link ui.router.state.$state#methods_includes $state.includes('fullOrPartialStateName')}.
 */
$IncludedByStateFilter.$inject = ['$state'];
function $IncludedByStateFilter($state) {
  var includesFilter = function (state, params, options) {
    return $state.includes(state, params, options);
  };
  includesFilter.$stateful = true;
  return  includesFilter;
}

angular.module('ui.router.state')
  .filter('isState', $IsStateFilter)
  .filter('includedByState', $IncludedByStateFilter);
})(window, window.angular);
},{}]},{},[1]);
