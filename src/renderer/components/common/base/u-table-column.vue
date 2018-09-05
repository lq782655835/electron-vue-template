<template>
    <td><slot></slot></td>
</template>

<script>
export default {
    name: 'u-table-column',
    props: {
        label: String,
        width: String,
        maxWidth: String,
        minWidth: String
    },
    data() {
        return {
            style: {
                width: this.width,
                maxWidth: this.maxWidth,
                minWidth: this.minWidth
            }
        }
    },
    components: {},
    computed: {},
    watch: {},
    created() {
        if (!this.$parent.columns.find(item => item.label === this.label)) {
            this.$parent.columns.push(this)
        }
    }
}
</script>

<style lang="scss">
.u-table-column {
}
</style>
