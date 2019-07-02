  app.directive('dateSelectorDirective', [
  '$http',
  '$state',
  '$stateParams',
  '$rootScope',
  'appModule',
  'sessionFactory',
  '$timeout',
  function directive($http,$state,$stateParams,$rootScope,appModule,sessionFactory,$timeout) {
    return {
      restrict: "A",
      scope: true,
      link: function link( scope, element, attributeSet )
      {
        console.log( "dateSelectorDirective Runinng !" );

        scope.months = [];

        scope.isFilterShow = false;
        scope.isMainFilterShow = true;
        scope.isMonthFilterShow = false;
        scope.isYearFilterShow = false;
        scope.isCustomFilterShow = false;

        scope.start_date = localStorage.getItem( 'selected_date' ) == null ? moment().startOf('month') : localStorage.getItem( 'selected_date' );
        scope.end_date = moment( scope.start_date ).endOf('month');
        scope.filterValue = moment( scope.start_date ).format('MMMM YYYY');
        scope.month_selected = moment( scope.start_date ).format('MMMM');
        scope.year_selected = moment( scope.start_date ).format('YYYY');



        scope.sendDates = ( ) =>{
          var data = {
            start : scope.start_date,
            end : scope.end_date,
          }
          localStorage.setItem( 'selected_date', scope.filterValue );
          $rootScope.$broadcast('filter_dates', data);
        }
        scope.prevMonth = (  ) =>{
          scope.start_date = moment( scope.start_date ).subtract( 1, 'month' ).startOf('month');
          scope.end_date = moment( scope.end_date ).subtract( 1, 'month' ).endOf('month');
          scope.month_selected = moment( scope.start_date ).format('MMMM');
          scope.filterValue = moment( scope.start_date ).format('MMMM YYYY');
          scope.sendDates();
        }
        scope.nextMonth = (  ) =>{
          scope.start_date = moment( scope.start_date ).add( 1, 'month' ).startOf('month');
          scope.end_date = moment( scope.end_date ).add( 1, 'month' ).endOf('month');
          scope.month_selected = moment( scope.start_date ).format('MMMM');
          scope.filterValue = moment( scope.start_date ).format('MMMM YYYY');
          scope.sendDates();
        }
        scope.showDateFilter = ( ) =>{
          scope.isFilterShow = true;
          scope.isMainFilterShow = true;
        }
        scope.hideDateFilter = ( ) =>{
          scope.isFilterShow = false;
        }
        scope.showMainFilter = ( ) =>{
          scope.isMainFilterShow = true;
          scope.isMonthFilterShow = false;
          scope.isYearFilterShow = false;
          scope.isCustomFilterShow = false;
        }
        scope.selectFilterOption = ( opt ) =>{
          scope.isMainFilterShow = false;
          if( opt == 'Today' ){
            scope.isMainFilterShow = true;
            scope.isFilterShow = false;
            scope.filterValue = opt;
            scope.start_date = moment();
            scope.end_date = moment();
            scope.sendDates();
          }else if( opt == 'Yesterday' ){
            scope.isMainFilterShow = true;
            scope.isFilterShow = false;
            scope.filterValue = opt;
            scope.start_date = moment().subtract( 1, 'days');
            scope.end_date = moment().subtract( 1, 'days');
            scope.sendDates();
          }else if( opt == 'Last 7 days' ){
            scope.isMainFilterShow = true;
            scope.isFilterShow = false;
            scope.filterValue = opt;
            scope.start_date = moment().subtract( 6, 'days');
            scope.end_date = moment();
            scope.sendDates();
          }else if( opt == 'Month' ){
            scope.isMonthFilterShow = true;
          }else if( opt == 'Year' ){
            scope.isYearFilterShow = true;
          }else if( opt == 'Custom' ){
            scope.isCustomFilterShow = true;
            $timeout(function() {
              scope.initializeDatePickers();
              $('.datepicker-input').data('daterangepicker').show();
            }, 100);
            scope.isFilterShow = false;
          }
        } 
        scope.selectMonth = ( opt ) =>{
          scope.filterValue = opt + " " + scope.year_selected;
          scope.isFilterShow = false;
          scope.month_selected = opt;
          scope.start_date = moment( scope.filterValue, 'MMMM YYYY' ).startOf('month');
          scope.end_date = moment( scope.filterValue, 'MMMM YYYY' ).endOf('month');
          scope.sendDates();
        }
        scope.selectYear = ( opt ) =>{
          scope.filterValue = scope.month_selected + " " + opt;
          scope.isFilterShow = false;
          scope.year_selected = opt;
          scope.start_date = moment( scope.filterValue, 'MMMM YYYY' ).startOf('month');
          scope.end_date = moment( scope.filterValue, 'MMMM YYYY' ).endOf('month');
          scope.sendDates();
        }
        scope.generateYears = ( num ) =>{
          var year = new Date().getFullYear();
          var range = [];
          range.push(year);
          for (var i = 1; i < num; i++) {
            range.push(year - i);
          }
          return range;
        }


        // ------- HTTP REQUESTS -------- //
          scope.getMonths = () =>{
            $http.get('../json/months.json')
              .then(function(response){
                // console.log( response );
                scope.months = response.data;
              });
          }
        // ------------------------------- //

        // ------- INITIALIZE PLUGINS -------- //
          scope.initializeDatePickers = ( ) =>{
            $('.datepicker-input').daterangepicker({
              // timePicker: true,
              // startDate: moment().startOf('hour'),
              opens: 'left',
              showDropdowns: true,
              autoApply: true,
              endDate: moment(),
              locale: {
                format: 'MMM DD, YYYY'
              }
            });
            $('.datepicker-input').on('hide.daterangepicker', function(ev, picker) {
              scope.isCustomFilterShow = false;
              scope.isMainFilterShow = true;
              $timeout(function() {
                $('.datepicker-input').data('daterangepicker').remove();
                scope.$apply();
              }, 100);
            });
            $('.datepicker-input').on('apply.daterangepicker', function(ev, picker) {
              scope.filterValue = moment( picker.startDate ).format( 'MMMM DD' ) + " - " + moment( picker.endDate ).format( 'MMMM DD YYYY' );
              scope.start_date = moment( picker.startDate );
              scope.end_date = moment( picker.endDate );
              scope.sendDates();
            });
          }
          scope.initializeEventListeners = ( ) =>{
            $("body").click(function(e){
              if ( $(e.target).parents(".date-btn").length === 0) {
                scope.isFilterShow = false;
                scope.isMainFilterShow = true;
                scope.isMonthFilterShow = false;
                scope.isYearFilterShow = false;
                scope.$apply();
              }
            });
          }
        // ------------------------------- //

        scope.onLoad = ( ) =>{
          scope.getMonths();
          scope.initializeEventListeners();
        }

        scope.onLoad();

      }
    }


  }
])