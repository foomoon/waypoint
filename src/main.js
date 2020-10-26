import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import vueRouter from 'vue-router'
import VueRouter from 'vue-router';

import Waypoint from './components/Waypoint';

Vue.use(vueRouter)

Vue.config.productionTip = false

const router = new VueRouter({
  routes: [
    {path: "/waypoint/:tourStep", component: Waypoint}
  ],
  mode: 'history'
})

var myApp = new Vue({
  vuetify,
  router,
  render: h => h(App)
})

myApp.$mount('#app')
