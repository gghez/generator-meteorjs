var generators = require('yeoman-generator'),
    ejs = require('ejs'),
    _ = require('lodash'),
    MeteorJSGenerator = require('../generator-base');

module.exports = MeteorJSGenerator.extend({

    constructor: function() {
        MeteorJSGenerator.apply(this, arguments);

        this.argument('name', { required: true, desc: 'The collection name.' });

        this.option('sample', { required: false, desc: 'Auto-fill collection with sample data when empty.' });
        this.option('crud', { required: false, desc: 'Create methods for CRUD operations.' });
    },

    initializing: function() {

    },

    writing: {

        collection: function() {

        },

        sample: function() {
            if (!this.options.sample) return;

        }

    }

});
