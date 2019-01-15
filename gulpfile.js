var gulp = require("gulp");
var minifycss = require("gulp-clean-css");
var browserSync = require('browser-sync').create();
var uglify = require("gulp-uglify");
var concatify = require("gulp-concat");
var sourcemaps = require("gulp-sourcemaps");
var minifyhtml = require("gulp-minify-html");

// Paths to various files
var paths = {
  scripts: ["source/js/*.js"],
  styles: ["source/css/**/*.css"],
  images: ["source/images/**/*"],
  content: ["source/index.html"]
};

// Compress css files and outputs them to build/css/*.css
gulp.task("styles", function() {
  return gulp
    .src(paths.styles)
    .pipe(minifycss({ compatibility: "ie8" }))
    .pipe(gulp.dest("./build/css/"));
});

// Concats & minifies js files and outputs them to build/js/app.js
gulp.task("scripts", function() {
  return gulp
    .src(paths.scripts)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concatify("app.js"))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./build/js/"));
});

// Minifies our HTML files and outputs them to build/*.html
gulp.task("content", function() {
  return gulp
    .src(paths.content)
    .pipe(
      minifyhtml({
        empty: true,
        quotes: true
      })
    )
    .pipe(gulp.dest("./build"));
});

// Optimizes our image files and outputs them to build/image/*
gulp.task("images", function() {
  return gulp.src(paths.images).pipe(gulp.dest("./build/image/"));
});

// Watches for changes to our files and executes required scripts
gulp.task("watch", function() {
  gulp.watch(paths.scripts, gulp.series("scripts"));
  gulp.watch(paths.styles, gulp.series("styles"));
  gulp.watch(paths.content, gulp.series("content"));
  gulp.watch(paths.images, gulp.series("images"));
});

// Launches a test webserver
gulp.task("browserSync", function() {
  browserSync.init({
     server: {
        baseDir: "./build",
     }
   });

  gulp.watch("./build/*.html").on('change', browserSync.reload);
  gulp.watch("./build/js/*.js").on('change', browserSync.reload);
  gulp.watch("./build/css/*.css").on('change', browserSync.reload);

});

gulp.task(
  "default",
  gulp.parallel("styles", "scripts", "content", "images", "watch", "browserSync")
);
