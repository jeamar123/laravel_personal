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
        scope.expensesChartLabels = ['A','B','C'];
        scope.expensesChartData = [1,2,3];

        scope.initializeChart = ( ) =>{
          $timeout(function() {

          }, 300);
          scope.expensesChartOptions = {
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

        scope.onLoad = ( ) =>{
          scope.initializeChart();
        }

        scope.onLoad();

      }
    }


  }
])