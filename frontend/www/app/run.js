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

angular.module('MainApp')
.run(mainRun);