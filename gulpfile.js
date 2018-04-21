var del = require('del');
var gulp = require('gulp');
var less = require('gulp-less');
var cssMin = require('gulp-clean-css');
var injectCSS = require('gulp-inject-css');
var inject = require('gulp-inject-string');
var browserSync = require('browser-sync').create();

//delete files
gulp.task('del', function() {
    return del.sync('dist/index.html');
})

//less preprocessing
gulp.task('less', function() {
    return gulp.src('source/style/less/main.less')
            .pipe(less())
            .pipe(cssMin())
            .pipe(gulp.dest('source/style/css'))
            .pipe(browserSync.stream());
})

//inject styles
gulp.task('injectCSS', function(){
    return gulp.src('source/index.html')
            .pipe(inject.replace('<link href="style/css/main.css" rel="stylesheet" type="text/css">', ''))
            .pipe(injectCSS())
            .pipe(gulp.dest('dist'));
});

//build production version
gulp.task('build', ['del', 'less', 'injectCSS'], function() {
    console.log('Production version builded');
})

//watch less changes
gulp.task('less:watch', function() {
  gulp.watch('source/style/less/*.less' , ['less']);
});

//watch and reload
gulp.task('default', ['less', 'less:watch'], function () {
    browserSync.init({
        server: {
            baseDir: "./source"
        }
    });

    // gulp.watch('source/style/less/*.*', ['less']);
    gulp.watch(['source/*.html', 'source/style/css/*.css']).on('change', browserSync.reload);
});
