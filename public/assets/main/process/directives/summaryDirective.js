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
        
        scope.expensesPieChartLabels = ['A','B','C'];
        scope.expensesPieChartData = [3,5,1];
        scope.expensesLineChartLabels = ['A','B','C','D','E','F','G','H'];
        scope.expensesLineChartData = [20,10,44,21,55,95,11,39];


        // ------- HTTP REQUEST -------- //
          scope.getSummary = ( ev, data ) =>{
            console.log( data );
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
              
            }
          }
          scope.$on('filter_dates', scope.getSummary);
        // ------------------------- //

        

        scope.onLoad = ( ) =>{
          scope.initializePieChart();
          scope.initializeLineChart();
        }

        scope.onLoad();

        

      }
    }


  }
])