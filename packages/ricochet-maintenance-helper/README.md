# ricochet-maintenance-helper

A simple package that reports Meteor and package versions to the Ricochet Maintenance Product.

## Installation

``` sh
$ meteor add ricochet-maintenance-helper
```

## Configuration

Set 2 environment variables:
* RMP_PROJECT_NAME - http://yourdomain.tld
* RMP_KEY - The API key you were given during registration

That's it! Every hour, the Ricochet Maintenance Helper package will review your app's Meteor release and package version. If any updates are needed, they will be reported to the Ricochet Maintenance Product.