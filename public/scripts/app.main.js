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
                    sidebarTheme: '',
                    headerTheme: ''
                },
                isMessageOpen: false,
                isConfigOpen: false
            };


            if (angular.isDefined($localStorage.layout)) {
                $scope.app.layout = $localStorage.layout;
            } else {
                $localStorage.layout = $scope.app.layout;
            }

            if (angular.isDefined($localStorage.pages)) {
                $scope.app.pages = $localStorage.pages;
            }

            if (angular.isDefined($localStorage.globals)) {
                $scope.user = {
                    fname: $localStorage.globals.currentUser.userDetails.authDetails.firstname,
                    mname: $localStorage.globals.currentUser.userDetails.authDetails.middlename,
                    lname: $localStorage.globals.currentUser.userDetails.authDetails.lastname,
                    email: $localStorage.globals.currentUser.userDetails.authDetails.email,
                    avatar: 'images/avatar.jpg',
                };
            }
            $scope.$watch('app.layout', function () {
                $localStorage.layout = $scope.app.layout;
            }, true);

            $scope.getRandomArbitrary = function () {
                return Math.round(Math.random() * 100);
            };

            // With this part, I'm able to hide and show pages based on the ROLE assigned to a user
            $scope.app.container = [];
            $scope.app.show = function(roles, authId){
                angular.forEach($localStorage.globals.currentUser.userDetails.authRoles  , function(authRole, key) {
                    if (roles.indexOf(authRole.Name) >= 0){
                        $scope.app.container[authId] = true;
                    } else {
                        $scope.app.container[authId] = false;
                    }
                });
            }
        }
]);