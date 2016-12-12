'use strict';

module.exports = function() {
  $.gulp.task('serve' ,function() {
    $.browserSync.init({
      open: false,
      proxy: 'localhost:8000',
      logFileChanges: true
      // port: 7000,
      // notify: true
      // server: $.config.root
    });

    $.browserSync.watch([$.config.root + '/public/**/*.*', $.config.root + '/views/**/*.*', $.config.root + '!**/*.css'], $.browserSync.reload);
  });
};
