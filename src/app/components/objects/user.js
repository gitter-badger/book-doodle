var User = stampit().
  refs({
    username: '',
    email: '',
    avatarUri: ''
  }).
  init(function() {
    if (!this.email) {
      var _this = this;
      var error = "Email of User object\n {object} \nisn't defined".assign({
        object: _this
      });
      throw new TypeError(error);
    }

    var emailHash = $.md5(this.email);
    this.avatarUri = "http://www.gravatar.com/avatar/{hash}?d=identicon".assign({
      hash: emailHash
    });
  });

var GoalAppliesTo = stampit().
  static({
    EVERYDAY: 0,
    WEEKENDS: 1,
    WEEKDAYS: 2,
    SPECIFIC_DAY: 3
  });

var GoalType = stampit().
  static({
    READING: 0,
    WRITING: 1
  });

var ActivityType = stampit().compose(GoalType);
