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
  gulp.src(['client/app/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('test', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
});

gulp.task('servertest', function() {
  gulp.src(['server/api/messages/messages.spec.js'])
    .pipe(mocha())
    .on('end', function() {
      process.exit(0);
    });
});

gulp.task('watch', function() {
	gulp.watch(['client/**/*.js', 'server/**/*.js'], ['clean', 'lint', 'test', 'severtest']);
});

gulp.task('default', ['clean', 'lint', 'test', 'servertest']);
