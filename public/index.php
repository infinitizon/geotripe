<!DOCTYPE html>
<html ng-app="Geotripe">
<head>
    <title>{{$state.current.data.title}} :: Geoscape ERP</title>
    <meta charset="UTF-8">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1">

    <!-- oclazyload stylesheets before this tag -->
    <meta id="load_styles_before">

    <link href="vendor/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
    <link href="vendor/bootstrap/3.3.6/css/bootstrap-theme.min.css" rel="stylesheet" type="text/css"/>
<!--    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300" rel="stylesheet">-->
    <link rel="stylesheet" href="vendor/perfect-scrollbar/css/perfect-scrollbar.css">

    <link href="css/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
    <link href="vendor/ui-select/css/select.min.css" rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" href="css/panel/panel.css">
    <link rel="stylesheet" href="css/feather/feather.css">
    <link rel="stylesheet" href="css/animate.css">

    <link href="css/app.css" rel="stylesheet" type="text/css"/>
    <link href="css/app.skins.css" rel="stylesheet" type="text/css"/>

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
<body data-ng-controller="AppCtrl" class="{{ app.layout.sidebarTheme }} {{ app.layout.headerTheme }}">

<!-- quick launch panel -->
<div class="quick-launch-panel" data-ng-include="'modules/common/views/quick-launch-panel.html'"></div>
<!-- /quick launch panel -->


<div class="app {{$state.current.data.appClasses}}"
     data-ng-class="{'layout-small-menu': app.layout.isSmallSidebar
                        , 'layout-chat-open': app.layout.isChatOpen
                        , 'layout-fixed-header': app.layout.isFixedHeader
                        , 'layout-boxed': app.layout.isBoxed
                        , 'layout-static-sidebar': app.layout.isStaticSidebar
                        , 'layout-right-sidebar': app.layout.isRightSidebar
                        , 'layout-fixed-footer': app.layout.isFixedFooter
                        , 'message-open': app.isMessageOpen}"
     data-ui-view>
</div>

<!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>-->
<!--<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular.min.js"></script>-->
<!--<script src="https://cdn.jsdelivr.net/alasql/0.3/alasql.min.js" type="text/javascript"></script>-->
<!--<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.7.12/xlsx.core.min.js" type="text/javascript"></script>-->
<!--<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular-cookies.js" type="text/javascript"></script>-->
<!--<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular-animate.min.js" type="text/javascript"></script>-->
<!--<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular-touch.min.js" type="text/javascript"></script>-->
<!--<script src="/      /ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular-sanitize.min.js" type="text/javascript"></script>-->

<script src="scripts/extensions/modernizr.js"></script>
<script src="vendor/jquery/dist/jquery.js"></script>    <!-- Currently using verson  - v2.1.3 -->
<script src="vendor/angular/1.5.7/angular.js" type="text/javascript"></script>
<script src="vendor/angular/angular-ui-router.min.js" type="text/javascript"></script>
<script src="vendor/angular/1.5.7/angular-cookies.min.js" type="text/javascript"></script>
<script src="vendor/angular/1.5.7/angular-animate.min.js" type="text/javascript"></script>
<script src="vendor/angular/1.5.7/angular-touch.min.js" type="text/javascript"></script>
<script src="vendor/angular/1.5.7/angular-sanitize.min.js" type="text/javascript"></script>
<script src="vendor/angular-ui-utils/ui-utils.js"></script>
<script src="vendor/ngstorage/ngStorage.js"></script>
<script src="vendor/ocLazyLoad/dist/ocLazyLoad.js"></script>
<script src="vendor/perfect-scrollbar/js/perfect-scrollbar.jquery.js"></script>
<script src="scripts/extensions/lib.js"></script>
<script src="vendor/fastclick/lib/fastclick.js"></script>
<script src="vendor/ui-select/js/select.min.js" type="text/javascript"></script>
<script src="vendor/excel2json/alasql.min.js" type="text/javascript"></script>
<script src="vendor/excel2json/xlsx.core.min.js" type="text/javascript"></script>
<!--<script src="vendor/angular-pusher/angular-pusher.min.js" type="text/javascript"></script>--> <!-- In case I would need pusher-->
<!--<script src="vendor/ui-bootstrap-tpls/2.2.0.min.js" type="text/javascript"></script>-->
<script src="vendor/angular-bootstrap/ui-bootstrap-tpls.js"></script>
<script src="scripts/extensions/dirPagination.js" type="text/javascript"></script>

<script src="scripts/app.js" type="text/javascript"></script>
<script src="scripts/app.main.js"></script>
<script src="scripts/app.config.router.js"></script>

<script src="modules/common/services.js" type="text/javascript"></script>
<script src="modules/common/directives/anchor-scroll.js"></script>
<script src="modules/common/directives/c3.js"></script>
<script src="modules/common/directives/chosen.js"></script>
<script src="modules/common/directives/navigation.js"></script>
<script src="modules/common/directives/offscreen.js"></script>
<script src="modules/common/directives/panel-control-collapse.js"></script>
<script src="modules/common/directives/panel-control-refresh.js"></script>
<script src="modules/common/directives/panel-control-remove.js"></script>
<script src="modules/common/directives/preloader.js"></script>
<script src="modules/common/directives/quick-launch.js"></script>
<script src="modules/common/directives/rickshaw.js"></script>
<script src="modules/common/directives/scrollup.js"></script>
<script src="modules/common/directives/vector.js"></script>
<script src="modules/common/directives/iz-dirs.js"></script>
<!-- endbuild -->
</body>
</html>
