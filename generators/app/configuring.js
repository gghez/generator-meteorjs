module.exports = {

    language: function() {
        this.scriptSuffix = '.' + this.should.language;
    },

    styles: function() {
        if (this.should.styles == 'less') {
            this.styleSuffix = '.less';
        } else if (this.should.styles.indexOf('scss')) {
            this.styleSuffix = '.scss'
        } else {
            this.styleSuffix = '.css';
        }
    },

    create: function() {
        this.step2('Run meteor create command.');
        this.spawnCommandSync('meteor', ['create', '.']);
    },

    packages: function() {
        if (!this.options.packages) return;

        this.step2('Create initial user packages.');

        var packages = this.userPackages = (this.options.packages || '').split(',').filter((p) => p.trim());
        packages.forEach((p) => {
            if (this.fs.exists('packages/' + p)) {
                this.log('Package', chalk.green(p), 'already configured.');
            } else {
                this.step2('Configuring package', p);

                this.spawnCommandSync('meteor', ['create', '--package', p]);
            }
        });

    },

    dependencies: function() {
        this.step2('Configure application dependencies.');

        var deps = this.userPackages,
            remove = [];

        if (this.should.language == 'coffee') {
            deps.push('coffeescript');
        }

        if (this.should.remove_defaults.length) {
            remove.push.apply(remove, this.should.remove_defaults);
        }

        if (this.should.styles != '<none>') {
            deps.push(this.should.styles);
        }

        if (this.should.accounts.length) {
            deps.push.apply(deps, this.should.accounts);
        }

        if (this.should.flowrouter) {
            deps.push('kadira:flow-router', 'kadira:blaze-layout');
        }

        if (deps.length) {
            this.spawnCommandSync('meteor', ['add'].concat(deps));
        }

        if (remove.length) {
            this.spawnCommandSync('meteor', ['remove'].concat(remove));
        }
    }

};
