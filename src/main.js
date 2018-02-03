import Vue from 'vue'
import VuePaginate from 'vue-paginate'
import App from './App.vue'
import './registerServiceWorker'

Vue.use(VuePaginate)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
