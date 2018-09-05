<template>
  <div :class="['u-radio-group', mode === 'row' ? 'flex-row' : 'flex-column']">
    <slot></slot>
  </div>
</template>

<script>
export default {
    name: 'u-radio-group',
    props: {
        groupValue: { type: [String, Number] },
        disabled: { type: Boolean, default: false },
        mode: {
            type: String,
            default: 'row',
            validator: function(value) {
                return ['row', 'column'].indexOf(value) !== -1
            }
        }
    },
    model: {
        prop: 'groupValue',
        event: 'change'
    },
    data() {
        return {
            pickedValue: this.groupValue
        }
    },
    watch: {
        groupValue() {
            this.pickedValue = this.groupValue
        }
    },
    methods: {
        handleChange(val) {
            this.pickedValue = val
            this.$emit('change', val)
        }
    }
}
</script>

<style lang="scss">
.ui-radio-group {
}

.flex-row {
    display: flex;
    flex-direction: row;
}

.flex-column {
    display: flex;
    flex-direction: column;
}
</style>
