const { watch, series, parallel } = require("gulp");
const browserSync = require("browser-sync").create();

//Config
const path = require("./config/path.js");

//Tasks
const html = require('./task/html.js');
const clear = require('./task/clear.js');

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
}

//Задачи
exports.html = html;
exports.watch = watcher;
exports.clear = clear;

//Сборка
exports.dev = series(
    clear,
    html,
    parallel(watcher, server)
);