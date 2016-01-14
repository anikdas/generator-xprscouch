'use strict';
var cradle = require('cradle');
var config = require('./config.js');
var someDB = new(cradle.Connection)(config.database.couch.host, config.database.couch.port, config.database.couch.options).database('<%= appName %>');


someDB.exists(function (err, exists) {
    if (err) {
        console.log('error', err);
    } else{
        if (exists) {
            console.log('businesses database already exists');
        } else {
            someDB.create();
            console.log('businesses database created');
        }

        //views
        //view1
    }
});
