'use strict';

var gulp = require('gulp');
var karma = require('karma').server;
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var clean = require('gulp-clean');
var mocha = require('gulp-mocha');

gulp.task('clean', function() {
	gulp.src('results', {read: false})
		.pipe(clean());
});

gulp.task('lint', function() {
  gulp.src(['client/app/**/*.js', 'server/**/*js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

// Combined task test to test client then server (via callback)
gulp.task('test', function (cb) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, function() {
    gulp.src(['server/api/user/user.model.spec.js', 'server/auth/auth.FbHandlers.specs.js', 'server/game/mechanics.specs.js'])
      .pipe(mocha())
      .on('end', function() {
        console.log('hit end');
        process.exit(0);
      });
  })
});

gulp.task('watch', function() {
	gulp.watch(['client/**/*.js', 'server/**/*.js'], ['clean', 'lint', 'test']);
});

gulp.task('default', ['clean', 'lint', 'test']);
