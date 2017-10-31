<template>
    <div class="ping">
        <label class="padding-20 title">Ping Tool <span><button class="button is-link is-outlined is-pulled-right" v-on:click="addIpSelection">ADD</button></span></label>
        <div class="padding-10" v-for="n in ipSelectors">
            <div class="columns">
                <div class="column is-10">
                    <label>{{n}}</label>
                    <ip-selection></ip-selection>
                </div>
                <div class="column">
                    <a class="delete" v-on:click="remove(n)"></a>
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
                ipSelectors: []
            }
        },
        methods: {
            addIpSelection (e){
                this.ipSelectors.push('<ip-selection>');
            },
            remove(selector) {
                console.log(selector)
                _.remove(this.ipSelectors, (n)=> {
                    console.log(selector === n);
                })
            },
            deleteIpSelection(index) {
                this.ipSelectors.splice(index, 1);
            },
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