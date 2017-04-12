/**
  * Created By: Pete Vejanurug
  * Email: p@lagobe.com
  * Phone: +66903263755
  */

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
