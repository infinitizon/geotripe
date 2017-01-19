/**
 * Created by ahassan on 10/15/16.
 */
angular
    .module('Geotripe')
    .controller('AppCtrl', ['$scope', '$http', '$localStorage',
        function ($scope, $http, $localStorage) {

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
            if (angular.isDefined($localStorage.globals) && $localStorage.globals != null) {
                $scope.user.fname = $localStorage.globals.currentUser.userDetails.authDetails.firstname;
                $scope.user.mname = $localStorage.globals.currentUser.userDetails.authDetails.middlename;
                $scope.user.lname = $localStorage.globals.currentUser.userDetails.authDetails.lastname;
                $scope.user.email = $localStorage.globals.currentUser.userDetails.authDetails.email;
                $scope.user.avatar = 'uploads/user/avatar.jpg';
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