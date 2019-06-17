app.directive('expensesDirective', [
  '$http',
  '$state',
  '$stateParams',
  '$rootScope',
  'appModule',
  'sessionFactory',
  function directive($http,$state,$stateParams,$rootScope,appModule,sessionFactory) {
    return {
      restrict: "A",
      scope: true,
      link: function link( scope, element, attributeSet )
      {
        console.log( "expensesDirective Runinng !" );

        scope.showSelectYear = false;

        scope.expenses_view = 'list';

        scope.expenses_list_arr = [];
        scope.expenses_calendar_arr = [];

        scope.start_date = moment().startOf('month');
        scope.end_date = moment().endOf('month');

        scope.monthly_total = 0;


        scope.setDates = ( ev, data ) =>{
          scope.start_date = data.start;
          scope.end_date = data.end;
          scope.getExpensesData();
        }
        scope.changeExpensesView = ( view ) =>{
          scope.expenses_view = view;
        }
        scope.toggleExpensesDrop = ( list ) =>{
          if( !list.showDrop ){
            list.showDrop = true;
          }else{
            list.showDrop = false;
          }
        }
        scope.parseMonthDate = ( date ) =>{
          return moment( date ).format('dddd, MMM DD, YYYY');
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
              })
              .catch(function(err){
                console.log( err );
              });
          }
        // ----------------------------- //

        // ------- INITIALIZE PLUGINS -------- //
          scope.$on('filter_dates', scope.setDates);

          $('.modal').on('hidden.bs.modal', function (e) {
            scope.resetValues();
          })

          // $('.modal').modal({
          //   keyboard : false
          // });
        // --------------------------------- //

        

        scope.onLoad = ( ) =>{
          scope.getExpensesData();
        }

        scope.onLoad();

      }
    }


  }
])