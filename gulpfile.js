var gulp = require('gulp');
var postcss = require('gulp-postcss');
var postcss_each = require('postcss-each');
var postcss_mixins = require('postcss-mixins');
var postcss_nested = require('postcss-nested');
var postcss_import = require('postcss-import');
var postcss_for = require('postcss-for');
var postcss_prop = require('postcss-custom-properties');
var postcss_at = require('postcss-at-rules-variables');
var postcss_simple_vars = require('postcss-simple-vars');
var cssnext = require('postcss-cssnext');
var shortcss = require('postcss-short');

gulp.task('css', function() {
  var plugins = [
    postcss_import,
    postcss_each,
    postcss_mixins,
    postcss_nested,
    postcss_at,
    postcss_for,
    postcss_prop,
    postcss_simple_vars,
    shortcss,
    cssnext
  ];
  return gulp.src('dev/style.css')
  .pipe(postcss(plugins))
  .pipe(gulp.dest('dist'));
});

// default gulp task
gulp.task('default', ['css'], function() {

  // watch for CSS changes
  gulp.watch('./dev/*.css', ["css"]);
});
