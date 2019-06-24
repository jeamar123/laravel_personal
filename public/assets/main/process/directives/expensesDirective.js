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
        scope.expenses_categories = [];
        scope.expenses_categories_id = [];
        scope.expenses_selected = [];
        scope.expenses_selected_ids = [];
        scope.expenses_date_checkbox = [];
        scope.expenses_selected_checkbox = [];
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
        scope.add_expenses_data = {};




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
        scope.toggleAllExpensesItem = ( full_date, opt, index ) =>{
          if( opt == false ){
            scope.expenses_selected = [];
            scope.expenses_selected_ids = [];
          }
          angular.forEach( scope.expenses_list_arr , function( value, key ){
            if( full_date == value.full_date ){
              scope.expenses_selected_checkbox[ full_date ] = [];
              angular.forEach( value.expenses, function( value2, key2 ){
                scope.expenses_selected_checkbox[full_date].push( opt );
              });
            }else{
              scope.expenses_selected_checkbox[ value.full_date ] = [];
            }
            if( key != index ){
              scope.expenses_date_checkbox[ key ] = false;
            }
          });
        }
        scope.selectExpensesItem = ( index, opt, list, expenses_date ) =>{
          if( opt == true ){
            scope.expenses_selected.push( list );
            scope.expenses_selected_ids.push( list.id );
          }else{
            var temp_index = $.inArray( list, scope.expenses_selected );
            scope.expenses_selected.splice( temp_index, 1 );
            scope.expenses_selected_ids.splice( temp_index, 1 );
          }
          scope.selected_expenses_data = scope.expenses_selected[0];
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
            angular.forEach( scope.expenses_list_arr, function( value, key ){
              value.showDrop = false;
            });
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
          scope.isExpensesModalShow = true;
          scope.initializeDatePicker();
          scope.isExpensesListShow = false;
          scope.isAddExpensesShow = false;
          scope.isEditExpensesShow = false;
          if( opt == 'add' ){
            scope.isAddExpensesShow = true;
          }
          if( opt == 'edit' ){
            scope.isEditExpensesShow = true;
            $timeout(function() {
              $('.expenses-date-input').data('daterangepicker').setStartDate( moment( scope.selected_expenses_data.full_date ).format( "MMM DD, YYYY" ) );
            }, 50);
            scope.add_expenses_data = {
              date : moment( scope.selected_expenses_data.full_date ).format( "MMM DD, YYYY" )
            }
          }
          if( opt == 'list' ){
            scope.isExpensesListShow = true;
            scope.selected_date_data = data;
          }
          
          console.log( scope.selected_date_data );
          console.log( scope.selected_expenses_data );
        }
        scope.closeExpensesModal = () =>{
          scope.isExpensesModalShow = false;
        }
     

        // ------- HTTP REQUEST -------- //
          scope.fetchCategories = ( ) =>{
            appModule.getExpensesCategories(  )
              .then(function(response){
                // console.log(response);
                scope.expenses_categories = response.data;
                angular.forEach( scope.expenses_categories, function( value, key ){
                  scope.expenses_categories_id.push( value.id );
                });
              });
          }
          scope.getExpensesData = () =>{
            var data = {
              start : moment( scope.start_date ).format('YYYY-MM-DD'),
              end : moment( scope.end_date ).format('YYYY-MM-DD'),
              user_id : 1
            }
            appModule.getExpensesPerMonth( data )
              .then(function(response){
                // console.log( response ); 
                scope.expenses_list_arr = response.data.expenses;
                scope.monthly_total = response.data.monthly_total;
                angular.forEach( scope.expenses_list_arr, function( value, key ){
                  value.full_date = value.full_date ? scope.parseMonthDate( value.full_date ) : null;
                  value.showDrop = false;
                });
              })
              .catch(function(err){
                console.log( err );
              });
          }
          scope.addExpenses =  ( add_data ) =>{
            var data = {
              full_date : moment( add_data.date ).format( 'YYYY-MM-DD' ),
              day : moment( add_data.date ).format( 'D' ),
              month : moment( add_data.date ).format( 'MM' ),
              year : moment( add_data.date ).format( 'YYYY' ),
              category_id : add_data.category_id,
              description : add_data.description,
              value : add_data.value,
            }
            appModule.submitExpenses( data )
              .then(function(response){
                // console.log(response);
                if( response.data.status == true ){
                  scope.add_expenses_data = {
                    date : moment().format( 'MMM DD, YYYY' )
                  };
                  swal( "Success!", response.data.message, 'success' );
                  scope.onLoad();
                }else{
                  swal( "Error!", response.data.message, 'error' );
                }
              });  
          }
          scope.deleteExpenses =  ( ) =>{
            swal({
              title: "Confirm",
              text: "are you sure you want to delete these item(s)?",
              type: "warning",
              showCancelButton: true,
              closeOnConfirm: true,
              animation: "slide-from-top"
            }, function(isTrue){
              if(isTrue){
                var data = {
                  ids_arr : scope.expenses_selected_ids
                }
                appModule.removeExpenses( data )
                  .then(function(response){
                    // console.log(response);
                    if( response.data.status == true ){
                      swal( 'Success!', response.data.message, 'success' );
                      scope.onLoad();
                    }else{
                      swal( 'Error!', response.data.message, 'error' );
                    }
                  });
              }
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
          scope.fetchCategories();

          console.log( sessionFactory.getSession() );
        }

        scope.onLoad();

      }
    }


  }
])