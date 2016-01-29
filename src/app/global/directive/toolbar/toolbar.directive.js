(function() {
  'use strict';

  angular.module('bookDoodleApp')
    .directive('toolBar', ToolBarDirective);

  function ToolBarDirective() {
    return {
      restrict: 'EM',
      templateUrl: 'app/global/directive/toolbar/toolbar.template.html',
      replace: false,
      scope: {
        titleText: "@text"
      }
    };
  }
})();
