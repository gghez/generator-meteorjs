

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

	var baseReplace = {
	    appName: this.appName
	}
	
	this.fs.copyTpl(
	    this.templatePath('index.html'),
	    this.destinationPath('index.html'),
	    baseReplace);

	if (this.options.coffee){
	    this.fs.copyTpl(
		this.templatePath('index.coffee'),
		this.destinationPath('index.coffee'),
		baseReplace);
	}else{
	    this.fs.copyTpl(
		this.templatePath('index.js'),
		this.destinationPath('index.js'),
		baseReplace);
	}
	
    }

};
