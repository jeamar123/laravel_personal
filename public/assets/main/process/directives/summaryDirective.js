app.directive('summaryDirective', [
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
        console.log( "summaryDirective Runinng !" );

        scope.alphabet = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ];
        
        scope.expensesPieChartLabels = [];
        scope.expensesPieChartData = [];
        scope.expensesLineChartLabels = [];
        scope.expensesLineChartData = [];

        scope.start_date = localStorage.getItem( 'selected_date' ) == null ? moment().startOf('month') : localStorage.getItem( 'selected_date' );
        scope.end_date = moment( scope.start_date ).endOf('month');
        scope.month_selected = moment( scope.start_date ).format('MMMM');

        scope.monthly_income = 0;
        scope.monthly_expenses = 0;
        scope.monthly_balance = 0;


        // ------- HTTP REQUEST -------- //
          scope.getSummary = ( ev, data ) =>{
            console.log( data );
            scope.start_date = data.start;
            scope.end_date = data.end;
            scope.month_selected = moment( scope.start_date ).format('MMMM');
            scope.fetchMonthSummary();
          }

          scope.fetchMonthSummary = () =>{
            scope.expensesLineChartLabels = [];
            scope.expensesLineChartData = [];
            scope.expensesPieChartLabels = [];
            scope.expensesPieChartData = [];
            var data = {
              start : moment( scope.start_date ).startOf("month").format( 'MMMM DD, YYYY' ),
              end : moment( scope.end_date ).endOf("month").format( 'MMMM DD, YYYY' ),
              user_id : sessionFactory.getSession()
            }
            appModule.getSummaryMonth( data )
              .then(function(response){
                console.log(response);
                scope.monthly_income = response.data.monthly_income;
                scope.monthly_expenses = response.data.monthly_expenses;
                scope.monthly_balance = scope.monthly_income - scope.monthly_expenses;
                scope.weekly_values = response.data.weekly_values;
                scope.category_values = response.data.category_values;


                angular.forEach( scope.weekly_values, function( value, key ){
                  scope.expensesLineChartLabels.push( 'Week' + ( key + 1 ) );
                  scope.expensesLineChartData.push( value );
                });
                angular.forEach( scope.category_values, function( value, key ){
                  scope.expensesPieChartLabels.push( value.name );
                  scope.expensesPieChartData.push( value.value );
                });
                if( scope.monthly_expenses == 0 ){
                  scope.expensesPieChartLabels.push( "No Expenses yet" );
                  scope.expensesPieChartData.push( 1 );
                }
                
              });
          }
        // -------------------- --------- //

        // ------- INITIALIZE PLUGINS -------- //
          scope.initializePieChart = ( ) =>{
            scope.expensesPieChartOptions = {
              legend: {
                display: true,
                position: 'left',
                labels: {
                    fontStyle: 'bold',
                    fontSize: 14,
                    boxWidth: 10,
                },
              },
            }
          }
          scope.initializeLineChart = ( ) =>{
            scope.expensesLineChartOptions = {
              scales: {
                yAxes: [{
                  ticks: {
                    suggestedMin: 0,
                    beginAtZero: true 
                  }
                }]
              }
            }
          }
          scope.$on('filter_dates', scope.getSummary);
        // ------------------------- //

        

        scope.onLoad = ( ) =>{
          scope.fetchMonthSummary();
          scope.initializePieChart();
          scope.initializeLineChart();
        }

        scope.onLoad();

        

      }
    }


  }
])