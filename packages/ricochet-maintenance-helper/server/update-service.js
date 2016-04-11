/**
 * @file Service object that checks and reports updates to the Ricochet Maintenance API.
 */

UpdateService = {
  apiUrl: 'https://maintenance.projectricochet.com',
  postUpdatesPath: '/ricochet-maintenance/post-update',
  
  /**
   * Check for Meteor and package (not yet implemented) updates.
   */
  checkForUpdates () {
    Meteor.defer(() => {
      var meteorRelease = this.checkMeteorRelease();
      if (! (meteorRelease instanceof Error)) {
        if (meteorRelease.needsUpdate) {
          this.reportUpdate('Meteor', meteorRelease.local, meteorRelease.latest);
        }
      }
    });
  },
  
  /**
   * Determine app's Meteor release and whether it is the latest
   *
   * @return {Object} with - needsUpdate (Boolean), local (String), latest (String)
   */
  checkMeteorRelease () {
    // Determine app's Meteor release
    var localRelease = Meteor.release.replace('METEOR@', '');
    
    // Check latest release by making an http request to Meteor's History.md on Github
    try {
      var response = HTTP.get('https://raw.githubusercontent.com/meteor/meteor/master/History.md');
    } catch (e) {
      return e;
    }
    
    // First line is always the latest release
    var lines = response.content.split('\n\n');
    var latestRelease = lines[0].replace('## v', ''); // Remove a few extra characters
    
    return {
      needsUpdate: localRelease !== latestRelease,
      local: localRelease,
      latest: latestRelease
    };
  },
  
  /**
   * Report an update to the Ricochet Maintenance Product API
   *
   * @param {String} name - name of the package
   * @param {String} local - local version
   * @param {String} latest - latest version
   */
  reportUpdate (name, local, latest) {
    var projectName = process.env.RMP_PROJECT_NAME;
    if (! projectName)
      throw new Meteor.Error('missing-configuration', 'RMP_PROJECT_NAME environment variable needs to be set');
    var key = process.env.RMP_KEY;
    if (! key)
      throw new Meteor.Error('missing-configuration', 'RMP_KEY environment variable needs to be set');
    
    console.log(`Ricochet Maintenance Helper - Reporting update for ${name} (local version: ${local}, latest version: ${latest})`);
    
    var data = {
      project_name: process.env.RMP_PROJECT_NAME,
      key: process.env.RMP_KEY,
      module_version: Constants.version,
      api_version: Constants.apiVersion,
      updates: {
        [name]: {
          status: 4,
          name: name,
          existing_version: local,
          recommended: latest
        }
      }
    };
    var dataJSON = JSON.stringify(data);
    var dataQueryString = Utility.toQueryString({ data: dataJSON });
    
    return HTTP.call('POST', this.apiUrl + this.postUpdatesPath, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      content: dataQueryString
    });
  }
};