<template>
    <aside class="menu">
        <p class="menu-label">
            Troubleshooting
        </p>
        <ul class="menu-list">
            <li><router-link to="ping">Ping Tool</router-link></li>
        </ul>
        <p class="menu-label">
            Messaging
        </p>
        <ul class="menu-list">
            <li><router-link to="xmlInjector">XML Injector</router-link></li>
        </ul>
    </aside>
</template>

<script>
    export default {
        name: 'side-menu',
        methods: {
        }
    }
</script>

<style>
    aside {

    }


</style>