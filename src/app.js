const express = require('express');
const app = express();

app.use(express.json());

const auth = require('./routes/auth')
const public = require('./routes/public')

app.use('/api', auth);
app.use('/auth', public);

module.exports = app;