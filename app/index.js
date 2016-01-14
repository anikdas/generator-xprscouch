'use strict';
var fs = require('fs-extra');
var generators = require('yeoman-generator');
var yosay = require('yosay');

module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);

        // This makes `appname` a required argument.
        try {
            this.argument('appName', { type: String, required: true });
        } catch (e) {
            console.log('Error: app name name not provided');
            process.exit(1);
        }
        // And you can then access it later on this way; e.g. CamelCased
    },
    createBase: function () {
        var g = this;
        console.log(yosay('Ello! Welcome to my XPRS couch generator! Now it\'s time to chill while I do all the heavy lifting!'));
        console.log('copying file...');
        fs.copy(g.sourceRoot()+'/app', g.destinationPath(), function (err) {
            if (err){
                return console.error(err);
            }else{
                g.composeWith('expresscouch:model',{ args: [g.appName], options: {init: true}});
                g.composeWith('expresscouch:router',{ args: [g.appName], options: { init:true }});
            }
        });
    },
    dependedFileAdd: function () {
        // body...
        var g = this;
        var appName = g.appName;
        var dependFiles = fs.readdirSync(g.templatePath('appDepends'));
        dependFiles.forEach(function (item) {
            g.fs.copyTpl(
                g.templatePath('appDepends/'+item),
                g.destinationPath(item),
                { appName: appName}
            );
        });
    },
    final: function () {
        this.npmInstall();
    }
});
