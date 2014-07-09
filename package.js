Package.describe({
  summary: "Famo.us Scrollview that is populated by  cursor"
});

Package.on_use(function (api, where) {
  api.use(['famono'], 'client');

  api.add_files('src/cursorScrollView.js', 'client');

  api.export('CursorScrollView', 'client');
});

Package.on_test(function (api) {
  api.use('cursorScrollView');

  api.add_files('cursorScrollView_tests.js', ['client', 'server']);
});
