/**
 * Created by Abimbola on 7/9/2016.
 */
angular.module("app", ['angularUtils.directives.dirPagination'])
    .controller('appCtrl', function($http){
        var vm = this;
        vm.users = []; //declare an empty array
        vm.pageno = 1; // initialize page no to 1
        vm.total_count = 0;
        vm.itemsPerPage = 10; //this could be a dynamic value from a drop down
        vm.getData = function(pageno){ // This would fetch the data on page change.
            //In practice this should be in a factory.
            vm.users = [];
            var data={
                'itemsPerPage':vm.itemsPerPage
                ,'pagenumber':pageno}
            $http.post("server.php",data).success(function(response){
                //ajax request to fetch data into vm.data
                console.log(response)
                vm.users = response;  // data to be displayed on current page.
                //vm.users = response.data;  // data to be displayed on current page.
                //vm.total_count = response.total_count; // total data count.
                vm.total_count = response.length; // total data count. This is the one that helps with the paging
            });
        };
        vm.getData(vm.pageno); // Call the function to fetch initial data on page load.
    });