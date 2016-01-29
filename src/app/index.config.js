(function() {
  'use strict';

  angular.module('bookDoodleApp')
         .config(config);

  function config($logProvider, $mdThemingProvider) {
    $logProvider.debugEnabled(true);

    $mdThemingProvider.theme('default')
      .primaryPalette('amber')
      .accentPalette('teal');
  }
})();
