'use strict';
var fs = require('fs-extra');
var generators = require('yeoman-generator');
var yosay = require('yosay');

module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);

        // This makes `appname` a required argument.
        try {
            this.argument('appName', { type: String, required: false });
        } catch (e) {
            console.log('Error: app name name not provided');
            process.exit(1);
        }
        this.option('skip-install');
        this.option('skip-install-message');
        console.log(yosay('Ello! Welcome to my XPRS couch generator! Now it\'s time to chill while I do all the heavy lifting!'));
        // And you can then access it later on this way; e.g. CamelCased
    },
    createBase: function () {
        var done = this.async();
        var g = this;
        fs.copySync(g.sourceRoot()+'/app', g.destinationPath());
        done();
    },
    askFor: function(){
        var cb = this.async();
        var g= this;
        if(!g.appName){
            this.prompt({
                type    : 'input',
                name    : 'name',
                message : 'Your project name',
                default : 'myApp' // Default to current folder name
            }, function (answers) {
                this.appName = answers.name;
                this.log('Your appName is: '+this.appName);
                g.composeWith('xprscouch:model',{ args: [g.appName], options: {init: true}});
                g.composeWith('xprscouch:router',{ args: [g.appName], options: { init:true }});
                var dependFiles = fs.readdirSync(g.templatePath('appDepends'));
                dependFiles.forEach(function (item) {
                    g.fs.copyTpl(
                        g.templatePath('appDepends/'+item),
                        g.destinationPath(item),
                        {appName: g.appName}
                    );
                });
                cb();
            }.bind(this));
        }else{
            cb();
        }
    },
    projectFiles: function () {
        var done = this.async();
        var g = this;
        if(g.appName){
            console.log('appname: '+g.appName);
            g.composeWith('xprscouch:model',{ args: [g.appName], options: {init: true}});
            g.composeWith('xprscouch:router',{ args: [g.appName], options: { init:true }});
            var dependFiles = fs.readdirSync(g.templatePath('appDepends'));
            dependFiles.forEach(function (item) {
                g.fs.copyTpl(
                    g.templatePath('appDepends/'+item),
                    g.destinationPath(item),
                    { appName: g.appName}
                );
            });
        }
        done();
    },
    final: function () {
        var g =this;
        this.on('end',function(){
            this.installDependencies({
                skipInstall: g.options['skip-install'],
                skipMessage: g.options['skip-install-message']
            });
        });
    }
});
