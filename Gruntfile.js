
module.exports = function(grunt) {

  grunt.initConfig({
    coffee: {
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
      projectDist: {
        src:[
          'public/js/game/game.js',
          'public/js/ui/ui.js'
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
      dist: {
        files: {
          'public/dist/js/all.min.js': ['public/dist/js/all.js']
        }
      }
    }
  });

  grunt.registerTask('process', [
                                  'concat:gameDist', 
                                  'concat:dist', 
                                  'wrap:ui',
                                  'wrap:game', 
                                  'newer:coffee',
                                  'concat:projectDist',
                                  'wrap:project',
                                  'concat:libsDist',
                                  'uglify'
                                ]);
  grunt.registerTask('default', [
                                  'concat:gameDist',
                                  'concat:dist', 
                                  'wrap:ui',
                                  'wrap:game', 
                                  'coffee', 
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