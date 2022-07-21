const {src, dest} = require("gulp");

//Config
const path = require("../config/path.js");

//Плагины
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const size = require("gulp-size");
const shorthand = require("gulp-shorthand");
const sass = require('gulp-sass')(require('sass'));

//Обработка CSS
const scss = () => {
    return src(path.scss.src, { sourcemaps: true })
    .pipe(plumber({
        errorHandler: notify.onError(error => ({
            title: "SCSS",
            message: error.message
        }))
    }))
    .pipe(sass())
    .pipe(concat("style.css"))
    .pipe(autoprefixer({
        grid: "autoplace"
    }))
    .pipe(shorthand())
    .pipe(size({ title: "До сжатия:" }))
    .pipe(dest(path.scss.dest, { sourcemaps: true }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(csso())
    .pipe(size({ title: "После сжатия:" }))
    .pipe(dest(path.scss.dest, { sourcemaps: true }));

}

module.exports = scss;