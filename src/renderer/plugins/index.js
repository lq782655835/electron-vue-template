import Vue from 'vue'

import './svg' /* 导入所有svg图片 */
import './directives' /* 导入所有指令 */

import vClickOutside from 'v-click-outside'
Vue.use(vClickOutside)

/** global component */
const Components = require.context('../components/common', true, /(\.vue)$/)
Components.keys().map(key => {
    // 文件名作为组件名
    let componentName = key.replace(/(.*\/)*([^.]+).*/gi, '$2')
    Vue.component(componentName, Components(key).default)
})
