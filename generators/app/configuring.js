module.exports = {
    
    app: function(){
	this.step1('Configuring application', this.appName);
	this.spawnCommandSync('meteor', ['create', '.']);
    },
    
    packages: function(){
	if (!this.options.packages) return;

	var packages = (this.options.packages || '').split(',').filter((p) => p.trim());
	packages.forEach((p) => {
	    if (this.fs.exists('packages/' + p)){
		this.log('Package', chalk.green(p), 'already configured.');
	    } else {
		this.step2('Configuring package', p);
		
		this.spawnCommandSync('meteor', ['create', '--package', p]);
	    }
	});
	
    },

    dependencies: function(){
	this.step1('Configure application dependencies');
	
	var deps = [], remove = [];

	if (this.options.coffee) deps.push('coffeescript');

	if (this.should.remove_defaults.length)
	    remove.push.apply(remove, this.should.remove_defaults);

	if (this.should.styles != '<none>')
	    deps.push(this.should.styles);

	if (this.should.accounts.length)
	    deps.push.apply(deps, this.should.accounts);

	if (this.should.flowrouter)
	    deps.push('kadira:flow-router', 'kadira:blaze-layout');

	this.depsToAdd = deps;
	this.depsToRemove = remove;
    }

};
