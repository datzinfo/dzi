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
  var lazypipe = require('lazypipe');
  var runSequence = require('run-sequence');
  var appDir = 'public';
  var distDir = 'public-dist';
  var isProduction = (args.target === 'production' || args.target === undefined);

  gulp.task('bower', function() {
    return $.bower();
  });

  gulp.task('bower:copy-images', function () {
	    return gulp.src([appDir + '/images/**/*.*'])
	      .pipe(gulp.dest(distDir+'/images'));
  });

  gulp.task('bower:copy-fonts', function () {
	    return gulp.src([appDir + '/fonts/**/*.*'])
	      .pipe(gulp.dest(distDir+'/fonts'));
  });

  gulp.task('html', [], function () {
	var sources = gulp.src([appDir + '/**/*.*', '!' + appDir + '/images/**/*.*', '!' + appDir + '/fonts/**/*.*', '!' + appDir + '/lib/**/*.*', '!' + appDir + '/node_modules/**/*.*'], 
                {read: false});
    return gulp.src([appDir + '/**/*.html'])
      .pipe($.if('index.html', $.inject(sources, {relative: true})))
      .pipe($.useref({searchPath: appDir},
            lazypipe().pipe($.sourcemaps.init, {loadMaps:true})))
      .pipe($.if('**/dependencies.min.js', $.if(isProduction, $.uglify())))
      .pipe($.if('**/app.min.js', $.if(isProduction, $.uglify())))
      .pipe($.if('**/app.min.css', $.if(isProduction, $.minifyCss())))
      .pipe($.if('*.html', $.if(isProduction, $.minifyHtml({ 'empty': true, 'quotes': true }))))
      .pipe(gulp.dest(distDir))
      .pipe($.size({ 'title': 'html' }));
  });

  gulp.task('clean', function() {
		return del([distDir]);
  });
  
  gulp.task('dist', [], function (cb) {
	    runSequence('clean', [ 'html', 'bower:copy-images', 'bower:copy-fonts' ], cb);
  });
}());