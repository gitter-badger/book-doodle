(function() {
  'use strict';

  // We're using a provider here so we can easily set up
  angular.module('bookDoodleApp')
    .provider('$security', SecurityServiceProvider);

  function SecurityServiceProvider() {
    var $security = {};
    // $user {{{
    $security.$user = stampit().
      methods({
        getCurrentUser: function() {
          // Server call goes here
          var username = 'Eshan Singh';
          var email = 'eshansingh@gmail.com';
          return User({
            username: username,
            email: email
          });
        },
        getUserBooks: function(type) {
          // Server call goes here

          // Format of user books is pretty simple. It's an object with a
          // reading & writing property, each of which is an array of objects.
          // Every book has a title, author, and a short description with an action
          // type telling you whether is being read or written.
          // It also has a numericId from which the contents of the book
          // can be requested from the server. And the time it was last touched.
          var books = {
            reading: [
              {
                title: 'The Advnentures of Tom Sawyer',
                author: 'A person',
                actionType: BookActionType.READING,
                descr: 'The book follows the amazing adventures of a boy named Tom Sawyer.',
                numericId: UUID.generate(), // Obviously this will later be generated at the
                                           // server side.
                lastTouched: Date.create('yesterday') // For now my plan is to have the
                                                      // server return a Unix epoch time for this.
              },
              {
                title: 'The Invisible Man',
                author: 'Yet another person',
                actionType: BookActionType.READING,
                descr: 'Man is invisible. Yippee!',
                numericId: UUID.generate(),
                lastTouched: Date.create('two days ago')
              }
            ],
            writing: [
              {
                title: 'Cow Jumped Over Moon',
                author: 'Eshan Singh',
                actionType: BookActionType.WRITING,
                descr: 'Cow is moon. Moon is cow. Mooo.',
                numericId: UUID.generate(),
                lastTouched: Date.create('three days before yesterday')
              },
              {
                title: 'Book A',
                author: 'Eshan Singh',
                actionType: BookActionType.WRITING,
                descr: 'Sample book',
                numericId: UUID.generate(),
                lastTouched: Date.create('a week ago')
              }
            ]
          };

          if (type === BookActionType.WRITING)
            return books.writing;
          else if (type === BookActionType.READING)
            return books.reading;
          else {
            return (books.writing).include(books.reading);
          }
        },
        getUserGoals: function(type) {
          var goals = {
            reading: [
              {
                type: GoalType.READING,
                num: 500
              },
              {
                type: GoalType.READING,
                appliesTo: GoalAppliesTo.WEEKENDS,
                num: 700
              }
            ],
            writing: [
              {
                type: GoalType.WRITING,
                num: 1000
              },
              {
                type: GoalType.WRITING,
                appliesTo: GoalAppliesTo.SPECIFIC_DAY,
                day: Date.create('tomorrow'), // Again, will be Unix epoch
                num: 300
              },
              {
                type: GoalType.WRITING,
                appliesTo: GoalAppliesTo.WEEKENDS,
                num: 600
              }
            ]
          };

          if (type === GoalType.READING)
            return goals.reading;
          else if (type === GoalType.WRITING)
            return goals.writing;
          else
            return (goals.reading).include(goals.writing);
        },
        getRecentBooks: function() {
          // Server call goes here

          var recentBooks = [
            {
              title: 'The Invisible Man',
              author: 'Yet another person',
              actionType: BookActionType.READING,
              descr: 'Man is invisible. Yippee!',
              numericId: UUID.generate(),
              lastTouched: Date.create('two days ago'),
              recentChapters: [
                {
                  name: 'Chapter 2',
                  numericId: UUID.generate()
                },
                {
                  name: 'Chapter 1',
                  numericId: UUID.generate()
                },
                {
                  name: 'Chapter 37',
                  numericId: UUID.generate()
                }
              ]
            },
            {
              title: 'A book',
              author: 'ZOmg author',
              actionType: BookActionType.READING,
              descr: 'hello',
              numericId: UUID.generate(),
              lastTouched: Date.create('yesterday'),
              recentChapters: [
                {
                  name: 'Chapter 2',
                  numericId: UUID.generate()
                },
                {
                  name: 'Chapter 1',
                  numericId: UUID.generate()
                },
                {
                  name: 'Chapter 37',
                  numericId: UUID.generate()
                }
              ]
            },
            {
              title: 'Words!',
              author: 'Some guy that writes and stuff',
              actionType: BookActionType.WRITING,
              descr: 'description of book',
              numericId: UUID.generate(),
              lastTouched: Date.create('today'),
              recentChapters: [
                {
                  name: 'Chapter 2',
                  numericId: UUID.generate()
                },
                {
                  name: 'Chapter 1',
                  numericId: UUID.generate()
                },
                {
                  name: 'Chapter 37',
                  numericId: UUID.generate()
                }
              ]
            },
            {
              title: 'LOLZOR',
              author: 'Some guy that writes and stuff',
              actionType: BookActionType.WRITING,
              descr: 'description of book',
              numericId: UUID.generate(),
              lastTouched: Date.create('today'),
              recentChapters: [
                {
                  name: 'Chapter 2',
                  numericId: UUID.generate()
                },
                {
                  name: 'Chapter 1',
                  numericId: UUID.generate()
                },
                {
                  name: 'Chapter 37',
                  numericId: UUID.generate()
                }
              ]
            }
          ];

          return recentBooks;
        },
        getUserActivities: function(type) {
          // Server call goes here

          var activtyLog = {
            reading: [
              {
                day: Date.create('26 Jan 2016'),
                activityType: ActivityType.READING,
                did: 500 // Number of words read/written.
              },
              {
                day: Date.create('27 Jan 2016'),
                activityType: ActivityType.READING,
                did: 520
              },
              {
                day: Date.create('28 Jan 2016'),
                activityType: ActivityType.READING,
                did: 700
              }
            ],
            writing: [
              {
                day: Date.create('27 March 2015'),
                activityType: ActivityType.WRITING,
                did: 800
              },
              {
                day: Date.create('two days before tomorrow'),
                activityType: ActivityType.WRITING,
                did: 840
              },
              {
                day: Date.create('tomorrow'),
                activityType: ActivityType.WRITING,
                did: 950
              }
            ]
          };

          if (type === ActivityType.READING)
            return activtyLog.reading;
          else if (type === ActivityType.WRITING)
            return activtyLog.writing;
          else
            return (activityLog.reading).include(activityLog.writing);
        }
      }).create();
      // }}}
    return {
      $get: function() {
        return $security;
      }
    };
  }
})();
