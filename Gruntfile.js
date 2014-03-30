module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concurrent: {
      dev: {
	tasks: ['nodemon', 'watch'],
	options: {
	  logConcurrentOutput: true
	}
      }
    },
    nodemon: {
      dev: {
        script: 'index.js',
        options: {
	  ext: 'js,html',
          nodeArgs: ['--harmony'],
          env: {
            PORT: '3000'
          },
          // omit this property if you aren't serving HTML files and 
          // don't want to open a browser tab on start
          callback: function (nodemon) {
            nodemon.on('log', function (event) {
              console.log(event.colour);
            });

            // opens browser on initial server start
            nodemon.on('config:update', function () {
            // Delay before server listens on port
            setTimeout(function() {
              require('open')('http://localhost:3000');
            }, 1000);
          });

          // refreshes browser when server reboots
          nodemon.on('restart', function () {
            // Delay before server listens on port
            setTimeout(function() {
              require('fs').writeFileSync('.rebooted', 'rebooted');
            }, 1000);
          });
        }
      }
    }
    },
    watch: {
      server: {
        files: ['.rebooted','**/*.js', '**/*.html'],
        options: {
          livereload: true,
	  debounceDelay: 3000,
        }
      } 
    },
//    watch: {
//      options: {
//        livereload: true,
//      },
//      src: {
//        files: ['**/*.js', '**/*.html'],
//      },
//    },
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.registerTask('default', ['concurrent']);
};
