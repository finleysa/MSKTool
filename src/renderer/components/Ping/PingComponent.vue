<template>
    <div>

        <div class="container columns">
            <div class="column">
                <label class="title">Ping Tool </label>
            </div>
            <div class="column">
                <button class="button is-link is-outlined" v-on:click="addAddress">Add</button>
                <button class="button is-link is-outlined" v-on:click="showCards">Show Brief</button>
                <button class="button is-link is-outlined" v-on:click="saveDevices">Save</button>

            </div>
        </div>

        <div v-if="cards" v-for="adr in addresses" :key="adr.id">
            <div v-if="adr.interval" class="card">
                <header class="card-header">
                    <p class="card-header-title">
                        <span class="tag">{{adr.device}}</span><span class="tag is-success">Success</span>
                        <progress v-if="adr.isAlive" class="progress" :value=500-adr.avg max="500">{{adr.avg}}%</progress>
                    </p>
                </header>
            </div>
        </div>

        <div v-if="!cards" v-for="adr in addresses" :key="adr.id">
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

            <div class="columns" v-bind:class="{ 'border-green': adr.isAlive, 'border-red': !adr.isAlive }" v-if="adr.show" >
                <div class="column">
                    <label
                           class="ip-label" v-on:dblclick="showIpInput(adr)">{{adr.device}}</label>
                </div>

                <div class="column">
                    <label
                           class="ip-label" v-on:dblclick="showIpInput(adr)">{{adr.ip}} </label>
                </div>

                <div v-if="!adr.isAlive" class="column">
                    <label
                           class="ip-label" v-on:dblclick="showIpInput(adr)">0.000</label>
                </div>

                <div v-if="adr.isAlive" class="column">
                    <label
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
    import jsonfile from  'jsonfile';

    export default {
        name: 'ip-selection',
        data()  {
            return {
                idIncrement: 0,
                addresses: [],
                cards: false
            }
        },
        created() {
            jsonfile.readFile(__dirname + '/../devices.json', (err, obj) => {
                if(err) console.log(err);
                else {
                    _.map(obj, (n) => {
                        console.log(n);
                        if(n.ip && n.device) {
                            n.avg = 0.000;
                            n.isAlive = false;
                            this.setIP(new IpDeviceInfo(n));
                        }
                    })
                }
            });
        },
        methods: {
            setIP(adr) {
                if(adr.ip.length >= 7) {
                    let newAddress = adr;

                    newAddress.id = this.idIncrement++;
                    newAddress.show = true;
                    newAddress.interval = null;
                    newAddress.ping.addHost(newAddress.ip);
                    if(!_.find(this.addresses, (n)=> adr.id === n.id)) {
                        this.addresses.push(newAddress)
                    }

                }
            },
            showIpInput(adr) {
                adr.show = false;
                adr.isAlive = false;
                adr.ping.removeHost();
                this.stopPingAddress(adr);
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
                this.addresses.push(new IpDeviceInfo({}));
            },
            deleteAddress(adr) {
                if(adr.interval) this.stopPingAddress(adr);
                let removeIndex = this.addresses.map(function(item) { return item.id; }).indexOf(adr.id);
                this.addresses.splice(removeIndex, 1);
            },
            showCards() {
                this.cards = !this.cards;
            },
            saveDevices() {
                let tempSave = [];
                _.map(this.addresses, (n) => {
                    if(n.ip.length >= 7) {
                        tempSave.push(n);
                    }
                });
                jsonfile.writeFile(__dirname + '/../devices.json', tempSave, function (err) {
                    if(err) console.error(err);
                    else console.info('saved');
                });
            }

        }
    }
</script>

<style>
    .ip-label{
        width: 100%;
        padding-bottom: 3px;
        font-size: 20px;
        margin-bottom: 10px;
    }

    .border-green{
        border-bottom: 2px solid;
        border-color: limegreen;
    }

    .border-red {
        border-bottom: 2px solid;
        border-color: red;
    }

    form {
        margin: 15px 0;
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