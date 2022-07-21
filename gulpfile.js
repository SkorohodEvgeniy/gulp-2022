const { watch, series, parallel } = require("gulp");
const browserSync = require("browser-sync").create();

//Config
const path = require("./config/path.js");

//Tasks
const clear = require('./task/clear.js');
const html = require('./task/html.js');
const scss = require('./task/scss.js');
const js = require('./task/js.js');

//Server
const server = () =>{
    browserSync.init({
        server: {
            baseDir: path.root
        }
    })
}

//Наблюдение
const watcher = () => {
    watch(path.html.watch, html).on("all", browserSync.reload);
    watch(path.scss.watch, scss).on("all", browserSync.reload);
    watch(path.js.watch, js).on("all", browserSync.reload);
}

//Задачи
exports.html = html;
exports.scss = scss;
exports.js = js;

//Сборка
exports.dev = series(
    clear,
    parallel(html, scss, js),
    parallel(watcher, server)
);