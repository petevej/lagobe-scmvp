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
        $http.post(`${CONFIG.PATH.APIS}/authenthication`, user).then(
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
    	$http.put(`${CONFIG.PATH.APIS}/user`,user,[]).then(
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
        getCompanies,
        getBanks,
        getZipCodes,
        getProvince,
        getAmphur,
        getDistrict
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

    	$http.put(`${CONFIG.PATH.APIS}/resource`, JSON.stringify(fd), {
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

    function save(userInfo) {
        let deferred = $q.defer();
        let userStorage = JSON.parse($window.localStorage.user);
        let userId = userStorage.userId;
    	$http.post(`${CONFIG.PATH.APIS}/user/${userId}`, userInfo)
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
    	$http.get(`${CONFIG.PATH.APIS}/staticdata/banks`)
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
    
    function getCompanies() {
    	let deferred = $q.defer();
    	$http.get(`${CONFIG.PATH.APIS}/staticdata/companies`)
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
    
    function getZipCodes(zipCode) {
        let deferred = $q.defer();
    	$http.get(`${CONFIG.PATH.APIS}/staticdata/zipcodes?search=${zipCode}`)
            .then(
    			(respond) => {
                    let zipCodeInfo = respond.data;
		    		deferred.resolve(zipCodeInfo.content);
    			},
    			(reason) => {
    				deferred.reject(reason.data);
    			}
    		);
    	return deferred.promise;
    }

    function getProvince(provinceId) {
        let deferred = $q.defer();

//        jQuery.ajax(`${CONFIG.PATH.APIS}/staticdata/province/${provinceId}`, {
//            type: "GET",
//            async: false,
//            success: (data) => {
//                let provinceInfo = data;
//                deferred.resolve({
//                    id: provinceInfo.provinceId,
//                    name: provinceInfo.provinceName
//                });
//            },
//            failure: (data) => {
//                deferred.reject(data);
//            }
//        });

    	$http.get(`${CONFIG.PATH.APIS}/staticdata/province/${provinceId}`)
            .then(
    			(respond) => {
                    let provinceInfo = respond.data;
		    		deferred.resolve({
                        id: provinceInfo.provinceId,
                        name: provinceInfo.provinceName
                    });
    			},
    			(reason) => {
    				deferred.reject(reason.data);
    			}
    		);
    	return deferred.promise;
    }

    function getAmphur(amphurId) {
        let deferred = $q.defer();
    	$http.get(`${CONFIG.PATH.APIS}/staticdata/amphur/${amphurId}`)
            .then(
    			(respond) => {
                    let amphurInfo = respond.data;
		    		deferred.resolve({
                        id: amphurInfo.amphurId,
                        name: amphurInfo.amphurName
                    });
		    		deferred.resolve(respond.data);
    			},
    			(reason) => {
    				deferred.reject(reason.data);
    			}
    		);
    	return deferred.promise;
    }

    function getDistrict(districtId) {
        let deferred = $q.defer();
    	$http.get(`${CONFIG.PATH.APIS}/staticdata/district/${districtId}`)
            .then(
    			(respond) => {
                    let districtInfo = respond.data;
		    		deferred.resolve({
                        id: districtInfo.districtId,
                        name: districtInfo.districtName
                    });
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
