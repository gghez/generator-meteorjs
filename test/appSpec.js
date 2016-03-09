var helpers = require('yeoman-test'),
    assert = require('yeoman-assert'),
    path = require('path'),
    chai = require('chai'),
    fs = require('fs');

describe('yo meteorjs', () => {

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

        it('User packages are generated', () => {
            // No need to check more than file existance,
            // content obviously relies on meteor cli version.
            assert.file(path.join('packages', 'reader', 'package.js'));
            assert.file(path.join('packages', 'core', 'package.js'));
        });

        it('Application should reference user packages', () => {
            assert.fileContent(path.join('.meteor', 'packages'), 'reader\n');
            assert.fileContent(path.join('.meteor', 'packages'), 'core\n');
        });

    });

    describe('Command line -- options', () => {

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
            assert.fileContent(path.join('.meteor', 'packages'), 'coffeescript\n');

            assert.file(path.join('client', 'index.coffee'));
            assert.noFile(path.join('client', 'index.js'));
        });

        it('--styles less', () => {
            assert.fileContent(path.join('.meteor', 'packages'), 'less\n');

            var projectName = process.cwd().split(path.sep).pop();
            assert.file(path.join('client', `${projectName}.less`));

            assert.noFile(`${projectName}.css`);
            assert.noFile(path.join('client', `${projectName}.css`));

        });

        it('--router', () => {
            assert.fileContent(path.join('.meteor', 'packages'), 'kadira:flow-router\n');
            assert.fileContent(path.join('.meteor', 'packages'), 'kadira:blaze-layout\n');

            assert.fileContent(
                'router.coffee',
                readFixture(path.join('coffee', 'router-default.coffee')));
        });

        it('--secure', () => {
            assert.noFileContent(path.join('.meteor', 'packages'), 'insecure\n');
            assert.noFileContent(path.join('.meteor', 'packages'), 'autopublish\n');
        });

    });

    describe('Generated content (config #1)', () => {

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

        it('Meteor dependencies', () => {
            assert.fileContent(path.join('.meteor', 'packages'), 'kadira:flow-router\n');
            assert.fileContent(path.join('.meteor', 'packages'), 'kadira:blaze-layout\n');
            assert.fileContent(path.join('.meteor', 'packages'), 'accounts-password\n');
            assert.fileContent(path.join('.meteor', 'packages'), 'accounts-ui\n');
            assert.fileContent(path.join('.meteor', 'packages'), 'less\n');

            assert.noFileContent(path.join('.meteor', 'packages'), /\binsecure\b/);
            assert.noFileContent(path.join('.meteor', 'packages'), /\autopublish\b/);
            assert.noFileContent(path.join('.meteor', 'packages'), 'coffeescript\n');
        });

        it('client/<project>.less', () => {
            var projectName = process.cwd().split(path.sep).pop();
            assert.file(path.join('client', `${projectName}.less`));
        });

        it('client/layout.html', () => {
            assert.fileContent(
                path.join('client', 'layout.html'),
                readFixture('layout-accounts-ui.html'));
        });

        it('client/index.js', () => {
            assert.fileContent(
                path.join('client', 'index.js'),
                readFixture(path.join('js', 'client-index.js')));
        });

        it('router.js', () => {
            assert.fileContent(
                'router.js',
                readFixture(path.join('js', 'router-default.js')));
        });

        it('.travis.yml', () => {
            assert.fileContent(
                '.travis.yml',
                readFixture('.travis.yml'));
        });
    });

    describe('Generated content (config #2)', () => {

        before((done)=> {
            helpers.run(path.join(__dirname, '..', 'generators', 'app'))
                .withArguments('aproject')
                .withPrompts({
                    flowrouter: false,
                    remove_defaults: [],
                    styles: '<none>',
                    accounts: [],
                    language: 'coffee'
                })
                .on('end', done);
        });

        it('Current directory has provided name argument', ()=> {
            chai.assert.equal(process.cwd().split(path.sep).pop(), 'aproject');
        });

        it('CSS file is composed with project name', () => {
            assert.file(path.join('client', 'aproject.css'));
        });

        it('No accounts-ui main layout', () => {
            assert.fileContent(
                path.join('client', 'layout.html'),
                readFixture('layout-no-accounts-ui.html'));
        });

        it('Meteor dependencies', () => {
            assert.noFileContent(path.join('.meteor', 'packages'), 'kadira:flow-router\n');
            assert.noFileContent(path.join('.meteor', 'packages'), 'kadira:blaze-layout\n');
            assert.noFileContent(path.join('.meteor', 'packages'), 'accounts-password\n');
            assert.noFileContent(path.join('.meteor', 'packages'), 'accounts-ui\n');
            assert.noFileContent(path.join('.meteor', 'packages'), 'less\n');

            assert.fileContent(path.join('.meteor', 'packages'), /\binsecure\b/);
            assert.fileContent(path.join('.meteor', 'packages'), /\bautopublish\b/);
            assert.fileContent(path.join('.meteor', 'packages'), 'coffeescript\n');
        });

        it('client/index.coffee', () => {
            assert.fileContent(
                path.join('client', 'index.coffee'),
                readFixture(path.join('coffee', 'client-index.coffee')));
        });

        it('router.coffee should not exist', () => {
            assert.noFile('router.coffee');
        });

        it('.travis.yml', () => {
            assert.fileContent(
                '.travis.yml',
                readFixture('.travis.yml'));
        });
    });


});
