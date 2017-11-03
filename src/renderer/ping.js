import ping from 'ping';

export default class PingModel {

    constructor() {
        this.host = null;
        this.interval = null;
    }

    addHost(host) {
        this.host = host;
    }

    removeHost() {
        this.host = null
    }

    pingHost(fn) {
        if(!this.host) return;
        ping.promise.probe(this.host)
            .then(function (res) {
                fn(res);
            });
    }

}