const {src, dest} = require("gulp");

//Config
const path = require("../config/path.js");

//Плагины
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");

//Обработка JavaScript
const js = () => {
    return src(path.js.src, { sourcemaps: true })
    .pipe(plumber({
        errorHandler: notify.onError(error => ({
            title: "JavaScript",
            message: error.message
        }))
    }))
    .pipe(babel())
    .pipe(uglify())
    .pipe(dest(path.js.dest, { sourcemaps: true }));

}

module.exports = js;