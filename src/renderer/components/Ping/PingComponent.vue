<template>
    <div id="ping">
        <div class="container columns">
            <div class="column">
                <label class="title">Ping Tool </label>
            </div>
            <div class="column">
                <button class="button is-link is-outlined" v-on:click="addIpSelection">ADD</button>
            </div>
        </div>
        <div class="container">
            <div class="columns"
                 v-for="(selector, index) in ipSelectors"
                 v-bind:key="index">
                <div v-on:keyup.enter="addIpSelection" class="column is-10" v-if="ipSelectors.length > 0"
                     is="ip-selection">
                </div>
                <div class="column is-pulled-right">
                    <button class="delete is-large" v-on:click="removeIpSelector(index)"></button>
                </div>
            </div>
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
                nextIpSelectorId: 0,
            }
        },
        methods: {
            addIpSelection (e){
                this.ipSelectors.push({id: this.nextIpSelectorId});
                this.nextIpSelectorId++;
            },
            removeIpSelector(index) {
                console.log(this.ipSelectors);
                console.log(this.ipSelectors.splice(index, 1));
            },
            addDefaults() {

            }
        },
        created() {
            this.addIpSelection();
        }
    }
</script>

<style scoped>
    #ping {
        margin: 10px;
    }
    .title {
        margin-bottom: 2em;
    }
</style>