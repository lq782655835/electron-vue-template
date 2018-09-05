<template>
    <div :class="['u-input', {'textarea': isTextArea}]" v-bind="$attrs">
        <input v-if="!isTextArea"
            v-model="inputValue" v-bind="$attrs"
            v-on="listeners" @input="onInput"
            class="input"/>
        <textarea v-else 
            v-model="inputValue" v-bind="$attrs"
            v-on="listeners" @input="onInput"
            class="input" />
    </div>
</template>

<script>
export default {
    name: 'u-input',
    props: {
        type: { type: String, default: 'text' },
        value: { type: [String, Number] }
    },
    data() {
        return {
            inputValue: this.value
        }
    },
    computed: {
        isTextArea() {
            return this.type !== 'text'
        },
        listeners() {
            const listeners = Object.assign({}, this.$listeners)
            delete listeners['input']

            return listeners
        }
    },
    model: {
        prop: 'value',
        event: 'input'
    },
    watch: {
        value() {
            this.inputValue = this.value
        }
    },
    methods: {
        onInput() {
            this.$emit('input', this.inputValue)
        }
    }
}
</script>


<style lang="scss" scoped>
.u-input {
    display: inline-block;
    height: 40px;
    width: 288px;

    &.textarea {
        height: 70px;
    }

    &[size='l'] {
        width: 400px;
    }

    &[size='xxl'] {
        width: 664px;
        height: 40px;
    }

    .input {
        width: 100%;
        height: 100%;
        font-size: 12px;
        color: #738298;
        padding: 8px 10px;
        border: 1px solid $border-color;
        border-radius: 2px;
    }
}
</style>
