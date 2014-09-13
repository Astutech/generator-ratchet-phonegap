'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var RatchetPhonegapGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  /*
  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous RatchetPhonegap generator!'));

    var prompts = [{
      type: 'confirm',
      name: 'someOption',
      message: 'Would you like to enable this option?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.someOption = props.someOption;

      done();
    }.bind(this));
  },
  */

  app: function () {
    this.mkdir('app');
    this.mkdir('app/js');
    this.mkdir('app/css');
    this.mkdir('hooks');

    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
    this.copy('_bowerrc', '.bowerrc');
    this.copy('_Gruntfile.js', 'Gruntfile.js');
    this.copy('_config.xml', 'app/baseconfig.xml');
    this.copy('_index.html', 'app/index.html');
    this.copy('_main.js', 'app/js/main.js');
    this.copy('_index.scss', 'app/css/index.scss');
    this.copy('_phonegap.js', 'app/phonegap.js');
    this.copy('_debugdata.json', 'app/debugdata.json');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('_gitignore', '.gitignore');
  },

  tests: function () {
    this.mkdir('tests');
    this.copy('_basetest.js', 'tests/test.js');
  },

  templates: function () {
    this.mkdir('templates');
    this.copy('_basetemplate.html', 'templates/base.html');
  },

  www: function () {
    this.mkdir('www');
  }
});

module.exports = RatchetPhonegapGenerator;
