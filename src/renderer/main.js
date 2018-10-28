import Vue from 'vue'

import app from './app'
import router from './router'
import store from './store'
import errorHandle from '@/utils/logs' /* 前端日志记录 */
import '@/plugins' /* 组件，指令，插件等core统一入口 */

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()
Vue.prototype.$throw = errorHandle
/* fixbug: Disable pinch zoom in electron for mac */
require('electron').webFrame.setZoomLevelLimits(1, 1)

/* eslint-disable no-new */
new Vue({
    components: { app },
    router,
    store,
    template: '<app/>'
}).$mount('#app')
