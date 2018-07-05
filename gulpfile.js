/* Gulp modules */
let gulp 	= require('gulp');
let less 	= require('gulp-less');
let concat 	= require('gulp-concat');
let cleanCSS = require('gulp-clean-css');
let uglify = require('gulp-uglifyjs');

/* Paths */
let htmlPath = './html/';
let lessFilesPath = htmlPath +'less/';
let cssFilesPath = htmlPath + 'css/';
let jvsFilesPath = htmlPath + 'jvs/';

/**
 * Less compiling task
 */
gulp.task('less', function () {

	gulp.src(lessFilesPath + '*.less')
		.pipe(less({  }))
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest(cssFilesPath));
	gulp.src(lessFilesPath + 'pages/*.less')
		.pipe(less({  }))
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest(cssFilesPath));
});

/**
 * JS task to perform concatination
 */
gulp.task('jsLib', function () {
	gulp.src([
		'vendor/jquery.js',
		'vendor/twig.js',
		'vendor/moment.js',
		'library/main.js',
		'library/exceptions.js',
		'library/services.js',
		'library/init.js'
	], { cwd: jvsFilesPath })
		.pipe(concat('library.js'))
		.pipe(uglify(undefined, { mangle: false }))
		.pipe(gulp.dest(jvsFilesPath));
});

/**
 * JS task to perform concatination
 */
gulp.task('jvs', function () {
	gulp.src([
		'services/*',
		'library/servicesInit.js',
		'actions/*',
		'directives/*',
		'library/projectInit.js'
	], { cwd: jvsFilesPath })
		.pipe(concat('project.js'))
		.pipe(uglify(undefined, { mangle: false }))
		.pipe(gulp.dest(jvsFilesPath));
});