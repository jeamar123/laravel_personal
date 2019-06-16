  app.directive('authDirective', [
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
        console.log( "authDirective Runinng !" );

        scope.isSignupShow = false;

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
          var data = {
            email: login_data.email,
            password: login_data.password
          }
          appModule.loginUser(data)
            .then(function(response) {
              console.log(response);
              if( response.data.status ){
                console.log( 'eut' );
                scope.login_err = false;
                sessionFactory.setSession( response.data.user.id );
                $state.go('dashboard');
              }else{
                scope.login_err = true;
              }
            });
        }

        scope.signup = ( signup_data ) =>{
          console.log(signup_data);

          if( scope.checkEmail( signup_data.email ) == true ){
            scope.email_invalid_err = false;
            if( signup_data.password == signup_data.re_password ){
              scope.password_err = false;
            }else{
              scope.password_err = true;
            }
          }else{
            scope.email_invalid_err = true;
          }
          var data = {
            name: signup_data.name,
            email: signup_data.email,
            password: signup_data.password
          }
          appModule.signupUser(data)
            .then(function(response) {
              console.log(response);
              if( response.data.status ){
                scope.some_err = false;
                scope.err_message = null;
                scope.some_succ = true;

              }else{
                scope.some_succ = false;
                scope.some_err = true;
                scope.err_message = response.data.message;
              }
            });
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