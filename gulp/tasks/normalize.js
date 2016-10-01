'use strict';

module.exports = function() {
  $.gulp.task('normalize', function() {
    return $.gulp.src('./node_modules/normalize.css/normalize.css')
      .pipe($.gulp.dest($.config.root + '/assets/css/'));
  });
};
