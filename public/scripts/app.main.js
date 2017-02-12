/**
 * Created by ahassan on 10/15/16.
 */
angular
    .module('Geotripe')
    .controller('AppCtrl', ['$scope', '$http', '$localStorage', '$interval', 'DataService', 'CommonServices'
        , function ($scope, $http, $localStorage, $interval, DataService, CommonServices) {

            $scope.mobileView = 767;

            $scope.app = {
                name: 'Geotripe',
                author: 'infinitizon',
                version: '1.0',
                year: (new Date()).getFullYear(),
                layout: {
                    isSmallSidebar: false,
                    isChatOpen: false,
                    isFixedHeader: true,
                    isFixedFooter: false,
                    isBoxed: false,
                    isStaticSidebar: false,
                    isRightSidebar: false,
                    isOffscreenOpen: false,
                    isConversationOpen: false,
                    isQuickLaunch: false,
                    sidebarTheme: 'sidebar-skin-geoscape',
                    headerTheme: ''
                },
                isMessageOpen: false,
                isConfigOpen: false
            };
            $scope.user = {
                fname:null,
                mname:null,
                lname:null,
                email:null,
                avatar:null
            }
            $scope.notification = {cnt_not:0,data:[]};
            $scope.alerts = function(roles, token){
                $scope.stop = $interval(function() {
                    DataService.get('notification',{params:{not_cnt:1,'roles':roles,'token':token}})
                        .then( function (response) {
                            if(response.data.success==true){
                                $scope.notification.cnt_not = response.data.total_count;
                                $scope.notification.data = response.data.data;
                            }
                        });
                }, 5000);
            }

            if (angular.isDefined($localStorage.globals) && $localStorage.globals != null) {
                $scope.user.fname = $localStorage.globals.currentUser.userDetails.authDetails.firstname;
                $scope.user.mname = $localStorage.globals.currentUser.userDetails.authDetails.middlename;
                $scope.user.lname = $localStorage.globals.currentUser.userDetails.authDetails.lastname;
                $scope.user.email = $localStorage.globals.currentUser.userDetails.authDetails.email;
                $scope.user.avatar = 'uploads/user/avatar.jpg';
                if (!angular.isDefined($scope.stop)) {
                    var roles = [];
                    angular.forEach($localStorage.globals.currentUser.userDetails.authRoles, function(role){
                        roles.push(role.AuthRoles_Id);
                    })
                    $scope.alerts(roles.join(','), $localStorage.globals.currentUser.userDetails.token);
                }
            }

            if (angular.isDefined($localStorage.layout)) {
                $scope.app.layout = $localStorage.layout;
            } else {
                $localStorage.layout = $scope.app.layout;
            }
            if (angular.isDefined($localStorage.pages)) {
                $scope.app.pages = $localStorage.pages;
            }

            $scope.$watch('app.layout', function () {
                $localStorage.layout = $scope.app.layout;
            }, true);

            $scope.getRandomArbitrary = function () {
                return Math.round(Math.random() * 100);
            };
        }

]);