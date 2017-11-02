import Vue from 'vue'
import Router from 'vue-router'
import PingComponent from '../components/Ping/PingComponent'
import XMLInjectorComponent from '../components/XMLInjector/XMLInjectorComponent'


Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/',
        component: require('@/components/Ping/PingComponent').default
    },
    {
        path: '/ping',
        name: 'ping',
        component: PingComponent
    },
    {
        path: '/xmlInjector',
        name: 'xmlInjector',
        component: XMLInjectorComponent
    }
  ]
})
