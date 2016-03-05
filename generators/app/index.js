var generators = require('yeoman-generator'),
    path = require('path'),
    MeteorJSGenerator = require('../generator-base'),
    _ = require('underscore'),
    fs = require('fs');

module.exports = MeteorJSGenerator.extend({

    constructor: function(){
	MeteorJSGenerator.apply(this, arguments);

	this.argument('name', {
	    desc: 'Application name to create or nothing for in-place creation.',
	    required: false,
	    type: String
	});

	this.option('packages', {desc: 'Create packages inside application.', type: String});
	this.option('coffee', {desc: 'Generate CoffeeScript instead of Javascript.'});
	this.option('verbose', {desc: 'Increase verbosity of processing stages.'});

	this.scriptSuffix = this.options.coffee ? '.coffee' : '.js';
	this.appName = this.name || process.cwd().split(path.sep).pop();
	if (this.name) {
	    fs.mkdirSync(this.name);
	    this.destinationRoot(this.name);
	}

	this.should = {};
	this.questions = [];
    },

    initializing: function(){
	if (this.fs.exists('package.js')){
	    this.fail('Cannot configure a Meteor application inside a package directory.');
	}

	if ((!this.name && this.fs.exists('.meteor')) || (this.name && this.fs.exists(path.join(this.name, '.meteor')))){
	    this.fail('Cannot configure a Meteor application inside another.');
	}
    },

    prompting: require('./prompting'),
    
    configuring: require('./configuring'),

    writing: require('./writing'),

    install: require('./install'),
    
    end: function(){
	this.step1('MeteorJS Generator complete.');
    }
    
});

