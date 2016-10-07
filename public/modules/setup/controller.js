angular.module('Setup')
    .controller('SetupController', ['$location', '$rootScope', '$uibModal',
        function ($location, $rootScope, $uibModal) {
            var vm = this;
            // reset login status

            vm.open = function (options) {
                switch(options.url) {
                    case 'user':
                        options.controller = 'UserController';
                        options.controllerAs = 'UsrCtrl';
                        break;
                    case 'roles':
                        options.controller = 'RolesController';
                        options.controllerAs = 'RoleCtrl';
                        break;
                    default:
                        options.controller = 'PartyController';
                        options.controllerAs = 'PartyCtrl';
                }
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'modules/setup/views/templates/'+options.url+'.html',
                    controller: options.controller,
                    controllerAs: options.controllerAs,
                    size: options.modalSize
                });

                modalInstance.result.then(function (selectedItem) {
                    console.log(selectedItem);
                }, function () {
                    console.log('Modal dismissed at: ' + new Date());
                });
            };
        }])
    .controller('RolesController', ['$rootScope','$uibModalInstance','DataService','CommonServices',
        function ($rootScope, $uibModalInstance,DataService,CommonServices) {
            var vm = this;

        }])

    .controller('PartyController', ['$rootScope','$uibModalInstance','DataService','CommonServices',
        function ($rootScope, $uibModalInstance,DataService,CommonServices) {
            var vm = this;

            vm.edit=false;

            vm.users = []; //declare an empty array
            vm.pageno = 1; // initialize page no to 1
            vm.total_count = 0;
            vm.itemsPerPage = 15; //this could be a dynamic value from a drop down

            CommonServices.postData.token = $rootScope.globals.currentUser.userDetails.token;
            vm.getData = function(pageno) {
                data=angular.copy(CommonServices.postData);
                data.transactionMetaData.responseDataProperties = 'party_id&party_partytype_id&addressline1&addressline2&addresscity&name'
                data.transactionMetaData.pageno = pageno-1;
                data.transactionMetaData.itemsPerPage = vm.itemsPerPage;
                data.transactionMetaData.queryMetaData.queryClause.andExpression = [];

                DataService.post('inboundService', data).then(function (response) {
                    vm.parties = response.data;
                    vm.total_count = response.data.total_count;
                })
            }
            vm.getData(vm.pageno);

            vm.goBack = function () {
                vm.edit=false;
                vm.getData(vm.pageno);
            };
            vm.editParty = function (partyId) {
                vm.edit=true;
                var data=angular.copy(CommonServices.postData);
                if(partyId) {
                    data.factName = 'Party p, PartyType pt, Country c, State s';
                    data.transactionMetaData.responseDataProperties = 'p.party_id&p.party_partytype_id&pt.name partytypename&p.addressline1&p.addressline2&p.addresscity&p.emailaddress&p.name&p.party_country_id&c.name countryName&p.party_state_id&s.Name stateName&p.contactpersontitle&p.contactlastname&p.contactfirstname&p.contactmiddlename&p.contactphonenumber';
                    data.transactionMetaData.queryMetaData.joinClause = {
                        'joinType':['JOIN','LEFT JOIN','LEFT JOIN'],'joinKeys':['p.Party_PartyType_Id=pt.PartyType_Id','p.Party_Country_Id=c.Country_Id','p.Party_State_Id=s.State_id']
                    }
                    data.transactionMetaData.queryMetaData.queryClause.andExpression = [
                        {
                            "propertyName": "party_id",
                            "propertyValue": partyId,
                            "propertyDataType": "BIGINT",
                            "operatorType": "="
                        }
                    ];
                    DataService.post('inboundService', data).then(function (response) {
                        vm.party = response.data.data[0];
                        vm.originalPartyData = angular.copy(vm.party);
                        vm.total_count = response.data.total_count;
                    })
                }else{
                    vm.party.party_id = null;
                    vm.party.party_partytype_id = null;
                    vm.party.addressline1 = null;
                    vm.party.addressline2 = null;
                    vm.party.addresscity = null;
                    vm.party.name = null;
                    vm.party.party_country_id = null;
                    vm.party.state_id = null;
                }
            };
            vm.container = [];
            vm.getLOVs = function(factName, selectScope, options) {
                if (vm.container[selectScope] == null) {
                    var data = angular.copy(CommonServices.postData);
                    data.factName = factName;
                    data.transactionMetaData.responseDataProperties = options.response;
                    data.transactionMetaData.pageno = null;
                    data.transactionMetaData.itemsPerPage = null;
                    if(options.and){
                        data.transactionMetaData.queryMetaData.queryClause.andExpression = options.and;
                    }
                    DataService.post('inboundService', data).then( function (response) {
                        vm.container[selectScope] = response.data.data;
                    });
                }
            }
            vm.getCountryStates = function(id){
                if(vm.party.party_country_id){
                    data=angular.copy(CommonServices.postData);
                    data.factName = 'State';
                    data.transactionMetaData.responseDataProperties = "state_id&name";
                    data.transactionMetaData.queryMetaData.queryClause.andExpression = [
                        {
                            "propertyName": "state_country_id",
                            "propertyValue": id || '%',
                            "propertyDataType": "BIGINT",
                            "operatorType": "LIKE"
                        }
                    ];
                    CommonServices.getLOVs(data).then(function(response){
                        vm.states = response.data.data;
                    });
                }
            }

            vm.saveParty = function(){
                vm.dataLoading = true;
                var data=angular.copy(CommonServices.postData);
                vm.changedObjs = CommonServices.GetFormChanges(vm.originalPartyData, vm.party);

                if( !angular.equals({}, vm.changedObjs) && vm.party.party_id ) { //If anything changed?
                    vm.changedObjs['id'] = vm.party.party_id;

                    data.transactionEventType = "Update"
                    data.factObjects = [vm.changedObjs];

                    DataService.post('inboundService', data).then(function (response) {
                        vm.result = response.data.response;
                        vm.message = response.data.message;
                    })
                }else if( !vm.party.party_id ) { //A new insert
                    data.transactionEventType = "PUT";
                    vm.party.partystatus_partystatus_id = 1011;
                    data.factObjects = [vm.party];

                    DataService.post('inboundService', data).then(function (response) {
                        vm.result = response.data.response;
                        vm.message = response.data.message;
                    })
                }
            }


            //console.log()
            vm.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        }])
    .controller('UserController', ['$scope','$rootScope','$uibModalInstance','DataService','CommonServices',
        function ($scope, $rootScope, $uibModalInstance,DataService,CommonServices) {
            var vm = this;

            vm.edit=false;

            vm.users = []; //declare an empty array
            vm.pageno = 1; // initialize page no to 1
            vm.total_count = 0;
            vm.itemsPerPage = 15; //this could be a dynamic value from a drop down

            CommonServices.postData.token = $rootScope.globals.currentUser.userDetails.token;
            vm.getData = function(pageno) {
                var data=angular.copy(CommonServices.postData);
                data.factName = 'Users u, Party p';
                data.transactionMetaData.responseDataProperties = 'u.user_id&u.firstname&u.middlename&u.lastname&u.workphonenumber&u.contactphonenumber&p.name&u.isauthorizedperson&u.username&u.email&u.enabled'
                data.transactionMetaData.pageno = pageno-1;
                data.transactionMetaData.itemsPerPage = vm.itemsPerPage;
                data.transactionMetaData.queryMetaData.queryClause.andExpression = [];
                data.transactionMetaData.queryMetaData.joinClause = {
                    'joinType':['LEFT JOIN'],'joinKeys':['u.user_party_id=p.party_id']
                }

                DataService.post('inboundService', data).then(function (response) {
                    vm.users = response.data;
                    vm.total_count = response.data.total_count;
                })
            }
            vm.getData(vm.pageno);

            vm.goBack = function () {
                vm.edit=false;
                vm.getData(vm.pageno);
            };
            vm.editUser = function (userId) {
                vm.result = null;
                vm.edit=true;
                vm.dataLoading = false;
                /* This part helps get the pages a user can view */
                //var data=angular.copy(CommonServices.postData);
                //data.factName = 'AuthView a, User_Authview b';
                //data.transactionMetaData.responseDataProperties = 'a.authview_id&a.name&b.authview_authview_id&b.user_user_id&b.ius_yn';
                //theuserId = (typeof userId === "undefined")?'null':userId;
                //data.transactionMetaData.queryMetaData.joinClause = {
                //    'joinType':['LEFT JOIN'],'joinKeys':['a.authview_id = b.authview_authview_id AND b.user_user_id = '+theuserId]
                //}
                //DataService.post('inboundService', data).then(function (response) {
                //    vm.userViews = response.data.data;
                //    vm.originalAuthViewsData = angular.copy(vm.userViews);
                //    vm.total_count = response.data.total_count;
                //})
                /* This part helps get the Roles of a user */
                var data=angular.copy(CommonServices.postData);
                data.factName = 'AuthRoles a, User_AuthRole b';
                data.transactionMetaData.responseDataProperties = "a.authroles_id&a.name&a.description&IF(b.authroles_authroles_id,'true','false')ius_yn";
                theuserId = (typeof userId === "undefined")?'null':userId;
                data.transactionMetaData.queryMetaData.joinClause = {
                    'joinType':['LEFT JOIN'],'joinKeys':['a.authroles_id = b.authroles_authroles_id AND b.users_user_id = '+theuserId]
                }
                DataService.post('inboundService', data).then(function (response) {
                    vm.userRoles = response.data.data;
                    vm.originalUserRolesData = angular.copy(vm.userRoles);
                })
                /* This part helps get the user details */
                var data=angular.copy(CommonServices.postData);
                if(userId) {
                    data.factName = 'Users';
                    data.transactionMetaData.responseDataProperties = 'user_id&firstname&middlename&lastname&workphonenumber&contactphonenumber&user_party_id&isauthorizedperson&username&email&password&token&enabled&accountlocked&accountexpirationtime&credentialsexpirationtime&datecreated&datemodified';
                    data.transactionMetaData.queryMetaData.queryClause.andExpression = [
                        {
                            "propertyName": "user_id",
                            "propertyValue": userId,
                            "propertyDataType": "BIGINT",
                            "operatorType": "="
                        }
                    ];
                    DataService.post('inboundService', data).then(function (response) {
                        vm.user = response.data.data[0];
                        vm.originalUserData = angular.copy(vm.user);
                        vm.total_count = response.data.total_count;
                    })

                }else{
                    vm.user = null;
                    vm.userViews = null;
                }

            };
            data=angular.copy(CommonServices.postData);
            data.factName = 'Party';
            data.transactionMetaData.responseDataProperties = "party_id&name";
            CommonServices.getLOVs(data).then(function(response){
                vm.parties = response.data.data;
            });
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
            vm.saveUser = function(){
                if(vm.user==null){
                    vm.result = 'Failure';
                    vm.message = "User data is empty, Fill in the required fields first";
                    return;
                }
                vm.result = null;
                vm.dataLoading = true;
                var data=angular.copy(CommonServices.postData);

                vm.originalUserViewsFromDb = [];
                //vm.userCheckedArray = [];
                //vm.userUnCheckedArray = [];
                vm.userRolesCheckedArray = [];
                vm.userRolesUnCheckedArray = [];
                vm.insert = [];
                vm.update = [];

                //angular.forEach(vm.originalAuthViewsData, function(userViews){
                //    if (userViews.ius_yn==1) {
                //        vm.originalUserViewsFromDb.push(userViews.authview_id);
                //    }
                //});
                //angular.forEach(vm.userViews, function(userViews){
                //    if (userViews.ius_yn==1){
                //        vm.userCheckedArray.push(userViews.authview_id);
                //    }else{
                //        vm.userUnCheckedArray.push(userViews.authview_id);
                //    }
                //});
                angular.forEach(vm.userRoles, function(userRole){
                    if (userRole.ius_yn=="true"){
                        //console.log(userRole.ius_yn + "checked=" + userRole.authroles_id + '-'+userRole.name);
                        vm.userRolesCheckedArray.push(userRole.authroles_id);
                    }else{
                        //console.log(!userRole.ius_yn + "unchecked=" + userRole.authroles_id + '-'+userRole.name);
                        vm.userRolesUnCheckedArray.push(userRole.authroles_id);
                    }
                });

                var data = new FormData();
                data.append("factName", "Users");
                data.append("token", $rootScope.globals.currentUser.userDetails.token);
                data.append("transactionMetaData[currentLocale]", "NG");
                data.append("transactionMetaData[queryStore]", "MySql");
                vm.changedUsrObjs = CommonServices.GetFormChanges(vm.originalUserData, vm.user);
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
                        }else{
                            vm.result = response.data.response;
                            vm.message = response.data.message;
                            vm.getData(vm.pageno);
                        }
                    })
                }else if(vm.user.user_id == null){ //A new insert
                    data.append("transactionEventType", "PUT");
                    data.append("factObjects[users]", [JSON.stringify(vm.user)]);
                    if(vm.user == null){
                        vm.dataLoading = false;
                        vm.result = 'Failure';
                        vm.message = "You need to create a user first";
                    }else if(vm.userRolesCheckedArray.length == 0){
                        vm.dataLoading = false;
                        vm.result = 'Failure';
                        vm.message = "You need to add Roles to the user";
                        vm.activeUsrTab = 1
                    }else{

                        DataService.post('users', data, {
                            transformRequest: angular.identity,
                            headers: {'Content-Type': undefined, 'Process-Data': false}
                        }).then(function (response) {
                            vm.dataLoading = false;

                            vm.user.user_id = response.data.data.insertId;
                            if(response.data.response == "Failure") {
                                vm.result = response.data.response;
                                vm.message += "Error saving user... " + response.data.message;
                            }else{
                                vm.result = response.data.response;
                                vm.message = response.data.message;
                                vm.getData(vm.pageno);
                            }

                        })
                    }

                }
            }
            vm.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        }]);