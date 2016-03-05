module.exports = {
    app: function(){
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
		
		this.spawnCommand('meteor', ['create', '--package', p]);
	    }
	});
	
    },
    
    dependencies: function(){	
	this.spawnCommand('meteor', ['add'].concat(this.depsToAdd));
	this.spawnCommand('meteor', ['remove'].concat(this.depsToRemove));
    }
};
