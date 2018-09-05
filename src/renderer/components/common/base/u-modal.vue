<template>
    <transition name="page">
        <div class="u-modal-wapper" v-if="currentVisible" @click="maskClosable && cancel()" @keydown.esc="cancel()">
            <div class="u-modal" :class="type" v-bind="$attrs" v-on="$listeners" @click.stop>
                <div class="u-modal-head">
                    <slot name="head">
                        <div v-if="title" class="title">
                            <slot name="title">{{ title }}</slot>
                        </div>
                    </slot>
                </div>
                <div class="u-modal-body">
                    <slot>{{ content }}</slot>
                </div>
                <div class="u-modal-foot" v-if="okButton || cancalButton">
                    <u-button @click="ok" color="primary">{{okButton}}</u-button>
                    <u-button @click="cancel">{{cancelButton}}</u-button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import Vue from 'vue'

const ModalType = {
    Modal: 'modal',
    CONFIRM: 'confirm',
    ALERT: 'alert'
}

const Modal = {
    name: 'u-modal',
    props: {
        visible: { type: Boolean, default: false },
        title: { type: String, default: '提示' },
        content: String,
        maskClosable: { type: Boolean, default: false },
        okButton: { type: String, default: '' },
        cancelButton: { type: String, default: '' },
        type: { type: String, default: ModalType.Modal }
    },
    data() {
        return {
            currentVisible: this.visible,
            ModalType
        }
    },
    watch: {
        visible(visible) {
            this.currentVisible = visible
        },
        currentVisible(visible) {
            document.body.style.overflow = visible ? 'hidden' : ''
        }
    },
    mounted() {
        document.body.appendChild(this.$el)
    },
    methods: {
        open() {
            if (!this.$el) this.$mount(document.createElement('div'))

            this.currentVisible = true
            this.$emit('update:visible', true)
            this.$emit('open')
        },
        ok() {
            this.$emit('ok')
            this.close(true)
        },
        cancel() {
            this.$emit('cancel')
            this.close(false)
        },
        close(ok) {
            let cancel = false
            this.$emit('before-close', {
                ok,
                preventDefault: () => (cancel = true)
            })
            if (cancel) return

            this.currentVisible = false
            this.$emit('update:visible', false)
            this.$emit('close', {
                ok
            })
        }
    }
}

Modal.confirm = (content, title = '提示', okButton = '确定', cancelButton = '取消') =>
    new Promise((resolve, reject) => {
        const Ctor = Vue.component('u-modal')
        if (!Ctor) return

        const instance = new Ctor({
            propsData: { content, title, okButton, cancelButton, type: ModalType.CONFIRM }
        })
        instance.$on('ok', () => resolve())
        instance.$on('cancel', () => reject())
        instance.open()
    })
Vue.prototype.$confirm = Modal.confirm
export default Modal
</script>

<style lang="scss" scoped>
.u-modal-wapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    -webkit-overflow-scrolling: touch;
    touch-action: cross-slide-y pinch-zoom double-tap-zoom;
    text-align: center;
    overflow: hidden;
    overflow-y: auto;
    background: rgba(0, 0, 0, 0.5);

    &:before {
        content: '';
        display: inline-block;
        vertical-align: middle;
        height: 100%;
    }

    &:focus {
        outline: none;
    }
}

.u-modal {
    padding: 50px 65px 35px;
    min-width: 420px;
    min-height: 240px;
    display: inline-block;
    vertical-align: middle;
    text-align: left;
    background: #ffffff;
    border-radius: 2px;

    &.confirm {
        text-align: center;
    }

    &-head {
        position: relative;
        padding-bottom: 25px;

        .title {
            @include font-large(22px);
        }

        .close {
            position: absolute;
            right: 20px;
            top: 20px;
        }
    }

    &-body {
        position: relative;
    }

    &-foot {
        margin-top: 50px;

        .u-button {
            margin-left: 20px;

            &:first-child {
                margin-left: 0;
            }
        }
    }

    &[title-align^='center'] &-head .title {
        text-align: center;
    }
}
</style>
