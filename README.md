# Yeoman express couch generator
[![npm version](https://badge.fury.io/js/generator-xprscouch.svg)](https://badge.fury.io/js/generator-xprscouch)
[![Dependency Status](https://david-dm.org/anikdas/generator-xprscouch.svg)](https://david-dm.org/anikdas/generator-xprscouch)
[![Build Status](https://travis-ci.org/anikdas/generator-xprscouch.svg?branch=master)](https://travis-ci.org/anikdas/generator-xprscouch)
[![Coverage Status](https://coveralls.io/repos/anikdas/generator-xprscouch/badge.svg?branch=master&service=github)](https://coveralls.io/github/anikdas/generator-xprscouch?branch=master)
>Yeoman generator for express with couchdb lets you rapidly build CRUD MVC application with best practices

###Installation and Usage

install `yo`, `grunt-cli`, `generator-xprscouch`

```
npm install -g yo grunt-cli generator-xprscouch
```

Make a directory and cd into it
```
mkdir project-name && cd $_
```

Run `yo xprscouch [app-name]`

`app-name` is optional

Run `grunt` for preview. By default the app starts on port 3000. You can change the port for different environments (e.g. `development`, `production`) in `config.js` file located in the app root folder.

##Generators
* [App](#app)
* [Router](#router)
* [Model](#model)

##App
Sets up the base app for you

Command
```
yo xprscouch app-name
```

##Router
Creates a new express router

Command:
```
yo xprscouch:router router-name
```

##Model
Creates a new model in `model` folder (Models are like database APIs for routers). Models use [cradle](https://github.com/flatiron/cradle) CouchDB client

Command:
```
yo xprscouch:model model-name [database-name]
```
`database-name` is optional if not provided `model-name` is used as the database name.

##License
[MIT License](http://opensource.org/licenses/MIT)
