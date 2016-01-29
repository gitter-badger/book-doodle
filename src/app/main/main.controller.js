(function() {
  'use strict';

    angular.module('bookDoodleApp')
      .controller('MainController', MainController);

    /** @ngInject */
    function MainController($log, $security) {
      var vm = this;
      $log.debug("MainController instantiated.");

      var user = $security.$user();
      vm.user = user.getCurrentUser();


      var readingActivty = user.getUserActivites(ActivityType.READING);
      var writingActivity = user.getUserActivites(ActivityType.WRITING);
      new Chartist.Line('#main__reading-chart', {
        labels: readingActivty.map(function(n) {
          return n.day.format('{Weekday}');
        }),
        series: [
          readingActivty.map('did')
        ],
      }, {
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
      }, [
        ['screen and (max-width: 640px)', {
          width: $('.main__chart-container').width()
        }]
      ]);
      var wrtingChart = new Chartist.Line('#main__writing-chart', {
        labels: writingActivity.map(function(n) {
          return n.day.format('{Weekday}');
        }),
        series: [
          writingActivity.map('did')
        ],
      }, {
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
      }, [
        ['screen and (max-width: 640px)', {
          width: $('.main__chart-container').width()
        }]
      ]);

      var recentWritingBooks = user.getRecentBooks().filter(function(n) {
        return n.actionType === BookActionType.WRITING;
      }).map(function(n) {
        return {
          label: n.title,
          id: n.numericId,
          children: n.recentChapters
        };
      });
      var recentReadingBooks = user.getRecentBooks().filter(function(n) {
        return n.actionType === BookActionType.READING;
      }).map(function(n) {
        return {
          label: n.title,
          id: n.numericId,
          children: n.recentChapters
        };
      });

      $('#main__reading-tree').tree({
        data: recentReadingBooks,
        autoOpen: false,
        dragAndDrop: false,
        autoEscape: false,
        closedIcon: '¶',
        openedIcon: '✍',
        selectable: false
      });
      $('#main__writing-tree').tree({
        data: recentWritingBooks,
        autoOpen: false,
        dragAndDrop: false,
        closedIcon: '¶',
        openedIcon: '✍',
        selectable: false
      });
    }
})();
