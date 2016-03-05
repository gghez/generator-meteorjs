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

        if (this.should.styles != '<none>') {
            var stylesFile = this.appName + '.css';
            if (this.fs.exists(stylesFile)) {
                this.fs.move(stylesFile, this.appName + this.styleSuffix);
            }
        }
    },

    templates: function() {
        this.step2('Create templates');

        var baseReplace = _.assign({}, this);

        this.fs.copyTpl(
            this.templatePath('*.html'),
            this.destinationPath(),
            baseReplace);

        this.fs.copyTpl(
            this.templatePath(path.join(this.should.language, 'index' + this.scriptSuffix)),
            this.destinationPath('index' + this.scriptSuffix),
            baseReplace);

        if (this.should.flowrouter) {
            this.fs.copyTpl(
                this.templatePath(path.join(this.should.language, 'router' + this.scriptSuffix)),
                this.destinationPath('router' + this.scriptSuffix),
                baseReplace);
        }
    }

};
