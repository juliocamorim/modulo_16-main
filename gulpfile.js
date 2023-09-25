const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const imagemin = require('gulp-imagemin');

function comprimeImagens() {
    return gulp.src('./source/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'));
}

function comprimeJavaScript() {
    return gulp.src('./source/scripts/*.js')
    .pipe(uglify())
    .pipe(obfuscate())
    .pipe(gulp.dest('./build/scripts'))
}

function compilaSass() {
    return gulp.src('./source/styles/main*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'));
}

function funcaoPadrao(callback) {
    setTimeout(function(){
        console.log("executando o gulp");
        callback();
    }, 2000)
}

function dizOla(callback) {
    setTimeout(function(){
    console.log("olá Mundo, estamos on para o gulp agora");
    dizXau();
    callback();
    }, 2000)
}

function dizXau(){
    console.log("Tchau Gulp, foi bom enquanto durou!");
}

exports.default = gulp.parallel(funcaoPadrao, dizOla);
exports.dizOla = dizOla;
exports.sass = compilaSass;
exports.watch = function() {
    gulp.watch('./source/styles/*.scss', {ignoreInitial: false }, gulp.series(compilaSass))
}
exports.javascript = comprimeJavaScript
exports.images = comprimeImagens