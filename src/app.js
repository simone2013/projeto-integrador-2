const express = require('express');

const app = express();
const api = require('./routes/api')

app.use('/api', api);

module.exports = app;