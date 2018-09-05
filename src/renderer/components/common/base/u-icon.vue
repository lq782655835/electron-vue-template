<template>
    <a :class="['u-icon', {'disclick': disclick}]" 
    :href="href" :disabled="disabled" @click="onClick" v-on="listeners">
        <svgicon v-if="isSvg" :name="name" :scale="scale" v-bind="$attrs" :original="original" />
        <img v-else :src="imgSrc" v-bind="$attrs"/>
    </a>
</template>

<script>
import ULink from './u-link.vue'

export default {
    mixins: [ULink],
    props: {
        name: { type: String, default: '' },
        disclick: { type: Boolean, default: false },
        scale: { type: [String, Number], default: '1' },
        original: { type: Boolean, default: true }
    },
    computed: {
        isSvg() {
            return !~this.name.indexOf('.')
        },
        imgSrc() {
            return /^(http|https)/g.test(this.name)
                ? this.name
                : require(`@/assets/img/${this.name}`)
        }
    }
}
</script>

<style lang="scss" scoped>
.u-icon {
    display: inline-block;
    vertical-align: middle;
    line-height: 0;
    overflow: hidden;
    -webkit-app-region: no-drag; /* fixbug: window header with drag click icon no use */

    &.disclick {
        cursor: default;
    }

    img {
        max-width: 100%;
        max-height: 100%;
    }
}
</style>
