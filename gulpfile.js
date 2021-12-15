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

function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'app/'
    },
    notify: false
  })
}

// function html() {
//   return src('app/**/*.html')
//     .pipe(fileinclude())
//     .pipe(dest('app/dist/'))
//     .pipe(browserSync.stream())
// }

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
  return src('app/images/icons/**.svg')
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
  return src([
    'app/module/**/*.html'
  ])
  .pipe(fileInclude({
    prefix: '@@',
    basepath: '@file'
  }))
  .pipe(dest('app/dist/'))
}

function build() {
  return src([
    'app/*.html',
    'app/css/style.min.css',
    'app/js/main.min.js'
  ], {base: 'app'})
  .pipe(dest('app/dist/'))
}

function cleanDist() {
  return del('app/dist')
}

function watching() {
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);                  //следим за изменениями всех файлов js, за исключением min.js
  watch(['app/*.html'], fileinclude).on('change', browserSync.reload);        // при изменениях в html сделать полный релоад страницы
  watch(['app/**/*.svg' , '!app/**/sprite.cvg'], svgSprite);
  watch(['app/**/*.{jpg,gif,png}' , '!app/dist/**/*.{jpg,svg,gif,png}'], images);
}

// экспорт функций в gulp. значения после знака равно - это имеющаяся функция
exports.styles = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.watching = watching;
exports.images = images;
exports.svgsprites = svgsprites;
exports.fileinclude = fileinclude;
exports.cleanDist = cleanDist;

exports.build = series(cleanDist, build);

exports.default = parallel(styles, scripts, browsersync, watching, svgsprites, images);