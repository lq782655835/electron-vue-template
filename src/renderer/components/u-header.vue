<template>
    <div class="u-header">
        <u-flex-layout justify="space-between" class="container">
            <div class="title">XXXX客户端</div>
            <div class="window-control">
                <template v-if="showTooltips">
                    <u-popper class="tool_skin">
                        <u-icon name="tool_text" class="tool" :original="false" color="#ffffff" />
                        <div slot="pop">
                            <p :class="{'active': $store.state.fontSize===24}" @click="setFontSize(24)">24px</p>
                            <p :class="{'active': $store.state.fontSize===30}" @click="setFontSize(30)">30px</p>
                            <p :class="{'active': $store.state.fontSize===40}" @click="setFontSize(40)">40px</p>
                        </div>
                    </u-popper>
                    <u-popper class="tool_align">
                        <u-icon :name="`tool_align_${$store.state.align}`" class="tool" :original="false" color="#ffffff"/>
                        <div slot="pop">
                            <u-icon name="tool_align_left" @click="setAlign('left')"/>
                            <u-icon name="tool_align_center" @click="setAlign('center')"/>
                            <u-icon name="tool_align_right" @click="setAlign('right')"/>
                        </div>
                    </u-popper>
                    
                    <u-popper class="tool_skin">
                        <u-icon name="tool_skin" class="tool" :original="false" color="#ffffff"/>
                        <div v-if="isFullScreen" slot="pop">
                            <p :class="{'active': $store.state.floatSkin==='float-normal'}" @click="setFloatSkin('float-normal')">默认</p>
                            <p :class="{'active': $store.state.floatSkin==='float-blue'}" @click="setFloatSkin('float-blue')">科技蓝</p>
                            <p :class="{'active': $store.state.floatSkin==='float-red'}" @click="setFloatSkin('float-red')">节日红</p>
                            <p :class="{'active': $store.state.floatSkin==='float-black'}" @click="setFloatSkin('float-black')">高级黑</p>
                        </div>
                        <div v-else slot="pop">
                            <p :class="{'active': $store.state.floatSkin==='float-normal'}" @click="setFloatSkin('float-normal')">默认</p>
                            <p :class="{'active': $store.state.floatSkin==='float-opacity'}" @click="setFloatSkin('float-opacity')">半透明</p>
                        </div>
                    </u-popper>
                    <u-icon name="header_full_screen" class="tool" @click="maximize" :original="false" color="#ffffff"/>
                </template>
                <u-icon name="header_minimize" class="min" @click="minimize" :original="false" color="#ffffff"/>
                <u-icon name="header_close" class="close" @click="close" :original="false" color="#ffffff"/>
            </div>
        </u-flex-layout>
    </div>
</template>

<script>
import { IPC_RENDERER_SIGNAL } from '@/utils/config'

export default {
    props: {
        showTooltips: { type: Boolean, default: true }
    },
    methods: {
        setFontSize(fontSize) {
            this.$store.commit('setFontSize', fontSize)
        },
        setAlign(position) {
            this.$store.commit('setAlign', position)
        },
        setFloatSkin(floatSkin) {
            this.$store.commit('setFloatSkin', floatSkin)
            switch (floatSkin) {
                case 'float-opacity':
                    this.$electron.ipcRenderer.send(IPC_RENDERER_SIGNAL.TRANSPARENT)
                    break
                case 'float-normal':
                    this.$electron.ipcRenderer.send(IPC_RENDERER_SIGNAL.OPAQUE)
                    break
            }
        },
        minimize() {
            this.$electron.ipcRenderer.send(IPC_RENDERER_SIGNAL.MINIMIZE)
        },
        maximize() {
            let isFullScreen = this.$electron.ipcRenderer.sendSync(IPC_RENDERER_SIGNAL.MAXIMIZE)
            this.$store.commit('setFullScreen', isFullScreen)
            /* 切换模式时重置主题，以重置header样式 */
            !isFullScreen && this.setFloatSkin('float-normal')
        },
        close() {
            this.$electron.ipcRenderer.send(IPC_RENDERER_SIGNAL.CLOSE)
        }
    },
    computed: {
        isFullScreen() {
            return this.$store.state.isFullScreen
        }
    }
}
</script>

<style lang="scss" scoped>
.u-header {
    user-select: none;
    position: relative;
    padding: 0 28px;
    width: 100%;
    height: 50px;
    line-height: 50px;
    -webkit-app-region: drag; /* fixbug: window上加入该属性，则无法显示css hover */
    z-index: 99;

    .title {
        font-size: 14px;
    }

    .u-popper {
        background: rgba(0, 0, 0, 0);
    }

    .tool {
        margin-left: 10px;
        margin-right: 10px;
    }

    .min {
        margin-left: 64px;
        margin-right: 18px;
    }

    .tool_align /deep/ .popper {
        padding: 8px 24px 16px 24px;

        .u-icon {
            display: block;
            margin-top: 16px;
        }
    }

    .tool_skin /deep/ .popper {
        font-size: 12px;
        line-height: 30px;
        padding: 15px 0;
        color: #536683;

        .active {
            color: $primary-color;
        }
    }
}
</style>
