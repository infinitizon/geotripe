//'use strict';

angular.module('Common', []);
angular.module('Auth', ['Common']);
angular.module('Home', []);
 
angular.module('School', ['Auth', 'Home', 'ui.router', 'ngCookies'])
   .config(['$stateProvider', '$httpProvider', '$urlMatcherFactoryProvider', '$urlRouterProvider'
      , function ($stateProvider, $httpProvider, $urlMatcherFactoryProvider, $urlRouterProvider) {
         $urlRouterProvider.otherwise('/login');
         $urlMatcherFactoryProvider.caseInsensitive(true);

         //Set default headers to $http
         $httpProvider.defaults.useXDomain = true;
         $httpProvider.defaults.withCredentials = true;
         delete $httpProvider.defaults.headers.common["X-Requested-With"];
         $httpProvider.defaults.headers.common["Accept"] = "application/json";
         
         $stateProvider
            .state('login', {
                url:'/login',
                templateUrl: 'modules/auth/views/login.html',
                controller: 'LoginController',
                controllerAs : 'loginCtrl'
            })
            .state('home', {
               url:'/home',
               templateUrl: 'modules/home/views/home.html',
               controller: 'HomeController',
               controllerAs : 'homeCtrl'
            })
   }])
   .run(['$rootScope', '$location', '$cookieStore'
      , function ($rootScope, $location, $cookieStore) {
         // keep user logged in after page refresh
         $rootScope.globals = $cookieStore.get('globals') || {};
         $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
         });

         $rootScope.authenticated = false;
//            Data.get('session').then(function (results) {
//                if (results.uid) {
//                    $rootScope.authenticated = true;
//                    $rootScope.uid = results.uid;
//                    $rootScope.name = results.name;
//                    $rootScope.email = results.email;
//                } else {
//                    var nextUrl = next.$$route.originalPath;
//                    if (nextUrl == '/signup' || nextUrl == '/login') {
//
//                    } else {
//                        $location.path("/login");
//                    }
//                }
//            });
      }])