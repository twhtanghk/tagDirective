gulp = require 'gulp'
sass = require 'gulp-sass'
browserify = require 'browserify'
source = require 'vinyl-source-stream'

paths = sass: ['./scss/**/*.scss']

gulp.task 'default', ['sass', 'coffee']

gulp.task 'sass', (done) ->
  gulp.src('./tag.scss')
    .pipe(sass())
    .pipe(gulp.dest('./'))
    
gulp.task 'coffee', ->
  browserify(entries: ['./index.coffee'])
    .transform('coffeeify')
    .transform('debowerify')
    .bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest('./'))