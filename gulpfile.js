var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

var SRC_ASSETS = 'src/assets/**';
var DIST_ASSETS = 'dist/assets';

var HTML_PATH = 'index.html';
var JS_PATH = ['src/**/*.js', 'src/*.js'];
var DIST_PATH = 'dist';

gulp.task('js', function(){
    return gulp.src(JS_PATH)
      .pipe(sourcemaps.init())
      .pipe(concat('app.js'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(DIST_PATH))
      .pipe(browserSync.stream());
  });

  gulp.task('assets', function(){
    return gulp.src(SRC_ASSETS)
      .pipe(gulp.dest(DIST_ASSETS))
      .pipe(browserSync.stream());
  });

  gulp.task('html', function(){
    return gulp.src(HTML_PATH)
      .pipe(gulp.dest(DIST_PATH))
      .pipe(browserSync.stream());
  });

  gulp.task('watch', function () {
    browserSync.init({
      server: './dist'
    });
    console.log('Watching JS...');
    gulp.watch(JS_PATH, ['js', 'html']);
    console.log('Watching Assets...');
    gulp.watch(SRC_ASSETS, ['assets', 'html']);
    console.log('Watching HTML...');
    gulp.watch(HTML_PATH, ['html']);
});

gulp.task('default', ['html', 'js', 'assets', 'watch'])