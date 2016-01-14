'use strict';
var fs = require('fs-extra');
var generators = require('yeoman-generator');


module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);

        // This makes `appname` a required argument.
        try {
            this.argument('modelName', { type: String, required: true });
            this.argument('databaseName', { type: String, required: false });
            this.option('init');
        } catch (e) {
            console.log('Error: model name not provided');
            process.exit(1);
        }
        // And you can then access it later on this way; e.g. CamelCased
    },
    createBase: function () {
        var g = this;
        var modelName = g.modelName;
        var databaseName = g.databaseName ? g.databaseName: modelName;
        console.log('creating model ' + modelName);
        fs.exists(g.destinationPath('models/'+modelName+'.js'), function (exists) {
            if(exists){
                console.log(modelName+'.js aredy exists.');
            }else{
                g.fs.copyTpl(
                    g.templatePath('index.js'),
                    g.destinationPath('models/'+modelName+'.js'),
                    { database: databaseName}
                );
            }
        });
    }
});
