'use strict';

module.exports = function () {
    $.gulp.task('js:single', $.gulp.series(
        function () {
            return $.gulp.src('./source/js/sidebar.js')
                .pipe($.gulp.dest($.config.root + '/assets/js'));
        },
        function () {
            return $.gulp.src('./source/js/google*.js')
                .pipe($.gulp.dest($.config.root + '/assets/js'));
        }))
};
