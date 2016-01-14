'use strict';
module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    express: {
      options: {
        // Override defaults here
      },
      web: {
        options: {
          script: 'bin/www'
        }
      }
    },
    watch: {
      frontend: {
        files: [
          // triggering livereload when the .css file is updated
          // (compared to triggering when sass completes)
          // allows livereload to not do a full page refresh
          'public/stylesheets/*.css',
          'views/**/*.ejs',
          'public/scripts/**/*.js',
          'public/images/**/*'
        ]
      },
      web: {
        files: [
          'routes/**/*.js',
          'models/*.js',
          'app.js',
          'config.js'
        //   'test/**/*.js',
        ],
        tasks: [
          'express:web'
        ],
        options: {
          nospawn: true, //Without this option specified express won't be reloaded
          atBegin: true
        }
      }
    },
    parallel: {
      web: {
        options: {
          stream: true
        },
        tasks: [{
          grunt: true,
          args: ['watch:frontend']
        }, {
          grunt: true,
          args: ['watch:web']
        }]
      }
    }
  });
  grunt.registerTask('web', 'launch webserver and watch tasks', [
    'parallel:web',
  ]);

  grunt.registerTask('default', ['web']);
};
