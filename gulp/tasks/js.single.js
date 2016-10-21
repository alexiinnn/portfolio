'use strict';

module.exports = function() {
  $.gulp.task('js:single', function() {
    return $.gulp.src('./source/js/sidebar.js')
      .pipe($.gulp.dest($.config.root + '/assets/js'));
  });
};
