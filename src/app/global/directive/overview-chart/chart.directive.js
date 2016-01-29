(function() {
  'use strict';

  angular.module('bookDoodleApp')
    .directive('overviewChart', OverviewChart);

  function OverviewChart() {
    return {
      restrict: 'EM',
      templateUrl: 'app/global/directive/overview-chart/chart.template.html',
      replace: false,
      scope: {
        type: '@'
      }
    };
  }
})();
