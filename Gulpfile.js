const mocha = require('gulp-spawn-mocha');
const istanbul = require('gulp-istanbul');
const gulp = require('gulp');

gulp.task('test-api', [], () => gulp.src(['test/api/*.spec.js'])
  .pipe(mocha({ 
    reporter: 'mochawesome',
    istanbul: true,
  })));

gulp.task('test-int', [], () => gulp.src(['test/int/*.spec.js'])
  .pipe(mocha({ 
    reporter: 'mochawesome',
    istanbul: true,
  })));

gulp.task('test', [], () => gulp.src(['test/unit/*.spec.js'])
  .pipe(mocha({ 
    reporter: 'mochawesome',
    istanbul: true,
  })));   

gulp.task('test-all', [], () => gulp.src(['test/**/*.spec.js'])
  .pipe(mocha({ 
    reporter: 'mochawesome',
    istanbul: true,
  })));