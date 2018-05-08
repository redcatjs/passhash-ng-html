// Include gulp
var gulp = require('gulp');

var inline = require('gulp-inline')
  , uglify = require('gulp-uglify')
  , minifyCss = require('gulp-minify-css')
  , autoprefixer = require('gulp-autoprefixer');
 
gulp.task('inline-it', function() {
  return gulp.src('./index.html')
    .pipe(inline({
      base: '.',
      js: uglify,
      css: [minifyCss, autoprefixer({ browsers:['last 2 versions'] })],
      disabledTypes: ['svg', 'img'], // Only inline css files
      ignore: ['./gulp.js']
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['inline-it']); 
