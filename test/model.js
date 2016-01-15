'use strict';
var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');

describe('xprscouch:model', function () {
    describe('when using model generator', function(){
        before(function (done) {
            done();
        });
        it('generates model', function (done) {
            helpers.run(path.join( __dirname, '../model'), function(){
                helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
                    if (err) {
                        return done(err);
                    }
                });
                assert.file([
                    'models/foo.js'
                ]);
            })
                .withArguments(['foo'])      // Mock the arguments
                .on('ready', function (generator) {
                    // This is called right before `generator.run()` is called
                })
                .on('end', done);
        });
    });
});