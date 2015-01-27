'use strict';

module.exports = function (grunt) {
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    yeoman: {
      app: 'app',
      dist: 'dist'
    },
    watch: {
      sass: {
        files: ['<%= yeoman.app %>/content/styles/**/*.{scss,sass}'],
        tasks: ['sass:server']
      },
      jekyll: {
        files: [
          '<%= yeoman.app %>/**/*.{html,yml,md,mkd,markdown}',
          '_config.yml',
          '!./vendor'
        ],
        tasks: ['jekyll:server']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '.jekyll/**/*.html',
          '{.tmp,<%= yeoman.app %>}/content/styles/**/*.css',
          '{.tmp,<%= yeoman.app %>}/<%= js %>/**/*.js',
          '<%= yeoman.app %>/content/images/**/*.{gif,jpg,jpeg,png,svg,webp}'
        ]
      }
    },
    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // Change hostname to '0.0.0.0' to access the server
        // from another device on the same network (e.g. – iPhone)
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('.jekyll'),
              connect().use('/vendor', connect.static('./vendor')),
              connect.static('./app'),
              connect.directory('./app')
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: [
            '<%= yeoman.dist %>'
          ]
        }
      },
      test: {
        options: {
          base: [
            '.tmp',
            '.jekyll',
            'test',
            '<%= yeoman.app %>'
          ]
        }
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            // Running Jekyll also cleans the target directory.  Exclude any
            // non-standard `keep_files` here (e.g., the generated files
            // directory from Jekyll Picture Tag).
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: [
        '.tmp',
        '.jekyll'
      ]
    },
    sass: {
      options: {
        bundleExec: true,
        debugInfo: false,
        lineNumbers: false,
        loadPath: './vendor'
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/content/styles',
          src: '*.{scss,sass}',
          dest: '.tmp/content/styles',
          ext: '.css'
        }]
      },
      server: {
        options: {
          debugInfo: true,
          lineNumbers: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/content/styles',
          src: '*.{scss,sass}',
          dest: '.tmp/content/styles',
          ext: '.css'
        }]
      }
    },
    jekyll: {
      options: {
        bundleExec: true,
        config: '_config.yml,_config.build.yml',
        src: '<%= yeoman.app %>'
      },
      dist: {
        options: {
          dest: '<%= yeoman.dist %>'
        }
      },
      server: {
        options: {
          config: '_config.yml',
          dest: '.jekyll'
        }
      },
      check: {
        options: {
          doctor: true
        }
      }
    },
    // UseminPrepare will only scan a single page for usemin blocks. If you
    // use usemin blocks that aren't in index.html, create a usemin manifest
    // page (hackery!) and point this task there.
    useminPrepare: {
      options: {
        dest: '<%= yeoman.dist %>'
      },
      html: '<%= yeoman.dist %>/index.html'
    },
    usemin: {
      options: {
        basedir: '<%= yeoman.dist %>',
        dirs: ['<%= yeoman.dist %>/**/*']
      },
      html: ['<%= yeoman.dist %>/**/*.html'],
      css: ['<%= yeoman.dist %>/content/styles/**/*.css']
    },
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: false,
          collapseBooleanAttributes: false,
          removeAttributeQuotes: false,
          removeRedundantAttributes: false
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: '**/*.html',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    // Usemin adds files to concat
    concat: {},
    // Usemin adds files to uglify
    uglify: {},
    // Usemin adds files to cssmin
    cssmin: {
      dist: {
        options: {
          check: 'gzip'
        }
      }
    },
    imagemin: {
      dist: {
        options: {
          progressive: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: '**/*.{jpg,jpeg,png}',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: '**/*.svg',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          src: [
            // Jekyll processes and moves HTML and text files
            // Usemin moves CSS and javascript inside of Usemin blocks
            // Copy moves asset files and directories
            'content/images/**/*',
            'content/fonts/**/*',
            // Like Jekyll, exclude files & folders prefixed with an underscore
            '!**/_*{,/**}',
            // Explicitly add any files your site needs for distribution here
            //'./vendor/jquery/jquery.js',
            'favicon.ico'
            // 'apple-touch*.png'
          ],
          dest: '<%= yeoman.dist %>'
        }]
      },
      assemble: {
        files: [{
          src: ['vendor/**/*.js', 'vendor/**/*.css'],
          dest: '.tmp/'
        }]
      }
    },
    rev: {
      options: {
        length: 4
      },
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/**/*.js',
            '<%= yeoman.dist %>/content/styles/**/*.css',
            '<%= yeoman.dist %>/content/images/**/*.{gif,jpg,jpeg,png,svg,webp}',
            '<%= yeoman.dist %>/content/fonts/**/*.{eot*,otf,svg,ttf,woff}'
          ]
        }
      }
    },
    buildcontrol: {
      options: {
        dir: 'dist',
        commit: true,
        push: true,
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
      },
      // Push dist directory to GitHub pages
      pages: {
        options: {
          remote: 'https://github.com/centresource/tonyrobbins.git',
          branch: 'gh-pages'
        }
      },
      // Push dist directory to tfs
      dist: {
        options: {
          remote: 'https://github.com/centresource/tonyrobbins-build.git',
          branch: 'master'
        }
      }
    },
    prettify: {
      options: {
        'indent': 2,
        'brace_style': 'collapse',
        'condense': true,
        'indent_scripts': 'normal'
      },
      all: {
        expand: true,
        cwd: 'dist',
        ext: '.html',
        src: ['**/*.html'],
        dest: 'dist'
      }
    },
    replace: {
      dist: {
        options: {
          patterns: [
            {
              match: /("|'?)\/?content\//g,
              replacement: '$1http://centresource.github.io/tonyrobbins/content/'
            },
            {
              match: /("|'?)\/?scripts\//g,
              replacement: '$1http://centresource.github.io/tonyrobbins/scripts/'
            },
            {
              match: /(<a[^>]*href="?)(\/)/g,
              replacement: '$1http://centresource.github.io/tonyrobbins/'
            },
            {
              match: /(<form[^>]*action="?)(\/)/g,
              replacement: '$1http://centresource.github.io/tonyrobbins/'
            }
          ]
        },
        files: [{
          expand: true,
          src: ['dist/**/*.html', 'dist/scripts/*.js', 'dist/content/*.css']
        }]
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/**/*.js',
        'test/spec/**/*.js',
        '!<%= yeoman.app %>/scripts/vendor/**/*'
      ]
    },
    csscss: {
      options: {
        bundleExec: true,
        minMatch: 4,
        ignoreProperties: '-moz-appearance,-ms-appearance,-o-appearance,-webkit-appearance',
        ignoreSassMixins: false,
        colorize: true,
        shorthand: false,
        verbose: true
      },
      check: {
        src: ['.tmp/content/styles/screen.css']
      }
    },
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      check: {
        src: ['.tmp/content/styles/screen.css']
      }
    },
    concurrent: {
      server: [
        'sass:server',
        'jekyll:server'
      ],
      dist: [
        'sass:dist',
        'copy:dist'
      ]
    }
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('check', [
    'clean:server',
    'jekyll:check',
    'sass:dist',
    'jshint:all',
    'csscss:check',
    'csslint:check'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'jekyll:dist',
    'concurrent:dist',
    'copy:assemble',
    'useminPrepare',
    'concat',
    'cssmin',
    'uglify',
    'imagemin',
    'svgmin',
    'usemin',
    'prettify',
    'htmlmin'
  ]);

  grunt.registerTask('deploy', [
    'build',
    'replace',
    'buildcontrol:pages'
  ]);

  grunt.registerTask('deploy-dist', [
    'build',
    'buildcontrol:dist'
  ]);

  grunt.registerTask('deploy-tfs', [
    'build',
    'replace',
    'buildcontrol:tfs'
  ]);

  grunt.registerTask('default', [
    'check',
    'test',
    'build'
  ]);
};
