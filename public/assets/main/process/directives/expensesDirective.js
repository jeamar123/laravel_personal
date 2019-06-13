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

        scope.expenses_arr = [
          {
            showDrop : false,
          },
          {
            showDrop : false,
          },
          {
            showDrop : false,
          },
          {
            showDrop : false,
          },
          {
            showDrop : false,
          },
        ];

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
        scope.showLoading = ( ) =>{
          $( ".main-loader" ).css('display','flex');
        }
        scope.hideLoading = ( ) =>{
          setTimeout(function() {
            $( ".main-loader" ).fadeOut();
          }, 1000);
        }




        scope.onLoad = ( ) =>{
          // scope.showLoading();
        }

        scope.onLoad();

        // $('.modal').modal({
        //   keyboard : false
        // });

        $('.modal').on('hidden.bs.modal', function (e) {
          scope.resetValues();
        })

      }
    }


  }
])