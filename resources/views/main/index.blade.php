<!DOCTYPE html>
<html lang="en" ng-app="app">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-114115155-1"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'UA-114115155-1');
    </script>


    
    <title>Manage Expenses</title>
    <link rel="shortcut icon" href="{{ asset('img/logo/jl-logo-blue.png') }}" type="image/ico">

    <link rel="stylesheet" type="text/css" href="../css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="../css/fonts.css">
    <link rel="stylesheet" type="text/css" href="../css/open-iconic.css">
    <link rel="stylesheet" type="text/css" href="../css/sweetalert.css">
    <link rel="stylesheet" type="text/css" href="../css/daterangepicker.css">
    <link rel="stylesheet" type="text/css" href="../css/preloader.css">
    <link rel="stylesheet" type="text/css" href="../assets/main/css/style.css">
    <link rel="stylesheet" type="text/css" href="../assets/main/css/auth.css">
    <link rel="stylesheet" type="text/css" href="../assets/main/css/dashboard.css">
    <link rel="stylesheet" type="text/css" href="../assets/main/css/expenses.css">
    <link rel="stylesheet" type="text/css" href="../assets/main/css/income.css">
    <link rel="stylesheet" type="text/css" href="../assets/main/css/summary.css">
    <link rel="stylesheet" type="text/css" href="../css/custom.css">
    <link rel="stylesheet" type="text/css" href="../assets/main/css/responsive.css">
  </head>
  <body ng-controller="mainController">

    <div ui-view="main" class="main-content-container"></div>

    <div class="main-loader" hidden>
      <div class="circle-loader">
        <div class="preloader-container">
          <div class="preloader-wrapper big active">
            <div class="spinner-layer spinner-blue-only">
              <div class="circle-clipper left">
                <div class="circle"></div>
              </div><div class="gap-patch">
                <div class="circle"></div>
              </div><div class="circle-clipper right">
                <div class="circle"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </body>

  <script type="text/javascript" src="<?php echo $server; ?>/js/jquery.min.js"></script>
  <script type="text/javascript" src="<?php echo $server; ?>/js/Chart.min.js"></script>
  <script type="text/javascript" src="<?php echo $server; ?>/js/angular.min.js"></script>
  <script type="text/javascript" src="<?php echo $server; ?>/js/moment.min.js"></script>
  <script type="text/javascript" src="<?php echo $server; ?>/js/angular-chart.js"></script>
  <script type="text/javascript" src="<?php echo $server; ?>/js/angular-ui-router.min.js"></script>
  <script type="text/javascript" src="<?php echo $server; ?>/js/angular-local-storage.min.js"></script>
  <script type="text/javascript" src="<?php echo $server; ?>/js/sweetalert.min.js"></script>
  <script type="text/javascript" src="<?php echo $server; ?>/js/daterangepicker.js"></script>
  
  
  <script type="text/javascript" src="<?php echo $server; ?>/assets/main/process/app.js"></script>


  <script type="text/javascript" src="<?php echo $server; ?>/assets/main/process/controllers/mainController.js"></script>

  <script type="text/javascript" src="<?php echo $server; ?>/assets/main/process/factories/factories.js"></script>

  <script type="text/javascript" src="<?php echo $server; ?>/assets/main/process/directives/authDirective.js"></script>
  <script type="text/javascript" src="<?php echo $server; ?>/assets/main/process/directives/dateSelectorDirective.js"></script>
  <script type="text/javascript" src="<?php echo $server; ?>/assets/main/process/directives/dashboardDirective.js"></script>
  <script type="text/javascript" src="<?php echo $server; ?>/assets/main/process/directives/expensesDirective.js"></script>
  <script type="text/javascript" src="<?php echo $server; ?>/assets/main/process/directives/incomeDirective.js"></script>
  <script type="text/javascript" src="<?php echo $server; ?>/assets/main/process/directives/summaryDirective.js"></script>




  <script type="text/javascript" src="<?php echo $server; ?>/assets/main/process/services/services.js"></script>

  <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCOzaOYgvdwnATwVIvSpYixj32rTLbVF3k"></script>
</html>