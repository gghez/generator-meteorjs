var generators = require('yeoman-generator'),
    ejs = require('ejs');

module.exports = generators.Base.extend({

    constructor: function(){
	generators.Base.apply(this, arguments);

	this.argument('path', {required: true, desc: 'The route path.'});

	this.option('collection', {required: false, desc: 'Collection to use inside route template.'});

	if (!this.fs.exists(this.destinationPath('router' + this.scriptSuffix))){
	    this.fail('No router script found. Depending on language support, you should have a "router.js" or "router.coffee" script at your projet root.');
	}
    },

    writing: function(){
	var routeTemplate = this.fs.read(this.templatePath('route' + this.scriptSuffix));
	var routeScript = ejs.render(routeTemplate, this);

	var routerScript = this.fs.read(this.destinationPath('router' + this.scriptSuffix));
	routerScript += '\n' + routeScript + '\n';
	this.fs.write(this.destinationPath('router' + this.scriptSuffix), routerScript);
    }
    
});
