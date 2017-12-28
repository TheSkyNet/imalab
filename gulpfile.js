var gulp = require('gulp'); // jshint ignore:line
var gulpLoadPlugins = require('gulp-load-plugins');
var fs = require('fs');
var yaml = require('js-yaml');
var copy = require('gulp-copy');
var browserSync = require('browser-sync').create();
var connect = require('gulp-connect-php');
var plugins = gulpLoadPlugins();

var yml = loadConfig();
var yamlConf = './config/defaults-js.yml';

gulp.task(
  'yaml-parser', function ()
  {
    yml = gulp.src(yamlConf)
      .pipe(plugins.yaml({schema: 'DEFAULT_SAFE_SCHEMA'}));

  }
);

function loadConfig()
{
  var ymlFile = fs.readFileSync( './config/defaults-js.yml', 'utf8');
  return yaml.load(ymlFile);
}

gulp.task(
  'test', function ()
  {
    console.log(yml);
  }
);

/*------------------------------------------
 Sass task
 ------------------------------------------*/
gulp.task(
  'sass', function ()
  {
    return gulp.src(yml.brend.scss.src)
      .pipe(plugins.sass().on('error', plugins.sass.logError))
      .pipe(gulp.dest(yml.brend.scss.dist))
      .pipe(browserSync.stream());
  }
);
/*------------------------------------------
 compine css task
 ------------------------------------------*/
gulp.task(
  'compine-css', function ()
  {
    return gulp.src(yml.brend.sass.dist)
      .pipe(plugins.concat(yml.brend.sass.output))
      .pipe(gulp.dest(yml.brend.sass.dist));
  }
);

/*------------------------------------------
 Autoprefixer task
 ------------------------------------------*/
gulp.task(
  'autoprefixer', function ()
  {
    return gulp.src('files/*.css')
      .pipe(
        plugins.autoprefixer(
          {
            browsers: ['last 2 versions'],
            cascade:  false
          }
        )
      )
      .pipe(gulp.dest('dist'));
  }
);

/*------------------------------------------
 Concat task
 ------------------------------------------*/
gulp.task(
  'concat', function ()
  {
    return gulp.src(yml.brend.javascript.src)
      .pipe(plugins.concat(yml.brend.javascript.output))
      .pipe(gulp.dest(yml.brend.javascript.dist));
  }
);

/*------------------------------------------
 Uglify task
 ------------------------------------------*/
gulp.task(
  'uglify', function ()
  {
    plugins.pump(
      [
        gulp.src(yml.brend.javascript.dist),
        plugins.uglify(),
        gulp.dest(yml.brend.javascript.dist)
      ],
      cb
    );
  }
);

/*------------------------------------------
 Obfuscate task
 ------------------------------------------*/
gulp.task(
  'obfuscate', function ()
  {
    console.log('obfuscating code...');
    return gulp.src('./assets/sass/**/*.scss')
      .pipe(plugins.sass().on('error', plugins.sass.logError))
      .pipe(gulp.dest('./files'));
  }
);

/*------------------------------------------
 Browsersync task
 ------------------------------------------*/
gulp.task(
  'browser-sync', function ()
  {
    connect.server(
      {
        base: './dist',
        port: 4000
      }, function ()
      {
        browserSync.init(
          {
            injectChanges: true,
            proxy:         '127.0.0.1:4000'
          }
        );
      }
    );

    browserSync.init(
      {
        server: 'dist',
        port:   yml.brend.config.port
        // proxy: "yourlocal.dev"
      }
    );
  }
);

/*------------------------------------------
 Browsersync task
 ------------------------------------------*/
gulp.task(
  'copy', function ()
  {
    return gulp.src('src/pages/**/*')
      .pipe(gulp.dest('./dist'));
  }
);

/*------------------------------------------
 Image compress task
 ------------------------------------------*/
gulp.task(
  'images', function ()
  {
    return gulp.src(yml.brend.img.src)
      .pipe(plugins.imagemin())
      .pipe(gulp.dest(yml.brend.img.dist));
  }
);

/*------------------------------------------
 Watch task
 ------------------------------------------*/
gulp.task(
  'watch', function ()
  {
    // Watch tasks defined here
    gulp.watch(yml.brend.watch.scss, ['sass', 'autoprefixer']).on(
      'change', browserSync.reload
    );
    gulp.watch(yml.brend.watch.js, ['build']).on('change', browserSync.reload);
    gulp.watch(yml.brend.watch.img, ['images']).on(
      'change', browserSync.reload
    );
    gulp.watch(yamlConf, ['images']).on('change', browserSync.reload);
  }
);

/*------------------------------------------
 Build task
 ------------------------------------------*/
gulp.task('build', ['copy', 'images', 'sass', 'autoprefixer', 'concat']);

/*------------------------------------------
 Default task
 ------------------------------------------*/
gulp.task('default', ['build', 'watch']);