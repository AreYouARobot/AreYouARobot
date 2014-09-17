'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');

gulp.task('test', function() {
	gulp.src('./**/*spec.js', {read: false})
	  .pipe(mocha({reporter: 'spec'}));
});

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