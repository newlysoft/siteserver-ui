'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var rename = require("gulp-rename");
var minify = require('gulp-minifier');
var replace = require('gulp-replace');
var runSequence = require('run-sequence');
var del = require('del');

gulp.task('build-clean', function () {
  return del(['./dist']);
});

gulp.task('build-css', function () {
  return gulp.src('./src/*.scss').pipe(sourcemaps.init()).pipe(sass().on('error', sass.logError)).pipe(sourcemaps.write()).pipe(gulp.dest('./dist'));
});

gulp.task('build-min', function () {
  return gulp.src('./dist/siteserver.css').pipe(minify({
    minify: true,
    collapseWhitespace: true,
    conservativeCollapse: true,
    minifyJS: false,
    minifyCSS: true,
    minifyHTML: false
  })).pipe(rename('siteserver.min.css')).pipe(gulp.dest('./dist'));
});

gulp.task('build-docs', function () {
  gulp.src('./dist/**').pipe(gulp.dest('./docs/assets/css'));
});

gulp.task('build', function (callback) {
  runSequence('build-clean', 'build-css', 'build-min', 'build-docs', callback);
});