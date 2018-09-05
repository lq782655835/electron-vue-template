<template>
    <a class="u-button" :href="href" :disabled="disabled" @click="onClick" v-on="listeners">
        <slot></slot>
    </a>
</template>

<script>
import ULink from './u-link.vue'

export default {
    name: 'u-button',
    mixins: [ULink]
}
</script>

<style lang="scss" scoped>
.u-button {
    text-align: center;
    cursor: pointer;
    user-select: none;
    display: inline-block;
    padding: 10px 30px;
    line-height: 1.42em;
    border-radius: 100px;
    border: 1px solid #bcc4cf;
    color: #738298;
    background-color: #ffffff;

    &:hover {
        border: 1px solid $primary-color;
        color: $primary-color;
    }

    &[size='s'] {
        padding: 5px 13px;
        font-size: 12px;
    }

    &[size='l'] {
        padding: 10px 85px;
        font-size: 14px;
    }

    &[color='primary'] {
        background-image: linear-gradient(13deg, #3a97f1 0%, #1860ca 100%);
        color: #ffffff;
        border: 1px solid transparent;
    }

    &[disabled='disabled'] {
        cursor: not-allowed;
        background: #95a2b5;
        color: #ffffff;
        border: 1px solid transparent;
    }
}
</style>
