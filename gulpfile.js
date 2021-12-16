const { src, dest, watch, parallel, series } = require('gulp');

const scss          = require('gulp-sass');
const concat        = require('gulp-concat');
const autoprefixer  = require('gulp-autoprefixer');
const uglify        = require('gulp-uglify');
const imagemin      = require('gulp-imagemin');
const svgSprite     = require('gulp-svg-sprite');
const fileInclude   = require('gulp-file-include');
const del           = require('del');
const browserSync   = require('browser-sync').create();             // .create() - это создания нового подключения
const ttf2woff      = require('gulp-ttf2woff');
const ttf2woff2     = require('gulp-ttf2woff2');

function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'app/dist/'
    },
    notify: false
  })
}

function fonts() {
  src('app/fonts/*.ttf')
    .pipe(ttf2woff())
    .pipe(dest('app/dist/fonts/'));
  return src('app/fonts/*.ttf')
    .pipe(ttf2woff2())
    .pipe(dest('app/dist/fonts/'));
}

function styles() {
  return src('app/scss/style.scss')
  .pipe(scss({outputStyle: 'compressed'}))
  .pipe(concat('style.min.css'))
  .pipe(autoprefixer({
    overrideBrowserslist: ['last 10 versions'],
    grid: true
  }))
  .pipe(dest('app/dist/css/'))
  .pipe(browserSync.stream())                       // забросить выгруженный фаил в браузер
}

function scripts() {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/slick-carousel/slick/slick.js',
    'node_modules/mixitup/dist/mixitup.js',
    'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
    'node_modules/ion-rangeslider/js/ion.rangeSlider.js',
    'node_modules/rateyo/src/jquery.rateyo.js',
    'node_modules/jquery-form-styler/dist/jquery.formstyler.js',
    'app/js/main.js',
  ])
  .pipe(concat('main.min.js'))
  .pipe(uglify())
  .pipe(dest('app/dist/js/'))
  .pipe(browserSync.stream())
}

function images(){
  return src(['app/images/**/*.*', '!app/images/icons/*.*', '!app/images/sprite.svg'])
  .pipe(imagemin([
    imagemin.gifsicle({interlaced: true}),
    imagemin.mozjpeg({quality: 75, progressive: true}),
    imagemin.optipng({optimizationLevel: 5}),
    imagemin.svgo({
        plugins: [
            {removeViewBox: true},
            {cleanupIDs: false}
        ]
    })
  ]))
  .pipe(dest('app/dist/images/'))
}

function svgsprites(){
  return src('app/images/icons/*.svg')
  .pipe(svgSprite({
    mode: {
      stack: {
        sprite: "../sprite.svg"
      }
    }
  }))
  .pipe(dest('app/dist/images/'))
}

function fileinclude(){
  return src(['app/*.html', 'app/**/*.html', '!app/dist/*.html'])
  .pipe(fileInclude({
    prefix: '@@',
    basepath: '@file'
  }))
  .pipe(dest('app/dist'))
}

function build() {
  return src([
    'app/js/main.min.js'], {base: 'app/dist'})
  .pipe(dest('app/dist'))
}

function cleanDist() {
  return del('app/dist')
}

function watching() {
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);                  //следим за изменениями всех файлов js, за исключением min.js
  watch(['app/*.html', 'app/module/**/*.html', '!app/dist/*.html'], fileinclude).on('change', browserSync.reload);        // при изменениях в html сделать полный релоад страницы
  watch(['app/images/icons/*.*'], svgSprite);
  watch(['app/images/**/*.{jpg,gif,png}'], images);
  watch(['app/fonts/*.ttf'], fonts);
}

// экспорт функций в gulp. значения после знака равно - это имеющаяся функция
exports.styles      = styles;
exports.scripts     = scripts;
exports.browsersync = browsersync;
exports.watching    = watching;
exports.images      = images;
exports.svgsprites  = svgsprites;
exports.cleanDist   = cleanDist;
exports.build       = build;
exports.fonts       = fonts;


exports.build = series(cleanDist, parallel(fileinclude, build, styles, scripts, fonts));

exports.default = parallel(build, fileinclude, styles, scripts, browsersync, watching, svgsprites, images, fonts);