var generators = require('yeoman-generator'),
    fs = require('fs'),
    Promise = require('bluebird');

module.exports = generators.Base.extend({
    constructor: function(){
	generators.Base.apply(this, arguments);

	console.log('.ctor', arguments);
	
	//this.option('coffee');
    },
    client: function(){
	console.log('::client()');
	
    },
    server: function(){
	console.log('::server()');
    }
});

