/**
 * Created by Abimbola on 1/21/2017.
 */

angular.module('Reports')
    .controller('rfqReportsController', ['$scope', '$rootScope', '$localStorage', '$state', '$modal', 'DataService','CommonServices','$stateParams','$filter'
        , function ($scope, $rootScope, $localStorage, $state, $modal, DataService, CommonServices, $stateParams, $filter) {

            $scope.options = [{
                "Key": "0",
                "Value": "Select an option"
            }, {
                "Key": "Option1",
                "Value": "Option1"
            }, {
                "Key": "Option2",
                "Value": "Option2"
            }, {
                "Key": "Option3",
                "Value": "Option3"
            }, {
                "Key": "Option4",
                "Value": "Option4"
            }, {
                "Key": "Option5",
                "Value": "Option5"
            }];
            $scope.choices = [{
                id: '0',
                options: angular.copy($scope.options)
            }];
            $scope.addNewChoice = function() {
                var newItemNo = $scope.choices.length + 1;
                $scope.choices.push({
                    id: newItemNo,
                    options: angular.copy($scope.availableOptions)
                });
            };
            $scope.removeChoice = function(choice) {
                $scope.choices.splice(choice, 1);
            };
            $scope.optionSelected = function(choice) {
                console.log(choice);
                var availableOptions = [];
                $scope.availableOptions = $scope.availableOptions || angular.copy($scope.options);
                if (choice.option) {
                    var index = -1;
                    angular.forEach($scope.availableOptions, function(item, i) {
                        if (item.Key === choice.option.Key) {
                            index = i;
                        }
                    });
                    if (index > -1) {
                        $scope.availableOptions.splice(index, 1);
                    }
                }
            };
        }
    ]);