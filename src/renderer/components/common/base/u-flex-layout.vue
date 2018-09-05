<template>
  <div class="flex_root" :direction="direction" @click="clickHandle">
    <slot></slot>
  </div>
</template>
<script>
export default {
    name: 'u-flex-layout',
    props: {
        direction: {
            default: 'horizontal',
            validator: value => ['horizontal', 'vertical'].includes(value)
        }
    },
    methods: {
        clickHandle(e) {
            this.$emit('click', e)
        }
    }
}
</script>
<style lang="scss" scoped>
.flex_root {
    display: flex;

    &[layout='inline'] {
        display: inline-flex;
    }

    &[direction='vertical'] {
        flex-direction: column;
    }

    &[justify='start'] {
        justify-content: flex-start;
    }
    &[justify='center'] {
        justify-content: center;
    }
    &[justify='end'] {
        justify-content: flex-end;
    }
    &[justify='space-between'] {
        justify-content: space-between;
    }
    &[justify='space-around'] {
        justify-content: space-around;
    }

    &[alignment='start'] {
        align-items: flex-start;
    }
    &[alignment='center'] {
        align-items: center;
    }
    &[alignment='end'] {
        align-items: flex-end;
    }
    &[alignment='baseline'] {
        align-items: baseline;
    }
    &[alignment='stretch'] {
        align-items: stretch;
    }
}
</style>
