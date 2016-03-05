var generators = require('yeoman-generator'),
    path = require('path'),
    chalk = require('chalk'),
    fs = require('fs');

var MeteorJSGenerator = generators.Base.extend({

    constructor: function(){
	generators.Base.apply(this, arguments);
	
	this.conflicter.force = true;
    },

    fail: function(msg){
	this.env.error(chalk.bold.red(msg));
    },
    
    step1: function(name, text){
	logs = [chalk.bold.yellow(name)];
	if (text) logs.push(chalk.bold.white(text));

	var displayLength = ((name && name.length) || 0) +
	    ((text && text.length + 1) || 0),
	    underline = chalk.yellow(Array(displayLength+1).join('='));

	this.log();
	this.log.apply(this.log, logs);
	this.log(underline);
	this.log();
    },
    step2: function(name, text){
	logs = [chalk.bold.yellow('>'), chalk.yellow(name)];
	if (text) logs.push(chalk.bold.white(text));

	this.log();
	this.log.apply(this.log, logs);
	this.log();	
    },
    debug: function(){
	if (this.options.debug){
	    this.log.apply(this.log, Array.prototype.map.call(arguments, chalk.cyan));
	}
    }
});

module.exports = MeteorJSGenerator;
