
module.exports = function(grunt) {

  grunt.initConfig({
    coffee: {
      frontUI: {
        options: {
          bare: true
        },
        expand: true,
        flatten: true,
        cwd: 'public/coffee/front-ui-src/',
        src: ['*.coffee'],
        dest: 'public/js/front-ui',
        ext: '.js'
      },
      scripts: {
        options: {
          bare: true
        },
        expand: true,
        flatten: true,
        cwd: 'public/coffee/ui-src/',
        src: ['*.coffee'],
        dest: 'public/js/ui',
        ext: '.js'
      },
      gameScripts: {
        options: {
          bare: true
        },
        expand: true,
        flatten: true,
        cwd: 'public/coffee/game-src/',
        src: ['*.coffee'],
        dest: 'public/js/game/',
        ext: '.js'
      }
    },
    watch: {
      options: {
        livereload: true
      },
      scripts: {
        files: ['public/coffee/ui/*.coffee', 'public/coffee/game/*.coffee'],
        tasks: ['process']
      }
    },
    wrap: {
      frontUI: {
        src: ['public/coffee/front-ui-src/front-ui.coffee'],
        options: {
          wrapper: ['(->  \n', '\n).call this']
        },
        dest: 'public/coffee/front-ui-src/front-ui.coffee',
      },
      ui: {
        src: ['public/coffee/ui-src/ui.coffee'],
        options: {
          wrapper: ['(->  \n', '\n).call this']
        },
        dest: 'public/coffee/ui-src/ui.coffee',
      },
      game: {
        src: ['public/coffee/game-src/game.coffee'],
        options: {
          wrapper: ['(->  \n', '\n).call this']
        },
        dest: 'public/coffee/game-src/game.coffee',
      },
      project: {
        src: ['public/js/project.js'],
        options: {
          wrapper: ['$(document).ready(function() {\n', '\n});']
        },
        dest: 'public/js/project.js'
      }
    },
    concat: {
      frontUI: {
        src:[
              'public/coffee/front-ui/*.coffee'
            ],
        dest: 'public/coffee/front-ui-src/front-ui.coffee'
      },
      dist: {
        src:[
              'public/coffee/ui/*.coffee'
            ],
        dest: 'public/coffee/ui-src/ui.coffee'
      },
      gameDist: {
        src:[
              'public/coffee/game/Player.coffee',
              'public/coffee/game/game.coffee'
            ],
        dest: 'public/coffee/game-src/game.coffee'
      },
      frontUIDist: {
        src:[
          'libs/js/jquery-1.12.4.min.js',
          'public/js/front-ui/front-ui.js'
        ],
        dest: 'public/js/front-ui.js'
      },
      projectDist: {
        src:[
          'public/js/ui/ui.js',
          'public/js/game/game.js'
        ],
        dest: 'public/js/project.js'
      },
      libsDist: {
        src:[
          'libs/js/jquery-1.12.4.min.js',
          'public/js/project.js'
        ],
        dest: 'public/dist/js/all.js'
      }
    },
    uglify: {
      options: {
        banner: '/* Created by Sentiurin Vladimir | 2016 */\n\n'
      },
      frontUI: {
        files: {
          'public/dist/js/front-ui.min.js': ['public/js/front-ui.js']
        }
      },
      dist: {
        files: {
          'public/dist/js/all.min.js': ['public/dist/js/all.js']
        }
      }
    }
  });

  grunt.registerTask('process', [
                                  'concat:frontUI',
                                  'concat:gameDist', 
                                  'concat:dist',
                                  'wrap:frontUI',
                                  'wrap:ui',
                                  'wrap:game', 
                                  'newer:coffee',
                                  'concat:frontUIDist',
                                  'concat:projectDist',
                                  'wrap:project',
                                  'concat:libsDist',
                                  'uglify'
                                ]);
  grunt.registerTask('default', [
                                  'concat:frontUI',
                                  'concat:gameDist',
                                  'concat:dist',
                                  'wrap:frontUI',
                                  'wrap:ui',
                                  'wrap:game', 
                                  'coffee', 
                                  'concat:frontUIDist',
                                  'concat:projectDist',
                                  'wrap:project',
                                  'concat:libsDist', 
                                  'uglify',
                                  'watch'
                                ]);

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-wrap');

};