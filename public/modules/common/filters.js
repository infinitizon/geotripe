/**
 * Created by ahassan on 6/16/16.
 */
angular.module('Geotripe', [])
    .filter('titleCase', function() {
        return function(input) {
            input = input || '';
            return input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        };
    })