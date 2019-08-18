app.directive('settingsDirective', [
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
        console.log( "settingsDirective Runinng !" );

        scope.category_data = {};
        scope.update_details_data = {};
        scope.update_password_data = {};
        scope.user_info = {};
        scope.isEditDetailsModal = false;
        scope.isEditPasswordModal = false;
        scope.isCategoriesModal = false;


        scope.addCategoryModal = () =>{
          scope.isCategoriesModal = true;
        }
        scope.editPasswordModal = () =>{
          scope.isEditPasswordModal = true;
        }
        scope.editDetailsModal = () =>{
          scope.isEditDetailsModal = true;
          scope.update_details_data = scope.user_info;
        }
        scope.closeModal = () =>{
          scope.isEditDetailsModal = false;
          scope.isEditPasswordModal = false;
          scope.isCategoriesModal = false;
        }

        // ------- HTTP REQUEST -------- //

          scope.updateDetails = ( update_data ) =>{
            console.log( update_data );
          }
          scope.updatePassword = ( update_data ) =>{
            console.log( update_data );
          }
          scope.addCategory = ( data ) =>{
            console.log( data );
          }
          scope.deleteCategory = ( id ) =>{
            console.log( id );
            swal({
              title: "Confirm",
              text: "are you sure you want to delete this Category?",
              type: "warning",
              showCancelButton: true,
              closeOnConfirm: true,
              animation: "slide-from-top"
            }, function(isTrue){
              if(isTrue){
                appModule.removeCategory( id )
                  .then(function(response){
                    // console.log(response);
                    if( response.data.status == true ){
                      swal( 'Success!', response.data.message, 'success' );
                      scope.onLoad();
                    }else{
                      swal( 'Error!', response.data.message, 'error' );
                    }
                  });
              }
            });
          }
          scope.fetchUserInfo = ( ) =>{
            appModule.getUserInfo( sessionFactory.getSession() )
              .then(function(response){
                console.log( response );
                scope.user_info = response.data.user;
              });
          }
        // -------------------- --------- //

        // ------- INITIALIZE PLUGINS -------- //
          $("body").click(function(e){
            // if ( $(e.target).parents(".modal-container").length === 0) {
            if ( e.target.className == 'modal-wrapper' ) {
              scope.isEditDetailsModal = false;
              scope.isEditPasswordModal = false;
              scope.isCategoriesModal = false;
              scope.$apply();
            }
          });
        // ------------------------- //

        scope.showLoading = ( ) =>{
          $( ".main-loader" ).show();
        }
        scope.hideLoading = ( ) =>{
          setTimeout(function() {
            $( ".main-loader" ).fadeOut();
          }, 1000);
        }

        scope.onLoad = ( ) =>{
          scope.fetchUserInfo();
        }

        scope.onLoad();

        

      }
    }


  }
])