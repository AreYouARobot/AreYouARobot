// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2014-08-29 using
// generator-karma 0.8.3

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['mocha', 'chai'],

    // list of files / patterns to load in the browser
    files: [
      'client/lib/bower_components/angular/angular.js',
      'client/lib/bower_components/angular-mocks/angular-mocks.js',
      'client/lib/bower_components/restangular/dist/restangular.js',
      'client/lib/bower_components/ui-router/release/angular-ui-router.js',
      'client/app/**/*.js',
      'client/app/**/*spec.js'
    ],

    // list of files / patterns to exclude
    exclude: ['server/**/*.js'],

    // web server port
    port: 9786,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      // 'karma-chrome-launcher',
      // 'karma-jasmine',
      'karma-spec-reporter',
      'karma-mocha',
      'karma-chai',
      'karma-coverage'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    // singleRun: false,

    colors: true,

    // progress reporter: lists each test run and whether they pass/fail
    // coverage reporter: creates coverage reports for every tested browser
    reporters: ['spec', 'coverage'],

    preprocessors: {
      // Source files you want to generate coverage reports for
      // This should not include tests or libraries
      // These files will be instrumented by Istanbul
      'client/app/**/*.controller.js': ['coverage']
    },

    // Configure the reporter
    coverageReporter: {
      type: 'html',
      dir: 'results/coverage/'
    },

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
