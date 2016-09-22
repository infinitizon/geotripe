/**
 * Created by ahassan on 8/3/16.
 */
angular.module('Common')
    .directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function(){
                    scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }]).directive('input', function() {
        return {
            restrict: 'E',
            require: '?ngModel',
            link: function(scope, element, attrs, ngModel) {
                if (
                    'undefined' !== typeof attrs.type
                    && 'number' === attrs.type
                    && ngModel
                ) {
                    ngModel.$parsers.push(function (value) {
                        return '' + value;
                    });
                    ngModel.$formatters.push(function (value) {
                        return parseFloat(value);
                    });
                }
            }
        };
    }).directive('importFromExcel',
        ['ImportExportToExcel',
            function(ImportExportToExcel) {
                //Factory object ImportExportToExcel would be needed.
                return {
                    restrict: 'A',
                    link: function (scope, element) {
                        element.on('change',function (event) {
                            ImportExportToExcel.importFromExcel(event);
                        });
                    }
                };
    }]);