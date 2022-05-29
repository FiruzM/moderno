const gulp = require('gulp'),
      sass = require('gulp-sass')(require('sass')),
      rename = require('gulp-rename'),
      browserSync = require('browser-sync'),
      autoprefixer = require('gulp-autoprefixer'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),
      cssMin = require('gulp-cssmin');


gulp.task('script', function(){
    return gulp.src([
        'node_modules/slick-carousel/slick/slick.js',
        'node_modules/magnific-popup/dist/jquery.magnific-popup.js'
    ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js/'));
});


gulp.task('style', function(){
    return gulp.src([
        'node_modules/normalize.css/normalize.css',
        'node_modules/slick-carousel/slick/slick.css',
        'node_modules/magnific-popup/dist/magnific-popup.css'
    ])
    .pipe(concat('libs.min.css'))
    .pipe(cssMin())
    .pipe(gulp.dest('app/css'));
});


// Sass in to css
gulp.task('sass', function(){
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rename({suffix: '.min'}))
        .pipe(autoprefixer({
            overrideBrowserslist:['last 8 versions']
        }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}));
});

// browser sync html
gulp.task('html', function(){
    return gulp.src('app/*.html')
        .pipe(browserSync.reload({stream: true}));
});


// browser sync js
gulp.task('js', function(){
    return gulp.src('app/js/*.js')
        .pipe(browserSync.reload({stream: true}));
});


// browser sync function
gulp.task('browser-sync', function(){
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
});


// watching
gulp.task('watch', function(){
    gulp.watch('app/scss/**/*.scss', gulp.parallel('sass'));
    gulp.watch('app/*.html', gulp.parallel('html'));
    gulp.watch('app/js/*.js', gulp.parallel('js'));
});

gulp.task('default', gulp.parallel('style', 'script', 'sass', 'watch', 'browser-sync'));
