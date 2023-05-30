// const gulp = require('gulp');
// const browserSync = require('browser-sync');
// const sass = require('gulp-sass')(require('sass'));
// const rename = require("gulp-rename");
// const autoprefixer = require('gulp-autoprefixer');
// const cleanCSS = require('gulp-clean-css');
// const htmlmin = require('gulp-htmlmin');
// const imagemin = require('gulp-imagemin');
// const del = require('del');

import gulp from 'gulp';
import browserSync from 'browser-sync';
import rename from 'gulp-rename';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import htmlmin from 'gulp-htmlmin';
import imagemin from 'gulp-imagemin';

import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);

// Static server запускается функция сервер из указанной папки src
gulp.task('server', function() {
	browserSync.init({
		server: {
			baseDir: "dist"
		}
	});
});

//новая задача стайлс берет данные и возвращает по выпонению скомпилированные файлы sass/scss во всех папках src/css, так же синхронизирует браузер как лайв-сервер
//outputStyle - итоговый стиль compressed - сжатый, on('error', sass.logError)) - подскажет об ошибке  и ему добавиться суффикс ".мин" + автопрефиксы добавляются, после префиксов файл очищается
gulp.task('styles', function() {
	return gulp.src('src/sass/**/*.+(scss|sass)')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(rename({
			prefix: "",
			suffix: ".min"
		  }))
		.pipe(autoprefixer({
			cascade: false
		}))
		.pipe(cleanCSS({compatibility: 'ie8'}))  
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream());
});

//задача на отслеживание изменений в коде src/sass по факту изменений запускается стайлс и обновляет  browserSync - наш браузер
//так же отслеживает изменения в html файлах по каждому обновлению браузера
gulp.task('watch', function() {
	gulp.watch('src/sass/**/*.+(scss|sass|css)', gulp.parallel('styles'));
	gulp.watch('src/*.html').on('change', browserSync.reload);
	gulp.watch('src/*.html').on('change', gulp.parallel('html'));
});

gulp.task('html', function(){
	return gulp.src('src/*.html')
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest('dist/'));
});

gulp.task('scripts', function(){
	return gulp.src('src/js/**/*.js')
		.pipe(gulp.dest('dist/js'));
});

gulp.task('fonts', function(){
	return gulp.src('src/fonts/**/*') 
		.pipe(gulp.dest('dist/fonts'));
});

gulp.task('icons', function(){
	return gulp.src('src/icons/**/*') 
		.pipe(gulp.dest('dist/icons'));
});

gulp.task('images', function(){
	return gulp.src('src/img/**/*') 
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img'));
});

gulp.task('mailer', function(){
	return gulp.src('src/mailer/**/*') 
		.pipe(gulp.dest('dist/mailer'));
});

// задача, запускающая параллельно сервер, и стайлс, и вотч
gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'html', 'scripts', 'fonts', 'icons', 'images', 'mailer'));