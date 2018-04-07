'use strict';

const
    express = require('express'),
    expressHandlebars = require('express-handlebars'),
    path = require('path'),
    expressLayouts = require('express-ejs-layouts'),
    bodyParser = require('body-parser'),
    flash = require('connect-flash'),
    session = require('express-session'),
    mongoose = require("mongoose");

module.exports = function() {
    let server = express(),
        create,
        start;

    create = function(config) {
        let routes = require('./routes');

        // Server settings
        server.set('env', config.env);
        server.set('port', config.port);
        server.set('hostname', config.hostname);
        server.set('viewDir', config.viewDir);

        // Returns middleware that parses json
        server.use(bodyParser.json());

        // Set Public Folder
        server.use('/public',express.static(path.join(__dirname, '../public')));
        server.use('/nodemodules',express.static(path.join(__dirname, '../node_modules')));
        server.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
        server.set('views', path.join(__dirname, '../app/views'));

        server.set('view engine', 'ejs');
        server.engine('ejs', require('ejs-locals'));
        server.use(expressLayouts);
        server.set('layout', 'layouts/default');

        // Set up routes
        routes.init(server);
    };

    start = function() {
        let hostname = server.get('hostname'),
            port = server.get('port');

        server.listen(port, function () {
            console.log('Express server listening on - http://' + hostname + ':' + port);
        });
    };

    return {
        create: create,
        start: start
    };
};
