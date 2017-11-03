import icmp from "./ping";

export default class IpDeviceInfo {

    id = "";
    ip = "";
    device = "";
    show = false;
    avg = 0;
    isAlive = false;
    ping = new icmp();

    constructor() {

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
