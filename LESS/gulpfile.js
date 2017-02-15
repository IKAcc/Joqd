var gulp = require('gulp');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');


gulp.task('css', function () {

  return gulp.src('dev/joqd.less')
  .pipe(less().on('error', function (err) {
    console.log(err);
  }))
  .pipe(autoprefixer())
  .pipe(gulp.dest('dist/'));

});

// default gulp task
gulp.task('default', ['css'], function() {

  // watch for CSS changes
  gulp.watch('./dev/*.less', ["css"]);
  gulp.watch('./dev/mixins/*.less', ["css"]);
});
