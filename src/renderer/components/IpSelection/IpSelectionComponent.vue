<template>
    <div>
        <div id="ping">
            <div class="container columns">
                <div class="column">
                    <label class="title">Ping Tool </label>
                </div>
                <div class="column">
                    <button class="button is-link is-outlined" v-on:click="addIpSelection">ADD</button>
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
                <!--<div class="columns" v-if="show">-->
                    <!--<div class="column">-->
                        <!--<label v-bind:class="{ 'border-green': address.isAlive, 'border-red': !address.isAlive }"-->
                               <!--class="ip-label" v-on:dblclick="showIpInput">{{address.device}} </label>-->
                    <!--</div>-->
                    <!--<div class="column">-->
                        <!--<label v-bind:class="{ 'border-green': address.isAlive, 'border-red': !address.isAlive }"-->
                               <!--class="ip-label" v-on:dblclick="showIpInput">{{address.ip}} </label>-->
                    <!--</div>-->

                    <!--<div v-if="!pingData" class="column">-->
                        <!--<label v-bind:class="{ 'border-green': address.isAlive, 'border-red': !address.isAlive }"-->
                               <!--class="ip-label" v-on:dblclick="showIpInput">0.000</label>-->
                    <!--</div>-->

                    <!--<div v-if="pingData" class="column">-->
                        <!--<label v-bind:class="{ 'border-green': address.isAlive, 'border-red': !address.isAlive }"-->
                                <!--class="ip-label" v-on:dblclick="showIpInput">{{this.pingData.avg}} </label>-->
                    <!--</div>-->
                    <!--<div class="column">-->
                        <!--<button v-on:click="startPingaddress" v-if="!this.interval" class="button is-info is-pulled-right">Start Ping</button>-->
                        <!--<button v-on:click="stopPingaddress" v-if="this.interval" class="button is-info is-pulled-right">Stop Ping</button>-->
                <!--</div>-->

        </div>
    </div>
</template>

<script>
    import icmp from '../../ping';
    import IpDeviceInfo from '../../IpDeviceInfo'

    export default {
        name: 'ip-selection',
        data()  {
            return {
                ping: new icmp(),
                pingData: null,
                interval: null,
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
                    this.ping.addHost(newAddress.ip);
                    this.addresses.push(newAddress)

                    this.address = new IpDeviceInfo();
                }
            },
            showIpInput(e) {
                this.address.show = false;
                this.ping.removeHost();
                this.clear();
            },
            startPingaddress() {
                this.ping.pingHost((res) =>
                {
                    this.pingData = res
                    this.address.isAlive = res.alive;
                    this.interval = setTimeout(this.startPingaddress, 2000);
                })
            },
            stopPingaddress() {
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