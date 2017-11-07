import PingModel from "./ping";

export default class IpDeviceInfo {

    constructor(obj) {
        this.ping = new PingModel();
        this.ping.host = obj.host;
        this.id = obj.id || "";
        this.ip = obj.ip || "";
        this.device = obj.device || "";
        this.show = obj.show || false;
        this.avg = obj.avg || 0;
        this.isAlive = obj.isAlive || false;
        this.interval = obj.interval;
    }
    
}

/**
 * Parsed response
 * @typedef {object} PingResponse
 * @param {string} host - The input IP address or HOST
 * @param {string} numeric_host - Target IP address
 * @param {boolean} alive - True for existed host
 * @param {string} output - Raw stdout from system ping
 * @param {number} time - Time (float) in ms for first successful ping response
 * @param {string} min - Minimum time for collection records
 * @param {string} max - Maximum time for collection records
 * @param {string} avg - Average time for collection records
 * @param {string} stddev - Standard deviation time for collected records
 */
