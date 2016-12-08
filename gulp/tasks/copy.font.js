'use strict';

module.exports = function() {
  $.gulp.task('copy:font', function() {
    return $.gulp.src('./source/fonts/**/*.*')
      .pipe($.gulp.dest($.config.root + '/public/font'));
  });
};
