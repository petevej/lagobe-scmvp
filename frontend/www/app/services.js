/**
 * Created By: Laki Sik
 * Email: mr.laki.sik@gmail.com
 * Phone: +66874414008
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
        getShopInfo
    };
    
    function uploadFile(file) {
        let fd = new FormData();
        fd.append('file', file);

        let deferred = $q.defer();

//        $http({
//            method: 'PUT',
//            url: `${CONFIG.PATH.APIS}/resource`,
//            data: fd,
//            headers: {
//                'Content-Type': undefined
//            }
//        }).then(
//            (respond) => {
//                deferred.resolve(respond.data);
//            },
//            (reason) => {
//                deferred.reject(reason.data);
//            }
//        );

    //	$http.post(`${CONFIG.PATH.APIS}/upload`, JSON.stringify(fd), {
    //        transformRequest: angular.identity,
    //        headers: {'Content-Type': undefined}
    //    }).then(
    //        (respond) => {
    //            deferred.resolve(respond.data);
    //        },
    //        (reason) => {
    //            deferred.reject(reason.data);
    //        }
    //    );
        
        let userStorage = JSON.parse($window.localStorage.user);
        let userAccountID = userStorage.id;
        $http.post(`${CONFIG.PATH.APIS}/upload/${userAccountID}`, fd, {
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
//    	$http.get(`${CONFIG.PATH.APIS}/location/provinces?zipcode=${queries.zipcode}`)
//            .then(
//    			(respond) => {
//		    		deferred.resolve(respond.data);
//    			},
//    			(reason) => {
//    				deferred.reject(reason.data);
//    			}
//    		);
            
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
//        $http.get(`${CONFIG.PATH.APIS}/location/amphurs?zipcode=${queries.zipcode}&province=${queries.province}`)
//            .then(
//    			(respond) => {
//		    		deferred.resolve(respond.data);
//    			},
//    			(reason) => {
//    				deferred.reject(reason.data);
//    			}
//    		);
            
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
//        $http.get(`${CONFIG.PATH.APIS}/location/districts?zipcode=${queries.zipcode}&province=${queries.province}&amphur=${queries.amphur}`)
//            .then(
//    			(respond) => {
//		    		deferred.resolve(respond.data);
//    			},
//    			(reason) => {
//    				deferred.reject(reason.data);
//    			}
//    		);

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
}

angular.module('MainApp')
.factory('mainService', mainService);

angular.module('User')
.factory('userService', userService);
