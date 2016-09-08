(function() {

  'use strict';

  var gulp = require('gulp');

  gulp.task('watch', function(){

    gulp.watch(['./*.html'], function(event, cb) {
      gulp.src('./*.html')
        .pipe(gulp.dest('R:/tour.siteperfect.ru/www/'))
    });

    gulp.watch(['./css/style.css'], function(event, cb) {
      gulp.src('./css/style.css')
        .pipe(gulp.dest('R:/tour.siteperfect.ru/www/css/'))
    });
  });


  gulp.task('default', ['watch']);

})();