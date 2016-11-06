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
                if(!angular.isDefined($localStorage.globals) || $localStorage.globals == null){
                    $location.path('/login');
                }
                // redirect to login page if not logged in
                if ($location.path() !== '/login' && !angular.isDefined($localStorage.globals)) {
                    $location.path('/login');
                }
                if(angular.isDefined($localStorage.globals) && $localStorage.globals != null){
                    if($localStorage.globals.currentUser.userDetails.token == null){
                        $location.path('/login');
                    }
                }
            });

            // With this part, I'm able to hide and show pages based on the ROLE assigned to a user
            $rootScope.container = []
            $rootScope.show = function(roles, authId){
                $rootScope.container[authId] = false;
                angular.forEach($localStorage.globals.currentUser.userDetails.authRoles  , function(authRole) {
                    if (roles.indexOf(authRole.Name) >= 0){
                        $rootScope.container[authId] = true;
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
                                        , 'modules/auth/controller.js'
                                    ]
                                }]).then(function () {
                                return $ocLazyLoad.load(['modules/auth/services.js']);
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
                .state('app.profile', {
                    url: '/profile'
                    , templateUrl: 'modules/home/views/profile.html'
                    , controller: 'ProfileController'
                    , resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    insertBefore: '#load_styles_before',
                                    files: [
                                        'vendor/angular-xeditable/css/xeditable.min.css'
                                    ]
                                },
                                {
                                    name: 'xeditable',
                                    files: [
                                        'vendor/angular-xeditable/js/xeditable.min.js'
                                    ]
                                }]).then(function () {
                                return $ocLazyLoad.load(['modules/home/controller.js']);
                            });
                        }]
                    }
                })
                .state('app.procurement', {
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
                        title: 'Quotes'
                    }
                })
                .state('app.procurement.clients', {
                    url: '/'
                    , templateUrl: 'modules/quote/views/quotes.html'
                    , controller: 'QuoteController'
                    , controllerAs : 'quotCtrl'
                })
                .state('app.procurement.status', {
                    url:'/status/:client/:clientStatus'
                    , templateUrl: 'modules/quote/views/quoteByStatus.html'
                    , controller: 'QuoteByStatusController'
                    , controllerAs : 'quotCtrl'
                })

                .state('app.logistics', {
                    url: '/logistics'
                    , template: '<div ui-view></div>'
                    , abstract: true
                })
                .state('app.logistics.list', {
                    url: '/'
                    , templateUrl: 'modules/logistics/views/list.html'
                    , controller: 'LogisticsList'
                    , controllerAs : 'lgstLst'
                    , resolve     : {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    files: ['modules/logistics/controllers/logistics.js']
                                }]).then(function () {
                                return $ocLazyLoad.load(['modules/logistics/controllers/list.js']);
                            });
                        }]
                    }
                    , data: {
                        title: 'Logistics - List'
                    }
                })
                .state('app.logistics.edit', {
                    url: '/edit/:rfq_id'
                    , templateUrl: 'modules/logistics/views/edit.html'
                    , controller: 'LogisticsEdit'
                    , controllerAs : 'lgstEdt'
                    , resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    insertBefore: '#load_styles_before',
                                    files: [
                                        'vendor/angular-xeditable/css/xeditable.min.css'
                                    ]
                                },
                                {
                                    name: 'xeditable',
                                    files: [
                                        'vendor/angular-xeditable/js/xeditable.min.js','modules/logistics/controllers/logistics.js'
                                    ]
                                }]).then(function () {
                                return $ocLazyLoad.load(['modules/logistics/controllers/edit.js']);
                            });
                        }]
                    }
                    , data: {
                        title: 'Logistics - Edit'
                    }
                }).state('app.logistics.view', {
                    url: '/view'
                    , templateUrl: 'modules/logistics/views/view.html'
                    , controller: 'LogisticsView'
                    , controllerAs : 'lgstVw'
                    , resolve : {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    files: ['modules/logistics/controllers/logistics.js']
                                }]).then(function () {
                                return $ocLazyLoad.load(['modules/logistics/controllers/view.js']);
                            });
                        }]
                    }
                    , data: {
                        title: 'Logistics - Edit'
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
        }]);