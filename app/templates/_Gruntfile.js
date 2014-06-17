module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        clean: [
            'www'
        ],
        copy: {
            app: {
                expand: true,
                cwd: 'app/',
                src: ['**', '!**/bower_components/**/*.html'],
                dest: 'www/'
            },
            config: {
                src: 'config.xml',
                dest: 'www/config.xml'
            }
        },
        jshint: {
            client: {
                src: [
                    'app/js/*.js',
                    'tests/*.js',
                    'Gruntfile.js'
                ],
                directives: {
                    browser: true,
                    nomen: true,
                    unused: false,
                    predef: [
                        'jQuery',
                        '$',
                        'Backbone',
                        'require',
                        'window',
                        'alert'
                    ]
                }
            }
        },
        jasmine: {
            coverage: {
                src: [
                    'app/js/backbone-tastypie-fallback.js',
                    'app/js/config.js',
                    'app/js/models.js',
                    'app/js/collections.js',
                    'app/js/views.js',
                    'app/js/router.js'
                ],
                options: {
                    vendor: [
                        'app/bower_components/jquery/dist/jquery.js',
                        'app/bower_components/underscore/underscore.js',
                        'app/bower_components/backbone/backbone.js'
                    ],
                    specs: [
                        'tests/*.js'
                    ],
                    template: require('grunt-template-jasmine-istanbul'),
                    templateOptions: {
                        coverage: 'coverage/coverage.json',
                        report: [
                            {
                                type: 'cobertura',
                                options: {
                                    dir: 'coverage'
                                }
                            },
                            {
                                type: 'html',
                                options: {
                                    dir: 'coverage'
                                }
                            }
                        ]
                    },
                    junit: {
                        path: 'report',
                        consolidate: true
                    }
                }
            }
        },
        watch: {
            scripts: {
                files: [
                    'app/css/index.css',
                    'app/index.html',
                    'app/js/*.js',
                    'tests/*.js'
                ],
                tasks: ['default'],
                options: {
                    spawn: false,
                    livereload: {
                        options: {
                            livereload: 35729
                        }
                    }
                }
            }
        },
        connect: {
            options: {
                port: 9000,
                hostname: 'localhost',
                livereload: 35729,
                open: 'http://localhost:9000/app/index.html',
                debug: true
            },
            app: {
                base: 'app',
                livereload: true
            }
        }
    });

    // Load tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Register tasks
    grunt.registerTask('test', ['jshint', 'jasmine']);
    grunt.registerTask('default', ['test', 'clean', 'copy']);
    grunt.registerTask('server', ['connect', 'watch']);
};
