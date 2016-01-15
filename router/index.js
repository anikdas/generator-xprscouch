'use strict';
var fs = require('fs-extra');
var generators = require('yeoman-generator');


module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);

        // This makes `appname` a required argument.
        try {
            this.argument('routerName', { type: String, required: true });
            this.argument('routerPath', { type: String, required: false });
            this.option('init')
        } catch (e) {
            console.log('Error: router name not provided');
            process.exit(1);
        }
        // And you can then access it later on this way; e.g. CamelCased
    },
    createBase: function () {
        var g = this;
        var routerName = g.routerName;
        var routerPath = g.routerPath != undefined ? g.routerPath : g.routerName;
        if(this.options.init){
            routerPath = '';
        }
        routerPath = routerPath.replace('/\/\g', '');
        fs.exists(g.destinationPath('routes/'+routerName+'.js'), function (exists) {
            if(exists){
                console.log(routerName+'.js aredy exists.');
            }else{
                console.log('creating router ' + routerName);
                g.fs.copyTpl(
                    g.templatePath('index.js'),
                    g.destinationPath('routes/'+routerName+'.js'),
                    { database: routerName}
                );
                try{
                    var data = fs.readFileSync(g.destinationPath('app.js'), 'utf8');
                }catch (e){
                    return;
                }
                var lines = data.split(/\r?\n/);
                var newFileLines = [];
                lines.forEach(function (line, lineNo) {
                    if(line === '//!end node-couch-routers'){
                        newFileLines.push("var "+routerName+" = require('./routes/"+routerName+"')");
                    }
                    if(line === '//!end node-couch-url-mappings'){
                        newFileLines.push("app.use('/"+ routerPath +"', "+routerName+");");
                    }
                    newFileLines.push(line)
                });
                fs.writeFileSync(g.destinationPath('app.js'), newFileLines.join('\n'));
                console.log('router '+routerName +' created');
            }
        });
    }
});
