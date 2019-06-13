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
        scope.expensesPieChartData = [1,2,3];
        scope.expensesLineChartLabels = ['A','B','C','D','E','F','G','H'];
        scope.expensesLineChartData = [20,10,44,21,55,95,11,39];
        scope.start_date = moment();
        scope.end_date = moment();
        scope.dateFilterVal = moment();




        scope.toggleDatePicker = ( ) =>{
          
        }
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
          $('.datepicker-input').on('apply.daterangepicker', function(ev, picker) {
            console.log( ev );
            console.log( picker );
          });
        }
        scope.initializeEventListeners = ( ) =>{
          $("body").click(function(e){
            if ( $(e.target).parents(".date-btn").length === 0) {
            }
          });
        }

        scope.onLoad = ( ) =>{
          scope.initializePieChart();
          scope.initializeLineChart();
          scope.initializeDatePickers();
          scope.initializeEventListeners();
        }

        scope.onLoad();

        

      }
    }


  }
])