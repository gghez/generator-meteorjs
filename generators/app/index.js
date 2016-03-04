var generators = require('yeoman-generator'),
    path = require('path'),
    MeteorJSGenerator = require('../generator-base'),
    _ = require('underscore'),
    fs = require('fs');

module.exports = MeteorJSGenerator.extend({
        
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

