(function() {
  'use strict';

    angular.module('bookDoodleApp') .controller('MainController', MainController);

    /** @ngInject */
    function MainController($log, $security, $mdMedia) {
      var vm = this;
      $log.debug("MainController instantiated.");

      var user = $security.$user();
      vm.user = user.getCurrentUser();

      var readingActivty = user.getUserActivites(ActivityType.READING);
      var writingActivity = user.getUserActivites(ActivityType.WRITING);

      vm.readingData = {
        labels: readingActivty.map(function(n) {
          return n.day.format('{Weekday}');
        }),
        series: [
          readingActivty.map('did')
        ]
      };
      vm.opts = {
        height: 250,
        low: 300,
        width: ($('.main__chart-container').width()) / 2,
        axisX: {
          showGrid: false
        },
        showArea: true,
        lineSmooth: Chartist.Interpolation.cardinal({
          tension: 3
        })
      };
      vm.responsiveOpts = [
        ['screen and (max-width: 640px)', {
          width: $('.main__chart-container').width()
        }]
      ];
      vm.writingData = {
        labels: writingActivity.map(function(n) {
          return n.day.format('{Weekday}');
        }),
        series: [
          writingActivity.map('did')
        ]
      };

      var recentWritingBooks = user.getRecentBooks().filter(function(n) {
        return n.actionType === BookActionType.WRITING;
      }).map(function(n) {
        return {
          name: n.title,
          id: n.numericId,
          children: n.recentChapters
        };
      });
      var recentReadingBooks = user.getRecentBooks().filter(function(n) {
        return n.actionType === BookActionType.READING;
      }).map(function(n) {
        return {
          name: n.title,
          id: n.numericId,
          children: n.recentChapters
        };
      });
      vm.treeReadingOpts = {
        data: recentReadingBooks,
        autoOpen: false,
        dragAndDrop: false,
        autoEscape: false,
        closedIcon: '¶',
        openedIcon: '✍',
        selectable: false
      };
      vm.treeWritingOpts = _.extend({ data: recentWritingBooks }, vm.treeReadingOpts);
    }
})();
