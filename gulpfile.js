(function () {
  'use strict';

  var gulp = require('gulp');
  var $ = require('gulp-load-plugins')();
//  var del = require('del');
//  var runSequence = require('run-sequence');
//  var browserSync = require('browser-sync').create();
  var appDir = 'public';
  var distDir = 'public/assets';
  var isProduction = true;

  gulp.task('bower', function() {
    return $.bower();
  });

  gulp.task('js:compile', [], function () {
    return gulp.src([appDir + '/**/*.js', '!' + appDir + '/lib/**/*.js', '!' + appDir + '/node_modules/**/*.js'])
      .pipe($.preprocess())
      .pipe(gulp.dest(distDir))
      .pipe($.size({ 'title': 'js:compile' }));
  });

  // This minifies the angular html templates and then consolidate them into the template.js file for template caching
  gulp.task('ng:templatecache', function () {
    return gulp.src([ appDir + '/app/views/**/*.html' ])
      .pipe($.if(isProduction, $.minifyHtml({ 'empty': true })))
      .pipe($.angularTemplatecache('templates.js', { 'standalone': true }))
      .pipe(gulp.dest(distDir));
  });

  //gulp.task('html', [ 'bower', 'js:compile', 'ng:templatecache'], function () {
  gulp.task('html', [ 'bower', 'js:compile' ], function () {
    return gulp.src([appDir + '/**/*.*', '!' + appDir + '/lib/**/*.*', '!' + appDir + '/node_modules/**/*.*'])
      .pipe($.if('*.js', $.if(isProduction, $.uglify())))
      .pipe($.if('*.css', $.if(isProduction, $.minifyCss())))
      .pipe($.useref())
      .pipe($.if('*.html', $.if(isProduction, $.minifyHtml({ 'empty': true, 'quotes': true }))))
      .pipe(gulp.dest(distDir))
      .pipe($.size({ 'title': 'html' }));
  });

}());