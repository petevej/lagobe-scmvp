/**
  * Created By: Pete Vejanurug
  * Email: p@lagobe.com
  * Phone: +66903263755
  */

function mainPage() {
    "ngInject";

    return {
        restrict: 'E',
        link: function (scope, elem, attrs) {
            var appMaster = {

                preLoader: function () {
                    imageSources = []
                    $('img').each(function () {
                        var sources = $(this).attr('src');
                        imageSources.push(sources);
                    });
                    if ($(imageSources).load()) {
                        $('.pre-loader').fadeOut('slow');
                    }
                },

                smoothScroll: function () {
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

                reviewsCarousel: function () {
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

                screensCarousel: function () {
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

                animateScript: function () {
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

                scrollMenu: function () {
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
                placeHold: function () {
                    // run Placeholdem on all elements with placeholders
                    Placeholdem(document.querySelectorAll('[placeholder]'));
                },
                animateNumber: function () {
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
        link: function (scope, elem, attrs) {
            $(elem).gdocsViewer({ width: "100%", height: "100%" });
        }
    };
}

function scrollVisible() {
    "ngInject";

    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            if(elem.hasClass('scrollpoint')){
                if(elem.hasClass('sp-effect1')){
                    $(elem).waypoint(function () {
                        $(this).toggleClass('active');
                        $(this).toggleClass('animated fadeInLeft');
                    }, {
                        offset: '100%'
                    });
                }
                else if(elem.hasClass('sp-effect2')){
                    $(elem).waypoint(function () {
                        $(this).toggleClass('active');
                        $(this).toggleClass('animated fadeInRight');
                    }, {
                        offset: '100%'
                    });
                }
                else if(elem.hasClass('sp-effect3')){
                    $(elem).waypoint(function () {
                        $(this).toggleClass('active');
                        $(this).toggleClass('animated fadeInDown');
                    }, {
                        offset: '100%'
                    });
                }
                else if(elem.hasClass('sp-effect4')){
                    $(elem).waypoint(function () {
                        $(this).toggleClass('active');
                        $(this).toggleClass('animated fadeIn');
                    }, {
                        offset: '100%'
                    });
                }
                else if(elem.hasClass('sp-effect5')){
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

function registerMenu(){
    "ngInject";
    
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            elem.bind('click', function(event) {
                event.preventDefault();
                
                $('#'+attrs.menu+'Tab')[0].click();
                
                $('#'+attrs.menu+'Form input.form-control')[0].focus();
            });
        }
    };
}

function registerTab(){
    "ngInject";
    
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            elem.bind('click', function(event) {
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
        link: function (scope, elem, attrs) {
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
        link: function (scope, elem, attrs) {
            $(elem).waypoint(function () {
                $timeout(function(){
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
        link: function (scope, elem, attrs) {
            elem.css({
                display: "none",
                opacity: 0
            });

            $(elem).on('show', function() {
                elem.css({
                    display: 'block',
                    opacity: 1
                });

                $timeout(function() {
                    $(elem).animate({
                        opacity: 0
                    }, {
                        duration: 1800,
                        complete: function() {
                            elem.css('display', 'none');
                        }
                    });
                }, 600);
            });
        }
    };
}

angular.module('MainApp')
.directive('mainPage', mainPage)
.directive('embedPdf', embedPdf)
.directive('scrollVisible', scrollVisible)
.directive('registerMenu', registerMenu)
.directive('registerTab', registerTab)
.directive('numCountSpeed', numCountSpeed)
.directive('reviewsCarousel', reviewsCarousel)
.directive('notifySaved', notifySaved);





function signupPage() {
    "ngInject";

    return {
        restrict: 'E',
        link: function (scope, elem, attrs) {

        }
    };
}

function stepTab() {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            elem.bind('click', function(event) {
                event.preventDefault();
                $(elem).tab('show');
            });
        }
    };
}

function signOnBehalfOf() {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            $(elem).bind('loadData', function() {
                scope.user.signOnbehalfOfSwitch = attrs.value;
            });
            
            $(elem).bind('click', function() {
                scope.user.signOnbehalfOfSwitch = attrs.value;
                scope.$apply();
            });
        }
    };
}

function storeUploadDocument() {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            elem.bind('change', function() {
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
        link: function (scope, elem, attrs) {
            switchContactSameRegister();
            
            $(elem).bind('loadData', function() {
                switchContactSameRegister();
            });

            $(elem).bind('click', function() {
                switchContactSameRegister();
                scope.$apply();
            });

            function switchContactSameRegister() {
                let inputs = $('#storeIndividualContactForm .form-control')
                let isContactSameRegister = scope.user.signupInfo.store.individual.isContactSameRegister;
                
                if(isContactSameRegister) {
                    inputs.attr('readonly', 'readonly');

                    scope.user.updateStoreIndividualContactValues();
                }
                else {
                    inputs.removeAttr('readonly');
                }
            }
        }
    };
}

function addressSwitchDocumentdropSamePickup() {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            $(elem).bind('loadData', function() {
                switchDocumentdropSamePickup();
            });

            $(elem).bind('click', function() {
                switchDocumentdropSamePickup();
                scope.$apply();
            });

            function switchDocumentdropSamePickup() {
                let inputs = $('#addressDocumentDropForm .form-control')
                let isDocumentdropSamePickup = scope.user.signupInfo.address.isDocumentDropSamePickup;
                if(isDocumentdropSamePickup) {
                    inputs.attr('readonly', 'readonly');

                    scope.user.updateAddressDocumentDropValues();
                }
                else {
                    inputs.removeAttr('readonly');
                }
            }
        }
    };
}

angular.module('User')
.directive('signupPage', signupPage)
.directive('stepTab', stepTab)
.directive('signOnBehalfOf', signOnBehalfOf)
.directive('storeUploadDocument', storeUploadDocument)
.directive('storeIndividualSwitchContactSameRegister', storeIndividualSwitchContactSameRegister)
.directive('addressSwitchDocumentdropSamePickup', addressSwitchDocumentdropSamePickup);
