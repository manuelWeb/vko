var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
// var useref = require('gulp-useref');
// var uglify = require('gulp-uglify');
// var gulpIf = require('gulp-if');
// var cssnano = require('gulp-cssnano');
// var imagemin = require('gulp-imagemin');
// var cache = require('gulp-cache');
// var del = require('del');
var runSequence = require('run-sequence');

// Development Tasks
// -----------------

// Start browserSync server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'dist'
    }
  })
})

gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass().on('error', sass.logError)) // Passes it through a gulp-sass, log errors to console
    .pipe(gulp.dest('dist/css')) // Outputs it in the css folder
    .pipe(browserSync.reload({ stream: true }));
})

// Watchers
gulp.task('watch', function() {
  gulp.watch('app/scss/**/*.scss', ['js', 'sass', 'fonts', 'images', 'html'], browserSync.reload);
  gulp.watch('app/*.html',['js', 'sass', 'fonts', 'images', 'html'], browserSync.reload);
  gulp.watch('app/js/**/*.js',['js', 'sass', 'fonts', 'images', 'html'], browserSync.reload);
})

// Optimization Tasks
// ------------------

// Optimizing CSS and JavaScript
// gulp.task('useref', function() {

//   return gulp.src('app/*.html')
//     .pipe(useref())
//     .pipe(gulpIf('*.js', uglify()))
//     .pipe(gulpIf('*.css', cssnano()))
//     .pipe(gulp.dest('dist'));
// });

// Optimizing Images
gulp.task('images', function() {
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
    // Caching images that ran through imagemin
    // .pipe(cache(imagemin({
    //   interlaced: true,
    // })))
    .pipe(gulp.dest('dist/images'))
    .pipe(browserSync.reload({stream: true }));
});

// Copying JS
gulp.task('js', function() {
  return gulp.src('app/js/**/*')
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload({stream: true }));
})

// Copying html
gulp.task('html', function() {
  return gulp.src('app/index.html')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({stream: true }));
})

// Copying fonts
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
    .pipe(browserSync.reload({stream: true }));
})


// Build Sequences
// ---------------

gulp.task('default', function(callback) {
  runSequence(['js', 'fonts', 'images', 'sass', 'html', 'browserSync'], 'watch',
    callback
  )
})

