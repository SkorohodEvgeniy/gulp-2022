const {src, dest} = require("gulp");

//Config
const path = require("../config/path.js");

//Плагины
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const concat = require("gulp-concat");
const cssimport = require("gulp-cssimport");
const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const size = require("gulp-size");
const shorthand = require("gulp-shorthand");

//Обработка CSS
const css = () => {
    return src(path.css.src, { sourcemaps: true })
    .pipe(plumber({
        errorHandler: notify.onError(error => ({
            title: "CSS",
            message: error.message
        }))
    }))
    .pipe(concat("style.css"))
    .pipe(cssimport())
    .pipe(autoprefixer({
        grid: "autoplace"
    }))
    .pipe(shorthand())
    .pipe(size({ title: "До сжатия:" }))
    .pipe(dest(path.css.dest, { sourcemaps: true }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(csso())
    .pipe(size({ title: "После сжатия:" }))
    .pipe(dest(path.css.dest, { sourcemaps: true }));

}

module.exports = css;