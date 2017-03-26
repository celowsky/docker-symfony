"use strict";
const gulp = require('gulp'),
    argv = require('yargs').argv,
    webpack = require('webpack'),
    exec = require('child_process').exec,
    gulpWebpack = require('gulp-webpack');

let env = argv.env != undefined ? argv.env : 'dev';

gulp.task('setEnv', function (cb) {
    exec('export SYMFONY_ENV=' + env, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('composer', ['setEnv'], function (cb) {
    exec('composer install --no-scripts', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('migrate', ['composer'], function (cb) {
    exec('php bin/console d:m:m --env=' + env + ' --no-interaction', { maxBuffer: 16*1024*1024 }, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('dropAndBuildDatabase', function (cb) {
    exec('php bin/console d:d:d --force --env=' + env + ' && php bin/console d:d:c --env=' + env, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('rebuildDatabase', ['dropAndBuildDatabase'], function (cb) {
    exec('php bin/console d:m:m --env=' + env + ' --no-interaction', { maxBuffer: 16*1024*1024 }, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('bowerInstall', function (cb) {
    exec('node_modules/.bin/bower install --allow-root', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
});

gulp.task('webpack', function() {
    return gulp.src('client/main.jsx')
    .pipe(gulpWebpack(require('./webpack.config.js'), webpack))
    .pipe(gulp.dest('./'));
});

gulp.task('build', ['migrate', 'bowerInstall', 'webpack', 'setEnv'], function (cb) {
    console.log('build cb');
    exec('composer install', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    })
});

gulp.task('rebuildAll', ['rebuildDatabase', 'bowerInstall', 'webpack'], function (cb) {
    console.log('build cb');
    exec('composer install', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    })
});
