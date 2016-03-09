var helpers = require('yeoman-test'),
    assert = require('yeoman-assert'),
    path = require('path'),
    chai = require('chai'),
    fs = require('fs-extra'),
    _ = require('lodash');

describe('yo meteorjs:route', () => {
    _.each(['js'], (lng) => {
        describe(`(language: ${lng})`, () => {
            var appDir = null;

            before((done) => {
                helpers.run(path.join(__dirname, '../generators/app'))
                    .inTmpDir((dir) => appDir = dir)
                    .withPrompts({
                        flowrouter: true,
                        remove_defaults: [],
                        styles: '<none>',
                        accounts: [],
                        language: lng
                    })
                    .on('end', done);
            });

            var copyApp = (dir) => fs.copySync(appDir, dir);

            it('default parameters', (done) => {
                helpers.run(path.join(__dirname, '../generators/route'))
                    .inTmpDir(copyApp)
                    .withArguments('/posts')
                    .on('end', () => {

                        assert.fileContent([
                            [`router.${lng}`, readFixture(`${lng}/router-no-params.${lng}`)],
                            ['client/templates/posts.html', readFixture('posts.html')],
                            [`client/templates/posts.${lng}`, readFixture(`${lng}/posts-no-params.${lng}`)],
                            [`collections.${lng}`, readFixture(`${lng}/collection-entry.${lng}`)]
                        ]);

                        done();
                    });
            });

            it('--collection', (done) => {
                helpers.run(path.join(__dirname, '../generators/route'))
                    .inTmpDir(copyApp)
                    .withArguments('/posts')
                    .withOptions({ collection: 'theposts' })
                    .on('end', () => {

                        assert.fileContent([
                            [`router.${lng}`, readFixture(`${lng}/router-no-params.${lng}`)],
                            ['client/templates/posts.html', readFixture('posts.html')],
                            [`client/templates/posts.${lng}`, readFixture(`${lng}/posts-no-params-collection.${lng}`)],
                            [`collections.${lng}`, readFixture(`${lng}/collection-entry-override.${lng}`)]
                        ]);

                        done();
                    });
            });

            it('--template', (done) => {
                helpers.run(path.join(__dirname, '../generators/route'))
                    .inTmpDir(copyApp)
                    .withArguments('/posts')
                    .withOptions({ template: 'postList' })
                    .on('end', () => {

                        assert.fileContent([
                            [`router.${lng}`, readFixture(`${lng}/router-no-params-template.${lng}`)],
                            ['client/templates/postList.html', readFixture('posts-template.html')],
                            [`client/templates/postList.${lng}`, readFixture(`${lng}/posts-no-params-template.${lng}`)],
                            [`collections.${lng}`, readFixture(`${lng}/collection-entry.${lng}`)]
                        ]);

                        done();
                    });
            });

            it('--template and --collection', (done) => {
                helpers.run(path.join(__dirname, '../generators/route'))
                    .inTmpDir(copyApp)
                    .withArguments('/posts')
                    .withOptions({
                        template: 'postList',
                        collection: 'theposts'
                    })
                    .on('end', () => {

                        assert.fileContent([
                            [`router.${lng}`, readFixture(`${lng}/router-no-params-template.${lng}`)],
                            ['client/templates/postList.html', readFixture('posts-template.html')],
                            [`client/templates/postList.${lng}`, readFixture(`${lng}/posts-no-params-template-collection.${lng}`)],
                            [`collections.${lng}`, readFixture(`${lng}/collection-entry-override.${lng}`)]
                        ]);

                        done();
                    });
            });

            it('parameterized /path', (done) => {
                helpers.run(path.join(__dirname, '../generators/route'))
                    .inTmpDir(copyApp)
                    .withArguments('/posts/:postId')
                    .on('end', () => {

                        assert.fileContent([
                            [`router.${lng}`, readFixture(`${lng}/router-with-params.${lng}`)],
                            [`client/templates/posts.html`, readFixture('posts.html')],
                            [`client/templates/posts.${lng}`, readFixture(`${lng}/posts-with-params.${lng}`)],
                            [`collections.${lng}`, readFixture(`${lng}/collection-entry.${lng}`)]
                        ]);

                        done();
                    });
            });

            it('parameterized /path and --template', (done) => {
                helpers.run(path.join(__dirname, '../generators/route'))
                    .inTmpDir(copyApp)
                    .withArguments('/posts/:postId')
                    .withOptions({
                        template: 'onePost'
                    })
                    .on('end', () => {

                        assert.fileContent([
                            [`router.${lng}`, readFixture(`${lng}/router-with-params-template.${lng}`)],
                            ['client/templates/onePost.html', readFixture('posts-template-one.html')],
                            [`client/templates/onePost.${lng}`, readFixture(`${lng}/posts-with-params-template.${lng}`)],
                            [`collections.${lng}`, readFixture(`${lng}/collection-entry.${lng}`)]
                        ]);

                        done();
                    });
            });

        });

    });
});
