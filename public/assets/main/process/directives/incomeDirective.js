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
        scope.income_arr = [];

        scope.monthly_income_total = 0;

        scope.isIncomeModalShow = false;
        scope.isAddIncomeShow = true;
        scope.isEditIncomeShow = false;

        scope.add_income_data = {};

        scope.start_date = moment().startOf('month');
        scope.end_date = moment().endOf('month');
        scope.month_selected = moment().format('MMMM');


        scope.parseDate = ( date ) =>{
          return moment( date ).format('MMMM DD, YYYY');
        }
        scope.showIncomeModal = ( opt ) =>{
          scope.isIncomeModalShow = true;
          scope.initializeDatePicker();
          scope.isAddIncomeShow = false;
          scope.isEditIncomeShow = false;
          if( opt == 'add' ){
            scope.isAddIncomeShow = true;
          }
          if( opt == 'edit' ){
            scope.isEditIncomeShow = true;
          }
        }
        scope.closeIncomeModal = () =>{
          scope.isIncomeModalShow = false;
        }
        scope.setDates = ( ev, data ) =>{
          scope.start_date = data.start;
          scope.end_date = data.end;
          scope.month_selected = moment( scope.start_date ).format('MMMM');
          scope.getExpensesData();
        }

        // ---- HTTP REQUESTS ---- //
          scope.deleteIncome =  ( ) =>{
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
                    console.log(response);
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
                console.log(response);
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
          scope.fetchIncome = ( date ) =>{
            var data = {
              start : moment( date ).startOf("month").format( 'MMMM DD, YYYY' ),
              end : moment( date ).endOf("month").format( 'MMMM DD, YYYY' ),
              user_id : sessionFactory.getSession()
            }
            appModule.getAssetsPerMonth( data )
              .then(function(response){
                console.log(response);
                scope.income_arr = response.data.income;
                angular.forEach( scope.income_arr, function( value, key ){
                  value.full_date = scope.parseDate( value.full_date );
                });
                scope.monthly_income_total = response.data.monthly_income;
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