var generators = require('yeoman-generator'),
    fs = require('fs'),
    Promise = require('bluebird'),
    fsAsync = Promise.promisifyAll(fs),
    path = require('path'),
    MeteorJSGenerator = require('../generator-base'),
    _ = require('underscore');

module.exports = MeteorJSGenerator.extend({
    
    constructor: function(){
	generators.Base.apply(this, arguments);

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

	this.should = {};
	this.questions = [];
    },
    
    initializing: function(){
	if (fs.existsSync('./package.js')){
	    this.fail('Cannot configure a Meteor application inside a package directory.');
	}

	if ((!this.name && fs.existsSync('.meteor')) || (this.name && fs.existsSync(path.join(this.name, '.meteor')))){
	    this.fail('Cannot configure a Meteor application inside another.');
	}
    },

    prompting: require('./prompting'),
    
    configuring: require('./configuring'),

    writing: require('./writing'),
    
    end: function(){
	this.step1('MeteorJS Generator complete.');
    }
    
});

