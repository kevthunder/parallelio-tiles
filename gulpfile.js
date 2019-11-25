var gulp = require('gulp')
var mocha = require('gulp-mocha')
var requireIndex = require('gulp-require-index')

gulp.task('buildIndex', function () {
  return gulp.src(['./lib/**/*.js', '!./lib/spark-starter.js'])
    .pipe(requireIndex({ name: 'tiles.js' }))
    .pipe(gulp.dest('./lib'))
})

var build
gulp.task('build', build = gulp.series('buildIndex', function (done) {
  console.log('Build Complete')
  done()
}))

gulp.task('test', gulp.series('build', function () {
  return gulp.src('./test/tests.js')
    .pipe(mocha())
}))

gulp.task('test-debug', gulp.series('build', function () {
  return gulp.src('./test/tests.js')
    .pipe(mocha({ 'inspect-brk': true, require: ['source-map-support/register'] }))
}))

gulp.task('default', build)
