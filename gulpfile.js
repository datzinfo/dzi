(function () {
  'use strict';

  var args = require('yargs')
  .env()
  .option('t', {alias:'target', default: 'development'})
  .option('open', {default: true})
  .argv;
  var gulp = require('gulp');
  var $ = require('gulp-load-plugins')();
  var del = require('del');
  var runSequence = require('run-sequence');
//  var browserSync = require('browser-sync').create();
  var appDir = 'public';
  var distDir = 'public-dist';
  var isProduction = (args.target === 'production' || args.target === undefined);

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

  gulp.task('bower:copy-lib', function () {
    return gulp.src([appDir + '/lib/**/*.*', appDir + '/lib/**/.*', appDir + '/lib/**/*'])
      .pipe(gulp.dest(distDir+'/lib'));
  });

  gulp.task('bower:copy-images', function () {
	    return gulp.src([appDir + '/images/**/*.*'])
	      .pipe(gulp.dest(distDir+'/images'));
  });

  gulp.task('bower:copy-fonts', function () {
	    return gulp.src([appDir + '/fonts/**/*.*'])
	      .pipe(gulp.dest(distDir+'/fonts'));
  });

  //gulp.task('html', [ 'bower', 'js:compile', 'ng:templatecache'], function () {
  gulp.task('html', [], function () {
    return gulp.src([appDir + '/**/*.*', '!' + appDir + '/images/**/*.*', '!' + appDir + '/fonts/**/*.*', '!' + appDir + '/lib/**/*.*', '!' + appDir + '/node_modules/**/*.*'])
      .pipe($.if('*.js', $.if(isProduction, $.uglify())))
      .pipe($.if('*.css', $.if(isProduction, $.minifyCss())))
      .pipe($.useref())
      .pipe($.if('*.html', $.if(isProduction, $.minifyHtml({ 'empty': true, 'quotes': true }))))
      .pipe(gulp.dest(distDir))
      .pipe($.size({ 'title': 'html' }));
  });

  gulp.task('clean', function() {
		// You can use multiple globbing patterns as you would with `gulp.src` 
		return del([distDir]);
  });
  
  gulp.task('dist', [], function (cb) {
	    runSequence('clean', [ 'html', 'bower:copy-lib', 'bower:copy-images', 'bower:copy-fonts' ], cb);
  });
}());