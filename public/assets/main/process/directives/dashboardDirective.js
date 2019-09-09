app.directive('dashboardDirective', [
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
        console.log( "dashboardDirective Runinng !" );
        scope.user_info = {};

        scope.fetchUserInfo = ( ) =>{
          appModule.getUserInfo( sessionFactory.getSession() )
            .then(function(response){
              console.log( response );
              scope.user_info = response.data.user;
            });
        }

        scope.onLoad = ( ) =>{
          scope.fetchUserInfo();
        }

        scope.onLoad();


        scope.$on('refreshUserInfo', function(event, args) {
          scope.onLoad();
        });

      }
    }


  }
])