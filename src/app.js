'use strict';

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const { createRide, getRides, getRideById } = require('./route');

module.exports = (db) => {
    global.db = db;
    app.get('/health', (req, res) => res.send('Healthy'));

    app.post('/rides', jsonParser, createRide);

    app.get('/rides', getRides);

    app.get('/rides/:id', getRideById);

    return app;
};

