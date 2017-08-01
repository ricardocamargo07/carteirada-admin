module.exports = function(grunt) {

  //Install plugins examples
  //npm install grunt-contrib-concat
  //npm install grunt-contrib-uglify
  //npm install grunt-newer


  //npm install grunt-contrib-imagemin
  // ... if error: npm install imagemin-jpegtran
  // ... if error: npm install imagemin-gifsicle
  // ... if error: npm install imagemin-optipng


  //grunt.loadNpmTasks('grunt-newer');

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json')

    ,sass: {
      dist: {
        files: {
          'public/assets/css/sass.css': 'public/assets/sass/app.scss'
        }
      }
    }
    ,watch: {
      css: {
        files: ['resources/assets/js/*','public/assets/sass/*.scss','public/assets/sass/*.sass','public/assets/js/json_var/*.js','public/assets/js/production.js']
        ,tasks: ['sass','concat']
        //MUST INSTALL LIVE RELOAD ADD ON FOR BROWSER
        ,options: {
          livereload: true
        }
      }
      // ,scripts: {
      //  // files: ['public/assets/js/app.js']
      //   //,tasks: ['concat:js','uglify']
      //   /*,options: {
      //     livereload: true
      //   }*/
      // }
    }
    ,concat: { 
      js: {
        src: [
          'public/assets/bower_components/jquery/dist/jquery.js'
          ,'public/assets/bower_components/bootstrap-sass/assets/javascripts/bootstrap.js'
          ,'public/assets/js/vendors/bootbox.js'
          ,'public/assets/js/jquery.address.js'
          ,'public/assets/js/vendors/mmenu/jquery.mmenu.min.all.js'
          ,'public/assets/js/vendors/jquery.cookie.js'
          ,'public/assets/js/json_var/leis.js'
          ,'node_modules/axios/dist/axios.js'
          ,'node_modules/axios/dist/axios.js'
          ,'node_modules/lodash/lodash.js'
          ,'node_modules/vue/dist/vue.js'
          ,'resources/assets/js/helpers.js'
          ,'public/assets/js/production.js'
          ,'resources/assets/js/laws.js'        ]
        ,dest: 'public/assets/js/app.js'
      }
      ,css: {
        src: [
          'public/assets/js/vendors/mmenu/jquery.mmenu.all.css'
          ,'public/assets/css/font-awesome.min.css'
          ,'public/assets/css/sass.css'
        ]
        ,dest: 'public/assets/css/app.css.new'
      }
    }  
    ,cssmin: {
      minify: {
        options: {
          banner: '/*\n' +
                  'Theme Name: ALERJ\n' +
                  'Description: APP\n' +
                  'Author: Casa Digital\n' +
                  'Theme URI: http://www.casadigital.com\n' +
                  'Author URI: http://casadigital.com\n' +
                  'Version: 1.0\n' +
                  'License: GNU General Public License v2 or later\n' +
                  'License URI: http://www.gnu.org/licenses/gpl-2.0.html\n' +
                  //'Tags: white, orange, purple\n' +
                  'Text Domain: App ALERJ\n' +
                  '*/\n'
        }
        ,files: {
          'build/assets/css/app.css': ['public/assets/css/app.css']
        }
      }
    }
    ,uglify: {
        assets: {
          src: 'public/assets/js/app.js'
          ,dest: 'build/assets/js/app.js'
        }
    }
    /*,clean: {
        stylesheets: {
          src: [ 'public/assets/css/*.css', '!assets/css/app.css' ]
        },
        scripts: {
          src: [ 'public/assets/js/*.js', '!assets/js/app.js' ]
        }
    }*/
    //['public/assets/js/concat.js']
    ,imagemin: {
      dist: {
        //funciona
        files: [{  
            expand: true,
            cwd: 'public/assets/images/',
            src: ['**/*.{png,jpg,gif}'],
            dest: 'build/assets/images/'
        }]
      }
    }
    ,copy: {
      main: {
        files: [
          { expand: true, src: 'public/assets/images/*', dest: 'build/' }
          ,{ expand: true, src: 'public/assets/css/app.css', dest: 'build/' }
          //,{ expand: true, src: 'public/assets/fonts/*', dest: 'build/' }
        ]
      },
    }
    ,htmlmin: {
      dist: {
        options: {
              removeComments: true,
              collapseWhitespace: true
            },  
            files: {
              'build/index.html': 'index.html',
              'build/home.html': 'home.html',
              'build/cartao.html': 'cartao.html',
              'build/lei.html': 'lei.html',
              'build/leisFavoritas.html': 'leisFavoritas.html',
              'build/subcategoria.html': 'subcategoria.html',
              'build/busca.html': 'busca.html',
            }
        }
    }

  });
  
  // Load plugins  VER O CLEAR!!!
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  
  //grunt.registerTask('default', ['sass','stylus','concat','cssmin', 'watch', 'uglify']);
  grunt.registerTask('default', ['sass', 'concat', 'watch']);
 // grunt.registerTask('build', ['htmlmin', 'concat', 'uglify', 'cssmin', 'copy', 'imagemin', 'clean']);
  grunt.registerTask('build', ['htmlmin', 'concat', 'uglify', 'cssmin', 'copy', 'imagemin']);

  
};
