<template>
    <div class="home" @mouseover="showHeader=true" @mouseout="showHeader=false">
        <u-header v-show="showHeader"/>
        <div class="home-main" :class="fullScreen && floatSkin">
            <u-flex-layout v-if="!fullScreen" class="content float" direction="vertical" justify="center" :class="[fontSize, align]">
                <template v-if="!isWait">
                    <p class="origin-content reverse-ellipsis" :style="{lineClamp: isTranslate ? 1 : 2}">
                        <span>{{sourceFloat}}</span>
                    </p>
                    <p v-if="isTranslate" class="trans-content reverse-ellipsis" :style="{lineClamp: 1}">
                        <span>{{transFloat}}</span>
                    </p>
                </template>
                <p v-else>等待连接websocket</p>
            </u-flex-layout>
            <u-flex-layout v-else class="content fullscreen" direction="vertical" :class="[fontSize, align]">
                <p class="conf-title">{{title}}</p>
                <template v-if="!isWait">
                    <p v-scrollend="shortenSourceArray" class="origin-content section">
                        <span>{{sourceContent}}</span>
                    </p>
                    <p v-if="isTranslate" v-scrollend="shortenTransArray" class="trans-content section">
                        <span>{{transContent}}</span>
                    </p>
                </template>
                <p v-else>等待连接websocket</p>
            </u-flex-layout>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import UHeader from '@/components/u-header'
import { IPC_RENDERER_SIGNAL } from '@/utils/config'

export default {
    components: {
        UHeader
    },
    data() {
        return {
            showHeader: false,

            title: '',
            isTranslate: true, // 是否有翻译
            isWait: true, // 是否显示“等待创建会议”

            // 全屏模式显示数据
            sourceHistory: [],
            transHistory: [],
            // 浮窗模式显示数据
            sourceFloat: '',
            transFloat: ''
        }
    },
    computed: {
        sourceContent() {
            return this.sourceHistory.join('')
        },
        transContent() {
            return this.transHistory.join('')
        },
        ...mapState({
            opacity: 'opacity',
            align: 'align',
            fontSize: state => 'f' + state.fontSize, // className need letter in first
            fullScreen: 'isFullScreen',
            floatSkin: state => 'skin-' + state.floatSkin.split('-')[1]
        })
    },
    created() {
        this.$electron.ipcRenderer.send(IPC_RENDERER_SIGNAL.SET_MAIN_SIZE)
    }
}
</script>

<style lang="scss" scoped>
@mixin light-text {
    background-size: cover;

    .content {
        color: $white;
        .section {
            color: $white;
        }
    }
}

/** 
 * css变量
 * 因为是基于chrome稳定版内核，所以浏览器新特性可以放心使用
 */
.f24 {
    --fontSize: 24px;
}

.f30 {
    --fontSize: 30px;
}

.f40 {
    --fontSize: 40px;
}

.f50 {
    --fontSize: 50px;
}

.left {
    --align: left;
}
.center {
    --align: center;
}
.right {
    --align: right;
}

.skin-black {
    background-image: url('../assets/img/skin-black.jpg');
    @include light-text;
}
.skin-blue {
    background-image: url('../assets/img/skin-blue.jpg');
    @include light-text;
}
.skin-red {
    background-image: url('../assets/img/skin-red.jpg');
    @include light-text;
}

/* 页面*/
.home-main {
    position: absolute;
    top: 0;
    height: 100vh;
    width: 100vw;
    overflow: hidden;

    .content {
        background: rgba(0, 0, 0, 0);
        margin: 0 auto;
        height: 100%;
        width: 80%;
        font-size: var(--fontSize);
        text-align: var(--align);

        .section {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
        }
    }
}

/* 浮窗模式 */
.float {
    .reverse-ellipsis {
        text-overflow: clip;
        position: relative;
        overflow: hidden;

        span {
            white-space: nowrap;
            min-width: 100%;
            position: relative;
            display: inline-block;
            float: right;
            overflow: visible;
            background-color: inherit;
        }
    }
}

/* 全屏模式*/
.fullscreen {
    margin: 0;
    height: 100%;

    .conf-title {
        flex: 0 0 60px;
        @include font-normal(44px, true);
        margin-top: 50px;
        margin-bottom: 100px;
    }

    .origin-content {
        flex: 1;
        margin-bottom: 52px;
    }

    .trans-content {
        flex: 1;
    }
}
</style>
