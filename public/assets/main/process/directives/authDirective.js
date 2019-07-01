  app.directive('authDirective', [
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
        console.log( "authDirective Runinng !" );

        scope.isSignupShow = false;
        scope.login_data = {};
        scope.signup_data = {};

        scope.checkEmail = (email) => {
          var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
          return regex.test(email);
        }

        scope.toggleSignup = ( ) =>{
          if( scope.isSignupShow == false ){
            scope.isSignupShow = true;
          }else{
            scope.isSignupShow = false;
          }
        }

        scope.login = ( login_data ) =>{
          if( !login_data.email || !login_data.password ){
            swal('Error!', 'Email and Password is required.','error');
            return false;
          }
          var data = {
            email: login_data.email,
            password: login_data.password
          }
          scope.showLoading();
          appModule.loginUser(data)
            .then(function(response) {
              // console.log(response);
              if( response.data.status ){
                sessionFactory.setSession( response.data.user.id );
                $state.go('dashboard');
              }else{
                swal('Error!', response.data.message,'error');
              }
              scope.hideLoading();
            });
        }

        scope.signup = ( signup_data ) =>{
          if( !signup_data.name ){
            swal('Error!', 'Full Name is required.','error');
            return false;
          }
          if( !signup_data.email ){
            swal('Error!', 'Email is required.','error');
            return false;
          }
          if( !signup_data.password ){
            swal('Error!', 'Password is required.','error');
            return false;
          }
          if( scope.checkEmail( signup_data.email ) == true ){
            if( signup_data.password != signup_data.re_password ){
              swal('Error!', 'Passwords did not match.','error');
              return false;
            }
          }else{
            swal('Error!', 'Email Format is invalid.','error');
            return false;
          }
          var data = {
            name: signup_data.name,
            email: signup_data.email,
            password: signup_data.password
          }
          scope.showLoading();
          appModule.signupUser(data)
            .then(function(response) {
              // console.log(response);
              if( response.data.status ){
                swal('Success!', response.data.message,'success');
                scope.isSignupShow = false;
              }else{
                swal('Error!', response.data.message,'error');
              }
              scope.hideLoading();
            });
        }

        scope.showLoading = ( ) =>{
          $( ".main-loader" ).show();
        }
        scope.hideLoading = ( ) =>{
          setTimeout(function() {
            $( ".main-loader" ).fadeOut();
          }, 1000);
        }

        scope.checkSession = ( ) =>{
          if( sessionFactory.getSession() > 0 ){
            $state.go('dashboard');
          }
        }

        scope.onLoad = ( ) =>{
          scope.checkSession();
        }

        scope.onLoad();

      }
    }


  }
])