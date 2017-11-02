<template>
    <div class="columns" id="app">
        <div class="column side-menu">
          <side-menu id=""></side-menu>
        </div>
        <div class="column is-three-quarters">
          <router-view></router-view>
        </div>
    </div>
</template>

<script>
  import SideMenu from "./components/SideMenu/SideMenuComponent.vue";

  export default {
      components: {SideMenu},
      name: 'MSKTool'
  }
</script>

<style>
    #app {
        padding: 10px;
        height: 800px;
    }

  .side-menu {
    overflow-x: hidden;
    overflow-y: auto;
    border-right: 1px solid black;
    background-color: rgb(245, 245, 245);
  }

  .vertical {
    height: 100%;
  }
</style>
