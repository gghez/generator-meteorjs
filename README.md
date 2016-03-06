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

Create a new project directory:

```
$ mkdir your-new-project && cd $_
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

Create a MeteorJS application from scratch based on command line options and answers to prompted questions.

```
yo meteorjs --help
```

Arguments:

- `name` when specified generate projet in a new sub-directory named as is.


Options are:

- `--coffee` for CoffeeScript language support
- `--verbose` to activate debug traces
- `--packages list,of,pkg` to create empty packages inside the application.

Questions are:

- Remove default packages (insecure, autopublish)
- Accounts related packages (accounts-password, accounts-facebook...)
- Application styles generator (LESS, SCSS or nothing)
- Add application router Y/n (no iron-router support for now)

> Answers to questions are stored for next execution then you won't have my defaults a second time ^^

## Structure

When this script is called: `yo meteorjs myblog --packages reader,writer,core`

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
.../ myblog.css
.../ myblog.js
.../ myblog.html

```

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

## TODO

Sub commands to implement:

- meteorjs:add-route
- meteorjs:add-collection

