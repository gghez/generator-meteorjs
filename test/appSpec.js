var helpers = require('yeoman-test'),
    assert = require('yeoman-assert'),
    path = require('path'),
    chai = require('chai'),
    fs = require('fs');


describe('yo meteorjs', () => {

    describe('--packages', () => {
        var generator;

        before((done) => {
            helpers.run(path.join(__dirname, '../generators/app'))
                .withOptions({
                    packages: 'reader,core',
                })
                .withPrompts({
                    flowrouter: false,
                    remove_defaults: [],
                    styles: '<none>',
                    accounts: [],
                    language: 'js'
                })
                .on('ready', (_) => generator = _)
                .on('end', done);
        });

        it('Packages file structure', () => {
            assert.file('packages/reader/package.js');
            assert.file('packages/core/package.js');
        });

        it('Application reference user packages', () => {
            var content = fs.readFileSync('.meteor/packages').toString();

            chai.assert.include(content, 'reader\n');
            chai.assert.include(content, 'core\n');
        });
    });

    describe('--<question_override>', () => {
        before((done) => {
            helpers.run(path.join(__dirname, '../generators/app'))
                .withOptions({
                    coffee: true,
                    styles: 'less',
                    secure: true,
                    router: true
                })
                .withPrompts({
                    flowrouter: false,
                    remove_defaults: [],
                    styles: '<none>',
                    accounts: [],
                    language: 'js'
                })
                .on('end', done);
        });

        it('--coffee', () => {
            var content = fs.readFileSync('.meteor/packages').toString();
            chai.assert.include(content, 'coffeescript\n');

            assert.file('client/index.coffee');
            assert.noFile('client/index.js');
        });

        it('--styles less', () => {
            var content = fs.readFileSync('.meteor/packages').toString();
            chai.assert.include(content, 'less\n');

            var projectName = process.cwd().split(path.sep).pop();
            assert.file(`client/${projectName}.less`);

            assert.noFile(projectName + '.css');

        });

        it('--router', () => {
            var content = fs.readFileSync('.meteor/packages').toString();
            chai.assert.include(content, 'kadira:flow-router\n');
            chai.assert.include(content, 'kadira:blaze-layout\n');

            assert.file('router.coffee');
        });

        it('--secure', () => {
            var content = fs.readFileSync('.meteor/packages').toString();
            chai.assert.notInclude(content, 'insecure\n');
            chai.assert.notInclude(content, 'autopublish\n');
        });

    });

    describe('default install', () => {

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
                'client/layout.html',
                'client/index.js',
                'router.js',
                '.meteor'
            ]);
        };

        var shouldExcludeFiles = () => {
            assert.noFile([
                'client/index.coffee',
                'client/*.css',
                '*.css',
                'router.coffee',
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
                assert.file(`client/${projectName}.less`);
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

            it('file structure does include', () => {
                shouldIncludeFiles();
                assert.file('client/aproject.less');
            });

            it('file structure does not include', shouldExcludeFiles);

            it('Meteor dependencies', checkMeteorDependencies);

        });
    });

});
