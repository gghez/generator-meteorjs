var _ = require('underscore');

module.exports = {

    noob: function(){
	this.questions.push({
	    type: 'checkbox',
	    name: 'remove_defaults',
	    message: 'Remove default packages',
	    choices:[
		{name: 'insecure', checked:true},
		{name: 'autopublish', checked: true}
	    ],
	    store: true
	});
    },

    accounts: function(){
	this.questions.push({
	    type: 'checkbox',
	    name: 'accounts',
	    message: 'Accounts related packages',
	    choices:[
		{name: 'accounts-password', checked: true},
		{name: 'accounts-facebook'},
		{name: 'accounts-twitter'},
		{name: 'accounts-google'},
		{name: 'accounts-ui', checked: true}
	    ],
	    store: true
	});
    },

    styles: function(){
	this.questions.push({
	    type: 'list',
	    name: 'styles',
	    message: 'HTML Styles generator',
	    choices:['less', 'fourseven:scss', '<none>'],
	    default: 'less',
	    store: true
	});
    },

    router: function(){
	this.questions.push({
	    type    : 'confirm',
	    name    : 'flowrouter',
	    message : 'Add application router (kadira:flowrouter)',
	    default : true,
	    store: true
	});
    },
    
    ask: function(){
	var done = this.async();
	this.prompt(this.questions, (answers) => {
	    this.debug('Answers:', JSON.stringify(answers));		
	    _.assign(this.should, answers);
	    done();
	});
    }

};
