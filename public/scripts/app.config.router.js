/**
 * Created by ahassan on 10/15/16.
 */
angular
    .module('Geotripe')
    .run(['$state', '$stateParams', '$rootScope', '$location', '$cookieStore', '$localStorage'
        , function ($state, $stateParams, $rootScope, $location, $cookieStore, $localStorage) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $rootScope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            FastClick.attach(document.body);
            //$uibModalStack.dismissAll();
            // keep user logged in after page refresh
            $rootScope.globals = $localStorage.globals || {};
            $rootScope.$on('$locationChangeStart', function (ev, next, current) {
                // redirect to login page if not logged in
                if(!angular.isDefined($localStorage.globals) || $localStorage.globals == null){
                    if($state.current.name == 'login.reset' || $state.current.name == 'login.request-reset' || next.indexOf("reset") !=-1 || next.indexOf("request-reset") !=-1 ){
                        '';
                    } else{
                        $location.path('/login');
                    }
                }
                if ($location.path() !== '/login' && !angular.isDefined($localStorage.globals)) {
                    if($state.current.name == 'login.reset' || $state.current.name == 'login.request-reset' || next.indexOf("reset") !=-1 || next.indexOf("request-reset") !=-1){
                        '';
                    } else{
                        $location.path('/login');
                    }
                }
                if(angular.isDefined($localStorage.globals) && $localStorage.globals != null){
                    if($localStorage.globals.currentUser.userDetails.token == null){
                        if($state.current.name == 'login.reset' || $state.current.name == 'login.request-reset' || next.indexOf("reset") !=-1 || next.indexOf("request-reset") !=-1){
                            '';
                        } else{
                            $location.path('/login');
                        }
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
            //$urlRouterProvider.otherwise('/login');

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
                                    files: ['modules/auth/css/login.css', 'modules/auth/controller.js']
                                }]).then(function () {
                                return $ocLazyLoad.load(['modules/auth/services.js']);
                            });
                        }]
                    }
                    , data: {
                        title: 'Login',
                    }
                })
                .state('login.request-reset', {
                    url         :'/request-reset'
                    , templateUrl : '/modules/auth/views/login.request.reset.html'
                    , controller  : 'RequestResetController'
                    , controllerAs: 'rrCtrl'
                    , resolve     : {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    files: ['modules/auth/css/login.css', 'modules/auth/controller.js']
                                }]).then(function () {
                                return $ocLazyLoad.load(['modules/auth/services.js']);
                            });
                        }]
                    }
                    , data: {
                        title: 'Forgotten Password',
                    }
                })
                .state('login.reset', {
                    url         :'/reset/:h/:t'
                    , templateUrl : '/modules/auth/views/login.reset.html'
                    , controller  : 'NewPasswordController'
                    , controllerAs: 'npCtrl'
                    , resolve     : {
                        validate :['DataService', '$stateParams', function(DataService, $stateParams) {
                            return DataService.post('password/check', {h:$stateParams.h,t:$stateParams.t}, {})
                                .then(function (response) {
                                    return response.data;
                                });
                        }]
                        , deps: ['$ocLazyLoad', function ($ocLazyLoad) {
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
                    , data: {
                        title: 'Reset Password'
                    }
                })
                .state('app', {
                    abstract: true
                    , templateUrl: 'modules/common/views/layout.html'
                })
                .state('app.home', {
                    url: '/home'
                    , templateUrl: 'modules/home/views/home.html'
                    , controller: 'HomeController'
                    , controllerAs: 'HomeCtrl'
                    , resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    insertBefore: '#load_styles_before',
                                    files: [
                                        'vendor/checkbo/src/0.1.4/css/checkBo.min.css',
                                        'vendor/chosen_v1.4.0/chosen.min.css'
                                    ]
                                },
                                {
                                    serie: true,
                                    files: [
                                        'vendor/flot/jquery.flot.js',
                                        'vendor/flot/jquery.flot.resize.js',
                                        'vendor/flot/jquery.flot.categories.js',
                                        'vendor/flot/jquery.flot.stack.js',
                                        'vendor/flot/jquery.flot.time.js',
                                        'vendor/flot/jquery.flot.pie.js',
                                        'vendor/flot-spline/js/jquery.flot.spline.js',
                                        'vendor/flot.orderbars/js/jquery.flot.orderBars.js'
                                    ]
                                },
                                {
                                    name: 'angular-flot',
                                    files: [
                                        'vendor/angular-flot/angular-flot.js'
                                    ]
                                },{
                                    files: [
                                        'vendor/checkbo/src/0.1.4/js/checkBo.min.js',
                                        'vendor/chosen_v1.4.0/chosen.jquery.min.js'
                                    ]
                                }]).then(function () {
                                return $ocLazyLoad.load('modules/home/controller.js');
                            });
                        }]
                    }
                    , data: {
                        title: 'Dashboard',
                    }
                })
                .state('app.profile', {
                    url: '/profile'
                    , templateUrl: 'modules/home/views/profile.html'
                    , controller: 'ProfileController'
                    , controllerAs : 'profCtrl'
                    , resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    insertBefore: '#load_styles_before',
                                    files: ['vendor/angular-xeditable/css/xeditable.min.css']
                                },
                                {
                                    name: 'xeditable',
                                    files: ['vendor/angular-xeditable/js/xeditable.min.js']
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
                                    files: ['modules/quote/css/quote.css','modules/quote/controllers/procurement.js']
                                }]).then(function () {
                                return $ocLazyLoad.load(['modules/quote/services.js']);
                            });
                        }]
                    }
                    , data: {
                        title: 'Quotes'
                    }
                })
                .state('app.procurement.clients', {
                    url: '/'
                    , templateUrl: 'modules/quote/views/quotes.list.html'
                    , controller: 'QuoteController'
                    , controllerAs : 'quotCtrl'
                    , resolve     : {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    files: ['modules/quote/controllers/procurement.js','modules/quote/services.js']
                                }]).then(function () {
                                return $ocLazyLoad.load(['modules/quote/controllers/quotes.list.js']);
                            });
                        }]
                    }
                })
                .state('app.procurement.clients.status', {
                    url:'status/:client/:clientStatus'
                    , templateUrl: 'modules/quote/views/quote-by-status.html'
                    , controller: 'QuoteByStatusController'
                    , controllerAs : 'quotCtrl'
                    , resolve     : {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    files: ['modules/quote/controllers/procurement.js','modules/quote/services.js']
                                }]).then(function () {
                                return $ocLazyLoad.load(['modules/quote/controllers/controller.js']);
                            });
                        }]
                    }
                })
                .state('app.procurement.clients.status.print', {
                    url:'/print/:print'
                    , templateUrl: 'modules/quote/views/printRFQ.html'
                    , controller: 'PrintRFQController'
                    , controllerAs : 'printCtrl'
                    , resolve     : {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    files: ['modules/quote/controllers/procurement.js','modules/quote/services.js']
                                }]).then(function () {
                                return $ocLazyLoad.load(['modules/quote/controllers/print.js']);
                            });
                        }]
                    }
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
                .state('app.reports', {
                    url: '/reports'
                    , template: '<div ui-view></div>'
                    , abstract: true
                })
                .state('app.reports.rfq', {
                    url: '/rfq'
                    , templateUrl: 'modules/reports/views/rfq.html'
                    , controller: 'rfqReportsController'
                    , controllerAs : 'rfqCtrl'
                    , resolve     : {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    files: ['modules/reports/controllers/reports.js']
                                }]).then(function () {
                                return $ocLazyLoad.load(['modules/reports/controllers/rfq.js']);
                            });
                        }]
                    }
                    , data: {
                        title: 'RFQ report'
                    }
                })
                .state('app.setup', {
                    template: '<div ui-view></div>'
                    , abstract: true
                    , url: '/setup'
                })
                .state('app.setup.clients', {
                    url: '/clients'
                    , templateUrl: 'modules/setup/views/clients.list.html'
                    , controller: 'PartyController'
                    , controllerAs: 'PartyCtrl'
                    , resolve : {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    files: ['modules/setup/controllers/setup.js', 'modules/setup/services.js']
                                }]).then(function () {
                                return $ocLazyLoad.load(['modules/setup/controllers/clients.list.js']);
                            });
                        }]
                    }
                    , data: {
                        title: 'Setup - Clients'
                    }
                })
                .state('app.setup.users', {
                    url: '/users'
                    , templateUrl: 'modules/setup/views/users.list.html'
                    , controller: 'UserController'
                    , controllerAs: 'UsrCtrl'
                    , resolve : {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    files: ['modules/setup/controllers/setup.js', 'modules/setup/services.js']
                                }]).then(function () {
                                return $ocLazyLoad.load(['modules/setup/controllers/users.list.js']);
                            });
                        }]
                    }
                    , data: {
                        title: 'Setup - Users'
                    }
                })
        }]);