var gulp = require('gulp'),
	minifyCss = require('gulp-minify-css'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	clean = require('gulp-clean'),
	htmlMin = require('gulp-htmlmin');

/**
 * 文档CSS压缩
 */
gulp.task('doc_css', function () {
	gulp.src('doc/asset/js/all*.css', {read: false})
		.pipe(clean());
	gulp.src(['doc/template/style.css', 'doc/asset/style.css'])
		.pipe(concat('all.css'))
		.pipe(gulp.dest('doc/asset/'))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifyCss())
		.pipe(gulp.dest('doc/asset/'));
});

/**
 * 文档JS压缩
 */
gulp.task('doc_js', function () {
	gulp.src('doc/asset/js/all*.js', {read: false})
		.pipe(clean());

	//压缩原始JS
	gulp.src('doc/asset/js/*.js')
		.pipe(concat('all.doc.js'))
		.pipe(gulp.dest('doc/asset'))
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('doc/asset'));

	//合并JS
	gulp.src(['asset/jquery/jquery.js', 'doc/asset/all.doc.js'])
		.pipe(concat("all.js"))
		.pipe(gulp.dest("doc/asset"));

	//合并JS min文件
	gulp.src(['asset/jquery/jquery.min.js', 'doc/asset/all.doc.min.js'])
		.pipe(concat("all.min.js"))
		.pipe(gulp.dest("doc/asset"));
});

// 注册缺省任务
gulp.task('doc', ['doc_css', 'doc_js']);

//---------------------------------------------------------------------------------------------------------------------

/**
 * 课程项目的CSS
 */
gulp.task("course_css", function () {
	gulp.src('asset/style/css/style.min.css', {read: false})
		.pipe(clean());
	gulp.src(['asset/style/css/style.css'])
		.pipe(rename({suffix: '.min'}))
		.pipe(minifyCss())
		.pipe(gulp.dest('asset/style/css/'));
});
/**
 * 课程项目的JS
 */
gulp.task("course_js", function () {
	gulp.src('asset/style/js/go.min.js', {read: false})
		.pipe(clean());
	gulp.src(['asset/style/js/go.js'])
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('asset/style/js/'));
});

gulp.task('course', ['course_css', 'course_js']);

//-------------------------
/**
 * 压缩全部输出网页
 */
gulp.task('html_o', function () {
	return gulp.src('html_out/*.html')
		.pipe(htmlMin({collapseWhitespace: true}))
		.pipe(gulp.dest('html_out'));
});

/**
 * 压缩全部模板
 */
gulp.task('html_t', ['html_t_c'], function () {
	return gulp.src('script/template/*/*.html')
		.pipe(htmlMin({collapseWhitespace: true}))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('script/template'));
});

gulp.task('html_t_c', function () {
	return gulp.src('script/template/*/*.min.html', {read: false})
		.pipe(clean());
});


//----------------------------------------------------------------------------------------------
gulp.task('default', ['doc', 'course']);