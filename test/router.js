'use strict';
var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');

describe('xprscouch:router', function () {
    beforeEach(function (done) {
        helpers
            .run(require.resolve('../router'))
            .withArguments('foo')
            .on('end', done);
    });

    it('generates a new router', function () {
        assert.file('test/spec/routes/foo.js');
    });
});