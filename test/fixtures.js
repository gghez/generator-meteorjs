var fs = require('fs'),
    ejs = require('ejs'),
    path = require('path');


before(() => {

    global.readFixture = function (fixture, context) {
        var fixtureContent = fs.readFileSync(path.join(__dirname, 'fixtures', fixture), 'utf8');
        if (!context) {
            return fixtureContent;
        } else {
            return ejs.render(
                fixtureContent,
                context,
                {debug: false}
            );
        }
    };

});
