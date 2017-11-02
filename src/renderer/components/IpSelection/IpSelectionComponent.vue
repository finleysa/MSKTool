<template>
    <div>
        <div class="field">
            <div class="columns">
                <div class="column">
                    <input v-if="!ipAddress.show" v-model="ipAddress.device"  v-on:keyup.enter="setIP"
                           class="input column" type="text" placeholder="Device">
                </div>
                <div class="column">
                    <input v-if="!ipAddress.show" v-model="ipAddress.value"  v-on:keyup.enter="setIP"
                           class="input" type="text" placeholder="IP Address">
                </div>
            </div>
            <div class="columns" v-if="ipAddress.show">
                <div class="column">
                    <label v-bind:class="{ 'border-green': ipAddress.isAlive, 'border-red': !ipAddress.isAlive }"
                           class="ip-label" v-on:dblclick="showIpInput">{{ipAddress.device}} </label>
                </div>
                <div class="column">
                    <label v-bind:class="{ 'border-green': ipAddress.isAlive, 'border-red': !ipAddress.isAlive }"
                           class="ip-label" v-on:dblclick="showIpInput">DEST: {{ipAddress.value}} </label>
                </div>

                <div v-if="pingData" class="column">
                    <label v-bind:class="{ 'border-green': ipAddress.isAlive, 'border-red': !ipAddress.isAlive }"
                            class="ip-label">AVG: {{this.pingData.avg}} </label>
                </div>
                <div class="column">
                    <button v-on:click="startPingIpAddress" v-if="!this.interval" class="button is-info is-pulled-right">Start Ping</button>
                    <button v-on:click="stopPingIpAddress" v-if="this.interval" class="button is-info is-pulled-right">Stop Ping</button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import icmp from '../../ping';

    export default {
        name: 'ip-selection',
        data()  {
            return {
                ipAddress: {
                    value: "",
                    show: false,
                    isAlive: null,
                    device: null
                },
                ping: new icmp(),
                pingData: null,
                interval: null
            }
        },
        methods: {
            setIP(e) {
                if(this.ipAddress.value.length >= 7) {
                    this.ipAddress.show = true;
                    this.ping.addHost(this.ipAddress.value);
                }
            },
            showIpInput(e) {
                this.ipAddress.show = false;
                this.ping.removeHost()
                this.clear();
            },
            startPingIpAddress() {
                this.ping.pingHost((res) =>
                {
                    this.pingData = res
                    this.ipAddress.isAlive = res.alive;
                    this.interval = setTimeout(this.startPingIpAddress, 2000);
                })
            },
            stopPingIpAddress() {
                this.clear();
                },
            clear() {
                clearTimeout(this.interval);
                this.interval = null;
                this.pingData = null;
            }
        }
    }
</script>

<style>
    .ip-label{
        width: 100%;
        padding-bottom: 3px;
        border-bottom: 2px solid;
        font-size: 20px;
        margin-bottom: 10px;
    }

    .border-green{
        border-color: limegreen;
    }

    .border-red {
        border-color: red;
    }
</style>


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
*/