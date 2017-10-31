<template>
    <div class="ping">
        <label class="padding-20 title">Ping Tool <span><button class="button is-link is-outlined is-pulled-right" v-on:click="addIpSelection">ADD</button></span></label>
        <div class="columns"
             v-for="(selector, index) in ipSelectors"
             v-bind:key="index">
            <div v-on:keyup.enter="addIpSelection" class="column" v-if="ipSelectors.length > 0"
                is="ip-selection">
            </div>
            <button v-on:click="ipSelectors.splice(index, 1)">X</button>
        </div>
    </div>
</template>

<script>
    import IpSelection from '../IpSelection/IpSelectionComponent'
    import _ from 'lodash'

    export default {
        name: 'ping',
        components: {IpSelection},
        properties: {
        },
        data() {
            return {
                ipSelectors: [],
                nextIpSelectorId: 0
            }
        },
        methods: {
            addIpSelection (e){
                this.ipSelectors.push({id: this.nextIpSelectorId++});
            },
            remove(selector) {
                console.log(selector)
                _.remove(this.ipSelectors, (n)=> {
                    console.log(selector === n);
                })
            }
        }
    }
</script>

<style scoped>
    .padding-10 {
        padding: 10px 0;
    }
    .padding-20 {
        padding: 20px 0;
    }
</style>