var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var minify = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var notify = require('gulp-notify');
var concat = require('gulp-concat');

var source = './src'; // dossier de travail
var prod = './dist'; // dossier à livrer

// Tâche "css" = SASS + autoprefixer + minify
gulp.task('css', function() {
  return gulp.src(source + '/assets/css/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(minify())
    .pipe(gulp.dest(prod + '/assets/css/'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Tâche "js" = uglify + concat
gulp.task('js', function() {
  return gulp.src(source + '/assets/js/*.js')
    .pipe(concat('main.min.js'))
    .pipe(uglify().on('error', function(e){
        console.log(e);
      }))
    .pipe(gulp.dest(prod + '/assets/js/'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Tâche "img" = Images optimisées
gulp.task('img', function () {
  return gulp.src(source + '/assets/img/*.{png,jpg,jpeg,gif,svg}')
    .pipe(imagemin())
    .pipe(gulp.dest(prod + '/assets/img'))
    .pipe(notify({ message: 'Images task complete' }));
});


// Tâche "watch" = je surveille SASS et HTML
gulp.task('watch', function () {
  gulp.watch(source + '/assets/css/*.scss', ['css']);
  gulp.watch(source + '/assets/js/*.js', ['js']);
  gulp.watch(source + '/assets/img/*.{png,jpg,jpeg,gif,svg}', ['img']);
});
