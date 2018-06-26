var gulp 	= require('gulp');
var less 	= require('gulp-less');
var concat 	= require('gulp-concat');
var minify 	= require('gulp-minify');
var path 	= require('path');

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
gulp.task('js', function () {
	let location  = "./html/jvs/";
	gulp.src([
		'external/jquery.js',
		'external/twig.js',
		'external/moment.js',
		// 'external/jquery.ui.js',
		// 'external/js.cookie.min.js',
		// 'external/highcharts.js',
		// 'external/highcharts-trendline.js',
		// 'external/twig.min.js',
		// "external/jquery-serialize.js",
		// 'external/extends.js',
		'core/main.js',
		'core/exceptions.js',
		'core/services.js',
		'modules/*',
		'services/*',
		'core/init.js'
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
gulp.task('jsProject', function () {
	var location  = "./html/jvs/";
	gulp.src([
		// 'services/notifications.js',
		// 'services/inputsIO.js',
		// 'services/calendar.js',
		// 'services/dataOperator.js',
		// 'services/pagination.js',
		// 'services/suggester.js',
		// 'services/loadingScreen.js',
		// 'services/pageLoader.js',
		// 'services/gallery.js',
		// 'services/shop.js',
		// 'services/pagination.js',
		// 'actions/*',
		// 'directives/*',
		'core/projectInit.js'
	], { cwd: location })
		.pipe(concat('project.js'))
		.pipe(gulp.dest(location));
});