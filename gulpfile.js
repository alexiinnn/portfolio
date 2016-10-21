'use strict';

global.$ = {
    package: require('./package.json'),
    config: require('./gulp/config'),
    path: {
        task: require('./gulp/paths/tasks.js'),
        jsFoundation: require('./gulp/paths/js.foundation.js'),
        cssFoundation: require('./gulp/paths/css.foundation.js'),
        app: require('./gulp/paths/app.js')
    },
    gulp: require('gulp'),
    rimraf: require('rimraf'),
    browserSync: require('browser-sync').create(),
    gp: require('gulp-load-plugins')()
};

$.path.task.forEach(function (taskPath) {
    require(taskPath)();
});

$.gulp.task('default', $.gulp.series(
    'clean',
    $.gulp.parallel(
        'sass',
        'pug',
        'js:foundation',
        'js:process',
        'js:single',
        'copy:image',
        'copy:font',
        'css:foundation',
        'sprite:svg'
    ),
    $.gulp.parallel(
        'watch',
        'serve'
    )
));

$.gulp.task('copy_img_font',
    $.gulp.parallel(
        'copy:image',
        'copy:font'
    )
);


$.gulp.task('sprite',
    $.gulp.series(
        'sprite:svg'
    )
);