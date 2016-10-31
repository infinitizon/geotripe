/**
 * Created by ahassan on 10/15/16.
 */
angular
    .module('Geotripe')
    .run(['$state', '$stateParams', '$rootScope', '$location', '$cookieStore', '$localStorage',
        function ($state, $stateParams, $rootScope, $location, $cookieStore, $localStorage) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;

            $rootScope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            FastClick.attach(document.body);

            // keep user logged in after page refresh
            $rootScope.globals = $localStorage.globals || {};

            $rootScope.$on('$locationChangeStart', function (event, next, current) {
                // redirect to login page if not logged in
                if ($location.path() !== '/login' && $localStorage.globals.currentUser.userDetails.token == null) {
                    $location.path('/login');
                }
            });

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
                                        'modules/auth/css/login.css'
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
                    , data: {
                        title: 'Quotes',
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

                .state('app.procurement', {
                    url: '/procurement'
                    , template: '<div ui-view></div>'
                    , abstract: true
                    , resolve     : {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load(['modules/procurement/controllers/procurement.js']);
                        }]
                    }
                })
                .state('app.procurement.list', {
                    url: '/'
                    , templateUrl: 'modules/procurement/views/list.html'
                    , controller: 'ProcurementList'
                    , controllerAs : 'ProcLst'
                    , resolve     : {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load(['modules/procurement/controllers/list.js']);
                        }]
                    }
                    , data: {
                        title: 'Procurement - List'
                    }
                })
                .state('app.procurement.edit', {
                    url: '/edit/:rfq_id'
                    , templateUrl: 'modules/procurement/views/edit.html'
                    , controller: 'ProcurementEdit'
                    , controllerAs : 'ProcEdt'
                    , resolve : {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load(['modules/procurement/controllers/edit.js']);
                        }]
                    }
                    , data: {
                        title: 'Procurement - Edit'
                    }
                })

                .state('app.setup', {
                    template: '<div ui-view></div>'
                    , abstract: true
                    , url: '/setup'
                    , resolve     : {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load(['modules/setup/controller.js', 'modules/setup/services.js']);
                        }]
                    }
                })
                .state('app.setup.clients', {
                    url: '/clients'
                    , templateUrl: 'modules/setup/views/templates/party.html'
                    , controller: 'PartyController'
                    , controllerAs: 'PartyCtrl'
                    , data: {
                        title: 'Setup - Clients'
                    }
                })
                .state('app.setup.users', {
                    url: '/users'
                    , templateUrl: 'modules/setup/views/templates/user.html'
                    , controller: 'UserController'
                    , controllerAs: 'UsrCtrl'
                    , data: {
                        title: 'Setup - Users'
                    }
                })
        }])