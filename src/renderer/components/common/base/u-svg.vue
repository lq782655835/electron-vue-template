<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
    name: 'u-svg',
    props: {
        name: {
            type: String,
            required: true
        },
        className: {
            type: String
        }
    },
    computed: {
        iconName() {
            return `#${this.name}`
        },
        svgClass() {
            if (this.className) {
                return 'u-svg ' + this.className
            } else {
                return 'u-svg'
            }
        }
    }
}
</script>

<style scoped>
.u-svg {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>
