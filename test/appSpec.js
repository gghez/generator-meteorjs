var helpers = require('yeoman-test'),
    assert = require('yeoman-assert'),
    path = require('path'),
    chai = require('chai'),
    fs = require('fs');

describe.only('yo meteorjs', () => {

    describe('--packages', () => {

        before((done) => {
            helpers.run(path.join(__dirname, '..', 'generators', 'app'))
                .withOptions({
                    packages: 'reader,core'
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
            helpers.run(path.join(__dirname, '..', 'generators', 'app'))
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
            assert.fileContent('.meteor/packages', 'coffeescript\n');

            assert.file('client/index.coffee');
            assert.noFile('client/index.js');
        });

        it('--styles less', () => {
            assert.fileContent('.meteor/packages', 'less\n');

            var projectName = process.cwd().split(path.sep).pop();
            assert.file(`client/${projectName}.less`);

            assert.noFile(`${projectName}.css`);
            assert.noFile(`client/${projectName}.css`);

        });

        it('--router', () => {
            assert.fileContent('.meteor/packages', 'kadira:flow-router\n');
            assert.fileContent('.meteor/packages', 'kadira:blaze-layout\n');

            assert.fileContent(
                'router.coffee',
                readFixture('coffee/router-default.coffee'));
        });

        it('--secure', () => {
            assert.noFileContent('.meteor/packages', 'insecure\n');
            assert.noFileContent('.meteor/packages', 'autopublish\n');
        });

    });

    describe('Generated content', () => {

        before((done) => {
            helpers.run(path.join(__dirname, '..', 'generators', 'app'))
                .withPrompts({
                    flowrouter: true,
                    remove_defaults: ['insecure', 'autopublish'],
                    styles: 'less',
                    accounts: ['accounts-password', 'accounts-ui'],
                    language: 'js'
                })
                .on('end', done);
        });

        it('client/<project>.less', () => {
            var projectName = process.cwd().split(path.sep).pop();
            assert.file(`client/${projectName}.less`);
        });

        it('Meteor dependencies', () => {
            assert.fileContent('.meteor/packages', 'kadira:flow-router\n');
            assert.fileContent('.meteor/packages', 'kadira:blaze-layout\n');
            assert.fileContent('.meteor/packages', 'accounts-password\n');
            assert.fileContent('.meteor/packages', 'accounts-ui\n');
            assert.fileContent('.meteor/packages', 'less\n');

            assert.noFileContent('.meteor/packages', 'insecure\n');
            assert.noFileContent('.meteor/packages', 'autopublish\n');
            assert.noFileContent('.meteor/packages', 'coffeescript\n');
        });

        it('client/layout.html', () => {
            assert.fileContent(
                'client/layout.html',
                readFixture('layout-accounts-ui.html'));
        });

        it('client/index.js', () => {
            assert.fileContent(
                'client/index.js',
                readFixture('js/client-index.js'));
        });

        it('router.js', () => {
            assert.fileContent(
                'router.js',
                readFixture('js/router-default.js'));
        });

        it('.travis.yml', () => {
            assert.fileContent(
                '.travis.yml',
                readFixture('.travis.yml'));
        });

        it('with name argument', (done) => {
            helpers.run(path.join(__dirname, '..', 'generators', 'app'))
                .withArguments('aproject')
                .withPrompts({
                    flowrouter: true,
                    remove_defaults: [],
                    styles: '<none>',
                    accounts: [],
                    language: 'js'
                })
                .on('end', () => {
                    // Current directory name is name argument
                    chai.assert.equal(process.cwd().split(path.sep).pop(), 'aproject');

                    // Default stylesheet is moved to client/ subfolder
                    assert.file('client/aproject.css');

                    done();
                });
        });

        it('No accounts-ui main layout', (done) => {
            helpers.run(path.join(__dirname, '..', 'generators', 'app'))
                .withPrompts({
                    flowrouter: false,
                    remove_defaults: [],
                    styles: '<none>',
                    accounts: [],
                    language: 'js'
                })
                .on('end', () => {
                    assert.fileContent(
                        'client/layout.html',
                        readFixture('layout-no-accounts-ui.html'));

                    done();
                });
        });

    });

});
