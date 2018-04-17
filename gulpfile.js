var gulp = require('gulp');
var less = require('gulp-less');
var cssMin = require('gulp-clean-css');
var injectCSS = require('gulp-inject-css');
var browserSync = require('browser-sync').create();

//less preprocessing
gulp.task('less', function() {
    return gulp.src('source/style/less/main.less')
            .pipe(less())
            .pipe(cssMin())
            .pipe(gulp.dest('source/style/css'));
})

//inject styles
gulp.task('inject', function(){
    gulp.src('source/index.html')
        .pipe(injectCSS())
        .pipe(gulp.dest('dist'))
        browserSync.reload();
});

//watch and reload
gulp.task('default', ['less', 'inject'], function () {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    gulp.watch('source/**/*.*', ['less','inject']);
});
