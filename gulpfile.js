'use strict';

var gulp = require('gulp');
var karma = require('karma').server;

gulp.task('test', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
});

// var jshint = require('gulp-jshint');

// gulp.task('lint', function() {
//   gulp.src(['client/**/*.js'])
//     .pipe(jshint())
//     .pipe(jshint.reporter('default'));
// });

// gulp.task('watch', function() {
	// gulp.watch(/* insert path to files here */);
	// gulp.watch(/* insert path to tests here */);
// });

gulp.task('default', function() {
	console.log('default task runs!');
});