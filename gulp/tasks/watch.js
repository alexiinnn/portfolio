'use strict';

module.exports = function() {
  $.gulp.task('watch', function() {
    $.gulp.watch('./source/js/**/*.js', $.gulp.series('js:process'));
    $.gulp.watch('./source/js/sidebar.js', $.gulp.series('js:single'));
    $.gulp.watch('./source/js/google*.js', $.gulp.series('js:single'));
    $.gulp.watch('./source/style/**/*.scss', $.gulp.series('sass'));
    $.gulp.watch('./source/template/**/*.pug', $.gulp.series('pug'));
    $.gulp.watch('./source/img/**/*.*', $.gulp.series('copy:image'));
  });
};
