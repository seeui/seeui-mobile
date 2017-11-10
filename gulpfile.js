/**
 * @file gulpfile
 * @author cgzero(cgzero@cgzero.com)
 */

// 为了方便各个项目去用，这里不进行 es6 转码，各个项目可以根据自己情况配置转码规则
// - 对于 js：剔除 js 文件 import css 的部分
// - 对于 stylus：转义成 css

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const stylus = require('gulp-stylus');
const removeLines = require('gulp-remove-lines');
const nib = require('nib');

gulp.task('js', function () {
    return gulp.src('src/**/*.js')
        // 去除 js 中嵌入的 css
        .pipe(removeLines({
            filters: [/import '[\S]+\.styl'/]
        }))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('lib'));
});

gulp.task('stylus', function () {
    return gulp.src('src/**/*.styl')
        .pipe(stylus({
            'resolve url': true,
            'define': {
                url: require('stylus').resolver()
            },
            'use': nib(),
            'import': ['nib']
            // compress: true
        }))
        .pipe(gulp.dest('lib'));
});

gulp.task('font', function () {
    return gulp.src('src/icon/font/*').pipe(gulp.dest('lib/icon/font'));
});

gulp.task('build', ['js', 'stylus', 'font']);
