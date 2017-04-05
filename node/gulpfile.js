"use strict";
const gulp = require('gulp'),
    argv = require('yargs').argv,
    webpack = require('webpack'),
    exec = require('child_process').exec,
    gulpWebpack = require('gulp-webpack'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');

let env = argv.env != undefined ? argv.env : 'dev';


gulp.task('bowerInstall', function (cb) {
    exec('node_modules/.bin/bower install --allow-root', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
});

gulp.task('webpack', function() {
    return gulp.src('client/js/main.jsx')
    .pipe(gulpWebpack(require('./webpack.config.js'), webpack))
    .pipe(gulp.dest('./'));
});

gulp.task('sass', function(cb) {
    return gulp.src('./client/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 3 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('./web/css/dist'));
});

gulp.task('sass:watch', function() {
    gulp.watch('./client/sass/**/*.scss', ['sass']);
});

gulp.task('build', ['bowerInstall', 'webpack', 'sass'], function (cb) {
    console.log('build cb');
});

gulp.task('rebuildAll', ['bowerInstall', 'webpack'], function (cb) {
    console.log('build cb');
    exec('composer install', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    })
});
