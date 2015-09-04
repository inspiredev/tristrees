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

var browserify = require('browserify');
var watchify = require('watchify');
var xtend = require('xtend');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');

var watching = false;
gulp.task('enable-watch-mode', function () { watching = true });

gulp.task('js', function () {
	var opts = {
		entries: './js/main.js',
		debug: (gutil.env.type === 'development')
	}
	if (watching) {
		opts = xtend(opts, watchify.args);
	}
	var bundler = browserify(opts);
	if (watching) {
		bundler = watchify(bundler);
	}
	// optionally transform
	// bundler.transform('transformer');

	bundler.on('update', function (ids) {
		gutil.log('File(s) changed: ' + gutil.colors.cyan(ids));
		gutil.log('Rebundling...');
		rebundle();
	});
	bundler.on('log', gutil.log);

	function rebundle() {
		return bundler
			.bundle()
			.on('error', function (e) {
				gutil.log(gutil.colors.red('Browserify ' + e));
			})
			.pipe(source('main.js'))
			.pipe(buffer())
			.pipe(sourcemaps.init({loadMaps: true}))
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest('./js/dist'));
	}
	return rebundle();
});

gulp.task('watch', ['enable-watch-mode', 'js'], function () {
	gulp.watch('scss/*.scss', ['css']);
});

gulp.task('default', ['watch']);

gulp.task('build', ['js', 'css']);