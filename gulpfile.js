var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var inject = require('gulp-inject');

var SRC_ASSETS = 'src/assets/**';
var DIST_ASSETS = 'dist/assets';

var HTML_PATH = 'index.html';
var JS_PATH = [
  'node_modules/phaser/dist/phaser.min.js',
  'src/**/*.js', 
  'src/*.js',
];
var DIST_PATH = 'dist';
var JS_DIST = 'dist/app.js';
var HTML_DIST = 'dist/index.html';

gulp.task('js', function () {
  return gulp.src(JS_PATH)
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DIST_PATH))
    .pipe(browserSync.stream());
});

gulp.task('assets', function () {
  return gulp.src(SRC_ASSETS)
    .pipe(gulp.dest(DIST_ASSETS))
    .pipe(browserSync.stream());
});

gulp.task('html', function () {
  return gulp.src(HTML_PATH)
    .pipe(gulp.dest(DIST_PATH))
    .pipe(browserSync.stream());
});

gulp.task('watch', function () {
  browserSync.init({
    server: './dist'
  });
  console.log('Watching JS...');
  gulp.watch(JS_PATH, ['js', 'html', 'inject']);

  console.log('Watching Assets...');
  gulp.watch(SRC_ASSETS, ['assets', 'html', 'inject']);

  console.log('Watching HTML...');
  gulp.watch(HTML_PATH, ['html', 'inject']);
});

gulp.task('inject', ['html', 'js', 'assets'], function () {
  var js = gulp.src(JS_DIST);
  var assets = gulp.src(DIST_ASSETS);

  return gulp.src(HTML_DIST)
    .pipe(inject(js, { relative: true }))
    .pipe(inject(assets, { relative: true }))
    .pipe(gulp.dest(DIST_PATH))
});

gulp.task('default', ['html', 'js', 'assets', 'inject', 'watch'])