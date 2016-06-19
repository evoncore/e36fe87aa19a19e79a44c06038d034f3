
module.exports = function(grunt) {

  grunt.initConfig({
    coffee: {
      scripts: {
        expand: true,
        flatten: true,
        cwd: 'public/coffee/ui',
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
        cwd: 'public/coffee/game/',
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
      basic: {
        src: ['public/js/all-game.js'],
        options: {
          wrapper: ['(function() { \n', '\n}).call(this);']
        },
        dest: 'public/js/all-g.js',
      }
    },
    concat: {
      dist: {
        src:[
              'libs/js/jquery-*.js',
              'public/js/ui/*.js',
              'public/js/all-g.js'
            ],
        dest: 'public/dist/js/all.js'
      },
      gameDist: {
        src:[
              'public/js/game/Player.js',
              'public/js/game/game.js'
            ],
        dest: 'public/js/all-game.js'
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

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-wrap');

  grunt.registerTask('process', ['newer:coffee', 'concat:gameDist', 'wrap', 'concat:dist', 'uglify']);
  grunt.registerTask('default', ['coffee', 'concat:gameDist', 'wrap', 'concat:dist', 'uglify', 'watch']);

};