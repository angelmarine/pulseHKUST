const express = require('express');
const api = express.Router();
const input = require('./input');
const data = require('./data');

/* GET home page. */
api.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

api.use('/input', input);
api.use('/data', data);

module.exports = api;
