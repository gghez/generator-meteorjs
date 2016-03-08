var helpers = require('yeoman-test'),
    assert = require('yeoman-assert'),
    path = require('path'),
    chai = require('chai'),
    fs = require('fs-extra');

describe('yo meteorjs:route', () => {
    var appDir = null;

    before((done) => {
        helpers.run(path.join(__dirname, '../generators/app'))
            .inTmpDir((dir) => appDir = dir)
            .withPrompts({
                flowrouter: true,
                remove_defaults: [],
                styles: '<none>',
                accounts: [],
                language: 'js'
            })
            .on('end', done);
    });

    it('default parameters', (done) => {
        helpers.run(path.join(__dirname, '../generators/route'))
            .inTmpDir((dir) => {
                fs.copySync(appDir, dir);
            })
            .withArguments('/posts')
            .on('end', () => {

                assert.fileContent(
                    'router.js',
                    readFixture('router-no-params.js'));

                assert.fileContent(
                    'client/templates/posts.html',
                    readFixture('posts.html'));

                assert.fileContent(
                    'client/templates/posts.js',
                    readFixture('posts-no-params.js'));

                assert.fileContent(
                    'collections.js',
                    'Posts = new Mongo.Collection(\'posts\');');

                done();
            });
    });

    it('--collection', (done) => {
        helpers.run(path.join(__dirname, '../generators/route'))
            .inTmpDir((dir) => {
                fs.copySync(appDir, dir);
            })
            .withArguments('/posts')
            .withOptions({ collection: 'theposts' })
            .on('end', () => {

                assert.fileContent(
                    'router.js',
                    readFixture('router-no-params.js'));

                assert.fileContent(
                    'client/templates/posts.html',
                    readFixture('posts.html'));

                assert.fileContent(
                    'client/templates/posts.js',
                    readFixture('posts-no-params-collection.js'));

                assert.fileContent(
                    'collections.js',
                    'Theposts = new Mongo.Collection(\'theposts\');');

                done();
            });
    });

    it('--template', (done) => {
        helpers.run(path.join(__dirname, '../generators/route'))
            .inTmpDir((dir) => {
                fs.copySync(appDir, dir);
            })
            .withArguments('/posts')
            .withOptions({ template: 'postList' })
            .on('end', () => {

                assert.fileContent(
                    'router.js',
                    readFixture('router-no-params-template.js'));

                assert.fileContent(
                    'client/templates/postList.html',
                    readFixture('posts-template.html'));

                assert.fileContent(
                    'client/templates/postList.js',
                    readFixture('posts-no-params-template.js'));

                assert.fileContent(
                    'collections.js',
                    'Posts = new Mongo.Collection(\'posts\');');

                done();
            });
    });

    it('parameterized /path', (done) => {
        helpers.run(path.join(__dirname, '../generators/route'))
            .inTmpDir((dir) => {
                fs.copySync(appDir, dir);
            })
            .withArguments('/posts/:postId')
            .on('end', () => {

                assert.fileContent(
                    'router.js',
                    readFixture('router-with-params.js'));

                assert.fileContent(
                    'client/templates/posts.html',
                    readFixture('posts.html'));

                assert.fileContent(
                    'client/templates/posts.js',
                    readFixture('posts-with-params.js'));

                assert.fileContent(
                    'collections.js',
                    'Posts = new Mongo.Collection(\'posts\');');

                done();
            });
    });
});
