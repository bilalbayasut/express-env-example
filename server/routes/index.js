'use strict';

const
    apiRoute = require('./apis'),
    homeRoute = require('./home'),
    errorRoute = require('./error');

function init(server) {
    server.get('*', function (req, res, next) {
        console.log('Request was made to: ' + req.originalUrl);
        return next();
    });

    server.get('/', function (req, res) {
        res.redirect('/home');
    });

    server.get('/test', function (req, res) {
        res.render('home');
    });

    server.get('/test/again', function (req, res) {
        res.render('home');
    });

    server.use('/api', apiRoute);
    server.use('/home', homeRoute);
    server.use('/error', errorRoute);
}

module.exports = {
    init: init
};