module.exports = function(grunt) {
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // Uglifyjs minify / mangle the js for the Frontend.
    uglify: {
      js_dev: {
        options: {
          banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                       '<%= grunt.template.today("yyyy-mm-dd") %> */',
          preserveComments: 'all',
          beautify: {
            width: 80,
            beautify: true
          } // beautify
        }, // options
        files: {
          'js/scripts.js': [
            'bootstrap/javascripts/bootstrap/affix.js',
            'bootstrap/javascripts/bootstrap/alert.js',
            'bootstrap/javascripts/bootstrap/button.js',
            'bootstrap/javascripts/bootstrap/carousel.js',
            'bootstrap/javascripts/bootstrap/collapse.js',
            'bootstrap/javascripts/bootstrap/dropdown.js',
            'bootstrap/javascripts/bootstrap/modal.js',
            'bootstrap/javascripts/bootstrap/tooltip.js',
            'bootstrap/javascripts/bootstrap/popover.js',
            'bootstrap/javascripts/bootstrap/scrollspy.js',
            'bootstrap/javascripts/bootstrap/tab.js',
            'bootstrap/javascripts/bootstrap/transition.js',
            'assets/js/app.js'
          ]
        } // files
      }, // js_dev
      js_prod: {
        files: {
          'js/scripts.js': [
            'bootstrap/javascripts/bootstrap/affix.js',
            'bootstrap/javascripts/bootstrap/alert.js',
            'bootstrap/javascripts/bootstrap/button.js',
            'bootstrap/javascripts/bootstrap/carousel.js',
            'bootstrap/javascripts/bootstrap/collapse.js',
            'bootstrap/javascripts/bootstrap/dropdown.js',
            'bootstrap/javascripts/bootstrap/modal.js',
            'bootstrap/javascripts/bootstrap/tooltip.js',
            'bootstrap/javascripts/bootstrap/popover.js',
            'bootstrap/javascripts/bootstrap/scrollspy.js',
            'bootstrap/javascripts/bootstrap/tab.js',
            'bootstrap/javascripts/bootstrap/transition.js',
            'assets/js/*.js'
          ]
        } // files
      } // js_prod
    },

    // Watch for file changes then execute tasks
    watch: {
      sass: {
        files: 'assets/sass/*.scss',
        tasks: ['sass:dist', 'autoprefixer:dist'],
      },
      js:{
        files: 'assets/js/*.js',
        tasks: ['concat', 'jshint'],
      },
    },
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'css/style.css': 'assets/sass/style.scss'
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
        src: ['css/*.css']
      },
      lax: {
        options: {
          import: false,
          force: true,
        },
        src: ['css/*.css']
      }
    },
    jshint:{
      files: ['js/scripts.js', 'Gruntfile.js'],
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
        src: 'css/*.css',
        dest: 'css/'
      }
    },
    concat: {
      js: {
        files: {
          //'dist/js/app.js': jsFiles,
          'js/respond.min.js': 'lib/respond/respond.min.js'
        },
      },
    },
    clean: {
      files: ['css', 'img', 'js']
    },
    cssmin:{
      minify:{
          expand: true,
          cwd: 'css/',
          src: ['*.css', '!*.min.css'],
          dest: 'css/',
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
