var gulp = require('gulp');
var ngmin = require('gulp-ngmin');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var paths = {
  scripts: ['angular-flash-messages/angular-flash-messages.js']
};

gulp.task('default', function() {
  return gulp.src(paths.scripts)
    .pipe(ngmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('angular-flash-messages/'));
});
