(function() {
  angular.module('bookDoodleApp')
    .value('froalaConfig', {
      language: "en_us",
      placeholderText: 'Start typing...',
      tabSpaces: 4,
      codeMirrorOptions: {
        tabSize: 4,
        mode: 'text/html',
        indentWithTabs: true,
        lineNumbers: false
      },
      theme: 'dark'
    });
})();
