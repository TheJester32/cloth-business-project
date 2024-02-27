const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const sourceMaps = require('gulp-sourcemaps');

gulp.task('sass', function (done) {
     gulp.src('src/styles.scss')
        .pipe(plumber())
        .pipe(sourceMaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions']
        }))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('build'))
        .pipe(browserSync.reload({ stream: true }));
        done()
});

gulp.task('html', function () {
    return gulp.src('*.html')
        .pipe(gulp.dest('build'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('img', function () {
    return gulp.src('src/images/*.jpg')
        .pipe(gulp.dest('build/images'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('fonts', function () {
    return gulp.src('fonts/*.woff2')
        .pipe(gulp.dest('build/fonts'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('start', function (done) {
    browserSync.init({
        server: ["./", "./src", "./src/blocks"]
    });
    gulp.watch('src/**/*.scss', gulp.series('sass')).on('change', browserSync.reload);
    gulp.watch('./*.html').on('change', browserSync.reload);
    done();
});

gulp.task('build', gulp.parallel('sass', 'html', 'img', 'fonts', function (done) {
    gulp.watch('src/**/*.scss', gulp.series('sass'));
    gulp.watch('*.html', gulp.series('html'));
    gulp.watch('*.woff2', gulp.series('fonts'));
    done();
}));