# generator-meteorjs

Yeoman generator for MeteorJS application and packages.

## Prerequisites

* [nodejs](http://nodejs.com)
* [yeoman](http://yeoman.io)

To install yeoman from npm, run:

```
$ npm install -g yo
```

### Install

To install generator-meteorjs from npm, run:

```
$ npm install -g generator-meteorjs
```

Initiate the generator:

```
$ yo meteorjs myblog --coffee --packages reader,writer,core
```

Finally, run Meteor:

```
$ cd myblog
$ meteor
```

## Features

### Application generator (default)

Create a MeteorJS application from scratch based on command line options and answers to prompted questions.

```
yo meteorjs --help
```

Arguments:

- `name` when specified, generate projet in a new sub-directory named as is.


Options are:

- `--coffee` for CoffeeScript language support
- `--verbose` to activate debug traces
- `--packages list,of,pkg` to create empty packages inside the application
- `--styles <less|fourseven:scss|...>` Use a specific styles generator
- `--router` Enable FlowRouter support as routing middleware
- `--secure` Remove default packages: "insecure" and "autopublish"
- `--help` to display all generator options

> Some options disable questions related to

> Answers to questions are stored for next execution then you won't have my defaults a second time ^^

### Generator sub-commands

#### `meteorjs:route`

Generates a new route with path registration and associated template.

Argument is route **path** and you can also specify `--template <name>` to generate and associate a custom template name.

> Template name is auto-generated if not overriden by `--template` option. e.g.: for path `/posts/:postId`, a template named _posts_ is generated.

## Structure

When this script is called:

```
yo meteorjs myblog --router --packages reader,writer,core
yo meteorjs:route /posts --template postList
```

This structure is created:

```
/ myblog
.../ .meteor
.../ packages
   .../reader
      .../ package.js
      .../ core.js
      .../ core-tests.js
      .../ README.md
   .../writer (same as reader)
   .../core (same as reader)
.../ client
   .../ myblog.css
   .../ index.js
   .../ index.html
   .../ templates
      .../ postList.html
.../ router.js
```

## Contributing

Clone repository:

```
git clone git@github.com:gghez/generator-meteorjs.git
```

Tests are located in `./test` folder and can be run using command `npm test`.

When feature added and tested, send your PR.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

## TODO

Sub commands to implement:

- meteorjs:collection

