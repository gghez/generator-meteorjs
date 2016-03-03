var fs = require('fs');

module.exports = {
    
    app: function(){
	this.step1('Configuring application', this.appName);
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
		this.step2('Configuring package', p);
		
		this.spawnCommandSync('meteor', ['create', '--package', p]);
	    }
	});
	
    },

    scripting: function(){
	if (this.options.coffee){
	    this.step1('CoffeeScript support');
	    this.spawnCommandSync('meteor', ['add', 'coffeescript']);
	}
    },

    remove_defaults: function(){
	if (this.should.remove_defaults.length){
	    this.step1('Remove default packages');
	    this.spawnCommandSync('meteor', ['remove'].concat(this.should.remove_defaults));
	}
    },

    styles: function(){
	switch (this.should.styles){
	case '<none>':
	    break;
	default:
	    this.step1('Application styles generator is', this.should.styles);
	    this.spawnCommandSync('meteor', ['add', this.should.styles]);
	    break;
	}
    },

    accounts: function(){
	if (this.should.accounts.length){
	    this.step1('Accounts configuration');
	    this.spawnCommandSync('meteor', ['add'].concat(this.should.accounts));
	}	    
    },

    router: function(){
	if (this.should.flowrouter){
	    this.step1('Router configuration');
	    this.spawnCommandSync('meteor', ['add', 'kadira:flow-router', 'kadira:blaze-layout']);
	}
    }
};
