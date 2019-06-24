app.factory('sessionFactory', function(localStorageService) {
  return {
      getSession: getSession,
      setSession: setSession,
      unsetUser: unsetUser,
  }
  function getSession(){
      return localStorageService.get('user_logged_in');
  }
  function setSession(data){
      localStorageService.set('user_logged_in',data);
  }
  function unsetUser( ){
      localStorageService.remove('user_logged_in');
  }
});