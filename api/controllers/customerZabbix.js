const ZabbixSender = require('node-zabbix-sender');
const Sender = new ZabbixSender({ host: process.env.API_URL.toString(), port: process.env.API_PORT.toString(), timeout: 5000, with_ns: false, with_timestamps: false, });
// const Sender = new ZabbixSender({ host: 'localhost', port: '10051', timeout: 5000, with_ns: false, with_timestamps: false, });

module.exports = app => {
    const customerZabbixDB = require('../data/customerZabbix.json');
    // const customerZabbixDBItem = require('../data/customerZabbix.json');
    const controller = {};

    //destructing objeto
    const {
        customerZabbix: customerZabbixMock,
    } = customerZabbixDB;

    // get values - depois implementar algo para retirar exemplo os hosts da ferramenta.
    controller.listcustomerZabbix = (req, res) => {
        res.render('index')
    };

    // post | save and send - enviar para o zabbix  
    controller.savecustomerZabbix = (req, res) => {
        // customerZabbixMock.status.push({
        //     status: "sucess"
        // });
        // salvar os valores em variaveis para recuperar depois 
        let host = req.body.host;
        let item = req.body.item;
        let value = req.body.value;

        if (host == 'undefined' || host == null) {
            res.status(400).send({
                title: "Zabbix_Sender_API",
                version: "0.0.1",
                status: "Erro",
                info: "O nome do host esta ausente e não pode ser carregado no zabbix favor verificar"
            });
        } else if (item == 'undefined' || item == null) {
            res.status(400).send({
                title: "Zabbix_Sender_API",
                version: "0.0.1",
                status: "Erro",
                info: "A chave do item está ausente insira a mesma ou verifique com a squad observability"
            });
        } else if (value == 'undefined' || value == null) {
            res.status(400).send({
                title: "Zabbix_Sender_API",
                version: "0.0.1",
                status: "Erro",
                info: "Não existe um valor a ser enviado ou o mesmo está ausente, por favor verifique"
            });
        } else {
            // Zabbix 
            // Send the items to zabbix trapper
            Sender.addItem(host.toString(), item.toString(), value.toString()).send(function (err, res) {
                if (err) {
                    throw err;
                }
            });
            // Return sucesso
            res.status(201).send({
                title: "Zabbix_Sender_API",
                version: "0.0.1",
                status: "sucess"
            });
        }
    }

    return controller;
};