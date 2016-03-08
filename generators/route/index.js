var generators = require('yeoman-generator'),
    ejs = require('ejs'),
    _ = require('lodash'),
    MeteorJSGenerator = require('../generator-base');

module.exports = MeteorJSGenerator.extend({

    constructor: function() {
        MeteorJSGenerator.apply(this, arguments);

        this.argument('path', { required: true, desc: 'The route path.' });

        this.option('collection', { required: false, desc: 'Collection to use inside route template.' });
        this.option('template', { required: false, desc: 'Template name associated to route.' });
    },

    initializing: function() {
        if (this.fs.exists('router.js')) {
            this.language = 'js';
        } else if (this.fs.exists('router.coffee')) {
            this.language = 'coffee';
        } else {
            this.fail('No router script found. Depending on language support, you should have a "router.js" or "router.coffee" script at your projet root.');
        }

        this.scriptSuffix = `.${this.language}`;
        this.routerScript = `router${this.scriptSuffix}`;

        var templateFromPath = this.path && _.find(this.path.split('/'), p => p && p[0] != ':');
        this.template = this.options.template || templateFromPath || '';
        this.collection = this.options.collection || templateFromPath;
        this.collectionVar = _.capitalize(this.collection);
        this.hasParams = _.some(this.path.split('/'), p => p && p[0] == ':');
        this.single = _.some(this.path.split('/'), p => p && p[0] == ':' && _.endsWith(_.lowerCase(p), 'id'));

        if (!this.template) {
            this.fail('You must either select a non root path or specify a template name with --template option.');
        }
    },

    writing: {

        collection: function() {
            var collectionScript = '',
                collectionFile = `collections${this.scriptSuffix}`;

            if (this.fs.exists(collectionFile)) {
                collectionScript = this.fs.read(collectionFile);
            }

            var collectionDefined = false;
            if ((this.language == 'js' && collectionScript.indexOf(`${this.collectionVar} = new Mongo.Collection('${this.collection}');`) != -1) ||
                (this.language == 'coffee' && collectionScript.indexOf(`@${this.collectionVar} = new Mongo.Collection '${this.collection}'`) != -1)) {
                collectionDefined = true;
            }

            if (!collectionDefined) {
                collectionScript += '\n';
                if (this.language == 'js') {
                    collectionScript += `${this.collectionVar} = new Mongo.Collection('${this.collection}');`;
                } else if (this.language == 'coffee') {
                    collectionScript += `@${this.collectionVar} = new Mongo.Collection '${this.collection}'`;
                }
                collectionScript += '\n';

                this.fs.write(collectionFile, collectionScript);
            }
        },

        // Add route entry point
        router: function() {
            var routeTemplate = this.fs.read(this.templatePath(`${this.language}/route-path${this.scriptSuffix}`));
                routeScript = ejs.render(routeTemplate, this, {debug: false}),
                routerScriptContent = this.fs.exists(this.routerScript) ? this.fs.read(this.routerScript) : '';

            if (routerScriptContent.indexOf(routeScript) >= 0) {
                this.log('Route path already defined.');
            } else {
                routerScriptContent += '\n' + routeScript;
                this.fs.write(this.destinationPath(this.routerScript), routerScriptContent);
            }
        },

        // Build route template
        template: function() {
            var htmlTemplate = `client/templates/${this.template}.html`;
            if (this.fs.exists(htmlTemplate)) {
                this.log('Route template already defined.');
            } else {
                this.fs.copyTpl(
                    this.templatePath('route-template.html'),
                    this.destinationPath(htmlTemplate),
                    this);
            }

            var scriptTemplate = `client/templates/${this.template}${this.scriptSuffix}`;
            if (this.fs.exists(scriptTemplate)) {
                this.log('Route template script already defined.');
            } else {
                this.fs.copyTpl(
                    this.templatePath(`${this.language}/route-template${this.scriptSuffix}`),
                    this.destinationPath(scriptTemplate),
                    this);
            }
        }

    }

});
