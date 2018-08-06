'use strict';

let gulp        = require('gulp'),
	// prefixer    = require('gulp-autoprefixer'),
	uglify      = require('gulp-uglify'),
	less        = require('gulp-less'),
	concat      = require('gulp-concat'),
	sourceMaps  = require('gulp-sourcemaps'),
	cssmin      = require('gulp-minify-css'),
	// cleanCSS    = require('gulp-clean-css'),
	imagemin    = require('gulp-imagemin'),
	pngquant    = require('imagemin-pngquant'),
	rimraf      = require('rimraf'),
	babel      = require('gulp-babel'),
	paths       = require("./gulppaths.js");

/**
 * Less compiling task
 */
gulp.task('less', function() {

	gulp.src(paths.src.less + '*.less')
		.pipe(sourceMaps.init())
		.pipe(less({ ieCompat: false, relativeUrls: true }))
		.pipe(cssmin({compatibility: 'ie8'}))
		.pipe(sourceMaps.write('.'))
		.pipe(gulp.dest(paths.app.css));

	gulp.src([paths.src.modules + '/**/*.less', paths.app.css + "styles.css"])
		.pipe(sourceMaps.init())
		.pipe(less({ ieCompat: false, relativeUrls: true }))
		.pipe(cssmin({compatibility: 'ie8'}))
		.pipe(concat('styles.css'))
		.pipe(sourceMaps.write('.'))
		.pipe(gulp.dest(paths.app.css));

	gulp.src(paths.src.pages + '*/*.less')
		.pipe(sourceMaps.init())
		.pipe(less({ ieCompat: false, relativeUrls: true }))
		.pipe(cssmin({compatibility: 'ie8'}))
		.pipe(sourceMaps.write('.'))
		.pipe(gulp.dest(paths.app.pages));
});

/**
 * JS task to perform concatination
 */
gulp.task('js:library', function() {
	gulp.src([
		'vendor/jquery.js',
		'vendor/jquery.cookie.js',
		'vendor/twig.min.js',
		'vendor/moment.js',
		'vendor/extends.js',
		'library/main.js',
		'library/exceptions.js',
		'library/services.js',
		'library/init.js'
	], {cwd: paths.src.jvs})
	 	.pipe(sourceMaps.init())
		.pipe(babel({
			presets: ['env'],
			ignore: ['vendor/moment.js']
		}))
		.pipe(concat('library.js'))
		// .pipe(uglify({mangle: false}))
		.pipe(sourceMaps.write('.'))
		.pipe(gulp.dest(paths.app.jvs));
});

/**
 * JS task to perform concatination
 */
gulp.task('js:project', function() {

	gulp.src([
		'services/**/*.js',
		'../../_jsServices/**/*.js',
		'library/servicesInit.js',
		'actions/*.js',
		'directives/*.js',
		'library/projectInit.js'
	], {cwd: paths.src.jvs})
		.pipe(sourceMaps.init())
		.pipe(babel({presets: ['env']}))
		.pipe(concat('project.js'))
		// .pipe(uglify({mangle: false}))
		.pipe(sourceMaps.write('.'))
		.pipe(gulp.dest(paths.app.jvs));

	gulp.src(['*/*.js'], {cwd: paths.src.pages})
		.pipe(sourceMaps.init())
		.pipe(babel({presets: ['env']}))
		// .pipe(uglify({mangle: false}))
		.pipe(sourceMaps.write('.'))
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

gulp.task('twig', function () {
	gulp.src([paths.src.modules + '/**/*.twig'])
		.pipe(concat('modules.twig'))
		.pipe(gulp.dest(paths.app.twig));
});