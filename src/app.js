const express = require('express');
const app = express();
const port = 3000;
const api = require('./routes/api')

app.use('/api', api);

app.listen(port, () => {
    console.log("Conexão realizada com sucesso!")
})
