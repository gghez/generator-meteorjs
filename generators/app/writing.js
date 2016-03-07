var _ = require('underscore'),
    path = require('path');

module.exports = {

    init: function() {
        this.step1('Apply templates');
    },

    fix: function() {
        this.step2('Clean default templates');

        this.fs.delete('*.html');
        this.fs.delete('*.js');
    },

    styles: function() {
        this.step2('Create style files');

        var defaultStylesFile = `${this.appName}.css`;

        if (this.should.styles == '<none>') {
            this.fs.delete(defaultStylesFile);
        } else {
            this.fs.move(defaultStylesFile, `client/${this.appName + this.styleSuffix}`);
        }
    },

    templates: function() {
        this.step2('Create templates');

        // HTML templates
        this.fs.copyTpl(
            this.templatePath('*.html'),
            this.destinationPath('client/'),
            this);

        // Scripting templates
        this.fs.copyTpl(
            this.templatePath(path.join(this.should.language, `index${this.scriptSuffix}`)),
            this.destinationPath(path.join('client', `index${this.scriptSuffix}`)),
            this);

        // Router support
        if (this.should.flowrouter) {
            this.fs.copyTpl(
                this.templatePath(path.join(this.should.language, `router${this.scriptSuffix}`)),
                this.destinationPath(`router${this.scriptSuffix}`),
                this);
        }

        // .travis.yml
        if (!this.fs.exists('.travis.yml')) {
            this.fs.copy(
                this.templatePath('.travis.yml'),
                this.destinationPath('.travis.yml'));
        }
    }

};
