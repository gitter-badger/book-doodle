(function() {
  'use strict';

  angular
    .module('bookDoodleApp')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/board', {
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/board'
      });
  }

})();
