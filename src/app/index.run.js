(function() {
  'use strict';

  angular
    .module('bookDoodleApp')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {
    $log.info('AngularJS injection (using $inject) is complete');
    $log.info('Application running');
  }

})();
