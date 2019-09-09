var appService = angular.module('appService', [])

appService.factory('appModule', function( serverUrl, $http ){
  var appFactory = {};

  // appFactory.sendNotification = function( data ) {
  //   return $http.post('http://handsomedev.com:8080/api/notify', data);
  // };

  appFactory.loginUser = function( data ) {
  	
    return $http.post(serverUrl.url + 'api/login', data);
  };

  appFactory.signupUser = function( data ) {
    return $http.post(serverUrl.url + 'api/signup', data);
  };

  appFactory.getUserInfo = function( id ) {
    return $http.get(serverUrl.url + 'api/user/' + id);
  };

  appFactory.updateUserInfo = function( data ) {
    return $http.post(serverUrl.url + 'api/user/update', data);
  };

  appFactory.updatePasswordValue = function( data ) {
    return $http.post(serverUrl.url + 'api/user/update/password', data);
  };

  // CATEGORIES

  appFactory.getExpensesCategories = function(  ) {
    return $http.get(serverUrl.url + 'api/expenses_categories');
  };

  // EXPENSES

  appFactory.getExpensesPerMonth = function( data ) {
    return $http.post(serverUrl.url + 'api/expenses/month', data);
  };

  appFactory.submitExpenses = function( data ) {
    return $http.post(serverUrl.url + 'api/expenses/add', data);
  };

  appFactory.saveExpenses = function( data ) {
    return $http.post(serverUrl.url + 'api/expenses/update', data);
  };

  appFactory.removeExpenses = function( data ) {
    return $http.post(serverUrl.url + 'api/expenses/delete', data);
  };

  // ASSETS

  appFactory.getAssetsPerMonth = function( data ) {
    return $http.post(serverUrl.url + 'api/income/month', data);
  };

  appFactory.submitAssets = function( data ) {
    return $http.post(serverUrl.url + 'api/income/add', data);
  };

  appFactory.saveAssets = function( data ) {
    return $http.post(serverUrl.url + 'api/income/update', data);
  };

  appFactory.removeAssets = function( data ) {
    return $http.post(serverUrl.url + 'api/income/delete', data);
  };

  appFactory.getSummaryMonth = function( data ) {
    return $http.post(serverUrl.url + 'api/summary/month', data);
  };


  return appFactory;
});