'use strict';
var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');

describe('xprscouch', function () {
    describe('when using app generaor', function(){
        this.timeout(15000);
        before(function (done) {

            done();
        });
        it('generates app files', function (done) {
            this.timeout(10000);
            var deps = [
                [helpers.createDummyGenerator(), 'xprscouch:router'],
                [helpers.createDummyGenerator(), 'xprscouch:model']
            ];
            helpers.run(path.join( __dirname, '../app'), function(){
                helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
                    if (err) {
                        return done(err);
                    }
                });
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
                done();
            })
                .withOptions({ 'skip-install': 'true', 'skip-welcome-message':'true'})    // Mock options passed in
                .withArguments(['foo'])      // Mock the arguments
                .withGenerators(deps)
                .on('ready', function (generator) {
                    // This is called right before `generator.run()` is called
                })
                .on('end', done);
        });
    });
});