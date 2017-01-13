angular.module('Home',[])
    .controller('HomeController', ['$scope', '$localStorage', '$rootScope', 'CommonServices','DataService'
        , function ($scope, $localStorage, $rootScope, CommonServices, DataService) {
            var vm = this;
            console.log("Now in home/controller.js");

            // reset login status
            //vm.pages = $rootScope.globals.currentUser.userDetails.authViews;
            CommonServices.postData.token = $localStorage.globals.currentUser.userDetails.token;
            var data=angular.copy(CommonServices.postData);
            data.transactionEventType = 'QuoteStat';
            DataService.post('dashboard', data).then(function (response) {
                vm.QuotesDataset = response.data.data
                vm.QuotesOptions = {
                    series: {
                        pie: {
                            show: true,
                            innerRadius: 0.5,
                            stroke: {
                                width: 0
                            },
                            label: {
                                show: true,
                            }
                        }
                    },
                    legend: {
                        show: true
                    },
                    grid: {
                        hoverable: true,
                        clickable: true
                    }
                };
            })

            vm.flotClick=function(event, pos, item){
                console.log(event)
                console.log(pos)
                console.log(item)
            }

        }])
    .controller('ProfileController', ['$scope', '$location', '$localStorage', 'DataService', 'CommonServices'
        , function ($scope, $location, $localStorage, DataService, CommonServices) {
            var vm = this;

            vm.showLoading = false; //hides the loading image on an overlay
            CommonServices.postData.token = $localStorage.globals.currentUser.userDetails.token;
            vm.profile = angular.copy($localStorage.globals.currentUser.userDetails.authDetails);

            vm.update = function(){
                var changes = {};
                var data = new FormData();
                data.append("factName", "Users");
                data.append("token", CommonServices.postData.token);
                data.append("transactionMetaData[currentLocale]", "NG");
                data.append("transactionMetaData[queryStore]", "MySql");
                data.append("transactionEventType", "Update");

                vm.profile.firstname != $localStorage.globals.currentUser.userDetails.authDetails.firstname ?changes['firstname']=vm.profile.firstname:'';
                vm.profile.middlename != $localStorage.globals.currentUser.userDetails.authDetails.middlename ?changes['middlename']=vm.profile.middlename:'';
                vm.profile.lastname != $localStorage.globals.currentUser.userDetails.authDetails.lastname ?changes['lastname']=vm.profile.lastname:'';
                vm.profile.username != $localStorage.globals.currentUser.userDetails.authDetails.username ?changes['username']=vm.profile.username:'';
                vm.profile.email != $localStorage.globals.currentUser.userDetails.authDetails.email ?changes['email']=vm.profile.email:'';
                vm.profile.workphonenumber != $localStorage.globals.currentUser.userDetails.authDetails.workphonenumber ?changes['workphonenumber']=vm.profile.workphonenumber:'';
                vm.profile.contactphonenumber != $localStorage.globals.currentUser.userDetails.authDetails.contactphonenumber ?changes['contactphonenumber']=vm.profile.contactphonenumber:'';

                if(vm.profile.pix){
                    var file = vm.profile.pix;
                    data.append("file[]", file);
                }


                var performUpdt = function(){
                    if( !angular.equals({}, changes) ){
                        changes['id'] = vm.profile.user_id;
                        data.append("factObjects", [JSON.stringify(changes)]);
                        DataService.post("inboundService", data, {
                            transformRequest: angular.identity,
                            headers: {'Content-Type': undefined, 'Process-Data': false}
                        }).then( function (response) {
                            vm.showLoading = false; //hides the loading image on an overlay
                            if(response.data.response == 'Failure'){
                                vm.error=response.data.message;
                                vm.isDisabled = false;
                                vm.dataLoading = false;
                            }else{
                                vm.error=response.data.message;
                                vm.isDisabled = false;
                                vm.dataLoading = false;
                                vm.lineItems = [];
                                vm.quoteFiles = null;
                            }
                            //vm.container[selectScope] = response.data.data;
                        });
                    }else{
                        vm.showLoading = false; //hides the loading image on an overlay
                        console.log('No changes');
                    }
                }
                if(vm.oldPwd || vm.newPwd || vm.newPwdAgain){
                    if(!vm.oldPwd || vm.oldPwd==''){
                        alert('You need to verify your old password');return;
                    }
                    if(!vm.newPwd || vm.newPwd==''){
                        alert('You need to enter a preferred password');return;
                    }
                    if(!vm.newPwdAgain || vm.newPwdAgain==''){
                        alert('You need to verify your preferred password');return;
                    }
                    if(vm.newPwd != vm.newPwdAgain){
                        alert('The entered preferred passwords does not match');return;
                    }
                    var pwdData=angular.copy(CommonServices.postData);
                    pwdData.factName = 'Users u';
                    pwdData.transactionMetaData.responseDataProperties = 'u.password';
                    pwdData.transactionMetaData.queryMetaData.queryClause.andExpression = [{
                        "propertyName": "u.user_id",
                        "propertyValue": vm.profile.user_id,
                        "propertyDataType": "BIGINT",
                        "operatorType": "="
                    }];
                    vm.showLoading = true; //Shows a loading image on an overlay
                    DataService.post('inboundService', pwdData).then(function (response) {
                        if(CommonServices.md5Hash(vm.oldPwd) == response.data.data[0].password){
                            changes['id'] = vm.profile.user_id;
                            changes['password'] = CommonServices.md5Hash(vm.newPwd)

                            performUpdt(changes)
                        }else{
                            alert('The old password you entered is incorrect')
                            vm.showLoading = false; //hides the loading image on an overlay
                        }
                    })
                }else{
                    vm.showLoading = true; //Shows a loading image on an overlay
                    performUpdt(changes);
                }
            }

        }])