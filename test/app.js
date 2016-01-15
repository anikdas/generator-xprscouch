'use strict';
var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');

describe('xprscouch:router', function () {
    beforeEach(function (done) {
        helpers
            .run(require.resolve('../app'))
            .withGenerators([
                require.resolve('../router'),
                require.resolve('../model')
            ])
            .withArguments('foo')
            .on('end', done);
    });

    it('generates a new router', function () {
        assert.file('test/spec/routes/foo.js');
    });
});

describe('default settings', function () {
    beforeEach(function (done) {
        this.angular.on('end', done);
    });

    it('generates base files', function () {
        assert.file(getDefaultFilesForAppPath('app'));
        assert.file([
            '.gitignore',
            'Gruntfile.js',
            'app.js',
            'config.js',
            'init.js',
            'package.json',
            'processes.json',
            'bin/www',
            'models/foo.js',
            'public/images',
            'public/javascripts',
            'stylesheets/style.css',
            'routes/foo.js',
            'views/error.ejs',
            'views/index.ejs'
        ]);
    });
});