module.exports = function(grunt) {

  var jsFiles = ['js/app.js'];
  // Project configuration.

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // Uglifyjs minify / mangle the js for the Frontend.
    uglify: {
      js:{
        files:{
          'dist/js/app.min.js': jsFiles,
        },
        options: {
          banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                  '<%= grunt.template.today("yyyy-mm-dd") %> */'
        }
      }
    },

    // Watch for file changes then execute tasks
    watch: {
        sass: {
          files: 'sass/**/*.sass',
          tasks: ['sass:dist', 'autoprefixer:dist'],
        },
        js:{
          files: 'js/**/*.js',
          tasks: ['concat', 'jshint'],
        },
        livereload: {
          files: 'dist/**/*',
          options: {
            livereload: true,
          },
        },
    },
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'dist/css/style.css': 'sass/style.scss'
        }
      }
    },

    csslint: {
      options: {
        force: true,
        formatters: [
          {id: 'csslint-xml', dest: 'report/csslint.xml'}
        ],
      },
      strict: {
        options: {
          import: 2
        },
        src: ['dist/css/**/*.css']
      },
      lax: {
        options: {
          import: false,
          force: true,
        },
        src: ['dist/css/**/*.css']
      }
    },
    jshint:{
      files: ['js/src/app.js', 'Gruntfile.js'],
      options: {
        force: true,
        reporter: 'jslint',
        reporterOutput: 'report/jshint.xml',
        globals: {
          jQuery: true,
        },
      },
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 version', 'ie 8', 'ie 7', 'ie 9', 'ie 10']
      },
      dist: {
        expand: true,
        flatten: true,
        src: 'dist/css/*.css',
        dest: 'dist/css/'
      }
    },
    concat: {
      js: {
        files: {
          'dist/js/app.js': jsFiles,
          'dist/js/respond.min.js': 'lib/respond/respond.min.js'
        },
      },
    },
    clean: {
      files: 'dist'
    },
    cssmin:{
      minify:{
          expand: true,
          cwd: 'dist/css/',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/css/',
          ext: '.min.css'
      }
    }
});

  // Load the contributed plugins/tasks for Grunt
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-sass');


  // Default task to build all the assets for the front end
  grunt.registerTask('default', [ 'clean', 'sass', 'autoprefixer', "cssmin", 'concat', 'uglify']);

};
