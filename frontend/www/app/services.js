/**
  * Created By: Pete Vejanurug
  * Email: p@lagobe.com
  * Phone: +66903263755
  */

function mainService(PAGE, CONFIG, $q, $window, $http){
    "ngInject";
    
    return {
        signin,
        signUp,
        create,
        update,
        isLoggedIn,
        getLabel
    };
    
    
    function signin(user){
        let deferred = $q.defer();
        $http.post(`${CONFIG.PATH.APIS}/authenticate`, user).then(
            (respond) => {
                deferred.resolve(respond.data);
            },
            (reason) => {
                deferred.reject(reason.data);
            }
        );
        return deferred.promise;
    }
    
    function signUp(user) {
    	let deferred = $q.defer();
    	$http.post(`${CONFIG.PATH.APIS}/users`, user).then(
    			(respond) => {
		    		deferred.resolve(respond.data);
    			},
    			(reason) => {
    				deferred.reject(reason.data);
    			}
    		);
    	return deferred.promise;
    }

    function create() {
        
    }
    
    function update() {
        
    }
    
    function isLoggedIn() {
        return $window.localStorage.userInfo != null;
    }
    
    function getLabel(page,language){
        let _language;
        if(!language){
            if($window.localStorage.lang) {
                _language = $window.localStorage.lang;
            }
            else{
                _language = PAGE.LANGUAGE;
            }
        }
        else{
            _language = language;
        }
        $window.localStorage.lang = _language;

    	var promise = $http.get('assets/languages/'+page+'/'+_language+'.json').then(function(response){
    		return response.data;
    	});
    	return promise;
    }
    
}

function userService(CONFIG, $window, $http, $q){
    "ngInject";
    
    return {
        uploadFile,
        save,
        getCompanyPrefixes,
        getBanks,
        getProvinces,
        getAmphurs,
        getDistricts,
        getShopInfo,
        getAWSS3URL
    };
    
    function uploadFile(documentName, file) {
        let deferred = $q.defer();
        
        let fd = new FormData(); fd.append('file', file);
        let userStorage = JSON.parse($window.localStorage.user);
        let userAccountID = userStorage.id;
        $http.post(`${CONFIG.PATH.APIS}/awsS3/upload/${userAccountID}?documentName=${documentName}`, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).then(
            (respond) => {
                deferred.resolve(respond.data);
            },
            (reason) => {
                deferred.reject(reason.data);
            }
        );
    	return deferred.promise;
    }

    function save(shopInfo) {
        let deferred = $q.defer();
        let userStorage = JSON.parse($window.localStorage.user);
        let userAccountID = userStorage.id;
    	$http.put(`${CONFIG.PATH.APIS}/shops/user/${userAccountID}`, shopInfo)
            .then(
    			(respond) => {
		    		deferred.resolve(respond.data);
    			},
    			(reason) => {
    				deferred.reject(reason.data);
    			}
    		);
    	return deferred.promise;
    }

    function getBanks() {
    	let deferred = $q.defer();
    	$http.get(`${CONFIG.PATH.APIS}/banks`)
            .then(
    			(respond) => {
		    		deferred.resolve(respond.data);
    			},
    			(reason) => {
    				deferred.reject(reason.data);
    			}
    		);
    	return deferred.promise;
    }
    
    function getCompanyPrefixes() {
    	let deferred = $q.defer();
    	$http.get(`${CONFIG.PATH.APIS}/companies/prefixes`)
            .then(
    			(respond) => {
		    		deferred.resolve(respond.data);
    			},
    			(reason) => {
    				deferred.reject(reason.data);
    			}
    		);
    	return deferred.promise;
    }

    function getProvinces(queries) {
        let deferred = $q.defer();
        jQuery.ajax(`${CONFIG.PATH.APIS}/location/provinces?zipcode=${queries.zipcode}`, {
            type: "GET",
            async: false,
            success: (data) => {
                deferred.resolve(data);
            },
            failure: (data) => {
                deferred.reject(data);
            }
        });    
    	return deferred.promise;
    }

    function getAmphurs(queries) {
        let deferred = $q.defer();
        jQuery.ajax(`${CONFIG.PATH.APIS}/location/amphurs?zipcode=${queries.zipcode}&province=${queries.province}`, {
            type: "GET",
            async: false,
            success: (data) => {
                deferred.resolve(data);
            },
            failure: (data) => {
                deferred.reject(data);
            }
        });
    	return deferred.promise;
    }

    function getDistricts(queries) {
        let deferred = $q.defer();
        jQuery.ajax(`${CONFIG.PATH.APIS}/location/districts?zipcode=${queries.zipcode}&province=${queries.province}&amphur=${queries.amphur}`, {
            type: "GET",
            async: false,
            success: (data) => {
                deferred.resolve(data);
            },
            failure: (data) => {
                deferred.reject(data);
            }
        });
    	return deferred.promise;
    }
    
    function getShopInfo() {
        let deferred = $q.defer();
        let userStorage = JSON.parse($window.localStorage.user);
        let userAccountID = userStorage.id;
    	$http.get(`${CONFIG.PATH.APIS}/shops/user/${userAccountID}`)
            .then(
    			(respond) => {
		    		deferred.resolve(respond.data);
    			},
    			(reason) => {
    				deferred.reject(reason.data);
    			}
    		);
    	return deferred.promise;
    }
    
    function getAWSS3URL(awsS3Key) {
        let deferred = $q.defer();
        $http.get(`${CONFIG.PATH.APIS}/awsS3/url?awsS3Key=${awsS3Key}`)
            .then(
                (respond) => {
                    deferred.resolve(respond.data);
                },
                (reason) => {
                    deferred.reject(reason.data);
                }
            );
    	return deferred.promise;
    }
}

angular.module('MainApp')
.factory('mainService', mainService);

angular.module('User')
.factory('userService', userService);
