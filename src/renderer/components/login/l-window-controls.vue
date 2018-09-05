<template>
    <u-flow-layout class="window-controls">
        <u-icon name="header_minimize" class="min" @click="minimize"/>
        <u-icon name="header_full_screen" class="max" @click="maximize"/>
        <u-icon name="header_close" class="close" @click="close"/>
    </u-flow-layout>
</template>
<script>
export default {
    name: 'l-window-controls',
    methods: {
        minimize() {
            this.$electron.ipcRenderer.send('minimize')
        },
        maximize() {
            this.$electron.ipcRenderer.send('maximize')
        },
        close() {
            this.$confirm('确定要退出会议系统吗？', '提示').then(() =>
                this.$electron.ipcRenderer.send('close')
            )
        }
    }
}
</script>
<style lang="scss" scoped>
.window-controls {
    position: absolute;
    top: 14px;
    right: 28px;
    z-index: 3;
}
</style>
