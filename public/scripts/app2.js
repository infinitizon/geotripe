//'use strict';

angular.module('Common', []);
angular.module('Auth', ['Common']);
angular.module('Home', []);
angular.module('RFQ', ['Common'])
angular.module('Setup', ['Common']);
 
angular.module('School', ['ui.router', 'ngCookies', 'ngSanitize', 'ui.bootstrap', 'ui.select','angularUtils.directives.dirPagination', 'xeditable', 'Auth', 'Home', 'RFQ', 'Setup'])
    .config(['$stateProvider', '$httpProvider', '$urlMatcherFactoryProvider', '$urlRouterProvider', '$compileProvider'
        , function ($stateProvider, $httpProvider, $urlMatcherFactoryProvider, $urlRouterProvider, $compileProvider) {
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(|blob|):/);

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
                    views: {
                        'login': {
                            templateUrl: 'modules/auth/views/login.html',
                            controller: 'LoginController',
                            controllerAs : 'loginCtrl'
                        }
                    }
                })
                 .state('home', {
                     url:'/home',
                     views: {
                         'app_pages': {
                             templateUrl: 'modules/home/views/home.html',
                             controller: 'HomeController',
                             controllerAs : 'homeCtrl'
                         }
                     }
                 })
                 .state('home.profile', {
                     url:'/profile',
                     views: {
                         'home_pg': {
                             templateUrl: 'modules/home/views/profile.html',
                             controller: 'ProfileController',
                             controllerAs : 'proCtrl'
                         }
                     }

                 })
                 .state('setup', {
                     url:'/setup',
                     views: {
                         'app_pages': {
                             templateUrl: 'modules/setup/views/setup.html',
                             controller: 'SetupController',
                             controllerAs : 'setupCtrl'
                         }
                     }
                 })
                 .state('quotes', {
                     url:'/quotes',
                     views: {
                         'app_pages': {
                             templateUrl: 'modules/quote/views/quotes.html',
                             controller: 'QuoteController',
                             controllerAs : 'quotCtrl'
                         }
                     }
                 })
                 .state('quoteStatus', {
                     url:'/quotestatus/:client/:clientStatus',
                     views: {
                         'app_pages': {
                             templateUrl: 'modules/quote/views/quoteByStatus.html',
                             controller: 'QuoteByStatusController',
                             controllerAs : 'quotCtrl'
                         }
                     }
                })
    }])
    .run(['$rootScope', '$location', '$cookieStore', '$modalStack', 'editableOptions'
        , function ($rootScope, $location, $cookieStore,$modalStack, editableOptions) {
            editableOptions.theme = 'bs3';
             // keep user logged in after page refresh
             $rootScope.globals = $cookieStore.get('globals') || {};
             $rootScope.$on('$locationChangeStart', function (event, next, current) {
                 $modalStack.dismissAll();
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
            // With this part, I'm able to hide and show pages based on the ROLE assigned to a user
            $rootScope.container = [];
            $rootScope.show = function(roles, authId){
               angular.forEach($rootScope.globals.currentUser.userDetails.authRoles  , function(authRole, key) {
                   if (roles.indexOf(authRole.Name) >= 0){
                       $rootScope.container[authId] = true;
                   } else {
                       $rootScope.container[authId] = false;
                   }
               });
            }
    }])