var generators = require('yeoman-generator'),
    path = require('path'),
    chalk = require('chalk'),
    fs = require('fs');

var MeteorJSGenerator = generators.Base.extend({

    constructor: function() {
        generators.Base.apply(this, arguments);

        this.conflicter.force = true;
    },

    fail: function(msg) {
        this.env.error(chalk.bold.red(msg));
    },

    step1: function(name, text) {
        logs = [chalk.bold.yellow(name)];
        if (text) logs.push(chalk.bold.white(text));

        this.log.apply(this.log, logs);

    },
    step2: function(name, text) {
        logs = [chalk.bold.yellow('>'), chalk.yellow(name)];
        if (text) logs.push(chalk.bold.white(text));

        this.log.apply(this.log, logs);
    },
    debug: function() {
        if (this.options.debug) {
            this.log.apply(this.log, Array.prototype.map.call(arguments, chalk.cyan));
        }
    }
});

module.exports = MeteorJSGenerator;
