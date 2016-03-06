var _ = require('underscore');

module.exports = {

    language: function() {
        this.questions.push({
            type: 'list',
            name: 'language',
            message: 'Scripting language',
            choices: [
                { name: 'js', short: 'Javascript', checked: true },
                { name: 'coffee', short: 'CoffeeScript' }
            ],
            store: true,
            when: !this.options.coffee
        });
    },

    secure: function() {
        this.questions.push({
            type: 'checkbox',
            name: 'remove_defaults',
            message: 'Remove default packages',
            choices: [
                { name: 'insecure', checked: true },
                { name: 'autopublish', checked: true }
            ],
            store: true,
            when: !this.options.secure
        });
    },

    accounts: function() {
        this.questions.push({
            type: 'checkbox',
            name: 'accounts',
            message: 'Accounts related packages',
            choices: [
                { name: 'accounts-password', checked: true },
                { name: 'accounts-facebook' },
                { name: 'accounts-twitter' },
                { name: 'accounts-google' },
                { name: 'accounts-ui', checked: true }
            ],
            store: true
        });
    },

    styles: function() {
        this.questions.push({
            type: 'list',
            name: 'styles',
            message: 'HTML Styles generator',
            choices: ['less', 'fourseven:scss', '<none>'],
            default: 'less',
            store: true,
            when: !this.options.styles
        });
    },

    router: function() {
        this.questions.push({
            type: 'confirm',
            name: 'flowrouter',
            message: 'Add application router (kadira:flowrouter)',
            default: true,
            store: true,
            when: !this.options.router
        });
    },

    ask: function() {
        var done = this.async();
        this.prompt(this.questions, (answers) => {
            this.debug('Answers:', JSON.stringify(answers));
            _.assign(this.should, answers);

            if (this.options.coffee) {
                this.should.language = 'coffee';
            }

            if (this.options.secure) {
                this.should.remove_defaults = ['insecure', 'autopublish'];
            }

            if (this.options.styles) {
                this.should.styles = this.options.styles;
            }

            if (this.options.router) {
                this.should.flowrouter = true;
            }

            done();
        });
    }

};
