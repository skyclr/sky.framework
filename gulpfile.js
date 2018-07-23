'use strict';

var gulp        = require('gulp'),
	prefixer    = require('gulp-autoprefixer'),
	uglify      = require('gulp-uglify'),
	less        = require('gulp-less'),
	concat      = require('gulp-concat'),
	sourcemaps  = require('gulp-sourcemaps'),
	cssmin      = require('gulp-minify-css'),
	cleanCSS    = require('gulp-clean-css'),
	imagemin    = require('gulp-imagemin'),
	pngquant    = require('imagemin-pngquant'),
	rimraf      = require('rimraf'),
	babel      = require('gulp-babel'),
	paths       = require("./gulppaths.js");

/**
 * Less compiling task
 */
gulp.task('less', function() {

	console.log(paths.src.less + '*.less -> ' + paths.app.css);
	gulp.src(paths.src.less + '*.less')
		.pipe(less({}))
		.pipe(cssmin({compatibility: 'ie8'}))
		.pipe(gulp.dest(paths.app.css));

	console.log(paths.src.pages + '*/*.less -> ' + paths.app.pages);
	gulp.src(paths.src.pages + '*/*.less')
		.pipe(less({}))
		.pipe(cssmin({compatibility: 'ie8'}))
		.pipe(gulp.dest(paths.app.pages));
});

/**
 * JS task to perform concatination
 */
gulp.task('js:lib', function() {
	gulp.src([
		'vendor/jquery.js',
		'vendor/twig.js',
		'vendor/moment.js',
		'library/main.js',
		'library/exceptions.js',
		'library/services.js',
		'library/init.js'
	], {cwd: paths.src.jvs})
	 	.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['env'],
			ignore: ['vendor/moment.js']
		}))
		.pipe(concat('library.js'))
		.pipe(uglify({mangle: false}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.app.jvs));
});

/**
 * JS task to perform concatination
 */
gulp.task('js', function() {
	gulp.src([
		'services/*',
		'library/servicesInit.js',
		'actions/*',
		'directives/*',
		'library/projectInit.js'
	], {cwd: paths.src.jvs})
		.pipe(sourcemaps.init())
		.pipe(babel({presets: ['env']}))
		.pipe(concat('project.js'))
		.pipe(uglify({mangle: false}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.app.jvs));

	gulp.src(['*/*.js'], {cwd: paths.src.pages})
		.pipe(sourcemaps.init())
		.pipe(babel({presets: ['env']}))
		.pipe(uglify({mangle: false}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.app.pages));
});

gulp.task('image', function () {
	gulp.src(paths.src.img + "**/*.*")
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()],
			interlaced: true
		}))
		.pipe(gulp.dest(paths.app.img));
});