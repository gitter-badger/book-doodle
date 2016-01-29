(function() {
  'use strict';

  angular.module('bookDoodleApp')
    .directive('jqTree', JqTreeDirective);

  /** @ngInject */
  function JqTreeDirective($log) {
    return {
      restrict: 'A',
      scope: {
        opts: '=jqTree'
      },
      link: function(scope, element, attrs) {
        element.tree(scope.opts);
      }
    };
  }
})();
