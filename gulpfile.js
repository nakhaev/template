var gulp = require('gulp');
var less = require('gulp-less');
var cssMin = require('gulp-clean-css');
var injectString = require('gulp-inject-string');

//less preprocessing
gulp.task('less', function() {
    return gulp.src('source/style/**/*.less')
            .pipe(less())
            .pipe(gulp.dest('dist'));
})

// gulp.task('less', function() {
//     return
// })
