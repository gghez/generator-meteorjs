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

                assert.fileContent('router.js', '\nFlowRouter.route(\'/\', {\n    action: () => {\n\tBlazeLayout.render(\'mainLayout\', {\n\t    content: \'home\'\n\t});\n    }\n});\n\nFlowRouter.route(\'/posts\', {\n    action: (params) => {\n        BlazeLayout.render(\'mainLayout\', {\n          content: \'posts\',\n          params: params\n        });\n    }\n});\n\n');

                assert.file([
                    'client/templates/posts.html',
                    'client/templates/posts.js',
                    'collections.js'
                ]);

                assert.fileContent('client/templates/posts.js', '\nTemplate.posts.onCreated(function(){\n\n\n  \n  this.subscribe(\'posts\');\n  \n\n\n});\n\nTemplate.posts.helpers({\n\n\n  postsItems: () => {\n    return Posts.find();\n  }\n\n\n});\n');

                var collectionsScript = fs.readFileSync('collections.js').toString();
                chai.assert.include(collectionsScript, 'Posts = new Mongo.Collection(\'posts\');');

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

                var routerScript = fs.readFileSync('router.js').toString();

                chai.assert.equal(routerScript, '\nFlowRouter.route(\'/\', {\n    action: () => {\n\tBlazeLayout.render(\'mainLayout\', {\n\t    content: \'home\'\n\t});\n    }\n});\n\nFlowRouter.route(\'/posts\', {\n    action: (params) => {\n        BlazeLayout.render(\'mainLayout\', {\n          content: \'posts\',\n          params: params\n        });\n    }\n});\n\n');

                assert.file([
                    'client/templates/posts.html',
                    'client/templates/posts.js',
                    'collections.js'
                ]);

                assert.fileContent('client/templates/posts.js', '\nTemplate.posts.onCreated(function(){\n\n\n  \n  this.subscribe(\'theposts\');\n  \n\n\n});\n\nTemplate.posts.helpers({\n\n\n  thepostsItems: () => {\n    return Theposts.find();\n  }\n\n\n});\n');

                var collectionsScript = fs.readFileSync('collections.js').toString();
                chai.assert.include(collectionsScript, 'Theposts = new Mongo.Collection(\'theposts\');');

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

                assert.fileContent('router.js', '\nFlowRouter.route(\'/\', {\n    action: () => {\n\tBlazeLayout.render(\'mainLayout\', {\n\t    content: \'home\'\n\t});\n    }\n});\n\nFlowRouter.route(\'/posts/:postId\', {\n    action: (params) => {\n        BlazeLayout.render(\'mainLayout\', {\n          content: \'posts\',\n          params: params\n        });\n    }\n});\n\n');

                assert.file([
                    'client/templates/posts.html',
                    'client/templates/posts.js',
                    'collections.js'
                ]);

                assert.fileContent('client/templates/posts.js', '\nTemplate.posts.onCreated(function(){\n\n\n  \n  this.autorun(() => {\n    this.subscribe(\'posts\', Template.currentData().params);\n  });\n  \n\n\n});\n\nTemplate.posts.helpers({\n\n\n  postsItem: () => {\n    return Posts.findOne({});\n  }\n\n\n});\n');

                var collectionsScript = fs.readFileSync('collections.js').toString();
                chai.assert.include(collectionsScript, 'Posts = new Mongo.Collection(\'posts\');');

                done();
            });
    });
});
