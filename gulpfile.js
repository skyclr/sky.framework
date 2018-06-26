let gulp 	= require('gulp');
let less 	= require('gulp-less');
let concat 	= require('gulp-concat');
let minify 	= require('gulp-minify');
// let path 	= require('path');

/**
 * Less compiling task
 */
gulp.task('less', function () {

	gulp.src('./html/less/*.less')
		.pipe(less({  }))
		.pipe(gulp.dest('./html/css'));
	gulp.src('./html/less/pages/*.less')
		.pipe(less({  }))
		.pipe(gulp.dest('./html/css'));
});

/**
 * JS task to perform concatination
 */
gulp.task('jsLib', function () {
	let location  = "./html/jvs/";
	gulp.src([
		'vendor/jquery.js',
		'vendor/twig.js',
		'vendor/moment.js',
		'library/main.js',
		'library/exceptions.js',
		'library/services.js',
		'library/init.js'
	], { cwd: location })
		.pipe(concat('library.js'))
		// .pipe(minify({
		// 	ext:{
		// 		src:'-debug.js',
		// 		min:'.js'
		// 	}
		// }))
		.pipe(gulp.dest(location));
});

/**
 * JS task to perform concatination
 */
gulp.task('jvs', function () {
	let location  = "./html/jvs/";
	gulp.src([
		'services/*',
		'library/servicesInit.js',
		'actions/*',
		'directives/*',
		'library/projectInit.js'
	], { cwd: location })
		.pipe(concat('project.js'))
		.pipe(gulp.dest(location));
});