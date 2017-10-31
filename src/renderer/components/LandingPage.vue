<template>
  <div class="container">
    <div class="columns">
      <div class="column">
        <side-menu></side-menu>
      </div>
      <div class="column is-three-quarters">
          <ping></ping>
      </div>
    </div>
  </div>
</template>

<script>
  import IpSelection from './IpSelection/IpSelectionComponent'
  import SideMenu from './SideMenu/SideMenuComponent'
  import Ping from './Ping/PingComponent'
  import XmlInjector from './XMLInjector/XMLInjectorComponent'
  import _ from 'lodash'

  export default {
      name: 'landing-page',
      components: {SideMenu, Ping, XmlInjector}
  }
</script>

<style scoped>
  label {
    font-size: 24px;
    font-weight: bold;
  }
</style>
