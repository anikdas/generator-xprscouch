'use strict';
var cradle = require('cradle');
var config = require('../config.js');
var db = new(cradle.Connection)(config.database.couch.host, config.database.couch.port).database('<%= database %>');

var getDocument = function (id, callback) {
    db.get(String(id), function (err, doc) {
        callback(err,doc);
    });
};

module.exports = {
    getDocument:getDocument
};
