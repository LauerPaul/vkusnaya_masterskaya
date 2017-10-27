var gulp = require('gulp'),
    watch = require("gulp-watch"),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    gulpPugBeautify = require('gulp-pug-beautify'),
    sourcemaps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    include = require("gulp-include");


var source = '_application/',
    dest = 'build/',
    bower = 'bower_components/',
    bower_components = {
        bootstrap: bower + 'bootstrap/',
        FontAwesome: bower + 'components-font-awesome/',
        FontAwesomeAnimation: bower + 'font-awesome-animation/',
        jquery: bower + 'jquery/',
        tether: bower + 'tether/',
        hover: bower + 'hover/',
        animate: bower + 'animate-sass/'
    },
    path = {
        pug: {
            compile: source + 'template/*.pug'
        },
        css: {
            in: [source + 'scss/main.scss'],
            out: dest + 'styles/css/',
            sassOpts: {
                outputStyle: 'nested',
                precison: 3,
                errLogToConsole: true,
                includePaths: [
                                bower_components.bootstrap + 'scss', 
                                bower_components.FontAwesome + 'scss', 
                                bower_components.hover + 'scss', 
                                bower_components.FontAwesomeAnimation + 'src',
                                bower_components.animate
                                ]
            }
        },
        js: {
            in: source + 'js/**/*.*',
            out: dest + 'js/',
            jquery_bower_src: bower_components.jquery + 'dist/jquery.min.js',
            bootstrap_js_src: bower_components.bootstrap + 'dist/js/bootstrap.min.js',
            tether_src: bower_components.tether + 'dist/js/tether.min.js'
        },
        img: {
            in: source + 'images/**/*.*',
            out: dest + 'images/'
        },
        fonts: {
            in: source + 'fonts/**/*.*',
            out: dest + 'fonts/',

            font_awesome_fonts: bower_components.FontAwesome + 'fonts/**/*.*',
            font_awesome_out: dest + 'fonts/FontAwesome/'
        },
        watch: {
            pug: source+'template/**/*.pug',
            js: source+'js/**/*.*',
            css: source + 'scss/**/*',
            bootstrapCSS: source + 'scss/**/*',
            fonts: source + 'fonts/**/*',
            images: source + 'images/**/*.*'
        }
    }


//---------------------------------------------------------
// ---------------------- TASKS ---------------------------
//---------------------------------------------------------

// SCSS
gulp.task('sass', function () {
    // console.log("-- SCSS --");
    return gulp.src(path.css.in)
        .pipe(sass(path.css.sassOpts))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.css.out))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.css.out));
});
// JADE (PUG)
gulp.task('pug', function () {
    // console.log("-- JADE (PUG) --");
    return gulp.src(path.pug.compile)
        .pipe(gulpPugBeautify({omit_empty: true}))
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest(dest));
});
// ECMA SCRIPT (JS)
gulp.task("scripts", function() {
  // console.log("-- ECMA SCRIPT (JS) --");
  return gulp.src([path.js.jquery_bower_src, path.js.bootstrap_js_src, path.js.in, path.js.tether_src])
    .pipe(include())
    .on('error', console.log)
    .pipe(gulp.dest(path.js.out));
});
// IMAGES COPY
gulp.task('images', function () {
    // console.log("-- IMAGES COPY --");
    gulp.src(path.img.in)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.img.out)) //И бросим в build
});
// FONTS COPY
gulp.task('awesome', function() {
    // console.log("-- FontAwesome COPY --");
    gulp.src(path.fonts.font_awesome_fonts)
    .pipe(gulp.dest(path.fonts.font_awesome_out))
});

gulp.task('fonts', ['awesome'], function() {
    // console.log("-- FONTS COPY --");
    gulp.src(path.fonts.in)
    .pipe(gulp.dest(path.fonts.out))
});


// default task
gulp.task('default', ['sass', 'scripts', 'pug', 'fonts', 'images'], function () {
     gulp.watch(path.watch.css, ['sass']);
     gulp.watch(path.watch.bootstrapCSS, ['sass']);
     gulp.watch(path.watch.pug, ['pug']);
     gulp.watch(path.watch.js, ['scripts']);
     gulp.watch(path.watch.fonts, ['fonts']);
     gulp.watch(path.watch.images, ['images']);
    console.log("-- WATCH FINISH --");
});
