const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
// const consign = require('consign');

module.exports = () => {
    const app = express();

    // USE EJS 
    app.set('view engine', 'ejs');

    // USE STATIC FILES
    app.use(express.static('public'));

    // SETANDO VARIÁVEIS DA APLICAÇÃO
    app.set('port', process.env.PORT || config.get('server.port'));

    // MIDDLEWARES
    app.use(bodyParser.json());

    // carregando os modulos 
    require('../api/routes/customerZabbix')(app);

    // ENDPOINTS
    // consign({ cwd: 'api' })
    //     .then('data')
    //     .then('controllers')
    //     .then('routes')
    //     .into(app);

    return app;
};