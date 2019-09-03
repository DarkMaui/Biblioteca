const express = require('express');

const config = require('./server/config');

//llamado base de datos
require('./database');

require('./config/passport');


const app = config(express());


//iniciar el servidor
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});