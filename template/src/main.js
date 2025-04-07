import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vuetify from './plugins/vuetify'
import { formatDate, formatTime, formatDateAndTime, getDayFormat } from '@/libs/format.js'
import { numberToCurrencyNo } from '@/libs/numberToCurrency'
import ErrorPlugin from './errorPlugin'

import '@mdi/font/css/materialdesignicons.css'

Vue.use(VueAxios, axios)
Vue.use(ErrorPlugin);

Vue.prototype.$numberToCurrencyNo = numberToCurrencyNo
Vue.prototype.$formatDate = formatDate
Vue.prototype.$formatTime = formatTime
Vue.prototype.$formatDateAndTime = formatDateAndTime
Vue.prototype.$getDayFormat = getDayFormat
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
