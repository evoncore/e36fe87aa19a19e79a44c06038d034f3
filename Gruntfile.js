
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

  ////////////////////////////////////////////////////////////////////////////

    concat: {
      dist: {
        src: ['libs/js/*.js', 'public/js/ui/*.js', 'public/js/game/*.js'],
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

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-newer');

  grunt.registerTask('process', ['newer:coffee', 'concat', 'uglify']);
  grunt.registerTask('default', ['coffee', 'concat', 'uglify', 'watch']);

};