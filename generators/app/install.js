module.exports = function(){
    this.spawnCommand('meteor', ['add'].concat(this.depsToAdd));
    this.spawnCommand('meteor', ['remove'].concat(this.depsToRemove));
};
