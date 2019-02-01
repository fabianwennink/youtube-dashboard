let gulp = require("gulp");
let minify = require("gulp-babel-minify");
let babel = require("gulp-babel");
let sass = require('gulp-sass');
let combineMq = require('gulp-combine-mq');
let concat = require('gulp-concat');

let browserSync = require('browser-sync').create();
let reload = browserSync.reload;

/*************************************************/

const JS_FILES_WATCH = 'assets/js/*.js';
const JS_FILES_BUILD = 'assets/build/js/';
const CSS_FILES_WATCH = 'assets/scss/*.scss';
const CSS_FILES_BUILD = 'assets/build/css/';

const HTML_FILES_WATCH = ['*.html'];

/*************************************************/

// builds all JS files
gulp.task('js', function(){
    return gulp.src(JS_FILES_WATCH)
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(concat('main.js'))
        .pipe(minify({
            mangle: {
                keepClassName: true
            }
        }))
        .on('error', function (err) {
            console.log(err.toString());

            this.emit('end');
        })
        .pipe(gulp.dest(JS_FILES_BUILD))
        .pipe(browserSync.stream());
});

// builds all CSS files
gulp.task('scss', function() {
    return gulp.src(CSS_FILES_WATCH)
        .pipe(sass({outputStyle: 'compressed'}))
        .on('error', function (err) {
            console.log(err.toString());

            this.emit('end');
        })
        .pipe(gulp.dest(CSS_FILES_BUILD))
        .pipe(browserSync.stream());
});

// runs the 'query combine' script
gulp.task('query:css', ['scss'], function() {
    return gulp.src(CSS_FILES_WATCH)
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(combineMq({
            beautify: false
        }))
        .pipe(gulp.dest(CSS_FILES_BUILD));
});

/*************************************************/

// watches for changes in all script and style files
gulp.task('watch', function() {
    gulp.watch('assets/scss/**/*.scss', ['scss']);
    gulp.watch('assets/js/*.js', ['js']);
});

/*************************************************/
// run the live-reload
gulp.task('serve', ['scss', 'js'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    // start watching the scripts and style files
    gulp.start('watch');

    // start watching the index file
    gulp.watch(HTML_FILES_WATCH).on('change', reload);
});

// builds the scripts and makes them production ready
gulp.task('build', function() {
    gulp.start('js');
    gulp.start('query:css');
    gulp.start('minify');
});

// default - starts 'serve'
gulp.task('default', ['serve']);

/*************************************************/