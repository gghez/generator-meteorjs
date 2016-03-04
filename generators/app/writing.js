var _ = require('underscore');

module.exports = {

    init: function(){
	this.step1('Apply templates');
    },

    fix: function(){
	this.step2('Clean default templates');
	
	this.fs.delete('*.html');
	this.fs.delete('*.js');

	if (this.should.styles != '<none>'){
	    this.fs.move(this.appName+'.css', this.appName+'.'+this.should.styles);
	}
    },

    templates: function(){
	this.step2('Create templates');

	var baseReplace = _.assign({}, this);
	
	this.fs.copyTpl(
	    this.templatePath('*.html'),
	    this.destinationPath(),
	    baseReplace);

	this.fs.copyTpl(
	    this.templatePath('index' + this.scriptSuffix),
	    this.destinationPath('index' + this.scriptSuffix),
	    baseReplace);
	
	if (this.options.routing) {
	    this.fs.copyTpl(
		this.templatePath('router' + this.scriptSuffix),
		this.destinationPath('router' + this.scriptSuffix),
		baseReplace);
	}
    }

};
