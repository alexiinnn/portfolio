'use strict';

module.exports = function() {
  $.gulp.task('serve' ,function() {
    $.browserSync.init({
      open: false,
      proxy: 'localhost:8000',
      // port: 7000,
      // notify: true
      // server: $.config.root
    });

    $.browserSync.watch([$.config.root + '/**/*.*', '!**/*.css'], $.browserSync.reload);
  });
};
