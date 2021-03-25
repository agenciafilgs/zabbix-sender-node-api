module.exports = app => {
    const controller = require('../controllers/customerZabbix')();

    // api route
    app.route('/api/v1/zabbix-sender')
        .post(controller.savecustomerZabbix);

    // Doc view route
    app.route('/')
        .get(controller.listcustomerZabbix);
};

