var gulp = require('gulp');
var webpack = require('webpack-stream');
var concatCss = require('gulp-concat-css');
var minifyCss = require('gulp-minify-css');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('static:dev', function() {
  gulp.src('app/**/*.html')
  .pipe(gulp.dest('build/'));
});
//the code for minifying css
/*gulp.task('minify-css', function() {
  return gulp.src([
    'app/css/base.css',
    'app/css/reset.css',
    'app/css/foundation.css',
    'app/css/app.css'
    ])
  .pipe(concatCss('style.min.css'))
  .pipe(minifyCss({compatibility: 'ie8'}))
  .pipe(gulp.dest('build/'));
});*/

gulp.task('sassify', function() {
  return gulp.src([
      'app/sass/style.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(concatCss('style.min.css'))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('build/'));
  })

gulp.task('webpack:dev', function() {
  return gulp.src('app/js/entry.js')
  .pipe(webpack({
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('build/'));
});

gulp.task('webpack:test', function() {
  return gulp.src('test/client/test_entry.js')
  .pipe(webpack({
    output: {
      filename: 'test_bundle.js'
    }
  }))
  .pipe(gulp.dest('test/client/'))
});

gulp.task('build:dev', ['webpack:dev', 'static:dev', 'sassify']);
gulp.task('default', ['build:dev']);
gulp.task('css:watch', function() {
  gulp.watch('app/style/*.css');
});
