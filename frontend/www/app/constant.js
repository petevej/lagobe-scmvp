const PAGE = {
    LANGUAGE: "th"
}

const CONFIG = {
    PATH: {
        //APIS: "http://sc.lagobe.com"
        APIS: "http://localhost:3000"
    }
}

angular.module('MainApp')
.constant('PAGE', PAGE)
.constant('CONFIG', CONFIG);
