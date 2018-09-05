<template>
    <div class="u-md-input" v-bind="$attrs">
        <input
            v-model="inputValue" v-bind="$attrs"
            v-on="listeners" @input="onInput"
            :type="type"
            :placeholder="placeholder"
            :label="label"
            :value="value"
            :focus="onFocus"
            :blur="onBlur"
            class="input"
            required
        />
        <hr>
        <label class="input-label">{{ label }}</label>
        <span class="input-message">{{ message }}</span>
        <span class="input-alert">{{ alert }}</span>
    </div>
</template>

<script>
export default {
    name: 'u-md-input',
    props: {
        type: { type: String, default: 'text' },
        value: { type: [String, Number] },
        label: { type: String },
        placeholder: { type: String },
        alert: { type: String },
        message: { type: String }
    },
    data() {
        return {
            inputValue: this.value
        }
    },
    computed: {
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
        },

        onFocus() {
            this.$emit('focus')
        },

        onBlur() {
            this.$emit('blur')
        }
    }
}
</script>


<style lang="scss" scoped>
.u-md-input {
    display: inline-block;
    height: 36px;
    width: 270px;
    position: relative;
    padding: 0;
    // margin: 5px;
    border: none;
    background: clear;
    overflow: visible;

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
        padding: 12px 0px 8px;
        border: none;
        border-radius: 0;
        box-shadow: none;
        border-bottom: 1px solid #ddd;
        font-size: 1rem;
        outline: none;
        cursor: text;
        background: rgba(0, 0, 0, 0);
        // disbaled color
        // background: #f5f5f5;

        &::-webkit-input-placeholder {
            transition: color 300ms ease;
        }

        &:not(:focus)::-webkit-input-placeholder {
            color: transparent;
        }
    }

    & hr {
        content: '';
        display: block;
        position: absolute;
        bottom: -3px;
        left: 0;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 1px;
        border: none;
        background: #000;
        font-size: 1px;
        will-change: transform, visibility;
        transition: all 200ms ease-out;
        transform: scaleX(0);
        visibility: hidden;
        z-index: 2;
    }

    .input-label {
        position: absolute;
        top: 10px;
        left: 0px;
        font-size: 1rem;
        font-weight: bold;
        color: #999999;
        transform-origin: 0 -300%;
        transition: transform 300ms ease;
        pointer-events: none;
    }

    // .input-alert

    .input-info {
        left: 0;
        top: calc(100% + 5px);
        user-select: none;
        position: absolute;
        font-size: 0.8rem;
        text-align: left;
    }
    .input-alert {
        @extend .input-info;
        color: rgba(255, 0, 0, 0.7);
    }

    .input-message {
        @extend .input-info;
        color: #999999;
    }

    .input:focus ~ hr {
        transform: scaleX(1);
        visibility: visible;
    }

    .input:valid ~ .input-label,
    .input:focus ~ .input-label {
        transform: scale(0.7);
    }
}
</style>
