var generators = require('yeoman-generator'),
    fs = require('fs'),
    Promise = require('bluebird'),
    fsAsync = Promise.promisifyAll(fs),
    path = require('path'),
    chalk = require('chalk');

module.exports = generators.Base.extend({
    
    constructor: function(){
	generators.Base.apply(this, arguments);

	this.argument('name', {desc: 'Application or package name.', required: false, type: String});

	this.option('packages', {desc: 'Create packages inside application.', type: String});
	this.option('coffee', {desc: 'Generate CoffeeScript instead of Javascript.'});
	this.option('verbose', {desc: 'Increase verbosity of processing stages.'});

	this.scriptSuffix = this.options.coffee ? '.coffee' : '.js';
	this.appName = this.name || process.cwd().split(path.sep).pop();
    },
    
    initializing: function(){
	if (fs.existsSync('./package.js')){
	    this.env.error(chalk.bold.red('Cannot configure a Meteor application inside a package directory.'));
	}

	if ((!this.name && fs.existsSync('.meteor')) || (this.name && fs.existsSync(path.join(this.name, '.meteor')))){
	    this.env.error(chalk.bold.red('Cannot configure a Meteor application inside another.'));
	}
    },
    
    configuring: {
	
	app: function(){
	    this.log(chalk.bold.yellow('Configuring application:'), chalk.bold.white(this.appName));		
	    this.spawnCommandSync('meteor', ['create', this.name || '.']);
	},
	
	package: function(){
	    if (!this.options.packages) return;

	    if (this.name) {
		process.chdir(this.name);
	    }

	    var packages = (this.options.packages || '').split(',').filter((p) => p.trim());
	    packages.forEach((p) => {
		if (fs.existsSync('packages/' + p)){
		    this.log('Package', chalk.green(p), 'already configured.');
		} else {
		    this.log(chalk.yellow('Configuring package:'), chalk.white(p));
		    
		    this.spawnCommandSync('meteor', ['create', '--package', p]);
		}
	    });
	    
	}
    },
    
    end: function(){
	this.log(chalk.bold.yellow('MeteorJS Generator complete.'));
    }
    
});

