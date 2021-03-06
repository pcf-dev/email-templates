var gulp = require('gulp');
var fs = require('fs');
var mustache = require('gulp-mustache');
var juice = require('gulp-juice');
var merge = require("merge-stream");

var config = {
  src: 'src/**/*',
  templates: 'src/templates/**/*',
  pages: 'src/pages/**/*',
};

gulp.task('export', function() {
  var data = JSON.parse(fs.readFileSync('src/data.json'));
  return merge([
    gulp.src('./src/*.css').pipe(gulp.dest('./docs')),
    gulp.src('./src/images/**/*').pipe(gulp.dest('./docs/images')),
    gulp.src(config.templates)
    .pipe(mustache(data, { extension: '.html' }))
    .pipe(juice({
      preserveMediaQueries: true
    }))
    .pipe(gulp.dest('./docs/templates')),
    gulp.src(config.pages)
    .pipe(mustache(data, { extension: '.html' }))
    .pipe(gulp.dest('./docs/'))
  ])
});

// Watch CSS Files
gulp.task('watch', function() {
  gulp.watch(config.src, gulp.series('export'));
});

// Default Task
gulp.task('default', gulp.series('export', 'watch'));