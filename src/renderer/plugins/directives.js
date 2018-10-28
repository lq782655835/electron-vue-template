import Vue from 'vue'

/**
 * 到达容器底部，自动触发事件
 */
Vue.directive('scrollend', {
    // componentUpdated:VNode 及其子 VNode 全部更新后调用
    update: function(el, binding, vnode) {
        let childEl = el.querySelector('span')
        if (!childEl) return

        let childHeight = childEl.offsetHeight
        let clientHeight = el.clientHeight

        clientHeight - 50 < childHeight && binding.value && binding.value()
    }
})
