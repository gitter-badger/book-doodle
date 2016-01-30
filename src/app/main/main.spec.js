describe("The main controller", function() {
  beforeEach(module('bookDoodleApp'));

  var MainController, $security, $log;
  beforeEach(function() {
    inject(function(_$controller_, _$log_, _$security_) {
      $security = _$security_;
      $log = _$log_;
      spyOn($security.$user, 'getCurrentUser').and.callThrough();
      spyOn($security.$user, 'getUserActivities').and.callThrough();
      spyOn($security.$user, 'getRecentBooks').and.callThrough();

      // Instantiate the MainController
      MainController = _$controller_('MainController', {
        $log: _$log_,
        $security: _$security_
      });
    });
  });

  it('logs its instantiation', function() {
    expect($log.debug.logs).not.toBe([]);
  });

  it('gets the current user', function() {
    expect($security.$user.getCurrentUser).toHaveBeenCalled();
  });

  describe('exposes the user\'s activities', function() {
    it('by getting them', function() {
      expect($security.$user.getUserActivities).toHaveBeenCalledWith(ActivityType.READING);
      expect($security.$user.getUserActivities).toHaveBeenCalledWith(ActivityType.WRITING);
    });

    it('and formats them correctly', function() {
      expect(MainController.readingData).toBeTruthy();
      expect(MainController.writingData).toBeTruthy();
      expect(MainController.readingData).toEqual(jasmine.objectContaining({
        labels: jasmine.any(Array),
        series: jasmine.any(Array)
      }));
      expect(MainController.writingData).toEqual(jasmine.objectContaining({
        labels: jasmine.any(Array),
        series: jasmine.any(Array)
      }));
    });
  });

  describe('exposes the user\'s recent books', function() {
    it('by getting them', function() {
      expect($security.$user.getRecentBooks).toHaveBeenCalled();
    });

    it('and formats them correctly', function() {
      _.each(MainController.recentReadingBooks, function(val) {
        expect(val).toEqual(jasmine.objectContaining({
          name: jasmine.any(String),
          id: jasmine.any(String),
          children: jasmine.any(Array)
        }));
      });
      _.each(MainController.recentWritingBooks, function(val) {
        expect(val).toEqual(jasmine.objectContaining({
          name: jasmine.any(String),
          id: jasmine.any(String),
          children: jasmine.any(Array)
        }));
      });
    });
  });
});
