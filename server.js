const app = require('./config/express')();
const port = app.get('port');
const host = app.get('host');

// prefirivel desta forma para não deixar um host fixo
app.listen(port, host);