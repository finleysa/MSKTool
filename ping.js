var ping = require('ping');

var hosts = ['127.0.0.1'];

hosts.forEach(function (host) {
    ping.promise.probe(host)
        .then(function (res) {
            console.log(res);
        });
});