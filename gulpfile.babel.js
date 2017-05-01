'use strict';

import gulp from "gulp";
import gulpLoadPlugins from "gulp-load-plugins";
import nodemon from "nodemon";
import runSequence from "run-sequence";
import sourcemaps from "gulp-sourcemaps";
import typescript from "gulp-typescript";
import spawn from "gulp-spawn";
import clean from "gulp-clean";
const tsProject = typescript.createProject('tsconfig.json');

let plugins = gulpLoadPlugins();
let config;

/********************
 * Paths and values
 ********************/

const debugPort = 5951;
const port = 9081;

const serverPath = '.';
const paths = {
  server: {
    scripts: [
      `${serverPath}/**/!(*.spec|*.integration).js`,
      `!${serverPath}/config/local.env.sample.js`
    ],
    json: [`${serverPath}/**/*.json`],
    test: {
      integration: [`${serverPath}/**/*.integration.js`, 'mocha.global.js'],
      unit: [`${serverPath}/**/*.spec.js`, 'mocha.global.js']
    }
  },
  karma: 'karma.conf.js',
  dist: 'dist',
  map: 'dist'
};

/********************
 * Helper functions
 ********************/

const onServerLog = (log) => {
    console.log(plugins.util.colors.white('[') +
      plugins.util.colors.yellow('nodemon') +
      plugins.util.colors.white('] ') +
      log.message);
  };

/********************
 * Tasks
 ********************/

gulp.task('routes', () => {
  return spawn({
    cmd: "tsoa",
    args: [
      "routes"
    ]
  });
});

gulp.task('swagger', () => {
    return spawn({
      cmd: "tsoa",
      args: [
        "swagger"
      ]
    })
  }
);

gulp.task('typescript', () => {
  return tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('.'));
});

gulp.task('watch', () => {
  plugins.watch(serverPath);
});

gulp.task('start:server', () => {
  process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
  process.env.PORT = process.env.PORT || port;
  nodemon(`-w ${serverPath} ${serverPath} -seneca.log=level: INFO --seneca.log=type: act, regex: color: red`)
    .on('log', onServerLog);
});

gulp.task('start:server:prod', () => {
  process.env.NODE_ENV = process.env.NODE_ENV || 'production';
  process.env.PORT = process.env.PORT || port;
  nodemon(`-w ${paths.dist}/${serverPath} ${paths.dist}/${serverPath} -seneca.log=level:INFO --seneca.log=type: act, regex: color: red`)
    .on('log', onServerLog);
});

gulp.task('start:server:debug', cb => {
  process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
  process.env.PORT = process.env.PORT || port;
  nodemon(`-w ${
    serverPath
    } --debug=${debugPort} ${serverPath} -seneca.log=level: DEBUG --seneca.log=type: act, regex: color: red`)
    .on('log', onServerLog);
});

/********************
 * Main tasks
 ********************/

gulp.task('serve', cb => {
  runSequence(
    'typescript',
    'start:server',
    cb
  )
  ;
});

gulp.task('serve:debug', cb => {
  runSequence(
    'typescript',
    'start:server:debug',
    'watch',
    cb
  )
  ;
});

gulp.task('clean', () => {
  return gulp.src(['**/*.js', '**/*.map', '!./gulpfile.*', '!./node_modules/**/*'])
    .pipe(clean({
      force: true
    }));
});

gulp.task('default', cb => {
  runSequence(
    'serve',
    cb
  );
});
