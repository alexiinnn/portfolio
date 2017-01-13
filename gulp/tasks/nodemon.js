'use strict';

module.exports = function() {
  $.gulp.task('nodemon', function (cb) {
      var started = false;
      return $.nodemon({
          // the script to run the app
          script: './server/bin/www',
          watch: './server',
          ignore: [
              // '**/*.*',
              // '!/server/**/*.*',
              '/server/node_modules/**/*.*',
              '/server/data/**/*.*',
              '/server/views/**/*.*',
              '/server/public/**/*.*'
          ],
          verbose: true,
          ext: 'js,pug',
          // delay: 1 //hack against multiple restart
      }).on('start', function () {
          // to avoid nodemon being started multiple times
          // thanks @matthisk
          if (!started) {
              setTimeout(function reload() {
                  cb();
              }, 500);

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
