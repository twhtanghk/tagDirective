gulp = require 'gulp'
sass = require 'gulp-sass'
browserify = require 'browserify'
source = require 'vinyl-source-stream'
coffee = require 'gulp-coffee'
gutil = require 'gulp-util'

paths = sass: ['./scss/**/*.scss']

gulp.task 'default', ['sass', 'coffee']

gulp.task 'sass', (done) ->
  gulp.src('./*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./'))
    
gulp.task 'coffee', ->
  browserify(entries: ['./test/index.coffee'])
    .transform('coffeeify')
    .transform('debowerify')
    .bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest('./test/'))
    
  gulp.src('./tag.coffee')
  	.pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./'))
  