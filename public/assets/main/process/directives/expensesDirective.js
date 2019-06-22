app.directive('expensesDirective', [
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
        console.log( "expensesDirective Runinng !" );

        

        scope.expenses_view = localStorage.getItem('expenses_view') != null ? localStorage.getItem('expenses_view') : 'list';

        scope.expenses_list_arr = [];
        scope.expenses_calendar_arr = [];
        scope.weekdays_long = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ];

        scope.start_date = moment().startOf('month');
        scope.end_date = moment().endOf('month');
        scope.month_selected = moment().format('MMMM');

        scope.monthly_total = 0;

        scope.isExpensesModalShow = false;
        scope.isAddExpensesShow = true;
        scope.isEditExpensesShow = false;
        scope.isEditExpensesShow = false;
        scope.isExpensesListShow = false;

        scope.selected_expenses_data = {};
        scope.selected_date_data = {};


        scope.prevMonth = (  ) =>{
          scope.start_date = moment( scope.start_date ).subtract( 1, 'month' ).startOf('month');
          scope.end_date = moment( scope.end_date ).subtract( 1, 'month' ).endOf('month');
          scope.month_selected = moment( scope.start_date ).format('MMMM');
          var data = {
            date : scope.start_date,
          }
          $rootScope.$broadcast('arrow_change_month', data);
        }
        scope.nextMonth = (  ) =>{
          scope.start_date = moment( scope.start_date ).add( 1, 'month' ).startOf('month');
          scope.end_date = moment( scope.end_date ).add( 1, 'month' ).endOf('month');
          scope.month_selected = moment( scope.start_date ).format('MMMM');
          var data = {
            date : scope.start_date,
          }
          $rootScope.$broadcast('arrow_change_month', data);
        }
        scope.setDates = ( ev, data ) =>{
          scope.start_date = data.start;
          scope.end_date = data.end;
          scope.month_selected = moment( scope.start_date ).format('MMMM');
          scope.getExpensesData();
        }
        scope.changeExpensesView = ( view ) =>{
          scope.expenses_view = view;
          localStorage.setItem('expenses_view', view);
        }
        scope.toggleExpensesDrop = ( list ) =>{
          if( !list.showDrop ){
            list.showDrop = true;
          }else{
            list.showDrop = false;
          }
        }
        scope.parseMonthDate = ( date ) =>{
          return ( date ) ? moment( date ).format('dddd, MMMM DD, YYYY') : "_";
        }
        scope.parseDay = ( date ) =>{
          return ( date ) ? moment( date ).format('DD') : "_";
        }
        scope.showExpensesModal = ( opt, data ) =>{
          console.log( data );
          scope.isExpensesListShow = false;
          scope.isAddExpensesShow = false;
          scope.isEditExpensesShow = false;
          if( opt == 'add' ){
            scope.isAddExpensesShow = true;
          }
          if( opt == 'edit' ){
            scope.isEditExpensesShow = true;
            scope.selected_expenses_data = data;
          }
          if( opt == 'list' ){
            scope.isExpensesListShow = true;
            scope.selected_date_data = data;
          }
          scope.isExpensesModalShow = true;
          scope.initializeDatePicker();
        }
        scope.closeExpensesModal = () =>{
          scope.isExpensesModalShow = false;
        }
     

        // ------- HTTP REQUEST -------- //
          scope.getExpensesData = () =>{
            var data = {
              start : moment( scope.start_date ).format('YYYY-MM-DD'),
              end : moment( scope.end_date ).format('YYYY-MM-DD'),
            }
            appModule.getExpensesPerMonth( data )
              .then(function(response){
                console.log( response );
                scope.expenses_list_arr = response.data.expenses;
                scope.monthly_total = response.data.monthly_total;

                angular.forEach( scope.expenses_list_arr, function( value, key ){
                  value.full_date = value.full_date ? scope.parseMonthDate( value.full_date ) : null;
                  value.showDrop = true;
                });
              })
              .catch(function(err){
                console.log( err );
              });
          }
        // ----------------------------- //

        // ------- INITIALIZE PLUGINS -------- //
          scope.initializeDatePicker = () =>{
            $timeout(function() {
              $('.expenses-date-input').daterangepicker({
                // timePicker: true,
                // startDate: moment().startOf('hour'),
                singleDatePicker: true,
                showDropdowns: true,
                autoApply: true,
                endDate: moment(),
                locale: {
                  format: 'MMM DD, YYYY'
                }
              });
            }, 10);
          }

          $("body").click(function(e){
            // if ( $(e.target).parents(".modal-container").length === 0) {
            if ( e.target.className == 'modal-wrapper' ) {
              scope.isExpensesModalShow = false;
              scope.isAddExpensesShow = true;
              scope.isEditExpensesShow = false;
              scope.isEditExpensesShow = false;
              scope.isExpensesListShow = false;
              scope.$apply();
            }
          });

          scope.$on('filter_dates', scope.setDates);
        // --------------------------------- //

        

        scope.onLoad = ( ) =>{
          scope.getExpensesData();
        }

        scope.onLoad();

      }
    }


  }
])