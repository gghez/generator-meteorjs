module.exports = {
    
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
