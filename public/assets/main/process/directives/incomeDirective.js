  app.directive('incomeDirective', [
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
        console.log( "incomeDirective Runinng !" );

        scope.selected_income_ids = [];
        scope.selected_income = [];
        scope.selected_income_checkbox = [];
        scope.income_arr = [];

        scope.monthly_income_total = 0;

        scope.isIncomeModalShow = false;
        scope.isAddIncomeShow = true;
        scope.isEditIncomeShow = false;
        scope.selectAllIncome = false;

        scope.add_income_data = {};

        scope.start_date = localStorage.getItem( 'selected_date' ) == null ? moment().startOf('month') : localStorage.getItem( 'selected_date' );
        scope.end_date = moment( scope.start_date ).endOf('month');
        scope.month_selected = moment( scope.start_date ).format('MMMM');


        scope.toggleItemIncome = ( opt ) =>{
          scope.selected_income_ids = [];
          scope.selected_income = [];
          angular.forEach( scope.income_arr, function( value, key ){
            scope.selected_income_checkbox[key] = opt;
            if( opt == true ){
              scope.selected_income_ids.push( value.id );
              scope.selected_income.push( value );
            }
          });
        }
        scope.selectItemIncome = ( list, opt, index ) =>{
          if( opt == true ){
            scope.selected_income.push( list );
            scope.selected_income_ids.push( list.id );
          }else{
            var temp_index = $.inArray( list, scope.selected_income );
            scope.selected_income.splice( temp_index, 1 );
            scope.selected_income_ids.splice( temp_index, 1 );
          }
          scope.selected_expenses_data = scope.selected_income_ids[0];
        }
        scope.parseDate = ( date ) =>{
          return moment( date ).format('MMMM DD, YYYY');
        }
        scope.showIncomeModal = ( opt ) =>{
          if( opt == 'edit' && scope.selected_income_ids.length != 1 ){
            return false;
          }
          scope.isIncomeModalShow = true;
          scope.initializeDatePicker();
          scope.isAddIncomeShow = false;
          scope.isEditIncomeShow = false;
          if( opt == 'add' ){
            scope.isAddIncomeShow = true;
          }
          if( opt == 'edit' ){
            scope.isEditIncomeShow = true;
            scope.add_income_data = scope.selected_income[0];
          }
        }
        scope.closeIncomeModal = () =>{
          scope.isIncomeModalShow = false;
        }
        scope.setDates = ( ev, data ) =>{
          scope.start_date = data.start;
          scope.end_date = data.end;
          scope.month_selected = moment( scope.start_date ).format('MMMM');
          scope.fetchIncome();
        }

        // ---- HTTP REQUESTS ---- //
          scope.deleteIncome =  ( ) =>{
            if( scope.selected_income_ids.length == 0 ){
              return false;
            }
            swal({
              title: "Confirm",
              text: "are you sure you want to delete " + scope.selected_income_ids.length + " item(s)?",
              type: "warning",
              showCancelButton: true,
              closeOnConfirm: true,
              animation: "slide-from-top"
            }, function(isTrue){
              if(isTrue){
                var data = {
                  ids_arr : scope.selected_income_ids
                }
                appModule.removeAssets( data )
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
          scope.addIncome =  ( add_data ) =>{
            var data = {
              full_date : moment( add_data.date ).format( 'YYYY-MM-DD' ),
              day : moment( add_data.date ).format( 'D' ),
              month : moment( add_data.date ).format( 'MM' ),
              year : moment( add_data.date ).format( 'YYYY' ),
              description : add_data.description,
              value : add_data.value,
              user_id : sessionFactory.getSession()
            }
            appModule.submitAssets( data )
              .then(function(response){
                // console.log(response);
                if( response.data.status == true ){
                  swal( 'Success!', response.data.message, 'success' );
                  scope.add_income_data = {
                    date : moment( add_data.date ).format( 'MMM DD, YYYY' )
                  };
                  scope.onLoad();
                }else{
                  swal( 'Error!', response.data.message, 'error' );
                }
              });  
          }
          scope.updateIncome =  ( update_data ) =>{
            update_data.full_date = moment( update_data.date ).format( 'YYYY-MM-DD' );
            update_data.day = moment( update_data.date ).format( 'D' );
            update_data.month = moment( update_data.date ).format( 'MM' );
            update_data.year = moment( update_data.date ).format( 'YYYY' );
            appModule.saveAssets( update_data )
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
          scope.fetchIncome = ( ) =>{
            var data = {
              start : moment( scope.start_date ).startOf("month").format( 'MMMM DD, YYYY' ),
              end : moment( scope.end_date ).endOf("month").format( 'MMMM DD, YYYY' ),
              user_id : sessionFactory.getSession()
            }
            appModule.getAssetsPerMonth( data )
              .then(function(response){
                // console.log(response);
                scope.income_arr = response.data.income;
                angular.forEach( scope.income_arr, function( value, key ){
                  value.full_date = scope.parseDate( value.full_date );
                });
                scope.monthly_income_total = response.data.monthly_income;
                scope.toggleItemIncome( false );
              });
          }

        // ----------------------- //

        // ------- INITIALIZE PLUGINS -------- //
          scope.initializeDatePicker = () =>{
            $timeout(function() {
              $('.income-date-input').daterangepicker({
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
              scope.isIncomeModalShow = false;
              scope.isAddIncomeShow = true;
              scope.isEditIncomeShow = false;
              scope.$apply();
            }
          });
          scope.$on('filter_dates', scope.setDates);
        // --------------------------------- //

        scope.checkSession = ( ) =>{
          if( sessionFactory.getSession() == 0 || sessionFactory.getSession() == null ){
            $state.go('auth');
          }
        }

        scope.onLoad = ( ) =>{
          scope.checkSession();
          scope.fetchIncome();
        }

        scope.onLoad();

      }
    }


  }
])