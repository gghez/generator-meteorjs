var generators = require('yeoman-generator'),
    fs = require('fs'),
    Promise = require('bluebird'),
    fsAsync = Promise.promisifyAll(fs),
    path = require('path'),
    chalk = require('chalk'),
    _ = require('underscore');

module.exports = generators.Base.extend({
    
    constructor: function(){
	generators.Base.apply(this, arguments);

	this.argument('name', {desc: 'Application or package name.', required: false, type: String});

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
	    this.env.error(chalk.bold.red('Cannot configure a Meteor application inside a package directory.'));
	}

	if ((!this.name && fs.existsSync('.meteor')) || (this.name && fs.existsSync(path.join(this.name, '.meteor')))){
	    this.env.error(chalk.bold.red('Cannot configure a Meteor application inside another.'));
	}
    },

    prompting: {

	noob: function(){
	    this.questions.push({
		type: 'checkbox',
		name: 'remove_defaults',
		message: 'Remove default packages',
		choices:[
		    {name: 'insecure', checked:true},
		    {name: 'autopublish', checked: true}
		]
	    });
	},

	accounts: function(){
	    this.questions.push({
		type: 'checkbox',
		name: 'accounts',
		message: 'Accounts related packages',
		choices:[
		    {name: 'accounts-password', checked: true},
		    {name: 'accounts-facebook'},
		    {name: 'accounts-twitter'},
		    {name: 'accounts-google'},
		    {name: 'accounts-ui', checked: true}
		]
	    });
	},

	styles: function(){
	    this.questions.push({
		type: 'list',
		name: 'styles',
		message: 'HTML Styles generator',
		choices:['less', 'fourseven:scss', '<none>'],
		default: 'less'
	    });
	},

	router: function(){
	    this.questions.push({
		type    : 'confirm',
		name    : 'flowrouter',
		message : 'Add FlowRouter as application router (kadira:flowrouter)',
		default : true
	    });
	},
	
	ask: function(){
	    var done = this.async();
	    this.prompt(this.questions, (answers) => {
		if (this.options.verbose){
		    this.log(chalk.cyan('Answers:'), JSON.stringify(answers));
		}
		
		_.assign(this.should, answers);
		done();
	    });
	}
    },
    
    configuring: {
	
	app: function(){
	    this.log(chalk.bold.yellow('Configuring application:'), chalk.bold.white(this.appName));		
	    this.spawnCommandSync('meteor', ['create', this.name || '.']);
	},
	
	packages: function(){
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
	    
	},

	scripting: function(){
	    if (this.options.coffee){
		this.log(chalk.bold.yellow('CoffeeScript support'));
		this.spawnCommandSync('meteor', ['add', 'coffeescript']);
	    }
	},

	remove_defaults: function(){
	    if (this.should.remove_defaults.length){
		this.log(chalk.bold.yellow('Remove defaults'));
		this.spawnCommandSync('meteor', ['remove'].concat(this.should.remove_defaults));
	    }
	},

	styles: function(){
	    switch (this.should.styles){
	    case '<none>':
		break;
	    default:
		this.log(chalk.bold.yellow('Application styles generator:'), chalk.bold.white(this.should.styles));
		this.spawnCommandSync('meteor', ['add', this.should.styles]);
		break;
	    }
	},

	accounts: function(){
	    if (this.should.accounts.length){
		this.log(chalk.bold.yellow('Accounts configuration'));
		this.spawnCommandSync('meteor', ['add'].concat(this.should.accounts));
	    }	    
	},

	router: function(){
	    if (this.should.flowrouter){
		this.log(chalk.bold.yellow('Router configuration'));
		this.spawnCommandSync('meteor', ['add', 'kadira:flow-router', 'kadira:blaze-layout']);
	    }
	}
    },
    
    end: function(){
	this.log(chalk.bold.yellow('MeteorJS Generator complete.'));
    }
    
});

