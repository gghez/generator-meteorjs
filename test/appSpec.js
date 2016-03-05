var helpers = require('yeoman-test'),
    assert = require('yeoman-assert'),
    path = require('path'),
    chai = require('chai'),
    fs = require('fs');


describe('Application generator tests', () => {

    it('--coffee option override question', (done) => {
        helpers.run(path.join(__dirname, '../generators/app'))
            .withOptions({ coffee: true })
            .withPrompts({
                flowrouter: false,
                remove_defaults: [],
                styles: '<none>',
                accounts: [],
                language: 'js'
            })
            .on('end', () => {
                var content = fs.readFileSync('.meteor/packages').toString();
                chai.assert.include(content, 'coffeescript\n');

                assert.file('index.coffee');
                assert.noFile('index.fs');

                done();
            });
    });

    describe('Default install', () => {

        var checkMeteorDependencies = () => {
            var content = fs.readFileSync('.meteor/packages').toString();

            chai.assert.include(content, 'kadira:flow-router\n');
            chai.assert.include(content, 'kadira:blaze-layout\n');
            chai.assert.include(content, 'accounts-password\n');
            chai.assert.include(content, 'accounts-ui\n');
            chai.assert.include(content, 'less\n');

            chai.assert.notInclude(content, 'insecure\n');
            chai.assert.notInclude(content, 'autopublish\n');
            chai.assert.notInclude(content, 'coffeescript\n');
        };

        var shouldIncludeFiles = () => {
            assert.file([
                'index.js',
                'router.js',
                'layout.html',
                '.meteor'
            ]);
        };

        var shouldExcludeFiles = () => {
            assert.noFile([
                'index.coffee',
                'styles.css',
                'router.coffee',
                'client',
                'packages'
            ]);
        };

        describe('without name argument', () => {
            before((done) => {
                helpers.run(path.join(__dirname, '../generators/app'))
                    .withPrompts({
                        flowrouter: true,
                        remove_defaults: ['insecure', 'autopublish'],
                        styles: 'less',
                        accounts: ['accounts-password', 'accounts-ui'],
                        language: 'js'
                    })
                    .on('end', done);
            });

            it('Project file structure does include', () => {
                shouldIncludeFiles();

                var projectName = process.cwd().split(path.sep).pop();
                assert.file(projectName + '.less');
            });

            it('Project file structure does not include', shouldExcludeFiles);

            it('Meteor dependencies', checkMeteorDependencies);
        });

        describe('with name argument', () => {
            before((done) => {
                helpers.run(path.join(__dirname, '../generators/app'))
                    .withArguments('aproject')
                    .withPrompts({
                        flowrouter: true,
                        remove_defaults: ['insecure', 'autopublish'],
                        styles: 'less',
                        accounts: ['accounts-password', 'accounts-ui'],
                        language: 'js'
                    })
                    .on('end', done);
            });

            it('Project file structure does include', () => {
                shouldIncludeFiles();
                assert.file('aproject.less');
            });

            it('Project file structure does not include', shouldExcludeFiles);

            it('Meteor dependencies', checkMeteorDependencies);
        });
    });

});
