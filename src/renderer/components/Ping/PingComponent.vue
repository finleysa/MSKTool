<template>
    <div>

        <div class="container columns">
            <div class="column">
                <label class="title">Ping Tool </label>
            </div>
            <div class="column">
                <button class="button is-link is-outlined" v-on:click="addAddress">ADD</button>
            </div>
        </div>

        <div v-for="adr in addresses" :key="adr.id">
            <form>
                <div class="field">
                    <div class="columns">
                        <div class="column">
                            <input v-if="!adr.show" v-model="adr.device"  v-on:keyup.enter="setIP(adr)"
                                   class="input column" type="text" placeholder="Device">
                        </div>
                        <div class="column">
                            <input v-if="!adr.show" v-model="adr.ip"  v-on:keyup.enter="setIP(adr)"
                                   class="input" type="text" placeholder="IP Address">
                        </div>
                        <div class="column is-one-quarter">
                            <a v-if="!adr.show" class="delete is-large" v-on:click="deleteAddress(adr)"></a>
                        </div>
                    </div>
                </div>
            </form>

            <div class="columns" v-if="adr.show">
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
                    <button v-on:click="stopPingAddress(adr)"  v-if="adr.interval"  class="button is-info is-pulled-right">Stop</button>
                    <button v-on:click="startPingAddress(adr)" v-if="!adr.interval" class="button is-info is-pulled-right">Start Ping</button>
                </div>

                <!--<div class="column">-->
                    <!--<a v-if="adr.show" class="delete is-large" v-on:click="deleteAddress(adr)"></a>-->
                <!--</div>-->
            </div>
        </div>

    </div>
</template>

<script>
    import IpDeviceInfo from '../../IpDeviceInfo'
    import _ from 'lodash';

    export default {
        name: 'ip-selection',
        data()  {
            return {
                idIncrement: 0,
                addresses: []
            }
        },
        created() {
            this.addAddress();
        },
        methods: {
            setIP(adr) {
                if(adr.ip.length >= 7) {
                    let newAddress = adr;

                    newAddress.id = this.idIncrement++;
                    newAddress.show = true;
                    newAddress.ping.addHost(newAddress.ip);
                    if(!_.find(this.addresses, (n)=> adr ==n)) {
                        this.addresses.push(newAddress)
                    }
                }
            },
            showIpInput(adr) {
                adr.show = false;
                adr.ping.removeHost();
            },
            stopPingAddress(adr) {
                clearTimeout(adr.interval)
                adr.interval = null;

            },
            startPingAddress(adr) {
                adr.ping.pingHost((res) => {
                    adr.isAlive = res.alive;
                    adr.avg = res.avg;
                    adr.interval = setTimeout(()=>{this.startPingAddress(adr)}, 2000);
                });
            },
            addAddress() {
                this.addresses.push(new IpDeviceInfo());
            },
            deleteAddress(adr) {
                if(adr.interval) this.stopPingAddress(adr);
                let removeIndex = this.addresses.map(function(item) { return item.id; }).indexOf(adr.id);
                this.addresses.splice(removeIndex, 1);
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