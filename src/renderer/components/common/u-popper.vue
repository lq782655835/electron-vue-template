<template>
  <div class="u-popper">
    <div class="content" @click="showPopper">
      <slot></slot>
    </div>
    <div v-if="isPopperShow" v-click-outside="close" class="popper-container" @click="close">
        <div class="popper">
            <slot name="pop"></slot>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'u-popper',
    data() {
        return {
            isPopperShow: false
        }
    },
    methods: {
        showPopper() {
            this.isPopperShow = !this.isPopperShow
        },
        close() {
            this.isPopperShow = false
        }
    }
}
</script>

<style lang="scss" scoped>
.u-popper {
    display: inline-block;
    position: relative;
    background-color: $white;
    & .content {
        display: inline-block;
        position: relative;
    }
    & .popper-container {
        cursor: pointer;
        user-select: none;
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        min-width: 60px;
        text-align: center;
        border-radius: 2px 2px 2px 2px 0 0 0;
        box-shadow: 0 0 4px 0 #d5e4ed;
        z-index: 2;

        &:before {
            content: '';
            position: absolute;
            top: 0;
            left: 50%;
            transform: rotate(45deg) translateX(-50%);
            width: 10px;
            height: 10px;
            background-color: $white;
            // z-index: 1;
            box-shadow: 0 0 4px 0 #d5e4ed;
        }

        & .popper {
            @extend .inner-style;
        }
    }

    .inner-style {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        width: 100%;
        height: 100%;
        background-color: $white;
        font-size: 12px;
        z-index: 3;
    }
}
</style>
