<!DOCTYPE html>
<html ng-app="School">
    <head>
        <title>:: {{$root.pageTitle}} - Geotripe ::</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="scripts/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
        <link href="scripts/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300" rel="stylesheet">
        <link rel="stylesheet" href="font-awesome-4.6.3/css/font-awesome.min.css">
        <link href="css/app.css" rel="stylesheet" type="text/css"/>
        <link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon">
        <link rel="icon" href="images/favicon.ico" type="image/x-icon">

        <!--
           IE8 support, see AngularJS Internet Explorer Compatibility http://docs.angularjs.org/guide/ie
           For Firefox 3.6, you will also need to include jQuery and ECMAScript 5 shim
         -->
        <!--[if lt IE 9]>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.js"></script>
        <script src="http://cdnjs.cloudflare.com/ajax/libs/es5-shim/2.2.0/es5-shim.js"></script>
        <script>
            document.createElement('ui-select');
            document.createElement('ui-select-match');
            document.createElement('ui-select-choices');
        </script>
        <![endif]-->

    </head>
    <body>
        <!-- https://apps.gndf.io/#/settings/project/ -->
        <!-- Charts : https://jtblin.github.io/angular-chart.js/  -->
		<!-- https://www.youtube.com/channel/UCO9JvZ75Usyzgd1puurLF6A -->
        <!-- File uploads: http://jsfiddle.net/danialfarid/maqbzv15/1118/ -->

        <div class="global-content container-fluid" ng-if="$root.globals.currentUser">
            <div class="row global-header">
                <div class="pull-right">
                    <input type="text" placeholder="Search..." />&nbsp;&nbsp;&nbsp;{{$root.globals.currentUser.userDetails.authDetails.firstname}}
                </div>
                <div>{{$root.pageHeader}}</div>
            </div>
            <div class="row global-container">
                <div class="col-sm-3 global-sidenav">
                    <div class="nav-list-group">
                        <ul class="main-menu">
                            <li ng-repeat="menu in $root.globals.currentUser.userDetails.authViews" ng-include="'menuTree'"></li>
                        </ul>
                    </div>
                </div>
                <div class="col-sm-9 global-main-content">
                    <div ui-view="app_pages"></div>
                </div>
            </div>
        </div>
        <script type="text/ng-template" id="menuTree">
            <a ui-sref="{{ menu.viewpath }}" class="side-bar-nav" ui-sref-active="navActive">
                <i class="fa fa-2x {{menu.css_class}}"></i>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ menu.name }}
            </a>
            <ul ng-if="menu.child">
                <li ng-repeat="menu in menu.child" ng-include="'menuTree'">
                </li>
            </ul>
        </script>
        <div ui-view="login"></div>

        <!--script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular.min.js"></script-->
        <script src="scripts/angular/1.5.7/angular.js" type="text/javascript"></script>
        <script src="scripts/angular-ui-router.js" type="text/javascript"></script>
        <!--script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular-cookies.js"></script-->
        <script src="scripts/angular/1.5.7/angular-cookies.min.js" type="text/javascript"></script>
        <!--script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular-animate.min.js"></script-->
        <script src="scripts/angular/1.5.7/angular-animate.min.js" type="text/javascript"></script>
        <!--script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular-touch.min.js"></script-->
        <script src="scripts/angular/1.5.7/angular-touch.min.js" type="text/javascript"></script>
        <script src="scripts/angular/1.5.7/angular-sanitize.min.js" type="text/javascript"></script>
        <script src="scripts/select.min.js" type="text/javascript"></script>
        <script src="scripts/ui-bootstrap-tpls-1.3.3.min.js" type="text/javascript"></script>
        <script src="scripts/dirPagination.js" type="text/javascript"></script>
        <script src="scripts/app.js" type="text/javascript"></script>
        <script src="modules/common/services.js" type="text/javascript"></script>
        <script src="modules/auth/controller.js" type="text/javascript"></script>
        <script src="modules/auth/services.js" type="text/javascript"></script>
        <script src="modules/home/controller.js" type="text/javascript"></script>
        <script src="modules/setup/controller.js" type="text/javascript"></script>
        <script src="modules/quote/controller.js" type="text/javascript"></script>
    </body>
</html>
