'use strict';

/*
 * load proper env file
 *
 */
if (!(process.env.NODE_ENV == 'production')) {
  if (process.env.NODE_ENV == 'test')
    require('dotenv').config({path: './config/env/.env.test'});
  else
    require('dotenv').config({path: './config/env/.env'});
}

var gulp = require('gulp');
var path = require('path');
var del = require('del');
var _ = require('lodash');
var $ = require('gulp-load-plugins')({
  pattern: '*',
});

var environment = $.util.env.type || 'development';
var isProduction = environment === 'production';
var webpackConfig = require('./webpack.config.js')[environment];
var port = $.util.env.port || 1337;
var src = 'public/';
var dist = 'public/build/';

var autoprefixerBrowsers = [
  'ie >= 9',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 6',
  'opera >= 23',
  'ios >= 6',
  'android >= 4.4',
  'bb >= 10'
];

gulp.task('scripts', function() {
  return gulp.src(webpackConfig.entry.Shoutbox)
    .pipe($.webpackStream(webpackConfig))
    .pipe(isProduction ? $.uglifyjs() : $.util.noop())
    .pipe(gulp.dest(dist + 'js/'))
    .pipe($.size({ title : 'js' }));
});

gulp.task('styles',function(cb) {
  return gulp.src(src + 'styles/core.styl')
    .pipe($.stylus({
      compress: isProduction,
      'include css' : true
    }))
    .pipe($.autoprefixer({browsers: autoprefixerBrowsers}))
    .pipe(gulp.dest(dist + 'css/'))
    .pipe($.size({ title : 'css' }));
});

gulp.task('styles:shoutbox', function(cb) {

  let source = `${src}styles/shoutbox/main.styl`;
  let destination = `${dist}css/`;

  return gulp.src(source)
    .pipe($.stylus({
      compress: isProduction,
      'include css': true
    }))
    .pipe($.autoprefixer({ browsers: autoprefixerBrowsers }))
    .pipe(gulp.dest(destination))
    .pipe($.size({ title: 'css' }));
})

gulp.task('styles:login', function(cb) {

  let source = `${src}styles/login.styl`;
  let destination = `${dist}css/`;

  return gulp.src(source)
    .pipe($.stylus({
      compress: isProduction,
      'include css': true
    }))
    .pipe($.autoprefixer({ browsers: autoprefixerBrowsers }))
    .pipe(gulp.dest(destination))
    .pipe($.size({ title: 'css' }));
})


gulp.task('serve', function() {
  $.nodemon({
    script: './bin/www',
    ext: '.js .jade .styl',
    ignore: ['node_modules/', 'bower_components/'],
    watch: ['views/', 'api/', 'controllers/', 'server.js']
  });
});

gulp.task('static', function(cb) {
  return gulp.src(src + 'static/**/*')
    .pipe($.size({ title : 'static' }))
    .pipe(gulp.dest(dist + 'static/'));
});

gulp.task('watch', function() {
  gulp.watch(src + 'styles/**/*.styl', ['styles', 'styles:shoutbox', 'styles:login']);
  //gulp.watch(src + 'index.html', ['html']);
  gulp.watch(src + 'apps/**/*.js', ['scripts']);
  gulp.watch(src + 'apps/**/*.jade', ['scripts']);
});

gulp.task('clean', function(cb) {
  del([dist], {}).then(function () { cb() });
});

// by default build project and then watch files in order to trigger livereload
gulp.task('default', ['build', 'serve', 'watch']);

// waits until clean is finished then builds the project
gulp.task('build', ['clean'], function() {
  gulp.start(['static','scripts','styles', 'styles:shoutbox', 'styles:login']);
});

// seed

gulp.task('db:seed', function () {

  var mongoose = require('mongoose');
  var dbConfig = require('./config/database');
  mongoose.connect(dbConfig[process.env.NODE_ENV].host);

  var userSeed = require('./config/seeds/users-seed');

  userSeed.seed();

});
