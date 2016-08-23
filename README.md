# Evercurrent

A simple package that reports Meteor and package versions to the Evercurrent server.

## Installation

``` sh
$ meteor add evercurrent
```

## Configuration

Set 2 environment variables:
* EVERCURRENT_PROJECT_NAME - http://yourdomain.tld
* EVERCURRENT_KEY - The API key you were given during registration

That's it! Every hour, the Evercurrent package will review your app's Meteor release and package version. If any updates are needed, they will be reported to the Evercurrent server.