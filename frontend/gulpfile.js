var gulp                = require('gulp');
var rename              = require('gulp-rename');
var less                = require('gulp-less');
var notify              = require('gulp-notify');
var connect             = require('gulp-connect');
var browserify          = require('browserify');
var babelify            = require('babelify');
var ngAnnotate          = require('browserify-ngannotate');
var source              = require('vinyl-source-stream');

var interceptErrors = function (error) {
    var args = Array.prototype.slice.call(arguments);

    // Send error to notification center with gulp-notify
    notify.onError({
        title: 'Compile Error',
        message: '<%= error.message %>'
    }).apply(this, args);

    // Keep gulp from hanging on this task
    this.emit('end');
};

gulp.task('browserify', function() {
  return browserify('./js/app.js')
      .transform(babelify, {presets: ["es2015"]})
      .transform(ngAnnotate)
      .bundle()
      .on('error', interceptErrors)
      //Pass desired output filename to vinyl-source-stream
      .pipe(source('main.js'))
      // Start piping stream to tasks!
      .pipe(gulp.dest('./'));
});

gulp.task('less', function () {
    gulp.src('./assets/less/colors.less')
        .pipe(less())
        .pipe(rename("styles.css"))
        .pipe(gulp.dest('./assets/css'));
    
    gulp.src('./assets/less/signup.less')
        .pipe(less())
        .pipe(gulp.dest('./assets/css'));

    gulp.src('./assets/less/privacy.less')
        .pipe(less())
        .pipe(gulp.dest('./assets/css'));
});

gulp.task('connect', function() {
  connect.server({
    root: './',
    livereload: true,
    port: 4000
  });
});

gulp.task('default', ['less', 'connect'], function () {
    gulp.watch('./assets/less/**/*.less', ['less']);
});

//gulp.task('default', ['less', 'browserify'], function () {
//    gulp.watch('./assets/less/**/*.less', ['less']);
//    gulp.watch('./js/**/*.js', ['browserify']);
//});
