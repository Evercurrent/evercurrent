Package.describe({
  name: 'evercurrent:evercurrent',
  version: '0.3.0',
  // Brief, one-line summary of the package.
  summary: 'Easy notifications for Meteor updates',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/Evercurrent/evercurrent',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.use('http');
  
  api.addFiles('server/evercurrent.js', 'server');
  api.addFiles('server/update-service.js', 'server');
  api.addFiles('server/utility.js', 'server');
  api.addFiles('server/constants.js', 'server');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('evercurrent:evercurrent');
  api.addFiles('evercurrent-tests.js');
});
