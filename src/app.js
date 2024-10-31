const express = require('express');
const app = express();

app.use(express.json());

const auth = require('./routes/auth')
const public = require('./routes/public')
const web = require('./routes/web')

app.use('/api', auth);
app.use('/auth', public);
app.use('/', web);

module.exports = app;