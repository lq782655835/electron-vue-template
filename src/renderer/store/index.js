import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // tool 设置
        fontSize: 30,
        align: 'left', // left, center, right
        floatSkin: 'float-normal', // float-normal, float-opacity
        maxSkin: 'black',
        isFullScreen: false
    },
    mutations: {
        setFontSize(state, value) {
            state.fontSize = value
        },
        setAlign(state, value) {
            state.align = value
        },
        setFloatSkin(state, value) {
            state.floatSkin = value
        },
        setFullScreen(state, value) {
            state.isFullScreen = value
        }
    }
})
