<!DOCTYPE html>
<html ng-app="School">
    <head>
        <title>:: {{pageTitle}} - Geotripe ::</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="scripts/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300" rel="stylesheet">
        <link rel="stylesheet" href="font-awesome-4.6.3/css/font-awesome.min.css">
        <link href="css/app.css" rel="stylesheet" type="text/css"/>
        <link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon">
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon">
    </head>
    <body>
        <!-- https://apps.gndf.io/#/settings/project/ -->
        <!-- Charts : https://jtblin.github.io/angular-chart.js/  -->
        <div ui-view></div>

        <!--script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular.min.js"></script-->
        <script src="scripts/angular.js" type="text/javascript"></script>
        <script src="scripts/angular-ui-router.js" type="text/javascript"></script>
        <!--script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular-cookies.js"></script-->
        <script src="scripts/angular-cookies.js" type="text/javascript"></script>
        <!--script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular-animate.min.js"></script-->
        <script src="scripts/angular-animate.js" type="text/javascript"></script>
        <!--script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular-touch.min.js"></script-->
        <script src="scripts/angular-touch.js" type="text/javascript"></script>
        <script src="scripts/ui-bootstrap-tpls-1.3.3.min.js" type="text/javascript"></script>
        <script src="scripts/app.js" type="text/javascript"></script>
        <script src="modules/common/services.js" type="text/javascript"></script>
        <script src="modules/auth/controller.js" type="text/javascript"></script>
        <script src="modules/auth/services.js" type="text/javascript"></script>
        <script src="modules/home/controller.js" type="text/javascript"></script>
    </body>
</html>
