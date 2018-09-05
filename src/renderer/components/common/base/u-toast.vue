<template>
    <u-flex-layout layout="inline" alignment="center" class="u-toast" :class="type" v-if="currentVisible">
        <u-icon v-if="type==='success'" name="tooltip_success"/>
        <u-icon v-if="type==='error'" name="tooltip_fail"/>
        <span class="text">{{text}}</span>
    </u-flex-layout>
</template>

<script>
import Vue from 'vue'

const Toast = {
    props: {
        type: { type: String, default: 'success' },
        text: { type: String, default: '' },
        duration: { type: Number, default: 2000 }
    },
    data() {
        return {
            currentVisible: false
        }
    },
    mounted() {
        document.body.appendChild(this.$el)
    },
    methods: {
        show(text, type, duration) {
            this.currentVisible = true
            if (!this.$el) this.$mount(document.createElement('div'))

            this.type = type || this.type
            this.text = text || this.text
            this.duration = duration || this.duration

            setTimeout(() => (this.currentVisible = false), this.duration)
        }
    }
}

Vue.nextTick(() => {
    const Ctor = Vue.component('u-toast')
    if (!Ctor) return

    const toast = (Toast.toast = new Ctor())
    Vue.prototype.$toast = toast
})
export default Toast
</script>

<style lang="scss" scoped>
.u-toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 300px;
    max-width: 800px;
    padding: 15px 100px;
    border-radius: 4px;
    z-index: 10;
    background: #ffffff;

    &.success {
        background: #eff4fa;
    }

    &.error {
        & .text {
            color: #f52f50;
        }
    }

    .text {
        white-space: nowrap;
        margin-left: 10px;
        color: #536683;
    }
}
</style>
