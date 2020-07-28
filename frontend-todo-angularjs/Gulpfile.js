var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var tsify = require('tsify');
var gutil = require('gulp-util');
var watch = require('gulp-watch');
var paths = {
    pages: [
        'src/**/*.html',
        'src/**/*.htm'
    ],
    assets: [
        'src/assets/*.*'
    ],
    styles: [
        'src/css/*.*'
    ]
};

var watchedBrowserify = watchify(browserify({
    basedir: '.',
    debug: true,
    entries: "src/main.ts",
    cache: {},
    packageCache: {}
}).plugin(tsify));

gulp.task('html:copy', function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest('dist'));
});

gulp.task('html:watch', () => {
    return gulp.src(paths.pages)
        .pipe(watch(paths.pages))
        .pipe(gulp.dest('dist')); 
})

gulp.task('css:copy', function () {
    return gulp.src(paths.styles)
        .pipe(gulp.dest('dist/css'));
});

gulp.task('css:watch', () => {
    return gulp.src(paths.styles)
        .pipe(watch(paths.styles))
        .pipe(gulp.dest('dist/css')); 
})

gulp.task('assets:copy', function () {
    return gulp.src(paths.assets)
        .pipe(gulp.dest('dist/assets'));
});

gulp.task('assets:watch', () => {
    return gulp.src(paths.assets)
        .pipe(watch(paths.assets))
        .pipe(gulp.dest('dist/assets')); 
})

gulp.task('ts:watch', bundle);

function bundle() {
    return watchedBrowserify
        .bundle()
        .on('error', function (error) { console.error(error.toString()); })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist'));
}

gulp.task('default', ['html:copy', 'html:watch', 'css:copy', 'css:watch', 'assets:copy', 'assets:watch', 'ts:watch']);
watchedBrowserify.on('update', bundle);
watchedBrowserify.on('log', gutil.log);
