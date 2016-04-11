Meteor.startup(function () {
  // Check for updates on startup, then once every hour
  UpdateService.checkForUpdates();
  
  // Check for updates every hour
  Meteor.setInterval(function () {
    UpdateService.checkForUpdates();
  }, 3600000);
});
