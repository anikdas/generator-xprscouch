'use strict';
var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');

describe('xprscouch:router', function () {
    describe('when using router generator', function(){
        before(function (done) {
            done();
        });
        it('generates router', function (done) {
            helpers.run(path.join( __dirname, '../router'), function(){
                helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
                    if (err) {
                        return done(err);
                    }
                });
                assert.file([
                    'routes/foo.js'
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