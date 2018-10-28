app.controller('mainController', function( $state, $scope , $rootScope, $stateParams, sessionFactory){

	console.log( 'mainController running' );

	$scope.isRightShown = false;
	

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    // console.log(fromState);
    // console.log(toState);
    $scope.current = toState.name;
  });

	$scope.toggleRightBox = ( ) => {
		if( $scope.isRightShown == false ){
			$scope.isRightShown = true;
		}else{
			$scope.isRightShown = false;
		}
	}

	$scope.signOut = ( ) =>{
		swal({
      title: "Confirm",
      text: "are you sure you want to log out?",
      type: "warning",
      showCancelButton: true,
      closeOnConfirm: true,
      animation: "slide-from-top"
    }, function(isTrue){
      if(isTrue){
        sessionFactory.setSession( 0 );
        $state.go( 'auth' );
      }
    });
	}
	
	$scope.onLoad = ( ) => {

	}

	$scope.onLoad();

});
