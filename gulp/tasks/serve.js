'use strict';

module.exports = function() {
  $.gulp.task('serve' ,function() {
    $.browserSync.init({
      open: false,
      proxy: '127.0.0.1:8000',
      logFileChanges: true
      // port: 7000,
      // notify: true
      // server: $.config.root
    });

    $.browserSync.watch([$.config.root + '/public/**/*.*', $.config.root + '/views/**/*.*', $.config.root + '!**/*.css'], $.browserSync.reload);
  });
};
