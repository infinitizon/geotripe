/**
 * Created by Abimbola on 12/23/2016.
 */


angular.module('Setup')
    .controller('UserDetailController', ['$localStorage', '$state', '$uibModalInstance', 'DataService','CommonServices','client'
        , function ($localStorage, $state, $uibModalInstance, DataService,CommonServices,client) {
            var vm = this;
            vm.container={};

            vm.result = null;
            vm.edit=true;
            vm.dataLoading = false;
            if(!angular.equals({}, client)){
                vm.allowEdit=true;
            }else{
                vm.allowEdit=false;
            }
            vm.getLOVs = function(factName, selectScope, options) {
                if (vm.container[selectScope] == null) {
                    if(options.placeholder)
                        vm.container[selectScope] = [options.placeholder];
                    else
                        vm.container[selectScope] = [{'id':1,'name':'Loading please wait...'}];

                    var data = angular.copy(CommonServices.postData);
                    data.factName = factName;
                    data.transactionMetaData.responseDataProperties = options.response;
                    if(options.and){
                        data.transactionMetaData.queryMetaData.queryClause.andExpression = options.and;
                    }
                    angular.isDefined(options.pageno)? data.transactionMetaData.pageno=options.pageno:'';
                    DataService.post('inboundService', data).then( function (response) {
                        vm.container[selectScope] = response.data.data;
                        if(options.placeholder) vm.container[options.placeholder] = null;
                    });
                }
            };
            vm.close = function(){
                $uibModalInstance.close();
            }
            vm.newPwd = function(){
                if(vm.user == null){
                    vm.result = 'Failure';
                    vm.message = "You need to start creating a user first";
                }else{
                    vm.result = null;
                    newPwd = CommonServices.createRand();
                    vm.newPwdVal = newPwd;
                    vm.user.password = CommonServices.md5Hash(vm.newPwdVal);
                }
            }
            /* This part helps get the Roles of a user */
            var data=angular.copy(CommonServices.postData);
            data.factName = 'AuthRoles a, User_AuthRole b';
            data.transactionMetaData.responseDataProperties = "a.authroles_id&a.name&a.description&IF(b.authroles_authroles_id,'true','false')ius_yn";
            theuserId = (typeof client.user_id === "undefined")?'null':client.user_id;
            data.transactionMetaData.queryMetaData.joinClause = {
                'joinType':['LEFT JOIN'],'joinKeys':['a.authroles_id = b.authroles_authroles_id AND b.users_user_id = '+theuserId]
            }
            DataService.post('inboundService', data).then(function (response) {
                vm.userRoles = response.data.data;
                vm.originalUserRolesData = angular.copy(vm.userRoles);
            })
            /* This part helps get the user details */
            var data=angular.copy(CommonServices.postData);
            if(client.user_id) {
                data.factName = 'Users u,Party p';
                data.transactionMetaData.responseDataProperties = "u.user_id&u.firstname&u.middlename&u.lastname&u.workphonenumber&u.contactphonenumber&CONCAT('{\"party_id\":',u.user_party_id,',\"name\":\"',p.name,'\"}')user_party&u.isauthorizedperson&u.username&u.email&u.password&u.token&u.enabled&u.accountlocked&u.accountexpirationtime&u.credentialsexpirationtime&u.datecreated&u.datemodified";
                data.transactionMetaData.queryMetaData.queryClause.andExpression = [
                    {
                        "propertyName": "user_id",
                        "propertyValue": client.user_id,
                        "propertyDataType": "BIGINT",
                        "operatorType": "="
                    }
                ];
                data.transactionMetaData.queryMetaData.joinClause = {
                    'joinType':['JOIN'],'joinKeys':['u.user_party_id=p.Party_Id']
                }
                DataService.post('inboundService', data).then(function (response) {
                    vm.user = response.data.data[0];
                    vm.user.user_party = JSON.parse(vm.user.user_party);
                    vm.originalUserData = angular.copy(vm.user);
                    vm.total_count = response.data.total_count;
                })

            }else{
                vm.user = {
                    firstname:null,
                    middlename:null,
                    lastname:null,
                    workphonenumber:null,
                    contactphonenumber:null,
                    isauthorizedperson:null,
                    username:null,
                    email:null,
                    password:null,
                    user_party:{'party_id':1,'name':'Select user company'},
                    enabled:null,
                    accountlocked:null,
                    accountexpirationtime:null,
                    credentialsexpirationtime:null,
                    datecreated:null,
                    datemodified:null
                };
                vm.originalUserData = angular.copy(vm.user);
                vm.userViews = null;
            }
            vm.saveUser = function(){
                vm.newUser = angular.copy(vm.user);

                if(vm.user==null){
                    vm.result = 'Failure';
                    vm.message = "User data is empty, Fill in the required fields first";
                    return;
                }
                vm.result = null;
                vm.dataLoading = true;
                var data=angular.copy(CommonServices.postData);

                vm.originalUserViewsFromDb = [];
                vm.userRolesCheckedArray = [];
                vm.userRolesUnCheckedArray = [];
                vm.insert = [];
                vm.update = [];

                angular.forEach(vm.userRoles, function(userRole){
                    if (userRole.ius_yn=="true"){
                        vm.userRolesCheckedArray.push(userRole.authroles_id);
                    }else{
                        vm.userRolesUnCheckedArray.push(userRole.authroles_id);
                    }
                });

                var data = new FormData();
                data.append("factName", "Users");
                data.append("token", $localStorage.globals.currentUser.userDetails.token);
                data.append("transactionMetaData[currentLocale]", "NG");
                data.append("transactionMetaData[queryStore]", "MySql");
                vm.changedUsrObjs = CommonServices.GetFormChanges(vm.originalUserData, vm.user);
                if(vm.originalUserData.user_party.party_id != vm.user.user_party.party_id) vm.changedUsrObjs.user_party_id = vm.user.user_party.party_id;
                delete vm.changedUsrObjs.user_party;

                data.append("factObjects[rolesChecked]", [JSON.stringify(vm.userRolesCheckedArray)]);
                if(vm.user.user_id ) { //We are in the edit mode and trying to update stuff
                    vm.changedUsrObjs['id'] = vm.user.user_id;
                    data.append("transactionEventType", "UPDATE");
                    data.append("factObjects[users]", [JSON.stringify(vm.changedUsrObjs)]);
                    data.append("factObjects[rolesUnChecked]", [JSON.stringify(vm.userRolesUnCheckedArray)]);

                    DataService.post('users', data, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined, 'Process-Data': false}
                    }).then(function (response) {
                        if(response.data.response == "Failure") {
                            vm.result = response.data.response;
                            vm.message += "Error updating user... " + response.data.message;
                            vm.user = angular.copy(vm.newUser);
                        }else{
                            vm.result = response.data.response;
                            vm.message = response.data.message;
                            $uibModalInstance.close();
                        }
                    })
                }else if(vm.user.user_id == null){ //A new insert
                    vm.user.user_party_id = vm.user.user_party.party_id
                    delete vm.user.user_party;
                    data.append("transactionEventType", "PUT");
                    data.append("factObjects[users]", [JSON.stringify(vm.user)]);
                    if(vm.user == null){
                        vm.dataLoading = false;
                        vm.result = 'Failure';
                        vm.message = "You need to create a user first";
                        vm.user = angular.copy(vm.newUser);
                    }else if(vm.userRolesCheckedArray.length == 0){
                        vm.dataLoading = false;
                        vm.result = 'Failure';
                        vm.message = "You need to add Roles to the user";
                        vm.user = angular.copy(vm.newUser);
                        vm.activeUsrTab = 1
                    }else{
                        DataService.post('users', data, {
                            transformRequest: angular.identity,
                            headers: {'Content-Type': undefined, 'Process-Data': false}
                        }).then(function (response) {
                            vm.dataLoading = false;
                            if(response.data.response == "Failure") {
                                vm.result = response.data.response;
                                vm.message = "Error saving user... " + response.data.message;
                                vm.user = angular.copy(vm.newUser);
                            }else{
                                vm.result = response.data.response;
                                vm.message = response.data.message;
                                $uibModalInstance.close();
                            }
                        })
                    }

                }
            }
        }
    ]);