var generators = require('yeoman-generator'),
    ejs = require('ejs'),
    _ = require('underscore'),
    MeteorJSGenerator = require('../generator-base');

module.exports = MeteorJSGenerator.extend({

    constructor: function(){
	generators.Base.apply(this, arguments);

	this.argument('path', {required: true, desc: 'The route path.'});

	this.option('collection', {required: false, desc: 'Collection to use inside route template.'});
	this.option('template', {required: false, desc: 'Template name associated to route.'});

	if (this.fs.exists('router.js')){
	    this.scriptSuffix = '.js';
	}else if (this.fs.exists('router.coffee')) {
	    this.scriptSuffix = '.coffee';
	}else{
	    this.fail('No router script found. Depending on language support, you should have a "router.js" or "router.coffee" script at your projet root.');
	}

	this._routerScript = 'router' + this.scriptSuffix;
    },

    initializing: function(){
	var templateFromPath = this.path && _.find(this.path.split('/'), (p) => p && p[0] != ':');
	this.template = this.options.template || templateFromPath || '';
    },
    
    writing: function(){
	var routeTemplate = this.fs.read(this.templatePath('route' + this.scriptSuffix));
	var routeScript = ejs.render(routeTemplate, this);

	var routerScript = this.fs.exists(this._routerScript) ? this.fs.read(this._routerScript) : '';
	
	routerScript += '\n' + routeScript + '\n';
	this.fs.write(this.destinationPath('router' + this.scriptSuffix), routerScript);
    }
    
});
