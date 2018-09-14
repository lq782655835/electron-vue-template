<template>
    <div class="login-input" v-bind="$attrs">
        <u-flex-layout  class="main" alignment="center">
            <div class="label">{{label}}：</div>
            <input
                v-model="inputValue" v-bind="$attrs"
                v-on="listeners" @input="onInput"
                :type="type"
                :placeholder="placeholder"
                :value="value"
                :focus="onFocus"
                :blur="onBlur"
                class="input"
                requireds
            />
        </u-flex-layout>
        <p v-if="message" class="message">{{message}}</p>
    </div>
</template>
<script>
export default {
    name: 'l-login-input',
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
.login-input {
    position: relative;

    .main {
        position: relative;
        height: 32px;
        width: 240px;
        z-index: 10;
        .label {
            display: inline-block;
            white-space: nowrap;
            @include font-normal(14px, $white);
        }

        .input {
            margin-left: 5px;
            flex: 1;
            border: none;
            border-radius: 0;
            box-shadow: none;
            @include font-normal(14px, $white, true);
            outline: none;
            cursor: text;
            background: rgba(0, 0, 0, 0);
        }

        &:after {
            content: '';
            display: block;
            position: absolute;
            bottom: -6px;
            left: 0;
            right: 0;
            height: 1px;
            background-color: #549cef;
        }
    }

    .message {
        margin-top: 15px;
        color: $white;
        @include font-normal(12px);
    }

    &[hint='normal'] {
        .message {
            @include font-normal(#a3b0c4);
        }
    }

    &[hint='error'] {
        .message {
            color: #f52f50;
        }
    }

    &[color='black'] {
        .label {
            @include font-normal(14px, #738298);
        }

        .input {
            @include font-normal(14px, #738298, true);
        }

        .main:after {
            background-color: #d5dbe4;
        }
    }
}
</style>
