/**
 * Created by ahassan on 10/15/16.
 */
angular
    .module('Geotripe')
    .run(['$rootScope', '$location', '$cookieStore', '$localStorage',
        function ($rootScope, $location, $cookieStore, $localStorage) {
            // keep user logged in after page refresh
            $rootScope.globals = $localStorage.globals || {};

            //$rootScope.$on('$locationChangeStart', function (event, next, current) {
            //    // redirect to login page if not logged in
            //    if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
            //        console.log($rootScope.globals.currentUser);
            //        $location.path('/login');
            //    }
            //});

            //$rootScope.show = function(roles, authId){
            //    angular.forEach($rootScope.globals.currentUser.userDetails.authRoles  , function(authRole, key) {
            //        if (roles.indexOf(authRole.Name) >= 0){
            //            $rootScope.container[authId] = true;
            //        } else {
            //            $rootScope.container[authId] = false;
            //        }
            //    });
            //}
        }])
    .config(['$stateProvider','$sceDelegateProvider','$httpProvider', '$urlMatcherFactoryProvider', '$urlRouterProvider', '$compileProvider'
        , function ($stateProvider,$sceDelegateProvider,$httpProvider, $urlMatcherFactoryProvider, $urlRouterProvider, $compileProvider) {

            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|javascript|chrome-extension):/);

            $urlMatcherFactoryProvider.caseInsensitive(true);
            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];

            $sceDelegateProvider.resourceUrlWhitelist([
                'self',
                'http://127.0.0.1:8090**'
            ]);
            $urlRouterProvider.otherwise('/login');

            $stateProvider
                .state('login', {
                    url         :'/login'
                    , templateUrl : '/modules/auth/views/login.html'
                    , controller  : 'LoginController'
                    , controllerAs: 'loginCtrl'
                    , resolve     : {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    files: [
                                        'css/login.css'
                                    ]
                                }]).then(function () {
                                return $ocLazyLoad.load(['modules/auth/controller.js', 'modules/auth/services.js']);
                            });
                        }]
                    }
                })
                .state('app', {
                    abstract: true
                    , templateUrl: 'modules/common/views/layout.html'
                })
                .state('app.home', {
                    url: '/home'
                    , templateUrl: 'modules/home/views/home.html'
                })
                .state('app.quotes', {
                    template: '<div ui-view></div>',
                    abstract: true,
                    url: '/quotes'
                    , resolve     : {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    files: ['modules/quote/css/quote.css']
                                }]).then(function () {
                                return $ocLazyLoad.load(['modules/quote/controller.js', 'modules/quote/services.js']);
                            });
                        }]
                    }
                })
                .state('app.quotes.clients', {
                    url: '/'
                    , templateUrl: 'modules/quote/views/quotes.html'
                    , controller: 'QuoteController'
                    , controllerAs : 'quotCtrl'
                })
                .state('app.quotes.status', {
                    url:'/status/:client/:clientStatus'
                    , templateUrl: 'modules/quote/views/quoteByStatus.html'
                    , controller: 'QuoteByStatusController'
                    , controllerAs : 'quotCtrl'
                })
                .state('app.precurement', {
                    url: '/precurement'
                    , templateUrl: 'modules/home/views/home.html'
                })

                .state('app.setup', {
                    template: '<div ui-view></div>',
                    abstract: true,
                    url: '/setup'
                })
                .state('app.setup.test', {
                    url: '/test',
                    templateUrl: 'modules/home/views/home.html',
                    data: {
                        title: 'Buttons',
                    }
                })
        }])