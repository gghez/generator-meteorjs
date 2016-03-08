var fs = require('fs'),
    path = require('path');


before(() => {

    global.readFixture = function(fixture) {
        return fs.readFileSync(path.join(__dirname, 'fixtures', fixture), 'utf8');
    };

});
