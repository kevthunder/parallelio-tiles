var gulp = require('gulp');
var coffee = require('gulp-coffee');
var mocha = require('gulp-mocha');
var requireIndex = require('gulp-require-index');
var clean = require('gulp-clean');

gulp.task('coffee', function() {
  return gulp.src('./src/*.coffee')
    .pipe(coffee({bare: true}))
    .pipe(gulp.dest('./lib/'));
});

gulp.task('buildIndex', function () {
  return gulp.src(['./lib/**/*.js','!./lib/spark-starter.js'])
    .pipe(requireIndex({name:'tiles.js'}))
    .pipe(gulp.dest('./lib'));
});

gulp.task('coffeeTest', function() {
  return gulp.src('./test/src/*.coffee')
    .pipe(coffee())
    .pipe(gulp.dest('./test/'));
});

gulp.task('clean', function() {
  return gulp.src(['./lib'], {read: false, allowEmpty:true})
  .pipe(clean());
});

var build;
gulp.task('build', build = gulp.series('clean', 'coffee', 'buildIndex', function (done) {
    console.log('Build Complete');
    done();
}));

gulp.task('test', gulp.series('build','coffeeTest', function() {
  return gulp.src('./test/tests.js')
    .pipe(mocha());
}));

gulp.task('test-debug', gulp.series('build','coffeeTest', function() {
  return gulp.src('./test/tests.js')
    .pipe(mocha({"inspect-brk":true, require:['source-map-support/register']}));
}));


gulp.task('default', build);