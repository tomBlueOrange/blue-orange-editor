var gulp = require('gulp');
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');
var browserSync = require('browser-sync').create();
const { src, dest, parallel } = require("gulp");
// Set the banner content
var banner = ['/*!\n',
    ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' * Licensed under <%= pkg.license %> (https://github.com/BlackrockDigital/<%= pkg.name %>/blob/master/LICENSE)\n',
    ' */\n',
    '\n'
].join('');


function cssMinify(){
    return gulp.src([
        './src/css/*.css',
        '!./src/css/*.min.css'
    ])
        .pipe(cleanCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
}

function jsMinify(){
    return gulp.src([
        './src/js/*.js',
        '!./src/js/*.min.js'
    ])
        .pipe(uglify().on('error', function(e){
            console.log(e);
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(header(banner, {
            pkg: pkg
        }))
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.stream());
}

gulp.task('dist', function() {
});

// CSS
gulp.task('css', function() {
    return cssMinify();
});

// JS
gulp.task('js', function() {
    return jsMinify();
});

// Default task
gulp.task('default', function(){
    cssMinify();
    jsMinify();
});

gulp.task('build', function(){
    cssMinify();
    return jsMinify();
});


exports.default = parallel(
    cssMinify,
    jsMinify
);
