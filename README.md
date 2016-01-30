# BookDoodle [![Build Status](https://travis-ci.org/book-doodle/book-doodle.svg?branch=master)](https://travis-ci.org/book-doodle/book-doodle)

[![Join the chat at https://gitter.im/book-doodle/book-doodle](https://badges.gitter.im/book-doodle/book-doodle.svg)](https://gitter.im/book-doodle/book-doodle?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

<a href="https://zenhub.io"><img src="https://raw.githubusercontent.com/ZenHubIO/support/master/zenhub-badge.png"></a>

Hi, hello, how d'you do?

I'm Eshan Singh. And I am a teenager trying to make apps. 

'Nuff said.

### What is this thing?

It's a web app for writing & reading books. You can track how much you're reading and/or writing and set goals for those things. When you're writing,
you'll get hints for your grammar and spelling, but thanks to the power of text processing, the app's going to _understand_ your text, and deliver contextual
information about it. And when you're reading, thanks to that same text processing, you can get reminded of something you forgot. And of course you can 
leave comments on books.

All of this cool stuff is under construction. Right now there's not much here.

### Why did you decide to make it?

Because (believe it or not), I'm an avid reader and wanted to make a better place for open books & expressing ideas. Normally you have to deal with 
publishers and page layout and all that stuff, when most people (at least me) want to just get on with expressing their idea and recieving quick, 
easy-to-access feedback on it to improve. Speaking of improving, getting a second edition of your book printed just because of that one mistake is kinda
a hassle. So, I made this.

### I wanna contribute!

Really? Thanks! Tell me by emailing me at [eshansingh@gmail.com](malito:eshansingh@gmail.com). After that, you can fork and start making fantastic stuff!

##### Contributing guide

The workflow here is powered by gulp. No, not grunt. Gulp. I don't like Grunt. It has a funny name.
The app itself is built using AngularJS.

Anyway, all the code is in the `src` directory. The index.html is outside of it, though. Since this is a SPA (Single Page App), the index remains the same and the 
view is dynamically put there thanks to `ngRoute`. I use wiredep to put all the scss & javascript files there automatically, so don't worry about that. Even all the
bower dependencies are put.

If you're installing a new bower dependency, ALWAYS remember to append `--save` to it (unless it's a dev thing, in which case `--save-dev`), otherwise this wiredep
thing won't work. Also, always install production dependencies using bower, not npm. For dev, you can use either one.

Testing is pretty easy. Karma's already set up. Plop a `.spec.js` file anywhere and write your tests using Jasmine. Then run `gulp test` to run all of them.
Use [ngMock](https://docs.angularjs.org/api/ngMock) to get controllers and services to test. The module is named `bookDoodleApp`.

To build the app, use `gulp build`. This will create a `dist` folder containing agrresively minified JavaScript, CSS, and HTML. It's pretty cool.

To view the app on a live development server that watches for changes, use `gulp serve`. If you want to run the dist version mentioned above, use `gulp serve:dist`.

Put all directives in `global/directive`. Put all services in `global/service`. Put objects in `components/objects`.

###### Specific coding stuff.
Just some things.

+ Use 2 spaces instead of a tab/4 spaces. This should be enforced if you choose to accept the `.editorconfig`.
+ Wrap all code in an IIFE.
+ When writing a controller/directive/service/filter/anyting AngularJS-y, declare the funtion seperately instead of inside the arguments. Which means:

Use this:

```js
(function() {
  angular.module('bookDoodleApp')
    .factory('$someService', SomeService);

  /** @ngInject */
  function SomeService($whateverStuffYouNeed) {
  }
});
```

Instead of this:

```js
(function() {
  angular.module('bookDoodleApp')
    .factory('$someService', function($whateverStuffYouNeed) {
    });
});
```

This is so that the `@ngInject` comment can use `ng-annotate`, to protect against the aggresive minifiers.

+ All services start with `$`. All controllers end with `Controller` and NOT `Ctrl`.
+ Prefer using [stampit](https://www.github.com/stampit-org/stampit) to create objects. 
+ Use braces on the same line. I.E:

```js
function Something() {
}

// NOT
function Something() 
{
}
```

### License

See LICENSE.md
