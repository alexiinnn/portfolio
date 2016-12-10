'use strict';

module.exports = function() {
  $.gulp.task('nodemon', function (cb) {
      var started = false;
      return $.nodemon({
          // the script to run the app
          script: './server/bin/www',
          ignore: [
              // '**/*.*',
              // '!/server/**/*.*',
              '/server/node_modules/**/*.*',
              '/server/data/**/*.*',
              '/server/public/**/*.*'
          ],
          verbose: true,
          watch: './server',
          ext: 'js,pug'
      }).on('start', function () {
          // to avoid nodemon being started multiple times
          // thanks @matthisk
          if (!started) {
              cb();
              started = true;
          }
      }).on('restart', function(){
          console.log('Server restarting...');
          setTimeout(function () {
              $.browserSync.reload({stream: false});
          }, 1000);
      });
  })
};
