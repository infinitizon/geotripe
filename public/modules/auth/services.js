'use strict';
/**
 * Created by ahassan on 6/10/16.
 */

angular.module('Auth')
    .factory('AuthenticationService',
            ['Base64', '$http', '$localStorage', '$rootScope', '$state', 'DataService',
                function (Base64, $http, $localStorage, $rootScope, $state, DataService) {
            var service = {};

            service.Login = function (username, password, callback) {
                var data = {
                    usr:username,
                    pwd:Base64.encode(password)
                }
               DataService.post('login', data).then(function (response) {
                  callback(response);
               });
            };
            service.SetCredentials = function (details) {
                $localStorage.globals = {
                    "currentUser": {
                        "userDetails":details
                    }
                };
                $localStorage.pages = $localStorage.globals.currentUser.userDetails.appPages;
            };

            service.ClearCredentials = function (callback) {
                if($localStorage.globals && $localStorage.globals.currentUser.userDetails.token!=null) {
                    var data = {
                        token : $localStorage.globals.currentUser.userDetails.token
                    }
                    DataService.post('logout', data).then(function (response) {
                        if(response.data.response=='Success' && angular.isDefined($localStorage.globals)){
                            $localStorage.globals.currentUser.userDetails.token=null;
                        }
                        callback(response);
                    });
                }
                $rootScope.globals = {};
                //$localStorage.removeItem(globals);
            };

            return service;
        }])

    .factory('Base64', function () {
        /* jshint ignore:start */

        var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

        return {
            encode: function (input) {
                var output = "";
                var chr1, chr2, chr3 = "";
                var enc1, enc2, enc3, enc4 = "";
                var i = 0;

                do {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);

                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;

                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }

                    output = output +
                        keyStr.charAt(enc1) +
                        keyStr.charAt(enc2) +
                        keyStr.charAt(enc3) +
                        keyStr.charAt(enc4);
                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";
                } while (i < input.length);

                return output;
            }
        };

        /* jshint ignore:end */
    });