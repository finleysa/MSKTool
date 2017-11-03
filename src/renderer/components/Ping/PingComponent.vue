<template>
    <div>
        <div id="ping">
            <div class="container columns">
                <div class="column">
                    <label class="title">Ping Tool </label>
                </div>
                <div class="column">
                    <button class="button is-link is-outlined" v-on:click="">ADD</button>
                </div>
            </div>
            <form>
                <div class="field">
                    <div class="columns">
                        <div class="column">
                            <input v-if="!address.show" v-model="address.device"  v-on:keyup.enter="setIP"
                                   class="input column" type="text" placeholder="Device">
                        </div>
                        <div class="column">
                            <input v-if="!address.show" v-model="address.ip"  v-on:keyup.enter="setIP"
                                   class="input" type="text" placeholder="IP Address">
                        </div>
                    </div>
                </div>
            </form>

            <div class="container">
                <div class="columns">
                    <div v-for="adr in addresses" v-if="adr.show" :key="adr.id">
                        <div class="columns">
                            <div class="column">
                                <label v-bind:class="{ 'border-green': adr.isAlive, 'border-red': !adr.isAlive }"
                                       class="ip-label" v-on:dblclick="showIpInput(adr)">{{adr.device}}</label>
                            </div>
                            <div class="column">
                                <label v-bind:class="{ 'border-green': adr.isAlive, 'border-red': !adr.isAlive }"
                                       class="ip-label" v-on:dblclick="showIpInput(adr)">{{adr.ip}} </label>
                            </div>

                            <div v-if="!adr.isAlive" class="column">
                                <label v-bind:class="{ 'border-green': adr.isAlive, 'border-red': !adr.isAlive }"
                                       class="ip-label" v-on:dblclick="showIpInput(adr)">0.000</label>
                            </div>

                            <div v-if="adr.isAlive" class="column">
                                <label v-bind:class="{ 'border-green': adr.isAlive, 'border-red': !adr.isAlive }"
                                       class="ip-label" v-on:dblclick="showIpInput(adr)">{{adr.avg}} </label>
                            </div>

                            <div class="column">
                                <button v-on:click="startPingaddress(adr)" v-if="!adr.ping.interval" class="button is-info is-pulled-right">Start Ping</button>
                                <button v-on:click="clear(adr)" v-if="adr.ping.interval" class="button is-info is-pulled-right">Stop Ping</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import PingModel from '../../ping';
    import IpDeviceInfo from '../../IpDeviceInfo'

    export default {
        name: 'ip-selection',
        data()  {
            return {
                pingData: null,
                idIncrement: 0,
                address: new IpDeviceInfo(),
                addresses: []
            }
        },
        created() {

        },
        methods: {
            setIP(e) {
                if(this.address.ip.length >= 7) {
                    let newAddress = this.address;

                    newAddress.id = this.idIncrement++;
                    newAddress.show = true;
                    newAddress.ping.addHost(newAddress.ip);
                    this.addresses.push(newAddress)

                    this.address = new IpDeviceInfo();
                }
            },
            showIpInput(adr) {
                adr.show = false;
                adr.ping.removeHost();
                if (adr.interval){ clearTimeout(adr.interval)};
            },
            startPingaddress(adr) {
                adr.ping.pingHost((res) =>
                {
                    adr.isAlive = res.alive;
                    adr.avg = res.avg;
                    adr.ping.interval = setTimeout(this.startPingaddress(adr), 2000);
                })
            },
            clear(adr) {
                clearTimeout(adr.ping.interval)
                adr.ping.interval = null;
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