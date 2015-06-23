var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var prefix = require('gulp-autoprefixer');
var csso = require('gulp-csso');

gulp.task('css', function () {
	return gulp.src('scss/*.scss')
		.pipe(plumber({
			errorHandler: function (err) {
				gutil.log(gutil.colors.red('Styles error:\n' + err.message));
				// emit `end` event so the stream can resume https://github.com/dlmanning/gulp-sass/issues/101
				if (this.emit) {
					this.emit('end');
				}
			}
		}))
		.pipe(sass())
		.pipe(prefix())
		.pipe(csso())
		.pipe(gulp.dest('css/'));
});

gulp.task('watch', function () {
	gulp.watch('scss/*.scss', ['scss']);
});

gulp.task('default', ['watch']);