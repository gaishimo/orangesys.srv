import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import del from 'del'
import runSequence from 'run-sequence'

const $ = gulpLoadPlugins()

gulp.task('clean', () => (
  del(['./target'])
))

gulp.task('compile', () =>
  gulp.src('src/**/*.js')
    .pipe($.babel())
    .pipe(gulp.dest('target'))
)

gulp.task('build', callback => (
  runSequence(
    ['clean'],
    ['compile'],
    callback
  )
))
