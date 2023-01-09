/* IMPORTS */

// General
const { src, dest, watch, parallel } = require('gulp');
const beep = require('beepbeep');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');

// CSS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

// Imágenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif')

/* CONSTANTES/VARIABLES */

const paths = {
  scssFiles: 'src/scss/**/*.scss',
  cssOutDir: 'src',
  rawImages: 'src/rawImg/**/*',
  imagesOutDir: 'src/img'
}

/* FUNCIONES */

// Eimitir alerta cuando haya un error (en CMD)
function errorHandler(error){
  console.log(error.message);
  beep();
  this.emit('end');
}

//Compilar CSS
function css(){
  return src(paths.scssFiles)
    .pipe(plumber(errorHandler))
    //.pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(postcss([autoprefixer()/*, cssnano()*/]))
    //.pipe(sourcemaps.write())
    .pipe(dest(paths.cssOutDir));
}

//Minificar imagenes
function img(){
  return src(paths.rawImages)
    .pipe(cache(imagemin({optimizationLevel: 3})))
    .pipe(dest(paths.imagesOutDir));
}

//Convertir imagenes a webp
function imgWebp(){
  return src(`${paths.rawImages}.{png,jpg}`)
    .pipe(webp({quality: 50}))
    .pipe(dest(paths.imagesOutDir));
}

//Convertir imagenes a avif
function imgAvif(done){
  src(`${paths.rawImages}.{png,jpg}`)
  .pipe(avif({quality: 50}))
  .pipe(dest(paths.imagesOutDir));
  done();
}

//Establecer watchdog de archivos
function watchFiles(done){
  watch(paths.scssFiles, css);
  watch(paths.rawImages, parallel(img/*, imgWebp, imgAvif*/));
  done();
}

//Exportación por defecto
exports.default = parallel(css, img, /*imgWebp, imgAvif, */watchFiles);