const express = require('express');
const app =  express();

app.use(express.json());

const api = require('./routes/api')

app.use('/api', api);

module.exports = app;