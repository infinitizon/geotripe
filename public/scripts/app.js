//'use strict';

// declare modules

angular.module('Common', [])
angular.module('Geotripe', [
    'ui.router',
    'ui.bootstrap',
    'ngAnimate',
    'ngStorage',
    'oc.lazyLoad',
    'ngCookies',
    'ngSanitize',
    'ui.utils',
    'ngTouch',
    'Common'
])
    .constant('COLORS', {
        'default': '#e2e2e2',
        primary: '#09c',
        success: '#2ECC71',
        warning: '#ffc65d',
        danger: '#d96557',
        info: '#4cc3d9',
        white: 'white',
        dark: '#4C5064',
        border: '#e4e4e4',
        bodyBg: '#e0e8f2',
        textColor: '#6B6B6B',
    });
